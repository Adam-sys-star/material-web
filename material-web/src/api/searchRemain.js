import fetch from 'utils/fetch'


//������Ʒ���
export function selectAllRemain(remain,pageNO,pageSize){
	
	return fetch({
		url:'/material/repoRemain/selectAllRemain',
		method:'get',
		params:{"itemName":remain.itemName,"itemClassId":remain.itemClassId,"itemFactoryName":remain.itemFactoryName,
				"repoId":remain.repoId,"remainStatus":remain.remainStatus,"totalRemain":remain.totalRemain,
				"pageNO":pageNO,"pageSize":pageSize}
	});
	
}

//��ѯ��Ʒ���Ŀ��
export function getClassRemain(classId){
	
	return fetch({
		url:'/material/repoRemain/getClassRemain',
		method:'get',
		params:{"classId":classId}
	});
	
}