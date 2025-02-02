export const dynamic = 'force-dynamic';

import arMessages from '../../../../../../messages/ar.json';
import enMessages from '../../../../../../messages/en.json';
import { generateSeoMetadata } from '../../../../../../lib/seo';
import ImageSlider from '../../../../../../components/shared/ImageSlider';
import Banner from '../../../../../../components/shared/Banner';

export async function generateMetadata({ params }) {
    const { locale, id } = params;
    const contact = await fetch(`https://bayt-admin.vercel.app/api/service-contacts/${id}`)
        .then((res) => res.json())
        .catch((error) => {
            console.error('Fetch error in generateMetadata:', error);
            return null;
        });

    if (!contact) return {
        title: 'Page Not Found',
        description: 'The requested service page was not found.',
        robots: 'noindex, nofollow',
    };

    // Use contact description if available, otherwise fallback to service description
    const description = contact.description?.[locale] || contact.service.description[locale];

    // Use contact keywords if available, otherwise generate them dynamically
    const keywords = contact.keywords?.[locale] || generateKeywords(contact, locale);

    const meta = generateSeoMetadata({
        title: {
            ar: `${contact.name.ar} - ${contact.service.name.ar} في ${contact.city.name.ar} | خدمات مميزة`,
            en: `${contact.name.en} - ${contact.service.name.en} in ${contact.city.name.en} | Top Quality Services`,
        },
        description: {
            ar: description,
            en: description,
        },
        keywords: {
            ar: keywords.join(', '),
            en: keywords.join(', '),
        },
        path: `/${locale}/services/${id}`,
        locale,
    });

    // Add Open Graph & Twitter Metadata
    return {
        ...meta,
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: `https://bayt-services.com/${locale}/services/${id}`,
            images: contact.images?.length > 0 ? contact.images : [contact.service.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: contact.images?.length > 0 ? contact.images[0] : contact.service.image,
        },
    };
}

function generateKeywords(contact, locale) {
    const cityName = contact.city.name[locale];
    const serviceName = contact.service.name[locale];
    const serviceDescription = contact.service.description[locale];

    // Base keyword patterns
    const baseKeywords = {
        en: [
            `${serviceName} in ${cityName}`,
            `${serviceName} services in ${cityName}`,
            `${serviceName} near me`,
            `Best ${serviceName} in ${cityName}`,
            `${serviceName} experts in ${cityName}`,
            `Affordable ${serviceName} in ${cityName}`,
            `Professional ${serviceName} in ${cityName}`,
            `${serviceName} for your home in ${cityName}`,
            `Reliable ${serviceName} in ${cityName}`,
            `Top-rated ${serviceName} in ${cityName}`,
            `${serviceName} services in Saudi Arabia`,
            `${serviceName} experts`,
            `${serviceName} providers in ${cityName}`,
            `Get the best ${serviceName} in ${cityName}`,
            `${serviceName} for home and office`,
            `Experienced ${serviceName} in ${cityName}`,
            `${serviceName} services that you can trust`,
            `${serviceName} in Saudi Arabia`,
            `Highly rated ${serviceName} in ${cityName}`,
            `Best service for ${serviceName} in ${cityName}`
        ],
        ar: [
            `${serviceName} في ${cityName}`,
            `${serviceName} خدمات في ${cityName}`,
            `أفضل ${serviceName} في ${cityName}`,
            `${serviceName} الخبراء في ${cityName}`,
            `خدمات ${serviceName} في ${cityName}`,
            `خدمات ${serviceName} بأسعار معقولة في ${cityName}`,
            `شركات ${serviceName} في ${cityName}`,
            `نقل ${serviceName} في ${cityName}`,
            `أفضل خدمات ${serviceName} في ${cityName}`,
            `أفضل خبراء ${serviceName} في ${cityName}`,
            `${serviceName} بأعلى جودة في ${cityName}`,
            `خدمات ${serviceName} المتخصصة`,
            `أفضل خدمات ${serviceName} في السعودية`,
            `أفضل شركات ${serviceName} في ${cityName}`,
            `متخصصون في ${serviceName} في ${cityName}`,
            `خدمات ${serviceName} الموثوقة`,
            `${serviceName} بشكل احترافي في ${cityName}`,
            `نقل ${serviceName} بجودة عالية في ${cityName}`,
            `أسعار مميزة لخدمات ${serviceName} في ${cityName}`,
            `خدمات ${serviceName} الموثوقة في ${cityName}`
        ]
    };

    // Generate dynamic keywords from the service description
    const descriptionKeywords = serviceDescription.match(/\b\w+\b/g)
        ? serviceDescription.match(/\b\w+\b/g).map(word => word.toLowerCase())
        : [];

    // Combine all keywords
    const allKeywords = [
        ...baseKeywords[locale],
        ...descriptionKeywords,
        `${serviceName} ${cityName}`,
        `${serviceName} in Saudi Arabia`,
        `${serviceName} professional services`,
        `Reliable ${serviceName}`,
        `${serviceName} transportation`,
        `${serviceName} moving services`
    ];

    // Remove duplicates
    const uniqueKeywords = [...new Set(allKeywords)];

    return uniqueKeywords.slice(0, 20); // Return the top 20 keywords
}

