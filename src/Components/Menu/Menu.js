import MenuCard from './MenuCard';
import FilterButton from './FilterMenu';

export default function Menu({
  menu, queryParam, handleChangeQueryParam,
}) {
  return (
    <div className="container my-5">
      <FilterButton queryParam={queryParam} handleChangeQueryParam={handleChangeQueryParam} />
      <div className="row d-flex align-items-center">
        {
          menu.length !== 0
            ? menu.map((item) => (
              <div key={item.id} className="col my-3">
                <MenuCard menuItem={item} />
              </div>
            )) : <div>No menu</div>
        }
      </div>
    </div>
  );
}
