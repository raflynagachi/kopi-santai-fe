import { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { API, helpers } from '../Utils/API';
import Toast from '../Components/Toast';
import Loading from '../Components/Loading';
import UserProfile from '../Components/Profile/UserProfile';
import UserCoupons from '../Components/Profile/UserCoupons';

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (helpers.isValidToken(token)) {
      helpers.logout();
      navigate('/login');
    }

    const userJWT = jwt(token);
    const url = `${API.Users}/${userJWT.user.id}`;
    const reqOpt = { headers: { Authorization: `Bearer ${token}` } };

    fetch(url, reqOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setData(result.data);
          setLoading(result.loading);
          setError(result.error);
        } else if (result.statusCode === 401) {
          alert('unauthorized error');
          navigate('/login');
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="container my-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <h2 className="text-center">Profile Page</h2>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && data && (
        <>
          <UserProfile data={data} />
          <UserCoupons coupons={data.coupons} />
        </>
      )}
    </div>
  );
}
