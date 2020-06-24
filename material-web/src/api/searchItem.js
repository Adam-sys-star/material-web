import fetch from 'utils/fetch'

//遍历商品
export function searchItem(pageNO,itemClass,itemName){
	
	return fetch({
		url:'/material/item/searchItem',
		method:'get',
		params:{pageNO,itemClass,itemName}
	});
	
}

//获取商品类别
export function searchItemClass(){
	
	return fetch({
		url:'/material/item/getItemClass',
		method:'get',
	});
	
}


//通过关键词查找商品
export function search(keyWord){
	
	return fetch({
		url:'/material/item/search',
		method:'get',
		params:{keyWord}
	});
	
}
