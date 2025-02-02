'use client';

import { useEffect, useState, useRef } from 'react';
import Loading from '../../app/[locale]/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTags, faPhone } from '@fortawesome/free-solid-svg-icons';
import arMessages from '../../messages/ar.json';
import enMessages from '../../messages/en.json';
import { useRouter } from 'next/navigation';

export default function SpecialContactsCarousel({ locale }) {
    const messages = locale === 'ar' ? arMessages : enMessages;
    const router = useRouter();

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showArrows, setShowArrows] = useState(false); // State to control arrows visibility

    const gridRef = useRef(null);

    const getDisplayImage = (contact) => {
        if (contact.images && contact.images.length > 0) {
            return contact.images[0];
        }
        return contact.service.image;
    };

    const toSlug = (text = "") => {
        return text
            .toString() // Ensure text is a string
            .trim() // Remove leading/trailing whitespace
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^\w\u0600-\u06FF-]/g, '') // Keep Arabic, alphanumeric, and dashes
            .toLowerCase(); // Convert to lowercase
    };

    const handleContactClick = (contactId, cityName, serviceName) => {
        const citySlug = toSlug(cityName[locale]);
        const serviceSlug = toSlug(serviceName[locale]);
        router.push(`/${locale}/services/${serviceSlug}/${citySlug}/${contactId}`);
    };

    const scrollLeft = () => {
        if (gridRef.current) {
            gridRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (gridRef.current) {
            gridRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    // Function to check if arrows should be shown
    const checkArrowsVisibility = () => {
        if (gridRef.current) {
            const containerWidth = gridRef.current.offsetWidth;
            const totalWidth = gridRef.current.scrollWidth;
            // If the total width of the items is greater than the container width, show arrows
            setShowArrows(totalWidth > containerWidth);
        }
    };

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('https://bayt-admin.vercel.app/api/service-contacts');
                if (!response.ok) {
                    throw new Error('Failed to fetch contacts');
                }
                const data = await response.json();
                const specialContacts = data.contacts.filter(contact => contact.isSpecial);
                setContacts(specialContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        // Check arrows visibility when the component is mounted or contacts change
        checkArrowsVisibility();

        // Optional: Add an event listener to handle window resizing
        window.addEventListener('resize', checkArrowsVisibility);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkArrowsVisibility);
        };
    }, [contacts]);

    if (loading) {
        return (
            <div className="carousel-container contacts-carousel">
                <Loading />
            </div>
        );
    }

    if (contacts.length === 0) {
        return (
            ""
        );
    }

    return (
        <section id="special">
            <h2>{messages.speical.title}</h2>
            <div className="carousel-container contacts-carousel">
                {/* Left arrow button */}
                {showArrows && (
                    <button className="arrow arrow-left" onClick={scrollLeft}>
                        &#9664;
                    </button>
                )}
                {/* Right arrow button */}
                {showArrows && (
                    <button className="arrow arrow-right" onClick={scrollRight}>
                        &#9654;
                    </button>
                )}

                <div className="grid-services" ref={gridRef}>
                    {contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className="service-card"
                            onClick={() => {
                                console.log("City Name:", contact.city.name[locale]);
                                console.log("Service Name:", contact.service.name[locale]);
                                handleContactClick(contact._id, contact.city.name, contact.service.name);
                            }}
                        >
                            <div className="image-container">
                                <img
                                    src={getDisplayImage(contact)}
                                    alt={contact.name[locale]}
                                    className="service-image"
                                />
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">{contact.name[locale]}</h3>
                                <div className="service-info">
                                    <span className="location-badge">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        {contact.city.name[locale]}
                                    </span>
                                    <span className="service-type">
                                        <FontAwesomeIcon icon={faTags} />
                                        {contact.service.name[locale]}
                                    </span>
                                </div>
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="contact-buttons">
                                    <a
                                        href={`https://wa.me/${contact.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-button whatsapp-button"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {messages.services.whatsapp}
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="contact-button call-button"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {messages.services.call}
                                        <FontAwesomeIcon icon={faPhone} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
