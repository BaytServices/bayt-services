export const dynamic = 'force-dynamic';

import arMessages from '../../../../messages/ar.json';
import enMessages from '../../../../messages/en.json';
import { generateSeoMetadata } from '../../../../lib/seo';
import ImageSlider from '../../../../components/shared/ImageSlider';
import Banner from '../../../../components/shared/Banner';
export async function generateMetadata({ params: { locale, id } }) {
    const contact = await fetch(`https://bayt-admin.vercel.app/api/service-contacts/${id}`)
        .then((res) => res.json())
        .catch((error) => {
            console.error('Fetch error in generateMetadata:', error);
            return null;
        });

    if (!contact) return {};

    return generateSeoMetadata({
        title: {
            ar: `${contact.name.ar} - ${contact.service.name.ar} في ${contact.city.name.ar} | خدمات مميزة`,
            en: `${contact.name.en} - ${contact.service.name.en} in ${contact.city.name.en} | Top Quality Services`,
        },
        description: {
            ar: `احصل على ${contact.service.name.ar} المميزة في ${contact.city.name.ar}. نقدم خدمات عالية الجودة تلبي احتياجاتك. تواصل معنا عبر الواتساب أو الهاتف الآن.`,
            en: `Get premium ${contact.service.name.en} in ${contact.city.name.en}. We offer high-quality services tailored to your needs. Contact us via WhatsApp or phone today.`,
        },
        keywords: {
            ar: `${contact.service.name.ar}, ${contact.city.name.ar}, خدمات منزلية, أفضل شركة خدمات, ${contact.name.ar}, خدمات ${contact.service.name.ar} في ${contact.city.name.ar}`,
            en: `${contact.service.name.en}, ${contact.city.name.en}, home services, best service company, ${contact.name.en}, ${contact.service.name.en} in ${contact.city.name.en}`,
        },
        path: `/${locale}/services/${id}`,
        locale,
    });

}

export default async function ContactPage({ params: { locale, id } }) {
    const contact = await fetch(`https://bayt-admin.vercel.app/api/service-contacts/${id}`)
        .then((res) => res.json())
        .catch(() => null);

    if (!contact) {
        const messages = locale === 'ar' ? arMessages : enMessages;
        return (
            <div className="error-container">
                <h2 className="error-title">{messages.errors.notFound}</h2>
                <p className="error-message">{messages.errors.tryAgain}</p>
            </div>
        );
    }

    const messages = locale === 'ar' ? arMessages : enMessages;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    const images = contact.images?.length > 0 ? contact.images : [contact.service.image];

    return (
        <section className="service-page" dir={dir}>
            <Banner
                bgImage={false}
                title={`${contact.service.name[locale]} ${locale === 'ar' ? 'في' : 'in'} ${contact.city.name[locale]}`}

                subtitle={messages.services.subMsg}
                servicesBtn={messages.services.backBtn}
                locale={locale} />
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
                        <p>{contact.service.description[locale]}</p>
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
        </section>
    );
}
