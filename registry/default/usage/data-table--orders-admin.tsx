"use client"

import * as React from "react"

import { DataTable, type DataTableColumn } from "@/registry/default/ui/data-table"

export const meta = {
  title: "Shop orders admin",
  description: "A data table in an online shop's admin: search and sort orders, select several and mark them as shipped in one go.",
}

// Hearth & Grain, its customers and orders are made up.
interface Order {
  id: string
  customer: string
  city: string
  items: number
  total: number
  status: "New" | "Packed" | "Shipped"
}

const names = ["Ana Ribeiro", "Jonas Keller", "Mei Lin", "Tomás Ferreira", "Sofia Almeida", "Erik Lund", "Priya Nair", "Lucas Moreau"]
const cities = ["Lisbon", "Berlin", "Porto", "Lyon", "Malmö", "Utrecht", "Ghent", "Bilbao"]

const initial: Order[] = Array.from({ length: 32 }, (_, i) => ({
  id: `#${8120 - i}`,
  customer: names[(i * 3) % names.length],
  city: cities[(i * 5) % cities.length],
  items: 1 + ((i * 7) % 5),
  total: 39 + ((i * 1373) % 860),
  status: (["New", "New", "Packed", "Shipped"] as const)[i % 4],
}))

const tone = {
  New: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  Packed: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Shipped: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
}

export default function OrdersAdmin() {
  const [orders, setOrders] = React.useState(initial)
  const [selected, setSelected] = React.useState<string[]>([])
  const [version, setVersion] = React.useState(0)

  const columns: DataTableColumn<Order>[] = [
    { key: "id", header: "Order", sortable: true, className: "font-medium" },
    { key: "customer", header: "Customer", sortable: true },
    { key: "city", header: "City", sortable: true },
    { key: "items", header: "Items", sortable: true, align: "right" },
    { key: "total", header: "Total", sortable: true, align: "right", cell: (o) => `€${o.total.toFixed(2)}` },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (o) => <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone[o.status]}`}>{o.status}</span>,
    },
  ]

  return (
    <div className="mx-auto min-h-svh max-w-5xl bg-background px-4 py-10 text-foreground">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Hearth &amp; Grain · Admin</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Orders</h1>
        </div>
        <button
          type="button"
          disabled={!selected.length}
          onClick={() => {
            setOrders((all) => all.map((o) => (selected.includes(o.id) ? { ...o, status: "Shipped" } : o)))
            setSelected([])
            setVersion((v) => v + 1)
          }}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          Mark {selected.length || ""} as shipped
        </button>
      </div>
      <DataTable
        key={version}
        rows={orders}
        columns={columns}
        getRowId={(o) => o.id}
        label="Orders"
        selectable
        onSelectionChange={setSelected}
        searchPlaceholder="Search orders, customers, cities…"
        className="mt-6"
      />
    </div>
  )
}
