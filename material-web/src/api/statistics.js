import fetch from 'utils/fetch';

export function loadTurnoverData(params) {

	console.log("params", params)
	return fetch({
		url: '/material/statistics/turnover',
		// method: 'get',
		method: 'post',
		
		data:params
	});
}