import { useNavigate } from 'react-router-dom';
import FormWrapper from '../Components/Form/FormWrapper';
import { API, helpers } from '../Utils/API';

export default function Login({ setToken }) {
  const navigate = useNavigate();
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
          alert('Login successful');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate('/');
  };

  return (
    <FormWrapper title="Login">
      <form onSubmit={handleSubmitLogin}>
        <input id="email" className="form-control my-3" type="text" placeholder="email" required />
        <input id="password" className="form-control my-3" type="password" placeholder="password" required />
        <button type="submit" className="btn btn-primary w-100 my-2">Login</button>
      </form>
    </FormWrapper>
  );
}
