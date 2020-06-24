<template>
	<div>
		<Form :model="formItem" :label-width="80">
			<Row>
				<Col span="11">
				<FormItem label="时间">
					<DatePicker type="date" placeholder="开始时间" v-model="formItem.startTime"></DatePicker>
					--
					<DatePicker type="date" placeholder="截至时间" v-model="formItem.endTime"></DatePicker>
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
					<Select v-model="formItem.cycle" style="position: absolute;">
					<!-- 	<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option> -->
					</Select>
				</FormItem>
				</Col>
				<Col span=2>
					<Button v-on:click="reloadData">测试</Button>
				</Col>
			</Row>
		</Form>
		<Table border :columns="saleListHeader" :data="saleListData" height="400"></Table>
	</div>
</template>

<script>
	import {loadTurnoverData} from '@/api/statistics'
	import {Select,Option} from 'view-design';
	import Vue from 'vue';
	Vue.component('Select', Select);
	Vue.component('Option', Option);
	export default {
		data() {
			return {
				formItem: {
					itemClass: '',
					cycle: '',
					startTime: '',
					endTime: ''
				},
				saleListHeader: [{
						title: '时间',
						key: 'id',
						width: 100,
						sortable: true
					},
					{
						title: '进货成本',
						width: 100,
						key: 'employeeId'
					},
					{
						title: '成本同比增长',
						width: 120,
						key: 'memberId'
					},
					{
						title: '销售额',
						width: 100,
						key: 'saleTotalAmount'
					},
					{
						title: '销售额同比增长',
						width: 130,
						key: 'saleDiscountAmount'
					},
					{
						title: '销售数量',
						width: 90,
						key: 'saleAfterDiscount'
					}, 
					{
						title: '销售数量同比增长',
						width: 135,
						key: 'saleAfterDiscount'
					}, 
					{
						title: '总利润',
						width: 100,
						key: 'saleAfterDiscount'
					}, 
					{
						title: '总利润同比增长',
						width: 130,
						key: 'saleAfterDiscount'
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
				saleListData: [],
			}
		},
		created: () => {
			
		},
		methods:{
			reloadData:function(res){
				let data = {
					...this.formItem
				}
				console.log(this.formItem)
				loadTurnoverData(data);
			}
		}
	}
</script>

<style>
</style>
