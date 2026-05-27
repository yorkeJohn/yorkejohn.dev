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
        className="group hover:bg-accent-foreground flex flex-col md:flex-row gap-2 py-2 cursor-pointer"
      >
        <div className="w-40">
          <Badge className="text-accent-foreground group-hover:text-background transition-none" variant="outline">
            {formatDistanceToNow(pushedAt, {addSuffix: true})}
          </Badge>
        </div>
        <div className="group-hover:text-background text-nowrap">
          Pushed to
          <span className="text-primary-foreground font-mono group-hover:text-inherit">&nbsp;{repo}&nbsp;</span>
          <br className="sm:hidden" />
          on branch
          <span className="text-primary-foreground font-mono group-hover:text-inherit">&nbsp;{branch}</span>
          <ArrowUpRightIcon className="inline" />
        </div>
      </Anchor>
    )
  })

  return <div className="flex flex-col pt-2">{items}</div>
}
