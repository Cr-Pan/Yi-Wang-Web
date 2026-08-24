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

  return (
    <SiteLayout site={site} pageDescription={pageContent.introduction} showHeading={false}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">{site.kicker}</p>
          <h1 id="home-title">{pageContent.title}</h1>
          <p className="hero-role">{pageContent.subtitle}</p>
          <p className="hero-intro">{pageContent.introduction}</p>

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
          <img src={portrait} alt={pageContent.profileImage.alt} />
          <figcaption>
            <span>Yi Wang</span>
            <span>Columbus, Ohio</span>
          </figcaption>
        </figure>
      </section>
    </SiteLayout>
  )
}
