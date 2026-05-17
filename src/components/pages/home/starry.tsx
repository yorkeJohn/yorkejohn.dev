'use client'

import {PointMaterial, Points, type PointsInstancesProps} from '@react-three/drei'
import {Canvas, useFrame} from '@react-three/fiber'
import * as random from 'maath/random'
import {Suspense, useRef, useState} from 'react'
import type {PointsMaterial as PointsMaterialType, Points as PointsType} from 'three'

const COUNT = 2000

function StarryScene(props: PointsInstancesProps) {
  const pointsRef = useRef<PointsType | null>(null)
  const materialRef = useRef<PointsMaterialType | null>(null)

  const [sphere] = useState(() => random.inSphere(new Float32Array(COUNT * 3), {radius: 1.2}))

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 10
      pointsRef.current.rotation.y -= delta / 15
    }

    // fade in
    if (materialRef.current && materialRef.current.opacity < 1) {
      materialRef.current.opacity += delta / 3
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} stride={3} positions={sphere as Float32Array} frustumCulled {...props}>
        <PointMaterial
          ref={materialRef}
          transparent
          color="#fff"
          opacity={0}
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export function Starry() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{position: [0, 0, 1]}}>
        <StarryScene />
      </Canvas>
    </Suspense>
  )
}
