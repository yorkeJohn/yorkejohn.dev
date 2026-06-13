'use client'

import {useFetch, useInterval} from '@mantine/hooks'
import {ClockIcon, CloudIcon, MapPinIcon} from '@phosphor-icons/react'
import {useEffect, useState} from 'react'
import {Badge} from '@/components'
import {wmoToIcon} from '@/lib/wmo-to-icon'
import {Bgm} from './bgm'
import {Console} from './console'
import {Nav} from './nav'
import {MuteToggle} from './sounds'

export function Header() {
  return (
    <div className="my-4 sticky top-4 z-10">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Nav />
        <div className="inline-flex gap-1">
          <Badge variant="outline" className="font-mono text-primary-foreground">
            <MapPinIcon data-icon="inline-start" />
            Halifax, NS
          </Badge>
          <LocalTime />
          <LocalWeather />
          <MuteToggle />
          <Bgm />
          <Console />
        </div>
      </div>
    </div>
  )
}

const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Halifax',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
})

function LocalTime() {
  const [time, setTime] = useState<string>('--:--:--')
  const update = () => setTime(formatter.format(new Date()))
  useEffect(update, []) // update on mount
  useInterval(update, 1000, {autoInvoke: true}) // update every second

  return (
    <Badge variant="outline" className="font-mono text-primary-foreground">
      <ClockIcon data-icon="inline-start" />
      {time} AST
    </Badge>
  )
}

type WeatherData = {
  current_weather: {
    is_day: boolean
    weathercode: number
    temperature: number
    windspeed: number
  }
}

function LocalWeather() {
  const [lat, lng] = [44.6476, -63.5803] // citadel hill
  const {data, loading} = useFetch<WeatherData>(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
  )

  if (!data || loading) {
    return (
      <Badge variant="outline" className="font-mono text-primary-foreground">
        <CloudIcon data-icon="inline-start" />
        --&deg;C
      </Badge>
    )
  }

  const {is_day, weathercode, temperature, windspeed} = data.current_weather
  const Icon = wmoToIcon(weathercode, windspeed, is_day)

  return (
    <Badge variant="outline" className="font-mono text-primary-foreground">
      <Icon data-icon="inline-start" />
      {temperature}&deg;C
    </Badge>
  )
}
