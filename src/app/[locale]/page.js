'use client';

import { useEffect, useState } from 'react';
import ServicesCarousel from '../../components/shared/Carousel';
import Banner from '../../components/shared/Banner';
import Image from 'next/image';
import Link from 'next/link';
import { generateSeoMetadata } from "../../lib/seo";
import arMessages from '../../messages/ar.json';
import enMessages from '../../messages/en.json';
import BannerImg from "../../assets/images/handyman.png";
import AboutImg from "../../assets/images/about.jpg";
import SpecialContactsCarousel from '../../components/shared/SpeicalCarousel';
import { use } from 'react';

export default function Home({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap the params Promise

  const { locale } = params

  const messages = locale === 'ar' ? arMessages : enMessages;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lazy load all contacts after the page loads
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://bayt-admin.vercel.app/api/service-contacts?active=true'); // Use a serverless function or API route
        const data = await response.json();
        setAllContacts(data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const toSlug = (text = "") => {
    return text
      .toString()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0600-\u06FF-]/g, '')
      .toLowerCase();
  };

  return (
    <>
      <head>
        <link rel="canonical" href={`https://bayt-services.com/ar`} />
        <link rel="alternate" hreflang="ar" href="https://bayt-services.com/ar" />
        <link rel="alternate" hreflang="en" href="https://bayt-services.com/en" />
        <link rel="alternate" hreflang="x-default" href="https://bayt-services.com" />
      </head>
      <Banner
        bgImage={BannerImg}
        title={messages.home.bannerTitle}
        subtitle={messages.home.bannerSubtitle}
        servicesBtn={messages.home.serviceBtn}
        locale={locale}
      />
      <section id="services-section" dir={dir}>
        <div className="container">
          <div className="heading">
            <h2>{messages.home.servicesTitle}</h2>
            <p>{messages.home.servicesDescription}</p>
          </div>
          <ServicesCarousel locale={locale} messages={messages.home} />
          <Link href={`/${locale}/services`} className="btn">
            {messages.home.allServices}
          </Link>
        </div>
      </section>
      <section id="about">
        <div className="container">
          <div className="text">
            <h2 className="title">{messages.about.aboutUs}</h2>
            <p>{messages.about.aboutText}</p>
          </div>
          <div className="image">
            <Image src={AboutImg} alt={messages.about.aboutUs} />
          </div>
        </div>
      </section>
      <SpecialContactsCarousel locale={locale} messages={messages} />
      <section id="why-us" dir={dir}>
        <div className="container">
          <div className="heading">
            <h2>{messages.home.whyUsTitle}</h2>
          </div>
          <div className="faq">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="faq-item" key={i}>
                <h3>{messages.home[`whyUsQ${i + 1}`]}</h3>
                <p>{messages.home[`whyUsA${i + 1}`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div style={{ display: 'none' }}>
        {!loading &&
          allContacts.map(contact => {
            const citySlug = toSlug(contact.city.name[locale]);
            const serviceSlug = toSlug(contact.service.name[locale]);
            const arPath = `/ar/services/${serviceSlug}/${citySlug}/${contact._id}`;
            const enPath = `/en/services/${serviceSlug}/${citySlug}/${contact._id}`;
            return (
              <div key={contact._id}>
                <a href={`https://bayt-services.com${arPath}`}>{arPath}</a>
                <a href={`https://bayt-services.com${enPath}`}>{enPath}</a>
              </div>

            );
          })}
      </div>
    </>
  );
}
