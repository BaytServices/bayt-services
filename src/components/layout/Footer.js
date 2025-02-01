import Link from 'next/link';
import Image from 'next/image';
import arMessages from '../../messages/ar.json';
import enMessages from '../../messages/en.json';
import logo from '../../assets/images/logo.png';

export default function Footer({ locale }) {
    const messages = locale === 'ar' ? arMessages : enMessages;
    const t = messages.footer;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <footer dir={dir} className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Logo and About Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <Image src={logo} alt={t.logoAlt} width={50} height={50} />
                            <Link href={`/${locale}`} className="footer-brand">
                                {locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services'}
                            </Link>
                        </div>
                        <p className="footer-about">
                            {t.aboutText}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-heading">{t.quickLinks}</h3>
                        <ul className="footer-links">
                            <li>
                                <Link href={`/${locale}`}>
                                    {t.home}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/services`}>
                                    {t.services}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/#about`}>
                                    {t.about}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-section">
                        <h3 className="footer-heading">{t.contactUs}</h3>
                        <ul className="footer-contact">
                            <li>

                                <i className="fas fa-envelope"></i>

                                <span>bayt.services.info@gmail.com</span>
                            </li>
                            <li>

                                <i className="fas fa-phone"></i>

                                <span>0558749348</span>
                            </li>
                            <li>

                                <i className="fas fa-map-marker-alt"></i>
                                <span>{t.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="footer-section">
                        <h3 className="footer-heading">{t.followUs}</h3>
                        <div className="footer-social">
                            <a href="#" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer-copyright">
                <p>
                    © {new Date().getFullYear()} Bayt Services. {t.allRightsReserved}
                </p>
            </div>
        </footer>
    );
}