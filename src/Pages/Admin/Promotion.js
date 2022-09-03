import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../../Utils/API';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';
import PromotionTable from '../../Components/Admin/PromotionTable';
import Modal from '../../Components/Modal';
import format from '../../Utils/Format';
import PromotionCreateForm from '../../Components/Admin/PromotionCreateForm';

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
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const url = `${API.InternalPromotions}`;
    const reqBody = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqBody)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setPromotions(result.data);
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

  const submitCreatePromotion = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    let base64;
    const file = dataForm.image.files[0];
    if (file) {
      base64 = await format.getBase64(file);
    }

    const requestBody = {
      couponID: parseInt(dataForm.couponID.value, 10),
      name: dataForm.name.value,
      description: dataForm.description.value,
      minSpent: parseFloat(dataForm.minSpent.value),
      image: base64,
    };

    const url = `${API.Promotions}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowModalCreatePromotion(false);
          setShowToastCreateSuccess(true);
          setTimeout(() => { window.location.reload(); }, 1200);
        } else {
          setError(result);
          setShowToast(error);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container my-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastCreateSuccess} setShow={setShowToastCreateSuccess} message="Promotion created successfully" />
      {showModalCreatePromotion && <Modal show={showModalCreatePromotion} setShow={setShowModalCreatePromotion} title="Create Promotion"><PromotionCreateForm handleSubmit={submitCreatePromotion} /></Modal>}
      <h4 className="text-center">Promotions Management</h4>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn m-2" style={{ backgroundColor: '#afffaf' }} onClick={() => { createPromotion(); }}>Create Promotion</button>
      </div>
      <hr className="my-5" />
      {loading && <Loading />}
      {!loading && (
        <PromotionTable promotions={promotions} />
      )}
    </div>
  );
}
