import OrderItemCard from './OrderItemCard';

export default function OrderItemList({ orderItems }) {
  return (
    <div className="list-group w-100">
      {
          orderItems
            ? orderItems.map((item) => (
              <OrderItemCard className="list-group-item" orderItem={item} />
            ))
            : <div className="list-group-item">Order Items or Cart is empty</div>
        }
    </div>
  );
}
