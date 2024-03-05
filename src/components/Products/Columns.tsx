'use client'

import { cn } from '@/lib/utils'

import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'
import { PiArrowUpDuotone } from 'react-icons/pi'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { DataTableColumnHeader } from './ProductsTableHeader' 

export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  inventory: number
  category: string
  status: 'Active' | 'Inactive'
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product' /> 
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-x-2'>
          <div className='relative border h-10 w-10 rounded-lg overflow-hidden'>
            <Image
              src={'/img/trash/' + row.original.imageUrl}
              alt={row.original.name}
              fill
              sizes='100px'
              className='w-10 h-10 rounded-md object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <Link href={`/products/${row.original.id}`}>
              <span className='font-semibold hover:underline'>
                {row.original.name}
              </span>
            </Link>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column } ) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
  },
  {
    accessorKey: 'inventory',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Inventory' />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      const icon = status === 'Active' ? (
        <IoMdCheckmarkCircleOutline className='h-4 w-4' />
      ) : (
        <RxCrossCircled className='h-4 w-4' />
      )

      return (
        <div className='flex space-x-2 items-center' >
          {icon}
          <span>{row.original.status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              className='curosr-pointer'
              onClick={() => {
                console.log(row)
              }}
            >
              {' '}
              Edit product{' '}
            </DropdownMenuItem>
            <DropdownMenuItem className='text-rose-500 font-bold'>
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]