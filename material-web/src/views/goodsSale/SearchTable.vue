<template>
	<div>
		<Table border :columns="itemHeader" :data="itemData" height="300"></Table>
	</div>
</template>

<script>
	import {
		search
	} from '@/api/searchItem.js';
	import {
		searchItem
	} from '@/api/searchItem.js';
	import {
		getAllClass
	} from '@/api/sale.js'
	import{findSupplierNameByItemId} from '../../api/order.js';
	import {findInPriceByItemIdAndSupplierName} from '../../api/order.js'
	import Vue from 'vue';
	export default {

		name: 'searchable-table',
		props: ['keyWord'],
		watch: {
			'keyWord': function(newValue) {
				console.log('newValue', newValue);
				this.$nextTick(function() {
					this.reloadData(newValue);
				})
			},
			deep: true
		},
		data() {
			return {
				
				itemHeader: [{
						title: '货号',
						key: 'id',
						// width:150,
						align: 'center',
					},
					{
						title: '商品名称',
						key: 'itemName',
						// width:150,
						align: 'center',
					},
					{
						title: '商品类别',
						key: 'itemClassId',
						// width:150,
						align: 'center',
						render: (h, params) => {
							return h('div',
								this.classMap.get(params.row.itemClassId)
							)
						},
					}, {
						title: '生产厂家',
						key: 'itemFactoryName',
						// width:150,
						align: 'center',
					},
					{
						title: '规格/单位',
						key: 'itemUnit',
						// width:100,
						align: 'center',
					},
					{
						title: '近货价',
						key: 'itemLatelyPic',
						sortable: true,
						width:90,
						align: 'center',
					},
					{
						title: '零售价',
						key: 'itemSalePrice',
						sortable: true,
						// width:100,
						align: 'center',
					},
					{
						title: '是否折扣',
						key: 'itemDiscState',
						// width:100,
						align: 'center',
						render: (h, params) => {
							return h('div',
								this.formatDate(params.row.itemDiscState)
							)
						}
					},
					{
						title: '操作',
						key: 'action',
						// width:118,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button-group', {
										props: {
											shape: 'circle',
										}
									},
									[h('Button', {
										attrs: {
											id: "search_add"
										},
										props: {
											type: 'success',
											size: 'small',
											id: 'addItem'
										},
										style: {
											width: "70px",
											height: "30px"
										},
										on: {
											click: () => {
												this.addItem(params.index)
											}
										}
									}, '添加 ✔'), ])
							]);
						}
					}
				],
				itemData: [],
				addedItem: [],
				classMap:{}
			};
		},
		created: function() {
			this.reloadClassData()
			search("").then(res => {
				this.itemData = res.data;
				console.log("商品搜索结果", res)
			}).catch(function(error) {
				console.log(error);
			});
			console.log("keyWord", keyWord)
		},
		methods: {
			formatDate:function(va){
				if(va==1){
					return "是"
				}else{
					return "否"
				}
			},
			reloadData: function(keyWord) {
				search(keyWord).then(res => {
					this.itemData = res.data;
					this.itemData = this.getDifferenceSet(this.addedItem, this.itemData, "id")
					console.log("商品搜索结果", res)
				}).catch(function(error) {
					console.log(error);
				});
				console.log("keyWord", keyWord)
			},
			reloadClassData: function() {
				getAllClass().then(res => {
					var classList = res.data
					this.classMap = new Map([]);
					for (var i = 0; i < classList.length; i++) {
						this.classMap.set(classList[i].id, classList[i].itemClassName)
					}
					console.log("商品类别列表信息", res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},
			addItem: function(index) {
				var supplierName=[];
				findSupplierNameByItemId(this.itemData[index].id).then(res=>{
					supplierName=res.data;
					console.log("supplierName",supplierName);
					Vue.set(this.itemData[index],'supplierName',supplierName);
					// 向父组件传递数据
					this.$emit('addItemInfo', this.itemData[index]);
					this.itemData.splice(index, 1);
					this.addedItem.push(this.itemData[index]);
				}).catch(function(error){
					console.log(error);
				})
			},
			// 两个数组取差集
			getDifferenceSet: function(arr1, arr2, typeName) {
				return Object.values(arr1.concat(arr2).reduce((acc, cur) => {
					if (acc[cur[typeName]] && acc[cur[typeName]][typeName] === cur[typeName]) {
						delete acc[cur[typeName]];
					} else {
						acc[cur[typeName]] = cur;
					}
					return acc;
				}, {}));
			}
		}
	};
</script>
