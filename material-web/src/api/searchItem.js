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


//查询商品
export function selectItem(Iteminfo,pageNO,pageSize){
	
	return fetch({
		url:'/material/item/selectItem',
		method:'get',
		params:{"itemName":Iteminfo.itemName,"itemClassId":Iteminfo.itemClassId,
		"itemSalePrice1":Iteminfo.itemSalePrice1,"itemSalePrice2":Iteminfo.itemSalePrice2,
		"itemFactoryName":Iteminfo.itemFactoryName,"pageNO":pageNO,"pageSize":pageSize}
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
