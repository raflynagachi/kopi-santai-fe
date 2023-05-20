import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../Form/FormWrapper';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Loading from '../Loading';

export default function PromotionCreateForm({ handleSubmit }) {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const url = `${API.InternalCoupons}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setCoupons(result.data);
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
    <FormWrapper title="Create Promotion">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {loading && <Loading />}
      {
        !loading && !error
        && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            Name
            <input type="text" className="form-control" id="name" required />
          </div>
          <br />
          <div className="form-group">
            Description
            <input type="text" className="form-control" id="description" required />
          </div>
          <br />
          <div className="form-group">
            Minimal Spent
            <input defaultValue={0} type="number" step={0.01} className="form-control" id="minSpent" required min={1} />
          </div>
          <br />
          <div className="form-group">
            Coupon
            <select className="form-select" id="couponID">
              <option value={null}>No coupon selected</option>
              { coupons && coupons.filter((item) => (
                item.deletedAt === null
              )).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            Image
            <input type="file" className="form-control" id="image" required />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
        )
      }
    </FormWrapper>
  );
}
