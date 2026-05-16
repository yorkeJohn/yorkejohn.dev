'use client'

import {CheckSquareIcon, FolderIcon, SquareIcon} from '@phosphor-icons/react'
import {useState} from 'react'
import {PageSection} from '@/components'
import {cn} from '@/lib/utils'
import {ProjectCard} from './project-card'
import {type Project, type ProjectType, projects, projectTypes} from './registry'

const sortByYearDesc = (a: Project, b: Project) => b.startYear - a.startYear

export function ProjectsPage() {
  const [filter, setFilter] = useState<Set<ProjectType>>(new Set())

  function toggleFilter(value: ProjectType) {
    setFilter(prev => {
      const next = new Set(prev)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  const cards = projects
    .filter(p => filter.size === 0 || filter.has(p.type))
    .sort(sortByYearDesc)
    .map((project, index) => <ProjectCard project={project} key={index} className="pb-4" />)

  const filterButtons = projectTypes.map(pt => {
    const count = projects.filter(p => p.type === pt).length
    const active = filter.has(pt)
    return (
      <button
        type="button"
        key={pt}
        className={cn(
          'text-sm text-muted-foreground hover:text-primary-foreground flex gap-1 items-center',
          active && 'bg-lime-300 text-black hover:text-black'
        )}
        onClick={() => toggleFilter(pt)}
      >
        {active ? <CheckSquareIcon /> : <SquareIcon />}
        <span>
          {pt} ({count})
        </span>
      </button>
    )
  })

  return (
    <div className="">
      <div className="flex items-start gap-2 my-20">
        <div className="text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted-foreground">
          Projects
        </div>
        <span className="text-amber-200 text-2xl">({projects.length})</span>
      </div>

      <div className="flex gap-8">
        <PageSection label="Filters" className="w-50 sticky top-13 self-start">
          <div className="my-2 text-amber-200">
            <FolderIcon className="inline me-1" />
            Project Type
          </div>
          <div className="flex flex-col gap-1 items-start ps-4">{filterButtons}</div>
        </PageSection>

        <PageSection label="Projects & Selected Works">
          <div className="pt-4 flex flex-col gap-4 divide-y divide-dashed divide-lime-600">{cards}</div>
        </PageSection>
      </div>
    </div>
  )
}
