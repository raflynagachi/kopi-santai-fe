import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderTable from '../../Components/Admin/OrderTable';
import useFetch from '../../Hooks/useFetch';
import { API, helpers } from '../../Utils/API';
import Loading from '../../Components/Loading';
import Toast from '../../Components/Toast';
import FilterAllOrder from '../../Components/Admin/FilterAllOrder';
import format from '../../Utils/Format';

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [queryParam, setQueryParam] = useState({});
  const token = localStorage.getItem('token');

  const reqBody = { headers: { Authorization: `Bearer ${token}` } };
  const orderRes = useFetch(
    API.InternalOrders + helpers.queryParamOrderToString(queryParam),
    reqBody,
  );

  const handleChangeQueryParam = (event) => {
    setQueryParam({
      ...queryParam,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    setOrders(orderRes.data.data);
    setLoading(orderRes.loading);
    setError(orderRes.error);
    if (error) {
      setShowToast(true);
    }
  }, [error, orderRes]);

  useEffect(() => {
    let earn = 0;
    if (orders) {
      for (let i = 0; i < orders.length; i += 1) {
        earn += orders[i].totalPrice;
      }
      setEarnings(earn);
    }
  }, [orders]);

  return (
    <div className="container">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {loading && <Loading />}
      {
        !error && !loading
        && (
        <div>
          <h4 className="text-center my-2">Orders Table</h4>
          <h5 className="text-end">
            <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>Total earnings: </span>
            {`${format.priceFormatter(earnings)}`}
          </h5>
          <FilterAllOrder handleChangeQueryParam={handleChangeQueryParam} />
          <OrderTable orders={orders} />
        </div>
        )
      }
    </div>
  );
}
