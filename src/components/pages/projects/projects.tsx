import Image, {type StaticImageData} from 'next/image'
import {Anchor} from '@/components'
import {Badge, Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui'
import taintedMagic from './images/tainted-magic.png'

type ProjectLink = {
  label: string
  url: string
}

type ProjectDef = {
  title: string
  description: string
  image: StaticImageData
  links?: ProjectLink[]
  startYear: number
  endYear?: number
  badges?: string[]
}

const projects: ProjectDef[] = [
  {
    title: 'Tainted Magic',
    description: 'Tainted Magic is a Minecraft mod and addon to Thaumcraft 4, with over 1.5 million downloads.',
    image: taintedMagic,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/yorkeJohn/tainted-magic'
      },
      {
        label: 'Homepage',
        url: 'https://www.curseforge.com/minecraft/mc-mods/tainted-magic'
      }
    ],
    badges: ['Minecraft Mod', 'Java', 'Open Source'],
    startYear: 2015
  }
]

export function ProjectsPage() {
  const cards = projects.map((project, index) => {
    const {title, description, image, links = [], badges = [], startYear, endYear = 'Present'} = project

    const linkElements = links.map(link => (
      <Anchor key={link.url} href={link.url} className="text-blue-200 hover:underline">
        {link.label}
      </Anchor>
    ))

    const badgeElements = badges.map(badge => (
      <Badge key={badge} className="">
        {badge}
      </Badge>
    ))

    return (
      <Card key={index} className="mb-4" size="sm">
        <Image src={image} alt={title} />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap mb-4">
            <Badge className="bg-blue-700">
              {startYear} - {endYear}
            </Badge>
            {badgeElements}
          </div>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 flex-wrap">{linkElements}</div>
        </CardFooter>
      </Card>
    )
  })

  return (
    <div>
      <h1 className="font-heading text-xl mb-8">Projects & Selected Works</h1>
      <div className="columns-xs gap-4">{cards}</div>
    </div>
  )
}
