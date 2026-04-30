'use client'

import {CopyIcon} from '@phosphor-icons/react'
import type React from 'react'
import {toast} from 'sonner'
import {Button, ButtonGroup, Input} from '@/components/ui'

type CopyFieldProps = {
  value: string
}

export function CopyField({value, ...rest}: CopyFieldProps & React.ComponentProps<'div'>) {
  const onCopy = async () => {
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard')
  }

  return (
    <ButtonGroup {...rest}>
      <Input value={value} readOnly className="font-mono" onFocus={e => e.target.select()} />
      <Button type="button" size="icon" variant="outline" onClick={onCopy}>
        <CopyIcon />
      </Button>
    </ButtonGroup>
  )
}
