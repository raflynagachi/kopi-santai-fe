import { useEffect, useState } from 'react';
import { API, helpers } from '../../Utils/API';
import useFetch from '../../Hooks/useFetch';
import MenuCard from './MenuCard';
import Toast from '../Toast';
import Loading from '../Loading';
import FilterButton from './FilterMenu';

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryParam, setQueryParam] = useState({});

  const menuRes = useFetch(API.Menus + helpers.queryParamMenuToString(queryParam));

  const handleChangeQueryParam = (event) => {
    setQueryParam({
      ...queryParam,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    setMenu(menuRes.data.data);
    setLoading(menuRes.loading);
    setError(menuRes.error);
  }, [menuRes]);

  if (error) {
    return (
      <Toast message={error} />
    );
  }

  return (
    loading ? <Loading /> : (
      <div className="container my-5">
        <h4 className="text-center">Our Menus</h4>
        <hr className="my-5" />
        <FilterButton queryParam={queryParam} handleChangeQueryParam={handleChangeQueryParam} />
        <div className="row d-flex align-items-center">
          {
          menu.length !== 0
            ? menu.map((item) => (
              <div className="col my-3">
                <MenuCard menuItem={item} />
              </div>
            )) : <div>No menu</div>
        }
        </div>
      </div>
    ));
}
