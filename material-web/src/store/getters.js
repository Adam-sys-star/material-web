const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  //之前原框架初始的用户信息
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // uid: state => state.user.uid,
  // username: state => state.user.username,
  // introduction: state => state.user.introduction,
  // auth_type: state => state.user.auth_type,
  // status: state => state.user.status,
  //roles: state => state.user.roles,
  // setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  siderbar_routers:state => state.permission.siderbar_routers,
  //员工的信息
  token: state => state.user.token,
  roles: state => state.user.roles,
  id: state => state.user.id,
  empName: state => state.user.empName,
  empSex: state => state.user.empSex,
  empBirthday: state => state.user.empBirthday,
  empRole: state => state.user.empRole,
  empTelp: state => state.user.empTelp,
  empJoinDate: state => state.user.empJoinDate,
  
};
export default getters
