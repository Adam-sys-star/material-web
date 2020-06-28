<template>
	<div>

		<h1 style="font-size: 60px;">收银台</h1>
		<!-- <Modal v-model="modal1" title="商品数量" width="300" @on-ok="ok" @on-cancel="cancel">
			<Input v-model="itemCount" placeholder="请输入商品数量" style="width: 25%" />
			<div slot="footer"></div>
		</Modal> -->

		<Row>
			<Col span=15>
			<!-- <div id="searchField"> -->
			<Input id="searchInput" v-model="keyWord" placeholder="请输入商品编号/拼音码/五笔码" style="width: 90%" @on-focus="showSearchInfo"
			 @on-change="searchItem" />
			<div :style="uiStyle" id="searchField" v-show="showSearch">
				<SearchTable :keyWord="keyWord" @addItemInfo="addItemToCart"></SearchTable>
			</div>
			<!-- </div> -->
			</Col>
			<Col span=4>
			<Input @keyup.enter.native="loadMemberInfo" v-model="memberTelp" placeholder="会员手机号" />
			</Col>
			<Col span=3>
			<Button v-on:click="gotoView('/saleList')" type="warning" style="margin-left: 50px;">申请退货</Button>
			</Col>
			<Col span=2>

			<Dropdown class="nav-item">
				<a href="javascript:void(0)">
					<span slot="button">
						<img src="static/img/avatars/6.jpg" class="img-avatar" alt="o">
						<!-- <span class="d-md-down-none">admin</span> -->
					</span>
				</a>
				<Dropdown-menu slot="list">
					<Dropdown-item>
						<p class="dropdown-itemp">
							<Icon type="android-settings"></Icon> Settings
						</p>
					</Dropdown-item>

					<Dropdown-item> <a href="" @click="Logout">
							<p class="dropdown-itemp">
								<Icon type="power"></Icon>Logout
							</p>
						</a></Dropdown-item>
				</Dropdown-menu>
			</Dropdown>
			</Col>
		</Row>

		<Row>
			<Col span=6>
			<label style="text-align: left;font-size: 16px;">{{memberTelp1}}</label>
			</Col>
			<Col span=6>
			<label style="text-align: center;font-size: 16px;">{{memberName}}</label>
			</Col>
			<Col span=6>
			<label style="text-align: left;font-size: 16px;">{{memberClass}}</label>
			</Col>

		</Row>
		<!-- <p  style="width: 70%;font-size: 24px;white-space:nowrap; ">

		</p> -->
		<div width="90%">
			<Table border :columns="header" :data="itemData" height="350"></Table>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<h3 style="font-size: 24px; font-weight: 900; margin-left: 5%;">总金额:{{total}} 元</h3>
			<h3 style="font-size: 24px; font-weight: 900; margin-left: 5%;">优惠金额:{{totalDiscount}} 元</h3>
			<h3 style="font-size: 24px; font-weight: 900; margin-left: 5%;">折后价:{{finalPrice}} 元</h3>
			<Button size="large" type="primary" style="margin-right: 15%; margin-top: 1px;" v-on:click="settlement">结算</Button>
		</div>

	</div>

</template>

