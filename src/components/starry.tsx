'use client'

import {PointMaterial, Points, type PointsInstancesProps} from '@react-three/drei'
import {Canvas, useFrame} from '@react-three/fiber'
import * as random from 'maath/random'
import {Suspense, useRef, useState} from 'react'
import type {Points as PointsType} from 'three'

const COUNT = 2000

function StarryScene(props: PointsInstancesProps) {
  const ref = useRef<PointsType | null>(null)
  const [sphere] = useState(() => random.inSphere(new Float32Array(COUNT * 3), {radius: 1.2}))

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} stride={3} positions={new Float32Array(sphere)} frustumCulled {...props}>
        <PointMaterial transparent color="#fff" size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

export function Starry() {
  return (
    <Canvas camera={{position: [0, 0, 1]}}>
      <Suspense fallback={null}>
        <StarryScene />
      </Suspense>
    </Canvas>
  )
}
