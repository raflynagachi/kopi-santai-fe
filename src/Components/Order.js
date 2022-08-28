import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormWrapper from './Form/FormWrapper';
import { API, helpers } from '../Utils/API';
import Toast from './Toast';
import Loading from './Loading';

export default function Order({ total, handleSubmitOrder }) {
  const dateNow = new Date();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [paymentOpts, setPaymentOpts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.PaymentOpt}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setPaymentOpts(result.data);
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

    const url2 = `${API.Coupons}`;
    fetch(url2, reqOpt)
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

  return (
    <div className="container border m-2 py-4">
      {loading && <Loading />}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {!error && !loading
        && (
        <FormWrapper title="Order - Checkout">
          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              Base total price
              <input defaultValue={`Rp.${total}`} type="text" className="form-control" id="total" style={{ backgroundColor: '#ccc' }} readOnly />
            </div>
            <br />
            <div className="form-group">
              Payment options
              <select className="form-select" id="paymentOptionID">
                {paymentOpts && paymentOpts.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="form-group">
              Coupons
              <select className="form-select" id="paymentOptionID">
                { coupons && coupons.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="form-group">
              Ordered date
              <input defaultValue={dateNow.toLocaleDateString()} type="datetime-local" className="form-control" id="orderedDate" required />
            </div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </FormWrapper>
        )}
    </div>
  );
}
