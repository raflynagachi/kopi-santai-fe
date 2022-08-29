import format from '../../Utils/Format';

export default function OrderTable({ orders }) {
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>UserID</td>
            <td>Coupon</td>
            <td>Ordered Date</td>
            <td>Total Price</td>
            <td>Payment Option</td>
            <td>Delivery Status</td>
          </tr>
        </thead>
        <tbody>
          {
          orders
            ? orders.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.userID}</td>
                {
                  item.couponID === 0
                    ? <td style={{ backgroundColor: '#ddd' }}>No coupon</td>
                    : <td>{item.coupon.name}</td>
                }
                <td>{format.formatDate(item.orderedDate)}</td>
                <td className="text-end">{`${format.priceFormatter(item.totalPrice)}`}</td>
                <td>{item.paymentOption.name}</td>
                <td>{item.delivery.status}</td>
              </tr>
            ))
            : (
              <tr>
                <td colSpan={7}>No orders</td>
              </tr>
            )
        }
        </tbody>
      </table>
    </div>
  );
}
