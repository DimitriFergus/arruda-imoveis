import { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { href: '#empreendimentos', label: 'Empreendimentos' },
  { href: '#depoimentos',     label: 'Depoimentos'     },
  { href: '#vsl',             label: 'Conheça mais'    },
  { href: '#faq',             label: 'FAQ'             },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={close}>
        <img src="/logo.png" alt="Arruda Imóveis" className="nav-logo-img" />
        <span className="nav-logo-text">Arruda <em>Imóveis</em></span>
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={close}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#hero" className="nav-cta" onClick={close}>
            Quero ser contactado
          </a>
        </li>
      </ul>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Abrir menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
