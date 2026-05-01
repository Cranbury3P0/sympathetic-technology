import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'st_privacy_acknowledged'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      // localStorage blocked (private mode, etc.) — don't show banner
    }
  }, [])

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Privacy notice"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white px-6 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm leading-relaxed text-neutral-600">
          This site stores a small local setting to remember whether you&rsquo;ve
          seen this notice. If you contact us through a form, information is
          handled as described in our{' '}
          <Link
            to="/privacy"
            className="underline underline-offset-2 transition-colors hover:text-neutral-900"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Link
            to="/privacy"
            className="rounded-none border border-neutral-300 bg-white px-5 py-2 font-sans text-xs font-semibold uppercase tracking-widest text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            Privacy Policy
          </Link>
          <button
            onClick={dismiss}
            className="rounded-none border border-transparent bg-neutral-900 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
