"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ThreeDScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Add point lights with amber/gold colors
    const goldLight = new THREE.PointLight(0xffcc00, 1, 10)
    goldLight.position.set(2, 1, 2)
    scene.add(goldLight)

    const amberLight = new THREE.PointLight(0xff9900, 1, 10)
    amberLight.position.set(-2, -1, -2)
    scene.add(amberLight)

    // Add Visser Studios green light (subtle)
    const greenLight = new THREE.PointLight(0xccff00, 0.5, 15)
    greenLight.position.set(0, -3, -5)
    scene.add(greenLight)

    // Load textures
    const textureLoader = new THREE.TextureLoader()

    // Make sure images are loaded with crossOrigin set to anonymous
    textureLoader.crossOrigin = "anonymous"

    const emblemTexture = textureLoader.load("/images/faberland-emblem.png")
    const logoTexture = textureLoader.load("/images/faberland-logo.png")
    const visserTexture = textureLoader.load("/images/visser-studios-logo.png")

    // Create a metaverse-like landscape
    // Central emblem (representing Faberland)
    const emblemGeometry = new THREE.PlaneGeometry(2, 2)
    const emblemMaterial = new THREE.MeshBasicMaterial({
      map: emblemTexture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const emblem = new THREE.Mesh(emblemGeometry, emblemMaterial)
    scene.add(emblem)

    // Add Faberland text logo
    const logoGeometry = new THREE.PlaneGeometry(3, 0.75)
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const logo = new THREE.Mesh(logoGeometry, logoMaterial)
    logo.position.set(0, -1.5, 0)
    scene.add(logo)

    // Create floating platforms around the emblem
    const platforms: THREE.Mesh[] = []
    const platformCount = 7

    for (let i = 0; i < platformCount; i++) {
      const angle = (i / platformCount) * Math.PI * 2
      const radius = 3

      const platformGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5)

      // Use gold/amber color palette
      const hue = 40 + (i / platformCount) * 20 // Range from 40-60 (gold/amber)
      const platformMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue / 360, 0.8, 0.5),
        metalness: 0.5,
        roughness: 0.3,
        emissive: new THREE.Color().setHSL(hue / 360, 0.8, 0.2),
        emissiveIntensity: 0.5,
      })

      const platform = new THREE.Mesh(platformGeometry, platformMaterial)
      platform.position.x = Math.cos(angle) * radius
      platform.position.z = Math.sin(angle) * radius
      platform.position.y = Math.sin(i * 0.5) * 0.5

      scene.add(platform)
      platforms.push(platform)
    }

    // Add connecting beams between platforms and central emblem
    const beams: THREE.Line[] = []

    for (let i = 0; i < platformCount; i++) {
      const points = []
      points.push(new THREE.Vector3(0, 0, 0)) // Center of emblem
      points.push(platforms[i].position.clone()) // Platform position

      // Use gold/amber color for beams
      const hue = 40 + (i / platformCount) * 20 // Range from 40-60 (gold/amber)

      const beamGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const beamMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(hue / 360, 0.8, 0.5),
        transparent: true,
        opacity: 0.6,
      })

      const beam = new THREE.Line(beamGeometry, beamMaterial)
      scene.add(beam)
      beams.push(beam)
    }

    // Add a small Visser Studios logo in the corner
    const visserGeometry = new THREE.PlaneGeometry(0.5, 0.5)
    const visserMaterial = new THREE.MeshBasicMaterial({
      map: visserTexture,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    })
    const visserLogo = new THREE.Mesh(visserGeometry, visserMaterial)
    visserLogo.position.set(-4, -2, -2)
    scene.add(visserLogo)

    // Add particles for a space-like effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 1000

    const posArray = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      color: 0xffcc00,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the emblem
      emblem.rotation.y += 0.005

      // Animate the logo
      logo.position.y = -1.5 + Math.sin(Date.now() * 0.001) * 0.1

      // Animate platforms
      platforms.forEach((platform, i) => {
        const angle = (i / platformCount) * Math.PI * 2
        const radius = 3 + Math.sin(Date.now() * 0.001 + i) * 0.2

        platform.position.x = Math.cos(angle + Date.now() * 0.0005) * radius
        platform.position.z = Math.sin(angle + Date.now() * 0.0005) * radius
        platform.position.y = Math.sin(Date.now() * 0.001 + i * 0.5) * 0.5

        platform.rotation.y += 0.01
      })

      // Update beams to connect to moving platforms
      beams.forEach((beam, i) => {
        const points = []
        points.push(new THREE.Vector3(0, 0, 0))
        points.push(platforms[i].position.clone())

        beam.geometry.setFromPoints(points)
      })

      // Slowly rotate particles
      particlesMesh.rotation.y += 0.0003

      // Subtle animation for Visser logo
      visserLogo.rotation.y = Math.sin(Date.now() * 0.001) * 0.2

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full" />
}
