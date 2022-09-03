import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormWrapper from '../Form/FormWrapper';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Loading from '../Loading';
import format from '../../Utils/Format';

export default function OrderCart({ total, handleSubmitOrder }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [paymentOpts, setPaymentOpts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [showToastDeleteAll, setShowToastDeleteAll] = useState(false);
  const [selectedCouponID, setSelectedCouponID] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const url = `${API.PaymentOpt}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setPaymentOpts(result.data);
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

  const deleteOrders = () => {
    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const url = `${API.OrderItems}`;
    const requestOpt = helpers.requestOptions(null, 'DELETE', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastDeleteAll(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setError(result);
          setShowToast(true);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container border m-2 py-4">
      {loading && <Loading />}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastDeleteAll} setShow={setShowToastDeleteAll} message="order items deleted successfully" />
      <button type="button" className="bg-danger btn text-white" onClick={deleteOrders}>Delete all</button>
      {!error && !loading
        && (
        <FormWrapper title="OrderCart - Checkout">
          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              Base total price
              <input defaultValue={`${format.priceFormatter(total)}`} type="text" className="form-control" id="baseTotal" style={{ backgroundColor: '#ccc', textDecoration: 'line-through' }} readOnly />
            </div>
            <br />
            <div className="form-group">
              Total price
              <input value={`${format.priceFormatter(selectedCouponID > 0 ? (total - (total * coupons[selectedCouponID - 1].amount) / 100) : total)}`} type="text" className="form-control" id="total" style={{ backgroundColor: '#ccc' }} readOnly />
            </div>
            <br />
            <div className="form-group">
              Payment options
              <select className="form-select" id="paymentOptID" required>
                {paymentOpts && paymentOpts.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="form-group">
              Coupons
              <select className="form-select" id="couponID" onChange={(e) => setSelectedCouponID(e.target.selectedIndex)}>
                <option value={null}>No coupon selected</option>
                { coupons && coupons.map((item) => (
                  <option value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </FormWrapper>
        )}
    </div>
  );
}
