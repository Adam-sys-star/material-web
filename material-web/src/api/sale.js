import fetch from 'utils/fetch';

export function getSaleList(startTime, endTime, key,backSaleState) {

	const data = {
		startTime,
		endTime,
		key,
		backSaleState
	};
	console.log("data", data)
	return fetch({
		url: '/material/item_sale/sale_list',
		method: 'post',
		data
	});
}

export function getSaleDetail(itemSaleId) {

	// console.log("data",data)
	return fetch({
		url: '/material/item_sale/detail',
		method: 'get',
		params: {
			itemSaleId
		}
	});
}

export function settlement(itemSale,itemData) {
	const data = {
		// 销售单信息
		itemSale: itemSale,
		itemSaleDetails: itemData

	};
	console.log(data);
	return fetch({
		url: '/material/item_sale/settlement',
		method: 'post',
		data
	});
}


export function backSake(id) {
	return fetch({
		url: '/material/item_sale/back_sale',
		method: 'post',
		params:{id}
	});
}

