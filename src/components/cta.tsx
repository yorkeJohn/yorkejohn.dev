import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/lib/cn'

type CtaProps = React.ComponentProps<'button'> & {
  asChild?: boolean
  children?: React.ReactNode
}

export function Cta({className, asChild, children, ...rest}: CtaProps) {
  const Component = asChild ? Slot : 'button'
  const classes =
    'border border-accent text-accent-foreground rounded-full inline-flex items-center justify-center text-sm p-1 interact:highlight interact:border-transparent gap-1'

  return (
    <Component className={cn(classes, className)} {...rest}>
      {children}
    </Component>
  )
}
