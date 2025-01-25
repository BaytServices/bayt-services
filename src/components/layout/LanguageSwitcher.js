// src/components/layout/LanguageSwitcher.js
'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher({ currentLocale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = () => {
    const newLocale = currentLocale === 'ar' ? 'en' : 'ar'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button 
      onClick={handleLanguageChange}
      className="lang-btn"
    >
      {currentLocale === 'ar' ? 'EN' : 'AR'}
    </button>
  )
}
