/* Image imports */
import type {StaticImageData} from 'next/image'
import {OG_SIZE, REPO_URL} from '@/lib/constants'
import bonsaiParlour from './images/bonsai-parlour.jpg'
import espressoChat from './images/espresso-chat.jpg'
import frenchVillage from './images/french-village.jpg'
import mantine from './images/mantine.png'
import metroThrift from './images/metro-thrift.jpg'
import navigator from './images/navigator.jpg'
import pixelSkyQuest from './images/pixel-skyquest.jpg'
import taintedMagic from './images/tainted-magic.png'
import tfcBetterBlastFurnace from './images/tfc-better-blast-furnace.png'

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
    title: 'yorkejohn.dev',
    description:
      'yorkejohn.dev is a design-forward personal website that showcases both technical craft and individual perspective.',
    image: {src: '/opengraph-image', ...OG_SIZE},
    links: [{label: 'GitHub', url: REPO_URL}],
    badges: ['Design', 'Next.js', 'Three.js'],
    startYear: 2026,
    type: 'Personal'
  },
  {
    title: 'Navigator Cloud',
    description:
      "Navigator Cloud is a first-in-class SaaS platform for the energy industry's most advanced forecasting model.",
    image: navigator,
    links: [{label: 'Homepage', url: 'https://posteritygroup.ca/navigator'}],
    badges: ['Full-stack', 'Product Engineering', 'React', 'Node.js', 'Rust'],
    startYear: 2024,
    type: 'Professional'
  },
  {
    title: 'Pixel SkyQuest',
    description: 'Pixel Skyquest is a top-down pixel-art puzzle-solving dungeon-crawler RPG, made with Unity.',
    image: pixelSkyQuest,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/pixel-skyquest'}],
    badges: ['Game Development', 'Unity', 'C#'],
    startYear: 2024,
    type: 'Academic'
  },
  {
    title: 'Mantine',
    description: 'Mantine is a fully-featured React components library.',
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
    description:
      'TFC Better Blast furnace is a tiny TerraFirmaCraft QoL mod that simplifies blast furnace construction.',
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
    description: "Web design project for Metro Thrift: Halifax's local mobile thrift store.",
    image: metroThrift,
    links: [{label: 'Visit Site', url: 'https://metrothrift.com'}],
    badges: ['Next.js', 'KeystoneJS'],
    startYear: 2023,
    type: 'Freelance'
  },
  {
    title: 'French Village Conservation Website',
    description:
      "Volunteer web design project for the French Village Woodland Conservation in St. Margaret's Bay, Nova Scotia.",
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
    description: 'Espresso Chat is an experimental low-level end-to-end encrypted chat protocol written in Java.',
    image: espressoChat,
    links: [{label: 'GitHub', url: 'https://github.com/larixsw/espresso-chat'}],
    badges: ['Java', 'Network Engineering'],
    startYear: 2023,
    type: 'Academic'
  },
  {
    title: 'The Bonsai Parlour',
    description: 'Web design project for The Bonsai Parlour: a fictional bonsai cafe.',
    image: bonsaiParlour,
    links: [{label: 'GitHub', url: 'https://github.com/yorkeJohn/bonsai-parlour'}],
    badges: ['Vanilla', 'PHP', 'Web Design'],
    startYear: 2022,
    type: 'Academic'
  },
  {
    title: 'Tainted Magic',
    description:
      'Tainted Magic is a popular Thaumcraft 4 expansion, adding content that sets new goals for even the most experienced Thaumaturges.',
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
