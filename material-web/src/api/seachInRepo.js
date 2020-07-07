import fetch from 'utils/fetch'

export function selectAllInRepo(inPepo){
	const data = inPepo;
	return fetch({
		url:'/material/InRepo/selectAllInRepo',
		method:'post',
		data
	});
}


export function selectInRepoDetail(inPepo){
	const data = inPepo;
	return fetch({
		url:'/material/InRepo/selectInRepoDetail',
		method:'post',
		data
	});
}

export function addInRepositoryDetail(inPepoInfos){
	const data = inPepoInfos;
	return fetch({
		url:'/material/InRepo/addInRepositoryDetail',
		method:'post',
		data
	});
}
