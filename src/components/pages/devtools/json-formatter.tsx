'use client'

import {CopyIcon} from '@phosphor-icons/react'
import {useState} from 'react'
import {toast} from 'sonner'
import {CodeBlock} from '@/components'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  Textarea
} from '@/components/ui'

export function JsonFormatter() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onFormat = () => {
    setError(false)
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch {
      setError(true)
    }
  }

  const onCopy = async () => {
    await navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <Field className="h-full">
            <Textarea
              rows={6}
              className="h-full font-mono"
              value={input}
              onChange={e => setInput(e.currentTarget.value)}
              placeholder="Your unformatted JSON data..."
            />
            <FieldError>{error && 'Invalid JSON data'}</FieldError>
          </Field>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={onFormat}>Format</Button>
        </CardFooter>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock lang="json" className="sm:h-96 h-72">
            {output}
          </CodeBlock>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={onCopy}>
            <CopyIcon data-icon="inline-start" /> Copy to clipboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
