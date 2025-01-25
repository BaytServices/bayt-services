"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import arMessages from '../../messages/ar.json';
import enMessages from '../../messages/en.json';
import logo from '../../assets/images/logo.png'; // Importing the logo image

export default function Navbar({ locale }) {
  // Load translations based on the locale
  const messages = locale === 'ar' ? arMessages : enMessages;
  const t = messages.nav; // Navigation-related translations
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // State to toggle dropdown menu
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open'); // Prevent scrolling when menu is open
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuOpen]);

  return (
    <nav dir={dir} className="nav-bar">
      <div className="logo">
        <Image src={logo} alt="شعار" />
        <Link href={`/${locale}`}>
          {locale === 'ar' ? 'بيت الخدمات' : 'Bayt Services'}
        </Link>
      </div>

      <div className={`nav-list ${menuOpen ? 'active' : ''}`}>
        <Link href={`/${locale}`} onClick={() => setMenuOpen(false)}>{t.home}</Link>
        <Link href={`/${locale}/services`} onClick={() => setMenuOpen(false)}>{t.services}</Link>
        <Link href={`/#about`} onClick={() => setMenuOpen(false)}>{t.about}</Link>
        <Link href={`/add-service`} onClick={() => setMenuOpen(false)}>{t.addService}</Link>
      </div>

      <div className="options">
        <div className="language-option">
          <LanguageSwitcher currentLocale={locale} />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className={menuOpen ? 'fa fa-times' : 'fa fa-bars'}></i>
        </button>
      </div>
    </nav>
  );
}
