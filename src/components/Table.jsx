import React, { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'
import {
  DeleteRounded as TrashBin,
  CreateRounded as Edit
} from '@mui/icons-material'
import domains from '../assets/domains.json'
import { differenceInCalendarDays } from 'date-fns'

export default function Table() {
  const memoizedData = useMemo(() => {
    return domains.map((item) => ({
      ...item,
      renew: new Date(item.renew)
    }))
  }, [])

  const [data] = useState(memoizedData)

  const handleEdit = (user) => {
    console.log('Edytowanie użytkownika:', user)
    console.log(
      differenceInCalendarDays(
        new Date(2012, 6, 2, 0, 0),
        new Date(2011, 6, 2, 23, 0)
      )
    )
  }

  const columns = [
    { accessorKey: 'domain', header: 'Domena' },
    {
      accessorKey: 'renew',
      header: 'Data odnowienia',
      sortingFn: (rowA, rowB) => {
        const dateA = rowA.original.renew.getTime()
        const dateB = rowB.original.renew.getTime()
        return dateA - dateB
      },
      cell: (info) =>
        info.getValue().toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'Europe/Warsaw'
        })
    },
    { accessorKey: 'company', header: 'Spółka' },
    { accessorKey: 'registrar', header: 'Rejestrator' },
    {
      header: '',
      id: 'actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="bg-dark-lighterbg rounded px-2 py-1 text-white transition-all"
          >
            <TrashBin fontSize="very-small" />
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className="bg-dark-lighterbg rounded px-2 py-1 text-white transition-all"
          >
            <Edit fontSize="very-small" />
          </button>
        </div>
      )
    }
  ]

  const [filter, setFilter] = useState('')
  const [sorting, setSorting] = useState([{ id: 'renew', desc: false }])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
      sorting
    },
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
                  className="cursor-pointer border border-dark-mainborder bg-dark-mainbg p-2 font-bold transition-all duration-200 hover:bg-dark-lightbg"
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
            <tr
              key={row.id}
              className={`${
                differenceInCalendarDays(
                  new Date(2012, 6, 2, 0, 0),
                  new Date(2011, 6, 2, 23, 0)
                ) === 366
                  ? 'bg-red-500'
                  : 'bg-blue-600'
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border border-dark-mainborder  p-2 transition-all duration-200 hover:bg-dark-lightbg`}
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
