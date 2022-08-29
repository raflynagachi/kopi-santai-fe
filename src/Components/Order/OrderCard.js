import OrderItemCard from '../OrderItem/OrderItemCard';
import format from '../../Utils/Format';

export default function OrderCard({ order }) {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center border my-2 rounded p-2" style={{ backgroundColor: '#eee' }}>
      <div className="d-flex flex-column pt-4 w-100">
        <h5 style={{ fontSize: '0.9em' }} className="card-title">{`Ordered Date: ${format.formatDate(order.orderedDate)}`}</h5>
        {order.coupon
        && (
        <p style={{ fontSize: '0.75em' }} className="col-6">
          {`Coupon: ${order.coupon.name} in percentage amount is ${order.coupon.amount}%`}
        </p>
        )}
        <div className="row w-100 d-flex justify-content-center" style={{ fontSize: '0.8em' }}>
          <div className="col-12">
            {`Delivery Status: ${order.delivery.status}`}
          </div>
          <div className="col-12">
            {`Payment Option: ${order.paymentOption.name}`}
          </div>
          <div className="col-12">
            {`Total Price: ${format.priceFormatter(order.totalPrice)}`}
          </div>
          <div className="col-10 text-start">
            <div className="justify-content-center">
              {
                order.orderItems && order.orderItems.map((item) => (
                  <OrderItemCard showCreateReview orderItem={item} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
