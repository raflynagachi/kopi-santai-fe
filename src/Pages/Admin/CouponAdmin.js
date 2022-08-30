import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../../Utils/API';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';
import Modal from '../../Components/Modal';
import CouponTable from '../../Components/Admin/CouponTable';
import CouponCreateForm from '../../Components/Admin/CouponCreateForm';

export default function CouponAdmin() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastCreateSuccess, setShowToastCreateSuccess] = useState(false);
  const token = localStorage.getItem('token');

  const createCoupon = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.InternalCoupons}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setCoupons(result.data);
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

  const handleSubmitCreateCoupon = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const requestBody = {
      name: dataForm.name.value,
      amount: parseFloat(dataForm.amount.value),
    };

    const url = `${API.Coupons}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowModal(false);
          setShowToastCreateSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
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
      <Toast show={showToastCreateSuccess} setShow={setShowToastCreateSuccess} message="Coupon created successfully" />
      {showModal && <Modal show={showModal} setShow={setShowModal} title="Create Coupon"><CouponCreateForm handleSubmit={handleSubmitCreateCoupon} /></Modal>}
      <h4 className="text-center">Coupons Management</h4>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn m-2" style={{ backgroundColor: '#afffaf' }} onClick={() => { createCoupon(); }}>Create Coupon</button>
      </div>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
      <CouponTable coupons={coupons} />
      )}
    </div>
  );
}
