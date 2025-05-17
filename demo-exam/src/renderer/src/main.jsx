import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router'

import MainPage from './components/MainPage'
import UpdatePartner from './components/UpdatePartner.jsx'
import CreatePartner from './components/CreatePartner.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/update' element={<UpdatePartner/>}/>
        <Route path='/create' element={<CreatePartner/>}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)
