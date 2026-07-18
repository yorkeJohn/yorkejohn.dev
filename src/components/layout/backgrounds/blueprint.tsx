export default function Background() {
  const color = 'color-mix(in srgb, var(--color-primary) 30%, transparent)'

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${color} 1px, transparent 1px),
        linear-gradient(to right, ${color} 1px, transparent 1px)`,
        backgroundSize: '2rem 2rem'
      }}
    />
  )
}
