<template>
	<div>
		<Table border :columns="columns7" :data="data6"></Table>
		<Page :total="totalRecords" page-size="5" show-elevator @on-change="onchange" />
	</div>
    
</template>
<script>
	import {getOrderDetailRespByOrderId} from '../../api/order.js';
	
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '商品名',
                        key: 'itemName'
                        
                    },
                    {
                        title: '供应商名',
                        key: 'supplierName'
                    },
                    {
                        title: '最近价格',
                        key: 'priceLately'
                    },
					{
					    title: '订购数量',
					    key: 'orderNumber'
					},
					{
					    title: '生产厂商',
					    key: 'factoryName'
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
				totalRecords:{}
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
			onchange(currentPage){
					
					var orderId=this.$route.query.id;
					getOrderDetailRespByOrderId(orderId,currentPage).then(res=>{
							this.data6=res.data.pagedList;
					}).catch(err=>{
						console.log(err);
					})
			}
        },
		created:function(){
			var orderId=this.$route.query.id;
			getOrderDetailRespByOrderId(orderId).then(res=>{
				this.totalRecords=res.data.total;
				this.data6=res.data.pagedList;
			})
				
			
		}
    }
</script>
