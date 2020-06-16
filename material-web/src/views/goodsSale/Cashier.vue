<template>
	<div>

		<h1 style="font-size: 60px;">收银台</h1>
		<Modal v-model="modal1" title="商品数量" width="300" @on-ok="ok" @on-cancel="cancel">
			<Input v-model="itemCount" placeholder="请输入商品数量" style="width: 25%" />
			<!-- <div slot="footer"></div> -->
		</Modal>
		<p>
			<Input v-model="keyWord" placeholder="请输入商品编号/拼音码/五笔码" style="width: 50%" @on-change="searchItem" />
			<Input @keyup.enter.native="loadMemberInfo" v-model="memberTelp" placeholder="会员手机号" style="width: 20%; margin-left: 50px;" />

			<Button v-on:click="gotoView('/saleList')" type="warning" style="margin-left: 50px;">申请退货</Button>


			<Dropdown class="nav-item">
				<a href="javascript:void(0)">
					<span slot="button">
						<img src="static/img/avatars/6.jpg" class="img-avatar" alt="o">
						<span class="d-md-down-none">admin</span>
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
		</p>
		<p v-if="user != null" style="width: 70%;font-size: 24px;white-space:nowrap; ">
			<label style="width: 200px; text-align: left;">顾客姓名:{{user.name}}</label>
			<label style="width: 200px; margin-left: 50px;text-align: left;">会员类型:{{user.memberClass}}</label>
		</p>
		<div width="90%">


			<Table border :columns="header" :data="itemData" height="400"></Table>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<h3 style="font-size: 24px; font-weight: 900; margin-left: 5%;">总金额:{{total}} 元</h3>
			<h3 style="font-size: 24px; font-weight: 900; margin-left: 5%;">优惠金额:{{total}} 元</h3>
			<h3 style="font-size: 24px; font-weight: 900; margin-left: 5%;">折后价:{{total}} 元</h3>
			<Button size="large" type="primary" style="margin-right: 15%; margin-top: 1px;" v-on:click="settlement">结算</Button>
		</div>

	</div>

</template>

<script>
	import {getMemberInfo} from '@/api/member.js'
	export default {
		name: "table-main",
		components: {

		},

		data() {
			return {
				memberTelp:'',
				total: 389.45,
				// member: {
				// 	memberTelp: '小平',
				// 	memberName: '黄金会员',
				// 	memberIdNum: 15574
				// },
				modal1: false,
				header: [{
						title: '货号',
						key: 'name',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'person'
									}
								}),
								h('strong', params.row.name)
							]);
						}
					},
					{
						title: '商品名',
						key: 'age',
						sortable: true
					},
					{
						title: '规格',
						key: 'address'
					},
					{
						title: '拼音码',
						key: 'address'
					},
					{
						title: '单位',
						key: 'address'
					},
					{
						title: '零售价',
						key: 'address'
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
											min: 0
										},

										on: {
											"on-blur": event => {
												//判断输入框是否为空，为空的话虚拟字段变成“不能为空”
												if (event.target.value == "") {
													this.data5[param.index].valid = "不能为空";
												} else {
													//不为空，即通过验证，将值附上去，然后把虚拟字段置空
													params.row.name = event.target.value;
													this.data5[param.index].name = event.target.value;
													this.data5[param.index].valid = "";
												}

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
						key: 'address'
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
											this.remove(params.index)
										}
									}
								}, 'Delete')
							]);
						}
					}
				],
				itemData: [{
						name: 'John Brown',
						age: 18,
						address: 'New York No. 1 Lake Park'
					},
					{
						name: 'Joe Black',
						age: 87,
						address: 'Sydney No. 1 Lake Park'
					}
				]
			}
		},


		// created:function() {
		//   //在created函数中使用axios的get请求向后台获取用户信息数据
		//   this.$ajax('/online/base/queryJxjh?speciality=市场营销').then(res => {
		//     this.tableData = res.data.data
		//     console.log(res.data.data);
		//   }).catch(function (error) {
		//     console.log(error);
		//   });
		// },
		methods: {
			gotoView: function(path) {
				this.$router.replace(path)
			},
			loadMemberInfo: function() {
				getMemberInfo(this.memberTelp).then(res => {
					this.member = res.data
					console.log(res.data);
				  }).catch(function (error) {
					console.log(error);
				  });
			},
			searchItem:function(){
				console.log("关键词",this.keyWord);
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
				console.log("结算中", this);
			},
			addGoods: function() {

			},
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
				this.data6.splice(index, 1);
			}
		}

	}
</script>

<style scoped>

</style>
