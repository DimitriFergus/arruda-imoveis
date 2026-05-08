import { useState, useEffect, useRef } from 'react'
import { properties } from '../../data/properties'
import EmpreendimentoModal from '../EmpreendimentoModal/EmpreendimentoModal'
import './TodosImoveis.css'

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

function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  )
}

function PropertyCard({ property, onSaibaMais }) {
  return (
    <article className="ti-card">
      <div className="ti-card-img">
        <img src={property.image} alt={property.name} loading="lazy" />
        <span className="ti-badge" style={{ background: property.badgeColor }}>
          {property.badge}
        </span>
      </div>
      <div className="ti-card-body">
        <h3>{property.name}</h3>
        <p className="ti-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          {property.location}
        </p>
        <div className="ti-features">
          <span><IconBed /> {property.bedrooms} {property.bedroomLabel}</span>
          <span><IconArea /> {property.area} m²</span>
          <span><IconCar /> {property.parking} vagas</span>
        </div>
        <div className="ti-price-row">
          <div className="ti-price">
            {property.price}
            <small>A partir de</small>
          </div>
          <button className="ti-btn-saiba" onClick={() => onSaibaMais(property)}>
            Saiba mais
          </button>
        </div>
      </div>
    </article>
  )
}

export default function TodosImoveis({ onVoltar }) {
  const [activeProperty, setActiveProperty] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.title = 'Todos os Imóveis — Arruda Imóveis'
    return () => { document.title = 'Arruda Imóveis' }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.ti-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ti-page" ref={ref}>
      {/* Header próprio, fora do menu principal */}
      <header className="ti-header">
        <button className="ti-voltar" onClick={onVoltar} aria-label="Voltar">
          <IconArrowLeft />
          Voltar
        </button>
        <div className="ti-header-title">
          <span className="ti-logo-text">Arruda <em>Imóveis</em></span>
        </div>
      </header>

      <div className="ti-hero">
        <span className="tag">Portfólio completo</span>
        <h1>Todos os <em>Imóveis Disponíveis</em></h1>
        <p>{properties.length} empreendimentos selecionados para você</p>
      </div>

      <div className="ti-grid">
        {properties.map((p, i) => (
          <div
            key={p.id}
            className="ti-reveal"
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
          >
            <PropertyCard property={p} onSaibaMais={setActiveProperty} />
          </div>
        ))}
      </div>

      {activeProperty && (
        <EmpreendimentoModal
          property={activeProperty}
          onClose={() => setActiveProperty(null)}
        />
      )}
    </div>
  )
}
