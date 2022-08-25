import format from '../../Utils/Format';

export default function MenuCard({ menuItem }) {
  return (
    <div className="card mx-auto" style={{ width: '18rem' }}>
      <img className="card-img-top" style={{ height: '16rem' }} src={format.displayByteImage(menuItem.image)} alt="Card menu" />
      <div className="card-body">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{menuItem.name}</h5>
        <p style={{ fontSize: '0.75em' }} className="col-6">
          Category:
          {menuItem.categoryName}
        </p>
        <div className="card-text row">
          <div className="col-3">
            <span className="fa fa-star checked" />
            {' '}
            {menuItem.rating}
          </div>
          <div className="col-9 text-end">
            Rp
            {` ${menuItem.price}`}
          </div>
        </div>
        <a style={{ fontSize: '0.8em' }} href="1" className="btn btn-primary">Order</a>
      </div>
    </div>
  );
}
