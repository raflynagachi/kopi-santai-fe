import format from '../../Utils/Format';

export default function PromotionTable({ promotions }) {
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Description</td>
            <td>Image</td>
            <td>Min Spent</td>
            <td>Coupon</td>
            <td>Discount Amount</td>
            <td>Is Available</td>
          </tr>
        </thead>
        {
          promotions
            ? promotions.map((item, idx) => (
              <tbody>
                <tr key={item.id} style={{ backgroundColor: item.coupon.deletedAt ? '#ddd' : '#fff' }}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td><img style={{ width: '100px', height: '100px' }} src={format.displayByteImage(item.image)} alt="promo" /></td>
                  <td>{item.minSpent}</td>
                  <td>{item.coupon.name}</td>
                  <td>{`${item.coupon.amount}%`}</td>
                  {
                  item.coupon.deletedAt
                    ? <td style={{ backgroundColor: '#ddd' }}>Non-Active</td>
                    : <td>Active</td>
                }
                </tr>
              </tbody>
            ))
            : (
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center">No promotions</td>
                </tr>
              </tbody>
            )
        }
      </table>
    </div>
  );
}
