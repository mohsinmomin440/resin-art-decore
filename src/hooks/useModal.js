import { useEffect } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Dialog accessibility: moves focus inside, traps Tab, closes on Escape and
 * gives focus back to whatever opened the dialog. `ref` is the dialog panel.
 */
export function useModal(ref, open, onClose) {
  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    const panel = ref.current
    const items = () => (panel ? [...panel.querySelectorAll(FOCUSABLE)] : [])
    ;(items()[0] || panel)?.focus?.()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        last.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus()
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      opener?.focus?.()
    }
  }, [ref, open, onClose])
}
