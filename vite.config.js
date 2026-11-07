import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Deploy base path.
//  - Custom domain (resinartanddecore.com) or Vercel/Netlify root:  BASE_URL=/
//  - GitHub Pages project site (user.github.io/resin-art-decore/): BASE_URL=/resin-art-decore/
// Set it as the repository variable BASE_URL (see .github/workflows/deploy.yml).
const base = process.env.NODE_ENV === 'production' ? process.env.BASE_URL || '/' : '/'

// GitHub Pages has no SPA fallback. Write dist/404.html so deep links
// (/product/xyz) bounce through index.html. The number of path segments to
// keep is derived from `base`, so it is right for both sub-path and root deploys.
function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const keep = base.split('/').filter(Boolean).length
      const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Aman Resin Art And Decore</title>
    <script>
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = ${keep};
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`
      fs.writeFileSync(path.resolve('dist', '404.html'), html)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), spaFallback404()],
  build: {
    rollupOptions: {
      output: {
        // Split the long-lived vendor code into its own chunk so app updates
        // don't bust the React/Router cache.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler') || id.includes('react-router')) {
              return 'react-vendor'
            }
          }
        },
      },
    },
  },
})
