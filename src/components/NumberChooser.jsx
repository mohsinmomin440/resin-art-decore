/**
 * NumberChooser — two big buttons: Makbul Fatema / Asim. Appears when the user
 * taps "Order on WhatsApp" and has not yet chosen a contact.
 */
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTACTS } from '../data/config'

export default function NumberChooser({ open, onClose, onSelect }) {
  const [, setContact] = useLocalStorage('rr_contact', CONTACTS.find((c) => c.default) || CONTACTS[0])

  if (!open) return null

  return (
    <div className="rr-chooser" role="dialog" aria-modal="true" aria-label="Choose a contact">
      <div className="rr-chooser__panel">
        <h2 className="rr-chooser__title">Order on WhatsApp</h2>
        <p className="rr-chooser__sub">Choose the person you want to message.</p>

        <div className="rr-chooser__list">
          {CONTACTS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="rr-chooser__btn"
              onClick={() => {
                setContact(c)
                onSelect(c)
                onClose()
              }}
            >
              <span className="rr-chooser__name">{c.label}</span>
              <span className="rr-chooser__num">{c.display}</span>
            </button>
          ))}
        </div>

        <button type="button" onClick={onClose} className="rr-chooser__cancel">
          Cancel
        </button>
      </div>
    </div>
  )
}