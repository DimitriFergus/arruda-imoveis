import { useState } from 'react'
import './App.css'
import Navbar          from './components/Navbar/Navbar'
import Hero            from './components/Hero/Hero'
import Empreendimentos from './components/Empreendimentos/Empreendimentos'
import Depoimentos     from './components/Depoimentos/Depoimentos'
import VSL             from './components/VSL/VSL'
import FAQ             from './components/FAQ/FAQ'
import Footer          from './components/Footer/Footer'
import TodosImoveis    from './components/TodosImoveis/TodosImoveis'
import ImovelPage      from './components/ImovelPage/ImovelPage'

function App() {
  const [showTodos, setShowTodos]       = useState(false)
  const [activeImovel, setActiveImovel] = useState(null)

  // Navega para a página de um imóvel específico
  const abrirImovel = (property) => {
    setActiveImovel(property)
    setShowTodos(false)
  }

  // Volta da página do imóvel: se veio de "Todos os Imóveis", retorna lá
  const voltarDeImovel = () => {
    setActiveImovel(null)
    window.scrollTo({ top: 0 })
  }

  // Página individual do imóvel
  if (activeImovel) {
    return (
      <ImovelPage
        property={activeImovel}
        onVoltar={voltarDeImovel}
        onNavigate={abrirImovel}
      />
    )
  }

  // Página "Todos os Imóveis"
  if (showTodos) {
    return (
      <TodosImoveis
        onVoltar={() => { setShowTodos(false); window.scrollTo({ top: 0 }) }}
        onSaibaMais={abrirImovel}
      />
    )
  }

  // Página principal
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Empreendimentos
          onVerTodos={() => setShowTodos(true)}
          onSaibaMais={abrirImovel}
        />
        <div className="section-divider" />
        <Depoimentos />
        <div className="section-divider" />
        <VSL />
        <div className="section-divider" />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App
