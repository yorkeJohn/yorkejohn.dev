import Image, {type StaticImageData} from 'next/image'
import {Anchor} from '@/components'
import {Badge, Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui'
import espressoChat from './images/espresso-chat.png'
import frenchVillage from './images/french-village.png'
import mantine from './images/mantine.png'
import metroThrift from './images/metro-thrift.png'
import navigator from './images/navigator.jpg'
import pixelSkyQuest from './images/pixel-skyquest.png'
import taintedMagic from './images/tainted-magic.png'
import tfcBetterBlastFurnace from './images/tfc-better-blast-furnace.png'
import website from './images/website.png'

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
  badges?: string[]
  contributor?: boolean
}

const projects: ProjectDef[] = [
  {
    title: 'Tainted Magic',
    description: 'Tainted Magic is a Minecraft mod and addon to Thaumcraft 4, with over 1.5 million downloads.',
    image: taintedMagic,
    links: [
      {label: 'GitHub', url: 'https://github.com/yorkeJohn/tainted-magic'},
      {label: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/tainted-magic'}
    ],
    badges: ['First Project', 'Minecraft Mod', 'Java', 'Open Source'],
    startYear: 2015
  },
  {
    title: 'Metro Thrift Website',
    description: "Website + CMS for Halifax's mobile thrift store.",
    image: metroThrift,
    links: [{label: 'Visit Site', url: 'https://metrothrift.com'}],
    badges: ['Freelance', 'Next.js', 'KeystoneJS'],
    startYear: 2023
  },
  {
    title: 'TFC Better Blast Furnace',
    description: 'TFC Better Blast furnace is a Minecraft mod and addon to TerraFirmaCraft, with over 600k downloads.',
    image: tfcBetterBlastFurnace,
    links: [
      {label: 'GitHub', url: 'https://github.com/yorkeJohn/tfc-better-blast-furnace'},
      {label: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/tfc-better-blast-furnace'},
      {label: 'Modrinth', url: 'https://modrinth.com/mod/tfc-better-blast-furnace'}
    ],
    badges: ['Minecraft Mod', 'Java', 'Open Source'],
    startYear: 2024
  },
  {
    title: 'Personal Website',
    description: 'This website - yorkejohn.dev! Includes a portfolio and useful developer tools.',
    image: website,
    links: [{label: 'GitHub', url: 'https://github.com/yorkeJohn/yorkejohn.dev'}],
    startYear: 2026,
    badges: ['Personal Website', 'Next.js', 'Three.js']
  },
  {
    title: 'French Village Conservation Website',
    description: "Website and CMS for a woodland conservation in St. Margaret's Bay, Nova Scotia.",
    image: frenchVillage,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/conservation-site'}],
    badges: ['Volunteer', 'React', 'KeystoneJS'],
    startYear: 2023
  },
  {
    title: 'Espresso Chat',
    description: 'Low-level end-to-end encrypted chat protocol written in Java.',
    image: espressoChat,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/espresso-chat'}],
    badges: ['Java', 'Network Engineering'],
    startYear: 2023
  },
  {
    title: 'Pixel SkyQuest',
    description: 'Top-down pixel-art puzzle-solving dungeon-crawler RPG!',
    image: pixelSkyQuest,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/pixel-skyquest'}],
    badges: ['Game Development', 'Unity', 'C#'],
    startYear: 2024
  },
  {
    title: 'Navigator Cloud',
    description: "Cloud platform for the energy industry's most advanced forecasting model.",
    image: navigator,
    links: [{label: 'Homepage', url: 'https://posteritygroup.ca/navigator'}],
    badges: ['Full-stack', 'Product Engineering', 'React', 'Node.js', 'Rust'],
    startYear: 2024,
    contributor: true
  },
  {
    title: 'Mantine',
    description: 'Open-source React component library.',
    image: mantine,
    links: [
      {label: 'GitHub', url: 'https://github.com/mantinedev/mantine'},
      {label: 'Docs', url: 'https://mantine.dev/'}
    ],
    badges: ['Open Source', 'Component Library', 'React', 'TypeScript'],
    startYear: 2024,
    contributor: true
  }
]

const sortByYearAsc = (a: ProjectDef, b: ProjectDef) => a.startYear - b.startYear

export function ProjectsPage() {
  const cards = projects.sort(sortByYearAsc).map((project, index) => {
    const {title, description, image, links = [], badges = [], startYear, contributor} = project

    const linkElements = links.map(link => (
      <Anchor key={link.url} href={link.url} className="text-blue-200 hover:underline">
        {link.label}
      </Anchor>
    ))

    const badgeElements = badges.map(badge => <Badge key={badge}>{badge}</Badge>)

    return (
      <Card key={index} className="mb-4" size="sm">
        <Image src={image} alt={title} />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap mb-4">
            <Badge className="bg-blue-700 px-2">{startYear}</Badge>
            {contributor && <Badge className="bg-orange-700 px-2">Contributor</Badge>}
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
