import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import format from '../../Utils/Format';
import Modal from '../Modal';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import DeliveryForm from './DeliveryForm';

export default function OrderTable({ orders, setQueryParam, queryParam }) {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  const updateDeliveryStatus = (d) => {
    setShowModal(true);
    setDelivery(d);
  };

  const handleSubmitUpdateDeliveryStatus = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const requestBody = {
      status: dataForm.status.value,
    };

    const id = dataForm.id.value;
    const url = `${API.Deliveries}/${id}`;
    const requestOpt = helpers.requestOptions(requestBody, 'PATCH', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowModal(false);
          setShowToastSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  const pages = [];
  for (let i = 1; i <= orders.totalPage; i += 1) {
    pages.push(
      <li className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => setQueryParam({
            ...queryParam,
            page: i,
          })}
        >
          {i}
        </button>
      </li>,
    );
  }

  return (
    <div className="container">
      {showModal && <Modal show={showModal} setShow={setShowModal} title="Update Delivery"><DeliveryForm delivery={delivery} handleSubmit={handleSubmitUpdateDeliveryStatus} /></Modal>}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastSuccess} setShow={setShowToastSuccess} message="delivery status updated successfully" />
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>UserID</td>
            <td>Coupon</td>
            <td>Ordered Date</td>
            <td>Total Price</td>
            <td>Payment Option</td>
            <td>Delivery Status</td>
          </tr>
        </thead>

        {
          orders.orderRes
            ? orders.orderRes.map((item, idx) => (
              <tbody>
                <tr key={item.id}>
                  <td>{(orders.currentPage - 1) * orders.limit + (idx + 1)}</td>
                  <td>{item.userID}</td>
                  {
            item.couponID === 0
              ? <td style={{ backgroundColor: '#ddd' }}>No coupon</td>
              : <td>{item.coupon.name}</td>
          }
                  <td>{format.formatDate(item.orderedDate)}</td>
                  <td className="text-end">{`${format.priceFormatter(item.totalPrice)}`}</td>
                  <td>{item.paymentOption.name}</td>
                  <td><button type="button" className="btn" style={{ backgroundColor: item.delivery.status !== 'DELIVERED' ? '#feffab' : '#26f193' }} onClick={item.delivery.status !== 'DELIVERED' ? () => { updateDeliveryStatus(item.delivery); } : undefined}>{item.delivery.status}</button></td>
                </tr>
              </tbody>
            ))
            : (
              <tbody>
                <tr>
                  <td colSpan={7}>No orders</td>
                </tr>
              </tbody>
            )
        }
      </table>
      <div className="container">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {pages}
          </ul>
        </nav>
      </div>
    </div>
  );
}
