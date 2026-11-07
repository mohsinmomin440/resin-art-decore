import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { clearChunkReloadGuard } from './components/ErrorBoundary'

// Lazy-loaded routes — keep the initial bundle small. Layout supplies the
// Suspense + ErrorBoundary around them.
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const Product = lazy(() => import('./pages/Product'))
const Custom = lazy(() => import('./pages/Custom'))
const Saved = lazy(() => import('./pages/Saved'))
const Gallery = lazy(() => import('./pages/Gallery'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const Policies = lazy(() => import('./pages/Policies'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Re-arm the one-shot chunk-reload guard once the app renders, so a later
// stale-chunk error in the same tab can still self-heal.
clearChunkReloadGuard()

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}