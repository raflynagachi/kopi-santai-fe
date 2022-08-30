import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormWrapper from '../Components/Form/FormWrapper';
import { API, helpers } from '../Utils/API';
import Toast from '../Components/Toast';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    const requestBody = {
      fullName: dataForm.fullName.value,
      phone: dataForm.phone.value,
      address: dataForm.address.value,
      email: dataForm.email.value,
      password: dataForm.password.value,
    };

    const requestOpt = helpers.requestOptions(requestBody, 'POST');
    fetch(API.Register, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          localStorage.setItem('token', result.data.token);
          navigate('/');
          window.location.reload();
        } else {
          setError(result);
          setShowToast(true);
        }
      })
      .catch((err) => {
        setError(err);
        setShowToast(true);
      });
  };

  return (
    <div className="container-fluid justify-content-center" style={{ maxWidth: '500px' }}>
      {error && <Toast show={showToast} setShow={setShowToast} message={error.message} />}
      <FormWrapper title="Register">
        <form onSubmit={handleSubmitRegister}>
          <input id="fullName" className="form-control my-3" type="text" placeholder="full name" required />
          <input id="phone" className="form-control my-3" type="tel" pattern="[+]*[0-9]{8,13}" placeholder="phone" required />
          <textarea id="address" className="form-control my-3" placeholder="address" required />
          <input id="email" className="form-control my-3" type="email" placeholder="email" required />
          <input id="password" className="form-control my-3" type="password" placeholder="password" required />
          <button type="submit" className="btn btn-primary w-100 my-2">Register</button>
        </form>
      </FormWrapper>
    </div>
  );
}
