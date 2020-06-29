<template>
	<div width="90%">
		<Row style="margin-left: 8%;">

			<Col span="6">
			<Input v-model="itemName" placeholder="商品名称" style="width: 200px;"></Input>
			</Col>
			<Col span="9">
			<Input v-model="itemName" placeholder="最低价格" style="width: 150px;"></Input>
			--
			<Input v-model="itemName" placeholder="最高价格" style="width: 150px;"></Input>
			</Col>

		</Row>
		<br>

		<Table border :columns="saleDetailHeader" :data="saleDetailDate" height="400"></Table>
	</div>
</template>

<script>
	import {
		getSaleDetail
	} from '@/api/sale.js'
	export default {
		name: "sale-detail",
		components: {

		},
		props: ['itemSaleId'],
		watch: {
			'itemSaleId': function(newValue) {
				console.log('newValue', newValue);
				this.$nextTick(function() {
					this.reloadData(newValue);
				})
			},
			deep: true
		},
		data() {
			return {
				itemName: '',

				model2: '',
				// itemSaleId:'',

				saleDetailHeader: [
					{
						title: '序号',
						render: (h, params) => {
							return h('div',
								params.index+1
							)
						},
					},{
						title: '货号',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].item.id);
						    },
						sortable: true
					},
					{
						title: '商品名称',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].item.itemName);
						    }
					},
					{
						title: '商品类别',
						key: 'itemId'
					},
					{
						title: '规格',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].item.itemSpec);
						    }
					},
					{
						title: '单位',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].item.itemUnit);
						    }
					},
					{
						title: '零售价',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].itemSaleDetail.salePrice);
						    }
					},
					{
						title: '数量',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].itemSaleDetail.saleNumber);
						    }
					},
					{
						title: '总金额',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].itemSaleDetail.totalAmount);
						    }
					},
					{
						title: '优惠金额',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].itemSaleDetail.saleDiscountAmount);
						    }
					},
					{
						title: '折后价格',
						render: (h, params) => {
						      return h("span", this.saleDetailDate[params.index].itemSaleDetail.saleAfterDiscount );
						    }
					}
				],
				saleDetailDate: []
			}
		},


		// created: function() {
		// 	//在created函数中使用axios的get请求向后台获取用户信息数据
		// 	getSaleDetail(this.itemSaleId).then(res => {
		// 		this.saleDetailDate = res.data
		// 		console.log(res.data);
		// 	}).catch(function(error) {
		// 		console.log(error);
		// 	});
		// },
		methods: {
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

			reloadData: function(itemSaleId) {
				getSaleDetail(this.itemSaleId).then(res => {
					this.saleDetailDate = res.data
					console.log("销售单详情",res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},

			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			}
		}

	}
</script>

<style>
</style>
