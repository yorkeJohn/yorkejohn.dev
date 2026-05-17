'use client'

import {ArrowUpRightIcon} from '@phosphor-icons/react'
import {formatDistanceToNow} from 'date-fns'
import {use} from 'react'
import {Anchor} from '@/components/anchor'
import {Badge} from '@/components/ui'
import {activity} from '@/lib/activity'

export function ActivityFeed() {
  const items = use(activity).map((item, index) => {
    const {repo, branch, compareUrl, pushedAt} = item

    return (
      <Anchor
        href={compareUrl}
        key={index}
        className="group hover:bg-lime-300 flex flex-col md:flex-row gap-2 py-2 cursor-pointer"
      >
        <div className="w-40">
          <Badge className="text-lime-300 group-hover:text-black transition-none" variant="outline">
            {formatDistanceToNow(pushedAt, {addSuffix: true})}
          </Badge>
        </div>
        <div className="group-hover:text-black text-nowrap">
          Pushed to
          <span className="text-amber-200 font-mono group-hover:text-inherit">&nbsp;{repo}&nbsp;</span>
          <br className="sm:hidden" />
          on branch
          <span className="text-amber-200 font-mono group-hover:text-inherit">&nbsp;{branch}</span>
          <ArrowUpRightIcon className="inline" />
        </div>
      </Anchor>
    )
  })

  return <div className="flex flex-col pt-2">{items}</div>
}
