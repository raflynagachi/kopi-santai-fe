import FormWrapper from '../Components/Form/FormWrapper';
import { API, helpers } from '../Utils/API';

export default function Login({ setToken }) {
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
        console.log(err.message);
      });
  };

  return (
    <FormWrapper title="Login">
      <form onSubmit={handleSubmitLogin}>
        <input id="email" className="form-control" type="text" placeholder="email" required />
        <input id="password" className="form-control" type="password" placeholder="password" required />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </FormWrapper>
  );
}
