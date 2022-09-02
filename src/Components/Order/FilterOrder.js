import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../../Utils/API';
import Loading from '../Loading';
import Toast from '../Toast';

export default function FilterOrder({ filter, handleChange }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
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
    <div className="d-md-flex justify-content-between mb-4">
      {loading && <Loading />}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {
        !error && !loading
        && (
        <div className="d-flex align-items-center justify-content-between mb-2">
          <p className="my-0 me-2">Show</p>
          <select
            className="form-select"
            aria-label="Default select example"
            id="showBy"
            value={filter.showBy}
            onChange={handleChange}
          >
            <option value="">All</option>
            {categories && categories.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        )
      }
      <div className="d-flex row">
        <div className="d-flex col align-items-center justify-content-around mb-2">
          <p className="my-0 me-2" style={{ whiteSpace: 'nowrap' }}>Sort by</p>
          <select
            className="form-select mx-2"
            aria-label="Default select example"
            id="sortBy"
            value={filter.sortBy}
            onChange={handleChange}
          >
            <option value="id">Default</option>
            <option value="orderedDate">Date</option>
          </select>
          <select
            className="form-select mx-2"
            style={{ width: 'fit-content' }}
            aria-label="Default select example"
            id="sort"
            value={filter.sort}
            onChange={handleChange}
          >
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </div>
        <div className="d-flex col mb-2">
          <input type="text" className="form-control" id="keyword" onChange={handleChange} placeholder="type a keyword..." />
        </div>
      </div>
    </div>
  );
}
