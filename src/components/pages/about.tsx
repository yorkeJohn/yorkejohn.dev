import {Markdown} from '../markdown'

const markdown = `
# Example

Inline \`const x = 1\`

## JSON

\`\`\`json
{
  "name": "John",
  "role": "engineer"
}
\`\`\`

<img src="https://picsum.photos/600/300" />

[OpenAI](https://openai.com)
`

export function AboutPage() {
  return (
    <div className="container px-4 mx-auto">
      <Markdown content={markdown} />
    </div>
  )
}
