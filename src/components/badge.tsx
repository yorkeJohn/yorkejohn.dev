import {Root} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/cn'

const variants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-xs border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-foreground/90 [a]:hover:bg-primary/80',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        transparent: 'text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export type BadgeProps = React.ComponentProps<'span'> & VariantProps<typeof variants> & {asChild?: boolean}

export function Badge({className, variant = 'default', asChild = false, ...props}: BadgeProps) {
  const Component = asChild ? Root : 'span'
  return (
    <Component data-slot="badge" data-variant={variant} className={cn(variants({variant}), className)} {...props} />
  )
}
