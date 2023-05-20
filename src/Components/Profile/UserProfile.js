import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import format from '../../Utils/Format';
import EditFormProfile from './EditFormProfile';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Modal from '../Modal';
import userProfile from '../../Assets/userProfile.jpg';

export default function UserProfile({ data }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  const editProfile = () => {
    setShowModal(true);
  };

  const handleSubmitUserEdit = async (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (!helpers.isValidToken(token)) {
      localStorage.setItem('token', '');
      navigate('/unauthorized');
    }

    let base64 = dataForm.defaultProfilePicture.value;
    const file = dataForm.profilePicture.files[0];
    if (file) {
      base64 = await format.getBase64(file);
    }

    const requestBody = {
      fullName: dataForm.fullName.value,
      email: dataForm.email.value,
      password: dataForm.password.value,
      phone: dataForm.phone.value,
      address: dataForm.address.value,
      profilePicture: base64,
    };

    const userJWT = jwt(token);
    const url = `${API.Users}/${userJWT.user.id}`;
    const requestOpt = helpers.requestOptions(requestBody, 'PATCH', token);
    fetch(url, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          navigate('/profile');
          window.location.reload();
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container">
      {showModal && <Modal show={showModal} setShow={setShowModal} title="Edit Profile"><EditFormProfile user={data.user} handleSubmitUserEdit={handleSubmitUserEdit} /></Modal>}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <div className="row">
        <div className="col-sm-12 col-lg-4 d-flex justify-content-center">
          <img style={{ width: '200px', height: '200px' }} className="rounded-circle p-4" src={data.user.profilePicture ? format.displayByteImage(data.user.profilePicture) : format.displayByteImage(userProfile)} alt="profile" />
        </div>
        <div className="col-sm-12 col-lg-8">
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{data.user.fullName}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{data.user.phone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{data.user.email}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{data.user.address}</td>
              </tr>
            </tbody>
          </table>
          <button type="button" onClick={editProfile}>Edit profile</button>
        </div>
      </div>
    </div>
  );
}
