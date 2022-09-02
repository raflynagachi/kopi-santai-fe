import format from '../../Utils/Format';
import OrderItemCompletedCard from '../OrderItem/OrderItemCompletedCard';

export default function OrderCard({ order }) {
  return (
    <div className="border my-2 rounded p-2 mx-auto" style={{ backgroundColor: '#eee', fontSize: '0.9em' }}>
      <div className="row pt-4">
        <div className="col-4">
          <table className="table mx-2">
            <tbody>
              <tr>
                <td>Ordered Date</td>
                <td>{format.formatDate(order.orderedDate)}</td>
              </tr>
              <tr>
                <td>Coupon</td>
                <td>
                  {order.coupon
                    ? (
                      <p style={{ fontSize: '0.75em' }}>
                        {`Coupon: ${order.coupon.name} in percentage amount is ${order.coupon.amount}%`}
                      </p>
                    )
                    : <p>No coupon</p>}
                </td>
              </tr>
              <tr>
                <td>Delivery Status</td>
                <td>{order.delivery.status}</td>
              </tr>
              <tr>
                <td>Payment Option</td>
                <td>{order.paymentOption.name}</td>
              </tr>
              <tr>
                <td>Total Price</td>
                <td>
                  {
                    order.coupon
                    && (
                    <p style={{ textDecoration: 'line-through' }}>
                      {format.priceFormatter(
                        (order.totalPrice * 100) / (100 - order.coupon.amount),
                      )}
                    </p>
                    )
                  }
                  {format.priceFormatter(order.totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col" style={{ fontSize: '0.8em' }}>
          {
                order.orderItems && order.orderItems.map((item) => (
                  <OrderItemCompletedCard orderItem={item} />
                ))
              }
        </div>
      </div>
    </div>
  );
}
