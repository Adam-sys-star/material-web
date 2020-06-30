import fetch from 'utils/fetch';

export function loadTurnoverData(params) {

	console.log("params", params)
	const data = params;
	return fetch({
		url: '/material/statistics/turnover',
		method: 'post',
		data
	});
}
export function loadBestsellerData(params) {

	console.log("params", params)
	const data = params;
	return fetch({
		url: '/material/statistics/bestseller',
		method: 'post',
		data
	});
}