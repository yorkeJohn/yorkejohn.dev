'use client'

import {CopyIcon} from '@phosphor-icons/react'
import Color from 'colorjs.io'
import type React from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {toast} from 'sonner'
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
  Slider
} from '@/components/ui'

import classes from './color-picker.module.css'

export function ColorPicker() {
  const [color, setColor] = useState<Color>(new Color('orange'))

  const copyHex = useCallback(async (color: Color) => {
    const hex = color.to('srgb').toString({format: 'hex'})
    await navigator.clipboard.writeText(hex)
    toast.success(`${hex} - Copied to clipboard`)
  }, [])

  const swatches = useMemo(() => {
    const stops = [0.98, 0.92, 0.85, 0.75, 0.62, 0.5, 0.38, 0.26, 0.16, 0.08] as const

    return stops.map((stop, index) => {
      const swatch = color.clone().set('oklch.l', stop)
      return (
        <button
          type="button"
          key={index}
          className="w-8 h-8"
          style={{background: swatch.to('srgb').toString()}}
          onClick={() => copyHex(swatch)}
        />
      )
    })
  }, [color, copyHex])

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <Card className="flex-1">
        <CardContent>
          <GradientBox value={color} onChange={setColor} />
          <Slider
            min={0}
            max={360}
            className={classes.hueSlider}
            value={[color.get('hsv.h')]}
            onValueChange={value => setColor(color.clone().set('hsv.h', value[0]))}
          />

          <div className="flex items-center gap-3 mt-8">
            <button
              type="button"
              className="h-40 flex-1"
              style={{background: color.to('srgb').toString()}}
              onClick={() => copyHex(color)}
            />
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
          <div className="grid grid-cols-2 gap-4">
            <ColorField label="Hex" value={color.toString({format: 'hex'})} onChange={setColor} />
            <ColorField label="RGB" value={color.toString({format: 'rgb', precision: 3})} onChange={setColor} />
            <ColorField label="HSL" value={color.toString({format: 'hsl', precision: 3})} onChange={setColor} />
            <ColorField label="OKLCH" value={color.toString({format: 'oklch', precision: 3})} onChange={setColor} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type GradientBoxProps = {
  value: Color
  onChange: (color: Color) => void
}

type PointerHandler = (e: React.PointerEvent<HTMLDivElement>) => void

const clamp = (v: number, min = 0, max = 1) => {
  return Math.min(max, Math.max(min, v))
}

function GradientBox({value, onChange}: GradientBoxProps) {
  const [hue, sat, val] = value.hsv.map(c => c ?? 0)

  const update = useCallback<PointerHandler>(
    e => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = clamp((e.clientX - rect.left) / rect.width)
      const y = clamp((e.clientY - rect.top) / rect.height)

      onChange(new Color('hsv', [hue, x * 100, (1 - y) * 100]))
    },
    [hue, onChange]
  )

  const handlePointerDown = useCallback<PointerHandler>(
    e => {
      e.currentTarget.setPointerCapture(e.pointerId)
      update(e)
    },
    [update]
  )

  const handlePointerMove = useCallback<PointerHandler>(
    e => {
      if (e.buttons !== 1) return
      update(e)
    },
    [update]
  )

  const background = `linear-gradient(to top, black, transparent), 
    linear-gradient(to right, white, hsl(${hue}, 100%, 50%))`

  return (
    <div
      role="application"
      aria-label="color picker"
      className="w-full h-40 cursor-crosshair relative mb-2"
      style={{background}}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <div
        className="absolute w-3 h-3 rounded-full border border-white shadow"
        style={{left: `${sat}%`, top: `${100 - val}%`, transform: 'translate(-50%, -50%)'}}
      />
    </div>
  )
}

type ColorFieldProps = {
  value: string
  label: string
  onChange: (color: Color) => void
}

function ColorField({value, label, onChange}: ColorFieldProps) {
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
