import { Component } from 'react'

// Suspense handles a lazy chunk that is *pending*, not one that *rejects*.
// Without a boundary, a rejected import() unmounts the whole tree and the user
// gets a white screen. That is not hypothetical: on every deploy Vite emits new
// hashed chunk names, so anyone with the tab already open requests a chunk that
// no longer exists the moment they navigate.
const CHUNK_ERROR = /loading (css )?chunk|dynamically imported module|importing a module script failed|failed to fetch dynamically|unable to preload/i

const RELOADED_KEY = 'rr_chunk_reloaded'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    if (!CHUNK_ERROR.test(error?.message || '')) return
    let alreadyTried = false
    try {
      alreadyTried = sessionStorage.getItem(RELOADED_KEY) === '1'
      if (!alreadyTried) sessionStorage.setItem(RELOADED_KEY, '1')
    } catch { /* storage blocked — fall through to the manual reload button */ }
    if (!alreadyTried) window.location.reload()
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="container text-center" style={{ padding: '5rem 1rem', minHeight: '60vh' }}>
        <svg
          width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--rr-crimson-600)' }}
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h1 className="mt-3" style={{ fontSize: '1.6rem' }}>Something went wrong</h1>
        <p style={{ color: 'var(--rr-muted)', maxWidth: 460, margin: '0.75rem auto 1.5rem' }}>
          Sorry — this page failed to load. Reloading usually fixes it. Your list is safe.
        </p>
        <button type="button" className="rr-btn" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    )
  }
}

// Clear the one-shot reload guard once the app renders successfully, so a
// later stale-chunk error in the same tab can still self-heal.
// eslint-disable-next-line react-refresh/only-export-components
export function clearChunkReloadGuard() {
  try { sessionStorage.removeItem(RELOADED_KEY) } catch { /* storage blocked */ }
}