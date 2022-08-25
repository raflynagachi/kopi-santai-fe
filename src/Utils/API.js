const baseUrl = 'http://localhost:8080';

export const helpers = {
  requestOptions: (dataObj, method) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataObj),
  }),
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
