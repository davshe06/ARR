/* Seed data for the prototype.
   EVENTS, EVENT_TYPES and the first records of `JOBS`, `EQC_CALLS` and `MPCS`
   are copied verbatim from the approved design (Recruiting Bullpen v2); the
   remaining records extend the same shapes to a full Charlotte · TDC day so
   scrolling and load can be tested. Everything the UI reads lives here — swap
   this module for an API client and the components stay put. */

import type {
  CalEvent,
  DeskInfo,
  EqcCall,
  EventType,
  EventTypeStyle,
  Job,
  Mpc,
} from './types';

/** Calendar geometry: the day opens at 8:00 and each hour is 84px tall. */
export const DAY_START = 8;
export const HOUR_PX = 84;
export const DAY_HOURS = 11;
/** A block shorter than this many pixels drops its subtitle line. */
export const COMPACT_PX = 56;

export const DESK: DeskInfo = {
  dayLabel: 'Tue 21 Aug 2026',
  recruiterName: 'D. Sheehan',
  desk: 'Charlotte · TDC',
  now: 10.35,
};

export const EVENT_TYPES: Record<EventType, EventTypeStyle> = {
  interview: { label: 'Interview', solid: '#1d2d3d', tint: 'rgba(29,45,61,.14)', ink: '#f2f2f3', tintInk: '#1d2d3d' },
  client:    { label: 'Client mtg', solid: '#597ea3', tint: 'rgba(89,126,163,.18)', ink: '#f7f9fb', tintInk: '#2c455d' },
  eqc:       { label: 'EQC call', solid: '#749dc4', tint: '#d6ebff', ink: '#1d2d3d', tintInk: '#2c455d' },
  icm:       { label: 'ICM', solid: '#9ebbd8', tint: '#eef6ff', ink: '#1d2d3d', tintInk: '#2c455d' },
  internal:  { label: 'Meeting', solid: '#d4d4d7', tint: '#e7e7ea', ink: '#2b2b2d', tintInk: '#424244' },
};

export const LEGEND_ORDER: EventType[] = ['interview', 'client', 'eqc', 'icm', 'internal'];

export const EVENTS: CalEvent[] = [
  { id: 'e1', type: 'interview', start: 8.0,  end: 8.75,  title: 'J. Okafor',          sub: 'Sr. .NET Developer · Halloran Group', time: '8:00',  ref: { kind: 'job', id: 'j01' } },
  { id: 'e2', type: 'eqc',       start: 9.0,  end: 9.5,   title: 'R. Delacroix',       sub: 'Week 4 check-in · Ardent Mfg',        time: '9:00',  ref: { kind: 'eqc', id: 'q01' } },
  { id: 'e3', type: 'icm',       start: 9.75, end: 10.25, title: 'ICM — Charlotte TDC', sub: 'Branch pipeline call',               time: '9:45' },
  { id: 'e4', type: 'client',    start: 11.0, end: 12.0,  title: 'Halloran Group QBR', sub: 'On site · Ballantyne, NC',            time: '11:00', ref: { kind: 'job', id: 'j01' } },
  { id: 'e5', type: 'interview', start: 13.0, end: 13.75, title: 'D. Marsh',           sub: 'Cloud / DevOps Engineer · MPC screen', time: '1:00', ref: { kind: 'mpc', id: 'm02' } },
  { id: 'e6', type: 'internal',  start: 14.0, end: 14.5,  title: 'Desk huddle',        sub: 'Team · submittal review',             time: '2:00' },
  { id: 'e7', type: 'client',    start: 15.0, end: 15.75, title: 'Northgate Health',   sub: 'New req intake · remote',             time: '3:00',  ref: { kind: 'job', id: 'j04' } },
  { id: 'e8', type: 'eqc',       start: 16.5, end: 17.0,  title: 'M. Whitfield',       sub: 'Week 8 check-in · Halloran',          time: '4:30',  ref: { kind: 'eqc', id: 'q03' } },
];

/* ── Requisitions ───────────────────────────────────────────────────────────
   The first four carry `hot: true` and fill the 2×2 grid on the day sheet;
   all 24 are reachable through the "All 24 reqs" link. */
