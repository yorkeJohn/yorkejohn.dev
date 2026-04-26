import Image from 'next/image'

export function Avatar() {
  return (
    <Image
      width={128}
      height={128}
      quality={100}
      loading="eager"
      className="rounded-full"
      src="https://avatars.githubusercontent.com/u/12224398"
      alt="John's Avatar"
    />
  )
}
