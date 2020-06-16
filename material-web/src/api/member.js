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

export function saveModify(modifyList){
	const data = modifyList;
	console.log("data", data)
	return fetch({
		url: '/material/member/saveModify',
		method: 'post',
		data
	});
}

export function getMemberList(){
	const data = {};
	console.log("data", data)
	return fetch({
		url: '/material/member/query_member',
		method: 'get',
		data
	});
}

export function getMemberInfo(memberTelp){
	const data = {};
	console.log("data", data)
	return fetch({
		url: '/material/member/query_one',
		method: 'get',
		params:{memberTelp}
	});
}

