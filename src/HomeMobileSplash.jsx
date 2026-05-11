import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'st-home-splash-session'
const DISPLAY_MS = 2200
const FADE_MS = 450

function shouldSkipSplash() {
  if (typeof window === 'undefined') return true
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    if (!window.matchMedia('(max-width: 768px)').matches) return true
    if (sessionStorage.getItem(STORAGE_KEY)) return true
  } catch {
    return true
  }
  return false
}

/** Mobile-only (≤768px), once per session; homepage fixed overlay before fade-through. */
export default function HomeMobileSplash() {
  const skip = useMemo(() => shouldSkipSplash(), [])
  const [mounted, setMounted] = useState(!skip)
  const [fadeOut, setFadeOut] = useState(false)
  const finalizedRef = useRef(false)

  useEffect(() => {
    if (skip) return
    const id = window.setTimeout(() => setFadeOut(true), DISPLAY_MS)
    return () => window.clearTimeout(id)
  }, [skip])

  useEffect(() => {
    if (skip || !mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [skip, mounted])

  const finalizeDismiss = useCallback(() => {
    if (finalizedRef.current) return
    finalizedRef.current = true
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setMounted(false)
  }, [])

  useEffect(() => {
    if (!fadeOut || !mounted) return
    const fallback = window.setTimeout(() => finalizeDismiss(), FADE_MS + 150)
    return () => window.clearTimeout(fallback)
  }, [fadeOut, mounted, finalizeDismiss])

  const handleTransitionEnd = (e) => {
    if (!fadeOut || e.propertyName !== 'opacity') return
    finalizeDismiss()
  }

  if (skip || !mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[10050] flex items-center justify-center bg-black px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transition-opacity ease-out ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{
        transitionDuration: fadeOut ? `${FADE_MS}ms` : '0ms',
      }}
      aria-hidden="true"
      inert={!fadeOut ? true : undefined}
      onTransitionEnd={handleTransitionEnd}
    >
      <img
        src="/images/splash/home-mobile-splash.png"
        alt=""
        className="max-h-full max-w-full object-contain select-none"
        draggable={false}
      />
    </div>
  )
}
