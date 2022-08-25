import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import format from '../../Utils/Format';
import EditProfile from './EditProfile';
import { API, helpers } from '../../Utils/API';
import Toast from '../Toast';
import Modal from '../Modal';

export default function UserProfile({ data }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  const editProfile = () => {
    setShowModal(true);
  };

  const handleSubmitUserEdit = (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    if (helpers.isValidToken(token)) {
      helpers.logout();
      navigate('/login');
    }

    const requestBody = {
      fullName: dataForm.fullName.value,
      email: dataForm.email.value,
      password: dataForm.password.value,
      phone: dataForm.phone.value,
      address: dataForm.address.value,
      profilePicture: dataForm.profilePicture.value,
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
    <div className="d-flex flex-row justify-content-center align-items-center">
      {showModal && <Modal show={showModal} setShow={setShowModal} title="Edit Profile"><EditProfile user={data.user} handleSubmitUserEdit={handleSubmitUserEdit} /></Modal>}
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <img style={{ width: '200px', height: '200px' }} className="rounded-circle p-4" src={format.displayByteImage(data.user.profilePicture)} alt="profile" />
      <div className="d-flex flex-column">
        <table>
          <tbody>
            <th>
              <tr>Name</tr>
              <tr>Phone</tr>
              <tr>Email</tr>
              <tr>Address</tr>
            </th>
            <th className="ps-4" style={{ fontWeight: 400 }}>
              <tr>{data.user.fullName}</tr>
              <tr>{data.user.phone}</tr>
              <tr>{data.user.email}</tr>
              <tr>{data.user.address}</tr>
            </th>
          </tbody>
        </table>
        <button type="button" onClick={editProfile}>Edit profile</button>
      </div>
    </div>
  );
}
