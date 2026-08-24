import { useRouter } from 'next/router'
import SiteLayout from '../components/SiteLayout'
import { withBasePath } from '../lib/assetPath'
import { makePageStaticProps } from '../lib/siteContent'

export const getStaticProps = makePageStaticProps('cv')

export default function CV({ site, pageContent }) {
  const router = useRouter()
  const cv = withBasePath(site.cvPath, router.basePath)

  return (
    <SiteLayout site={site} pageTitle={pageContent.title} pageDescription={pageContent.subtitle}>
      <div className="cv-toolbar">
        <p>{pageContent.downloadNote}</p>
        <a className="button button-primary" href={cv} target="_blank" rel="noreferrer">
          Download CV <span aria-hidden="true">PDF</span>
        </a>
      </div>

      <div className="cv-layout">
        <aside className="cv-sidebar">
          <section>
            <p className="eyebrow">Fields</p>
            <ul>
              {pageContent.fields.map((field) => <li key={field}>{field}</li>)}
            </ul>
          </section>
          <section>
            <p className="eyebrow">Methods &amp; tools</p>
            <ul>
              {pageContent.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </section>
        </aside>

        <div className="cv-main">
          <CVSection number="01" title="Education">
            <div className="timeline">
              {pageContent.education.map((item) => (
                <article className="timeline-item" key={`${item.institution}-${item.degree}`}>
                  <p className="timeline-time">{item.time}</p>
                  <div>
                    <h3>{item.institution}</h3>
                    <p>{item.degree}</p>
                    {item.note ? <p className="timeline-note">{item.note}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </CVSection>

          <CVSection number="02" title="Research">
            {pageContent.research.map((item) => (
              <article className="cv-entry" key={item.title}>
                <p className="timeline-time">{item.time}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </CVSection>

          <CVSection number="03" title="Leadership &amp; service">
            {pageContent.leadership.map((item) => (
              <article className="cv-entry" key={`${item.role}-${item.organization}`}>
                <p className="timeline-time">{item.time}</p>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>
              </article>
            ))}
          </CVSection>

          <CVSection number="04" title="Selected honors">
            <ul className="honors-list">
              {pageContent.honors.map((honor) => <li key={honor}>{honor}</li>)}
            </ul>
          </CVSection>
        </div>
      </div>
    </SiteLayout>
  )
}

function CVSection({ children, number, title }) {
  return (
    <section className="cv-section" aria-labelledby={`cv-section-${number}`}>
      <header>
        <span>{number}</span>
        <h2 id={`cv-section-${number}`}>{title}</h2>
      </header>
      {children}
    </section>
  )
}