export const JOBS: Job[] = [
  {
    id: 'j01', num: '01', company: 'Halloran Group', heat: 'Client hot', title: '.NET Developer',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$70–82/hr',
    skills: ['C# / .NET 8', 'Azure', 'SQL Server'], age: 'Open 6 days', subs: '3 submitted', hot: true,
    contact: 'B. Halloran · VP Engineering',
    description:
      'Backfill on the claims platform team after an internal promotion. Six-month contract to hire, converting at 12 weeks if the manager signs off. The team ships fortnightly and wants someone who can take a story end to end without hand-holding.',
    requirements: ['5+ years C# / .NET, currently on .NET 6 or newer', 'Azure App Service and Service Bus in production', 'SQL Server — able to read and tune a query plan', 'On site in Ballantyne two days a week'],
    submittals: [
      { name: 'J. Okafor', title: 'Sr. .NET Developer', status: 'Interview 8:00 today', sent: 'Sent 18 Aug' },
      { name: 'P. Raman', title: 'Full Stack .NET Developer', status: 'Client reviewing', sent: 'Sent 19 Aug' },
      { name: 'L. Barrow', title: '.NET Developer', status: 'Declined — rate', sent: 'Sent 16 Aug' },
    ],
  },
  {
    id: 'j02', num: '02', company: 'Pallas Robotics', heat: 'Interviews set', title: 'AI Engineer',
    branch: 'Charlotte, NC', place: 'Remote — EST hours', pay: '$95–110/hr',
    skills: ['Python', 'LLM / RAG', 'AWS Bedrock'], age: 'Open 11 days', subs: '5 submitted', hot: true,
    contact: 'S. Achterberg · Director of Applied AI',
    description:
      'Building the retrieval layer behind Pallas’ field-service assistant. Fully remote but the standup is 9:15 EST and they will not flex it. Two panels booked for Thursday.',
    requirements: ['Production RAG or agent system, not a notebook demo', 'Bedrock or comparable managed inference', 'Evaluation discipline — they will ask how you measured quality', 'Python 3.11+, typed'],
    submittals: [
      { name: 'A. Sundaram', title: 'ML Engineer', status: 'Panel Thu 10:00', sent: 'Sent 14 Aug' },
      { name: 'K. Oyelaran', title: 'AI Engineer', status: 'Panel Thu 13:00', sent: 'Sent 14 Aug' },
      { name: 'C. Foster', title: 'Data Scientist', status: 'Client reviewing', sent: 'Sent 18 Aug' },
      { name: 'D. Whitlock', title: 'NLP Engineer', status: 'Declined — depth', sent: 'Sent 12 Aug' },
      { name: 'M. Ferrante', title: 'ML Platform Engineer', status: 'Declined — comp', sent: 'Sent 12 Aug' },
    ],
  },
  {
    id: 'j03', num: '03', company: 'Ardent Manufacturing', heat: 'New today', title: 'SAP FICO Consultant',
    branch: 'Charlotte, NC', place: 'On site — Rock Hill, SC', pay: '$85–98/hr',
    skills: ['SAP S/4HANA', 'FI/CO config', 'Data migration'], age: 'Open 1 day', subs: '0 submitted', hot: true,
    contact: 'R. Petrosyan · Controller',
    description:
      'S/4HANA migration is in blueprint and the finance workstream has no consultant. Nine-month engagement, on site five days at Rock Hill. Intake call was this morning — first submittals wanted by Thursday.',
    requirements: ['Two or more full-cycle S/4HANA implementations', 'FI/CO configuration hands to keyboard, not advisory only', 'Legacy data migration from ECC', 'Able to be on site in Rock Hill daily'],
    submittals: [],
  },
  {
    id: 'j04', num: '04', company: 'Northgate Health', heat: 'Aging', title: 'Data Scientist',
    branch: 'Charlotte, NC', place: 'Remote — US', pay: '$140–160k',
    skills: ['Python', 'ML modeling', 'Databricks'], age: 'Open 19 days', subs: '7 submitted', hot: true,
    contact: 'T. Ozanne · Head of Data',
    description:
      'Direct hire on the population-health modeling team. Nineteen days open and the hiring manager has passed on five profiles for lacking healthcare data exposure — screen hard for claims or EHR work before submitting.',
    requirements: ['Healthcare claims, EHR or registry data', 'Databricks / Spark at scale', 'Python, scikit-learn, and a defensible model-validation story', 'Comfortable presenting to clinicians'],
    submittals: [
      { name: 'C. Foster', title: 'Data Scientist', status: 'Client reviewing', sent: 'Sent 20 Aug' },
      { name: 'H. Nakamura', title: 'Sr. Data Scientist', status: 'Interview Wed 11:00', sent: 'Sent 15 Aug' },
      { name: 'E. Villareal', title: 'Data Scientist', status: 'Declined — no healthcare', sent: 'Sent 11 Aug' },
      { name: 'R. Achebe', title: 'ML Engineer', status: 'Declined — no healthcare', sent: 'Sent 11 Aug' },
      { name: 'S. Dunmore', title: 'Data Scientist', status: 'Declined — comp', sent: 'Sent 8 Aug' },
      { name: 'W. Trandafir', title: 'Analytics Lead', status: 'Declined — seniority', sent: 'Sent 6 Aug' },
      { name: 'N. Barros', title: 'Data Scientist', status: 'Withdrew', sent: 'Sent 5 Aug' },
    ],
  },
  {
    id: 'j05', num: '05', company: 'Cascade Utilities', heat: 'Interviews set', title: 'QA Automation Engineer',
    branch: 'Charlotte, NC', place: 'On site — Charlotte, NC', pay: '$55–65/hr',
    skills: ['Playwright', 'C#', 'CI/CD'], age: 'Open 4 days', subs: '2 submitted', hot: false,
    contact: 'M. Ludlow · QA Manager',
    description:
      'Second automation engineer for the outage-management rewrite. Contract through year end with likely extension into the next release train.',
    requirements: ['Playwright or Selenium against a real product', 'C# test authoring', 'Pipeline experience — Azure DevOps preferred'],
    submittals: [
      { name: 'T. Nguyen', title: 'QA Automation Engineer', status: 'On assignment', sent: 'Sent 4 Aug' },
      { name: 'G. Rutkowski', title: 'SDET', status: 'Interview Wed 14:00', sent: 'Sent 19 Aug' },
    ],
  },
  {
    id: 'j06', num: '06', company: 'Ironwood Financial', heat: 'Client hot', title: 'Salesforce Developer',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$72–85/hr',
    skills: ['Apex', 'LWC', 'Sales Cloud'], age: 'Open 9 days', subs: '4 submitted', hot: false,
    contact: 'D. Reinholt · Director, Sales Ops',
    description:
      'Wealth-management org is consolidating three Salesforce instances. They want a builder, not an admin — expect an Apex exercise in round two.',
    requirements: ['Apex and Lightning Web Components', 'Sales Cloud data model', 'Platform Developer I certification'],
    submittals: [
      { name: 'R. Sandhu', title: 'Salesforce Developer', status: 'On assignment', sent: 'Sent 2 Jun' },
      { name: 'J. Castellan', title: 'Salesforce Developer', status: 'Offer pending', sent: 'Sent 15 Aug' },
      { name: 'V. Okonjo', title: 'Salesforce Engineer', status: 'Client reviewing', sent: 'Sent 18 Aug' },
      { name: 'P. Lindqvist', title: 'Salesforce Admin', status: 'Declined — too admin', sent: 'Sent 13 Aug' },
    ],
  },
  {
    id: 'j07', num: '07', company: 'Piedmont Grid', heat: 'Aging', title: 'Network Engineer',
    branch: 'Charlotte, NC', place: 'On site — Gastonia, NC', pay: '$60–70/hr',
    skills: ['Cisco', 'BGP', 'Firewalls'], age: 'Open 23 days', subs: '6 submitted', hot: false,
    contact: 'F. Yeboah · Infrastructure Manager',
    description:
      'Substation network refresh. Badging takes two weeks, which has cost two candidates already — set the expectation on the first call.',
    requirements: ['CCNP or equivalent hands-on depth', 'BGP and OSPF in a routed WAN', 'Palo Alto or Fortinet firewalls', 'Background check for critical infrastructure'],
    submittals: [
      { name: 'B. Ostrowski', title: 'Network Engineer', status: 'Client reviewing', sent: 'Sent 18 Aug' },
      { name: 'K. Mensah', title: 'Sr. Network Engineer', status: 'Withdrew — badging', sent: 'Sent 12 Aug' },
      { name: 'R. Cifuentes', title: 'Network Engineer', status: 'Withdrew — badging', sent: 'Sent 9 Aug' },
      { name: 'L. Petrakis', title: 'Network Analyst', status: 'Declined — seniority', sent: 'Sent 6 Aug' },
      { name: 'O. Adeyemi', title: 'Network Engineer', status: 'Declined — rate', sent: 'Sent 4 Aug' },
      { name: 'C. Tillman', title: 'Systems Engineer', status: 'Declined — skills', sent: 'Sent 1 Aug' },
    ],
  },
  {
    id: 'j08', num: '08', company: 'Duplin Retail Group', heat: 'Interviews set', title: 'Business Intelligence Analyst',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$48–58/hr',
    skills: ['Power BI', 'SQL', 'DAX'], age: 'Open 7 days', subs: '3 submitted', hot: false,
    contact: 'S. Mireles · Analytics Manager',
    description:
      'Merchandising analytics team needs reporting capacity before the holiday planning cycle. Contract to hire.',
    requirements: ['Power BI semantic models, not just visuals', 'Strong SQL — windowed aggregates', 'Retail or supply-chain data a plus'],
    submittals: [
      { name: 'N. Ferreira', title: 'BI Analyst', status: 'Interview Thu 9:00', sent: 'Sent 18 Aug' },
      { name: 'D. Kohli', title: 'Data Analyst', status: 'Interview Thu 11:00', sent: 'Sent 18 Aug' },
      { name: 'M. Slaughter', title: 'BI Developer', status: 'Client reviewing', sent: 'Sent 20 Aug' },
    ],
  },
  {
    id: 'j09', num: '09', company: 'Trellis Payments', heat: 'Client hot', title: 'Sr. Java Engineer',
    branch: 'Charlotte, NC', place: 'Remote — EST hours', pay: '$88–100/hr',
    skills: ['Java 21', 'Spring Boot', 'Kafka'], age: 'Open 3 days', subs: '2 submitted', hot: false,
    contact: 'J. Prewitt · Engineering Director',
    description:
      'Ledger service is being split out of the monolith. They move fast — first submittal went to interview inside 24 hours.',
    requirements: ['Java 17+ and Spring Boot 3', 'Kafka in an event-driven system', 'Payments, ledgering or double-entry accounting domain'],
    submittals: [
      { name: 'E. Sandoval', title: 'Sr. Java Engineer', status: 'Interview today 4:00', sent: 'Sent 20 Aug' },
      { name: 'T. Iwuchukwu', title: 'Backend Engineer', status: 'Client reviewing', sent: 'Sent 20 Aug' },
    ],
  },
  {
    id: 'j10', num: '10', company: 'Kettering Foods', heat: 'New today', title: 'IT Support Specialist',
    branch: 'Charlotte, NC', place: 'On site — Concord, NC', pay: '$26–32/hr',
    skills: ['Windows 11', 'Intune', 'Ticketing'], age: 'Open 1 day', subs: '0 submitted', hot: false,
    contact: 'A. Groesbeck · IT Manager',
    description:
      'Plant-floor support for a 400-seat site. Volume role — the desk has placed four here in the last year, so the profile is well understood.',
    requirements: ['Windows 11 imaging and Intune enrollment', 'Ticket hygiene in ServiceNow or Jira SM', 'Comfortable on a manufacturing floor'],
    submittals: [],
  },
  {
    id: 'j11', num: '11', company: 'Sable Aerospace', heat: 'Interviews set', title: 'Cloud Architect',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$115–130/hr',
    skills: ['AWS', 'Terraform', 'Kubernetes'], age: 'Open 14 days', subs: '4 submitted', hot: false,
    contact: 'W. Ashcroft · VP Technology',
    description:
      'Landing-zone rebuild ahead of a FedRAMP push. US person requirement is firm.',
    requirements: ['AWS multi-account landing zone / Control Tower', 'Terraform modules at organisation scale', 'EKS in production', 'US person — ITAR-adjacent programme'],
    submittals: [
      { name: 'D. Marsh', title: 'Cloud / DevOps Engineer', status: 'Interview today 1:00', sent: 'Sent 19 Aug' },
      { name: 'H. Kirchner', title: 'Cloud Architect', status: 'Panel Fri 10:00', sent: 'Sent 16 Aug' },
      { name: 'S. Amadi', title: 'Platform Architect', status: 'Declined — not US person', sent: 'Sent 12 Aug' },
      { name: 'B. Lindeman', title: 'DevOps Lead', status: 'Declined — depth', sent: 'Sent 10 Aug' },
    ],
  },
  {
    id: 'j12', num: '12', company: 'Southgate Bank', heat: 'Client hot', title: 'Cybersecurity Analyst',
    branch: 'Charlotte, NC', place: 'On site — Charlotte, NC', pay: '$70–80/hr',
    skills: ['SIEM', 'Splunk', 'Incident response'], age: 'Open 5 days', subs: '3 submitted', hot: false,
    contact: 'R. Delacroix-Mbeki · SOC Manager',
    description:
      'Second-shift SOC analyst, 2pm–10pm. Shift premium is already in the rate — lead with it, it screens well.',
    requirements: ['Splunk ES or comparable SIEM', 'Hands-on incident triage and escalation', 'Financial services or regulated environment', 'Second shift, on site uptown'],
    submittals: [
      { name: 'Y. Castellanos', title: 'Security Analyst', status: 'Interview Wed 15:00', sent: 'Sent 19 Aug' },
      { name: 'P. Nowak', title: 'SOC Analyst', status: 'Client reviewing', sent: 'Sent 19 Aug' },
      { name: 'I. Duarte', title: 'Security Engineer', status: 'Declined — shift', sent: 'Sent 17 Aug' },
    ],
  },
  {
    id: 'j13', num: '13', company: 'Lyric Media', heat: 'Aging', title: 'Product Owner',
    branch: 'Charlotte, NC', place: 'Remote — US', pay: '$65–75/hr',
    skills: ['Agile', 'Jira', 'Roadmapping'], age: 'Open 21 days', subs: '5 submitted', hot: false,
    contact: 'C. Marchetti · Head of Product',
    description:
      'Subscription platform squad. The manager has been slow to feed back — chase every submittal at 48 hours.',
    requirements: ['Product owner on a customer-facing platform', 'Backlog ownership, not project coordination', 'Subscription or media domain welcome'],
    submittals: [
      { name: 'A. Lindgren', title: 'Product Owner', status: 'Client reviewing', sent: 'Sent 13 Aug' },
      { name: 'M. Boateng', title: 'Sr. Product Owner', status: 'Client reviewing', sent: 'Sent 13 Aug' },
      { name: 'J. Wexler', title: 'Business Analyst', status: 'Declined — seniority', sent: 'Sent 8 Aug' },
      { name: 'R. Sivakumar', title: 'Product Manager', status: 'Declined — comp', sent: 'Sent 6 Aug' },
      { name: 'T. Ellery', title: 'Scrum Master', status: 'Declined — skills', sent: 'Sent 4 Aug' },
    ],
  },
  {
    id: 'j14', num: '14', company: 'Mercer Textile', heat: 'Interviews set', title: 'Oracle DBA',
    branch: 'Charlotte, NC', place: 'On site — Rock Hill, SC', pay: '$68–78/hr',
    skills: ['Oracle 19c', 'RAC', 'RMAN'], age: 'Open 12 days', subs: '2 submitted', hot: false,
    contact: 'L. Fairbanks · IT Director',
    description:
      'Sole DBA covering ERP and shop-floor systems through a 19c upgrade. On call one week in three.',
    requirements: ['Oracle 19c upgrades and patching', 'RAC and Data Guard', 'RMAN backup and restore proven under pressure'],
    submittals: [
      { name: 'V. Krishnamurthy', title: 'Oracle DBA', status: 'Interview Thu 10:00', sent: 'Sent 17 Aug' },
      { name: 'D. Pham', title: 'Database Administrator', status: 'Client reviewing', sent: 'Sent 18 Aug' },
    ],
  },
  {
    id: 'j15', num: '15', company: 'Foxglove Health', heat: 'Client hot', title: 'Front End Developer',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$58–68/hr',
    skills: ['React', 'TypeScript', 'Accessibility'], age: 'Open 2 days', subs: '1 submitted', hot: false,
    contact: 'N. Obuya · Design Engineering Lead',
    description:
      'Patient portal rebuild with a hard WCAG 2.2 AA acceptance gate. They will run an accessibility exercise, not a leetcode screen.',
    requirements: ['React with TypeScript, hooks-first', 'Demonstrable WCAG 2.2 AA work', 'Comfortable pairing with designers'],
    submittals: [
      { name: 'S. Whitcombe', title: 'Front End Developer', status: 'Client reviewing', sent: 'Sent 20 Aug' },
    ],
  },
  {
    id: 'j16', num: '16', company: 'Vestal Analytics', heat: 'Interviews set', title: 'Data Engineer',
    branch: 'Charlotte, NC', place: 'Remote — EST hours', pay: '$80–92/hr',
    skills: ['Snowflake', 'dbt', 'Airflow'], age: 'Open 8 days', subs: '4 submitted', hot: false,
    contact: 'G. Halloran · Head of Data Platform',
    description:
      'Warehouse migration off Redshift. Two rounds, both technical, both recorded — warn candidates in advance.',
    requirements: ['Snowflake performance and cost tuning', 'dbt project ownership', 'Airflow or Dagster orchestration'],
    submittals: [
      { name: 'C. Nakashima', title: 'Data Engineer', status: 'On assignment', sent: 'Sent 25 Jun' },
      { name: 'A. Zubairu', title: 'Sr. Data Engineer', status: 'Interview Wed 9:00', sent: 'Sent 15 Aug' },
      { name: 'C. Renaud', title: 'Analytics Engineer', status: 'Interview Wed 13:00', sent: 'Sent 15 Aug' },
      { name: 'K. Dassanayake', title: 'Data Engineer', status: 'Declined — rate', sent: 'Sent 14 Aug' },
    ],
  },
  {
    id: 'j17', num: '17', company: 'Anvil Freight', heat: 'Aging', title: 'ERP Project Manager',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$90–105/hr',
    skills: ['SAP', 'PMP', 'Change mgmt'], age: 'Open 26 days', subs: '5 submitted', hot: false,
    contact: 'E. Straka · COO',
    description:
      'SAP rollout across four terminals, already one quarter behind. The COO is the decision maker and takes calls before 8am.',
    requirements: ['Ran an SAP rollout end to end', 'PMP or equivalent', 'Change management with a non-technical workforce', 'Travel to terminals monthly'],
    submittals: [
      { name: 'R. Aubrey', title: 'ERP Program Manager', status: 'Client reviewing', sent: 'Sent 12 Aug' },
      { name: 'H. Villalobos', title: 'IT Project Manager', status: 'Declined — no SAP', sent: 'Sent 8 Aug' },
      { name: 'F. Odunlami', title: 'Project Manager', status: 'Declined — no SAP', sent: 'Sent 8 Aug' },
      { name: 'B. Cathcart', title: 'Delivery Manager', status: 'Declined — comp', sent: 'Sent 2 Aug' },
      { name: 'S. Petrov', title: 'PMO Lead', status: 'Withdrew', sent: 'Sent 30 Jul' },
    ],
  },
  {
    id: 'j18', num: '18', company: 'Windrow Energy', heat: 'New today', title: 'Systems Administrator',
    branch: 'Charlotte, NC', place: 'On site — Huntersville, NC', pay: '$38–46/hr',
    skills: ['VMware', 'Linux', 'Backup'], age: 'Open 1 day', subs: '0 submitted', hot: false,
    contact: 'T. Marchetti · Infrastructure Lead',
    description:
      'Covering a six-month medical leave. Straight contract, no conversion — say so up front.',
    requirements: ['vSphere administration', 'RHEL 8/9 day-to-day', 'Veeam or Commvault backup operations'],
    submittals: [],
  },
  {
    id: 'j19', num: '19', company: 'Carraway Insurance', heat: 'Interviews set', title: 'ServiceNow Developer',
    branch: 'Charlotte, NC', place: 'Remote — US', pay: '$78–90/hr',
    skills: ['ITSM', 'Flow Designer', 'JavaScript'], age: 'Open 10 days', subs: '3 submitted', hot: false,
    contact: 'J. Reyes-Aldana · Service Management Lead',
    description:
      'ITSM to ITOM expansion. Certified Application Developer credential is a hard filter for their procurement team.',
    requirements: ['ServiceNow CAD certification', 'Flow Designer and IntegrationHub', 'Client and server scripting in JavaScript'],
    submittals: [
      { name: 'O. Bekele', title: 'ServiceNow Developer', status: 'Interview Thu 15:00', sent: 'Sent 16 Aug' },
      { name: 'L. Marchand', title: 'ServiceNow Engineer', status: 'Client reviewing', sent: 'Sent 18 Aug' },
      { name: 'D. Iyer', title: 'ITSM Consultant', status: 'Declined — no CAD', sent: 'Sent 14 Aug' },
    ],
  },
  {
    id: 'j20', num: '20', company: 'Blue Harbor Logistics', heat: 'Client hot', title: 'Mobile Developer (iOS)',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$75–85/hr',
    skills: ['Swift', 'SwiftUI', 'REST'], age: 'Open 4 days', subs: '2 submitted', hot: false,
    contact: 'P. Osgood · Mobile Engineering Manager',
    description:
      'Driver app rewrite in SwiftUI. Shipping to the App Store in November, so they want someone who has run a release train.',
    requirements: ['Swift 5.9+ and SwiftUI in a shipped app', 'Offline-first sync', 'App Store release ownership'],
    submittals: [
      { name: 'R. Takahashi', title: 'iOS Developer', status: 'Interview Wed 10:00', sent: 'Sent 19 Aug' },
      { name: 'A. Diallo', title: 'Sr. iOS Engineer', status: 'Client reviewing', sent: 'Sent 20 Aug' },
    ],
  },
  {
    id: 'j21', num: '21', company: 'Halcyon Biotech', heat: 'Interviews set', title: 'Machine Learning Engineer',
    branch: 'Charlotte, NC', place: 'Remote — EST hours', pay: '$105–120/hr',
    skills: ['PyTorch', 'MLOps', 'GCP'], age: 'Open 13 days', subs: '3 submitted', hot: false,
    contact: 'I. Sørensen · Director, Computational Biology',
    description:
      'Assay-image models moving from research notebooks into a validated pipeline. GxP documentation discipline matters more than model novelty here.',
    requirements: ['PyTorch training and deployment', 'Vertex AI or comparable MLOps', 'Regulated / validated environment experience'],
    submittals: [
      { name: 'N. Oyelowo', title: 'ML Engineer', status: 'Panel Fri 13:00', sent: 'Sent 15 Aug' },
      { name: 'S. Brandtner', title: 'Sr. ML Engineer', status: 'Client reviewing', sent: 'Sent 18 Aug' },
      { name: 'J. Mwangi', title: 'Research Engineer', status: 'Declined — no MLOps', sent: 'Sent 13 Aug' },
    ],
  },
  {
    id: 'j22', num: '22', company: 'Rowan Chemical', heat: 'Aging', title: 'Help Desk Analyst',
    branch: 'Charlotte, NC', place: 'On site — Salisbury, NC', pay: '$22–27/hr',
    skills: ['Tier 1 support', 'Active Directory', 'Microsoft 365'], age: 'Open 18 days', subs: '6 submitted', hot: false,
    contact: 'D. Culbertson · Service Desk Supervisor',
    description:
      'Salisbury commute is the whole problem on this req — screen for location first, everything else second.',
    requirements: ['Tier 1 phone and walk-up support', 'Active Directory account administration', 'Microsoft 365 admin basics', 'Reliable commute to Salisbury'],
    submittals: [
      { name: 'M. Escobar', title: 'Help Desk Analyst', status: 'Interview Thu 8:30', sent: 'Sent 19 Aug' },
      { name: 'C. Whitten', title: 'Desktop Support', status: 'Client reviewing', sent: 'Sent 19 Aug' },
      { name: 'A. Kolawole', title: 'IT Support', status: 'Withdrew — commute', sent: 'Sent 14 Aug' },
      { name: 'L. Bryson', title: 'Help Desk Technician', status: 'Withdrew — commute', sent: 'Sent 11 Aug' },
      { name: 'P. Ngassa', title: 'Service Desk Analyst', status: 'Declined — rate', sent: 'Sent 8 Aug' },
      { name: 'J. Halverson', title: 'IT Technician', status: 'Declined — skills', sent: 'Sent 6 Aug' },
    ],
  },
  {
    id: 'j23', num: '23', company: 'Corbin Legal Tech', heat: 'Client hot', title: 'Solutions Architect (Azure)',
    branch: 'Charlotte, NC', place: 'Hybrid — Charlotte, NC', pay: '$110–125/hr',
    skills: ['Azure', '.NET', 'Integration'], age: 'Open 6 days', subs: '2 submitted', hot: false,
    contact: 'K. Ahluwalia · CTO',
    description:
      'Architecture lead for a document-review platform integrating with three case-management vendors. The CTO interviews personally and decides same day.',
    requirements: ['Azure integration services — APIM, Functions, Service Bus', '.NET solution architecture', 'Client-facing design workshops'],
    submittals: [
      { name: 'F. Delacroix', title: 'Solutions Architect', status: 'Interview Wed 16:00', sent: 'Sent 20 Aug' },
      { name: 'T. Byrne', title: 'Azure Architect', status: 'Client reviewing', sent: 'Sent 20 Aug' },
    ],
  },
  {
    id: 'j24', num: '24', company: 'Northgate Health', heat: 'Interviews set', title: 'Technical Writer',
    branch: 'Charlotte, NC', place: 'Remote — US', pay: '$45–55/hr',
    skills: ['API documentation', 'Markdown', 'Confluence'], age: 'Open 9 days', subs: '3 submitted', hot: false,
    contact: 'T. Ozanne · Head of Data',
    description:
      'Documenting the FHIR integration surface for external partners. Same hiring manager as the Data Scientist req — one call can move both.',
    requirements: ['API reference documentation from an OpenAPI spec', 'Docs-as-code in Markdown and Git', 'Healthcare or FHIR exposure preferred'],
    submittals: [
      { name: 'E. Marchetti', title: 'Technical Writer', status: 'Interview Thu 13:30', sent: 'Sent 17 Aug' },
      { name: 'B. Nwachukwu', title: 'Sr. Technical Writer', status: 'Client reviewing', sent: 'Sent 18 Aug' },
      { name: 'S. Larkin', title: 'Documentation Specialist', status: 'Declined — rate', sent: 'Sent 15 Aug' },
    ],
  },
];

