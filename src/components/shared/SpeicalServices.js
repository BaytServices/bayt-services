'use client';

import { useCallback, useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { getServices } from '../../lib/api/services';
import Loading from '../../app/[locale]/loading';

export default function SpecialCarousel({ locale, messages }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleScroll = useCallback((direction) => {
    const container = document.querySelector('.grid-services');
    const scrollAmount = 330; // card width + gap
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  if (loading) {
    return <div className="carousel-container">
      <Loading />
    </div>// You can replace this with a proper loading component
  }

  return (
    <div className="carousel-container">
      <button
        className="arrow arrow-left"
        onClick={() => handleScroll('left')}
        aria-label="Scroll left"
      >
        ←
      </button>
      <div className="grid-services">

      </div>
      <button
        className="arrow arrow-right"
        onClick={() => handleScroll('right')}
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  );
}