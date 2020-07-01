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
				<Col span="6">
				<FormItem label="商品类别">
					<Select v-model="formItem.itemClass">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				</Col>

				<Col span="6">
				<FormItem label="统计周期">
					<Select v-model="formItem.cycle" style="position: absolute;" @on-change="reloadData">
						<Option value="YEAR">年</Option>
						<Option value="HALF_YEAR">半年</Option>
						<Option value="QUARTER">季度</Option>
						<Option value="MONTH">月</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
		</Form>
		<Table border :columns="turnoverHeader" :data="turnoverData" height="400"></Table>
	</div>
</template>

<script>
	import {
		loadTurnoverData
	} from '@/api/statistics'
	import Vue from 'vue';
	export default {
		data() {
			return {
				formItem: {
					itemClass: '',
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

					{
						title: '销售时间',
						key: 'saleTime',
						render: (h, params) => {
							return h('div',
								formatDate(new Date(params.row.saleTime), 'yyyy-MM-dd hh:mm')
							)
						},
						sortable: true
					}
				],
				turnoverData: [],
			}
		},
		created: function() {
			this.reloadData();
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
			}
		}
	}
</script>

<style>
</style>
