'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCities } from '../../../lib/api/cities';
import { getServices } from '../../../lib/api/services';
import { getServiceContacts } from '../../../lib/api/serviceContacts';
import arMessages from '../../../messages/ar.json';
import enMessages from '../../../messages/en.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faTags } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { use } from 'react';
import SmartPagination from "../../../components/shared/SmartPagination"
export default function ServicesPage({ params }) {
  const { locale } = use(params)
  const router = useRouter();

  const messages = locale === 'ar' ? arMessages : enMessages;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Data states
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    city: '',
    service: '',
    page: 1
  });

  // Pagination
  const contactsPerPage = 20;
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate visible page numbers
  const calculatePages = () => {
    const maxPagesToShow = isMobile ? 5 : 10;
    let pageNumbers = [];

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor((maxPagesToShow - 1) / 2);
    let startPage = filters.page - half;
    let endPage = filters.page + (maxPagesToShow - half - 1);

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPagesToShow;
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = calculatePages();
  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [citiesData, servicesData, contactsData] = await Promise.all([
          getCities(),
          getServices(),
          getServiceContacts({ page: 1, limit: 1000 })
        ]);

        setCities(citiesData);
        setServices(servicesData);
        setAllContacts(contactsData.contacts);
        setFilteredContacts(contactsData.contacts);

        // Check sessionStorage for stored service ID
        const storedServiceId = sessionStorage.getItem('selectedServiceId');
        if (storedServiceId) {
          setFilters(prev => ({
            ...prev,
            service: storedServiceId
          }));
          // Clear the stored service ID after using it
          sessionStorage.removeItem('selectedServiceId');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Remove serviceId dependency since we're using sessionStorage

  // Apply filters
  useEffect(() => {
    let filtered = [...allContacts];
    if (filters.city) {
      filtered = filtered.filter(contact => contact.city._id === filters.city);
    }
    if (filters.service) {
      filtered = filtered.filter(contact => contact.service._id === filters.service);
    }
    setFilteredContacts(filtered);
  }, [filters, allContacts]);

  // Get paginated contacts
  // Pagination

  // Get paginated contacts
  const getPaginatedContacts = () => {
    const startIndex = (filters.page - 1) * contactsPerPage;
    const endIndex = startIndex + contactsPerPage;

    // Ensure at least 12 contacts are displayed if available
    const contacts = filteredContacts.slice(startIndex, endIndex);
    return contacts.length < contactsPerPage && filters.page === 1
      ? filteredContacts.slice(0, contactsPerPage)
      : contacts;
  };


  // Handle filter changes
  const handleFilterChange = (type, selectedOption) => {
    setFilters(prev => ({
      ...prev,
      [type]: selectedOption ? selectedOption.value : '',
      page: 1
    }));
  };

  // Handle contact card click
  // Handle contact card click

  const toSlug = (text = "") => {
    return text
      .toString() // Ensure text is a string
      .trim() // Remove leading/trailing whitespace
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/[^\w\u0600-\u06FF-]/g, '') // Keep Arabic, alphanumeric, and dashes
      .toLowerCase(); // Convert to lowercase
  };


  // Prefetch the page for better performance
  useEffect(() => {
    allContacts.forEach(contact => {
      const citySlug = toSlug(contact.city.name[locale]);
      const serviceSlug = toSlug(contact.service.name[locale]);
      const path = `/${locale}/services/${serviceSlug}/${citySlug}/${contact._id}`;
      router.prefetch(path);
    });
  }, [allContacts, locale, router]);

  const handleContactClick = (contactId, cityName, serviceName) => {
    const citySlug = toSlug(cityName[locale]);
    const serviceSlug = toSlug(serviceName[locale]);
    const path = `/${locale}/services/${serviceSlug}/${citySlug}/${contactId}`;

    // Show loading state
    setIsLoading(true);

    // Navigate to the page
    router.push(path);
  };



  // Get display image for contact
  const getDisplayImage = (contact) => {
    if (contact.images && contact.images.length > 0) {
      return contact.images[0];
    }
    return contact.service.image;
  };

  // Format data for react-select
  const cityOptions = [
    { value: '', label: messages.services.allCities },
    ...cities.map(city => ({
      value: city._id,
      label: city.name[locale]
    }))
  ];

  const serviceOptions = [
    { value: '', label: messages.services.allServices },
    ...services.map(service => ({
      value: service._id,
      label: service.name[locale]
    }))
  ];

  return (
    <>
      <head>
        <link rel="canonical" href={`https://bayt-services.com/ar/services`} />
        <link rel="alternate" hreflang="ar" href="https://bayt-services.com/ar/services" />
        <link rel="alternate" hreflang="en" href="https://bayt-services.com/en/services" />
    </head>
      <div className="contacts-page">
        <div className="container" dir={dir}>
          <div className="filters">
            <div className="filter-item">
              <Select
                options={cityOptions}
                value={cityOptions.find(option => option.value === filters.city)}
                onChange={(selectedOption) => handleFilterChange('city', selectedOption)}
                placeholder={messages.services.selectCity}
                isClearable
                className='select'
              />
            </div>
            <h1>{messages.services.contactsTitle}</h1>
            <div className="filter-item">
              <Select
                options={serviceOptions}
                value={serviceOptions.find(option => option.value === filters.service)}
                onChange={(selectedOption) => handleFilterChange('service', selectedOption)}
                placeholder={messages.services.selectService}
                isClearable
                className='select'
              />
            </div>
          </div>
          <div className="grid-services">
            {isLoading ? (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            ) : getPaginatedContacts().length > 0 ? (
              getPaginatedContacts().map((contact) => (
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

                    <div className='stars'>
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
              ))
            ) : (
              <p className='no-result'>{messages.services.noResults}</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={filters.page === 1}
                className="page-button prev-next"
              >
                {messages.pagination.prev}

              </button>

              {pageNumbers.map(page => (
                <button
                  key={page}
                  onClick={() => setFilters(prev => ({ ...prev, page }))}
                  className={`page-button ${page === filters.page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={filters.page === totalPages}
                className="page-button prev-next"
              >
                {messages.pagination.next}
              </button>
            </div>
          )}
        </div>
      </div></>
  );
}