'use client'

import {ArrowUpRightIcon} from '@phosphor-icons/react'
import {formatDistanceToNow} from 'date-fns'
import {use} from 'react'
import {Anchor} from '@/components'
import {activity} from './activity'

export function ActivityFeed() {
  const items = use(activity).map((item, index) => {
    const {repo, branch, compareUrl, pushedAt} = item

    return (
      <Anchor
        href={compareUrl}
        key={index}
        className="group flex cursor-pointer flex-col gap-2 interact:bg-accent-foreground py-2 md:flex-row md:items-center"
      >
        <div className="w-[22ch] text-accent-foreground text-xs group-interact:text-background">
          {formatDistanceToNow(pushedAt, {addSuffix: true})}
        </div>
        <div className="text-nowrap group-interact:text-background">
          Pushed to
          <span className="font-mono text-primary-foreground group-interact:text-inherit">&nbsp;{repo}&nbsp;</span>
          <br className="sm:hidden" />
          on branch
          <span className="font-mono text-primary-foreground group-interact:text-inherit">&nbsp;{branch}</span>
          <ArrowUpRightIcon className="inline" />
        </div>
      </Anchor>
    )
  })

  if (items.length === 0) {
    return <div className="pt-2 font-mono text-muted text-sm">No recent activity...</div>
  }

  return <div className="flex flex-col divide-y divide-dashed divide-accent">{items}</div>
}
