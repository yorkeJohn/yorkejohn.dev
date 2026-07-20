import {cn} from '@/lib/cn'

type MegaHeadingProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
  superText?: string | number
  margin?: boolean
}

export function MegaHeading({children, superText, className, margin = true, ...props}: MegaHeadingProps) {
  const baseClasses =
    'text-[48pt] md:text-[60pt] lg:text-[72pt] font-semibold leading-[0.8] tracking-tight font-heading text-muted'
  const marginClasses = 'my-8 md:my-12 lg:my-20'

  if (superText) {
    return (
      <div className={cn('flex items-start gap-2', margin && marginClasses, className)} {...props}>
        <div className={baseClasses}>{children}</div>
        <span className="text-primary-foreground text-lg md:text-xl lg:text-2xl">({superText})</span>
      </div>
    )
  }

  return (
    <div className={cn(baseClasses, margin && marginClasses, className)} {...props}>
      {children}
    </div>
  )
}
