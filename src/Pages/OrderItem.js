import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';
import Toast from '../Components/Toast';
import OrderItemList from '../Components/OrderItem/OrderItemList';

export default function OrderItem() {
  const navigate = useNavigate();
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

  return (
    <div>
      {loading && <Loading />}
      <div className="d-flex flex-column w-75 mx-auto my-4 justify-content-center align-items-center">
        <h3 className="mt-4 text-center">Order Items - Cart</h3>
        {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
        {!error && !loading && orderItems
        && (
          <div>
            <OrderItemList orderItems={orderItems} />
          </div>
        )}
      </div>
    </div>
  );
}
