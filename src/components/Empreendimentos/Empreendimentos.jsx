import { useRef, useEffect, useState, useCallback } from 'react'
import { properties } from '../../data/properties'
import EmpreendimentoModal from '../EmpreendimentoModal/EmpreendimentoModal'
import './Empreendimentos.css'

function IconBed() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>
  )
}

function IconArea() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  )
}

function IconCar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4a1 1 0 011 1v8a1 1 0 01-1 1H1"/>
    </svg>
  )
}

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

function useVisibleCount() {
  const [count, setCount] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 600) setCount(1)
      else if (window.innerWidth < 1000) setCount(2)
      else setCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

function PropertyCard({ property, onSaibaMais }) {
  return (
    <article className="property-card">
      <div className="property-img">
        <img src={property.image} alt={property.name} loading="lazy" />
        <span
          className="property-badge"
          style={{ background: property.badgeColor }}
        >
          {property.badge}
        </span>
      </div>

      <div className="property-body">
        <h3>{property.name}</h3>

        <p className="property-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          {property.location}
        </p>

        <div className="property-features">
          <span className="feature">
            <IconBed /> {property.bedrooms} {property.bedroomLabel}
          </span>
          <span className="feature">
            <IconArea /> {property.area} m²
          </span>
          <span className="feature">
            <IconCar /> {property.parking} vagas
          </span>
        </div>

        <div className="property-price">
          <div className="price">
            {property.price}
            <small>A partir de</small>
          </div>
          <button className="btn-saiba" onClick={() => onSaibaMais(property)}>
            Saiba mais
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Empreendimentos() {
  const ref = useRef(null)
  const [activeProperty, setActiveProperty] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = useVisibleCount()
  const maxIndex = Math.max(0, properties.length - visibleCount)

  useEffect(() => {
    setCurrentIndex(i => Math.min(i, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const prev = useCallback(() => setCurrentIndex(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setCurrentIndex(i => Math.min(maxIndex, i + 1)), [maxIndex])

  const translateX = -(currentIndex * (100 / properties.length))

  return (
    <section id="empreendimentos" className="empreendimentos" ref={ref}>
      <div className="section-header reveal">
        <span className="tag">Portfólio exclusivo</span>
        <h2>Nossos <em>Empreendimentos</em></h2>
        <p>
          Selecionamos os melhores imóveis para você. Qualidade,
          localização e valorização garantida.
        </p>
      </div>

      <div className="carousel-wrapper reveal">
        <button
          className="carousel-arrow carousel-prev"
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Imóvel anterior"
        >
          <IconChevronLeft />
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {properties.map(p => (
              <div
                key={p.id}
                className="carousel-slide"
                style={{ flex: `0 0 calc(100% / ${visibleCount})` }}
              >
                <PropertyCard property={p} onSaibaMais={setActiveProperty} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow carousel-next"
          onClick={next}
          disabled={currentIndex === maxIndex}
          aria-label="Próximo imóvel"
        >
          <IconChevronRight />
        </button>
      </div>

      <div className="carousel-dots reveal">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === currentIndex ? ' active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ir para posição ${i + 1}`}
          />
        ))}
      </div>

      {activeProperty && (
        <EmpreendimentoModal
          property={activeProperty}
          onClose={() => setActiveProperty(null)}
        />
      )}
    </section>
  )
}
