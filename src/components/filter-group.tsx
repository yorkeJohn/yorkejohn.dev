'use client'

import {CheckSquareIcon, FolderIcon, FolderOpenIcon, SquareIcon} from '@phosphor-icons/react'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@radix-ui/react-collapsible'
import {useState} from 'react'
import type {FilterOption, FilterPrimitive} from '@/hooks'
import {cn} from '@/lib/cn'

type FilterGroupProps = {
  label: string
  field: string
  data: FilterOption[]
  value: Set<FilterPrimitive>
  onChange: (field: string, value: FilterPrimitive) => void
}

export function FilterGroup({label, field, value, data: options, onChange}: FilterGroupProps) {
  const filterButtons = options.map(({value: item, count}, index) => {
    const active = value.has(item)
    return (
      <button
        type="button"
        key={index}
        className="text-sm text-muted-foreground hover:text-primary-foreground flex gap-1 items-center text-nowrap"
        onClick={() => onChange(field, item)}
        data-sfx={active ? 'toggle_on' : 'toggle_off'}
      >
        <span className="hidden lg:inline">{active ? <CheckSquareIcon /> : <SquareIcon />}</span>
        <span className={cn(active && 'bg-lime-300 text-black hover:text-black')}>
          {item} ({count})
        </span>
      </button>
    )
  })

  const [open, setOpen] = useState(true)

  return (
    <div>
      <Collapsible open={open} onOpenChange={setOpen} className="hidden lg:block">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="mb-2 text-amber-200 group"
            data-sfx={open ? 'transition_down' : 'transition_up'}
          >
            <FolderIcon className="inline me-1 group-data-[state=open]:hidden" />
            <FolderOpenIcon className="inline me-1 group-data-[state=closed]:hidden" />
            {label}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
          <div className="flex flex-col gap-1 items-start ps-2 border-l border-dashed">{filterButtons}</div>
        </CollapsibleContent>
      </Collapsible>
      <div className="lg:hidden flex gap-4 border-b border-dashed py-2">
        <div className="text-amber-200 text-nowrap">
          <FolderOpenIcon className="inline me-1" />
          {label}
        </div>
        <div className="flex gap-3 overflow-x-scroll no-scrollbar">{filterButtons}</div>
      </div>
    </div>
  )
}
