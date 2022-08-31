import useFetch from '../../Hooks/useFetch';

export default function Gameplay() {
  const url = 'https://the-trivia-api.com/api/questions?limit=1&difficulty=easy';

  console.log(url);
  const quiz = useFetch(url);
  console.log(quiz);

  return (
    <>
      Game
    </>
  );
}