/* ── EQC calls ──────────────────────────────────────────────────────────────
   Employee quality checks for talent currently on assignment. The first five
   are the design's rows; the rest carry a realistic day's load. */
export const EQC_CALLS: EqcCall[] = [
  { id: 'q01', name: 'R. Delacroix',  role: '.NET Developer',          client: 'Ardent Mfg',        week: '4',  due: 'Today 9:00',  manager: 'R. Petrosyan · Controller',            started: 'Started 27 Jul', completed: false, note: '' },
  { id: 'q02', name: 'T. Nguyen',     role: 'QA Automation Engineer',  client: 'Cascade Utilities', week: '2',  due: 'Overdue 2d',  manager: 'M. Ludlow · QA Manager',               started: 'Started 10 Aug', completed: false, note: '' },
  { id: 'q03', name: 'M. Whitfield',  role: 'Data Engineer',           client: 'Halloran Group',    week: '8',  due: 'Today 16:30', manager: 'G. Halloran · Head of Data Platform',  started: 'Started 30 Jun', completed: false, note: '' },
  { id: 'q04', name: 'J. Reyes',      role: 'SAP Basis Administrator', client: 'Pallas Robotics',   week: '1',  due: 'First call',  manager: 'S. Achterberg · Director, Applied AI', started: 'Started 18 Aug', completed: false, note: '' },
  { id: 'q05', name: 'A. Bahl',       role: 'Salesforce Developer',    client: 'Northgate Health',  week: '12', due: 'Tomorrow',    manager: 'T. Ozanne · Head of Data',             started: 'Started 2 Jun',  completed: false, note: '' },
  { id: 'q06', name: 'L. Castellanos', role: 'Network Engineer',        client: 'Piedmont Grid',        week: '6',  due: 'Overdue 1d',  manager: 'F. Yeboah · Infrastructure Manager', started: 'Started 14 Jul', completed: false, note: '' },
  { id: 'q07', name: 'D. Okoro',       role: 'BI Analyst',              client: 'Duplin Retail Group',  week: '3',  due: 'Today 10:15', manager: 'S. Mireles · Analytics Manager',     started: 'Started 3 Aug',  completed: false, note: '' },
  { id: 'q08', name: 'S. Feldmann',    role: 'Sr. Java Engineer',       client: 'Trellis Payments',     week: '5',  due: 'Today 11:15', manager: 'J. Prewitt · Engineering Director',  started: 'Started 21 Jul', completed: false, note: '' },
  { id: 'q09', name: 'C. Nakashima',   role: 'Data Engineer',           client: 'Vestal Analytics',     week: '9',  due: 'Today 13:30', manager: 'G. Halloran · Head of Data Platform', started: 'Started 23 Jun', completed: false, note: '' },
  { id: 'q10', name: 'B. Ostrowski',   role: 'Systems Administrator',   client: 'Windrow Energy',       week: '1',  due: 'First call',  manager: 'T. Marchetti · Infrastructure Lead', started: 'Started 19 Aug', completed: false, note: '' },
  { id: 'q11', name: 'V. Okonjo',      role: 'Salesforce Developer',    client: 'Ironwood Financial',   week: '7',  due: 'Today 14:00', manager: 'D. Reinholt · Director, Sales Ops',  started: 'Started 7 Jul',  completed: false, note: '' },
  { id: 'q12', name: 'H. Kirchner',    role: 'Cloud Engineer',          client: 'Sable Aerospace',      week: '14', due: 'Today 15:00', manager: 'W. Ashcroft · VP Technology',       started: 'Started 19 May', completed: false, note: '' },
  { id: 'q13', name: 'Y. Castellanos', role: 'Security Analyst',        client: 'Southgate Bank',       week: '2',  due: 'Overdue 3d',  manager: 'R. Delacroix-Mbeki · SOC Manager',  started: 'Started 11 Aug', completed: false, note: '' },
  { id: 'q14', name: 'A. Lindgren',    role: 'Product Owner',           client: 'Lyric Media',          week: '10', due: 'Tomorrow',    manager: 'C. Marchetti · Head of Product',    started: 'Started 16 Jun', completed: false, note: '' },
  { id: 'q15', name: 'V. Krishnamurthy', role: 'Oracle DBA',            client: 'Mercer Textile',       week: '4',  due: 'Today 15:45', manager: 'L. Fairbanks · IT Director',        started: 'Started 28 Jul', completed: false, note: '' },
  { id: 'q16', name: 'S. Whitcombe',   role: 'Front End Developer',     client: 'Foxglove Health',      week: '1',  due: 'First call',  manager: 'N. Obuya · Design Engineering Lead', started: 'Started 20 Aug', completed: false, note: '' },
  { id: 'q17', name: 'O. Bekele',      role: 'ServiceNow Developer',    client: 'Carraway Insurance',   week: '11', due: 'Tomorrow',    manager: 'J. Reyes-Aldana · Service Mgmt Lead', started: 'Started 9 Jun', completed: false, note: '' },
  { id: 'q18', name: 'R. Takahashi',   role: 'iOS Developer',           client: 'Blue Harbor Logistics', week: '3', due: 'Today 16:00', manager: 'P. Osgood · Mobile Engineering Mgr', started: 'Started 4 Aug', completed: false, note: '' },
  { id: 'q19', name: 'N. Oyelowo',     role: 'ML Engineer',             client: 'Halcyon Biotech',      week: '16', due: 'This week',   manager: 'I. Sørensen · Director, Comp Bio',  started: 'Started 28 Apr', completed: false, note: '' },
  { id: 'q20', name: 'M. Escobar',     role: 'Help Desk Analyst',       client: 'Rowan Chemical',       week: '5',  due: 'This week',   manager: 'D. Culbertson · Service Desk Sup.', started: 'Started 21 Jul', completed: false, note: '' },
  { id: 'q21', name: 'F. Delacroix',   role: 'Solutions Architect',     client: 'Corbin Legal Tech',    week: '2',  due: 'Overdue 1d',  manager: 'K. Ahluwalia · CTO',                started: 'Started 11 Aug', completed: false, note: '' },
  { id: 'q22', name: 'E. Marchetti',   role: 'Technical Writer',        client: 'Northgate Health',     week: '6',  due: 'This week',   manager: 'T. Ozanne · Head of Data',          started: 'Started 14 Jul', completed: false, note: '' },
];

