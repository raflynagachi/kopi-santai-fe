import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';
import Toast from '../Components/Toast';
import OrderItemList from '../Components/OrderItem/OrderItemList';
import OrderCart from '../Components/OrderCart';

export default function OrderItem() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.OrderItems}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setOrderItems(result.data);
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

  useEffect(() => {
    let tmp = 0;
    for (let i = 0; i < orderItems.length; i += 1) {
      tmp += (orderItems[i].menu.price * orderItems[i].quantity);
    }
    setTotal(tmp);
  }, [orderItems]);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const dateNow = new Date();

    const requestBody = {
      paymentOptID: parseInt(dataForm.paymentOptID.value, 10),
      couponID: parseInt(dataForm.couponID.value, 10),
      orderedDate: dateNow,
    };

    const url = `${API.Orders}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastSuccess(true);
          setTimeout(() => { navigate('/'); }, 2000);
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
      <div style={{ width: '90%' }} className="d-flex flex-column mx-auto my-4 justify-content-center align-items-center">
        <h3 className="mt-4 text-center">Order Items - Cart</h3>
        {loading && <Loading />}
        {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
        <Toast show={showToastSuccess} setShow={setShowToastSuccess} message="order checkout success" />
        {!loading
        && (
          <div className="d-flex flex-row">
            <OrderItemList orderItems={orderItems} />
            {total !== 0 && <OrderCart className="mx-2" total={total} handleSubmitOrder={handleSubmitOrder} />}
          </div>
        )}
      </div>
    </div>
  );
}
