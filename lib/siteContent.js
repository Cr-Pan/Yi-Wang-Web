import fs from 'fs'
import path from 'path'

const CONTENT_FILE_PATH = path.join(process.cwd(), 'content', 'site-content.md')
const JSON_BLOCK_PATTERN = /```json\s*([\s\S]*?)\s*```/i
const REQUIRED_SECTIONS = ['site', 'home', 'research', 'cv']

export function getSiteContent() {
  const source = fs.readFileSync(CONTENT_FILE_PATH, 'utf8')
  const normalizedSource = `${source.trim()}\n\n## end-of-file\n`
  const sectionPattern = /^##\s+([a-z0-9-]+)\s*$([\s\S]*?)(?=^##\s+[a-z0-9-]+\s*$)/gim
  const content = {}

  for (const match of normalizedSource.matchAll(sectionPattern)) {
    const sectionName = match[1].trim()
    const sectionBody = match[2]

    if (sectionName === 'end-of-file') {
      continue
    }

    const jsonMatch = sectionBody.match(JSON_BLOCK_PATTERN)

    if (!jsonMatch) {
      continue
    }

    try {
      content[sectionName] = JSON.parse(jsonMatch[1].trim())
    } catch (error) {
      throw new Error(`Invalid JSON in section "${sectionName}" of content/site-content.md: ${error.message}`)
    }
  }

  for (const sectionName of REQUIRED_SECTIONS) {
    if (!content[sectionName]) {
      throw new Error(`Missing required section "${sectionName}" in content/site-content.md.`)
    }
  }

  return content
}

export function makePageStaticProps(sectionName) {
  return function getStaticProps() {
    const content = getSiteContent()

    return {
      props: {
        site: content.site,
        pageContent: content[sectionName],
      },
    }
  }
}
