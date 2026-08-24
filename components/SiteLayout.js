import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const defaultNavigation = [
  { href: '/', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/cv', label: 'CV' },
]

export default function SiteLayout({ children, pageTitle, pageDescription, site, showHeading = true }) {
  const router = useRouter()
  const navigation = site?.navigation?.length ? site.navigation : defaultNavigation
  const title = pageTitle ? `${pageTitle} | ${site.footerName}` : `${site.footerName} | Economics`
  const description = pageDescription || site.description
  const canonicalPath = router.pathname === '/' ? '' : `${router.pathname}/`
  const canonicalUrl = `${site.siteUrl}${canonicalPath}`
  const socialImage = `${site.siteUrl}/og.png`

  return (
    <div className="site-shell">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#ba0c2f" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="scarlet-rule" aria-hidden="true" />

      <header className="site-header">
        <div className="shell header-inner">
          <Link className="personal-mark" href="/" aria-label={`${site.footerName}, home`}>
            <span>{site.footerName}</span>
            <small>Economics Ph.D.</small>
          </Link>

          <nav className="primary-nav" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <Link
                  className={isActive ? 'nav-link is-active' : 'nav-link'}
                  href={item.href}
                  key={item.href}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main id="main-content" className="shell main-content">
        {showHeading ? (
          <header className="page-intro">
            <p className="eyebrow">{site.kicker}</p>
            <h1>{pageTitle}</h1>
            {pageDescription ? <p className="page-description">{pageDescription}</p> : null}
          </header>
        ) : null}
        {children}
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <p className="footer-name">{site.footerName}</p>
            <p>{site.affiliation}</p>
          </div>
          <div className="footer-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>© {new Date().getFullYear()} {site.footerName}</p>
          </div>
        </div>
        <p className="shell site-disclaimer">{site.disclaimer}</p>
      </footer>
    </div>
  )
}
