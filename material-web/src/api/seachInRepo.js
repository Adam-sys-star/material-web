import fetch from 'utils/fetch'

export function selectAllInRepo(inPepo){
	
	const data = inPepo;
	
	return fetch({
		url:'/material/InRepo/selectAllInRepo',
		method:'post',
		data
	});
	
}