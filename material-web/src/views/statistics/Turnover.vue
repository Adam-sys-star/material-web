<template>
	<div>
		<Form :model="formItem" :label-width="80">
			<Row>
				<Col span="12">
				<FormItem label="时间">
					<DatePicker type="date" placeholder="开始时间" v-model="formItem.startTime" @on-change="reloadData"></DatePicker>
					--
					<DatePicker type="date" placeholder="截至时间" v-model="formItem.endTime" @on-change="reloadData"></DatePicker>
				</FormItem>
				</Col>
				<Col span="7">
				<FormItem label="商品类别">
					<!-- <Select v-model="formItem.itemClass">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select> -->
					<!-- 商品类别 -->
					<Cascader :data="itemclass" change-on-select  v-model="formItem.itemClass" placeholder="请选择商品类别" filterable
					 style="width: 200px;" ></Cascader>
				</FormItem>
				</Col>

				<Col span="5">
				<FormItem label="统计周期">
					<Select v-model="formItem.cycle" style="width: 100px;" @on-change="reloadData" >
						<Option value="YEAR">年</Option>
						<Option value="HALF_YEAR">半年</Option>
						<Option value="QUARTER">季度</Option>
						<Option value="MONTH">月</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
		</Form>
		    <!-- <Spin></Spin> -->
		<Table border :columns="turnoverHeader" :data="turnoverData" height="400"></Table>
	</div>
</template>

<script>
	import {
		loadTurnoverData
	} from '@/api/statistics'
	import {searchItemClass} from '@/api/searchItem.js';
	import Vue from 'vue';
	export default {
		data() {
			return {
				// 商品类别
					itemClass: "",
					itemclass: [{
						value: '1',
						label: '0TC类',
						children: []
					}, {
						value: '2',
						label: '处方类',
						children: []
					}, {
						value: '3',
						label: '保健食品类',
						children: []
					}, {
						value: '4',
						label: '药食同源类',
						children: []
					}, {
						value: '5',
						label: '医疗器械',
						children: []
					}, {
						value: '6',
						label: '个人护理',
						children: []
					}],
				formItem: {
					itemClass: [],
					cycle: 'YEAR',
					startTime: '',
					endTime: ''
				},
				turnoverHeader: [{
						title: '时间',
						key: 'dateTime',
						width: 120,

						style: "font-size:30px",
						sortable: true
					},
					{
						title: '进货成本',
						width: 100,
						key: 'cost'
					},
					{
						title: '成本同比增长',
						width: 120,
						key: 'costIncrease'
					},
					{
						title: '销售额',
						width: 100,
						key: 'saleVolume'
					},
					{
						title: '销售额同比增长',
						width: 130,
						key: 'saleVolumeIncrease'
					},
					{
						title: '销售数量',
						width: 110,
						key: 'saleNum'
					},
					{
						title: '销售数量同比增长',
						width: 135,
						key: 'saleNumIncrease'
					},
					{
						title: '总利润',
						width: 100,
						key: 'profit'
					},
					{
						title: '总利润同比增长',
						width: 130,
						key: 'profitIncrease'
					},

					// {
					// 	title: '销售时间',
					// 	key: 'saleTime',
					// 	render: (h, params) => {
					// 		return h('div',
					// 			formatDate(new Date(params.row.saleTime), 'yyyy-MM-dd hh:mm')
					// 		)
					// 	},
					// 	sortable: true
					// }
				],
				turnoverData: [],
			}
		},
		created: function() {
			this.reloadData();
			//搜索商品类别
			this.searchItemClass();
		},
		methods: {
			reloadData: function(res) {
				let data = {
					...this.formItem
				}
				console.log(this.formItem)
				loadTurnoverData(data).then(res => {
					this.turnoverData = res.data;
					console.log("营业额统计", res.data)
				}).catch(error => {
					console.log("错误", error)
				});
			},
			//搜索商品类别
			searchItemClass() {
				//获取Promise对象的data
				searchItemClass().then(res => {
					//获取了商品类别的集合
					let items = res.data;
					console.log("一共有" + items.length + "种商品类别")
					//缓存类别数组
					var arr = [];
					//缓存当前父类级别
					var findex = 1;
					//缓存到第几个
					var num = 0;
					for (let j = 0; j < 6; j++) {
						for (let i = 0; i < items.length; i++) {
							if (findex == items[num].itemClassFather) {
								arr.push(items[num]);
								num++;
								if (num == items.length - 1) {
									arr.push(items[num]);
									break;
								}
							} else {
								this.itemclass[j].children = arr.map(item => {
									return {
										value: item.id,
										label: item.itemClassName
									}
								})
								arr = [];
								findex = items[num].itemClassFather;
								break;
							}
						}
					}
					//最后一步未添加，在循环外添加
					this.itemclass[5].children = arr.map(item => {
						return {
							value: item.id,
							label: item.itemClassName
						}
					})
				});
			},
		},
		
	}
</script>

<style>
	 .demo-spin-icon-load{
	        animation: ani-demo-spin 1s linear infinite;
	    }
	    @keyframes ani-demo-spin {
	        from { transform: rotate(0deg);}
	        50%  { transform: rotate(180deg);}
	        to   { transform: rotate(360deg);}
	    }
	    .demo-spin-col{
	        height: 100px;
	        position: relative;
	        border: 1px solid #eee;
	    }
</style>
