"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arMessages from '../../messages/ar.json';
import enMessages from '../../messages/en.json';
import logo from '../../assets/images/logo.png';
import { getWebsiteInfo } from '../../lib/api/websiteInfo';
export default function Footer({ locale }) {
  const messages = locale === 'ar' ? arMessages : enMessages;
  const t = messages.footer;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const [websiteInfo, setWebsiteInfo] = useState(null); // State to store website info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch website info on component mount
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

  // Loading or error states
  if (loading) return <footer>Loading...</footer>;
  if (error) return <footer>Error: {error}</footer>;

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
            <p className="footer-about">{t.aboutText}</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">{t.quickLinks}</h3>
            <ul className="footer-links">
              <li>
                <Link href={`/${locale}`}>{t.home}</Link>
              </li>
              <li>
                <Link href={`/${locale}/services`}>{t.services}</Link>
              </li>
              <li>
                <Link href={`/#about`}>{t.about}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h3 className="footer-heading">{t.contactUs}</h3>
            <ul className="footer-contact">
              {/* Contact info */}
              <li>
                <i className="fas fa-envelope"></i>
                <span>{websiteInfo.email}</span> {/* Dynamic email */}
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>{websiteInfo.phoneNumber}</span> {/* Dynamic phone */}
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>{t.address}</span> {/* Static address or you can update it if provided */}
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-section">
            <h3 className="footer-heading">{t.followUs}</h3>
            <div className="footer-social">
              {websiteInfo.socialMedia && (
                <>
                  {websiteInfo.socialMedia.facebook && (
                    <a href={websiteInfo.socialMedia.facebook} target="_blank" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                  {websiteInfo.socialMedia.twitter && (
                    <a href={websiteInfo.socialMedia.twitter} target="_blank" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {websiteInfo.socialMedia.instagram && (
                    <a href={websiteInfo.socialMedia.instagram} target="_blank" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {websiteInfo.socialMedia.linkedin && (
                    <a href={websiteInfo.socialMedia.linkedin} target="_blank" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} Bayt Services. {t.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
