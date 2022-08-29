export default function FilterOrder({ filter, handleChange }) {
  return (
    <div className="d-md-flex flex-row justify-content-between mb-4">
      <div className="d-flex flex-row align-items-center justify-content-around mb-2">
        <p className="my-0 me-4">Show</p>
        <select
          className="form-select"
          aria-label="Default select example"
          id="showBy"
          value={filter.showBy}
          onChange={handleChange}
          disabled
        >
          <option value="">All</option>
          <option value="coffee">Coffee</option>
          <option value="non-coffee">Non-Coffee</option>
          <option value="bread">Bread</option>
        </select>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-around">
        <p className="my-0 me-2" style={{ whiteSpace: 'nowrap' }}>Sort by</p>
        <select
          className="form-select mx-2"
          aria-label="Default select example"
          id="sortBy"
          value={filter.sortBy}
          onChange={handleChange}
        >
          <option value="id">Default</option>
          <option value="orderedDate">Date</option>
        </select>
        <select
          className="form-select mx-2"
          style={{ width: 'fit-content' }}
          aria-label="Default select example"
          id="sort"
          value={filter.sort}
          onChange={handleChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input type="text" className="form-control" id="keyword" onChange={handleChange} placeholder="type a keyword..." disabled />
      </div>
    </div>
  );
}
