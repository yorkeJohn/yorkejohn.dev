'use client'

import {useFetch, useInterval} from '@mantine/hooks'
import {ClockIcon, CloudIcon, MapPinIcon} from '@phosphor-icons/react'
import {useEffect, useState} from 'react'
import {Badge} from '@/components'
import {wmoToIcon} from '@/lib/wmo-to-icon'
import {Bgm} from './bgm'
import {Console} from './console'
import {MuteToggle} from './sounds'

export function Header() {
  return (
    <header className="my-4">
      <div className="flex justify-between gap-4">
        <div className="inline-flex">
          <Badge variant="transparent" className="font-mono text-primary-foreground">
            <MapPinIcon data-icon="inline-start" />
            Halifax, NS
          </Badge>
          <LocalTime />
          <LocalWeather />
        </div>
        <div className="inline-flex gap-1">
          <MuteToggle />
          <Bgm />
          <Console />
        </div>
      </div>
      <hr className="my-2" />
    </header>
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
    <Badge variant="transparent" className="font-mono text-primary-foreground">
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
      <Badge variant="transparent" className="font-mono text-primary-foreground">
        <CloudIcon data-icon="inline-start" />
        --&deg;C
      </Badge>
    )
  }

  const {is_day, weathercode, temperature, windspeed} = data.current_weather
  const Icon = wmoToIcon(weathercode, windspeed, is_day)

  return (
    <Badge variant="transparent" className="font-mono text-primary-foreground">
      <Icon data-icon="inline-start" />
      {temperature}&deg;C
    </Badge>
  )
}