<script>
	import store from '@/store'
	import {
		getMemberInfo
	} from '@/api/member.js'
	import {
		settlement,
	} from '@/api/sale.js'
	import {
		arrayReCreate
	} from '@/utils/dataFormat.js'
	import {
		numberMul,
		numberAdd,
		numberSub,
		numberDiv
	} from '@/utils/calculation.js'
	import SearchTable from '@/views/goodsSale/SearchTable.vue';
	import Vue from 'vue';
	export default {
		name: "table-main",
		components: {
			SearchTable
		},
		inject: ['reload'],
		data() {
			return {
				memberTelp: '',
				memberTelp1: '',
				memberName: '',
				memberClass: '',
				discount: 1,
				total: 0,
				totalDiscount: 0,
				finalPrice: 0,
				keyWord: '',
				showSearch: false,
				uiStyle: {
					position: 'absolute',
					width: '90%',
					'z-index': 9,
					'margin-left': '5%'
					// display: 'none'
				},
				emp: {},
				modal1: false,

				header: [{
						title: '货号',
						key: 'id',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'person'
									}
								}),
								h('strong', params.row.id)
							]);
						}
					},
					{
						title: '商品名',
						key: 'itemName',
						sortable: true
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
						key: 'count',
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
											value: param.row.count,
											min: 1
										},

										on: {
											"on-change": event => {
												console.log("数量变化", event)
												//不为空，即通过验证，将值附上去，然后把虚拟字段置空
												var obj = this.itemData[param.index];
												console.log("obj", obj);
												var moneyChange = (event - obj.count) * (obj.itemSalePrice);
												console.log("moneyChange", moneyChange);
												this.recalculationItemPrice(param.index, moneyChange);
												this.recalculation(moneyChange);
												param.row.count = event;
												this.itemData[param.index].count = event;
												console.log("this.itemData[param.index].count", this.itemData[param.index].count);
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
						},

					},
					{
						title: '商品类别',
						key: 'address'
					},
					{
						title: '生产厂家',
						key: 'itemFactoryName'
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
											this.remove(params.index)
										}
									}
								}, 'Delete')
							]);
						}
					}
				],
				itemData: []
			}
		},
		created: function() {
			// 监听鼠标是否在div之内
			document.addEventListener("click", e => {
				var box = document.getElementById("searchField");
				var searchInput = document.getElementById("searchInput");
				var searchAdd = document.getElementById("search_add");
				if (box.contains(e.target) || 
				searchInput.contains(e.target) ||
				 e.target.id=='search_add'||
				 e.target.innerText=='添加 ✔') {
					this.showSearch = true;
					console.log("div之内")
				} else {
					this.showSearch = false;
					this.keyWord = '';
					console.log("div之外s")
				}
			})
			store.dispatch('GetInfo').then(res => { // 拉取user_info
				console.log("操作员信息", res)
				this.emp = res.data;
			})
		},
		methods: {
			gotoView: function(path) {
				this.$router.replace(path)
			},
			loadMemberInfo: function() {
				getMemberInfo(this.memberTelp).then(res => {
					this.memberRes = res.data
					if (this.memberRes.member != null) {
						this.memberName = '顾客名称：' + this.memberRes.member.memberName;
						this.memberTelp1 = '手机号：' + this.memberRes.member.memberTelp;
						this.memberClass = '会员类型：' + this.memberRes.memberClass.memberClassName;
						this.discount = this.memberRes.memberClass.memberClassDiscount
					} else {
						this.memberTelp = '';
						this.memberTelp1 = '';
						this.memberClass = '';
						this.memberName = '没有该会员信息';
					};
					console.log("获取客户信息", this.memberRes);
					// this.reload();
				}).catch(function(error) {
					console.log(error);
				});
			},
			searchItem: function() {

				console.log("关键词", this.keyWord);
			},
			showSearchInfo: function() {
				// this.uiStyle.display = 'block';
				this.showSearch = true;
			},
			closeSearchInfo: function() {
				this.showSearch = false;
				this.uiStyle.display = 'none';
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
			settlement: function() {
				const itemSale = {
					employeeId: this.emp.id,
					memberId: this.memberTelp,
					saleAfterDiscount: this.finalPrice,
					saleDiscountAmount: this.totalDiscount,
					saleTotalAmount: this.total
				}
				var newItemData = arrayReCreate(this.itemData, null);
				
				// 商品数组（数量，定价，优惠金额）
				settlement(itemSale, newItemData).then(res => {
					this.reload();
				});
				// settlement("会员id","员工id",16.50,60.50,77.00);
				console.log("结算中", this.itemData);
			},
			recalculation: function(money) {
				this.total = numberAdd(this.total, money);
				var price = Math.round(numberMul(money, this.discount) * 100) / 100
				this.finalPrice = numberAdd(this.finalPrice, price);
				var addDiscount = numberSub(money, price)
				this.totalDiscount = numberAdd(this.totalDiscount, addDiscount);
			},

			recalculationItemPrice: function(index, money) {
				var totalAmount = money;
				var saleAfterDiscount = Math.round(money * this.discount * 100) / 100
				var saleDiscountAmount = numberSub(totalAmount, saleAfterDiscount);
				this.itemData[index].totalAmount = numberAdd(this.itemData[index].totalAmount, money);
				this.itemData[index].saleAfterDiscount = numberAdd(this.itemData[index].saleAfterDiscount, saleAfterDiscount);
				this.itemData[index].saleDiscountAmount = numberAdd(this.itemData[index].saleDiscountAmount, saleDiscountAmount);
			},
			addItemToCart(obj) {
				var totalAmount = obj.itemSalePrice;
				var saleAfterDiscount = Math.round(obj.itemSalePrice * this.discount * 100) / 100
				var saleDiscountAmount = numberSub(totalAmount, saleAfterDiscount);
				Vue.set(obj, 'count', 1)
				Vue.set(obj, 'saleAfterDiscount', saleAfterDiscount)
				Vue.set(obj, 'saleDiscountAmount', saleDiscountAmount)
				Vue.set(obj, 'totalAmount', totalAmount)

				this.itemData.push(obj);

				this.recalculation(obj.itemSalePrice);
				console.log("添加商品", obj);
				console.log("收银台商品", this.itemData);
				// this.showSearchInfo();
			},
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
				var obj = this.itemData[index];
				var moneyChange = -(obj.count * obj.itemSalePrice);
				this.recalculation(moneyChange);
				this.itemData.splice(index, 1);
			}
		}
	}
</script>

<style scoped>

</style>
