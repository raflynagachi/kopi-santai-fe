import { useEffect, useState } from 'react';
import { API } from '../Utils/API';
import useFetch from '../Hooks/useFetch';
import MenuCard from './MenuCard';
import Toast from './Toast';
import Loading from './Loading';

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRes = useFetch(API.Menus);

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
