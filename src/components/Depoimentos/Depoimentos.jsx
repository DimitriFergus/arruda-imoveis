import { useRef, useEffect } from 'react'
import { testimonials } from '../../data/testimonials'
import './Depoimentos.css'

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <article className="testimonial-card">
      <span className="quote-mark">"</span>
      <Stars count={t.stars} />
      <p className="testimonial-text">"{t.text}"</p>
      <div className="testimonial-author">
        <img
          src={t.avatar}
          alt={t.name}
          className="author-avatar"
          loading="lazy"
        />
        <div>
          <div className="author-name">{t.name}</div>
          <div className="author-detail">{t.detail}</div>
        </div>
      </div>
    </article>
  )
}

export default function Depoimentos() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="depoimentos" className="depoimentos" ref={ref}>
      <div className="section-header reveal">
        <span className="tag">Quem já comprou aprovou</span>
        <h2>O que nossos clientes <em>dizem</em></h2>
        <p>
          Mais de 800 famílias realizadas. Veja os relatos de quem já
          viveu a experiência Arruda Imóveis.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className="reveal"
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </section>
  )
}
