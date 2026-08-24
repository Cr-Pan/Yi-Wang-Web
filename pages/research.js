import SiteLayout from '../components/SiteLayout'
import { makePageStaticProps } from '../lib/siteContent'

export const getStaticProps = makePageStaticProps('research')

export default function Research({ site, pageContent }) {
  return (
    <SiteLayout
      site={site}
      pageTitle={pageContent.title}
      pageDescription={pageContent.subtitle}
      showHeading={false}
    >
      <header className="research-page-heading">
        <h1>{pageContent.title}</h1>
      </header>
      <section className="single-research" aria-label="Research project">
        {pageContent.projects.map((project) => (
          <article key={project.title}>
            <p className="research-meta">
              <span>{project.status}</span>
              <span>{project.period}</span>
            </p>
            <div className="single-research-body">
              <h2>{project.title}</h2>
              <p className="project-abstract">{project.abstract}</p>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  )
}
