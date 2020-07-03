<template>
	<div>
		<Table :columns="columns1" :data="data1"></Table>
		<Page :total="tatalRecords" page-size="5" show-elevator @on-change="onchange" />
	</div>
    
</template>
<script>
	import {getReceiveResp} from '../../api/receive.js';
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '收货单号',
                        key: 'receiveId'
                    },
                    {
                        title: '订货单号',
                        key: 'orderId'
                    },
                    {
                        title: '操作日期',
                        key: 'receiveDate'
                    },
					{
					    title: '采购人员',
					    key: 'orderPerson'
					},
					{
					    title: '收货人员',
					    key: 'receivePerson'
					},
					{
					    title: '收货状态',
					    key: 'receiveState'
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
					                        this.show(params.index);
					                    }
					                }
					            }, '详情')
					        ]);
					    }
					}
                ],
                data1: [
                   
                ],
				tatalRecords:{}
            }
        },
		created:function(){
			getReceiveResp().then(res=>{
				console.log("aaaaaaaaaaaaaa",res);
				this.tatalRecords=res.data.total;
				this.data1=res.data.pagedList;
			}).catch(err=>{
				console.log(err);	
			})
		},
		methods:{
			onchange(currentPage){
				getReceiveResp(currentPage).then(res=>{
					this.data1=res.data.pagedList;
				}).catch(err=>{
				console.log(err);
			})
			},
			show(index){
				this.$router.push({path:'/receiveDetail',query:{id:this.data1[index].receiveId}});
			}
		}
    }
</script>
