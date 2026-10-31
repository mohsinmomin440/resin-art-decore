import { useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * VideoStrip — short muted clips that play only when on screen.
 * No video files exist yet, so this renders a placeholder until the owner
 * adds mp4s to public/videos/. It never breaks the page.
 */
export default function VideoStrip() {
  const [clips] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      file: `clip-${String(i + 1).padStart(2, '0')}`,
      title: `Process clip ${i + 1}`,
    }))
  )
  const _reduce = useReducedMotion()

  if (clips.length === 0) return null

  return (
    <section className="rr-video-strip">
      <div className="rr-video-rail">
        {clips.map((c) => (
          <div key={c.file} className="rr-video-card">
            <div className="rr-video-card__media rr-video-card__media--placeholder">
              <span>Video coming soon</span>
            </div>
            <figcaption className="rr-video-card__caption">{c.title}</figcaption>
          </div>
        ))}
      </div>
    </section>
  )
}