import {PageSection} from '@/components'
import {ProjectCard} from './project-card'
import {type Project, projects} from './registry'

const sortByYearDesc = (a: Project, b: Project) => b.startYear - a.startYear

export function ProjectsPage() {
  const cards = projects
    .sort(sortByYearDesc)
    .map((project, index) => <ProjectCard project={project} key={index} className="pb-4" />)

  const projectCount = projects.length

  return (
    <div>
      <div className="flex items-start gap-2 my-20">
        <div className="text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted-foreground">
          Projects
        </div>
        <span className="text-amber-200 text-2xl">({projectCount})</span>
      </div>

      <PageSection label="Projects & Selected Works">
        <div className="pt-4 flex flex-col gap-4 divide-y divide-dashed divide-lime-600">{cards}</div>
      </PageSection>
    </div>
  )
}
