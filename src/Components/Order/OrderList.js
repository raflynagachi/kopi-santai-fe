import OrderCard from './OrderCard';

export default function OrderList({ orders }) {
  return (
    <div className="list-group w-100">
      {
        orders
          ? orders.map((item) => (
            <OrderCard className="list-group-item" order={item} />
          ))
          : <div className="list-group-item">Order Items or Cart is empty</div>
      }
    </div>
  );
}
