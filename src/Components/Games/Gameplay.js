import { useState } from 'react';
import { API } from '../../Utils/API';
import Loading from '../Loading';
import Toast from '../Toast';
import QuizDisplay from './QuizDisplay';

export default function Gameplay({ maxTried, tried, setTried }) {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const randomQuizURL = `${API.RandomQuiz}`;

  const playGame = () => {
    setLoading(true);
    fetch(randomQuizURL)
      .then((res) => res.json())
      .then((result) => {
        setQuiz(result[0]);
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      })
      .finally(() => {
        setLoading(false);
        setShowQuiz(true);
      });
  };
  return (
    <div className="container p-4">
      {loading && <Loading />}
      <h4 className="text-center">{'Let\'s play the games'}</h4>
      <p className="mt-2">{`Try chance ${tried}/${maxTried}`}</p>
      <hr className="my-2" />
      <button type="button" className="btn mx-1 p-1" style={{ backgroundColor: tried < maxTried ? '#fff985' : '#ccc', width: '6em' }} onClick={tried < maxTried ? () => { playGame(); } : undefined}> PLAY </button>
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {
        !loading && showQuiz
        && <QuizDisplay setTried={setTried} quiz={quiz} />
      }
    </div>
  );
}
