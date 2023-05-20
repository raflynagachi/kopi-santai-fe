export default function ReviewTable({ reviews }) {
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>Email</td>
            <td>Description</td>
            <td>Rating</td>
          </tr>
        </thead>
        {
          reviews
            ? reviews.map((item, idx) => (
              <tbody>
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.description}</td>
                  <td>
                    <span className="fa fa-star checked" style={{ color: '#FFD27D' }} />
                    {' '}
                    {item.rating}
                  </td>
                </tr>
              </tbody>
            ))
            : (
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center">No reviews</td>
                </tr>
              </tbody>
            )
        }
      </table>
    </div>
  );
}