export default async function ContactPage({ params: { locale, id } }) {
    const contact = await fetch(`https://bayt-admin.vercel.app/api/service-contacts/${id}`)
        .then((res) => res.json())
        .catch(() => null);

    const messages = locale === 'ar' ? arMessages : enMessages;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    if (!contact) {
        return (
            <div className="error-container">
                <h2 className="error-title">{messages.errors.notFound}</h2>
                <p className="error-message">{messages.errors.tryAgain}</p>
            </div>
        );
    }

    const images = contact.images?.length > 0 ? contact.images : [contact.service.image];

    // Add Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": contact.service.name[locale],
        "provider": {
            "@type": "Organization",
            "name": contact.name[locale],
            "areaServed": contact.city.name[locale],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": contact.phone,
                "contactType": "Customer Service",
                "areaServed": contact.city.name[locale],
                "availableLanguage": locale === 'ar' ? "Arabic" : "English"
            },
        },
        "serviceArea": contact.city.name[locale],
        "image": images,
        "description": contact.description?.[locale] || contact.service.description[locale],
        "url": `https://bayt-services.com/${locale}/services/${contact._id}`,
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": contact.city.latitude,
            "longitude": contact.city.longitude
        },
        "priceRange": contact.service.priceRange || "Contact for Pricing",
    };

    // Generate keywords from API and the service description
    const apiKeywords = contact.keywords?.[locale] || [];
    const generatedKeywords = generateKeywords(contact, locale);

    // Combine API keywords and dynamically generated keywords
    const combinedKeywords = [...new Set([...apiKeywords, ...generatedKeywords])];

    return (
        <section className="service-page" dir={dir}>
            <Banner
                bgImage={false}
                title={`${contact.service.name[locale]} ${locale === 'ar' ? 'في' : 'in'} ${contact.city.name[locale]}`}
                subtitle={messages.services.subMsg}
                servicesBtn={messages.services.backBtn}
                locale={locale}
            />
            <div className="container">
                {/* Service Details Section */}
                <div className="details-section">
                    <h1 className="service-title">{contact.name[locale]}</h1>
                    <p className="service-location">
                        <i className="fas fa-map-marker-alt"></i> {contact.city.name[locale]}
                    </p>
                    <p className="service-category">
                        <i className="fas fa-tags"></i> {contact.service.name[locale]}
                    </p>
                    <p className="service-phone">
                        <i className="fas fa-phone"></i> {contact.phone}
                    </p>
                    <div className="service-description">
                        <h2>{messages.services.description}</h2>
                        <p>{contact.description?.[locale] || contact.service.description[locale]}</p>
                    </div>
                    <div className="contact-actions">
                        <a
                            href={`https://wa.me/${contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-button"
                        >
                            <i className="fab fa-whatsapp"></i> {messages.services.whatsapp}
                        </a>
                        <a href={`tel:${contact.phone}`} className="call-button">
                            <i className="fas fa-phone"></i> {messages.services.call}
                        </a>
                    </div>
                </div>
                {/* Image Section */}
                <div className="image-section">
                    <ImageSlider images={images} />
                </div>
            </div>
            <div className="keywords-section">
                <h2>{messages.services.keywordsTitle}</h2>
                <ul>
                    {combinedKeywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
            </div>
            {/* JSON-LD for Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </section>
    );
}
