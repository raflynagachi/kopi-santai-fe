export default function UserCoupons({ coupons }) {
  return (
    <div className="d-flex flex-column w-75 mx-auto my-4 justify-content-center align-items-center">
      <h3 className="mt-4 text-center">Your Coupons</h3>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Amount ( % )</th>
          </tr>
        </thead>
        <tbody>
          {
        coupons
          ? coupons.map((c, idx) => (
            <tr key={c.id}>
              <td>{idx + 1}</td>
              <td>{c.name}</td>
              <td>{`${c.amount}%`}</td>
            </tr>
          )) : <tr>No Coupons</tr>
      }
        </tbody>
      </table>
    </div>
  );
}
