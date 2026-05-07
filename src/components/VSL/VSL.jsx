import { useState, useRef, useEffect } from 'react'
import './VSL.css'

// Substitua pelo ID real do seu vídeo do YouTube
const YOUTUBE_ID = 'SEU_ID_YOUTUBE_AQUI'

const bullets = [
  'Tour virtual pelos empreendimentos',
  'Condições e formas de pagamento',
  'Diferenciais exclusivos de cada projeto',
]

export default function VSL() {
  const [playing, setPlaying] = useState(false)
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
    <section id="vsl" className="vsl" ref={ref}>
      <div className="vsl-wrapper">
        <div className="section-header reveal">
          <span className="tag">Vídeo exclusivo</span>
          <h2>Conheça nossos empreendimentos <em>em detalhes</em></h2>
          <p>
            Assista ao vídeo e descubra por que a Arruda Imóveis é a escolha
            certa para realizar o seu sonho.
          </p>
        </div>

        {/* PLAYER */}
        <div className="vsl-player reveal">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Arruda Imóveis – Conheça nossos empreendimentos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="vsl-thumbnail" onClick={() => setPlaying(true)}>
              <div className="vsl-thumb-overlay" />
              <button className="play-btn" aria-label="Assistir vídeo">
                <svg viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
              <p className="play-label">Clique para assistir ao vídeo</p>
            </div>
          )}
        </div>

        {/* BULLETS */}
        <ul className="vsl-bullets reveal">
          {bullets.map((b, i) => (
            <li key={i} className="vsl-bullet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
