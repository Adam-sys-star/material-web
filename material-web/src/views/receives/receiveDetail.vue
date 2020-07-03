<template>
	<div>
		<Table border :columns="columns7" :data="data6"></Table>
		<Page :total="tatalRecords" page-size="5" show-elevator @on-change="onchange" />
	</div>
    
</template>
<script>
	import {getReceiveDetailByReceiveId} from '../../api/receive.js';
    export default {
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
				tatalRecords:{}
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
			 })
		}
    }
</script>
