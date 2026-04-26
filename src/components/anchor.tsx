import type React from 'react'

export function Anchor(props: React.ComponentProps<'a'>) {
  const {children, ...rest} = props
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
