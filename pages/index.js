import Link from 'next/link'
import { useRouter } from 'next/router'
import SiteLayout from '../components/SiteLayout'
import { withBasePath } from '../lib/assetPath'
import { getSiteContent } from '../lib/siteContent'

export function getStaticProps() {
  const content = getSiteContent()
  return { props: { site: content.site, pageContent: content.home } }
}

export default function Home({ site, pageContent }) {
  const router = useRouter()
  const portrait = withBasePath(pageContent.profileImage.src, router.basePath)
  const cv = withBasePath(site.cvPath, router.basePath)

  return (
    <SiteLayout site={site} pageDescription={pageContent.introduction} showHeading={false}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">{site.kicker}</p>
          <h1 id="home-title">{pageContent.title}</h1>
          <p className="hero-role">{pageContent.subtitle}</p>
          <p className="hero-intro">{pageContent.introduction}</p>

          <div className="hero-actions">
            <Link className="button button-primary" href="/research">
              Explore research <span aria-hidden="true">→</span>
            </Link>
            <a className="button button-secondary" href={cv} target="_blank" rel="noreferrer">
              Download CV <span aria-hidden="true">PDF</span>
            </a>
          </div>

          <dl className="profile-facts">
            {pageContent.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  {fact.label === 'Email' ? <a href={`mailto:${fact.value}`}>{fact.value}</a> : fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="portrait-card">
          <div className="portrait-number" aria-hidden="true">01</div>
          <img src={portrait} alt={pageContent.profileImage.alt} />
          <figcaption>
            <span>Yi Wang</span>
            <span>Columbus, Ohio</span>
          </figcaption>
        </figure>
      </section>

      <section className="section research-focus" aria-labelledby="focus-title">
        <div className="section-lead">
          <p className="eyebrow">Research agenda</p>
          <h2 id="focus-title">Questions about strategy, markets, and welfare.</h2>
        </div>
        <div className="focus-grid">
          {pageContent.researchInterests.map((interest, index) => (
            <article className="focus-card" key={interest.title}>
              <p className="card-number">0{index + 1}</p>
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section featured-project" aria-labelledby="project-title">
        <div className="project-label">
          <p className="eyebrow">Current project</p>
          <span>Work in progress</span>
        </div>
        <div>
          <h2 id="project-title">{pageContent.featuredProject.title}</h2>
          <p>{pageContent.featuredProject.summary}</p>
          <Link className="text-link" href="/research">
            Read the research overview <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-title">
        <p className="eyebrow light">Contact</p>
        <h2 id="contact-title">Interested in micro theory and industrial organization?</h2>
        <a href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a>
      </section>
    </SiteLayout>
  )
}
