import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TERRACOTTA = '#C27059'
/** Sized for ~16px body copy (slightly smaller than earlier 7px). */
const DOT_SIZE = 5
const ANIM_DURATION = 0.8
const PARTICLE_CAP = 100
const MOVE_SPAWN_MS = 14

function randomInRange(min, max) {
  return min + Math.random() * (max - min)
}

function createParticle(x, y, idle = false) {
  const size = idle ? randomInRange(1.5, 2.8) : randomInRange(2.5, 4.5)
  const angle = Math.random() * Math.PI * 2
  const dist = idle ? randomInRange(4, 12) : randomInRange(10, 20)
  const gravity = idle ? randomInRange(6, 14) : randomInRange(14, 32)
  const dx = Math.cos(angle) * dist
  const dy = Math.sin(angle) * dist + gravity
  return {
    id: `${performance.now()}-${Math.random().toString(36).slice(2, 11)}`,
    x,
    y,
    size,
    dx,
    dy,
    idle,
  }
}

export default function CursorSparkler() {
  const [particles, setParticles] = useState([])
  const [dot, setDot] = useState({ x: -100, y: -100, show: false })
  const [skipTouch] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  const lastMoveAtRef = useRef(0)
  const lastSpawnMoveRef = useRef(0)
  const cursorRef = useRef({ x: 0, y: 0 })
  const pointerInsideRef = useRef(false)

  const removeParticle = useCallback((id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const pushParticles = useCallback((x, y, count, idle = false) => {
    const batch = []
    for (let i = 0; i < count; i += 1) {
      batch.push(createParticle(x, y, idle))
    }
    setParticles((prev) => [...prev, ...batch].slice(-PARTICLE_CAP))
  }, [])

  useEffect(() => {
    if (skipTouch) return undefined

    const body = document.body

    const setPointerInside = (inside) => {
      pointerInsideRef.current = inside
      if (inside) {
        body.classList.add('cursor-sparkler-active')
      } else {
        body.classList.remove('cursor-sparkler-active')
        setDot((d) => ({ ...d, show: false }))
      }
    }

    const onDocLeave = () => {
      setPointerInside(false)
    }

    const docEl = document.documentElement
    docEl.addEventListener('mouseleave', onDocLeave)

    const onMove = (e) => {
      if (!pointerInsideRef.current) {
        setPointerInside(true)
      }
      const now = performance.now()
      lastMoveAtRef.current = Date.now()
      cursorRef.current = { x: e.clientX, y: e.clientY }
      setDot({ x: e.clientX, y: e.clientY, show: true })

      if (now - lastSpawnMoveRef.current >= MOVE_SPAWN_MS) {
        lastSpawnMoveRef.current = now
        pushParticles(e.clientX, e.clientY, 1, false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const idleId = window.setInterval(() => {
      if (!pointerInsideRef.current) return
      const stationary = Date.now() - lastMoveAtRef.current > 60
      if (!stationary) return
      const { x, y } = cursorRef.current
      if (x <= 0 && y <= 0) return
      const count = Math.random() < 0.5 ? 1 : 2
      pushParticles(x, y, count, true)
    }, 200)

    return () => {
      docEl.removeEventListener('mouseleave', onDocLeave)
      window.removeEventListener('mousemove', onMove)
      window.clearInterval(idleId)
      body.classList.remove('cursor-sparkler-active')
    }
  }, [pushParticles, skipTouch])

  if (skipTouch) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden>
      {dot.show && (
        <div
          className="pointer-events-none fixed z-[9999] rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: DOT_SIZE,
            height: DOT_SIZE,
            marginLeft: -DOT_SIZE / 2,
            marginTop: -DOT_SIZE / 2,
            backgroundColor: TERRACOTTA,
          }}
        />
      )}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none fixed rounded-full"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            backgroundColor: TERRACOTTA,
            zIndex: 9997,
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: 0,
            scale: p.idle ? 0.2 : 0.35,
          }}
          transition={{ duration: ANIM_DURATION, ease: 'easeOut' }}
          onAnimationComplete={() => removeParticle(p.id)}
        />
      ))}
    </div>
  )
}
