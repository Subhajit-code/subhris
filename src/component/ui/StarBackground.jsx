import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload, Sphere, Float, Stars, Sparkles } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

const StarField = (props) => {
  const ref = useRef()
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(15000), { radius: 1.5 }))
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20
    ref.current.rotation.y -= delta / 25
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  )
}

const Nebula = () => {
    const ref = useRef()
    const [positions] = React.useState(() => random.inSphere(new Float32Array(2000), { radius: 10 }))
    
    useFrame((state, delta) => {
        ref.current.rotation.y += delta * 0.02
    })

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#e81cff"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.05}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

const Galaxy = () => {
    const pointsRef = useRef()
    const dustRef = useRef()
    
    // Parameters for a high-end galaxy
    const parameters = useMemo(() => ({
        count: 60000,
        size: 0.015,
        radius: 12,
        branches: 3,
        spin: 1.5,
        randomness: 0.5,
        randomnessPower: 3.5,
        insideColor: '#ff00e5',
        outsideColor: '#00d2ff'
    }), [])

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(parameters.count * 3)
        const cols = new Float32Array(parameters.count * 3)
        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * parameters.radius
            const spinAngle = radius * parameters.spin
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

            // Logarithmic randomness distribution
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

            pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
            pos[i3 + 1] = randomY * 0.4 // Flatten the galaxy
            pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            // Dynamic color blending based on radius
            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / parameters.radius)

            cols[i3] = mixedColor.r
            cols[i3 + 1] = mixedColor.g
            cols[i3 + 2] = mixedColor.b
        }
        return [pos, cols]
    }, [parameters])

    const [dustPositions] = useMemo(() => {
        const pos = new Float32Array(3000 * 3)
        for(let i = 0; i < 3000; i++) {
            const i3 = i * 3
            const r = Math.random() * 15
            const angle = Math.random() * Math.PI * 2
            pos[i3] = Math.cos(angle) * r
            pos[i3+1] = (Math.random() - 0.5) * 2
            pos[i3+2] = Math.sin(angle) * r
        }
        return [pos]
    }, [])

    useFrame((state, delta) => {
        pointsRef.current.rotation.y += delta * 0.02
        dustRef.current.rotation.y += delta * 0.01
    })

    return (
        <group>
            <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>
            <Points ref={dustRef} positions={dustPositions} stride={3}>
                <PointMaterial
                    transparent
                    color="#40c9ff"
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.03}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

const Singularity = () => {
    const groupRef = useRef()
    const accretionRef = useRef()
    
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        groupRef.current.scale.setScalar(1 + Math.sin(t) * 0.02)
        accretionRef.current.rotation.z += delta * 0.5
    })

    return (
        <group ref={groupRef}>
            {/* The Black Hole Core */}
            <Sphere args={[0.4, 32, 32]}>
                <meshBasicMaterial color="#000" />
            </Sphere>
            <Sphere args={[0.45, 32, 32]}>
                <meshBasicMaterial color="#fff" transparent opacity={0.1} />
            </Sphere>
            
            {/* Intense Core Glow */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshBasicMaterial 
                    color="#e81cff" 
                    transparent 
                    opacity={0.4} 
                    map={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png')}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Accretion Disk */}
            <group ref={accretionRef} rotation={[Math.PI / 2.5, 0.2, 0]}>
                <mesh>
                    <ringGeometry args={[0.6, 2.5, 64]} />
                    <meshBasicMaterial color="#ff00e5" transparent opacity={0.15} side={THREE.DoubleSide} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <ringGeometry args={[0.7, 2.2, 64]} />
                    <meshBasicMaterial color="#40c9ff" transparent opacity={0.1} side={THREE.DoubleSide} />
                </mesh>
            </group>

            <Sparkles count={100} scale={8} size={2} speed={0.3} color="#fff" />
        </group>
    )
}

const CameraRig = () => {
    useFrame((state) => {
        const { mouse } = state
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 3, 0.05)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 10 + mouse.y * 2, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

const StarBackground = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100dvh', 
      position: 'fixed', 
      inset: 0, 
      zIndex: 0, 
      background: '#010103',
      pointerEvents: 'none' 
    }}>
      <Canvas camera={{ position: [0, 12, 20], fov: 45 }}>
        <Suspense fallback={null}>
          <CameraRig />
          <Galaxy />
          <Singularity />
          <Stars radius={200} depth={100} count={5000} factor={4} saturation={0} fade speed={1} />
          <fog attach="fog" args={['#010103', 15, 40]} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarBackground;
