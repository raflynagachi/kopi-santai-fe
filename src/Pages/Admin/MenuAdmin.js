import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuTable from '../../Components/Admin/MenuTable';
import useFetch from '../../Hooks/useFetch';
import { API, helpers } from '../../Utils/API';
import Toast from '../../Components/Toast';
import Loading from '../../Components/Loading';
import FilterMenu from '../../Components/Menu/FilterMenu';
import Modal from '../../Components/Modal';
import MenuForm from '../../Components/Admin/MenuForm';
import format from '../../Utils/Format';

export default function MenuAdmin() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastCreateSuccess, setShowToastCreateSuccess] = useState(false);
  const [showModalCreateMenu, setShowModalCreateMenu] = useState(false);
  const [queryParam, setQueryParam] = useState({});
  const token = localStorage.getItem('token');

  const reqBody = { headers: { Authorization: `Bearer ${token}` } };
  const menuRes = useFetch(API.InternalMenus + helpers.queryParamMenuToString(queryParam), reqBody);

  const createMenu = () => {
    setShowModalCreateMenu(true);
  };

  const handleChangeQueryParam = (event) => {
    setQueryParam({
      ...queryParam,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    setMenus(menuRes.data.data);
    setLoading(menuRes.loading);
    setError(menuRes.error);
    if (error) {
      setShowToast(true);
    }
  }, [error, menuRes]);

  const submitCreateMenu = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    let base64 = dataForm.imageByte.value;
    const file = dataForm.image.files[0];
    if (file) {
      base64 = await format.getBase64(file);
    }

    const requestBody = {
      categoryID: parseInt(dataForm.categoryID.value, 10),
      name: dataForm.name.value,
      price: parseFloat(dataForm.price.value),
      image: base64,
    };

    const url = `${API.Menus}`;
    const requestOpt = helpers.requestOptions(requestBody, 'POST', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowModalCreateMenu(false);
          setShowToastCreateSuccess(true);
          setTimeout(() => { window.location.reload(); }, 1200);
        } else {
          setError(result);
          setShowToast(error);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container my-2">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastCreateSuccess} setShow={setShowToastCreateSuccess} message="Menu created successfully" />
      {showModalCreateMenu && <Modal show={showModalCreateMenu} setShow={setShowModalCreateMenu} title="Create Menu"><MenuForm handleSubmit={submitCreateMenu} /></Modal>}
      <h4 className="text-center">Menus Management</h4>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn m-2" style={{ backgroundColor: '#afffaf' }} onClick={() => { createMenu(); }}>Create Menu</button>
      </div>
      <hr className="my-5" />
      {loading && <Loading />}
      {!error && !loading && (
        <div>
          <FilterMenu
            queryParam={queryParam}
            handleChangeQueryParam={handleChangeQueryParam}
            isAdmin
          />
          <MenuTable menus={menus} />
        </div>
      )}
    </div>
  );
}
