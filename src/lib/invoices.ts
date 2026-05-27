import type { Invoice } from "@/data/invoices";
import { requireCmsAdmin } from "@/lib/cms-auth";
import { createClient } from "@/lib/supabase/server";

type InvoiceRow = {
  id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  client_name: string;
  client_email: string;
  client_address: string;
  notes: string;
  tax_percent: number | string;
  discount: number | string;
  invoice_items: Array<{
    id: string;
    description: string;
    quantity: number | string;
    unit_price: number | string;
    sort_order: number;
  }>;
};

export async function getInvoices(): Promise<Invoice[]> {
  await requireCmsAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("id, invoice_number, issue_date, due_date, client_name, client_email, client_address, notes, tax_percent, discount, invoice_items(id, description, quantity, unit_price, sort_order)")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as InvoiceRow[]).map((invoice) => ({
    id: invoice.id,
    number: invoice.invoice_number,
    issueDate: invoice.issue_date,
    dueDate: invoice.due_date,
    clientName: invoice.client_name ?? "",
    clientEmail: invoice.client_email ?? "",
    clientAddress: invoice.client_address ?? "",
    notes: invoice.notes ?? "",
    taxPercent: Number(invoice.tax_percent),
    discount: Number(invoice.discount),
    items: [...invoice.invoice_items]
      .sort((left, right) => left.sort_order - right.sort_order)
      .map((item) => ({
        id: item.id,
        description: item.description,
        quantity: Number(item.quantity),
        rate: Number(item.unit_price),
      })),
  }));
}
