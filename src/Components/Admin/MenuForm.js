import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormWrapper from '../Form/FormWrapper';
import { API, helpers } from '../../Utils/API';
import Loading from '../Loading';
import Toast from '../Toast';

export default function MenuForm({ menu, handleSubmit }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
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
    <div className="container">
      {loading && <Loading />}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <FormWrapper title="Create Menu">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="id" defaultValue={menu && menu.id} hidden readOnly />
          </div>
          <br />
          <div className="form-group">
            Category
            <select className="form-select" id="categoryID" defaultValue={menu && menu.categoryID} required>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            Name
            <input type="text" className="form-control" id="name" defaultValue={menu && menu.name} />
          </div>
          <br />
          <div className="form-group">
            Price
            <input type="number" className="form-control" id="price" defaultValue={menu && menu.price} />
          </div>
          <br />
          <div className="form-group">
            Image
            <input type="text" className="form-control" id="imageByte" value={menu && menu.image} hidden readOnly />
            <input type="file" className="form-control" id="image" />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </FormWrapper>
    </div>
  );
}
