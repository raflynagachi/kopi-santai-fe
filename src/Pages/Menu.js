import { useEffect, useState } from 'react';
import Menu from '../Components/Menu/Menu';
import Toast from '../Components/Toast';
import useFetch from '../Hooks/useFetch';
import { API, helpers } from '../Utils/API';
import Loading from '../Components/Loading';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
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
    if (error) {
      setShowToast(true);
    }
  }, [error, menuRes]);

  return (
    <div className="container my-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <h4 className="text-center">Our Menus</h4>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
      <Menu
        menu={menu}
        queryParam={queryParam}
        handleChangeQueryParam={handleChangeQueryParam}
      />
      )}
    </div>
  );
}
