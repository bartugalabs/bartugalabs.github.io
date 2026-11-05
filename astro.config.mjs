// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://bartuga.com',
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Space Grotesk',
			cssVariable: '--font-heading',
			weights: [500, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Inter',
			cssVariable: '--font-body',
			weights: [400, 500, 600],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['monospace'],
		},
	],
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"base-uri 'self'",
				"object-src 'none'",
				"form-action 'self'",
				"img-src 'self' data:",
				"font-src 'self'",
				"frame-src https://www.openstreetmap.org",
				"connect-src 'self'",
				"manifest-src 'self'",
				"upgrade-insecure-requests",
			],
			styleDirective: {
				resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }],
			},
		},
	},
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/404'),
			lastmod: new Date(),
		}),
	],
});
