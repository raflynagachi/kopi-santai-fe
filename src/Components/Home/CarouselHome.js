import format from '../../Utils/Format';

export default function CarouselHome({ promotions, images }) {
  return (
    <div id={promotions ? 'carouselCtrlPromo' : 'carouselCtrl'} className="carousel slide my-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {
          promotions
          && promotions.map((item, idx) => (
            <div
              key={item}
              className={idx === 0 ? 'carousel-item active' : 'carousel-item'}
              style={{ backgroundColor: '#222' }}
            >
              <img
                src={format.displayByteImage(item.image)}
                style={{
                  opacity: '0.5',
                  objectFit: 'cover',
                  width: '100%',
                  height: '300px',
                }}
                className="d-block w-100"
                alt={item.name}
              />
              <div className="carousel-caption d-none d-md-block my-auto">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <p style={{ width: '50%' }} className="mx-auto">
                  {`With spent only IDR ${item.minSpent / 1000}K to get ${item.coupon.name} coupon with discount up to ${item.coupon.amount}%`}
                </p>
              </div>
            </div>
          ))
        }
        {' '}
        {images && images.map((item, idx) => (
          <div
            key={item}
            className={idx === 0 ? 'carousel-item active' : 'carousel-item'}
            style={{ backgroundColor: '#222' }}
          >
            <img
              src={item}
              style={{
                opacity: '0.5', objectFit: 'cover', width: '100%', height: '400px',
              }}
              className="d-block w-100 bg-dark"
              alt="home hero"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Welcome to Kopi Santai</h3>
              <h4>Always be Happy ygy</h4>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={promotions ? '#carouselCtrlPromo' : '#carouselCtrl'}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={promotions ? '#carouselCtrlPromo' : '#carouselCtrl'}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
