<template>
	<div>
		<row>
			<Input id="searchInput" v-model="keyWord" placeholder="请输入商品编号/拼音码/五笔码" style="width: 90%" @on-focus="showSearchInfo"
			 @on-change="searchItem" />
			 <div :style="uiStyle" id="searchField" v-show="showSearch">
			 	<SearchTable :keyWord="keyWord" @addItemInfo="addItemToCart"></SearchTable>
			 </div>
		</row>
		<Table :columns="columns1" :data="itemData"></Table>
		
		 <Button type="primary" v-on:click="submit">提交</Button>
	</div>
    
</template>
<script>
	import searchItems from '@/views/itemsManage/searchItems.vue';
	import SearchTable from '@/views/goodsSale/SearchTable.vue';
	import Vue from 'vue';
	import store from '@/store'
	import {dealOrder} from '../../api/order.js'
	import {arrayReCreate} from '@/utils/dataFormat.js'
	import {findSupplierNameByItemId} from '../../api/order.js'
	import {findInPriceByItemIdAndSupplierName} from '../../api/order.js'
    export default {
		
		inject: ['reload'],
		components:{
			SearchTable
			// searchItems
		},
        data () {
            return {
				names:[],
				keyWord: '',
				showSearch: false,
				uiStyle: {
					position: 'absolute',
					width: '90%',
					'z-index': 9,
					'margin-left': '5%'
					// display: 'none'
				},
                columns1: [
                    {
                        title: '货号',
                        key: 'id'
                    },
                    {
                        title: '商品名',
                        key: 'itemName'
                    },
                    {
                        title: '规格',
                        key: 'itemSpec'
                    },
					{
					    title: '单位',
					    key: 'itemUnit'
					},
					{
					    title: '零售价',
					    key: 'itemSalePrice'
					},
					{
					    title: '数量',
					    key: 'itemNumber',
						render: (h, param) => {
							let vm = this;
							return h(
								"div", {
									props: {}
								},
								[
									h("InputNumber", {
										props: {
											type: "number",
											value: param.row.itemNumber,
											min: 1
										},
						
										on: {
											"on-change": event => {
												/* console.log("数量变化", event)
												//不为空，即通过验证，将值附上去，然后把虚拟字段置空
												var obj = this.itemData[param.index];
												console.log("obj", obj);
												var moneyChange = (event - obj.count) * (obj.itemSalePrice);
												console.log("moneyChange", moneyChange);
												this.recalculation(moneyChange);
						
												param.row.count = event;
												this.itemData[param.index].count = event; */
												this.itemData[param.index].itemNumber = event
												
											},
						
										}
									}),
									h(
										"span", {
											attrs: {
												title: param.row.valid
											},
											style: {
												color: "red"
											}
										},
										param.row.valid
									)
								]
							);
						}
					},
					{
					    title: '生产厂家',
					    key: 'itemFactoryName'
					},
					{
						title:'供应商',
						key:'supplierName',
						  /* render: (h, params) => {
						         return h('Select', {
						             props:{
						                 value: this.data[params.index].supplierName,
						             },
						             on: {
						                 'on-change':(value) => {
						                     this.data[params.index].supplierName = value;
						                 }
						             },
						         },
						         this.supplierNames.map(function(type){
						             return h('Option', {
						                 props: {value: type}
						             }, type);
						         })
						         );
						     } */
							 render: (h, params) => {
							     return h('Select', {
							         props:{
							             // value: this.data[params.index].volumeType,
										  value: this.itemData[params.index].supplierName,
							         },
							         on: {
							             'on-change':(event) => {
							                 // this.itemData[params.index].supplierName[0] = event;
											 // findInPriceByItemIdAndSupplierName(itemData[params.index].id,this.itemData[params.index].supplierName[0]);
											 findInPriceByItemIdAndSupplierName(this.itemData[params.index].id,event).then(res=>{
												 var inPrice={};
												 inPrice=res.data;
												 console.log("新的进货价",inPrice);
												 Vue.set(this.itemData[params.index],'inPrice',inPrice);
												 Vue.set(this.itemData[params.index],'supplierName',event);
											 }).catch(err=>{
												 console.log("错误错误啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
												 console.log(err);
											 })
							             }
							         },
							     },
							    /* [
							         h('Option',{
							             props: {
							                 value: '1'
							             }
							         },'option1'),
							         h('Option',{
							             props: {
							                 value: '2'
							             }
							         },'option2')
							     ] */
								 this.names[params.index].map(function(type){
								     return h('Option', {
								         props: {value: type}
								     }, type);
								 })
							     );
							 },
						 

					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index);
											
										}
									}
								}, '删除')
							]);
						}
					}
                ],
                data1: [
                   /* {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    } */
                ],
				itemData: [],
				emp:{}
            }
        },
		methods:{
			showSearchInfo: function() {
				// this.uiStyle.display = 'block';
				this.showSearch = true;
			},
			addItemToCart(obj) {
			/* 
				var totalAmount = obj.itemSalePrice;
				var saleAfterDiscount = Math.round(obj.itemSalePrice * this.discount * 100) / 100
				var saleDiscountAmount = totalAmount - saleAfterDiscount;
				Vue.set(obj, 'count', 1)
				Vue.set(obj, 'saleAfterDiscount', totalAmount)
				Vue.set(obj, 'saleDiscountAmount', saleDiscountAmount)
				Vue.set(obj, 'totalAmount', totalAmount) */
			
				
				Vue.set(obj,'itemNumber',1);
				// this.itemData.push(obj);
				
				//this.supplierNames=this.itemData[this.itemData.length-1].supplierName;
				// this.names.push(this.itemData[this.itemData.length-1].supplierName);
				this.names.push(obj.supplierName);
				
				// this.supplierNames=this.names[this.names.length-1];
				
				
			
				// this.recalculation(obj.itemSalePrice);
				
				// this.showSearchInfo();
				findInPriceByItemIdAndSupplierName(obj.id,obj.supplierName[0]).then(res=>{
					var inPrice={};
					inPrice=res.data;
					Vue.set(obj,'inPrice',inPrice);
					Vue.set(obj,'supplierName',obj.supplierName[0]);
					this.itemData.push(obj);
					
					
					console.log("zzzzzzzzzzzzzzzzzzzzz",inPrice);
					
				}).catch(function(error){
					console.log("999999999999999999999999999")
					console.log(error);
				})
			},
				
			submit:function(){
				// const empdata={employeeId:this.emp.id}
				
				// console.log("旧数组数量",this.itemData[0].itemNumber);
				const map = new Map([
					['id', 'id'],
					['itemName', "itemName"],
					['itemSpec', 'itemSpec'],
					['itemUnit', 'itemUnit'],
					['itemSalePrice', 'itemSalePrice'],
					['itemNumber', 'itemNumber'],
					['itemFactoryName','itemFactoryName'],
					['inPrice','inPrice'],
					['supplierName','supplierName']
				]);
				var newItemData = arrayReCreate(this.itemData, map);
				
				dealOrder(this.emp.id,newItemData).then(res=>{
					this.reload();
					}
				)
				//提交后将names清空
				this.names=[];
			},
			remove(index) {
				
				this.itemData.splice(index, 1);
			}
		},
		created: function() {
			document.addEventListener("click", e => {
				var box = document.getElementById("searchField");
				var searchInput = document.getElementById("searchInput");
				if (box.contains(e.target) || searchInput.contains(e.target)) {
					// console.log("div之内");
					// this.uiStyle.display = 'block';
					this.showSearch = true;
				} else {
					// console.log("div之外");
					// this.uiStyle.display = 'none';
					this.showSearch = false;
					this.keyWord = '';
				}
			}),
			store.dispatch('GetInfo').then(res => { // 拉取user_info
				console.log("操作员信息", res)
				this.emp = res.data;
			})
			
		}
    }
</script>
