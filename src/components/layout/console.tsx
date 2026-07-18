'use client'

import {useDisclosure, useHotkeys} from '@mantine/hooks'
import {TerminalWindowIcon} from '@phosphor-icons/react'
import {useTheme} from 'next-themes'
import {SITE_NAME} from '@/lib/constants'
import {playSound} from '@/lib/play-sound'
import {Badge} from '../badge'
import {DraggableWindow} from '../draggable-window'
import {type CommandDef, Terminal} from '../terminal'

const motd = `[${SITE_NAME}]
Type 'help' to list available commands.
`

const contact = `Contact information
Email    : yorkejohn02@gmail.com
GitHub   : yorkeJohn
LinkedIn : yorkejohn
Discord  : tadashi_3
`

export function Console() {
  const {setTheme, themes} = useTheme()
  const [opened, {open, close}] = useDisclosure()

  const onOpen = () => {
    playSound('select')
    open()
  }

  const onClose = () => {
    playSound('swipe')
    close()
  }

  useHotkeys([['/', onOpen]])

  const commands: Record<string, CommandDef> = {
    contact: {
      description: 'Display contact information',
      handler: () => contact
    },
    echo: {
      description: 'Print text to the console',
      handler: (...args) => args.join(' ')
    },
    exit: {
      description: 'Exit the console',
      handler: onClose
    },
    themes: {
      description: 'List available themes',
      handler: () => themes.join('\n')
    },
    theme: {
      description: 'Set the theme',
      handler: (...args) => {
        const [theme] = args
        if (!theme || !themes.includes(theme)) return 'Invalid theme'
        setTheme(theme)
        return `Theme set to ${theme}`
      }
    },
    version: {
      description: 'Display the website version',
      handler: () => process.env.VERSION
    }
  }

  return (
    <span className="hidden md:inline-flex">
      <Badge className="font-mono cursor-pointer interact:highlight" onClick={onOpen}>
        [/]&nbsp;Console
      </Badge>
      <DraggableWindow
        type="free"
        title="yorkejohn.dev - console"
        iconLeft={TerminalWindowIcon}
        opened={opened}
        onClose={onClose}
      >
        <Terminal commands={commands} motd={motd} prompt="user@yorkejohn.dev $" className="p-2" />
      </DraggableWindow>
    </span>
  )
}
