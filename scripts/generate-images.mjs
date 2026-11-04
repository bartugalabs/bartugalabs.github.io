#!/usr/bin/env node
/**
 * Generates the static brand images that cannot be produced at build time:
 *
 *   public/apple-touch-icon.png  180x180  iOS home screen icon
 *   public/og-image.png          1200x630 Open Graph / Twitter share card
 *
 * Both outputs are committed, so builds never need this script, the network or
 * the fonts. Re-run it after changing the copy in src/data/site.ts:
 *
 *   node scripts/generate-images.mjs
 *
 * Fonts are downloaded from the google/fonts repository on first run and cached
 * in node_modules/.cache/bartuga-fonts.
 */
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const assetsDir = path.join(root, 'src', 'assets');
const fontCache = path.join(root, 'node_modules', '.cache', 'bartuga-fonts');

const FONTS = [
	{
		file: 'SpaceGrotesk.ttf',
		url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf',
	},
	{
		file: 'Inter.ttf',
		url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf',
	},
	{
		file: 'JetBrainsMono.ttf',
		url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf',
	},
];

// Mirrors the palette in src/styles/global.css.
const palette = {
	bg: '#08151D',
	surface: '#102631',
	border: '#284752',
	primary: '#36AAC5',
	text: '#EEEAE5',
	muted: '#A5BBC4',
};

const CARD = { width: 1200, height: 630 };

async function downloadFonts() {
	await fs.mkdir(fontCache, { recursive: true });

	for (const font of FONTS) {
		const target = path.join(fontCache, font.file);
		if (existsSync(target)) continue;

		process.stdout.write(`  downloading ${font.file}\n`);
		const response = await fetch(font.url);
		if (!response.ok) {
			throw new Error(`Failed to download ${font.file}: ${response.status}`);
		}
		await fs.writeFile(target, Buffer.from(await response.arrayBuffer()));
	}
}

/**
 * Sharp renders SVG text through Pango, which finds fonts via fontconfig.
 * Point fontconfig at the cache directory before Sharp is ever loaded.
 */
async function configureFonts() {
	const conf = path.join(fontCache, 'fonts.conf');
	await fs.writeFile(
		conf,
		`<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
	<dir>${fontCache}</dir>
	<cachedir>${path.join(fontCache, 'cache')}</cachedir>
</fontconfig>
`,
	);
	process.env.FONTCONFIG_FILE = conf;
}

/** Reads the real site copy so the card cannot drift from the page. */
async function loadSite() {
	const { site } = await import('../src/data/site.ts');
	return site;
}

/**
 * Greedy word wrap on character count. Adequate here because the copy and the
 * font sizes are fixed; avoids pulling in a text shaping dependency.
 */
function wrap(text, maxChars) {
	const lines = [];
	let line = '';

	for (const word of text.split(/\s+/)) {
		const candidate = line ? `${line} ${word}` : word;
		if (candidate.length > maxChars && line) {
			lines.push(line);
			line = word;
		} else {
			line = candidate;
		}
	}

	if (line) lines.push(line);
	return lines;
}

