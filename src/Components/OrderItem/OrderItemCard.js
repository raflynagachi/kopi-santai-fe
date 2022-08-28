import format from '../../Utils/Format';

export default function OrderItemCard({ orderItem }) {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center border my-2 rounded p-2">
      <img className="p-2 m-3 rounded border" style={{ width: '12rem', height: '12rem' }} src={format.displayByteImage(orderItem.menu.image)} alt="menu" />
      <div className="d-flex flex-column pt-4">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{orderItem.menu.name}</h5>
        <p style={{ fontSize: '0.75em' }} className="col-6">
          Category:
          {orderItem.menu.categoryName}
        </p>
        <div className="row w-100" style={{ fontSize: '0.8em' }}>
          <div className="col">
            <span className="fa fa-star checked" />
            {' '}
            {orderItem.menu.rating}
          </div>
          <div className="col text-start">
            <table className="table">
              <tbody>
                <tr>
                  <th>Price of menu</th>
                  <td>{`Rp.${orderItem.menu.price}`}</td>
                </tr>
                <tr>
                  <th>Quantity</th>
                  <td>{`${orderItem.quantity}`}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{`${orderItem.description}`}</td>
                </tr>
                <tr>
                  <th>Total price</th>
                  <td>{`Rp.${orderItem.menu.price * orderItem.quantity}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
