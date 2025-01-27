// src/app/[locale]/layout.js
import Navbar from '../../components/layout/Navbar';
import { generateSeoMetadata } from '../../lib/seo';
import "../../styles/normalize.css"
import "../../styles/globals.css"
import "../../styles/media.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../../components/layout/Footer';

export async function generateMetadata({ params: { locale } }) {
  return generateSeoMetadata({
    title: {
      ar: 'بيت الخدمات - خدمات موثوقة في جميع مدن المملكة',
      en: 'Bayt Services - Trusted Services Across Saudi Arabia'
    },
    description: {
      ar: "اكتشف مزودي خدمات المنازل الموثوقين في مدينتك. نوفر مجموعة واسعة من الخدمات الموثوقة في جميع أنحاء المملكة العربية السعودية لتلبية جميع احتياجاتك المنزلية والحياتية.",
      en: "Discover trusted home service providers in your city. Offering a wide range of reliable services across Saudi Arabia, we connect you with professionals for all your home and lifestyle needs."

    },
    keywords: {
      ar: 'خدمات منزلية, خدمات تنظيف, صيانة منازل, نقل اثاث, خدمات السعودية',
      en: 'home services, cleaning services, maintenance, moving services, saudi arabia services'
    },
    path: '/',
    locale
  })
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <Navbar locale={locale} />

        <main >
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}