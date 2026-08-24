import SiteLayout from '../components/SiteLayout'
import { makePageStaticProps } from '../lib/siteContent'

export const getStaticProps = makePageStaticProps('research')

export default function Research({ site, pageContent }) {
  return (
    <SiteLayout
      site={site}
      pageTitle={pageContent.title}
      pageDescription={pageContent.subtitle}
    >
      <section className="research-overview" aria-labelledby="research-overview-title">
        <div className="overview-copy">
          <p className="eyebrow">Research interests</p>
          <h2 id="research-overview-title">{pageContent.overviewTitle}</h2>
        </div>
        <ul className="interest-list">
          {pageContent.interests.map((interest) => <li key={interest}>{interest}</li>)}
        </ul>
      </section>

      <section className="project-section" aria-labelledby="projects-title">
        <div className="section-index">
          <span>01</span>
          <h2 id="projects-title">Research project</h2>
        </div>

        {pageContent.projects.map((project) => (
          <article className="research-project" key={project.title}>
            <div className="project-meta">
              <p>{project.status}</p>
              <p>{project.period}</p>
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p className="project-abstract">{project.abstract}</p>
              <h4>Research questions</h4>
              <ul>
                {project.questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <aside className="research-note">
        <p className="eyebrow">Research profile</p>
        <p>{pageContent.note}</p>
      </aside>
    </SiteLayout>
  )
}
