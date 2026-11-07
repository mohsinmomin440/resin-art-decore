/**
 * NumberChooser — "Who do you want to message?" dialog. Mounted once in Layout;
 * opened by guardOrder() the first time a customer taps an order link.
 */
import { useRef } from 'react'
import { CONTACTS } from '../data/config'
import { useChooser, selectContact, closeChooser } from '../hooks/useContact'
import { useModal } from '../hooks/useModal'

export default function NumberChooser() {
  const { open } = useChooser()
  const panelRef = useRef(null)
  useModal(panelRef, open, closeChooser)

  if (!open) return null

  return (
    <div className="rr-chooser" role="dialog" aria-modal="true" aria-label="Choose a contact" onClick={closeChooser}>
      <div ref={panelRef} className="rr-chooser__panel" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <h2 className="rr-chooser__title">Order on WhatsApp</h2>
        <p className="rr-chooser__sub">Choose the person you want to message.</p>

        <div className="rr-chooser__list">
          {CONTACTS.map((c) => (
            <button key={c.id} type="button" className="rr-chooser__btn" onClick={() => selectContact(c)}>
              <span className="rr-chooser__name">{c.label}</span>
              <span className="rr-chooser__num">{c.display}</span>
            </button>
          ))}
        </div>

        <button type="button" onClick={closeChooser} className="rr-chooser__cancel">
          Cancel
        </button>
      </div>
    </div>
  )
}
