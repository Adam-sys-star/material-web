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
					<Cascader :data="itemclass" change-on-select v-model="formItem.itemClass" placeholder="请选择商品类别" filterable style="width: 200px;"></Cascader>
				</FormItem>
				</Col>

				<Col span="5">
				<FormItem label="统计周期">
					<Select v-model="formItem.cycle" style="width: 100px;" @on-change="reloadData">
						<Option value="YEAR">年</Option>
						<Option value="HALF_YEAR">半年</Option>
						<Option value="QUARTER">季度</Option>
						<Option value="MONTH">月</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
		</Form>
		<Row>

			<Col :span="24">
			<chart :options="option" class="echarts"></chart>

			</Col>

		</Row>
	</div>
</template>

<style scoped>
	.echarts {
		height: 500px;
		width: 100%;
		border-radius: 25px;
	}
</style>

<script>
	import {
		loadTurnoverData
	} from '@/api/statistics'
	import {
		searchItemClass
	} from '@/api/searchItem.js';
	import Vue from 'vue';
	export default {
		watch: {
			'turnoverData': function(newValue) {
				console.log('newValue', newValue);
				this.option = {
					backgroundColor: "#344b58",
					"title": {
						"text": "营业额统计",
						x: "4%",
						textStyle: {
							color: '#fff',
							fontSize: '22'
						},
						subtextStyle: {
							color: '#90979c',
							fontSize: '16',
						},
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
							textStyle: {
								color: "#fff"
							}
						}
					},
					"grid": {
						"borderWidth": 0,
						"top": 110,
						"bottom": 95,
						textStyle: {
							color: "#fff"
						}
					},
					legend: {
						textStyle: {
							color: '#fff',
						},
						data: ['营业额', '成本', '销售量', '利润']
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center'
					},
					xAxis: {
						type: 'category',
						data: this.section,
						axisLabel: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					},
					yAxis: [{
							name: "营业额",
							type: "value",
							nameTextStyle: {
								color: '#fff'
							},
							axisLabel: {
								show: true,
								formatter: '{value} 元',
								textStyle: {
									color: '#fff'
								}
							}
						},
						{
							type: 'value',
							name: '数量',
							nameTextStyle: {
								color: '#fff'
							},
							axisLabel: {
								formatter: '{value} 件',
								textStyle: {
									color: '#fff'
								}
							}
						}
					],
					series: [{
							name: '营业额',
							type: 'bar',
							data: this.saleVolume,
							barMaxWidth:50,
							barGap: '0',
							// silent: true,
							"itemStyle": {
								"normal": {
									"color": "rgba(0,191,183,1)",
									"barBorderRadius": 0,
								}
							},
						},
						{
							name: '成本',
							type: 'bar',
							barMaxWidth:50,
							data: this.cost,
							"itemStyle": {
								"normal": {
									"color": "rgba(255,144,128,1)",
								}
							},
						}, {
							name: '销售量',
							type: 'line',
							data: this.saleNum,
							yAxisIndex: 1,
							"itemStyle": {
								"normal": {
									"color": "rgba(255, 170, 0, 1.0)",
									"barBorderRadius": 0,
									"label": {
										"show": true,
										"position": "top",
										formatter: function(p) {
											return p.value > 0 ? (p.value) : '';
										}
									}
								}
							},
						}, {
							name: '利润',
							type: 'line',
							data: this.profit,
							"itemStyle": {
								"normal": {
									"color": "rgba(255, 85, 0, 1.0)",
									"barBorderRadius": 0,
									"label": {
										"show": true,
										"position": "top",
										formatter: function(p) {
											return p.value > 0 ? (p.value) : '';
										}
									}
								}
							},
						}
					]
				}
			},
			deep: true
		},
		data() {
			return {
				formItem: {
					itemClass: [],
					cycle: 'YEAR',
					startTime: '',
					endTime: ''
				},
				turnoverData: [],
				section: [],
				saleVolume: [],
				cost: [],
				profit: [],
				saleNum: [],
				option: {
					backgroundColor: "#344b58",
					"title": {
						"text": "营业额统计",
						x: "4%",
						textStyle: {
							color: '#fff',
							fontSize: '22'
						},
						subtextStyle: {
							color: '#90979c',
							fontSize: '16',
						},
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
							textStyle: {
								color: "#fff"
							}
						}
					},
					"grid": {
						"borderWidth": 0,
						"top": 110,
						"bottom": 95,
						textStyle: {
							color: "#fff"
						}
					},
					legend: {
						textStyle: {
							color: '#fff',
						},
						data: ['营业额', '成本', '销售量', '利润']
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center'
					},
					xAxis: {
						type: 'category',
						data: this.section,
						axisLabel: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					},
					yAxis: [{
							name: "营业额",
							type: "value",
							nameTextStyle: {
								color: '#fff'
							},
							axisLabel: {
								show: true,
								formatter: '{value} 元',
								textStyle: {
									color: '#fff'
								}
							}
						},
						{
							type: 'value',
							name: '数量',
							nameTextStyle: {
								color: '#fff'
							},
							axisLabel: {
								formatter: '{value} 件',
								textStyle: {
									color: '#fff'
								}
							}
						}
					],
					series: [{
							name: '营业额',
							type: 'bar',							
							data: this.saleVolume,
							"itemStyle": {
								"normal": {
									"color": "rgba(0,191,183,1)",
									"barBorderRadius": 0,
								}
							},
						},
						{
							name: '成本',
							type: 'bar',
							data: this.cost,
							"itemStyle": {
								"normal": {
									"color": "rgba(255,144,128,1)",
								}
							},
						}, {
							name: '销售量',
							type: 'line',
							data: this.saleNum,
							yAxisIndex: 1,
							"itemStyle": {
								"normal": {
									"color": "rgba(255, 170, 0, 1.0)",
									"barBorderRadius": 0,
									"label": {
										"show": true,
										"position": "top",
										formatter: function(p) {
											return p.value > 0 ? (p.value) : '';
										}
									}
								}
							},
						}, {
							name: '利润',
							type: 'line',
							data: this.profit,
							"itemStyle": {
								"normal": {
									"color": "rgba(255, 85, 0, 1.0)",
									"barBorderRadius": 0,
									"label": {
										"show": true,
										"position": "top",
										formatter: function(p) {
											return p.value > 0 ? (p.value) : '';
										}
									}
								}
							},
						}
					]
				}

			}
		},
		created: function() {
			this.reloadData();
			this.searchItemClass();
		},
		methods: {
			reloadData() {

				let data = {
					...this.formItem
				}
				console.log(this.formItem)
				loadTurnoverData(data).then(res => {
					this.turnoverData = res.data;
					this.section = [];
					this.saleVolume = [];
					this.cost = [];
					this.saleNum = [];
					this.profit = [];
					this.parseTurnoverData(this.turnoverData);
					console.log("营业额统计", res.data)
				}).catch(error => {
					console.log("错误", error)
				});
			},
			parseTurnoverData(turnoverList) {
				console.log("turnoverList", turnoverList)
				for (var i = 0; i < turnoverList.length; i++) {
					this.section.push(turnoverList[i].dateTime);
					this.saleVolume.push(turnoverList[i].saleVolume);
					this.cost.push(turnoverList[i].cost);
					this.saleNum.push(turnoverList[i].saleNum);
					this.profit.push(turnoverList[i].profit);
				}
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

		}
	}
</script>
