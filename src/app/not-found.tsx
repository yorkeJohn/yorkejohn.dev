import Link from 'next/link'
import {Alert, AlertDescription, AlertTitle, Button} from '@/components/ui'

export default function NotFound() {
  return (
    <main className="px-8 max-w-xl mx-auto">
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
  )
}
