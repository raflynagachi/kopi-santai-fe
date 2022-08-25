import { useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';
import { API } from '../Utils/API';
import Toast from '../Components/Toast';
import Loading from '../Components/Loading';

export default function Profile({ user }) {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const userProfileRes = useFetch(`${API.Users}/${user.id}`);

  useEffect(() => {
    setUserProfile(userProfileRes.data.data);
    setLoading(userProfileRes.loading);
    setError(userProfileRes.error);
    if (error) {
      setShowToast(true);
    }
  }, [userProfileRes]);

  console.log(userProfile);
  return (
    <div className="container my-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <h4 className="text-center">Our Menus</h4>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
        <h2>sdasa</h2>
      )}
    </div>
  );
}
