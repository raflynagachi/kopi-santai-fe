import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';
import Toast from '../Components/Toast';
import OrderItemList from '../Components/OrderItem/OrderItemList';
import Order from '../Components/Order';

export default function OrderItem() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
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

  return (
    <div>
      {loading && <Loading />}
      <div style={{ width: '90%' }} className="d-flex flex-column mx-auto my-4 justify-content-center align-items-center">
        <h3 className="mt-4 text-center">Order Items - Cart</h3>
        {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
        {!error && !loading && orderItems && total
        && (
          <div className="d-flex flex-row">
            <OrderItemList orderItems={orderItems} />
            <Order className="mx-2" total={total} />
          </div>
        )}
      </div>
    </div>
  );
}
