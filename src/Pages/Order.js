import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';
import Toast from '../Components/Toast';
import OrderList from '../Components/Order/OrderList';
import FilterOrder from '../Components/Order/FilterOrder';
import FilterTheOrders from '../Utils/FilterTheOrders';

export default function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [filter, setFilter] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.Orders}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setOrders(result.data);
          setFilter({
            sortBy: 'id', sort: 'desc', keyword: '', showBy: '',
          });
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
    if (orders !== null && !loading) {
      let fOrders;
      fOrders = FilterTheOrders.sortOrderBy(orders, filter);
      fOrders = FilterTheOrders.filterShowBy(fOrders, filter);
      fOrders = FilterTheOrders.searchByText(fOrders, filter);
      setFilteredOrders(fOrders);
    }
  }, [filter, orders]);

  useEffect(() => {

  }, [orders, filter]);

  const handleChange = (event) => {
    setFilter({
      ...filter,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      <div style={{ width: '90%' }} className="d-flex flex-column mx-auto my-4 justify-content-center align-items-center">
        <h3 className="mt-4 text-center">Order History</h3>
        {loading && <Loading />}
        {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
        {!error && !loading
          && (
            <div className="d-flex flex-column">
              <FilterOrder filter={filter} handleChange={handleChange} />
              <OrderList orders={filteredOrders} />
            </div>
          )}
      </div>
    </div>
  );
}
