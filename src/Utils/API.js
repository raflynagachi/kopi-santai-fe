import jwt from 'jwt-decode';

const baseUrl = 'http://localhost:8080';

export const helpers = {
  requestOptions: (dataObj, method, token) => ({
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(dataObj),
  }),
  isValidToken: (token) => {
    if (token === '' || token === null) return false;
    const decodedToken = jwt(token);
    const dateNow = new Date();

    return decodedToken.exp * 1000 > dateNow.getTime();
  },
  queryParamMenuToString: (q) => (
    `?category=${q.category ? q.category : ''}&sortBy=${q.sortBy ? q.sortBy : ''}&sort=${q.sort ? q.sort : ''}&search=${q.search ? q.search : ''}`
  ),
  queryParamOrderToString: (q) => (
    `?${q.date ? `date=${q.date}` : ''}${q.limit ? `&limit=${q.limit}` : ''}${q.page ? `&page=${q.page}` : ''}`
  ),
};

export function API() { }

API.Login = `${baseUrl}/login`;
API.Register = `${baseUrl}/register`;
API.Menus = `${baseUrl}/menus`;
API.Users = `${baseUrl}/users`;
API.OrderItems = `${baseUrl}/order-items`;
API.Orders = `${baseUrl}/orders`;
API.InternalOrders = `${baseUrl}/internal/orders`;
API.InternalMenus = `${baseUrl}/internal/menus`;
API.InternalCoupons = `${baseUrl}/internal/coupons`;
API.InternalPromotions = `${baseUrl}/internal/promotions`;
API.Reviews = `${baseUrl}/reviews`;
API.Coupons = `${baseUrl}/coupons`;
API.Games = `${baseUrl}/games`;
API.GamePrize = `${baseUrl}/game-prize`;
API.Promotions = `${baseUrl}/promotions`;
API.Deliveries = `${baseUrl}/deliveries`;
API.PaymentOpt = `${baseUrl}/payment-options`;
API.Categories = `${baseUrl}/categories`;

API.RandomQuiz = 'https://the-trivia-api.com/api/questions?limit=1&difficulty=easy';
