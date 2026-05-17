import {readLocalStorageValue} from '@mantine/hooks'
import Snd from 'snd-lib'
import type {SoundKeys} from 'snd-lib/dist/types'

export type SoundKey = SoundKeys[keyof SoundKeys]

const snd = new Snd()
const ready = snd.load(Snd.KITS.SND01)

/**
 * @param sound
 * ```ts
 * "button" | "select" | "swipe" | "type" | "toggle_on" | "toggle_off" |
 * "disabled" | "transition_down" | "transition_up" | "caution" | "celebration" |
 * "notification" | "progress_loop" | "ringtone_loop" | "tap"
 * ```
 */
export async function playSound(sound: SoundKey) {
  const muted = readLocalStorageValue({key: 'sounds-muted'})
  if (muted) return

  await ready
  try {
    snd.play(sound, {volume: 0.5})
  } catch {}
}
