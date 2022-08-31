import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';
import Toast from '../Components/Toast';
import GameLeaderboard from '../Components/Games/GameLeaderboard';
import Gameplay from '../Components/Games/Gameplay';

export default function Games() {
  const navigate = useNavigate();
  const [userGame, setUserGame] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
    }

    const { id } = jwt(token).user;
    const url = `${API.Games}/${id}`;
    const reqBody = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url, reqBody)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setUserGame(result.data);
          setUserID(jwt(token).user.id);
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

    const url2 = `${API.Games}`;
    const reqBody2 = { headers: { Authorization: `Bearer ${token}` } };
    fetch(url2, reqBody2)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setLeaderboard(result.data);
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
    <div className="container my-4">
      {loading && <Loading />}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <div className="row text-center">
        <div className="col-8">
          <Gameplay />
        </div>
        <div className="col-4">
          <div className="mb-4 p-2 border rounded" style={{ backgroundColor: '#bdffbd' }}>
            <h5 className="m-0">My Score</h5>
            <h4 className="m-0">{userGame.score}</h4>
          </div>
          <GameLeaderboard leaderboard={leaderboard} userID={userID} />
        </div>
      </div>
    </div>
  );
}
