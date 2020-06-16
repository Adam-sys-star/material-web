<template>
    <Table border :columns="columns7" :data="data6"></Table>
</template>
<script>
	import {getAllEmp} from '../../api/employee.js'
	import {deleteById} from '../../api/employee.js'
    export default {
        data () {
            return {
                columns7: [
					{
					    title: '工号',
					    key: 'id',
					   
					},
                    {
                        title: '员工姓名',
                        key: 'empName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.empName)
                            ]);
                        }
                    },
					{
					    title: '员工性别',
					    key: 'empSex',
					   
					},
					{
					    title: '职务',
					    key: 'empRole',
					   
					},
                    {
                        title: '出生日期',
                        key: 'empBirthday'
                    },
                    {
                        title: '联系方式',
                        key: 'empTelp'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
						id:'',
						empName:'',
						empSex:'',
						empRole:'',
						empBirthday:'',
						empTelp:''
						
						
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].empName}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                 // this.data6.splice(index, 1);
				deleteById(this.data6[index].id);
				
				}
            },
			created:function(){
								getAllEmp().then((response)=>{
								
									console.log("aaaaaaaaaaaaaaaaaa",response.data);
									this.data6=response.data;
									console.log(response);
									}).catch(function(err){console.log(err)})
							}
        }
</script>
