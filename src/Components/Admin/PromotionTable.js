import { useState } from 'react';
import format from '../../Utils/Format';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';

export default function PromotionTable({ promotions }) {
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastDeleteSuccess, setShowToastDeleteSuccess] = useState(false);
  const token = localStorage.getItem('token');

  const deletePromotion = (promoID) => {
    const url = `${API.Promotions}/${promoID}`;
    const requestOpt = helpers.requestOptions(null, 'DELETE', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastDeleteSuccess(true);
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
    <div className="container">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastDeleteSuccess} setShow={setShowToastDeleteSuccess} message="Promotion deleted successfully" />
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Description</td>
            <td>Image</td>
            <td>Min Spent</td>
            <td>Coupon</td>
            <td>Discount Amount</td>
            <td>Coupon Status</td>
            <td>Action</td>
          </tr>
        </thead>
        {
          promotions
            ? promotions.map((item, idx) => (
              <tbody>
                <tr key={item.id} style={{ backgroundColor: item.coupon.deletedAt ? '#ddd' : '#fff' }}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><img style={{ width: '100px', height: '100px' }} src={format.displayByteImage(item.image)} alt="promo" /></td>
                  <td>{format.priceFormatter(item.minSpent)}</td>
                  <td>{item.coupon.name}</td>
                  <td>{`${item.coupon.amount}%`}</td>
                  {
                  item.coupon.deletedAt
                    ? <td style={{ backgroundColor: '#ddd' }}>Non-Active</td>
                    : <td>Active</td>
                }
                  <td>
                    {
                      !item.deletedAt
                      && <button type="button" className="btn mx-1 p-1" style={{ backgroundColor: '#ff6e6e', width: '6em' }} onClick={() => { deletePromotion(item.id); }}>Delete</button>
                    }
                  </td>
                </tr>
              </tbody>
            ))
            : (
              <tbody>
                <tr>
                  <td colSpan={9} className="text-center">No promotions</td>
                </tr>
              </tbody>
            )
        }
      </table>
    </div>
  );
}
