import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { generateAssessmentPdfBuffer } from '../server/assessmentSubmission.js'

// ── Fixture data — edit freely to test different scenarios ───────────────────

const contactInput = {
  name: 'Alex Rivera',
  email: 'alex@bcchildrensfoundation.org',
  organization_name: "BC Children's Foundation",
  sector: 'Philanthropy / Foundation',
  role_title: 'Director of Programs',
}

const dimensionScores = {
  data_infrastructure: 2,
  leadership_culture: 4,
  mission_alignment: 3,
  ethics_governance: 2,
}

const aiSummary = `
AI Readiness Assessment
Overall readiness level: Emerging (2.75 / 5)

BC Children's Foundation has meaningful leadership appetite for AI adoption and genuine clarity about mission priorities, but the foundational data infrastructure and governance frameworks needed to support responsible deployment are not yet in place.

**Data & Infrastructure: 2/5**
The organization's data is distributed across several systems with limited integration. Donor records, program outcomes, and communications data exist in separate tools with inconsistent formatting and access controls. Before any AI workflow can be responsibly introduced, a data audit and basic governance layer are needed.

**Leadership & Culture: 4/5**
Senior leadership has a clear-eyed view of both the opportunity and the risk. Staff are cautiously curious rather than resistant. There is demonstrated willingness to invest in training and to pilot carefully before scaling.

**Mission Alignment: 3/5**
The connection between potential AI use cases and organizational mission is understood at a high level, but specific use cases have not been mapped against program logic models or service obligations. Donor communications and grant reporting are the most natural early candidates.

**Ethics & Governance: 2/5**
No formal AI policy exists. Privacy obligations under PIPEDA are understood but not translated into AI-specific procedures. A governance framework — even a lightweight one — is needed before any AI tools are introduced into member-facing workflows.

Three prioritized recommendations:
1. Commission a one-day data audit focused on donor and program records — identify what is structured, what is sensitive, and what is actually usable.
2. Draft a one-page AI use policy covering acceptable tools, data handling, and staff responsibilities. This does not need to be exhaustive to be useful.
3. Pilot one low-risk internal use case — such as AI-assisted grant report drafting — with a small team and a defined review process before expanding.

Red flags to watch: Avoid deploying AI tools in any client-facing or frontline service context until data governance and staff training are in place.
`.trim()

// ── Generate and write ───────────────────────────────────────────────────────

const outPath = path.resolve(process.cwd(), 'preview-report.pdf')

console.log('Generating PDF…')

generateAssessmentPdfBuffer({ contactInput, aiSummary, dimensionScores })
  .then((buffer) => {
    fs.writeFileSync(outPath, buffer)
    console.log(`✓ Written to ${outPath}`)
    execSync(`open "${outPath}"`)
  })
  .catch((err) => {
    console.error('PDF generation failed:', err)
    process.exit(1)
  })
