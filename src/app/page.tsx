import {CaretDownIcon} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import {Starry} from '@/components/starry'

export default async function Page() {
  return (
    <main className="relative z-0">
      <div className="w-full h-full fixed -z-10 bg-[#030014]">
        <Starry />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 relative">
        <Image
          width={128}
          height={128}
          quality={100}
          loading="eager"
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/12224398"
          alt="John's Profile Picture"
        />
        <h1 className="font-heading font-bold text-[48pt]">John Yorke</h1>
        <p>Software & Data Engineer | Halifax, NS, Canada</p>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <CaretDownIcon size={32} className="animate-bounce" />
        </div>
      </div>
      <div className="h-screen" />
    </main>
  )
}
