import { useState } from 'react';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';

export default function CouponTable({ coupons }) {
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastDeleteSuccess, setShowToastDeleteSuccess] = useState(false);
  const token = localStorage.getItem('token');

  const deleteCoupon = (couponID) => {
    const url = `${API.Coupons}/${couponID}`;
    const requestOpt = helpers.requestOptions(null, 'DELETE', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastDeleteSuccess(true);
          setTimeout(() => { window.location.reload(); }, 1200);
        } else {
          setError(result.data);
          setShowToast(error);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastDeleteSuccess} setShow={setShowToastDeleteSuccess} message="Menu deleted successfully" />
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Amount</td>
            <td>Is Available</td>
            <td>Action</td>
          </tr>
        </thead>
        {
          coupons
            ? coupons.map((item, idx) => (
              <tbody>
                <tr key={item.id} style={{ backgroundColor: item.deletedAt ? '#ddd' : '#fff' }}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{`${item.amount}%`}</td>
                  {
                  item.deletedAt
                    ? <td style={{ backgroundColor: '#ddd' }}>Non-Active</td>
                    : <td>Active</td>
                }
                  <td>
                    {
                      item.deletedAt
                        ? <button type="button" className="btn mx-1 p-1" style={{ backgroundColor: '#ccc', width: '6em' }}>Delete</button>
                        : <button type="button" className="btn mx-1 p-1" style={{ backgroundColor: '#ff6e6e', width: '6em' }} onClick={() => { deleteCoupon(item.id); }}>Delete</button>
                    }
                  </td>
                </tr>
              </tbody>
            ))
            : (
              <tbody>
                <tr>
                  <td colSpan={5}>No coupons</td>
                </tr>
              </tbody>
            )
        }
      </table>
    </div>
  );
}
