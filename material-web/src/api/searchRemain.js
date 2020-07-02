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

//��ѯ��Ʒ�����ϸ
export function selectRemainDetail(rd){
	
	const data = rd;
	
	return fetch({
		url:'/material/repoRemain/selectRemainDetail',
		method:'post',
		data
	});
	
}

//��ѯ��Ʒ�������κ͹�Ӧ��
export function getTimesAndSup(id){
	
	return fetch({
		url:'/material/repoRemain/getTimesAndSup',
		method:'get',
		params:{"id":id}
	});
	
}
