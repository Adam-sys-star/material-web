import Mock from 'mockjs';
import loginAPI from './login';


// 登录相关
Mock.mock(/\/material\/user\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/material\/user\/logout\.*/, 'get', loginAPI.logout);
Mock.mock(/\/material\/user\/info\.*/, 'get', loginAPI.getInfo)



export default Mock;
