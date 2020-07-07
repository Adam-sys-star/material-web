<template>
	<div>
		 <Table border :columns="columns7" :data="data6"></Table>
		 <Page :total="tatalRecords" page-size="5" show-elevator @on-change="onchange" />
	</div>
   
</template>
<script>
	import {getAllSuppliers} from '../../api/supplier.js';
	import {updateSupplierItem} from '../../api/supplier.js';
    export default {
		
        data () {
			let t=this;
            return {
                columns7: [
                    
                    {
                        title: '供应商id',
                        key: 'supplierId'
                    },
                    {
                        title: '供应商名',
                        key: 'supplierName'
                    },
					{
					    title: '商品Id',
					    key: 'itemId'
					},
					{
					    title: '商品名称',
					    key: 'itemName'
					},
					{
					                         title: '进货价',
					                         key: 'inPrice',
					                         width: 100,
					                         align: 'center',
					                         render:(h,params) => {
					                             return h('Input',{
					                                 props: {
					                                     value: t.data6[params.index].inPrice,
					                                     size:'small',
					                                 },
					                                 on: {
					                                     input: (val) => {
					                                         t.data6[params.index].inPrice = val;
															 console.log("aaaaaaaaaaa",val)
					                                     }
					                                 },
					                             })
					                         }
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
                                            this.submit(params.index)
                                        }
                                    }
                                }, '提交')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ],
				tatalRecords:{}
            }
        },
        methods: {
            submit (index) {
               updateSupplierItem(this.data6[index]).then(res=>{
				   alert("修改成功");
			   }).catch(err=>{
				   console.log(err);
				   alert("修改失败");
			   })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
			onchange(currentPage){
				getAllSuppliers(currentPage).then(res=>{
					this.data6=res.data.pagedList;
				}).catch(err=>{
				console.log(err);
			})
			}
        },
		created:function(){
			getAllSuppliers().then(res=>{
				this.tatalRecords=res.data.total;
				this.data6=res.data.pagedList;
				console.log("wwwwwwwwwwww"+JSON.stringify(res));
			}).catch(err=>{
				console.log(err);
			})
		}
    }
</script>
