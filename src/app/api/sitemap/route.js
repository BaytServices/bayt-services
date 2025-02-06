// app/api/sitemap/route.js

import sitemap from '../../../app/sitemap'; // Path to your sitemap generation logic


// app/api/sitemap/route.js
export async function GET() {
    try {
        const sitemapEntries = await sitemap();
        const xml = generateSitemapXml(sitemapEntries);
        
        return new Response(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            },
        });
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return new Response('Failed to generate sitemap', { status: 500 });
    }
}

function generateSitemapXml(entries) {
    const urls = entries
        .map(entry => `
            <url>
                <loc>${entry.url}</loc>
                <lastmod>${entry.lastModified}</lastmod>
                <changefreq>${entry.changeFrequency}</changefreq>
                <priority>${entry.priority}</priority>
                ${entry.alternates ? Object.entries(entry.alternates.languages)
                    .map(([lang, href]) => `
                        <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />
                    `).join('') : ''}
            </url>
        `)
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
                xmlns:xhtml="http://www.w3.org/1999/xhtml">
            ${urls}
        </urlset>`;
}