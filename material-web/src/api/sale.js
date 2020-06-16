import fetch from 'utils/fetch';

export function getSaleList(startTime, endTime,key) {
	
  const data = {
    startTime, 
	endTime,
	key
  };
  console.log("data",data)
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
     params: { itemSaleId }
  });
}
