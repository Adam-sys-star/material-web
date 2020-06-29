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

//添加商品
export function addItem(item){
	const data = item;
	return fetch({
		url:'/material/item/addItem',
		method:'post',
		data
	});
	
}

//修改商品
export function updateItem(item){
	const data = item;
	return fetch({
		url:'/material/item/updateItem',
		method:'post',
		data
	});
}

//删除商品
export function deleteItem(itemid){
	return fetch({
		url:'/material/item/deleteItem',
		method:'post',
		params:{itemid}
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

//通过主键查找商品
export function searchItemById(id){
	return fetch({
		url:'/material/item/searchItemById',
		method:'post',
		params:{id}
	});
}