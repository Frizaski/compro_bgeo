export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  notes: string;
  taxPercent: number;
  discount: number;
  items: InvoiceItem[];
}
