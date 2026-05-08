import { useRef, useEffect, useState } from 'react'
import { properties } from '../../data/properties'
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

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
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

function PropertyCard({ property, onSaibaMais }) {
  return (
    <article className="property-card">
      <div className="property-img">
        <img src={property.image} alt={property.name} loading="lazy" />
        <span className="property-badge" style={{ background: property.badgeColor }}>
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
          <span className="feature"><IconBed /> {property.bedrooms} {property.bedroomLabel}</span>
          <span className="feature"><IconArea /> {property.area} m²</span>
          <span className="feature"><IconCar /> {property.parking} vagas</span>
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

function SaibaMaisCard({ onVerTodos }) {
  return (
    <article
      className="saiba-mais-card"
      onClick={onVerTodos}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onVerTodos()}
    >
      <div className="smc-icon">
        <IconGrid />
      </div>
      <h3>Ver Todos os Imóveis</h3>
      <p>{properties.length} empreendimentos disponíveis no nosso portfólio completo</p>
      <div className="smc-cta">
        <span>Explorar portfólio</span>
        <IconArrowRight />
      </div>
    </article>
  )
}

const CARDS_PER_PAGE = 3

export default function Empreendimentos({ onVerTodos, onSaibaMais }) {
  const ref = useRef(null)
  const [page, setPage] = useState(0)

  // 11 imóveis + 1 card "Ver Todos" = 12 itens (4 páginas × 3)
  const mainProperties = properties.slice(0, 11)
  const totalItems = mainProperties.length + 1 // +1 para o card "Ver Todos"
  const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE)

  const prev = () => setPage(p => Math.max(0, p - 1))
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1))

  const startIndex = page * CARDS_PER_PAGE

  // Monta os itens da página atual
  const pageItems = []
  for (let i = startIndex; i < startIndex + CARDS_PER_PAGE; i++) {
    if (i < mainProperties.length) {
      pageItems.push({ type: 'property', data: mainProperties[i] })
    } else if (i === mainProperties.length) {
      pageItems.push({ type: 'saibaMais' })
    }
  }

  // Animação do header (só uma vez)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.section-header.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Re-observa os cards quando a página do carrossel muda
  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.properties-grid .reveal')
    if (!cards) return
    cards.forEach(el => {
      el.classList.remove('visible')
    })
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    cards.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [page])

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

      <div className="carousel-wrapper">
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={prev}
          disabled={page === 0}
          aria-label="Anterior"
        >
          <IconChevronLeft />
        </button>

        <div className="properties-grid">
          {pageItems.map((item, i) =>
            item.type === 'property' ? (
              <div key={item.data.id} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <PropertyCard property={item.data} onSaibaMais={onSaibaMais} />
              </div>
            ) : (
              <div key="saiba-mais" className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <SaibaMaisCard onVerTodos={onVerTodos} />
              </div>
            )
          )}
        </div>

        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={next}
          disabled={page === totalPages - 1}
          aria-label="Próximo"
        >
          <IconChevronRight />
        </button>
      </div>

      {/* Indicadores de página */}
      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === page ? ' active' : ''}`}
            onClick={() => setPage(i)}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>

    </section>
  )
}
