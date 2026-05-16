import type React from 'react'

export function PageSection({children, label, ...rest}: React.ComponentProps<'div'> & {label: string}) {
  return (
    <div {...rest}>
      <div className="font-mono text-lime-600 mb-1 uppercase">/ {label}</div>
      <hr className="border-lime-600" />
      {children}
    </div>
  )
}
