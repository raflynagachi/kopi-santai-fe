export default function FilterAllOrder({ handleChangeQueryParam }) {
  return (
    <div className="d-md-flex flex-row justify-content-between mb-4">
      <div className="d-flex flex-row align-items-center justify-content-around mb-2">
        <p className="my-0 me-2" style={{ whiteSpace: 'nowrap' }}>Show</p>
        <select
          className="form-select mx-2"
          aria-label="Default select example"
          id="date"
          onChange={handleChangeQueryParam}
        >
          <option value="">all</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
    </div>
  );
}
