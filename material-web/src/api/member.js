import fetch from 'utils/fetch';


export function register(member) {

	const data = member;
	console.log("data", data)
	return fetch({
		url: '/material/member/register',
		method: 'post',
		data
	});
}

// 新建会员规则
export function createRule(memberClassName,memberClassDiscount) {
	const data = {
		memberClassName,
		memberClassDiscount
	};
	console.log("data", data)
	return fetch({
		url: '/material/member/create_rule',
		method: 'post',
		data
	});
}

// 删除会员规则
export function delRule(ruleId){
	const data = {
		ruleId
	};
	console.log("data", data)
	return fetch({
		url: '/material/member/del_rule',
		method: 'post',
		params:{ruleId}
	});
}

// 删除会员
export function delMember(memberTelp){
	const data = {
		memberTelp
	};
	console.log("data", data)
	return fetch({
		url: '/material/member/del_member',
		method: 'post',
		params:{memberTelp}
	});
}

//  获取会员规则
export function getMemberRule() {

	const data = {
		
	};
	console.log("data", data)
	return fetch({
		url: '/material/member/query_rule',
		method: 'get',
		data
	});
}

// 修改或新增会员
export function saveModify(modifyList){
	const data = modifyList;
	console.log("data", data)
	return fetch({
		url: '/material/member/saveModify',
		method: 'post',
		data
	});
}

// 获取会员列表
export function getMemberList(){
	const data = {};
	console.log("data", data)
	return fetch({
		url: '/material/member/query_member',
		method: 'get',
		data
	});
}

//  获取单个会员信息
export function getMemberInfo(memberTelp){
	const data = {};
	console.log("data", data)
	return fetch({
		url: '/material/member/query_one',
		method: 'get',
		params:{memberTelp}
	});
}

