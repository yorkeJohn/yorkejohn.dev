import type React from 'react'

export function PageSection({children, label, ...rest}: React.ComponentProps<'div'> & {label: string}) {
  return (
    <div {...rest}>
      <div className="mb-1 font-mono text-accent text-xs uppercase">/ {label}</div>
      <hr className="border-accent" />
      {children}
    </div>
  )
}
