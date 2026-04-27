import Link from 'next/link'
import {Button} from '@/components/ui'
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'

export default function NotFound() {
  return (
    <body>
      <main className="p-8 max-w-xl mx-auto">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>404: Not Found</AlertTitle>
          <AlertDescription>
            The page you are looking for does not exist. Please verify the URL and try again.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline">
          <Link href="/">Back to safety</Link>
        </Button>
      </main>
    </body>
  )
}
