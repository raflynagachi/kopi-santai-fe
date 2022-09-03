import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import format from '../../Utils/Format';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Modal from '../Modal';
import ReviewForm from '../Review/ReviewForm';

export default function OrderItemCompletedCard({ orderItem }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showModalReview, setShowModalReview] = useState(false);
  const [showToastReview, setShowToastReview] = useState(false);
  const token = localStorage.getItem('token');

  const showReviewForm = () => {
    setShowModalReview(true);
  };

  const createReview = (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const userid = jwt(token).user.id;
    const requestBody = {
      userID: parseInt(userid, 10),
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

  return (
    <div className="border rounded my-2 mx-2 p-2" style={{ backgroundColor: '#fff' }}>
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {showModalReview && <Modal show={showModalReview} setShow={setShowModalReview} title="Review Menu"><ReviewForm menuItem={orderItem.menu} handleSubmit={createReview} /></Modal>}
      <Toast show={showToastReview} setShow={setShowToastReview} message="Review created successfully" />
      <div className="row me-1">
        <div className="col">
          <h5 className="card-title">{orderItem.menu.name}</h5>
          <p>
            Category:
            {orderItem.menu.categoryName}
          </p>
        </div>
        <button type="button" style={{ maxWidth: '100px', maxHeight: '25px', fontSize: '0.8rem' }} className="btn col px-2 py-0 bg-info" onClick={showReviewForm}>Add Review</button>
      </div>
      <div style={{ wordWrap: 'break-word' }}>
        <p className="m-0">
          {`${format.priceFormatter(orderItem.menu.price)}`}
          {` x${orderItem.quantity}`}
        </p>
        <p className="m-0">
          {`Description: ${orderItem.description}`}
        </p>
      </div>
    </div>
  );
}
