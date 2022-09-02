import MenuCard from './MenuCard';
import FilterMenu from './FilterMenu';

export default function Menu({
  menu, queryParam, handleChangeQueryParam,
}) {
  return (
    <div className="container my-5">
      <FilterMenu queryParam={queryParam} handleChangeQueryParam={handleChangeQueryParam} />
      <div className="row justify-content-center">
        {
          menu
            ? menu.map((item) => (
              <div key={item.id} className="col col-sm-12 col-lg-4 col-xl-3 m-2">
                <MenuCard menuItem={item} />
              </div>
            )) : (<div className="text-center">No menu</div>)
        }
      </div>
    </div>
  );
}
