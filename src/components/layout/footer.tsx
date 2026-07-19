export function Footer() {
  return (
    <footer className="px-4 container mx-auto mt-12 md:mt-16">
      <div className="py-4 border-t text-sm font-mono text-muted text-center">
        &copy; John Yorke / yorkejohn.dev / {process.env.VERSION}
      </div>
    </footer>
  )
}
