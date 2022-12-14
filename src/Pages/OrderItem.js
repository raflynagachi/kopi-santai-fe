import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';
import Toast from '../Components/Toast';
import OrderItemList from '../Components/OrderItem/OrderItemList';
import OrderCart from '../Components/OrderItem/OrderCart';

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
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    if (jwt(token).user.role !== 'USER') {
      navigate('/forbidden');
    }

    const url = `${API.OrderItems}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setOrderItems(result.data);
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
      localStorage.setItem('token', '');
      navigate('/unauthorized');
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
          <div className="container row d-flex justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4"><OrderItemList orderItems={orderItems} /></div>
            { total !== 0
              && (
              <div className="col-sm-12 col-md-6 col-lg-8">
                <OrderCart
                  total={total}
                  handleSubmitOrder={handleSubmitOrder}
                />
              </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
