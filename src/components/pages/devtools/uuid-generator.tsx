'use client'

import {ArrowClockwiseIcon} from '@phosphor-icons/react'
import {useEffect, useState} from 'react'
import {CopyField} from '@/components'
import {Button, Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui'

const getUuids = (length: number) => {
  return Array.from({length}, () => crypto.randomUUID())
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])

  useEffect(() => {
    setUuids(getUuids(12))
  }, [])

  const onClick = () => {
    setUuids(getUuids(12))
  }

  const uuidFields = uuids.map(uuid => <CopyField key={uuid} value={uuid} className="w-full" />)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated UUIDs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">{uuidFields}</div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={onClick}>
          <ArrowClockwiseIcon data-icon="inline-start" />
          Regenerate UUIDs
        </Button>
      </CardFooter>
    </Card>
  )
}
