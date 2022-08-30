import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../../Utils/API';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';
import PromotionTable from '../../Components/Admin/PromotionTable';

export default function Promotion() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
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

    const url = `${API.Promotions}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setPromotions(result.data);
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
    <div className="container my-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <h4 className="text-center">Promotions Management</h4>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
        <PromotionTable promotions={promotions} />
      )}
    </div>
  );
}
