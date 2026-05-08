import { useRef, useEffect, useState, useMemo } from 'react'
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
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  )
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
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

function SaibaMaisCard({ onVerTodos, count }) {
  return (
    <article
      className="saiba-mais-card"
      onClick={onVerTodos}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onVerTodos()}
    >
      <div className="smc-icon"><IconGrid /></div>
      <h3>Ver Todos os Imóveis</h3>
      <p>{count} empreendimentos disponíveis no nosso portfólio completo</p>
      <div className="smc-cta">
        <span>Explorar portfólio</span>
        <IconArrowRight />
      </div>
    </article>
  )
}

/* ── Barra de filtros ── */
function SearchBar({ filters, onChange, onClear, totalFiltered, total }) {
  const hasActive =
    filters.tipo !== 'todos' ||
    filters.tipoImovel !== 'todos' ||
    filters.cidade !== 'todas' ||
    filters.precoMin !== '' ||
    filters.precoMax !== ''

  const pill = (field, value, label) => (
    <button
      key={value}
      className={`filter-pill${filters[field] === value ? ' active' : ''}`}
      onClick={() => onChange(field, filters[field] === value ? (field === 'tipo' ? 'todos' : field === 'tipoImovel' ? 'todos' : 'todas') : value)}
    >
      {label}
    </button>
  )

  return (
    <div className="search-bar reveal">
      <div className="search-row">

        {/* Negócio */}
        <div className="filter-group">
          <span className="filter-label">Negócio</span>
          <div className="filter-pills">
            {pill('tipo', 'todos', 'Todos')}
            {pill('tipo', 'comprar', 'Comprar')}
            {pill('tipo', 'alugar', 'Alugar')}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Tipo */}
        <div className="filter-group">
          <span className="filter-label">Tipo</span>
          <div className="filter-pills">
            {pill('tipoImovel', 'todos', 'Todos')}
            {pill('tipoImovel', 'casa', 'Casa')}
            {pill('tipoImovel', 'apartamento', 'Apartamento')}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Cidade */}
        <div className="filter-group">
          <span className="filter-label">Cidade</span>
          <div className="filter-pills">
            {pill('cidade', 'todas', 'Todas')}
            {pill('cidade', 'Fortaleza', 'Fortaleza')}
            {pill('cidade', 'Caucaia', 'Caucaia')}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Valor */}
        <div className="filter-group filter-group--price">
          <span className="filter-label">Valor</span>
          <div className="filter-price-inputs">
            <div className="price-input-wrap">
              <span>R$</span>
              <input
                type="number"
                placeholder="Mín"
                value={filters.precoMin}
                min={0}
                onChange={e => onChange('precoMin', e.target.value)}
              />
            </div>
            <span className="price-sep">–</span>
            <div className="price-input-wrap">
              <span>R$</span>
              <input
                type="number"
                placeholder="Máx"
                value={filters.precoMax}
                min={0}
                onChange={e => onChange('precoMax', e.target.value)}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Rodapé da barra */}
      <div className="search-footer">
        <span className="search-result-count">
          <IconSearch />
          {totalFiltered === total
            ? `${total} imóveis disponíveis`
            : `${totalFiltered} imóvel${totalFiltered !== 1 ? 's' : ''} encontrado${totalFiltered !== 1 ? 's' : ''} de ${total}`}
        </span>
        {hasActive && (
          <button className="btn-clear-filters" onClick={onClear}>
            <IconX />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}

const CARDS_PER_PAGE = 3

const INITIAL_FILTERS = {
  tipo: 'todos',
  tipoImovel: 'todos',
  cidade: 'todas',
  precoMin: '',
  precoMax: '',
}

export default function Empreendimentos({ onVerTodos, onSaibaMais }) {
  const ref = useRef(null)
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
    setPage(0)
  }

  const handleClear = () => {
    setFilters(INITIAL_FILTERS)
    setPage(0)
  }

  // Filtra os imóveis
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (filters.tipo !== 'todos' && p.tipo !== filters.tipo) return false
      if (filters.tipoImovel !== 'todos' && p.tipoImovel !== filters.tipoImovel) return false
      if (filters.cidade !== 'todas' && p.cidade !== filters.cidade) return false
      if (filters.precoMin !== '' && p.priceValue < Number(filters.precoMin)) return false
      if (filters.precoMax !== '' && p.priceValue > Number(filters.precoMax)) return false
      return true
    })
  }, [filters])

  const totalItems = filteredProperties.length + 1 // +1 para o card Ver Todos
  const totalPages = Math.max(1, Math.ceil(totalItems / CARDS_PER_PAGE))
  const safePage = Math.min(page, totalPages - 1)

  const prev = () => setPage(p => Math.max(0, p - 1))
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1))

  const startIndex = safePage * CARDS_PER_PAGE
  const pageItems = []
  for (let i = startIndex; i < startIndex + CARDS_PER_PAGE; i++) {
    if (i < filteredProperties.length) {
      pageItems.push({ type: 'property', data: filteredProperties[i] })
    } else if (i === filteredProperties.length) {
      pageItems.push({ type: 'saibaMais' })
    }
  }

  // Animação header (uma vez)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.section-header.reveal, .search-bar.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Re-observa cards quando página ou filtros mudam
  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.properties-grid .reveal')
    if (!cards) return
    cards.forEach(el => el.classList.remove('visible'))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    cards.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [safePage, filters])

  return (
    <section id="empreendimentos" className="empreendimentos" ref={ref}>
      <div className="section-header reveal">
        <span className="tag">Portfólio exclusivo</span>
        <h2>Nossos <em>Empreendimentos</em></h2>
        <p>Selecionamos os melhores imóveis para você. Qualidade, localização e valorização garantida.</p>
      </div>

      <SearchBar
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        totalFiltered={filteredProperties.length}
        total={properties.length}
      />

      {filteredProperties.length === 0 ? (
        <div className="no-results reveal">
          <IconSearch />
          <p>Nenhum imóvel encontrado para os filtros selecionados.</p>
          <button onClick={handleClear}>Limpar filtros</button>
        </div>
      ) : (
        <>
          <div className="carousel-wrapper">
            <button
              className="carousel-arrow carousel-arrow--left"
              onClick={prev}
              disabled={safePage === 0}
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
                    <SaibaMaisCard onVerTodos={onVerTodos} count={properties.length} />
                  </div>
                )
              )}
            </div>

            <button
              className="carousel-arrow carousel-arrow--right"
              onClick={next}
              disabled={safePage === totalPages - 1}
              aria-label="Próximo"
            >
              <IconChevronRight />
            </button>
          </div>

          <div className="carousel-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === safePage ? ' active' : ''}`}
                onClick={() => setPage(i)}
                aria-label={`Página ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
