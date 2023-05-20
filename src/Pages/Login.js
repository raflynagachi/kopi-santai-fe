import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import jwt from 'jwt-decode';
import FormWrapper from '../Components/Form/FormWrapper';
import { API, helpers } from '../Utils/API';
import Toast from '../Components/Toast';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const dataForm = e.target.elements;

    const requestBody = {
      email: dataForm.email.value,
      password: dataForm.password.value,
    };

    const requestOpt = helpers.requestOptions(requestBody, 'POST');
    fetch(API.Login, requestOpt)
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          localStorage.setItem('token', result.data.token);
          const { role } = jwt(result.data.token).user;
          if (role === 'USER') {
            navigate('/');
          }
          if (role === 'ADMIN') {
            navigate('/internal');
          }
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
      <FormWrapper title="Login">
        <form onSubmit={handleSubmitLogin}>
          <input id="email" className="form-control my-3" type="email" placeholder="email" required />
          <input id="password" className="form-control my-3" type="password" placeholder="password" required />
          <button type="submit" className="btn btn-primary w-100 my-2">Login</button>
        </form>
        <p>
          Not registered yet?
          <Link style={{ textDecoration: 'none' }} to="/register"> Register</Link>
        </p>
      </FormWrapper>
    </div>
  );
}
