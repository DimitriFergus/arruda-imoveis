import './App.css'
import Navbar         from './components/Navbar/Navbar'
import Hero           from './components/Hero/Hero'
import Empreendimentos from './components/Empreendimentos/Empreendimentos'
import Depoimentos    from './components/Depoimentos/Depoimentos'
import VSL            from './components/VSL/VSL'
import FAQ            from './components/FAQ/FAQ'
import Footer         from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Empreendimentos />
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
