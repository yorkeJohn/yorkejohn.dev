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
  const {ref, terminal} = useXTerminal()
  const initializedRef = useRef(false)
  const shell = useShell()

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

    result.history = {
      description: 'Display command history',
      handler: () => shell.history.map((item, index) => `${index + 1} ${item}`).join('\n')
    }

    return result
  }, [motd, commands, terminal, shell])

  const replaceCurrentLine = useCallback(
    (value: string) => {
      if (!terminal) return

      terminal.write('\b \b'.repeat(shell.buffer.length))
      shell.buffer = value
      terminal.write(value)
    },
    [terminal, shell]
  )

  const execute = useCallback(
    async (input: string) => {
      if (!terminal) return

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

          const command = shell.buffer.trim()
          if (command) {
            shell.pushHistory(command)
          }

          await execute(command)

          shell.clearBuffer()
          terminal.write(_prompt)
          break
        }
        case '\u007F': {
          // backspace
          if (shell.buffer.length > 0) {
            shell.buffer = shell.buffer.slice(0, -1)
            shell.resetHistoryCursor()
            terminal.write('\b \b')
            playSound('type')
          } else {
            playSound('disabled')
          }
          break
        }
        case '\u001b[A': {
          // up
          const command = shell.prev()
          if (command !== null) {
            replaceCurrentLine(command)
          }
          break
        }

        case '\u001b[B': {
          // down
          const command = shell.next()
          if (command !== null) {
            replaceCurrentLine(command)
          }
          break
        }
        default: {
          // only append printable characters to prevent buffer corruption
          if (data >= ' ') {
            shell.buffer += data
            shell.resetHistoryCursor()
            terminal.write(data)
            playSound('type')
          }
        }
      }
    })

    return () => disposable.dispose()
  }, [terminal, _prompt, execute, replaceCurrentLine, shell])

  return <div ref={ref} {...props} />
}

function useXTerminal() {
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

function useShell() {
  const shellRef = useRef({
    buffer: '',
    history: [] as string[],
    historyCursor: -1
  })

  return useMemo(() => {
    const shell = shellRef.current
    return {
      // buffer
      get buffer() {
        return shell.buffer
      },
      set buffer(value: string) {
        shell.buffer = value
      },
      clearBuffer() {
        shell.buffer = ''
      },
      // history
      get history() {
        return [...shell.history]
      },
      pushHistory(command: string) {
        shell.history.push(command)
        shell.historyCursor = shell.history.length
      },
      resetHistoryCursor() {
        shell.historyCursor = shell.history.length
      },
      prev() {
        if (shell.history.length === 0) return null
        shell.historyCursor = Math.max(0, shell.historyCursor - 1)
        return shell.history[shell.historyCursor]
      },
      next() {
        if (shell.history.length === 0) return null
        shell.historyCursor = Math.min(shell.history.length, shell.historyCursor + 1)
        return shell.historyCursor === shell.history.length ? '' : shell.history[shell.historyCursor]
      }
    }
  }, [])
}
