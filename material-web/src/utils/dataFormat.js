/*@author: Duan xiaoping*/
// 数据格式化
import Vue from 'vue';
// 时间格式化
export function formatDate(date, fmt) {
	let o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'S': date.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}
// 通过已知数组转换为符合自己要求的数组
export function arrayReCreate(oldArr, attrMap) {
	var newArr = [];
	// attrMap 样例[新数组属性，旧数组属性]
	// const map = new Map([
	// 	['salePrice', 'itemSalePrice'],
	// 	['saleNumber', "count"],
	// 	['saleAfterDiscount', 'saleAfterDiscount'],
	// 	['saleDiscountAmount', 'saleDiscountAmount'],
	// 	['totalAmount', 'totalAmount'],
	// 	["itemId", 'id']
	// ]);
	for (var i = 0; i < oldArr.length; i++) {
		var obj = {};
		attrMap.forEach(function(value, index) {
			// console.log(index + ': ' + value);
			Vue.set(obj, index, oldArr[i][value]);
		});
		newArr.push(obj)
	}
	console.log("newArr", newArr)
	return newArr;
}
