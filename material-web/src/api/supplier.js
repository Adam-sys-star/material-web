import fetch from 'utils/fetch';


export function getAllSuppliers(pageNum){
	return fetch({
	  url: '/material/supplier/findAllSuppliers',
	  method: 'get',
	  params:{pageNum}
	});
}

export function updateSupplierItem(supplierItem){
	const data=supplierItem;
	return fetch({
		url:'/material/supplier/updateInPrice',
		method:'post',
		data
	})
}