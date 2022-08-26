import './Menu.css';

export default function FilterMenu({
  queryParam, handleChangeQueryParam,
}) {
  return (
    <div className="d-md-flex flex-row justify-content-between mb-4">
      <div className="d-flex flex-row align-items-center justify-content-around mb-2">
        <p className="my-0 me-2" style={{ whiteSpace: 'nowrap' }}>Show</p>
        <select
          className="form-select mx-2"
          aria-label="Default select example"
          id="category"
          value={queryParam.category}
          onChange={handleChangeQueryParam}
        >
          <option value="">all</option>
          <option value="coffee">coffee</option>
          <option value="non-coffee">non-coffee</option>
          <option value="bread">bread</option>
        </select>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-around">
        <p className="my-0 me-1" style={{ whiteSpace: 'nowrap' }}>Sort by</p>
        <select
          className="form-select me-2"
          aria-label="Default select example"
          id="sortBy"
          value={queryParam.sortBy}
          onChange={handleChangeQueryParam}
        >
          <option value="">default</option>
          <option value="price">price</option>
        </select>
        <select
          className="form-select mx-2"
          style={{ width: 'fit-content' }}
          aria-label="Default select example"
          id="sort"
          value={queryParam.sort}
          onChange={handleChangeQueryParam}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input type="text" className="searchInput form-control" id="search" placeholder="type a keyword.." onChange={handleChangeQueryParam} />
      </div>
    </div>
  );
}
