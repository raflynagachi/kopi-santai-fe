const baseUrl = 'http://localhost:8080';

export const helpers = {
  requestOptions: (dataObj, method) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataObj),
  }),
};

export function API() {}

API.Login = `${baseUrl}/login`;
API.Register = `${baseUrl}/register`;
