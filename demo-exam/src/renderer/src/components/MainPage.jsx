import { useEffect, useState } from "react"
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from '../assets/master_floor.png'

function MainPage() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    document.title = 'Master Floor & Co';
    fetchData();
  }, [])

  async function fetchData() {
    const partners_data = await window.api.getPartners();
    setPartners(partners_data);
    const sales_data = await window.api.getSales();
    setSales(sales_data);
  }



  async function handleDeletePartner(id, e) {
    e?.stopPropagation();
    
    // Проверка ID перед удалением
    const numericId = Number(id);
    if (!numericId || isNaN(numericId)) {
      alert('Ошибка: неверный ID партнёра');
      return;
    }
  
    const confirmDelete = window.confirm(`Удалить данного партнёра?`);
    
    if (confirmDelete) {
      try {
        const response = await window.api.deletePartner(numericId);
        
        if (!response) {
          throw new Error('Не получен ответ от сервера');
        }
  
        switch (response.status) {
          case 'success':
            alert(response.message);
            setPartners(prev => prev.filter(p => p.id !== numericId));
            break;
          case 'not_found':
            alert(response.message);
            break;
          case 'error':
            alert(`Ошибка: ${response.message}`);
            break;
          default:
            alert('Неизвестный статус ответа');
        }
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert(error.message || 'Неизвестная ошибка при удалении');
      }
    }
  }

  return (
    <>
      <div className="page-heading">
        <img className="page_logotip" src={logo} alt="" />
        <h1> - ПАРТНЁРЫ - </h1>
      </div>

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
        <button className="button" style={{ width: "750px" }}>
          Создать нового партнера
        </button>
      </Link>


    </>
  )
}

export default MainPage
