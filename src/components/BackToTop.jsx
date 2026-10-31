import { useEffect, useState } from 'react'
import { ArrowUp } from './svg'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`rr-back-to-top${visible ? ' is-visible' : ''}`}
    >
      <ArrowUp size={18} />
    </button>
  )
}