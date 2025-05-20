import { useState } from "react"
import { useLocation } from 'react-router-dom';
import { Link } from "react-router";

function UpdatePartner() {
  const location = useLocation();
  const [partner, setPartner] = useState(location.state.partner);

  async function submitHandler(e) {
    e.preventDefault()
    const update_partner = {
      id: partner.id,
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.ceo.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    await window.api.updatePartner(update_partner);
    setPartner(updPartner)
    document.querySelector('form_update_create').reset()
  }
  
  return <div className="form_update_create">
    <h1 className="heading">- Обновить партнера -</h1>
    <form onSubmit={(e) => submitHandler(e)}>

    <div className="parametr">
        <div>
          <label htmlFor="type">Тип организации:</label>
        </div>
        <div>
          <select className="input_style" name="" id="type" required defaultValue={partner.type} >
            <option value="ЗАО">ЗАО</option>
            <option value="ООО">ООО</option>
            <option value="ОАО">ОАО</option>
            <option value="ПАО">ПАО</option>
          </select>
        </div>
      </div>

      <div className="parametr">
        <div>
          <label htmlFor="name">Наименование:</label>
        </div>
        <div>
          <input className="input_style" id="name" type="text" required defaultValue={partner.name} />
        </div>
      </div>

      <div className="parametr">
        <div>
          <label htmlFor="ceo">ФИО директора:</label>
        </div>
        <div>
          <input className="input_style" id="ceo" type="text" required defaultValue={partner.ceo} />
        </div>
      </div>

      <div className="parametr">
        <div>
          <label htmlFor="email">Электронная почта:</label>
        </div>
        <div>
          <input className="input_style" id="email" type="email" required defaultValue={partner.email} />
        </div>
      </div>

      <div className="parametr">
        <div>
          <label htmlFor="phone">Телефон:</label>
        </div>
        <div>
          <input className="input_style" id="phone" type="tel" required defaultValue={partner.phone} />
        </div>
      </div>

      <div className="parametr">
        <div>
          <label htmlFor="address">Адрес:</label>
        </div>
        <div>
          <input className="input_style" id="address" type="text" required defaultValue={partner.address} />
        </div>
      </div>

      <div className="parametr">
        <div>
          <label htmlFor="rating">Рейтинг:</label>
        </div>
        <div>
          <input className="input_style" id="rating" type="number" step="1" min='0' max='100' required defaultValue={partner.rating} />
        </div>
      </div>

      <button className="button" type="submit">Обновить партнера</button>

      <Link to={'/'}>
        <button className="button" style={{ width: "530px" }}>↩ На главную</button>
      </Link>
    </form>
  </div>
}

export default UpdatePartner;
