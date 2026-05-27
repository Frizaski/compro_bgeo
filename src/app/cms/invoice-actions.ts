"use server";

import { revalidatePath } from "next/cache";
import type { Invoice } from "@/data/invoices";
import { requireCmsAdmin } from "@/lib/cms-auth";
import { createClient } from "@/lib/supabase/server";

export interface InvoiceSaveResult {
  invoice?: Invoice;
  error?: string;
}

function databaseError(message: string) {
  if (message.includes("schema cache") || message.includes("Could not find the")) {
    return "Database schema belum sesuai dengan CMS. Jalankan file supabase/cms-schema-sync.sql di Supabase SQL Editor, lalu coba kembali.";
  }

  return message;
}

export async function saveInvoice(invoice: Invoice): Promise<InvoiceSaveResult> {
  const admin = await requireCmsAdmin();
  const supabase = await createClient();
  const subtotal = invoice.items.reduce((total, item) => total + item.quantity * item.rate, 0);
  const taxAmount = subtotal * (invoice.taxPercent / 100);
  const totalAmount = subtotal + taxAmount - invoice.discount;
  const values = {
    invoice_number: invoice.number,
    issue_date: invoice.issueDate || null,
    due_date: invoice.dueDate || null,
    client_name: invoice.clientName,
    client_email: invoice.clientEmail,
    client_address: invoice.clientAddress,
    notes: invoice.notes,
    tax_percent: invoice.taxPercent,
    discount: invoice.discount,
    subtotal,
    tax_amount: taxAmount,
    total_amount: totalAmount,
    created_by: admin.userId,
  };

  const headerMutation = invoice.id
    ? supabase.from("invoices").update(values).eq("id", invoice.id).select("id").single()
    : supabase.from("invoices").insert(values).select("id").single();
  const { data: savedHeader, error: headerError } = await headerMutation;

  if (headerError || !savedHeader) {
    return { error: headerError ? databaseError(headerError.message) : "Invoice could not be saved." };
  }

  const { error: clearItemsError } = await supabase.from("invoice_items").delete().eq("invoice_id", savedHeader.id);

  if (clearItemsError) {
    return { error: databaseError(clearItemsError.message) };
  }

  if (invoice.items.length) {
    const { error: itemsError } = await supabase.from("invoice_items").insert(
      invoice.items.map((item, index) => ({
        invoice_id: savedHeader.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.rate,
        line_total: item.quantity * item.rate,
        sort_order: index + 1,
      })),
    );

    if (itemsError) {
      return { error: databaseError(itemsError.message) };
    }
  }

  revalidatePath("/cms");
  return { invoice: { ...invoice, id: savedHeader.id } };
}
