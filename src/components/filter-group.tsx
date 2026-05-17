'use client'

import {CheckSquareIcon, FolderIcon, FolderOpenIcon, SquareIcon} from '@phosphor-icons/react'
import type {FilterOption, FilterPrimitive} from '@/hooks'
import {cn} from '@/lib/utils'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from './ui'

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
        className="text-sm text-muted-foreground hover:text-primary-foreground flex gap-1 items-center"
        onClick={() => onChange(field, item)}
      >
        {active ? <CheckSquareIcon /> : <SquareIcon />}
        <span className={cn(active && 'bg-lime-300 text-black hover:text-black')}>
          {item} ({count})
        </span>
      </button>
    )
  })

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <button type="button" className="mb-2 text-amber-200 group">
          <FolderIcon className="inline me-1 group-data-[state=open]:hidden" />
          <FolderOpenIcon className="inline me-1 group-data-[state=closed]:hidden" />
          {label}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-1 items-start ps-2 border-l border-dashed">{filterButtons}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
