import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import format from '../../Utils/Format';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Modal from '../Modal';
import OrderItemForm from './OrderItemForm';
import ReviewForm from '../Review/ReviewForm';

export default function OrderItemCard({ showButton, showCreateReview, orderItem }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModalReview, setShowModalReview] = useState(false);
  const [showToastReview, setShowToastReview] = useState(false);
  const [showToastUpdate, setShowToastUpdate] = useState(false);
  const [showToastDelete, setShowToastDelete] = useState(false);
  const token = localStorage.getItem('token');

  const showOrderItem = () => {
    setShowModal(true);
  };

  const showReviewForm = () => {
    setShowModalReview(true);
  };

  const createReview = (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const requestBody = {
      menuID: parseInt(dataForm.menuID.value, 10),
      rating: parseFloat(dataForm.rating.value),
      description: dataForm.description.value,
    };

    const url = `${API.Reviews}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastReview(true);
          setShowModalReview(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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

  const deleteOrder = () => {
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
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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

  const updateOrderItem = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const requestBody = {
      quantity: parseInt(dataForm.quantity.value, 10),
    };

    const url = `${API.OrderItems}/${orderItem.id}`;
    const requestOpt = helpers.requestOptions(requestBody, 'PATCH', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastUpdate(true);
          setShowModal(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setError(result);
          setShowToast(true);
        }
      })
      .catch((err) => {
        setError(err);
        if (err.message === 'Unexpected end of JSON input') {
          alert('Menu is has been deleted by admin');
          setTimeout(() => {
            deleteOrder();
          }, 1200);
        }
        setShowToast(true);
      });
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center border my-2 rounded p-2" style={{ backgroundColor: '#fff' }}>
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {showModal && <Modal show={showModal} setShow={setShowModal} title="OrderCart Item"><OrderItemForm qty={orderItem.quantity} menuItem={orderItem} handleSubmit={updateOrderItem} /></Modal>}
      {showModalReview && <Modal show={showModalReview} setShow={setShowModalReview} title="Review Menu"><ReviewForm menuItem={orderItem.menu} handleSubmit={createReview} /></Modal>}
      <Toast show={showToastDelete} setShow={setShowToastDelete} message="OrderCart item deleted successfully" />
      <Toast show={showToastUpdate} setShow={setShowToastUpdate} message="OrderCart item updated successfully" />
      <Toast show={showToastReview} setShow={setShowToastReview} message="Review created successfully" />
      <img className="p-2 m-3 rounded border" style={{ width: '12rem', height: '12rem' }} src={format.displayByteImage(orderItem.menu.image)} alt="menu" />
      <div className="d-flex flex-column pt-4 w-100">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{orderItem.menu.name}</h5>
        <p style={{ fontSize: '0.75em' }} className="col-6">
          Category:
          {orderItem.menu.categoryName}
        </p>
        <div className="row w-100" style={{ fontSize: '0.8em' }}>
          <div className="col-12">
            <span className="fa fa-star checked" style={{ color: '#FFD27D' }} />
            {' '}
            {orderItem.menu.rating}
          </div>
          <div className="col-12 text-start">
            <table className="w-100 table">
              <tbody>
                <tr>
                  <th>Price of menu</th>
                  <td>{`${format.priceFormatter(orderItem.menu.price)}`}</td>
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
                  <td>{`${format.priceFormatter(orderItem.menu.price * orderItem.quantity)}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        showButton
        && (
        <div className="d-flex h-100 align-text-top">
          <button type="button" className="btn d-flex align-items-start pt-0" onClick={showOrderItem}>Edit</button>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="btn btn-close" onClick={deleteOrder} />
        </div>
        )
      }
      {
        showCreateReview
        && <button type="button" className="btn d-flex align-items-start p-2 bg-info" onClick={showReviewForm}>Add Review</button>
      }
    </div>
  );
}
