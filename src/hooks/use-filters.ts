'use client'

import {useMemo, useState} from 'react'

export type FilterPrimitive = string | number

export type FilterConfig<T> = {
  data: T[]
  fields: Record<string, (item: T) => FilterPrimitive>
  /**
   * When true, hides options with 0 items from facet counts.
   * When false, shows all possible options regardless of count.
   * @default false
   */
  hideEmptyOptions?: boolean
}

export type FilterOption = {value: FilterPrimitive; count: number}
export type FilterOptions = Record<string, FilterOption[]>
export type FilterState = Record<string, Set<FilterPrimitive>>

export type UseFiltersReturnType<T> = {
  filtered: T[]
  options: FilterOptions
  filters: FilterState
  toggle: (field: string, value: FilterPrimitive) => void
}

/**
 * Faceted filtering hook.
 *
 * @example
 * ```tsx
 * const {filtered, options, filters, toggle} = useFilters({
 *   data: projects,
 *   fields: {
 *     type: p => p.type,
 *     year: p => p.year,
 *     status: p => p.status
 *   },
 *   hideEmptyOptions: true // hides options with 0 items
 * })
 * ```
 */
export function useFilters<T>(config: FilterConfig<T>): UseFiltersReturnType<T> {
  const {data, fields, hideEmptyOptions = false} = config

  // Initialize filter state with empty Sets for each field
  const initial: FilterState = Object.fromEntries(Object.keys(fields).map(f => [f, new Set()]))
  const [filters, setFilters] = useState<FilterState>(initial)

  // Compute filtered results: apply all active filters
  const filtered = data.filter(item => {
    // For each field with active filters, check if item matches
    return Object.entries(filters).every(([field, activeValues]) => {
      // If no filters for this field, include item
      if (activeValues.size === 0) return true

      const selector = fields[field]
      if (!selector) return true

      const itemValue = selector(item)
      return activeValues.has(itemValue)
    })
  })

  // Compute facet options: for each field, count values respecting cascading filters
  const options = useMemo(() => {
    const result: FilterOptions = {}

    // For each field, compute cascading counts
    Object.entries(fields).forEach(([currentField, currentSelector]) => {
      const countMap = new Map<FilterPrimitive, number>()

      // Get items that match ALL filters EXCEPT the current field
      const fieldItems = data.filter(item => {
        return Object.entries(filters).every(([field, activeValues]) => {
          if (field === currentField) return true
          if (activeValues.size === 0) return true

          const selector = fields[field]
          if (!selector) return true

          const itemValue = selector(item)
          return activeValues.has(itemValue)
        })
      })

      // Count occurrences for this field
      fieldItems.forEach(item => {
        const value = currentSelector(item)
        countMap.set(value, (countMap.get(value) ?? 0) + 1)
      })

      // Add zero counts if hideEmptyOptions is false
      if (!hideEmptyOptions) {
        data.forEach(item => {
          const value = currentSelector(item)
          if (!countMap.has(value)) {
            countMap.set(value, 0)
          }
        })
      }

      // Build and sort the array
      result[currentField] = Array.from(countMap, ([value, count]) => ({value, count})).sort(sortOptions)
    })

    return result
  }, [data, fields, filters, hideEmptyOptions])

  // Toggle a filter value on/off
  const toggle = (field: string, value: FilterPrimitive) => {
    setFilters(prev => {
      const next = new Set(prev[field])
      next.has(value) ? next.delete(value) : next.add(value)
      return {...prev, [field]: next}
    })
  }

  return {filtered, options, filters, toggle}
}

function sortOptions(a: FilterOption, b: FilterOption): number {
  if (typeof a.value === 'number' && typeof b.value === 'number') {
    return b.value - a.value // descending for numbers
  }
  return String(a.value).localeCompare(String(b.value)) // ascending for strings
}
