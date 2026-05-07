import './Footer.css'

const navLinks = [
  { href: '#hero',             label: 'Início'           },
  { href: '#empreendimentos',  label: 'Empreendimentos'  },
  { href: '#depoimentos',      label: 'Depoimentos'      },
  { href: '#vsl',              label: 'Vídeo'            },
  { href: '#faq',              label: 'FAQ'              },
]

const properties = [
  { href: '#empreendimentos', label: 'Residencial Vista Verde' },
  { href: '#empreendimentos', label: 'Alto da Colina'          },
  { href: '#empreendimentos', label: 'Jardim Sereno'           },
  { href: '#empreendimentos', label: 'Ver todos'               },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* MARCA */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="Arruda Imóveis" className="footer-logo-img" />
            <span>Arruda <em>Imóveis</em></span>
          </div>
          <p>
            Conectamos famílias ao lar dos seus sonhos com transparência,
            segurança e o melhor atendimento do mercado há mais de 15 anos.
          </p>
          <div className="footer-contact">
            <a href="tel:+5500000000000">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              (00) 00000-0000
            </a>
            <a href="mailto:contato@arrudaimoveis.com.br">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              contato@arrudaimoveis.com.br
            </a>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul>
            {navLinks.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* EMPREENDIMENTOS */}
        <div className="footer-col">
          <h4>Empreendimentos</h4>
          <ul>
            {properties.map((p, i) => (
              <li key={i}><a href={p.href}>{p.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Arruda Imóveis. Todos os direitos reservados.</p>
        <p className="footer-creci">CRECI-SP 000000-J</p>
      </div>
    </footer>
  )
}
