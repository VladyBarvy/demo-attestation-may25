import Versions from './Versions'
//import electronLogo from './assets/electron.svg'
//import logo from './assets/image_app.png'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { Link } from "react-router";

function App() {
  
  // const navigate = useNavigate();
  // const [partners, setPartners] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const res = await window.api.getPartners()
  //     setPartners(res)
  //   })()
  // }, [])

  return (
    <>
    <h1>Партнеры</h1>
        
      {/* <div className="page-heading">
        <img className="page-logo" src={logo} alt="" />
        <h1>Партнеры</h1>
      </div>
      <ul className="partners-list">
        {partners.map((partner) => {
          return <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>
            <div className="partner-data">
              <p className="card_heading">{partner.organization_type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.ceo}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            <div className="partner-sale partner-data card_heading">
              {partner.discount}%
            </div>
          </li>
        })}
      </ul>

      <Link to={'/create'}>
        <button>
          Создать партнера
        </button>
      </Link> */}
    


    
      {/* <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions> */}
    </>
  )
}

export default App
