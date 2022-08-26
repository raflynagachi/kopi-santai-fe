import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import format from '../Utils/Format';
import { API } from '../Utils/API';
import Toast from '../Components/Toast';
import Loading from '../Components/Loading';

export default function MenuDetail() {
  const [menuItem, setMenuItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const params = useParams();

  useEffect(() => {
    const url = `${API.Menus}/${params.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setMenuItem(result.data);
          setLoading(result.loading);
          setError(result.error);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {!error && !loading && menuItem
        && (
        <div className="card mx-auto mb-4" style={{ width: '24rem' }}>
          {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
          <img className="card-img-top" style={{ height: '18rem' }} src={format.displayByteImage(menuItem.menu.image)} alt="Card menu" />
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <h5 style={{ fontSize: '0.9em' }} className="card-title">{menuItem.menu.name}</h5>
                <p style={{ fontSize: '0.75em' }} className="col-6">
                  Category:
                  {menuItem.menu.categoryName}
                </p>
              </div>
              <div className="col-4 d-flex h-75 justify-content-end">
                <button type="button" style={{ fontSize: '0.8em', backgroundColor: '#ffd294' }} className="w-100 rounded">Order</button>
              </div>
            </div>
            <div className="card-text row">
              <div className="col-3">
                <span className="fa fa-star checked" />
                {' '}
                {menuItem.menu.rating}
              </div>
              <div className="col-9 text-end">
                Rp
                {` ${menuItem.menu.price}`}
              </div>
            </div>
            <div className="card-text row">
              <div className="col text-center">
                <h5>Menu Options</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Menu Option</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                  menuItem.menuOptions
                    ? menuItem.menuOptions.map((menuOpt) => (
                      <tr>
                        <td>{menuOpt.typeMenuOption}</td>
                        <td>{menuOpt.name}</td>
                      </tr>
                    ))
                    : <tr><td colSpan={2}>No menu option</td></tr>
                }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}
