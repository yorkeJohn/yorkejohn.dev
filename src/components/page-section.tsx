import type React from 'react'
import {cn} from '@/lib/cn'

export function PageSection({children, label, ...props}: React.ComponentProps<'div'> & {label: string}) {
  const {className, ...rest} = props
  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <div className="mb-1 font-mono text-accent text-xs uppercase">/ {label}</div>
      <hr className="border-accent" />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
