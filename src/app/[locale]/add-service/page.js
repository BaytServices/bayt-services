"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faCheckCircle,
    faTimesCircle,
    faWhatsapp,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import arMessages from "../../../messages/ar.json";
import enMessages from "../../../messages/en.json";
import { getCities } from '../../../lib/api/cities';
import { getServices } from '../../../lib/api/services';
import { getWebsiteInfo } from "../../../lib/api/websiteInfo";
import { use } from 'react';

export default function AddService({ params }) {
    const { locale } = use(params)
    const messages = locale === "ar" ? arMessages : enMessages;
    const t = messages.addService;
    const dir = locale === "ar" ? "rtl" : "ltr";

    const [cities, setCities] = useState([]);
    const [services, setServices] = useState([]);
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [websiteInfo, setWebsiteInfo] = useState(null);
    const [filters, setFilters] = useState({
        city: '',
        service: ''
    });
    const [submitted, setSubmitted] = useState(false);

    // Format data for react-select
    const cityOptions = [
        { value: '', label: t.selectCity },
        ...cities.map(city => ({
            value: city._id,
            label: city.name[locale]
        }))
    ];

    const serviceOptions = [
        { value: '', label: t.selectService },
        ...services.map(service => ({
            value: service._id,
            label: service.name[locale]
        }))
    ];

    useEffect(() => {
        const fetchWebsiteData = async () => {
            try {
                const data = await getWebsiteInfo(); // Fetch the website info from API
                setWebsiteInfo(data); // Save the data to state
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Handle error
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchWebsiteData();
    }, []);


    // Fetch cities and services on component mount
    useEffect(() => {
        const fetchCitiesAndServices = async () => {
            try {
                const [citiesData, servicesData] = await Promise.all([
                    getCities(),
                    getServices()
                ]);
                setCities(citiesData);
                setServices(servicesData);
            } catch (err) {
                setError(t.fetchError);
            }
        };

        fetchCitiesAndServices();
    }, []);

    // Handle filter changes
    const handleFilterChange = (type, selectedOption) => {
        setFilters(prev => ({
            ...prev,
            [type]: selectedOption ? selectedOption.value : ''
        }));
        // Reset contact, error, and submitted state when filters change
        setContact(null);
        setError('');
        setSubmitted(false);
    };

    // Handle form submission to check for existing contact
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!filters.city || !filters.service) {
            setError(t.requiredFields);
            return;
        }

        setLoading(true);
        setError("");
        setSubmitted(true);

        try {
            const response = await fetch(
                `https://bayt-admin.vercel.app/api/service-contacts?city=${filters.city}&service=${filters.service}`
            );
            const data = await response.json();

            if (data.contacts.length > 0) {
                setContact(data.contacts[0]);
            } else {
                setContact(null);
            }
        } catch (err) {
            setError(t.fetchError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="add-service-page ">
            <div dir={dir} className="container">
                <h1 className="page-title">{t.title}</h1>

                <form onSubmit={handleSubmit} className="service-form">
                    <div className="filters">
                        <div className="filter-item">
                            <Select
                                options={cityOptions}
                                value={cityOptions.find(option => option.value === filters.city)}
                                onChange={(selectedOption) => handleFilterChange('city', selectedOption)}
                                placeholder={t.selectCity}
                                isClearable
                                className='select'
                            />
                        </div>
                        <div className="filter-item">
                            <Select
                                options={serviceOptions}
                                value={serviceOptions.find(option => option.value === filters.service)}
                                onChange={(selectedOption) => handleFilterChange('service', selectedOption)}
                                placeholder={t.selectService}
                                isClearable
                                className='select'
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
                        ) : (
                            t.checkAvailability
                        )}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}

                {loading ? (
                    <div className="loading-state">
                        <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
                        <p>{t.loading}</p>
                    </div>
                ) : submitted ? (
                    contact ? (
                        <div className="contact-card">
                            <h2 className="card-title">{t.serviceTaken}</h2>
                            <div className="card-content">
                                <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />
                                <p>{t.serviceAlreadyTaken}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="contact-card">
                            <h2 className="card-title">{t.addNewService}</h2>
                            <div className="card-content">
                                <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                                <p>{t.serviceAvailable}</p>
                            </div>
                            <div className="contact-buttons">
                                <a
                                    href={`https://wa.me/${websiteInfo.whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-button whatsapp-button"
                                >
                                    {t.addContact}
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="default-state">
                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                        <p>{t.defaultMessage}</p>
                    </div>
                )}
            </div>
        </section>
    );
}