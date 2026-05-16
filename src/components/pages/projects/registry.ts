/* Image imports */
import type {StaticImageData} from 'next/image'
import bonsaiParlour from './images/bonsai-parlour.png'
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

export const projectTypes = ['Professional', 'Contributor', 'Personal', 'Freelance', 'Volunteer', 'Academic'] as const
export type ProjectType = (typeof projectTypes)[number]

export type Project = {
  title: string
  description: string
  image: StaticImageData
  links?: ProjectLink[]
  startYear: number
  badges?: string[]
  type: ProjectType
}

export const projects: Project[] = [
  {
    title: 'Personal Website',
    description: 'This website - yorkejohn.dev! Includes a portfolio and useful developer tools.',
    image: website,
    links: [{label: 'GitHub', url: 'https://github.com/yorkeJohn/yorkejohn.dev'}],
    badges: ['Personal Website', 'Next.js', 'Three.js'],
    startYear: 2026,
    type: 'Personal'
  },
  {
    title: 'Navigator Cloud',
    description: "Cloud platform for the energy industry's most advanced forecasting model.",
    image: navigator,
    links: [{label: 'Homepage', url: 'https://posteritygroup.ca/navigator'}],
    badges: ['Full-stack', 'Product Engineering', 'React', 'Node.js', 'Rust'],
    startYear: 2024,
    type: 'Professional'
  },
  {
    title: 'Pixel SkyQuest',
    description: 'Top-down pixel-art puzzle-solving dungeon-crawler RPG!',
    image: pixelSkyQuest,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/pixel-skyquest'}],
    badges: ['Game Development', 'Unity', 'C#'],
    startYear: 2024,
    type: 'Academic'
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
    type: 'Contributor'
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
    startYear: 2024,
    type: 'Personal'
  },
  {
    title: 'Metro Thrift Website',
    description: "Website + CMS for Halifax's mobile thrift store.",
    image: metroThrift,
    links: [{label: 'Visit Site', url: 'https://metrothrift.com'}],
    badges: ['Next.js', 'KeystoneJS'],
    startYear: 2023,
    type: 'Freelance'
  },
  {
    title: 'French Village Conservation Website',
    description: "Website + CMS for a woodland conservation in St. Margaret's Bay, Nova Scotia.",
    image: frenchVillage,
    links: [
      {label: 'GitHub', url: 'https://github.com/larixsw/conservation-site'},
      {label: 'Demo', url: 'https://conservation.larix.dev'}
    ],
    badges: ['React', 'KeystoneJS'],
    startYear: 2023,
    type: 'Volunteer'
  },
  {
    title: 'Espresso Chat',
    description: 'Low-level end-to-end encrypted chat protocol written in Java.',
    image: espressoChat,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/espresso-chat'}],
    badges: ['Java', 'Network Engineering'],
    startYear: 2023,
    type: 'Academic'
  },
  {
    title: 'The Bonsai Parlour',
    description: 'Website and e-store for a fictional bonsai cafe.',
    image: bonsaiParlour,
    links: [{label: 'GitHub', url: 'https://github.com/yorkeJohn/bonsai-parlour'}],
    badges: ['Vanilla', 'PHP', 'Web Design'],
    startYear: 2022,
    type: 'Academic'
  },
  {
    title: 'Tainted Magic',
    description: 'Tainted Magic is a Minecraft mod and addon to Thaumcraft 4, with over 1.5 million downloads.',
    image: taintedMagic,
    links: [
      {label: 'GitHub', url: 'https://github.com/yorkeJohn/tainted-magic'},
      {label: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/tainted-magic'}
    ],
    badges: ['First Project', 'Minecraft Mod', 'Java'],
    startYear: 2015,
    type: 'Personal'
  }
]
