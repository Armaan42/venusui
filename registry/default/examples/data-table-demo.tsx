import { DataTable, type DataTableColumn } from "@/registry/default/ui/data-table"

interface Invoice {
  id: string
  client: string
  issued: string
  status: "Paid" | "Due" | "Overdue"
  amount: number
}

const clients = ["Tidewell Audio", "Kiln Corner", "Halden Retreats", "Copperleaf", "Brightwater", "Oakline Architects"]
const statuses: Invoice["status"][] = ["Paid", "Paid", "Due", "Paid", "Overdue", "Due"]

const invoices: Invoice[] = Array.from({ length: 24 }, (_, i) => ({
  id: `INV-${String(1042 - i).padStart(4, "0")}`,
  client: clients[i % clients.length],
  issued: `2026-${String(11 - Math.floor(i / 4)).padStart(2, "0")}-${String(28 - ((i * 3) % 27)).padStart(2, "0")}`,
  status: statuses[(i * 5) % statuses.length],
  amount: 480 + ((i * 739) % 4200),
}))

const tone = {
  Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  Due: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Overdue: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
}

const columns: DataTableColumn<Invoice>[] = [
  { key: "id", header: "Invoice", sortable: true, className: "font-medium" },
  { key: "client", header: "Client", sortable: true },
  { key: "issued", header: "Issued", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    cell: (row) => <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone[row.status]}`}>{row.status}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    align: "right",
    cell: (row) => `€${row.amount.toLocaleString("en-GB")}`,
  },
]

export default function DataTableDemo() {
  return (
    <DataTable
      rows={invoices}
      columns={columns}
      getRowId={(row) => row.id}
      label="Invoices"
      selectable
      pageSize={8}
      className="max-w-4xl"
    />
  )
}
