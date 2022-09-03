import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import randomize from '../../Utils/Randomize';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';

export default function QuizDisplay({ quiz }) {
  const WinningPoint = 10;
  const navigate = useNavigate();
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [answered, setAnswered] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (quiz) {
      setChoices(randomize.arrayRand(quiz.incorrectAnswers.concat(quiz.correctAnswer)));
    }
  }, []);

  const handleAnswer = (answer) => {
    setAnswered(true);
    let win;
    if (answer === quiz.correctAnswer) {
      document.getElementById(answer).style.background = '#22bb33';
      win = true;
    } else {
      document.getElementById(answer).style.background = '#ff0000';
      setShowToast(true);
    }
    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    const requestBody = {
      score: win ? WinningPoint : 0,
    };

    const url = `${API.GamePrize}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastSuccess(true);
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container border p-2 my-2">
      <Toast show={showToastSuccess} setShow={setShowToastSuccess} message="CONGRATULATIONS!!! You Are A Winner" />
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <p className="bg-info p-2">{quiz.category}</p>
      <h5>{quiz.question}</h5>
      <div className="row">
        {choices.map((item) => (
          <div className="col p-2">
            <button
              className="w-100 h-100 p-2"
              type="button"
              id={item}
              onClick={!answered ? () => {
                handleAnswer(item);
              } : undefined}
              value={item}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
