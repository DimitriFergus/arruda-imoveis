import { useState, useEffect } from 'react'
import './EmpreendimentoModal.css'

/* ── SVG Icons ── */
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

function IconGarden() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V11"/>
      <path d="M12 11C12 11 7 7.5 7 4.5a5 5 0 0110 0C17 7.5 12 11 12 11z"/>
      <path d="M12 15c0 0-2.5-1.5-2.5-3.5"/>
      <path d="M12 15c0 0 2.5-1.5 2.5-3.5"/>
      <path d="M3 22h18"/>
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

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
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

function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  )
}

/* ── FAQ Item ── */
function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`modal-faq-item${open ? ' open' : ''}`}>
      <button onClick={() => setOpen(v => !v)}>
        <span>{item.q}</span>
        <IconChevronDown />
      </button>
      <div className="modal-faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  )
}

/* ── Modal Principal ── */
export default function EmpreendimentoModal({ property, onClose }) {
  const images = property.images?.length ? property.images : [property.image]
  const [currentImg, setCurrentImg] = useState(0)
  const [imgKey, setImgKey] = useState(0)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const goTo = (idx) => {
    setCurrentImg(idx)
    setImgKey(k => k + 1)
  }
  const prev = () => goTo((currentImg - 1 + images.length) % images.length)
  const next = () => goTo((currentImg + 1) % images.length)

  const handleInteresse = () => {
    onClose()
    setTimeout(() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }), 320)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* ── Galeria ── */}
        <div className="modal-gallery">
          <img
            key={imgKey}
            src={images[currentImg]}
            alt={`${property.name} — foto ${currentImg + 1}`}
            loading="lazy"
          />

          {images.length > 1 && (
            <>
              <button className="gallery-btn prev" onClick={prev} aria-label="Foto anterior">
                <IconChevronLeft />
              </button>
              <button className="gallery-btn next" onClick={next} aria-label="Próxima foto">
                <IconChevronRight />
              </button>
              <div className="gallery-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`dot${i === currentImg ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <span className="modal-badge" style={{ background: property.badgeColor }}>
            {property.badge}
          </span>

          <div className="gallery-counter">
            {currentImg + 1} / {images.length}
          </div>
        </div>

        {/* ── Conteúdo ── */}
        <div className="modal-content">
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <IconClose />
          </button>

          {/* Cabeçalho */}
          <div className="modal-header">
            <h2>{property.name}</h2>
            <p className="modal-location">
              <IconLocation /> {property.location}
            </p>
          </div>

          {/* Specs */}
          <div className="modal-specs">
            <div className="spec-item">
              <IconBed />
              <div>
                <strong>{property.bedrooms}</strong>
                <span>Quartos</span>
              </div>
            </div>

            {property.bathrooms != null && (
              <div className="spec-item">
                <IconBath />
                <div>
                  <strong>{property.bathrooms}</strong>
                  <span>Banheiros</span>
                </div>
              </div>
            )}

            {property.livingRooms != null && (
              <div className="spec-item">
                <IconSofa />
                <div>
                  <strong>{property.livingRooms}</strong>
                  <span>Sala</span>
                </div>
              </div>
            )}

            {property.hasGarden && (
              <div className="spec-item">
                <IconGarden />
                <div>
                  <strong>Sim</strong>
                  <span>Jardim</span>
                </div>
              </div>
            )}

            <div className="spec-item">
              <IconArea />
              <div>
                <strong>{property.area} m²</strong>
                <span>Área Total</span>
              </div>
            </div>

            <div className="spec-item">
              <IconCar />
              <div>
                <strong>{property.parking}</strong>
                <span>Vagas</span>
              </div>
            </div>
          </div>

          {/* Preço */}
          <div className="modal-price-row">
            <div>
              <small>Valor a partir de</small>
              <strong>{property.price}</strong>
            </div>
            <span className="price-badge">Financiamento disponível</span>
          </div>

          {/* FAQ */}
          {property.faqItems?.length > 0 && (
            <div className="modal-faq">
              <h3>Perguntas Frequentes</h3>
              {property.faqItems.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          )}

          {/* CTA */}
          <button className="btn-interesse" onClick={handleInteresse}>
            Tenho Interesse — Quero ser Contactado
          </button>
        </div>
      </div>
    </div>
  )
}
