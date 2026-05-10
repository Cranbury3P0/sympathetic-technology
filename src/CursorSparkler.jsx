import { useEffect, useRef, useState } from 'react'

const OUTER_SIZE = 32
const FOLLOW_EASE = 0.14

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  '[role="button"]:not([disabled])',
  'input[type="submit"]:not([disabled])',
  'input[type="button"]:not([disabled])',
  'input[type="reset"]:not([disabled])',
  'label[for]',
  'summary',
].join(',')

function pickInteractiveTarget(el) {
  if (!el || !(el instanceof Element)) return null
  const hit = el.closest(INTERACTIVE_SELECTOR)
  if (!hit) return null
  if (hit.closest('[data-no-custom-cursor]')) return null
  return hit
}

export default function CursorSparkler() {
  const rootRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef(null)
  const interactiveRef = useRef(false)

  const [skipTouch] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    if (skipTouch) return undefined

    const body = document.body
    const root = rootRef.current
    if (!root) return undefined

    const centerOffset = OUTER_SIZE / 2

    const setVisible = (visible) => {
      root.classList.toggle('st-cursor-root--visible', visible)
      body.classList.toggle('cursor-sparkler-active', visible)
    }

    const setInteractive = (next) => {
      if (interactiveRef.current === next) return
      interactiveRef.current = next
      root.classList.toggle('st-cursor-root--interactive', next)
    }

    const onDocLeave = () => {
      setVisible(false)
      setInteractive(false)
    }

    const docEl = document.documentElement
    docEl.addEventListener('mouseleave', onDocLeave)

    const onMove = (event) => {
      setVisible(true)
      targetRef.current = { x: event.clientX, y: event.clientY }
      const under = document.elementFromPoint(event.clientX, event.clientY)
      setInteractive(Boolean(pickInteractiveTarget(under)))
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      const current = currentRef.current
      const target = targetRef.current
      current.x += (target.x - current.x) * FOLLOW_EASE
      current.y += (target.y - current.y) * FOLLOW_EASE
      root.style.transform = `translate3d(${current.x - centerOffset}px, ${current.y - centerOffset}px, 0)`
      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)

    return () => {
      docEl.removeEventListener('mouseleave', onDocLeave)
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(frameRef.current)
      body.classList.remove('cursor-sparkler-active')
      interactiveRef.current = false
      root.classList.remove('st-cursor-root--visible', 'st-cursor-root--interactive')
    }
  }, [skipTouch])

  if (skipTouch) {
    return null
  }

  return (
    <div ref={rootRef} className="st-cursor-root" aria-hidden>
      <div className="st-cursor">
        <div className="st-cursor-inner" />
      </div>
    </div>
  )
}
