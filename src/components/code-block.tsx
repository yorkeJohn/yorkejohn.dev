import {Highlight, type HighlightProps} from './highlight'
import {ScrollArea, type ScrollAreaProps, ScrollBar} from './ui'

type CodeBlockProps = HighlightProps & ScrollAreaProps

export function CodeBlock({lang, children, ...rest}: CodeBlockProps) {
  return (
    <ScrollArea {...rest}>
      <Highlight lang={lang}>{children}</Highlight>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
