import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Modal from '../Modal';
import OrderItemCard from '../OrderItem/OrderItemCard';
import format from '../../Utils/Format';

export default function OrderCard({ order }) {
  // const navigate = useNavigate();
  // const [error, setError] = useState(null);
  // const [showToast, setShowToast] = useState(false);
  // const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);
  const [showToastUpdate, setShowToastUpdate] = useState(false);
  const [showToastDelete, setShowToastDelete] = useState(false);

  // const showOrderItem = () => {
  //   setShowModal(true);
  // };

  // const createReviewOfMenu = async (e) => {
  //   e.preventDefault();
  //   const dataForm = e.target.elements;
  //
  //   if (!helpers.isValidToken(token)) {
  //     alert('unauthorized');
  //     localStorage.setItem('token', '');
  //     navigate('/login');
  //   }
  //
  //   const requestBody = {
  //     quantity: parseInt(dataForm.quantity.value, 10),
  //   };
  //
  //   const url = `${API.OrderItems}/${order.id}`;
  //   const requestOpt = helpers.requestOptions(requestBody, 'PATCH', token);
  //   fetch(url, requestOpt)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result.statusCode === 200) {
  //         setShowToastUpdate(true);
  //         setShowModal(false);
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000);
  //       } else {
  //         setError(result);
  //         setShowToast(true);
  //       }
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setShowToast(true);
  //     });
  // };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center border my-2 rounded p-2" style={{ backgroundColor: '#eee' }}>
      {/* {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />} */}
      {showModal && <Modal show={showModal} setShow={setShowModal} title="OrderCart Item">Halo</Modal>}
      <Toast show={showToastDelete} setShow={setShowToastDelete} message="OrderCart item deleted successfully" />
      <Toast show={showToastUpdate} setShow={setShowToastUpdate} message="OrderCart item updated successfully" />
      <div className="d-flex flex-column pt-4 w-100">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{`Ordered Date: ${format.formatDate(order.orderedDate)}`}</h5>
        {order.coupon
        && (
        <p style={{ fontSize: '0.75em' }} className="col-6">
          {`Coupon: ${order.coupon.name} in percentage amount is ${order.coupon.amount}%`}
        </p>
        )}
        <div className="row w-100 d-flex justify-content-center" style={{ fontSize: '0.8em' }}>
          <div className="col-12">
            {`Delivery Status: ${order.delivery.status}`}
          </div>
          <div className="col-12">
            {`Payment Option: ${order.paymentOption.name}`}
          </div>
          <div className="col-12">
            {`Total Price: Rp.${order.totalPrice}`}
          </div>
          <div className="col-10 text-start">
            <div className="justify-content-center">
              {
                order.orderItems && order.orderItems.map((item) => (
                  <OrderItemCard orderItem={item} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
