import { useState, useRef, useEffect } from 'react'
import { faqs } from '../../data/faq'
import './FAQ.css'

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.question}</span>
        <span className="faq-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5"  y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">{item.answer}</div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const ref = useRef(null)

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id))

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" className="faq" ref={ref}>
      <div className="section-header reveal">
        <span className="tag">Tire suas dúvidas</span>
        <h2>Perguntas <em>Frequentes</em></h2>
        <p>
          Respondemos as principais dúvidas de quem está pensando em
          comprar um imóvel.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <div
            key={item.id}
            className="reveal"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <FAQItem
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
