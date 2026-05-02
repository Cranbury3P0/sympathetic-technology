import { useEffect, useRef, useState } from 'react'

const CIRCLE_SIZE = 64
const CIRCLE_BORDER = 'rgba(255, 255, 255, 0.58)'
const CIRCLE_BORDER_DARK = 'rgba(10, 10, 10, 0.42)'
const FOLLOW_EASE = 0.16

export default function CursorSparkler() {
  const circleRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef(null)
  const [skipTouch] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    if (skipTouch) return undefined

    const body = document.body
    const circle = circleRef.current
    if (!circle) return undefined

    const setPointerInside = (inside) => {
      if (inside) {
        body.classList.add('cursor-sparkler-active')
        circle.style.opacity = '1'
      } else {
        body.classList.remove('cursor-sparkler-active')
        circle.style.opacity = '0'
      }
    }

    const onDocLeave = () => {
      setPointerInside(false)
    }

    const docEl = document.documentElement
    docEl.addEventListener('mouseleave', onDocLeave)

    const onMove = (e) => {
      setPointerInside(true)
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      const current = currentRef.current
      const target = targetRef.current
      current.x += (target.x - current.x) * FOLLOW_EASE
      current.y += (target.y - current.y) * FOLLOW_EASE
      circle.style.transform = `translate3d(${current.x - CIRCLE_SIZE / 2}px, ${
        current.y - CIRCLE_SIZE / 2
      }px, 0)`
      frameRef.current = window.requestAnimationFrame(animate)
    }

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      docEl.removeEventListener('mouseleave', onDocLeave)
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(frameRef.current)
      body.classList.remove('cursor-sparkler-active')
    }
  }, [skipTouch])

  if (skipTouch) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden>
      <div
        ref={circleRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full opacity-0 mix-blend-difference transition-[opacity,border-color] duration-200"
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          border: `3px solid ${CIRCLE_BORDER}`,
          boxShadow: `inset 0 0 0 1px ${CIRCLE_BORDER_DARK}`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
