// app/sitemap.js

const BASE_URL = 'https://bayt-services-xsdp.vercel.app'; // Replace with your actual domain

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

export default async function sitemap() {
    const serviceContacts = await fetchAllServiceContacts();

    const serviceEntries = serviceContacts.map(contact => ({
        url: `${BASE_URL}/services/${contact._id}`,
        lastModified: new Date(contact.updatedAt),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
            languages: {
                'ar-SA': `${BASE_URL}/ar/services/${contact._id}`,
                'en-SA': `${BASE_URL}/en/services/${contact._id}`,
            },
        },
        // Additional SEO enhancements
        _extra: {
            serviceName: contact.service?.name?.en || '',
            city: contact.city?.name?.en || '',
            region: 'Saudi Arabia'
        }
    }));

    const staticPages = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    return [...staticPages, ...serviceEntries];
}