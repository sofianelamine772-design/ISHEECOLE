import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import WhatsAppButton from './components/WhatsAppButton.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import Programmes from './pages/Programmes.jsx'
import Institut from './pages/Institut.jsx'
import Toulouse from './pages/Toulouse.jsx'
import Contact from './pages/Contact.jsx'
import Inscription from './pages/Inscription.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import Boutique from './pages/Boutique.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/institut" element={<Institut />} />
        <Route path="/toulouse" element={<Toulouse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
      </Routes>
      {/* Global — visible on every page */}
      <WhatsAppButton />
    </BrowserRouter>
  </StrictMode>,
)
