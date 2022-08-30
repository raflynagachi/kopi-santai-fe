import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../../Utils/API';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';
import PromotionTable from '../../Components/Admin/PromotionTable';
import Modal from '../../Components/Modal';

export default function Promotion() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [showModalCreatePromotion, setShowModalCreatePromotion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToastCreateSuccess, setShowToastCreateSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  const createPromotion = () => {
    setShowModalCreatePromotion(true);
  };

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.InternalPromotions}`;
    const reqBody = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqBody)
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
      <Toast show={showToastCreateSuccess} setShow={setShowToastCreateSuccess} message="Promotion created successfully" />
      {showModalCreatePromotion && <Modal show={showModalCreatePromotion} setShow={setShowModalCreatePromotion} title="Create Promotion">Halo</Modal>}
      <h4 className="text-center">Promotions Management</h4>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn m-2" style={{ backgroundColor: '#afffaf' }} onClick={() => { createPromotion(); }}>Create Promotion</button>
      </div>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
        <PromotionTable promotions={promotions} />
      )}
    </div>
  );
}
