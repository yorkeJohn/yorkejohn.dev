export function Footer() {
  return (
    <footer className="p-4 text-sm font-mono text-muted-foreground text-center">
      &copy; John Yorke / yorkejohn.dev / {process.env.VERSION}
    </footer>
  )
}
