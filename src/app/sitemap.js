// app/sitemap.js

const BASE_URL = 'https://bayt-services-xsdp.vercel.app'; // Update to your app's URL

async function fetchAllServiceContacts() {
    try {
        const response = await fetch('https://bayt-admin.vercel.app/api/service-contacts');
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

export default async function sitemap(lang = 'ar') {
    const serviceContacts = await fetchAllServiceContacts();

    const serviceEntries = serviceContacts.map(contact => {
        // Access the name and city in the appropriate language
        const serviceNameSlug = encodeURIComponent(contact.service.name[lang] || '').replace(/%20/g, '-');
        const citySlug = encodeURIComponent(contact.city.name[lang] || '').replace(/%20/g, '-');
        
        return {
            url: `${BASE_URL}/${lang}/services/${serviceNameSlug}/${citySlug}/${contact._id}`,
            lastModified: new Date(contact.updatedAt).toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
            alternates: {
                languages: {
                    'ar-SA': `${BASE_URL}/ar/services/${serviceNameSlug}/${citySlug}/${contact._id}`,
                    'en-SA': `${BASE_URL}/en/services/${serviceNameSlug}/${citySlug}/${contact._id}`,
                },
            },
        };
    });

    const staticPages = [
        {
            url: `${BASE_URL}/${lang}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    return [...staticPages, ...serviceEntries];
}
