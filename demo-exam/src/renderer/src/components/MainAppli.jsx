import { useEffect, useState } from "react"
//import { Link } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import logo from './assets/logo.png'

function MainAppli() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await window.api.getPartners()
      setPartners(res)
    })()
  }, [])





  useEffect(() => {
    (async () => {
      try {
        const res = await window.api.getPartners();
        setPartners(res || []); // Если res undefined, используем пустой массив
      } catch (error) {
        console.error("Ошибка при загрузке партнеров:", error);
        setPartners([]); // При ошибке устанавливаем пустой массив
      }
    })();
  }, []);




const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  (async () => {
    try {
      setIsLoading(true);
      const res = await window.api.getPartners();
      setPartners(res || []);
    } catch (error) {
      console.error(error);
      setPartners([]);
    } finally {
      setIsLoading(false);
    }
  })();
}, []);

if (isLoading) return <div>Загрузка...</div>;

  return (
    // <>
    //   <div className="page-heading">
    //     {/* <img className="page-logo" src={logo} alt="" /> */}
    //     <h1>Партнеры</h1>
    //   </div>
    //   <ul className="partners-list">
    //     {partners.map((partner) => {
    //       return <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>
    //         <div className="partner-data">
    //           <p className="card_heading">{partner.organization_type} | {partner.name}</p>
    //           <div className="partner-data-info">
    //             <p>{partner.ceo}</p>
    //             <p>{partner.phone}</p>
    //             <p>Рейтинг: {partner.rating}</p>
    //           </div>
    //         </div>
    //         <div className="partner-sale partner-data card_heading">
    //           {partner.discount}%
    //         </div>
    //       </li>
    //     })}
    //   </ul>

    //   <Link to={'/create'}>
    //     <button>
    //       Создать партнера
    //     </button>
    //   </Link>
    // </>

    <>
      <div className="page-heading">
        <h1>Партнеры</h1>
      </div>
      <ul className="partners-list">
        {partners && partners.map((partner) => {
          return (
            <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>

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
          )
        })}
      </ul>

      <Link to={'/create'}>
        <button>
          Создать партнера
        </button>
      </Link>
    </>
  )
}

export default MainAppli


