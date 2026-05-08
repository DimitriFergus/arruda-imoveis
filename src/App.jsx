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

function App() {
  const [showTodos, setShowTodos] = useState(false)

  if (showTodos) {
    return <TodosImoveis onVoltar={() => { setShowTodos(false); window.scrollTo({ top: 0 }) }} />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Empreendimentos onVerTodos={() => setShowTodos(true)} />
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
