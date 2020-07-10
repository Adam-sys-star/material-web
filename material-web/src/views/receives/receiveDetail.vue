<template>
	<div>
		 
		<Button type="primary" v-on:click="confirmReceive">确认收货</Button>
		    
		<Table border :columns="columns7" :data="data6"></Table>
		<Page :total="tatalRecords" page-size="5" show-elevator @on-change="onchange" />
	</div>
    
</template>
<script>
	import store from '@/store'
	import {getReceiveDetailByReceiveId} from '../../api/receive.js';
	import {toConfirmReceive} from '../../api/receive.js';
    export default {
		inject: ['reload'],
        data () {
            return {
                columns7: [
                    {
                        title: '商品货号',
                        key: 'itemId'
                    },
                    {
                        title: '商品名称',
                        key: 'itemName'
                    },
					{
					    title: '最近价格',
					    key: 'latelyPrice'
					},
					{
					    title: '当前价格',
					    key: 'currentPrice'
					},
                    {
                        title: '采购总数',
                        key: 'orderNumber'
                    },
					{
					    title: '到货数量',
					    key: 'arriveNumber'
					}
                ],
                data6: [
                ],
				tatalRecords:{},
				emp:{}
            }
        },
        methods: {
           onchange(currentpage){
			   var receiveId = this.$route.query.id;
			   getReceiveDetailByReceiveId(receiveId,currentpage).then(res=>{
			   				 this.data6=res.data.pagedList;
			   }).catch(err=>{
			   				 console.log(err);
			   })
		   },
		   confirmReceive:function(){
			    var receiveId = this.$route.query.id;
			   toConfirmReceive(receiveId,this.emp.id).then(res=>{
				   alert("收货成功");
				   this.reload();
			   }).catch(err=>{
				   console.log(err);
			   })
		   }
		   
        },
		created:function(){
			 var receiveId = this.$route.query.id;
			 getReceiveDetailByReceiveId(receiveId).then(res=>{
				 console.log("111111111111111111111",res);
				 this.tatalRecords=res.data.total;
				 this.data6=res.data.pagedList;
			 }).catch(err=>{
				 console.log(err);
			 }),
			 store.dispatch('GetInfo').then(res => { // 拉取user_info
			 	console.log("操作员信息", res)
			 	this.emp = res.data;
			 })
		}
    }
</script>
