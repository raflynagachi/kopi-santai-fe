import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import format from '../../Utils/Format';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';

export default function OrderItemCard({ orderItem }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastDelete, setShowToastDelete] = useState(false);
  const token = localStorage.getItem('token');

  const deleteOrder = (e) => {
    e.preventDefault();

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.OrderItems}/${orderItem.id}`;
    const requestOpt = helpers.requestOptions(null, 'DELETE', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastDelete(true);
          window.location.reload();
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
    <div className="d-flex flex-row justify-content-center align-items-center border my-2 rounded p-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastDelete} setShow={setShowToastDelete} message="Order item deleted successfully" />
      <img className="p-2 m-3 rounded border" style={{ width: '12rem', height: '12rem' }} src={format.displayByteImage(orderItem.menu.image)} alt="menu" />
      <div className="d-flex flex-column pt-4">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{orderItem.menu.name}</h5>
        <p style={{ fontSize: '0.75em' }} className="col-6">
          Category:
          {orderItem.menu.categoryName}
        </p>
        <div className="row w-100" style={{ fontSize: '0.8em' }}>
          <div className="col">
            <span className="fa fa-star checked" />
            {' '}
            {orderItem.menu.rating}
          </div>
          <div className="col text-start">
            <table className="table">
              <tbody>
                <tr>
                  <th>Price of menu</th>
                  <td>{`Rp.${orderItem.menu.price}`}</td>
                </tr>
                <tr>
                  <th>Quantity</th>
                  <td>{`${orderItem.quantity}`}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{`${orderItem.description}`}</td>
                </tr>
                <tr>
                  <th>Total price</th>
                  <td>{`Rp.${orderItem.menu.price * orderItem.quantity}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex h-100">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="btn btn-close" onClick={deleteOrder} />
      </div>
    </div>
  );
}
