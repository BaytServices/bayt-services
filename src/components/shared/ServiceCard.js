'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ServiceCard({ service, locale }) {
  const router = useRouter();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const handleClick = () => {
    // Store the selected service ID in sessionStorage
    sessionStorage.setItem('selectedServiceId', service._id);
    router.push(`/${locale}/services`);
  };

  return (
    <div className="service-card" dir={dir} onClick={handleClick}>
      <div className="service-image">
        <Image
          src={service.image}
          alt={service.name[locale]}
          width={300}
          height={200}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="service-content">
        <h3>{service.name[locale]}</h3>
      </div>
    </div>
  );
}