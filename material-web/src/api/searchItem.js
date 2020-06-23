import fetch from 'utils/fetch'

export function searchItem(pageNO,itemClass,itemName){
	
	return fetch({
		url:'/material/item/searchItem',
		method:'get',
		params:{pageNO,itemClass,itemName}
	});
	
}


export function search(keyWord){
	
	return fetch({
		url:'/material/item/search',
		method:'get',
		params:{keyWord}
	});
	
}
