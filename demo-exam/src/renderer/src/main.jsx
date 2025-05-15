//import './assets/main.css'
import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router'
import App from './components/App'
import MainAppli from './components/MainAppli'
import TimeDisplay from './components/TimeDisplay'

// import UpdatePartner from './UpdatePartner.jsx'
// import CreatePartner from './CreatePartner.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<TimeDisplay />}/>
        {/* <Route path='/' element={<MainAppli />}/> */}
         {/*<Route path='/update' element={<UpdatePartner/>}/>
        <Route path='/create' element={<CreatePartner/>}/> */}
      </Routes>
    </StrictMode>
  </HashRouter>
)
