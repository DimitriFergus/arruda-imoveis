import { useState, useEffect, useRef } from 'react'
import { properties } from '../../data/properties'
import './ImovelPage.css'

function IconBed() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20v-6M21 20v-6M3 14h18M5 14V9a1 1 0 011-1h12a1 1 0 011 1v5"/>
      <path d="M7 13V10a1 1 0 011-1h2a1 1 0 011 1v3"/>
      <path d="M13 13V10a1 1 0 011-1h2a1 1 0 011 1v3"/>
    </svg>
  )
}
function IconBath() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3z"/>
      <path d="M6 12V7a2 2 0 012-2 2 2 0 012 2"/>
      <path d="M4 19l-1 2M20 19l1 2"/>
    </svg>
  )
}
function IconSofa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2"/>
      <path d="M2 11a2 2 0 012 2v2h16v-2a2 2 0 012-2 2 2 0 00-2-2H4a2 2 0 00-2 2z"/>
      <path d="M6 17v2M18 17v2"/>
    </svg>
  )
}
function IconArea() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  )
}
function IconCar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/>
      <circle cx="6.5" cy="16.5" r="2.5"/>
      <circle cx="16.5" cy="16.5" r="2.5"/>
    </svg>
  )
}
function IconGarden() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V11"/>
      <path d="M12 11C12 11 7 7.5 7 4.5a5 5 0 0110 0C17 7.5 12 11 12 11z"/>
      <path d="M3 22h18"/>
    </svg>
  )
}
function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
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
function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ip-faq-item${open ? ' open' : ''}`}>
      <button onClick={() => setOpen(v => !v)}>
        <span>{item.q}</span>
        <IconChevronDown />
      </button>
      <div className="ip-faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  )
}

function RelatedCard({ property, onNavigate }) {
  return (
    <article
      className="ip-related-card"
      onClick={() => onNavigate(property)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate(property)}
    >
      <div className="ip-related-img">
        <img src={property.image} alt={property.name} loading="lazy" />
        <span className="ip-related-badge" style={{ background: property.badgeColor }}>
          {property.badge}
        </span>
      </div>
      <div className="ip-related-body">
        <h4>{property.name}</h4>
        <p><IconLocation />{property.location}</p>
        <strong>{property.price}</strong>
      </div>
    </article>
  )
}

export default function ImovelPage({ property, onVoltar, onNavigate }) {
  const images = property.images?.length ? property.images : [property.image]
  const [currentImg, setCurrentImg] = useState(0)
  const ref = useRef(null)

  const related = properties.filter(p => p.id !== property.id).slice(0, 3)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = `${property.name} — Arruda Imóveis`
    return () => { document.title = 'Arruda Imóveis' }
  }, [property.id])

  useEffect(() => {
    setCurrentImg(0)
  }, [property.id])

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.ip-reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [property.id])

  const prev = () => setCurrentImg(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrentImg(i => (i + 1) % images.length)

  const handleInteresse = () => {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse no imóvel *${property.name}* (${property.location}) — ${property.price}. Poderia me dar mais informações?`
    )
    window.open(`https://wa.me/5522999999999?text=${msg}`, '_blank')
  }

  return (
    <div className="ip-page" ref={ref}>

      <header className="ip-header">
        <button className="ip-voltar" onClick={onVoltar}>
          <IconArrowLeft />
          Voltar
        </button>
        <span className="ip-logo">Arruda <em>Imóveis</em></span>
        <div className="ip-header-spacer" />
      </header>

      {/* Galeria principal */}
      <div className="ip-gallery ip-reveal">
        <div className="ip-gallery-main">
          <img
            key={currentImg}
            src={images[currentImg]}
            alt={`${property.name} — foto ${currentImg + 1}`}
          />
          {images.length > 1 && (
            <>
              <button className="ip-gallery-btn ip-prev" onClick={prev} aria-label="Anterior">
                <IconChevronLeft />
              </button>
              <button className="ip-gallery-btn ip-next" onClick={next} aria-label="Próxima">
                <IconChevronRight />
              </button>
            </>
          )}
          <span className="ip-badge" style={{ background: property.badgeColor }}>
            {property.badge}
          </span>
          <span className="ip-counter">{currentImg + 1} / {images.length}</span>
        </div>

        {images.length > 1 && (
          <div className="ip-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`ip-thumb${i === currentImg ? ' active' : ''}`}
                onClick={() => setCurrentImg(i)}
                aria-label={`Foto ${i + 1}`}
              >
                <img src={img} alt={`Miniatura ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Corpo: info + aside */}
      <div className="ip-body">

        <div className="ip-info ip-reveal">
          <h1>{property.name}</h1>
          <p className="ip-location">
            <IconLocation />
            {property.location}
          </p>

          <div className="ip-specs">
            <div className="ip-spec">
              <IconBed />
              <strong>{property.bedrooms}</strong>
              <span>Quartos</span>
            </div>
            {property.bathrooms != null && (
              <div className="ip-spec">
                <IconBath />
                <strong>{property.bathrooms}</strong>
                <span>Banheiros</span>
              </div>
            )}
            {property.livingRooms != null && (
              <div className="ip-spec">
                <IconSofa />
                <strong>{property.livingRooms}</strong>
                <span>Sala</span>
              </div>
            )}
            {property.hasGarden && (
              <div className="ip-spec">
                <IconGarden />
                <strong>Sim</strong>
                <span>Jardim</span>
              </div>
            )}
            <div className="ip-spec">
              <IconArea />
              <strong>{property.area} m²</strong>
              <span>Área Total</span>
            </div>
            <div className="ip-spec">
              <IconCar />
              <strong>{property.parking}</strong>
              <span>Vagas</span>
            </div>
          </div>

          {property.faqItems?.length > 0 && (
            <div className="ip-faq ip-reveal">
              <h2>Perguntas Frequentes</h2>
              {property.faqItems.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          )}
        </div>

        <aside className="ip-aside ip-reveal">
          <div className="ip-price-card">
            <small>Valor a partir de</small>
            <strong className="ip-price">{property.price}</strong>
            <span className="ip-financ">Financiamento disponível</span>

            <div className="ip-aside-specs">
              <span><IconBed />{property.bedrooms} quartos</span>
              <span><IconArea />{property.area} m²</span>
              <span><IconCar />{property.parking} vagas</span>
            </div>

            <button className="ip-btn-interesse" onClick={handleInteresse}>
              <IconWhatsApp />
              Tenho Interesse — WhatsApp
            </button>

            <p className="ip-aside-note">
              Nossa equipe responde em até 1 hora útil
            </p>
          </div>
        </aside>
      </div>

      {/* Relacionados */}
      <section className="ip-related ip-reveal">
        <h2>Outros Empreendimentos</h2>
        <div className="ip-related-grid">
          {related.map(p => (
            <RelatedCard key={p.id} property={p} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

    </div>
  )
}
