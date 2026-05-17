import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudMoonIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  MoonIcon,
  MoonStarsIcon,
  SunDimIcon,
  SunIcon,
  WindIcon
} from '@phosphor-icons/react'

export function wmoToIcon(code: number, windSpeed: number, isDay: boolean = true) {
  // Windy
  if (code <= 3 && windSpeed >= 45) return WindIcon

  // Fair
  if (code === 0) return isDay ? SunIcon : MoonStarsIcon
  if (code === 1) return isDay ? SunDimIcon : MoonIcon
  if (code === 2) return isDay ? CloudSunIcon : CloudMoonIcon
  if (code === 3) return CloudIcon

  // Fog
  if (code >= 45 && code <= 48) return CloudFogIcon

  // Rain
  if (code >= 51 && code <= 57) return CloudRainIcon
  if (code >= 61 && code <= 67) return CloudRainIcon
  if (code >= 80 && code <= 82) return CloudRainIcon

  // Snow
  if (code >= 71 && code <= 77) return CloudSnowIcon
  if (code >= 85 && code <= 86) return CloudSnowIcon

  // Thunderstorms
  if (code >= 95 && code <= 99) return CloudLightningIcon

  return CloudIcon
}
