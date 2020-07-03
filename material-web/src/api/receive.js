import fetch from 'utils/fetch';


export function getReceiveResp(pageNum){
	return fetch({
	  url:'/material/receive/findReceiveResp',
	  method:'get',
	  params:{pageNum}

	});
}

export function getReceiveDetailByReceiveId(receiveId,pageNum){
	return fetch({
		url:'/material/receive/findReceiveDetailByReceiveId',
		method:'get',
		params:{receiveId,pageNum}
	})
}
