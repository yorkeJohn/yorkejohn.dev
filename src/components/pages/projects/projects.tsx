'use client'

import {CheckSquareIcon, FolderIcon, FolderOpenIcon, SquareIcon} from '@phosphor-icons/react'
import {PageSection} from '@/components'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui'
import {type FilterOption, type FilterPrimitive, useFilters} from '@/hooks/use-filters'
import {cn} from '@/lib/utils'
import {ProjectCard} from './project-card'
import {projects} from './registry'

export function ProjectsPage() {
  const {filtered, options, filters, toggle} = useFilters({
    data: projects,
    fields: {
      type: p => p.type,
      startYear: p => p.startYear
    }
  })

  const cards = filtered
    .sort((a, b) => b.startYear - a.startYear) // newest first
    .map((project, index) => <ProjectCard project={project} key={index} className="pb-4" />)

  return (
    <main>
      <div className="flex items-start gap-2 my-20">
        <div className="text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted-foreground">
          Projects
        </div>
        <span className="text-amber-200 text-2xl">({filtered.length})</span>
      </div>

      <div className="flex gap-8">
        <PageSection label="Filters" className="w-50 sticky top-13 self-start flex flex-col">
          <div className="flex flex-col gap-2 pt-2">
            <FilterGroup
              label="Project Type"
              field="type"
              value={filters.type}
              options={options.type}
              onChange={toggle}
            />
            <FilterGroup
              label="Start Year"
              field="startYear"
              value={filters.startYear}
              options={options.startYear}
              onChange={toggle}
            />
          </div>
        </PageSection>

        <PageSection label="Projects & Selected Works" className="flex-1">
          {filtered.length === 0 && (
            <div className="text-center text-amber-200 pt-16 text-sm">
              No projects found matching the selected filters
            </div>
          )}
          <div className="pt-4 flex flex-col gap-4 divide-y divide-dashed divide-lime-600">{cards}</div>
        </PageSection>
      </div>
    </main>
  )
}

type FilterGroupProps = {
  label: string
  field: string
  value: Set<FilterPrimitive>
  options: FilterOption[]
  onChange: (field: string, value: FilterPrimitive) => void
}

function FilterGroup({label, field, value, options, onChange}: FilterGroupProps) {
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
