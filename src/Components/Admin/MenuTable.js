import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import format from '../../Utils/Format';
import Modal from '../Modal';
import MenuForm from './MenuForm';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';

export default function MenuTable({ menus }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastEditSuccess, setShowToastEditSuccess] = useState(false);
  const [showToastDeleteSuccess, setShowToastDeleteSuccess] = useState(false);
  const token = localStorage.getItem('token');
  const [showModalEditMenu, setShowModalEditMenu] = useState(false);
  const [menu, setMenu] = useState({});

  const editMenu = (m) => {
    setShowModalEditMenu(true);
    setMenu(m);
  };

  const viewReviews = (m) => {
    navigate(`/internal/menu/${m.id}/review`);
  };

  const deleteMenu = (menuID) => {
    const url = `${API.Menus}/${menuID}`;
    const requestOpt = helpers.requestOptions(null, 'DELETE', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowToastDeleteSuccess(true);
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

  const submitEditMenu = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      alert('unauthorized');
      localStorage.setItem('token', '');
      navigate('/login');
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

    const menuID = parseInt(dataForm.id.value, 10);
    const url = `${API.Menus}/${menuID}`;
    const requestOpt = helpers.requestOptions(requestBody, 'PATCH', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setShowModalEditMenu(false);
          setShowToastEditSuccess(true);
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
    <div className="container">
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <Toast show={showToastEditSuccess} setShow={setShowToastEditSuccess} message="Menu edited successfully" />
      <Toast show={showToastDeleteSuccess} setShow={setShowToastDeleteSuccess} message="Menu deleted successfully" />
      {showModalEditMenu && <Modal show={showModalEditMenu} setShow={setShowModalEditMenu} title="Update Menu"><MenuForm menu={menu} handleSubmit={submitEditMenu} /></Modal>}
      <table className="table table-bordered">
        <thead className="text-center bg-info">
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Category</td>
            <td>Price</td>
            <td>Image</td>
            <td>Rating</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
          menus
            ? menus.map((item, idx) => (
              <tr key={item.id} style={{ backgroundColor: !item.deletedAt ? '#fff' : '#eee' }}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.categoryName}</td>
                <td className="text-end">{`${format.priceFormatter(item.price)}`}</td>
                <td className="text-center"><img style={{ width: '100px', height: '100px', borderRadius: '25%' }} src={format.displayByteImage(item.image)} alt="menu" /></td>
                <td>{item.rating}</td>
                <td className="d-flex flex-column">
                  {
                    !item.deletedAt
                    && (
                    <div>
                      <button type="button" className="btn mx-1 p-1" style={{ backgroundColor: '#fff985', width: '6em' }} onClick={() => { editMenu(item); }}>Edit</button>
                      <button type="button" className="btn mx-1 p-1" style={{ backgroundColor: '#ff6e6e', width: '6em' }} onClick={() => { deleteMenu(item.id); }}>Delete</button>
                    </div>
                    )
                  }
                  <div>
                    <button type="button" className="btn m-1 p-1" style={{ backgroundColor: '#ccc', width: '6em' }} onClick={() => { viewReviews(item); }}>Reviews</button>
                  </div>
                </td>
              </tr>
            ))
            : (
              <tr>
                <td colSpan={7} className="text-center">No menus</td>
              </tr>
            )
        }
        </tbody>
      </table>
    </div>
  );
}
