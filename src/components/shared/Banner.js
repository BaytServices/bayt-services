import Image from 'next/image';
import Link from 'next/link';

export default function Banner({ bgImage, title, subtitle, locale, servicesBtn }) {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <div className="banner" dir={dir}>
            <div className="text">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                {servicesBtn && (
                    <Link href={`/${locale}/services`}>
                        {servicesBtn}
                    </Link>
                )}
            </div>
            {bgImage && (
                <Image
                    src={bgImage}
                    alt={title}
                />
            )}
        </div>
    );
}
