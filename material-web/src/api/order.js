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



export function findSupplierNameByItemId(itemId){
	return fetch({
		url: '/material/order/findSupplierNameByItemId',
		method: 'get',
		params:{itemId}
	})
}

export function findInPriceByItemIdAndSupplierName(itemId,supplierName){
	return fetch({
		url:'/material/order/findInPriceByItemIdAndSupplierName',
		method:'get',
		params:{itemId,supplierName}
	})
}

export function getOrderResp(pageNum){
	return fetch({
		// url:'/material/order/backOrderRespByPage',
		url:'/material/order/backOrderRespsByPageSql',
		method:'get',
		params:{pageNum}
	})
}

export function getOrderRespByExample(itemId, itemName,pageNum){
	return fetch({
		url:'/material/order/findOrderRespByExample',
		method:'get',
		params:{itemId,itemName,pageNum}
	})
}

export function getAllOrder(pageNum){
	return fetch({
	  // url: '/material/order/findAllOrder',
	  url: '/material/order/findAllNewOrderRespBySql',
	  method: 'get',
	  params:{pageNum}

	});
}

export function getOrderDetailRespByOrderId(orderId,pageNum){
	return fetch({
		// url:'/material/order/findOrderDetailRespByOrderId',
		url:'/material/order/findOrderDetailRespByOrderIdSqL',
		method:'get',
		params:{orderId,pageNum}
	})
}