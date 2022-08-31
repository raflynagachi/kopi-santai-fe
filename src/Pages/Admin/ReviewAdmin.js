import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API, helpers } from '../../Utils/API';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';
import ReviewTable from '../../Components/Admin/ReviewTable';

export default function ReviewAdmin() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');
  const params = useParams();

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const url = `${API.Menus}/${params.id}/reviews`;
    const reqBody = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqBody)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setReviews(result.data);
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
      <h4 className="text-center">{`Reviews of menu with id (${params.id}) Management`}</h4>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
        <ReviewTable reviews={reviews} />
      )}
    </div>
  );
}
