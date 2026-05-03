import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

type MarkdownProps = {
  content: string
}

export async function Markdown({content}: MarkdownProps) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypePrettyCode, {theme: 'gruvbox-dark-hard'})
    .use(rehypeStringify)
    .process(content)

  // biome-ignore lint/security/noDangerouslySetInnerHtml: required for md rendering
  return <div className="max-w-none" dangerouslySetInnerHTML={{__html: String(file)}} />
}
