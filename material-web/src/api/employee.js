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
export function findEmpById(id){

	return fetch({
	  url: '/material/emp/findEmpById',
	  method: 'get',
	  params:{id}

	});
}

export function addEmp(emp){
	const data = emp;
	
	return fetch({
	  url: '/material/emp/addEmp',
	  method: 'post',
	  data
	
	});
}
export function updateEmp(emp){
	const data = emp;
	
	return fetch({
	  url: '/material/emp/updateEmp',
	  method: 'post',
	  data
	
	});
}