import { useMemo, useState, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'
import { differenceInCalendarDays } from 'date-fns'
import EditUserTrigger from 'ui/EditUserTrigger'

export default function Table() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [sorting, setSorting] = useState([{ id: 'renew', desc: false }])
  const today = new Date()

  // Pobieranie danych z API
  useEffect(() => {
    fetch('http://localhost:5000/api/domains')
      .then((res) => res.json())
      .then((domains) => {
        const formattedData = domains.map((item) => ({
          ...item,
          renew: new Date(item.renew)
        }))
        setData(formattedData)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const columns = useMemo(
    () => [
      { accessorKey: 'domain', header: 'Domena' },
      {
        accessorKey: 'renew',
        header: 'Data odnowienia',
        sortingFn: (rowA, rowB) => rowA.original.renew - rowB.original.renew,
        cell: (info) => {
          const renewDate = info.getValue()
          return (
            <span className="p-2 rounded">
              {renewDate.toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'Europe/Warsaw'
              })}
            </span>
          )
        }
      },
      { accessorKey: 'company', header: 'Spółka' },
      { accessorKey: 'registrar', header: 'Rejestrator' },
      {
        header: '',
        id: 'actions',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <EditUserTrigger data={row.original} />
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filter, sorting },
    onGlobalFilterChange: setFilter,
    onSortingChange: setSorting
  })

  return (
    <div className="text-white">
      <input
        type="text"
        placeholder="Wyszukaj"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-2 cursor-pointer rounded border border-dark-mainborder bg-dark-mainbg p-2 transition-all duration-300 hover:border-dark-mainborderhover focus:outline-none"
      />
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="cursor-pointer border border-dark-mainborder bg-dark-mairenbg p-2 font-bold transition-all duration-200 hover:bg-dark-lightbg"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'asc'
                      ? ' ↑'
                      : ' ↓'
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border border-dark-mainborder p-2 transition-all duration-200 ${
                    differenceInCalendarDays(cell.row.original.renew, today) <
                    30
                      ? 'bg-[#7c1b1b]'
                      : ''
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
