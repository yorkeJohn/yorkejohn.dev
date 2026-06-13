import {useEffect, useState} from 'react'

function readThemeTokens() {
  const styles = getComputedStyle(document.documentElement)
  const tokens: Record<string, string> = {}

  for (const key of styles) {
    if (!key.startsWith('--')) continue
    tokens[key] = styles.getPropertyValue(key).trim()
  }
  return tokens
}

export function useThemeTokens() {
  const [tokens, setTokens] = useState<Record<string, string>>({})

  useEffect(() => {
    const update = () => setTokens(readThemeTokens())
    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme']
    })

    return () => observer.disconnect()
  }, [])

  return tokens
}
