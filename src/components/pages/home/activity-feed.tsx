'use client'

import {ArrowUpRightIcon} from '@phosphor-icons/react'
import {formatDistanceToNow} from 'date-fns'
import {use} from 'react'
import {Anchor, Badge} from '@/components'
import {activity} from '@/lib/activity'

export function ActivityFeed() {
  const items = use(activity).map((item, index) => {
    const {repo, branch, compareUrl, pushedAt} = item

    return (
      <Anchor
        href={compareUrl}
        key={index}
        className="group interact:bg-accent-foreground flex flex-col md:flex-row gap-2 md:gap-8 py-2 cursor-pointer"
      >
        <div>
          <Badge className="text-accent-foreground group-interact:text-background w-40" variant="outline">
            {formatDistanceToNow(pushedAt, {addSuffix: true})}
          </Badge>
        </div>
        <div className="group-interact:text-background text-nowrap">
          Pushed to
          <span className="text-primary-foreground font-mono group-interact:text-inherit">&nbsp;{repo}&nbsp;</span>
          <br className="sm:hidden" />
          on branch
          <span className="text-primary-foreground font-mono group-interact:text-inherit">&nbsp;{branch}</span>
          <ArrowUpRightIcon className="inline" />
        </div>
      </Anchor>
    )
  })

  if (items.length === 0) {
    return <div className="pt-2 text-sm text-muted font-mono">No recent activity...</div>
  }

  return <div className="flex flex-col pt-2">{items}</div>
}
