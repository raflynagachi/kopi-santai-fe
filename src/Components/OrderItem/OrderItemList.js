import OrderItemCard from './OrderItemCard';

export default function OrderItemList({ orderItems }) {
  return (
    <div className="list-group">
      {orderItems.length === 0 && <div className="list-group-item text-center">Order Items or Cart is empty</div>}
      {
          orderItems && orderItems.map((item) => (
            <OrderItemCard className="list-group-item" showButton orderItem={item} />
          ))
        }
    </div>
  );
}
