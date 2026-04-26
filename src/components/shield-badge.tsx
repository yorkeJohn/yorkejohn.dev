type ShieldBadgeOptions = {
  text: string
  color: string
  logo?: string
  logoColor?: string
}

type ShieldBadgeProps = {
  options: ShieldBadgeOptions
}

export function ShieldBadge({options}: ShieldBadgeProps) {
  const {text, color, logo, logoColor} = options
  const src = `https://img.shields.io/badge/${text}-${color}?style=for-the-badge&logo=${logo}&logoColor=${logoColor}`
  // biome-ignore lint/performance/noImgElement: img is required for shields.io badges
  return <img src={src} alt={text} />
}
