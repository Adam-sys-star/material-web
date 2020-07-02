import fetch from 'utils/fetch'


//遍历商品库存
export function selectAllRemain(remain,pageNO,pageSize){
	
	return fetch({
		url:'/material/repoRemain/selectAllRemain',
		method:'get',
		params:{"itemName":remain.itemName,"itemClassId":remain.itemClassId,"itemFactoryName":remain.itemFactoryName,
				"repoId":remain.repoId,"remainStatus":remain.remainStatus,"totalRemain":remain.totalRemain,
				"pageNO":pageNO,"pageSize":pageSize}
	});
	
}

//查询商品类别的库存
export function getClassRemain(classId){
	
	return fetch({
		url:'/material/repoRemain/getClassRemain',
		method:'get',
		params:{"classId":classId}
	});
	
}

//查询商品库存明细
export function selectRemainDetail(rd){
	
	const data = rd;
	
	return fetch({
		url:'/material/repoRemain/selectRemainDetail',
		method:'post',
		data
	});
	
}

//查询商品库存的批次和供应商
export function getTimesAndSup(id){
	
	return fetch({
		url:'/material/repoRemain/getTimesAndSup',
		method:'get',
		params:{"id":id}
	});
	
}
