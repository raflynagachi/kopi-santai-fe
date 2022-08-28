import { useEffect, useState } from 'react';
import FormWrapper from '../Form/FormWrapper';
import MenuOptionChecklist from './MenuOptionChecklist';

export default function OrderItemForm({ menuItem, handleSubmit }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantity <= 1) {
      setQuantity(1);
    }
  }, [quantity]);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          Menu Name
          <input value={menuItem.menu.id} type="text" className="form-control" id="menuID" hidden readOnly />
          <input defaultValue={menuItem.menu.name} type="text" style={{ backgroundColor: '#ccc' }} className="form-control" id="menuName" readOnly />
        </div>
        <br />
        <div className="form-group">
          Quantity
          <div className="d-flex flex-row align-items-center">
            <input value={quantity} type="number" className="form-control d-flex me-5" id="quantity" min={1} />
            <div className="d-flex justify-content-between">
              <button type="button" style={{ fontSize: '0.8em', backgroundColor: '#ff7878' }} className="d-flex btn me-2" onClick={() => { setQuantity(quantity - 1); }}>-</button>
              <button type="button" style={{ fontSize: '0.8em', backgroundColor: '#87f777' }} className="d-flex btn ms-2" onClick={() => { setQuantity(quantity + 1); }}>+</button>
            </div>
          </div>
        </div>
        <br />
        {
            menuItem.menuOptions && (
              <div className="form-group">
                Menu Options
                <MenuOptionChecklist menuOptions={menuItem.menuOptions} />
              </div>
            )
          }
        <br />
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
}
