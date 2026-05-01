'use client'

import {CopyIcon} from '@phosphor-icons/react'
import Color from 'colorjs.io'
import type React from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {toast} from 'sonner'
import {ButtonGroup, Field, FieldLabel} from '@/components/ui'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Slider} from '@/components/ui/slider'
import classes from './color-picker.module.css'

const clamp = (v: number, min = 0, max = 1) => {
  return Math.min(max, Math.max(min, v))
}

const coords3 = (c: Color) => {
  return c.coords.map(v => v ?? 0) as [number, number, number]
}

export default function ColorPicker() {
  const [color, setColor] = useState<Color>(new Color('orange'))

  // Conversions via Color.js
  const hex = useMemo(() => color.toString({format: 'hex'}), [color])

  const rgb = useMemo(() => {
    const [r, g, b] = coords3(color.to('srgb')).map(v => Math.round(v * 255))
    return {r, g, b}
  }, [color])

  const hsl = useMemo(() => {
    const [h, s, l] = coords3(color.to('hsl')).map(Math.round)
    return {h, s, l}
  }, [color])

  const hsv = useMemo(() => {
    const [h, s, v] = coords3(color.to('hsv')).map(Math.round)
    return {h, s, v}
  }, [color])

  const oklch = useMemo(() => {
    const [l, c, h] = coords3(color.to('oklch'))
    return {l: Number(l.toFixed(3)), c: Number(c.toFixed(3)), h: Math.round(h)}
  }, [color])

  const hue = useMemo(() => {
    const [hue] = coords3(color.to('hsv'))
    return hue
  }, [color])

  const gradient = useMemo(() => {
    return `linear-gradient(to top, black, transparent), 
    linear-gradient(to right, white, hsl(${hue}, 100%, 50%))`
  }, [hue])

  const updateFromEvent = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()

      const x = clamp((e.clientX - rect.left) / rect.width)
      const y = clamp((e.clientY - rect.top) / rect.height)

      setColor(new Color('hsv', [hue, x * 100, (1 - y) * 100]))
    },
    [hue]
  )

  const onChangeHue = (hue: number) => {
    setColor(new Color('hsv', [hue, hsv.s, hsv.v]))
  }

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget
      el.setPointerCapture(e.pointerId)
      updateFromEvent(e)
    },
    [updateFromEvent]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return
      updateFromEvent(e)
    },
    [updateFromEvent]
  )

  const copyHex = useCallback(async (hex: string) => {
    await navigator.clipboard.writeText(hex)
    toast.success(`${hex} - Copied to clipboard`)
  }, [])

  const swatches = useMemo(() => {
    const stops = [0.98, 0.92, 0.85, 0.75, 0.62, 0.5, 0.38, 0.26, 0.16, 0.08] as const
    const colors = stops.map(l => new Color('oklch', [l, oklch.c, oklch.h]).to('srgb').toString({format: 'hex'}))
    return colors.map(color => {
      const onClick = () => copyHex(color)
      return <button type="button" key={color} className="w-8 h-8" style={{background: color}} onClick={onClick} />
    })
  }, [oklch, copyHex])

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <Card className="flex-1">
        <CardContent>
          <div
            role="application"
            aria-label="color picker"
            className="w-full h-40 cursor-crosshair relative mb-2"
            style={{background: gradient}}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
          >
            <div
              className="absolute w-3 h-3 rounded-full border border-white shadow"
              style={{
                left: `${hsv.s}%`,
                top: `${100 - hsv.v}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          <Slider
            min={0}
            max={360}
            value={[hue]}
            onValueChange={value => onChangeHue(value[0])}
            className={classes.hueSlider}
          />

          <div className="flex items-center gap-3 mt-8">
            <button type="button" className="h-40 flex-1" style={{background: hex}} onClick={() => copyHex(hex)} />
            <div className="grid grid-cols-2">{swatches}</div>
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Color Formats</CardTitle>
          <CardDescription>Values are editable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ColorField label="Hexidecimal" value={hex} onChange={setColor} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ColorField label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onChange={setColor} />
            <ColorField label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} onChange={setColor} />
            <ColorField label="HSV" value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`} onChange={setColor} />
            <ColorField label="OKLCH" value={`oklch(${oklch.l} ${oklch.c} ${oklch.h})`} onChange={setColor} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ColorField({value, label, onChange}: {value: string; label: string; onChange: (color: Color) => void}) {
  const lastValid = useRef(value)
  const [local, setLocal] = useState(value)

  useEffect(() => {
    setLocal(value)
    lastValid.current = value
  }, [value])

  const commit = () => {
    try {
      const next = new Color(local)
      lastValid.current = local
      onChange(next)
    } catch {
      setLocal(lastValid.current)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commit()
      e.currentTarget.blur()
    }
  }

  const onCopy = async () => {
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard')
  }

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <ButtonGroup>
        <Input
          className="font-mono"
          value={local}
          onChange={e => setLocal(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
        />
        <Button size="icon" variant="outline" onClick={onCopy}>
          <CopyIcon />
        </Button>
      </ButtonGroup>
    </Field>
  )
}
