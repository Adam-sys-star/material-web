import fetch from 'utils/fetch';

export function dealOrder(empdata,itemData){
	const data={
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