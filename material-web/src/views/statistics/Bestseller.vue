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
				<!-- <Col span="6">
				<FormItem label="商品类别">
					<Select v-model="formItem.itemClass">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				</Col> -->
			</Row>
		</Form>
		<Table border :columns="bestsellerHeader" :data="bestsellerData" height="400"></Table>
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
					startTime: '',
					endTime: ''
				},
				bestsellerHeader: [{
						title: '商品货号',
						key: 'dateTime',
						width: 120,
						sortable: true
					},
					{
						title: '商品名称',
						width: 100,
						key: 'cost'
					},
					{
						title: '商品类别',
						width: 120,
						key: '零售价'
					},
					{
						title: '销售数量',
						width: 100,
						key: 'saleVolume'
					},
					{
						title: '销售额',
						width: 130,
						key: 'saleVolumeIncrease'
					},
					{
						title: '库存量',
						width: 110,
						key: 'saleNum'
					}
				],
				bestsellerData: [],
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
				loadBestsellerData(data).then(res => {
					this.bestsellerData = res.data;
					console.log("畅销榜数据", res.data)
				}).catch(error => {
					console.log("错误", error)
				});
			}
		}
	}
</script>

<style>
</style>
