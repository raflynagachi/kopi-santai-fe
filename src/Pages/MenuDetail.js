import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import format from '../Utils/Format';
import { API, helpers } from '../Utils/API';
import Toast from '../Components/Toast';
import Loading from '../Components/Loading';
import Modal from '../Components/Modal';
import OrderItemForm from '../Components/OrderItem/OrderItemForm';

export default function MenuDetail() {
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const token = localStorage.getItem('token');
  const params = useParams();

  const showOrderItem = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const url = `${API.Menus}/${params.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setMenuItem(result.data);
          setLoading(result.loading);
          setError(result.error);
        } else {
          setError(result);
          setShowToast(true);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmitOrderItem = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    let description = '';
    const excludeID = ['menuID', 'menuName', null, 'quantity'];
    const hasBeenChecked = [];
    for (let i = 0; i < e.target.length; i += 1) {
      const id = e.target.elements[i].getAttribute('id');
      if (!excludeID.includes(id)) {
        if (!hasBeenChecked.includes(id)) {
          description += `${id}:${e.target.elements[i].value},`;
          hasBeenChecked.push(id);
        }
      }
    }

    const requestBody = {
      menuID: parseInt(dataForm.menuID.value, 10),
      quantity: parseInt(dataForm.quantity.value, 10),
      description,
    };

    const url = `${API.OrderItems}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastSuccess(true);
          setShowModal(false);
        } else {
          setError(result);
          setShowToast(true);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div>
      {loading && <Loading />}
      {!error && !loading && menuItem
        && (
          <div>
            {showModal && <Modal show={showModal} setShow={setShowModal} title="Order Item"><OrderItemForm menuItem={menuItem} handleSubmit={handleSubmitOrderItem} /></Modal>}
            <div className="card mx-auto mb-4" style={{ width: '24rem' }}>
              {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
              <Toast show={showToastSuccess} setShow={setShowToastSuccess} message="add order item success" />
              <img className="card-img-top" style={{ height: '18rem' }} src={format.displayByteImage(menuItem.menu.image)} alt="Card menu" />
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h5 style={{ fontSize: '0.9em' }} className="card-title">{menuItem.menu.name}</h5>
                    <p style={{ fontSize: '0.75em' }} className="col-6">
                      Category:
                      {menuItem.menu.categoryName}
                    </p>
                  </div>
                  <div className="col-4 d-flex h-75 justify-content-end">
                    <button type="button" style={{ fontSize: '0.8em', backgroundColor: '#ffd294' }} onClick={showOrderItem} className="w-100 rounded">Order</button>
                  </div>
                </div>
                <div className="card-text row">
                  <div className="col-3">
                    <span className="fa fa-star checked" />
                    {' '}
                    {menuItem.menu.rating}
                  </div>
                  <div className="col-9 text-end">
                    Rp
                    {` ${menuItem.menu.price}`}
                  </div>
                </div>
                <div className="card-text row">
                  <div className="col text-center">
                    <h5>Menu Options</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Menu Option</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        menuItem.menuOptions
                          ? menuItem.menuOptions.map((menuOpt) => (
                            <tr>
                              <td>{menuOpt.typeMenuOption}</td>
                              <td>{menuOpt.name}</td>
                            </tr>
                          ))
                          : <tr><td colSpan={2}>No menu option</td></tr>
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
