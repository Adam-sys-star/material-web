import fetch from 'utils/fetch';

export function dealOrder(empdata,itemData){
	const data={
		// 左边参数要与后端相同
		employeeId:empdata,
		orderReqList:itemData
	}
	console.log("1111111",data);

	return fetch({
	  url: '/material/order/dealOrderReq',
	  method: 'post',
	  data

	});
}

export function getAllOrder(){
	return fetch({
	  url: '/material/order/findAllOrder',
	  method: 'get'

	});
}