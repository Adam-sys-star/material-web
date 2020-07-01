import fetch from 'utils/fetch'


//±È¿˙…Ã∆∑ø‚¥Ê
export function selectAllRemain(remain,pageNO,pageSize){
	
	return fetch({
		url:'/material/repoRemain/selectAllRemain',
		method:'get',
		params:{"itemName":remain.itemName,"itemClassId":remain.itemClassId,"itemFactoryName":remain.itemFactoryName,
				"repoId":remain.repoId,"remainStatus":remain.remainStatus,"totalRemain":remain.totalRemain,
				"pageNO":pageNO,"pageSize":pageSize}
	});
	
}