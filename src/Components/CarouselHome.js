import bg1 from '../Assets/bg1.jpg';
import bg2 from '../Assets/bg2.jpg';
import bg3 from '../Assets/bg3.jpg';

export default function CarouselHome() {
  return (
    <div id="carouselCtrl" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bg1} style={{ objectFit: 'cover', width: '100%', height: '400px' }} className="d-block w-100" alt="bg1" />
        </div>
        <div className="carousel-item">
          <img src={bg2} style={{ objectFit: 'cover', width: '100%', height: '400px' }} className="d-block w-100" alt="bg2" />
        </div>
        <div className="carousel-item">
          <img src={bg3} style={{ objectFit: 'cover', width: '100%', height: '400px' }} className="d-block w-100" alt="bg3" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselCtrl"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselCtrl"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
