import {Highlight, type HighlightProps} from './highlight'
import {ScrollArea, type ScrollAreaProps, ScrollBar} from './ui'

type CodeBlockProps = HighlightProps & ScrollAreaProps

export function CodeBlock({language, children, ...rest}: CodeBlockProps) {
  return (
    <ScrollArea {...rest}>
      <Highlight language={language}>{children}</Highlight>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
