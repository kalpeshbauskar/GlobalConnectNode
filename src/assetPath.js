// Prefixes a public-folder path (e.g. "images/foo.png") with Vite's configured
// base URL, so assets resolve correctly whether the site is hosted at a domain
// root (https://example.com/) or in a subfolder (https://user.github.io/repo/).
export function withBase(path) {
  const base = import.meta.env.BASE_URL || '/'
  const clean = path.replace(/^\//, '')
  return base.endsWith('/') ? base + clean : base + '/' + clean
}
