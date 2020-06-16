<template>
	<div width="90%">
		<h1 style="font-size: 60px; text-align: center;">销售记录</h1>
		<br>
		<Modal v-model="modal1" title="销售单明细" width="1000px" @on-ok="ok" @on-cancel="cancel">
			<SaleDetail :itemSaleId="itemSaleId"></SaleDetail>
			<div slot="footer"></div>
		</Modal>
		<Row style="margin-left: 8%;">
			<Col span="10">
			<DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
			--
			<DatePicker v-model="endTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
			</Col>

			<Col span="6">
			<label></label>
			<Input v-model="key" placeholder="订单号/操作人/顾客名" style="width: 200px;" @keyup.enter.native="searchSaleList"></Input>
			</Col>
			<Button v-on:click="gotoView('/cashier')" type="warning" style="margin-left: 50px;">返回收银台</Button>
		</Row>
		<br>

		<Table border :columns="saleListHeader" :data="saleListData" height="400"></Table>
	</div>
</template>

<script>
	import SaleDetail from '@/views/goodsSale/SaleDetail.vue'
	import {
		getSaleList
	} from '@/api/sale.js'
	import{
		formatDate
	} from '@/utils/dataFormat.js'
	export default {
		name: "sale-list",
		components: {
			SaleDetail
		},
		inject: ['reload'],
		watch: {
			'startTime': function(newValue) {
				console.log('前置');
				this.searchSaleList();
			},
			'endTime': function(newValue) {
				this.searchSaleList();
			}
		},
		data() {
			return {
				key: "",
				startTime: null,
				endTime: null,
				modal1: false,
				itemSaleId: '',
				saleListHeader: [{
						title: '订单号',
						key: 'id',
						sortable: true
					},
					{
						title: '操作员',
						key: 'employeeId'
					},
					{
						title: '顾客姓名',
						key: 'memberId'
					},
					{
						title: '总金额',
						key: 'saleTotalAmount'
					},
					{
						title: '优惠金额',
						key: 'saleDiscountAmount'
					},
					{
						title: '折后价格',
						key: 'saleAfterDiscount'
					},
					{
						title: '销售时间',
						key: 'saleTime',
						render: (h, params) => {
							return h('div',
								formatDate(new Date(params.row.saleTime), 'yyyy-MM-dd hh:mm')
							)
						}
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
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, 'View'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											// this.remove(params.index)
											this.model1 = true;
										}
									}
								}, 'Delete')
							]);
						}
					}
				],
				saleListData: [],
			}
		},


		created: function() {
			//在created函数中使用axios的get请求向后台获取用户信息数据
			getSaleList(this.startTime, this.endTime, this.key).then(res => {
				this.saleListData = res.data
				console.log(res.data);
			}).catch(function(error) {
				console.log(error);
			});
		},
		methods: {
			gotoView:function(path) {
				this.$router.replace(path)
			},
			formatDate(value) {

				this.value1 = new Date(value.saleTime); //value.createdTime是prop绑定的字段名称
				let dateValue = this.$moment(this.value1).format("YYYY-MM-DD HH:mm:ss"); //$moment专门转化时间的插件（使用时需要下载引入）
				return dateValue
			},
			Logout(e) {
				e.preventDefault();
				this.$store.dispatch('LogOut').then(() => {
					console.log("退出登录测试")
					this.$router.push({
						path: '/login'
					});
				}).catch(err => {
					this.$message.error(err);
				});
			},

			searchSaleList: function() {
				// this.startTime = (new Date(this.startTime)).getTime() / 1000;
				// this.endTime = (new Date(this.endTime)).getTime() / 1000;
				getSaleList(this.startTime, this.endTime, this.key).then(res => {
					console.log("this.key", this.key);
					this.saleListData = res.data
					console.log(res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},

			show(index) {

				this.itemSaleId = this.saleListData[index].id;

				console.log("itemSaleId", this.itemSaleId);
				this.modal1 = true;

				// this.$Modal.info({
				// 	title: 'User Info',
				// 	// content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				// 	content: `<SaleDetail></SaleDetail>`
				// })
			},
			remove(index) {
				this.data6.splice(index, 1);
			},
			ok() {
				// this.$Message.info('Clicked ok');
			},
			cancel() {
				// this.$Message.info('Clicked cancel');
				this.reload();
			}
		}

	}
</script>

<style>
	.ivu-modal {
		top: 0;
	}
</style>
