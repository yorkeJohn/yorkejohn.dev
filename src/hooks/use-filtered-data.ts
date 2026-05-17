'use client'

import {useState} from 'react'

export type FilterPrimitive = string | number

export type UseFilteredDataProps<T> = {
  data: T[]
  selectors: Record<string, (item: T) => FilterPrimitive>
}

export type FilterOption = {value: FilterPrimitive; count: number}
export type FilterOptions = Record<string, FilterOption[]>
export type FilterState = Record<string, Set<FilterPrimitive>>

export type UseFiltersReturnType<T> = {
  filtered: T[]
  options: FilterOptions
  selected: FilterState
  toggle: (field: string, value: FilterPrimitive) => void
}

/**
 * Faceted filtering hook.
 */
export function useFilteredData<T>({data, selectors}: UseFilteredDataProps<T>): UseFiltersReturnType<T> {
  // Initialize filter state with empty Sets for each field
  const [selected, setSelected] = useState<FilterState>(() => {
    return Object.fromEntries(Object.keys(selectors).map(field => [field, new Set()]))
  })

  // Compute filtered results
  const filtered = data.filter(item => {
    return Object.entries(selected).every(([field, activeValues]) => {
      if (activeValues.size === 0) return true
      const selector = selectors[field]
      return activeValues.has(selector(item))
    })
  })

  // Compute facet options
  const options: FilterOptions = {}
  for (const [field, selector] of Object.entries(selectors)) {
    const counts = new Map<FilterPrimitive, number>()
    for (const item of data) {
      const value = selector(item)
      const count = counts.get(value) ?? 0
      counts.set(value, count + 1)
    }
    const entry = Array.from(counts, ([value, count]) => ({value, count}))
    options[field] = entry.sort(sortOptions)
  }

  // Toggle a filter value on/off
  const toggle = (field: string, value: FilterPrimitive) => {
    setSelected(prev => {
      const next = new Set(prev[field])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return {...prev, [field]: next}
    })
  }

  return {filtered, options, selected, toggle}
}

function sortOptions(a: FilterOption, b: FilterOption): number {
  if (typeof a.value === 'number' && typeof b.value === 'number') {
    return b.value - a.value // descending for numbers
  }
  return String(a.value).localeCompare(String(b.value)) // ascending for strings
}
