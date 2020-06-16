import fetch from 'utils/fetch';
//登录
export function loginByUsername(id , empTelp) {
  const data = {
    id,
    empTelp
  };
  return fetch({
    url: '/material/user/emplogin',
    method: 'post',
    data
  });
}
//退出登录
export function logout(token) {
  return fetch({
    url: '/material/user/logout',
    method: 'get',
    params: { token }
  });
}
//获取员工信息
export function getInfo(token) {
  return fetch({
    url: '/material/user/info',
    method: 'get',
    params: { token }
  });
}

