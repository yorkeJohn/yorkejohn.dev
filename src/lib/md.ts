import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

export const loadMd = (path: string): Promise<string> => {
  return readFile(join(process.cwd(), 'content', path), 'utf-8')
}
