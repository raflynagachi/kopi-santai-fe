import { useState } from 'react';
import format from '../../Utils/Format';
import Modal from '../Modal';

export default function MenuTable({ menus }) {
  const [showModalEditMenu, setShowModalEditMenu] = useState(false);

  const editMenu = () => {
    setShowModalEditMenu(true);
  };

  return (
    <div className="container">
      {showModalEditMenu && <Modal show={showModalEditMenu} setShow={setShowModalEditMenu} title="Update Menu">Halo</Modal>}
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
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.categoryName}</td>
                <td className="text-end">{`${format.priceFormatter(item.price)}`}</td>
                <td className="text-center"><img style={{ width: '100px', height: '100px', borderRadius: '25%' }} src={format.displayByteImage(item.image)} alt="menu" /></td>
                <td>{item.rating}</td>
                <td className="d-flex flex-column">
                  <button type="button" className="btn m-2" style={{ backgroundColor: '#fff985' }} onClick={() => { editMenu(); }}>Edit</button>
                  <button type="button" className="btn m-2" style={{ backgroundColor: '#ccff77' }}>Reviews</button>
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
