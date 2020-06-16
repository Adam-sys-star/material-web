import fetch from 'utils/fetch';


export function getAllEmp(){
	return fetch({
	  url: '/material/emp/findAllEmp',
	  method: 'get',

	});
}

export function deleteById(id){

	return fetch({
	  url: '/material/emp/deleteEmpById',
	  method: 'get',
	  params:{id}

	});
}
