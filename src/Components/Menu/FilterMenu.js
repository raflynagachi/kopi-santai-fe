import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API, helpers } from '../../Utils/API';
import Loading from '../Loading';
import Toast from '../Toast';

export default function FilterMenu({
  queryParam, handleChangeQueryParam, isAdmin,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token) && isAdmin) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.Categories}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setCategories(result.data);
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
    <div className="d-md-flex flex-row justify-content-between mb-4">
      {loading && <Loading />}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {
        !error && !loading
        && (
        <div className="d-flex flex-row align-items-center justify-content-around mb-2">
          <p className="my-0 me-2" style={{ whiteSpace: 'nowrap' }}>Show</p>
          <select
            className="form-select mx-2"
            aria-label="Default select example"
            id="category"
            value={queryParam.category}
            onChange={handleChangeQueryParam}
          >
            <option value="">all</option>
            {categories && categories.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        )
      }
      <div className="d-flex flex-row align-items-center mb-2">
        <p className="my-0 me-1" style={{ whiteSpace: 'nowrap' }}>Sort by</p>
        <select
          className="form-select me-2"
          aria-label="Default select example"
          id="sortBy"
          value={queryParam.sortBy}
          onChange={handleChangeQueryParam}
        >
          <option value="">default</option>
          <option value="price">price</option>
        </select>
        <select
          className="form-select mx-2"
          style={{ width: 'fit-content' }}
          aria-label="Default select example"
          id="sort"
          value={queryParam.sort}
          onChange={handleChangeQueryParam}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <div className="d-flex flex-row mb-2">
        <input type="text" className="searchInput form-control me-2" id="search" placeholder="type a keyword.." onChange={handleChangeQueryParam} />
      </div>
    </div>
  );
}
