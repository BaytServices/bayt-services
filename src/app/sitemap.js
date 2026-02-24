// app/sitemap.js
const BASE_URL = 'https://bayt-services.com';

async function fetchAllServiceContacts() {
    try {
        const response = await fetch('https://bayt-admin.vercel.app/api/service-contacts?active=true');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.contacts || [];
    } catch (error) {
        console.error('Error fetching service contacts:', error);
        return [];
    }
}

export default async function sitemap() {
    const serviceContacts = await fetchAllServiceContacts();

    // Generate entries for service contacts
    const serviceEntries = serviceContacts.flatMap(contact => {
        // Create slugs for both languages
        const serviceNameSlugAr = encodeURIComponent(contact.service.name.ar || '').replace(/%20/g, '-');
        const serviceNameSlugEn = encodeURIComponent(contact.service.name.en || '').replace(/%20/g, '-');
        const citySlugAr = encodeURIComponent(contact.city.name.ar || '').replace(/%20/g, '-');
        const citySlugEn = encodeURIComponent(contact.city.name.en || '').replace(/%20/g, '-');
        
        // Create Arabic and English URLs
        const arUrl = `${BASE_URL}/ar/services/${serviceNameSlugAr}/${citySlugAr}/${contact._id}`;
        const enUrl = `${BASE_URL}/en/services/${serviceNameSlugEn}/${citySlugEn}/${contact._id}`;

        // Return both language versions as separate entries
        return [
            {
                url: arUrl,
                lastModified: new Date(contact.updatedAt).toISOString(),
                changeFrequency: 'daily',
                priority: 0.9,
                alternates: {
                    languages: {
                        'ar-SA': arUrl,
                        'en-SA': enUrl,
                    },
                },
            },
            {
                url: enUrl,
                lastModified: new Date(contact.updatedAt).toISOString(),
                changeFrequency: 'daily',
                priority: 0.9,
                alternates: {
                    languages: {
                        'ar-SA': arUrl,
                        'en-SA': enUrl,
                    },
                },
            }
        ];
    });

    // Generate entries for static pages
    const staticPages = [
        // Homepage in both languages
        {
            url: `${BASE_URL}/ar`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1.0,
            alternates: {
                languages: {
                    'ar-SA': `${BASE_URL}/ar`,
                    'en-SA': `${BASE_URL}/en`,
                },
            },
        },
        {
            url: `${BASE_URL}/en`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1.0,
            alternates: {
                languages: {
                    'ar-SA': `${BASE_URL}/ar`,
                    'en-SA': `${BASE_URL}/en`,
                },
            },
        },
        // Services page in both languages
        {
            url: `${BASE_URL}/ar/services`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
            alternates: {
                languages: {
                    'ar-SA': `${BASE_URL}/ar/services`,
                    'en-SA': `${BASE_URL}/en/services`,
                },
            },
        },
        {
            url: `${BASE_URL}/en/services`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
            alternates: {
                languages: {
                    'ar-SA': `${BASE_URL}/ar/services`,
                    'en-SA': `${BASE_URL}/en/services`,
                },
            },
        },
    ];

    return [...staticPages, ...serviceEntries];
}
