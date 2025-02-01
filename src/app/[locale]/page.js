export const dynamic = 'force-dynamic';

import ServicesCarousel from '../../components/shared/Carousel';
import Banner from '../../components/shared/Banner';
import Image from 'next/image';
import Link from 'next/link';
import { generateSeoMetadata } from "../../lib/seo";
import arMessages from '../../messages/ar.json';
import enMessages from '../../messages/en.json';
import BannerImg from "../../assets/images/handyman.png";
import AboutImg from "../../assets/images/about.jpg"
export default async function Home({ params: { locale } }) {
  const messages = locale === 'ar' ? arMessages : enMessages;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <Banner
        bgImage={BannerImg}
        title={messages.home.bannerTitle}
        subtitle={messages.home.bannerSubtitle}
        servicesBtn={messages.home.serviceBtn}
        locale={locale}
      />
      <section id='services-section' dir={dir}>
        <div className='container'>
          <div className='heading'>
            <h1>{messages.home.servicesTitle}</h1>
            <p>{messages.home.servicesDescription}</p>
          </div>
          <ServicesCarousel
            locale={locale}
            messages={messages.home}
          />
          <Link href={`/${locale}/services`} className='btn'>
            {messages.home.allServices}
          </Link>
        </div>
      </section>

      {/* New Why Us Section */}
      <section id="why-us" dir={dir}>
        <div className="container">
          <div className="heading">
            <h1>{messages.home.whyUsTitle}</h1>
          </div>
          <div className="faq">
            <div className="faq-item">
              <h3>{messages.home.whyUsQ1}</h3>
              <p>{messages.home.whyUsA1}</p>
            </div>
            <div className="faq-item">
              <h3>{messages.home.whyUsQ2}</h3>
              <p>{messages.home.whyUsA2}</p>
            </div>
            <div className="faq-item">
              <h3>{messages.home.whyUsQ3}</h3>
              <p>{messages.home.whyUsA3}</p>
            </div>
            <div className="faq-item">
              <h3>{messages.home.whyUsQ4}</h3>
              <p>{messages.home.whyUsA4}</p>
            </div>
          </div>
        </div>
      </section>

      <section id='about'>
        <div className="container">
          <div className="text">
            <h2 className='title'>{messages.about.aboutUs}</h2>
            <p>{messages.about.aboutText}</p>
          </div>
          <div className="image">
            <Image
              src={AboutImg}
              alt={messages.about.aboutUs}
            />
          </div>
        </div>
      </section>
    </>
  );
}
