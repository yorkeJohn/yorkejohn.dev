'use client'

import {Terminal as XTerminal} from '@xterm/xterm'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useThemeTokens} from '@/hooks'
import {playSound} from '@/lib/play-sound'

import '@xterm/xterm/css/xterm.css'

export type CommandDef = {
  description: string
  // biome-ignore lint/suspicious/noConfusingVoidType: allowed for simplicity
  handler: (...args: string[]) => string | void
}

type TerminalProps = {
  commands: Record<string, CommandDef>
  motd?: string
  prompt: string
} & React.ComponentPropsWithoutRef<'div'>

export function Terminal({commands, motd = '', prompt, ...props}: TerminalProps) {
  const {ref, terminal} = useTerminal()
  const initializedRef = useRef(false)
  const currentRef = useRef('')

  const _prompt = `\x1b[32m${prompt}\x1b[0m `

  const _commands = useMemo(() => {
    const result = {...commands}

    result.motd = {
      description: 'Display the welcome message',
      handler: () => motd
    }

    result.clear = {
      description: 'Clear the terminal',
      handler: () => {
        if (!terminal) return
        terminal.reset()
      }
    }

    result.help = {
      description: 'List available commands',
      handler: (): string => {
        const helpText = Object.entries(result)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([name, def]) => `\t${name}\t: ${def.description}`)
          .join('\n')
        return `Available commands\n${helpText}`
      }
    }

    return result
  }, [motd, commands, terminal])

  const execute = useCallback(
    async (input: string) => {
      if (!terminal || !input) return

      const [commandName, ...args] = input.split(/\s+/)

      const command = _commands[commandName]
      const output = command ? command.handler(...args) : `Command not found: ${commandName}`
      if (output) await new Promise<void>(resolve => terminal.writeln(output, resolve))
      playSound('button')
    },
    [terminal, _commands]
  )

  useEffect(() => {
    if (!terminal || initializedRef.current) return
    initializedRef.current = true

    terminal.writeln(motd)
    terminal.write(_prompt)
  }, [terminal, _prompt, motd])

  const tokens = useThemeTokens()
  useEffect(() => {
    if (!terminal) return
    terminal.options.theme = {
      background: tokens['--background'],
      foreground: tokens['--foreground'],
      green: tokens['--accent-foreground'],
      cursor: tokens['--accent-foreground']
    }
  }, [terminal, tokens])

  useEffect(() => {
    if (!terminal) return

    const disposable = terminal.onData(async data => {
      switch (data) {
        case '\r': {
          // enter
          await new Promise<void>(resolve => terminal.writeln('', resolve))
          await execute(currentRef.current.trim())
          currentRef.current = ''
          terminal.write(_prompt)
          break
        }
        case '\u007F': {
          // backspace
          if (currentRef.current.length > 0) {
            currentRef.current = currentRef.current.slice(0, -1)
            terminal.write('\b \b')
            playSound('type')
          } else {
            playSound('disabled')
          }
          break
        }
        default: {
          // only append printable characters to prevent buffer corruption
          if (data >= ' ') {
            currentRef.current += data
            terminal.write(data)
            playSound('type')
          }
        }
      }
    })

    return () => disposable.dispose()
  }, [terminal, execute, _prompt])

  return <div ref={ref} {...props} />
}

function useTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XTerminal | null>(null)

  useEffect(() => {
    const instance = new XTerminal({
      cursorBlink: true,
      convertEol: true,
      fontSize: 12,
      scrollback: 0
    })

    if (ref.current) {
      instance.open(ref.current)
      instance.focus()
    }

    setTerminal(instance)

    return () => {
      instance.dispose()
      setTerminal(null)
    }
  }, [])

  return {ref, terminal}
}
