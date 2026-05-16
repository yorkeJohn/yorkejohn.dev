import {z} from 'zod'

const PushEventSchema = z.object({
  type: z.literal('PushEvent'),
  created_at: z.coerce.date(),
  repo: z.object({
    name: z.string()
  }),
  payload: z.object({
    ref: z.string(),
    before: z.string(),
    head: z.string()
  })
})

const toActivity = (event: z.infer<typeof PushEventSchema>) => {
  const repo = event.repo.name
  const repoUrl = `https://github.com/${repo}`
  const {before, head, ref} = event.payload
  return {
    repo,
    repoUrl,
    branch: ref.split('/').slice(2).join('/'),
    compareUrl: `${repoUrl}/compare/${before}...${head}`,
    pushedAt: event.created_at
  }
}

const ActivitySchema = PushEventSchema.transform(toActivity)
type Activity = z.infer<typeof ActivitySchema>

async function getActivity(): Promise<Activity[]> {
  // Get 5 latest push events from GitHub API
  const res = await fetch('https://api.github.com/users/yorkeJohn/events/public')
  const events: unknown[] = await res.json()
  return events
    .map(event => ActivitySchema.safeParse(event))
    .filter(parsed => parsed.success)
    .map(parsed => parsed.data)
    .slice(0, 5)
}

export const activity = getActivity()
