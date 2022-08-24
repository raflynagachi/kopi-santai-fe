import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormWrapper from '../Components/Form/FormWrapper';
import { API, helpers } from '../Utils/API';
import Toast from '../Components/Toast';

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
          setToken(result.data.token);
        }
      })
      .catch((err) => {
        setError(err);
      });
    navigate('/');
  };

  if (error) {
    return (
      <Toast message={error.message} />
    );
  }

  return (
    <div>
      <FormWrapper title="Login">
        <form onSubmit={handleSubmitLogin}>
          <input id="email" className="form-control my-3" type="text" placeholder="email" required />
          <input id="password" className="form-control my-3" type="password" placeholder="password" required />
          <button type="submit" className="btn btn-primary w-100 my-2">Login</button>
        </form>
      </FormWrapper>
    </div>
  );
}