const escape = (value) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function background() {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${CARD.height}">
	<defs>
		<radialGradient id="glow" cx="78%" cy="18%" r="62%">
			<stop offset="0%" stop-color="${palette.primary}" stop-opacity="0.22"/>
			<stop offset="100%" stop-color="${palette.primary}" stop-opacity="0"/>
		</radialGradient>
		<pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
			<path d="M64 0H0V64" fill="none" stroke="${palette.border}" stroke-opacity="0.55" stroke-width="1"/>
		</pattern>
		<radialGradient id="grid-mask" cx="62%" cy="30%" r="70%">
			<stop offset="0%" stop-color="#fff" stop-opacity="0.35"/>
			<stop offset="100%" stop-color="#fff" stop-opacity="0"/>
		</radialGradient>
		<mask id="grid-fade"><rect width="${CARD.width}" height="${CARD.height}" fill="url(#grid-mask)"/></mask>
	</defs>
	<rect width="${CARD.width}" height="${CARD.height}" fill="${palette.bg}"/>
	<rect width="${CARD.width}" height="${CARD.height}" fill="url(#grid)" mask="url(#grid-fade)"/>
	<rect width="${CARD.width}" height="${CARD.height}" fill="url(#glow)"/>
</svg>`;
}

function copyLayers(site) {
	const { hero } = site;

	// Split the headline so the final word of the accent phrase stands alone,
	// mirroring the hero layout on the page.
	const accentWords = hero.titleAccent.trim().split(/\s+/);
	const headline = [
		`${hero.titleLead.trim()} ${accentWords.slice(0, -1).join(' ')}`.trim(),
		accentWords.at(-1),
	];
	const lede = wrap(hero.lead, 46);

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${CARD.height}">
	<text x="80" y="248" font-family="JetBrains Mono" font-weight="500" font-size="17"
		letter-spacing="4.2" fill="${palette.primary}">${escape(hero.eyebrow.toUpperCase())}</text>
	<text x="80" y="356" font-family="Space Grotesk" font-weight="600" font-size="72"
		fill="${palette.text}">${escape(headline[0])}</text>
	<text x="80" y="436" font-family="Space Grotesk" font-weight="600" font-size="72"
		fill="${palette.primary}">${escape(headline[1])}</text>
	${lede
		.map(
			(line, index) =>
				`<text x="80" y="${518 + index * 38}" font-family="Inter" font-weight="400" font-size="26"
		fill="${palette.muted}">${escape(line)}</text>`,
		)
		.join('\n\t')}
</svg>`;
}

/** Rounds the app icon so it sits in a card on the card background. */
function markLayers(size, radius) {
	return {
		mask: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
			<rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/>
		</svg>`,
		border: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
			<rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" rx="${radius}"
				fill="none" stroke="${palette.border}" stroke-width="1"/>
		</svg>`,
	};
}

async function writeAppleTouchIcon(sharp) {
	const icon = await fs.readFile(path.join(publicDir, 'icon-512.png'));
	const out = path.join(publicDir, 'apple-touch-icon.png');
	// The source icon is fully opaque on the site background, so a straight
	// resize is safe behind iOS's rounded mask.
	await sharp(icon).resize(180, 180, { fit: 'cover' }).png().toFile(out);
	console.log(`  apple-touch-icon -> ${path.relative(root, out)}`);
}

async function writeOgImage(sharp, site) {
	const logo = await fs.readFile(path.join(assetsDir, 'logo.webp'));
	const icon = await fs.readFile(path.join(publicDir, 'icon-512.png'));

	const markSize = 300;
	const markTop = 300;
	const markLeft = CARD.width - 80 - markSize;
	const { mask, border } = markLayers(markSize, 28);

	const logoWidth = 330;
	const logoBuffer = await sharp(logo)
		.resize({ width: logoWidth })
		.png()
		.toBuffer();
	const markBuffer = await sharp(icon)
		.resize({ width: markSize })
		.composite([{ input: Buffer.from(mask), blend: 'dest-in' }])
		.png()
		.toBuffer();

	const out = path.join(publicDir, 'og-image.png');
	await sharp(Buffer.from(background()))
		.composite([
			{ input: logoBuffer, top: 76, left: 80 },
			{ input: Buffer.from(copyLayers(site)), top: 0, left: 0 },
			{ input: markBuffer, top: markTop, left: markLeft },
			{ input: Buffer.from(border), top: markTop, left: markLeft },
		])
		.png({ compressionLevel: 9 })
		.toFile(out);

	const { size } = await fs.stat(out);
	console.log(`  social card -> ${path.relative(root, out)} (${Math.round(size / 1024)} kB)`);
}

async function main() {
	console.log('Generating brand images');
	await downloadFonts();
	await configureFonts();

	// Imported after fontconfig is configured so Pango sees the cache directory.
	const { default: sharp } = await import('sharp');
	const site = await loadSite();

	await writeAppleTouchIcon(sharp);
	await writeOgImage(sharp, site);
}

await main();
