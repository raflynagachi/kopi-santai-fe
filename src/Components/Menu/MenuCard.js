import { Link } from 'react-router-dom';
import format from '../../Utils/Format';

export default function MenuCard({ menuItem }) {
  return (
    <div className="card mx-auto" style={{ width: '16rem' }}>
      <img className="card-img-top" style={{ height: '14rem' }} src={format.displayByteImage(menuItem.image)} alt="Card menu" />
      <div className="card-body">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{menuItem.name}</h5>
        <p style={{ fontSize: '0.75em' }} className="col-8">
          Category:
          {menuItem.categoryName}
        </p>
        <div className="card-text row">
          <div className="col-5">
            <span className="fa fa-star checked" style={{ color: '#FFD27D' }} />
            {' '}
            {menuItem.rating}
          </div>
          <div className="col-7 text-end">
            {` ${format.priceFormatter(menuItem.price)}`}
          </div>
        </div>
        <Link to={`/menu/${menuItem.id}`} className="w-100 btn mt-2 bg-info">See detail</Link>
      </div>
    </div>
  );
}
