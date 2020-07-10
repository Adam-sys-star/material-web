<template>
	<div>
		 <Table border :columns="columns7" :data="data6"></Table>
		 <Page :total="totalRecords" page-size="5" show-elevator @on-change="onchange" />
	</div>
   
</template>
<script>
	import {getAllOrder} from '../../api/order.js';
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '订单号',
                        key: 'orderId'
                    },
                    {
                        title: '操作人员',
                        key: 'empName'
                    },
                    {
                        title: '订货日期',
                        key: 'orderDate'
                    },
					{
					    title: '到货状态',
					    key: 'isArrive',
					},
					
					{
					    title: '支付状态',
					    key: 'orderStatus'
					},
					{
					    title: '订货金额',
					    key: 'orderAmountMoney'
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
                                }, '详情'),
                               /* h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete') */
                            ]);
                        }
                    }
                ],
                data6: [
                  
                ],
				totalRecords:{}
            }
        },
        methods: {
            show (index) {
               this.$router.push({path:'/orderDetail',query:{id:this.data6[index].orderId}});
            },
            /* remove (index) {
                this.data6.splice(index, 1);
            }, */
			onchange(currentPage){
				
				
				getAllOrder(currentPage).then(res=>{
						this.data6=res.data.pagedList;
				}).catch(err=>{
					console.log(err);
				})
        }
		},
		created:function(){
			getAllOrder().then(res=>{
				this.totalRecords=res.data.total;
				this.data6=res.data.pagedList;
			}).catch(err=>{
				console.log(err);
			})
		}
		}
    
</script>
