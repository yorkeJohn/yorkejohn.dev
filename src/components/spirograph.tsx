'use client'

import {PointMaterial, Points} from '@react-three/drei'
import {Canvas, useFrame} from '@react-three/fiber'
import {Suspense, useMemo, useRef} from 'react'
import type * as THREE from 'three'

type Spiro = {
  R: number
  r: number
  d: number
}

type SpiroOptions = {
  curves: Spiro[]
  samples?: number
  speed?: number
}

function spiroPoint(theta: number, R: number, r: number, d: number) {
  const k = (R - r) / r
  const x = (R - r) * Math.cos(theta) + d * Math.cos(k * theta)
  const y = (R - r) * Math.sin(theta) - d * Math.sin(k * theta)
  return {x, y}
}

function buildCurve(options: SpiroOptions, thetaOffset: number = 0) {
  const {curves, samples = 3000} = options
  const pts: {x: number; y: number}[] = []

  const maxTheta = Math.PI * 2 * 30

  for (const curve of curves) {
    const {R, r, d} = curve

    for (let i = 0; i < samples; i++) {
      const t = (i / samples) * maxTheta + thetaOffset

      const _r = R * r
      const _d = _r * d

      pts.push(spiroPoint(t, R, _r, _d))
    }
  }

  return pts
}

function Scene({options}: {options: SpiroOptions}) {
  const {samples = 3000, speed = 0.5, curves} = options
  const ref = useRef<THREE.Points | null>(null)

  const positions = useMemo(() => new Float32Array(samples * 3 * curves.length), [samples, curves])

  const thetaOffset = useRef(0)

  useFrame((_, delta) => {
    thetaOffset.current += delta * speed * 0.15

    const curve = buildCurve(options, thetaOffset.current)

    for (let i = 0; i < curve.length; i++) {
      const p = curve[i]

      const idx = i * 3

      positions[idx] = p.x
      positions[idx + 1] = p.y
      positions[idx + 2] = 0
    }

    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial size={0.01} color="white" sizeAttenuation depthWrite={false} transparent opacity={0.9} />
    </Points>
  )
}

export function Spirograph({options}: {options: SpiroOptions}) {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{position: [0, 0, 1]}} className="bg-[#000a14]">
        <Scene options={options} />
      </Canvas>
    </Suspense>
  )
}
