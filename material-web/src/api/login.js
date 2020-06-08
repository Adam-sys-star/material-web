import fetch from 'utils/fetch';

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  };
  return fetch({
    url: '/material/user/login',
    method: 'post',
    data
  });
}

export function logout(token) {
  return fetch({
    url: '/material/user/logout',
    method: 'get',
    params: { token }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/material/user/info',
    method: 'get',
    params: { token }
  });
}

