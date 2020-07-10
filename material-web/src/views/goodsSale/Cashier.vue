<template>
	<div>
		<Modal v-model="modal2" title="确认结算" width="300px" :styles="{top: '60px'}" @on-ok="ok" @on-cancel="cancel">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span width="100px">确认结算？</span>
			</p>
			<div style="text-align:center">
				<p>请确认是否结算</p>
				<p>应收:{{finalPrice}} 元</p>
				<p>实收:{{income}} 元</p>
				<p>找零:{{backMoney}} 元</p>

			</div>
			<div slot="footer">
				<Button type="success" long :loading="modal_loading" @click="settlement">结算</Button>
			</div>
		</Modal>
		<Row>
			<Col span=6 offset=1 style="text-align:left">
			<Row>
				<Col span=24>
				<h3 style="font-size: 24px; font-weight: 300;text-align:left">总共金额:{{total}}元</h3>
				</Col>
			</Row>
			<Row>
				<Col span=24>
				<h3 style="font-size: 24px; font-weight: 300;">优惠金额:{{totalDiscount}} 元</h3>
				</Col>
			</Row>
			<Row>
				<Col span=24>
				<h3 style="font-size: 24px; font-weight: 300;">折后金额:{{finalPrice}} 元</h3>
				</Col>
			</Row>
			</Col>
			<Col span=10>
			<Row>
				<Col span=24>
				<h1 style="font-size: 50px;">收银台</h1>
				</Col>
			</Row>
			<Row>
				<Col span=10>
				<label style="text-align: left;font-size: 16px;">{{memberTelp1}}</label>
				</Col>
				<Col span=6>
				<label style="text-align: center;font-size: 16px;">{{memberName}}</label>
				</Col>
				<Col span=6>
				<label style="text-align: left;font-size: 16px;">{{memberClass}}</label>
				</Col>
			</Row>
			</Col>
			<Col span=5 style="text-align:left">
			<Row>
				<Col span=24>
				<h3 style="font-size: 24px; font-weight: 300;">应收:{{finalPrice}} 元</h3>
				</Col>
			</Row>
			<Row>
				<Col span=24>
				<h3 style="font-size: 24px; font-weight: 300;">实收:{{income}} 元</h3>
				</Col>
			</Row>
			<Row>
				<Col span=24>
				<h3 style="font-size: 24px; font-weight: 300;">找零:{{backMoney}} 元</h3>
				</Col>
			</Row>
			</Col>
			<Col span=2>
			<Button type="primary" style="content: inherit; margin-top: 1px; width: 90px; height: 61px;" v-on:click="settlementComfirm">
				<span style="font-size: 28px; font-weight: 900;">结算</span></Button>
			</Col>
		</Row>
		<br />
		<Row>
			<Col span=15>
			<!-- <div id="searchField"> -->
			<Input id="searchInput" v-model="keyWord" placeholder="请输入商品编号或商品名" style="width: 90%" @on-focus="showSearchInfo"
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

		<div width="90%">
			<Table border :columns="header" :data="itemData" height="350"></Table>
		</div>
		<br />
	</div>

</template>

