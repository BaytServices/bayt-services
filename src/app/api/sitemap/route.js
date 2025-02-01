// app/api/sitemap/route.js

import sitemap from '../../../app/sitemap'; // Path to your sitemap generation logic

export async function GET(req) {
    // Get the language from the query parameters (either 'ar' or 'en')
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'en'; // Default to 'en' if no lang is provided

    try {
        const sitemapEntries = await sitemap(lang); // Pass language to your sitemap function

        // Generate the XML string for the sitemap
        const xml = generateSitemapXml(sitemapEntries, lang);

        // Return the sitemap as an XML response
        return new Response(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
            },
        });
    } catch (error) {
        return new Response('Failed to generate sitemap', { status: 500 });
    }
}

// Helper function to generate XML from sitemap entries
function generateSitemapXml(entries, lang) {
    const urls = entries
        .map(entry => {
            // Adjust URLs based on the language (you might want to add more logic here)
            const localizedUrl = lang === 'ar' 
                ? entry.url.replace('/en/', '/ar/') // Convert to Arabic version of URL
                : entry.url; // Keep the default (English)

            return `
                <url>
                    <loc>${localizedUrl}</loc>
                    <lastmod>${entry.lastModified}</lastmod>
                    <changefreq>${entry.changeFrequency}</changefreq>
                    <priority>${entry.priority}</priority>
                    ${entry.alternates ? Object.keys(entry.alternates.languages).map(lang => {
                        return `
                            <xhtml:link rel="alternate" hreflang="${lang}" href="${entry.alternates.languages[lang]}" />
                        `;
                    }).join('') : ''}
                </url>
            `;
        })
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${urls}
    </urlset>`;
}
