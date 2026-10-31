import { useReducedMotion } from '../hooks/useReducedMotion'
import { ProcessDesign, ProcessPour, ProcessCure, ProcessFinish } from './svg'

const STEPS = [
  { icon: ProcessDesign, title: 'Design', text: 'Share your idea — name, initials, colors, occasion — on WhatsApp. We confirm what is possible.' },
  { icon: ProcessPour, title: 'Pour', text: 'We mix the resin by hand, add the pigments, flowers or gold, and pour it into the mould.' },
  { icon: ProcessCure, title: 'Cure', text: 'The piece cures in its mould. We check it, pop it out and trim it by hand.' },
  { icon: ProcessFinish, title: 'Finish', text: 'We polish, add the gold calligraphy, pack it and send it on its way.' },
]

export default function ProcessTimeline() {
  const reduce = useReducedMotion()
  return (
    <div className="rr-timeline">
      {STEPS.map((s, i) => {
        const Icon = s.icon
        return (
          <div key={s.title} className={`rr-timeline__step${reduce ? '' : ' rr-timeline__step--reveal'}`} data-reveal={reduce ? undefined : 'up'}>
            <span className="rr-timeline__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="rr-timeline__icon"><Icon size={22} /></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        )
      })}
    </div>
  )
}