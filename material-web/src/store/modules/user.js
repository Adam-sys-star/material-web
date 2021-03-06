import { loginByUsername, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const user = {
// const emp = {
  state: {
    // user: '',
    // status: '',
    // username: '',
    // code: '',
    // uid: undefined,
    // auth_type: '',
    // token: Cookies.get('Admin-Token'),
    // name: '',
    // avatar: '',
    // introduction: '',
    // roles: [],
    // setting: {
    //   articlePlatform: []
    // }
	id: '',
	empName: '',
	empSex: '',
	empBirthday: '',
	empRole: '',
	empTelp: '',
	empJoinDate: '',
	roles: [],
	token: Cookies.get('Admin-Token'),
	status: '',
	code: '',
	auth_type: '',
	name: '',
  },

  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
	
	//设置员工信息
	SET_ID : (state,id) => {
		state.id = id;
	},
	SET_EMPNAME : (state,empName) => {
		state.empName = empName;
	},
	SET_EMPSEX : (state,empSex) => {
		state.empSex = empSex;
	},
	SET_EMPBIRTHDAY : (state,empBirthday) => {
		state.empBirthday = empBirthday;
	},
	SET_EMPROLE : (state,empRole) => {
		state.empRole = empRole;
	},
	SET_EMPTELP : (state,empTelp) => {
		state.empTelp = empTelp;
	},
	SET_EMPJOINDATE : (state,empJoinDate) => {
		state.empJoinDate = empJoinDate;
	}
	
  },

  actions: {
    // 用户名登录
    loginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data;
          console.log(response.data);
          Cookies.set('Admin-Token', response.data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_EMPNAME', data.empName);
		  
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
		  
		  // console.log(data);
          // commit('SET_ROLES', data.roles);
          // commit('SET_NAME', data.name);
          // commit('SET_AVATAR', data.avatar);
          // commit('SET_UID', data.uid);
          // commit('SET_INTRODUCTION', data.introduction);
		  commit('SET_ID', data.id);
		  commit('SET_EMPSEX', data.empSex);
		  commit('SET_EMPBIRTHDAY', data.empBirthday);
		  commit('SET_ROLES', data.empRole);
		  commit('SET_EMPTELP', data.empTelp);
		  commit('SET_EMPJOINDATE', data.empJoinDate);
		  commit('SET_EMPNAME', data.empName);
		  
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.username, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('Admin-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
		  //去除user的token与roles属性
          commit('SET_TOKEN', '');
          commit('SET_ROLES', '');
		  //去除Cookie中的token
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        alert("has logout");
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      })
    }
  }
};

export default user;
