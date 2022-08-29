import format from '../../Utils/Format';

export default function MenuTable({ menus }) {
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Category</td>
            <td>Price</td>
            <td>Image</td>
            <td>Rating</td>
          </tr>
        </thead>
        <tbody>
          {
          menus
            ? menus.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.categoryName}</td>
                <td className="text-end">{`${format.priceFormatter(item.price)}`}</td>
                <td className="text-center"><img style={{ width: '100px', height: '100px', borderRadius: '25%' }} src={format.displayByteImage(item.image)} alt="menu" /></td>
                <td>{item.rating}</td>
              </tr>
            ))
            : (
              <tr>
                <td colSpan={6}>No menus</td>
              </tr>
            )
        }
        </tbody>
      </table>
    </div>
  );
}
