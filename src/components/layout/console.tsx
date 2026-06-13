'use client'

import {useDisclosure, useHotkeys} from '@mantine/hooks'
import {TerminalWindowIcon} from '@phosphor-icons/react'
import {useTheme} from 'next-themes'
import {SITE_NAME} from '@/lib/constants'
import {playSound} from '@/lib/play-sound'
import {Badge} from '../badge'
import {DraggableWindow} from '../draggable-window'
import {type CommandDef, Terminal} from '../terminal'

const welcome = `[${SITE_NAME}]
Type 'help' to list available commands.
`

export function Console() {
  const {setTheme, themes} = useTheme()

  const commands: Record<string, CommandDef> = {
    echo: {
      description: 'Print text to the console',
      handler: (...args) => args.join(' ')
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
    }
  }

  const [opened, {open, close}] = useDisclosure()

  const onOpen = () => {
    playSound('toggle_on')
    open()
  }
  const onClose = () => {
    playSound('toggle_off')
    close()
  }

  useHotkeys([['/', onOpen]])

  return (
    <span className="hidden md:inline-flex">
      <Badge className="font-mono hover:bg-accent-foreground hover:text-background cursor-pointer" onClick={onOpen}>
        [/]&nbsp;Console
      </Badge>
      <DraggableWindow
        type="free"
        title="yorkejohn.dev - console"
        iconLeft={TerminalWindowIcon}
        opened={opened}
        onClose={onClose}
      >
        <Terminal commands={commands} motd={welcome} prompt="user@yorkejohn.dev $" className="p-2" />
      </DraggableWindow>
    </span>
  )
}