/* ── MPCs ───────────────────────────────────────────────────────────────────
   Candidates being taken to market. The first three are the design's cards
   and are the ones the "Top MPCs" section shows. */
export const MPCS: Mpc[] = [
  {
    id: 'm01', num: '01', name: 'Priya Raman', title: 'Full Stack .NET Developer', place: 'Charlotte — hybrid',
    rate: '$76/hr', skills: ['C# / .NET 8', 'React', 'Azure'], avail: 'Available 1 Sep', marketed: '4 sent · 2 replies',
    summary:
      'Eight years across insurance and payments, last three on a .NET 8 / React platform team at a Charlotte carrier. Wants hybrid, will not go fully on site. Referenced by two former managers.',
    highlights: ['Led the migration of a claims portal from .NET Framework to .NET 8', 'Comfortable across API, front end and Azure pipeline work', 'Charlotte-based, no relocation risk'],
    log: [
      { company: 'Halloran Group', contact: 'B. Halloran · VP Engineering', sent: 'Sent 19 Aug', outcome: 'Reply — reviewing' },
      { company: 'Ironwood Financial', contact: 'D. Reinholt · Director, Sales Ops', sent: 'Sent 19 Aug', outcome: 'Reply — wants a call' },
      { company: 'Trellis Payments', contact: 'J. Prewitt · Engineering Director', sent: 'Sent 20 Aug', outcome: 'No response yet' },
      { company: 'Corbin Legal Tech', contact: 'K. Ahluwalia · CTO', sent: 'Sent 20 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm02', num: '02', name: 'Devon Marsh', title: 'Cloud / DevOps Engineer', place: 'Remote — EST',
    rate: '$88/hr', skills: ['Terraform', 'AWS'], avail: 'Available now', marketed: '6 sent · 1 interview',
    summary:
      'Ten years in infrastructure, the last four building AWS landing zones for regulated clients. Off contract as of last Friday, so this one moves — three of the six sends came back inside a day.',
    highlights: ['Multi-account AWS landing zone with Control Tower and Terraform', 'EKS in production, including cost work', 'US person — clears the Sable Aerospace filter'],
    log: [
      { company: 'Sable Aerospace', contact: 'W. Ashcroft · VP Technology', sent: 'Sent 19 Aug', outcome: 'Interview today 1:00' },
      { company: 'Trellis Payments', contact: 'J. Prewitt · Engineering Director', sent: 'Sent 19 Aug', outcome: 'No response yet' },
      { company: 'Halcyon Biotech', contact: 'I. Sørensen · Director, Comp Bio', sent: 'Sent 19 Aug', outcome: 'No response yet' },
      { company: 'Piedmont Grid', contact: 'F. Yeboah · Infrastructure Manager', sent: 'Sent 20 Aug', outcome: 'No response yet' },
      { company: 'Windrow Energy', contact: 'T. Marchetti · Infrastructure Lead', sent: 'Sent 20 Aug', outcome: 'No response yet' },
      { company: 'Corbin Legal Tech', contact: 'K. Ahluwalia · CTO', sent: 'Sent 20 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm03', num: '03', name: 'Camille Foster', title: 'Data Scientist', place: 'Charlotte — on site',
    rate: '$92/hr', skills: ['Python', 'ML modeling', 'Databricks'], avail: '2 weeks notice', marketed: '3 sent · 0 replies',
    summary:
      'Six years modelling on healthcare claims, currently at a payer analytics shop and quietly looking. The Northgate Health req is the obvious fit — the manager has passed on five profiles for lacking exactly this background.',
    highlights: ['Claims and EHR data at payer scale', 'Databricks and MLflow end to end', 'Presents to clinical stakeholders without a translator'],
    log: [
      { company: 'Northgate Health', contact: 'T. Ozanne · Head of Data', sent: 'Sent 20 Aug', outcome: 'No response yet' },
      { company: 'Pallas Robotics', contact: 'S. Achterberg · Director, Applied AI', sent: 'Sent 18 Aug', outcome: 'No response yet' },
      { company: 'Vestal Analytics', contact: 'G. Halloran · Head of Data Platform', sent: 'Sent 18 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm04', num: '04', name: 'Grigore Rutkowski', title: 'SDET / Automation Lead', place: 'Charlotte — on site',
    rate: '$68/hr', skills: ['Playwright', 'C#', 'Azure DevOps'], avail: 'Available 25 Aug', marketed: '2 sent · 1 reply',
    summary:
      'Built the automation practice at a Charlotte utility from nothing. Wants a lead title next; flag that on every send.',
    highlights: ['Playwright suite covering 400+ regression cases', 'Mentored four manual testers into automation', 'On site is a preference, not a constraint'],
    log: [
      { company: 'Cascade Utilities', contact: 'M. Ludlow · QA Manager', sent: 'Sent 19 Aug', outcome: 'Reply — interview Wed' },
      { company: 'Duplin Retail Group', contact: 'S. Mireles · Analytics Manager', sent: 'Sent 20 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm05', num: '05', name: 'Adaeze Zubairu', title: 'Sr. Data Engineer', place: 'Remote — EST',
    rate: '$94/hr', skills: ['Snowflake', 'dbt', 'Airflow'], avail: '3 weeks notice', marketed: '3 sent · 1 reply',
    summary:
      'Owned a Redshift-to-Snowflake migration at a logistics firm, which is precisely the Vestal Analytics story. Remote only — she has said so twice.',
    highlights: ['Cut warehouse spend 38% during the migration', 'dbt project with 200+ models under test', 'Comfortable being the senior voice on a small team'],
    log: [
      { company: 'Vestal Analytics', contact: 'G. Halloran · Head of Data Platform', sent: 'Sent 15 Aug', outcome: 'Reply — interview Wed 9:00' },
      { company: 'Northgate Health', contact: 'T. Ozanne · Head of Data', sent: 'Sent 18 Aug', outcome: 'No response yet' },
      { company: 'Trellis Payments', contact: 'J. Prewitt · Engineering Director', sent: 'Sent 20 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm06', num: '06', name: 'Ravi Takahashi', title: 'iOS Developer', place: 'Charlotte — hybrid',
    rate: '$79/hr', skills: ['Swift', 'SwiftUI', 'Offline sync'], avail: 'Available 8 Sep', marketed: '2 sent · 1 reply',
    summary:
      'Shipped a driver-facing logistics app with full offline sync — the Blue Harbor req is nearly a description of his last two years.',
    highlights: ['Four App Store releases owned end to end', 'SwiftUI rewrite of a UIKit codebase', 'Currently on assignment through 5 Sep'],
    log: [
      { company: 'Blue Harbor Logistics', contact: 'P. Osgood · Mobile Engineering Mgr', sent: 'Sent 19 Aug', outcome: 'Reply — interview Wed 10:00' },
      { company: 'Lyric Media', contact: 'C. Marchetti · Head of Product', sent: 'Sent 20 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm07', num: '07', name: 'Yusra Castellanos', title: 'Security Analyst', place: 'Charlotte — on site',
    rate: '$74/hr', skills: ['Splunk ES', 'Incident response', 'Threat hunting'], avail: 'Available now', marketed: '2 sent · 0 replies',
    summary:
      'Second-shift SOC background, which is the hard part of the Southgate Bank req. Available immediately and has already cleared a banking background check this year.',
    highlights: ['Splunk ES content development, not just alert triage', 'Ran incident bridge calls at a regional bank', 'Second shift by preference'],
    log: [
      { company: 'Southgate Bank', contact: 'R. Delacroix-Mbeki · SOC Manager', sent: 'Sent 19 Aug', outcome: 'No response yet' },
      { company: 'Carraway Insurance', contact: 'J. Reyes-Aldana · Service Mgmt Lead', sent: 'Sent 20 Aug', outcome: 'No response yet' },
    ],
  },
  {
    id: 'm08', num: '08', name: 'Felix Delacroix', title: 'Solutions Architect (Azure)', place: 'Charlotte — hybrid',
    rate: '$118/hr', skills: ['Azure', '.NET', 'APIM'], avail: '2 weeks notice', marketed: '3 sent · 2 replies',
    summary:
      'Integration architect out of legal tech, so Corbin is a warm story. Priced at the top of the band — qualify the rate before every send.',
    highlights: ['APIM and Service Bus integration estate for a SaaS platform', 'Runs client-facing design workshops', 'Two live conversations already this week'],
    log: [
      { company: 'Corbin Legal Tech', contact: 'K. Ahluwalia · CTO', sent: 'Sent 20 Aug', outcome: 'Reply — interview Wed 16:00' },
      { company: 'Ironwood Financial', contact: 'D. Reinholt · Director, Sales Ops', sent: 'Sent 20 Aug', outcome: 'Reply — reviewing' },
      { company: 'Sable Aerospace', contact: 'W. Ashcroft · VP Technology', sent: 'Sent 18 Aug', outcome: 'No response yet' },
    ],
  },
];

/** The four cards the day sheet leads with. */
export const HOT_JOBS = JOBS.filter((job) => job.hot);
/** The MPC cards section 03 shows. */
export const TOP_MPCS = MPCS.slice(0, 3);
