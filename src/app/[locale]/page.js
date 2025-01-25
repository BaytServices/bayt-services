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

export async function generateMetadata({ params: { locale } }) {
  return generateSeoMetadata({
    title: {
      ar: 'بيت الخدمات - دليلك الشامل للخدمات في المملكة العربية السعودية',
      en: 'Bayt Services - Your Complete Guide to Services in Saudi Arabia'
    },
    description: {
      ar: 'اكتشف أفضل مزودي الخدمات في جميع مدن المملكة. نقدم خدمات التنظيف، الصيانة، النقل، وأكثر من ذلك بكثير',
      en: 'Discover top service providers across Saudi Arabia. We offer cleaning, maintenance, transport, and much more'
    },
    keywords: {
      ar: 'خدمات منزلية, خدمات تنظيف, صيانة منازل, نقل اثاث, خدمات السعودية, شركات خدمات',
      en: 'home services, cleaning services, home maintenance, furniture transport, Saudi services, service companies'
    },
    path: '/',
    locale
  });
}

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
