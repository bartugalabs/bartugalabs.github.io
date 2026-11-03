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

export interface ContactEmail {
	label: string;
	address: string;
	href: string;
	provider?: 'proton';
}

export interface ProtonBadge {
	label: string;
	href: string;
	logo: string;
	logoAlt: string;
}

export interface CompanyInfo {
	legalName: string;
	street: string;
	postalCode: string;
	city: string;
	country: string;
	countryCode: string;
	vatId: string;
	vatLabel: string;
	map: {
		embedUrl: string;
		link: string;
		label: string;
	};
}

export interface Principle {
	icon: 'eu' | 'retention' | 'opensource';
	title: string;
	description: string;
	link?: { label: string; href: string };
}

const githubUrl = 'https://github.com/bartugalabs';

export const site = {
	name: 'Bartuga',
	url: 'https://bartugalabs.github.io',
	description:
		'Bartuga delivers cybersecurity assessments, authorised penetration testing and geospatial intelligence — helping organisations defend their systems and act on spatial data.',
	email: 'port@bartuga.com',
	contactHref: 'mailto:port@bartuga.com?subject=Project%20enquiry',
	github: githubUrl,
	tagline:
		'Cybersecurity, ethical hacking and geointelligence for organisations that need clarity.',

	// TODO(before-launch): Replace placeholder address and VAT with the real details.
	company: {
		// TODO(before-launch): Replace placeholder address, VAT and map coordinates with real details.
		legalName: 'Bartuga s.r.o.',
		street: 'Václavské náměstí 1',
		postalCode: '110 00',
		city: 'Praha 1',
		country: 'Czech Republic',
		countryCode: 'CZ',
		vatId: 'CZ00000000',
		vatLabel: 'VAT ID',
		map: {
			embedUrl:
				'https://www.openstreetmap.org/export/embed.html?bbox=14.4100%2C50.0770%2C14.4300%2C50.0970&layer=mapnik&marker=50.0870%2C14.4200',
			link: 'https://www.openstreetmap.org/?mlat=50.0870&mlon=14.4200#map=15/50.0870/14.4200',
			label: 'Prague, Czech Republic',
		},
	} satisfies CompanyInfo,

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

	principles: {
		eyebrow: 'Principles',
		title: 'European by design. Private by default.',
		lead: 'An EU-based team, zero retention by default, and open source at the core.',
		items: [
			{
				icon: 'eu',
				title: 'EU jurisdiction',
				description: 'Data and engagements stay under EU law.',
			},
			{
				icon: 'retention',
				title: 'Zero retention',
				description: 'Client data is deleted at close-out; exceptions are agreed in writing.',
			},
			{
				icon: 'opensource',
				title: 'Open source first',
				description: 'Open standards and tooling, so nothing is a black box.',
				link: { label: 'GitHub', href: githubUrl },
			},
		] satisfies Principle[],
	},

	cybersecurity: {
		eyebrow: '01 — Cybersecurity',
		title: 'Defence that holds.',
		lead: 'Gaps found, risks ranked, fixes shipped.',
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
		title: 'Proof over promises.',
		lead: 'Authorised attacks. Clear evidence. Verified fixes.',
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
		title: 'Terrain, made legible.',
		lead: 'Imagery and maps, turned into decisions.',
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
		emails: [
			{
				label: 'General enquiries',
				address: 'port@bartuga.com',
				href: 'mailto:port@bartuga.com?subject=Project%20enquiry',
			},
			{
				label: 'Proton Mail',
				address: 'bartuga@proton.me',
				href: 'mailto:bartuga@proton.me?subject=Project%20enquiry',
				provider: 'proton',
			},
		] satisfies ContactEmail[],
		protonBadge: {
			label: 'Powered by',
			href: 'https://proton.me/mail',
			logo: '/images/proton-wordmark-dark.svg',
			logoAlt: 'Proton',
		} satisfies ProtonBadge,
		details: [
			{ label: 'Response time', value: 'Within two business days' },
			{ label: 'Engagements', value: 'Remote worldwide · on-site by arrangement' },
			{ label: 'Confidentiality', value: 'NDA available on request' },
		] satisfies ContactDetail[],
	},
} as const;
