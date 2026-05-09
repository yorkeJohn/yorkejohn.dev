import type {Icon} from '@phosphor-icons/react'
import {BinaryIcon, BracketsCurlyIcon, LockIcon, PaletteIcon} from '@phosphor-icons/react/dist/ssr'
import {ColorPicker} from './color-picker/color-picker'
import {JsonFormatter} from './json-formatter'
import {JwtDecoder} from './jwt-decoder'
import {UuidGenerator} from './uuid-generator'

export type Devtool = {
  label: string
  description: string
  slug: string
  Icon: Icon
  Component: React.FC
}

export const devtools = [
  {
    label: 'JSON Formatter',
    description: 'Format and view JSON data',
    slug: 'json-formatter',
    Icon: BracketsCurlyIcon,
    Component: JsonFormatter
  },
  {
    label: 'UUID Generator',
    description: 'Generate random UUIDs',
    slug: 'uuid-generator',
    Icon: BinaryIcon,
    Component: UuidGenerator
  },
  {
    label: 'JWT Decoder',
    description: 'Decode encoded JSON web tokens',
    slug: 'jwt-decoder',
    Icon: LockIcon,
    Component: JwtDecoder
  },
  {
    label: 'Color Picker',
    description: 'Pick and convert colors',
    slug: 'color-picker',
    Icon: PaletteIcon,
    Component: ColorPicker
  }
] as const satisfies ReadonlyArray<Devtool>

const devtoolsMap: Map<string, Devtool> = new Map(devtools.map(dt => [dt.slug, dt]))
export const getDevtoolBySlug = (slug: string): Devtool | undefined => {
  return devtoolsMap.get(slug)
}
