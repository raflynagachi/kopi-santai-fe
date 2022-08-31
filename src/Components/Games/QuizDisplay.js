import { useEffect, useState } from 'react';
import randomize from '../../Utils/Randomize';

export default function QuizDisplay({ quiz }) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (quiz) {
      setChoices(randomize.arrayRand(quiz.incorrectAnswers.concat(quiz.correctAnswer)));
    }
  }, []);

  return (
    <div className="container border p-2 my-2">
      <p className="bg-info p-2">{quiz.category}</p>
      <h5>{quiz.question}</h5>
      <div className="row">
        {choices.map((item) => (
          <div className="col col-lg-3">
            <button className="w-100 h-100 p-2" type="button" value={item}>{item}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