<script>
	import store from '@/store'
	import {
		getMemberInfo
	} from '@/api/member.js'
	import {
		settlement,
		getAllClass
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
				modal2: false,
				memberTelp: '',
				memberTelp1: '',
				memberName: '',
				memberClass: '',
				discount: 1,
				total: 0,
				totalDiscount: 0,
				finalPrice: 0,
				income: 0,
				backMoney: 0,
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
											min: 1,
											max: param.row.stock,
										},

										on: {
											"on-change": event => {
												console.log("数量变化", param)
												//不为空，即通过验证，将值附上去，然后把虚拟字段置空
												var obj = this.itemData[param.index];
												console.log("obj", obj);
												var moneyChange = numberMul((event - obj.count), (obj.itemSalePrice));
												console.log("moneyChange", moneyChange);
												this.recalculationItemPrice(param.index, moneyChange);
												this.recalculation(moneyChange, param.row.itemDiscState == 1);
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
						key: 'itemClassId',
						render: (h, params) => {
							return h('div',
								this.classMap.get(params.row.itemClassId)
							)
						},
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
								}, '删除')
							]);
						}
					}
				],
				itemData: [],
				classMap: {}
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
					e.target.id == 'search_add' ||
					e.target.innerText == '添加 ✔') {
					this.showSearch = true;
					console.log("div之内")
				} else {
					this.showSearch = false;
					this.keyWord = '';
					console.log("div之外s")
				}
			})
			this.reloadClassData()
			store.dispatch('GetInfo').then(res => { // 拉取user_info
				console.log("操作员信息", res)
				this.emp = res.data;
			})
		},
		methods: {
			gotoView: function(path) {
				this.$router.replace(path)

			},
			//导入员工数据，用于显示时替换员工id
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
			loadMemberInfo: function() {
				getMemberInfo(this.memberTelp).then(res => {
					this.memberRes = res.data
					if (this.memberRes.member != null) {
						this.memberName = '顾客：' + this.memberRes.member.memberName;
						this.memberTelp1 = '手机号：' + this.memberRes.member.memberTelp;
						this.memberClass = '会员：' + this.memberRes.memberClass.memberClassName;
						this.discount = this.memberRes.memberClass.memberClassDiscount
						// 重新计算优惠信息
						for (var i = 0; i < this.itemData.length; i++) {
							var obj = this.itemData[i];
							if (obj.itemDiscState == 1) {

								obj.saleAfterDiscount = Math.round(obj.totalAmount * this.discount * 100 * obj.count) / 100
								obj.saleDiscountAmount = numberSub(obj.totalAmount, obj.saleAfterDiscount);
								this.totalDiscount = numberAdd(obj.saleDiscountAmount, this.totalDiscount);
							}
						}
						this.finalPrice = numberSub(this.total, this.totalDiscount);
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
				this.showSearch = true;
			},
			closeSearchInfo: function() {
				this.showSearch = false;
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
			// 结算确认
			settlementComfirm() {
				this.income = Math.ceil(this.finalPrice / 100) * 100;
				this.backMoney = numberSub(this.income, this.finalPrice);
				this.modal2 = true;
			},

			// 结算创建销售单
			settlement: function() {
				const itemSale = {
					employeeId: this.emp.id,
					memberId: this.memberTelp,
					saleAfterDiscount: this.finalPrice,
					saleDiscountAmount: this.totalDiscount,
					saleTotalAmount: this.total
				}
				const map = new Map([
					['salePrice', 'itemSalePrice'],
					['saleNumber', "count"],
					['saleAfterDiscount', 'saleAfterDiscount'],
					['saleDiscountAmount', 'saleDiscountAmount'],
					['totalAmount', 'totalAmount'],
					["itemId", 'id']
				]);
				var newItemData = arrayReCreate(this.itemData, map);
				this.modal2 = false;;
				// 商品数组（销售单，销售单详情）
				settlement(itemSale, newItemData).then(res => {
					alert('结算成功');
					this.reload();
				});
				console.log("结算中", this.itemData);
			},
			// 计算收银台的价格变化
			recalculation: function(money, isDisc) {
				this.total = numberAdd(this.total, money);
				var price = 0;
				if (isDisc) {
					price = Math.round(numberMul(money, this.discount) * 100) / 100
				} else {
					price = Math.round(numberMul(money, 1) * 100) / 100
				}
				this.finalPrice = numberAdd(this.finalPrice, price);
				var addDiscount = numberSub(money, price)
				this.totalDiscount = numberAdd(this.totalDiscount, addDiscount);
			},

			// 计算单个商品的价格变化
			recalculationItemPrice: function(index, money) {
				var totalAmount = money;
				var saleAfterDiscount = 0;
				if (this.itemData[index].itemDiscState == 1) {
					saleAfterDiscount = Math.round(money * this.discount * 100) / 100
				} else {
					saleAfterDiscount = Math.round(money * 100) / 100
				}
				var saleDiscountAmount = numberSub(totalAmount, saleAfterDiscount);
				this.itemData[index].totalAmount = numberAdd(this.itemData[index].totalAmount, money);
				this.itemData[index].saleAfterDiscount = numberAdd(this.itemData[index].saleAfterDiscount, saleAfterDiscount);
				this.itemData[index].saleDiscountAmount = numberAdd(this.itemData[index].saleDiscountAmount, saleDiscountAmount);
			},
			// 添加商品到收银台
			addItemToCart(obj) {
				var totalAmount = obj.itemSalePrice;
				var saleAfterDiscount = Math.round(obj.itemSalePrice * this.discount * 100) / 100
				var saleDiscountAmount = numberSub(totalAmount, saleAfterDiscount);
				Vue.set(obj, 'count', 1)
				Vue.set(obj, 'saleAfterDiscount', saleAfterDiscount)
				Vue.set(obj, 'saleDiscountAmount', saleDiscountAmount)
				Vue.set(obj, 'totalAmount', totalAmount)

				this.itemData.push(obj);

				this.recalculation(obj.itemSalePrice, obj.itemDiscState == 1);
				console.log("添加商品", obj);
				console.log("收银台商品", this.itemData);
			},
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
				var obj = this.itemData[index];
				var moneyChange = -(numberMul(obj.count, obj.itemSalePrice));
				this.recalculation(moneyChange, obj.itemDiscState == 1);
				this.itemData.splice(index, 1);
			}
		}
	}
</script>

<style>

</style>
