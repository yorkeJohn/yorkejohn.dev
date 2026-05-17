export function Footer() {
  return (
    <footer className="px-4 z-0 container mx-auto mt-12 md:mt-16">
      <div className="py-4 border-t border-lime-600 text-sm font-mono text-muted-foreground text-center">
        &copy; John Yorke / yorkejohn.dev / {process.env.VERSION}
      </div>
    </footer>
  )
}
