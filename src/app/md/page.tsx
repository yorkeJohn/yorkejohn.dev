import Master, {metadata} from '@/content/master.mdx'

export default function Page() {
  return (
    <div>
      <pre>{JSON.stringify(metadata)}</pre>
      <div className="typography mx-auto">
        <Master />
      </div>
    </div>
  )
}
