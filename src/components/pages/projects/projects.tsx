'use client'

import {FilterGroup, PageSection} from '@/components'
import {useFilteredData} from '@/hooks'
import {ProjectCard} from './project-card'
import {projects} from './registry'

export function ProjectsPage() {
  const {filtered, options, selected, toggle} = useFilteredData({
    data: projects,
    selectors: {
      type: p => p.type,
      startYear: p => p.startYear
    }
  })

  const cards = filtered
    .sort((a, b) => b.startYear - a.startYear) // newest first
    .map((project, index) => <ProjectCard project={project} key={index} className="pb-4" />)

  return (
    <main>
      <div className="flex items-start gap-2 my-8 md:my-12 lg:my-20">
        <div className="text-[48pt] md:text-[60pt] lg:text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted">
          Projects
        </div>
        <span className="text-primary-foreground text-lg md:text-xl lg:text-2xl">({filtered.length})</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <PageSection label="Filters" className="lg:w-50 lg:sticky lg:top-13 lg:self-start flex flex-col">
          <div className="flex flex-col lg:gap-2 pt-2">
            <FilterGroup
              label="Project Type"
              field="type"
              value={selected.type}
              data={options.type}
              onChange={toggle}
            />
            <FilterGroup
              label="Start Year"
              field="startYear"
              value={selected.startYear}
              data={options.startYear}
              onChange={toggle}
            />
          </div>
        </PageSection>

        <PageSection label="Projects & Selected Works" className="flex-1">
          {filtered.length === 0 && (
            <div className="text-center text-primary-foreground pt-16 text-sm">
              No projects found matching the selected filters
            </div>
          )}
          <div className="pt-4 flex flex-col gap-4 divide-y divide-dashed divide-accent">{cards}</div>
        </PageSection>
      </div>
    </main>
  )
}
