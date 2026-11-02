export interface NavItem {
	label: string;
	href: string;
}

export interface Service {
	title: string;
	description: string;
}

export interface Step {
	title: string;
	description: string;
}

export interface ContactDetail {
	label: string;
	value: string;
}

export const site = {
	name: 'Bartuga',
	url: 'https://bartugalabs.github.io',
	description:
		'Bartuga delivers cybersecurity assessments, authorised penetration testing and geospatial intelligence — helping organisations defend their systems and act on spatial data.',
	// Replace this placeholder with the real address before launch.
	email: 'hello@bartuga.com',
	contactHref: 'mailto:hello@bartuga.com?subject=Project%20enquiry',
	github: 'https://github.com/bartugalabs',
	tagline:
		'Cybersecurity, ethical hacking and geointelligence for organisations that need clarity.',

	nav: [
		{ label: 'Cybersecurity', href: '#cybersecurity' },
		{ label: 'Pentesting', href: '#pentesting' },
		{ label: 'Geointelligence', href: '#geointelligence' },
		{ label: 'Contact', href: '#contact' },
	] satisfies NavItem[],

	hero: {
		eyebrow: 'Cybersecurity · Pentesting · Geointelligence',
		titleLead: 'Security and ',
		titleAccent: 'spatial intelligence',
		titleTail: '',
		lead: 'We defend systems, test resilience, and turn spatial data into decisions.',
		primaryCta: 'Book a review',
		secondaryCta: 'See capabilities',
	},

	cybersecurity: {
		eyebrow: '01 — Cybersecurity',
		title: 'Defensive depth, built for real operations.',
		lead: 'We map your attack surface, close the gaps that matter, and leave your team with controls it can operate day to day.',
		services: [
			{
				title: 'Security assessments',
				description:
					'Structured reviews of infrastructure, applications and cloud configuration, prioritised by business impact rather than scanner noise.',
			},
			{
				title: 'Hardening & architecture',
				description:
					'Practical remediation and design guidance for identity, network segmentation, logging and secrets management.',
			},
			{
				title: 'Monitoring & response readiness',
				description:
					'Detection design, alert triage and incident playbooks, so the signal arrives before the damage does.',
			},
		] satisfies Service[],
		outcomes: [
			'Risk ranked by impact',
			'Fixes your team can ship',
			'Evidence you can audit',
		],
	},

	pentesting: {
		eyebrow: '02 — Pentesting',
		title: 'Authorised testing, front to back.',
		lead: 'Every engagement follows a written scope, a documented method and a report your engineers can act on.',
		steps: [
			{
				title: 'Scoping & rules of engagement',
				description:
					'We agree targets, boundaries, timing and escalation paths in writing before a single packet moves.',
			},
			{
				title: 'Reconnaissance & threat modelling',
				description:
					'Mapping exposed assets, identities and trust paths to identify the scenarios most likely to succeed.',
			},
			{
				title: 'Controlled exploitation',
				description:
					'Manual testing with guardrails, proving impact without disrupting production or exceeding scope.',
			},
			{
				title: 'Reporting & remediation guidance',
				description:
					'Clear findings, reproducible evidence and prioritised fixes, with both technical detail and an executive summary.',
			},
			{
				title: 'Retest & verification',
				description:
					'We confirm the fixes hold and provide a close-out record for auditors, customers and internal teams.',
			},
		] satisfies Step[],
		note: 'Testing only with written authorisation, inside agreed boundaries, under confidentiality.',
		cta: 'Scope an engagement',
	},

	geointelligence: {
		eyebrow: '03 — Geointelligence',
		title: 'Geospatial context for better decisions.',
		lead: 'From satellite imagery to operational maps, we turn spatial data into answers your team can use.',
		services: [
			{
				title: 'GIS analysis & mapping',
				description:
					'Layered analysis, suitability modelling and cartography that make complex terrain legible.',
			},
			{
				title: 'Remote sensing & imagery',
				description:
					'Optical and radar imagery processing for change detection, monitoring and site assessment.',
			},
			{
				title: 'Spatial data pipelines',
				description:
					'Reproducible ingestion, validation and delivery of geospatial data across your stack.',
			},
		] satisfies Service[],
		useCases: ['Site suitability', 'Environmental monitoring', 'Infrastructure planning', 'Change detection'],
	},

	contact: {
		eyebrow: '04 — Contact',
		title: "Tell us what you're defending.",
		copy: "Share the system, the question or the dataset you're working with. We'll respond with a clear next step — not a sales sequence.",
		label: 'Start a conversation',
		details: [
			{ label: 'Response time', value: 'Within two business days' },
			{ label: 'Engagements', value: 'Remote worldwide · on-site by arrangement' },
			{ label: 'Confidentiality', value: 'NDA available on request' },
		] satisfies ContactDetail[],
	},
} as const;
