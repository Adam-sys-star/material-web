<template>
	<div>
		 <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
		        <FormItem prop="itemId">
		            <Input type="text" v-model="formInline.itemId" placeholder="货号">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="itemName">
		            <Input type="text" v-model="formInline.itemName" placeholder="商品名">
		                <Icon type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem>
		            <Button type="primary" @click="handleSubmit(formInline)">查询</Button>
		        </FormItem>
		    </Form>
		<Table border :columns="columns7" :data="data6"></Table>
		<Page :total="totalRecords" :page-size="pageSize" show-elevator @on-change="onchange" />
	</div>
    
</template>
<script>
	import {getOrderResp} from '../../api/order.js'
	import {getOrderRespByExample} from '../../api/order.js'
    export default {
        data () {
            return {
				formInline: {
				                    itemId: '',
				                    itemName: ''
				                },
				               /* ruleInline: {
				                    itemIs: [
				                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
				                    ],
				                    itemName: [
				                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
				                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
				                    ]
				                }, */
                columns7: [
                    {
                        title: '货号',
                        key: 'id',
                        /* render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        } */
                    },
					{
					    title: '商品名称',
					    key: 'itemName'
					},
					{
					    title: '商品规格',
					    key: 'itemSpec'
					},
					{
					    title: '最近价格',
					    key: 'itemLatelyPrice'
					},
					{
					    title: '采购数量',
					    key: 'orderNumber'
					}/* ,
					{
					    title: '到货数量',
					    key: 'arriveNumber'
					} */,
					{
					    title: '生产厂家名称',
					    key: 'itemFactoryName'
					},
					{
					    title: '供货商',
					    key: 'supplierName'
					}/* ,
                   
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
                    } */
                ],
                data6: [
                    
                ],
				totalRecords:{},
				pageSize:5
				
            }
        },
        methods: {
			onchange(currentPage){
				/* console.log("currentpage",currentPage);
				//将数组置空
				this.data6=[];
				
				// this.pageNo = currentPage; */
				
				getOrderResp(currentPage).then(res=>{
					
					
						/* // let tmp=(currentPage-1)*res.data.pageSize;
							
						for(let tmp=(currentPage-1)*res.data.pageSize;tmp<=((currentPage*res.data.pageSize)-1);tmp++){
							this.data6.push(res.data.data[tmp]);
						}
						console.log("////////////////",this.data6); */
						this.data6=res.data.pagedList;
						
					
				}).catch(err=>{
					console.log(err);
				})
				
			},
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
			handleSubmit(obj) {
				/* //将数组置空
				this.data6=[]; */
			                getOrderRespByExample(obj.itemId,obj.itemName).then(res=>{
								/* this.totalRecords=res.data.data.length;
								for(let i=0;i<res.data.pageSize;i++){
									this.data6.push(res.data.data[i]);
								} */
								// this.data6=res.data;
								this.totalRecords=res.data.total;
								this.data6=res.data.pagedList;
							}).catch(err=>{
								console.log(err);
								alert("填写的字段搜索不到数据")
								
							})
			            }
        },
		created:function(){
			getOrderResp().then(res=>{
				/* console.log("resresresres",res);
				// this.data6=res.data.list;
				
				for(let i=0;i<res.data.pageSize;i++){
					this.data6.push(res.data.data[i]);
				}
				console.log("thiisiiiii",this.data6)
				this.totalRecords=res.data.data.length; */
				this.totalRecords=res.data.total;
				this.data6=res.data.pagedList;
			}).catch(err=>{
				console.log(err);
			})
		}
    }
</script>