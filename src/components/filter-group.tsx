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
        className="flex items-center gap-1 text-nowrap text-muted text-sm hover:text-primary-foreground"
        onClick={() => onChange(field, item)}
        data-sfx={active ? 'toggle_on' : 'toggle_off'}
      >
        <span className="hidden lg:inline">{active ? <CheckSquareIcon /> : <SquareIcon />}</span>
        <span className={cn(active && 'bg-accent-foreground text-background hover:text-background')}>
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
            className="group mb-2 text-primary-foreground"
            data-sfx={open ? 'transition_down' : 'transition_up'}
          >
            <FolderIcon className="me-1 inline group-data-[state=open]:hidden" />
            <FolderOpenIcon className="me-1 inline group-data-[state=closed]:hidden" />
            {label}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col items-start gap-1 border-l border-dashed ps-2">{filterButtons}</div>
        </CollapsibleContent>
      </Collapsible>
      <div className="flex gap-4 border-b border-dashed py-2 lg:hidden">
        <div className="text-nowrap text-primary-foreground">
          <FolderOpenIcon className="me-1 inline" />
          {label}
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-scroll">{filterButtons}</div>
      </div>
    </div>
  )
}
