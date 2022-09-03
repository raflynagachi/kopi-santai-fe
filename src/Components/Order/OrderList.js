import OrderCard from './OrderCard';

export default function OrderList({ orders }) {
  return (
    <div className="list-group">
      {
        orders && orders.length !== 0
          ? orders.map((item) => (
            <OrderCard className="list-group-item" order={item} />
          ))
          : <div className="list-group-item text-center">Orders is empty</div>
      }
    </div>
  );
}
