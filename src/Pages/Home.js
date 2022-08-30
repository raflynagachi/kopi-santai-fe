import { useEffect, useState } from 'react';
import CarouselHome from '../Components/Home/CarouselHome';
import { API } from '../Utils/API';
import Toast from '../Components/Toast';
import Loading from '../Components/Loading';
import bg1 from '../Assets/bg1.jpg';
import bg2 from '../Assets/bg2.jpg';
import bg3 from '../Assets/bg3.jpg';

export default function Home() {
  const images = [bg1, bg2, bg3];

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const url = `${API.Promotions}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setPromotions(result.data);
          setLoading(result.loading);
          setError(result.error);
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
    <div className="container">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      {loading && <Loading />}
      <CarouselHome images={images} />
      <br />
      {
        promotions
        && (
        <div>
          <h4>Promo!!!</h4>
          <CarouselHome promotions={promotions} />
        </div>
        )
      }
    </div>
  );
}
