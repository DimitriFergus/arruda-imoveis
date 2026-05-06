import { useState } from 'react'
import './Hero.css'

const INITIAL = { nome: '', telefone: '', email: '', interesse: '' }

function maskPhone(raw) {
  let v = raw.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/^(\d{2})(\d)/, '($1) $2')
  v = v.replace(/(\d{4,5})(\d{4})$/, '$1-$2')
  return v
}

export default function Hero() {
  const [form, setForm]           = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({
      ...prev,
      [name]: name === 'telefone' ? maskPhone(value) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: enviar para seu backend / CRM / webhook
    console.log('Lead capturado:', form)
    setSubmitted(true)
    setForm(INITIAL)
    setTimeout(() => setSubmitted(false), 4500)
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* TEXTO ESQUERDO */}
        <div className="hero-text fade-in">
          <div className="hero-badge">Imóveis de alto padrão</div>

          <h1>
            Encontre o imóvel<br />dos seus <em>sonhos</em>
          </h1>

          <p>
            Há mais de 15 anos conectando famílias ao lar perfeito.
            Conheça os melhores empreendimentos com condições exclusivas
            e atendimento totalmente personalizado.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <strong>+800</strong>
              <span>Famílias atendidas</span>
            </div>
            <div className="stat">
              <strong>15+</strong>
              <span>Anos no mercado</span>
            </div>
            <div className="stat">
              <strong>98%</strong>
              <span>Satisfação</span>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO DIREITO */}
        <div className="hero-form fade-in delay">
          <h2>Cadastre-se agora</h2>
          <p>Receba ofertas exclusivas e o contato de um especialista em até 2h</p>

          {submitted && (
            <div className="form-success" role="alert">
              ✅ Cadastro enviado! Em breve entraremos em contato.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">WhatsApp / Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interesse">Tipo de imóvel</label>
              <select
                id="interesse"
                name="interesse"
                value={form.interesse}
                onChange={handleChange}
              >
                <option value="">Selecione o tipo</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Casa em condomínio</option>
                <option>Cobertura</option>
                <option>Terreno / Lote</option>
                <option>Comercial</option>
              </select>
            </div>

            <button type="submit" className="btn-submit">
              Quero ser contactado agora →
            </button>

            <p className="form-privacy">
              🔒 Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
