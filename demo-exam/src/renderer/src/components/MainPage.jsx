import { useEffect, useState } from "react"
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from '../assets/image_app.png'

function MainPage() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    document.title = 'Demo-Exam App';
    fetchData();
  }, [])

  async function fetchData() {
    const partners_data = await window.api.getPartners();
    setPartners(partners_data);
    const sales_data = await window.api.getSales();
    setSales(sales_data);
  }

  async function handleDeletePartner(id, e) {
    e.stopPropagation(); // Предотвращаем срабатывание onClick карточки
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этого партнера?");
    if (confirmDelete) {
      await window.api.deletePartner(id);
      fetchData(); // Обновляем список после удаления
    }
  }

  return (
    <>
      <div className="page-heading">
        <img className="page_logotip" src={logo} alt="" />
        <h1> - ПАРТНЁРЫ - </h1>
      </div>



      {/* <ul className="partners-list">
        {partners.map((partner) => {
          return <li className="partner_card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>
            <div className="partner_data">
              <p className="card_heading">{partner.organization_type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.ceo}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            <div className="partner-sale partner_data card_heading">
              {sales.find(sale => sale.partner_id === partner.id)?.discount_percentage || 0}%
            </div>
          </li>
        })}
      </ul> */}



      <div className="partners_container">
        <ul className="partners_list">
          {partners.map((partner) => {
            return (
              <li className="partner_item" key={partner.id}>
                <div className="partner_card" onClick={() => { navigate('/update', { state: { partner } }) }}>
                  <div className="partner_data">
                    <p className="card_heading">{partner.organization_type} | {partner.name}</p>
                    <div className="partner-data-info">
                      <p>{partner.ceo}</p>
                      <p>{partner.phone}</p>
                      <p>Рейтинг: {partner.rating}</p>
                    </div>
                  </div>

                  <div className="partner-sale partner_data card_heading">
                    {sales.find(sale => sale.partner_id === partner.id)?.discount_percentage || 0}%
                  </div>
                </div>

                <button className="delete_button" onClick={(e) => handleDeletePartner(partner.id, e)}>
                  Удалить
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <Link to={'/create'}>
        <button className="button"  style={{ width: "750px" }}>
          Создать нового партнера
        </button>
      </Link>


    </>
  )
}

export default MainPage
