import jwt from 'jwt-decode';

const baseUrl = 'http://localhost:8080';
const loginPage = 'http://localhost:3000/login';

export const helpers = {
  requestOptions: (dataObj, method, token) => ({
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(dataObj),
  }),
  isValidToken: (token) => {
    if (token === '') return false;
    const decodedToken = jwt(token);
    const dateNow = new Date();

    return decodedToken.exp > dateNow.getTime();
  },
  logout: () => {
    localStorage.setItem('token', '');
    window.open(loginPage, '_self');
    window.location.reload();
  },
  queryParamMenuToString: (q) => (
    `?category=${q.category ? q.category : ''}&sortBy=${q.sortBy ? q.sortBy : ''}&sort=${q.sort ? q.sort : ''}&search=${q.search ? q.search : ''}`
  ),
};

export function API() {}

API.Login = `${baseUrl}/login`;
API.Register = `${baseUrl}/register`;
API.Menus = `${baseUrl}/menus`;
API.Users = `${baseUrl}/users`;
API.OrderItems = `${baseUrl}/order-items`;
API.Orders = `${baseUrl}/orders`;
API.Reviews = `${baseUrl}/reviews`;
API.Coupons = `${baseUrl}/coupons`;
API.Games = `${baseUrl}/games`;
API.GamePrize = `${baseUrl}/game-prize`;
API.Promotions = `${baseUrl}/promotions`;
API.Deliveries = `${baseUrl}/deliveries`;
