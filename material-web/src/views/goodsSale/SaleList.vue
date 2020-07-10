<template>
	<div width="90%" :styles="{top: '50px'}">
		<!-- <h1 style="font-size: 60px; text-align: center;">销售记录</h1> -->
		<br/>
		<Modal v-model="modal1" title="销售单明细" width="1000px"
		 @on-ok="ok" @on-cancel="cancel" :styles="{top: '60px'}">
			<SaleDetail :itemSaleId="itemSaleId"></SaleDetail>
			<div slot="footer"></div>
		</Modal>
		<Modal v-model="modal2" title="确认退货" width="300px"
		 :styles="{top: '60px'}" @on-ok="ok" @on-cancel="cancel">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span width="100px">确认退货？</span>
			</p>
			<div style="text-align:center">
				<p>请确认是否退货</p>

			</div>
			<div slot="footer">
				<Button type="error" long :loading="modal_loading" @click="del">退货</Button>
			</div>
		</Modal>
		<Row>
			<Col offset="1" span="11" style="">
			<DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px" @on-change="reloadSaleData"></DatePicker>
			--
			<DatePicker v-model="endTime" type="date" placeholder="Select date" style="width: 200px" @on-change="reloadSaleData"></DatePicker>
			</Col>

			<Col span="4" offset="1">
			<Input v-model="key" placeholder="订单号/操作人/顾客名" style="width: 200px;" @keyup.enter.native="reloadSaleData"></Input>
			</Col>

			<Col span="2" offset="1">
			<!-- <Input v-model="key" placeholder="退货状态" @keyup.enter.native="reloadSaleData"></Input> -->
			<Select v-model="backSaleState" style="width:100px" placeholder="退货状态" @on-change="reloadSaleData" >
				<Option :value="0" :key="0">已退货</Option>
				<Option :value="1" :key="1">未退货</Option>
				<Option :value="2" :key="2">全部</Option>
			</Select>
			</Col>
			<Button v-on:click="gotoView('/cashier')" type="warning" style="margin-left: 50px;">返回收银台</Button>
		</Row>
		<br>

		<Table border :columns="saleListHeader" :data="saleListData" height="400"></Table>
	</div>
</template>

<script>
	import SaleDetail from '@/views/goodsSale/SaleDetail.vue'
	import {getSaleList,backSake} from '@/api/sale.js'
	import {formatDate} from '@/utils/dataFormat.js'
	import {getAllEmp} from '@/api/employee.js'
	import {getMemberList} from '@/api/member.js'
	export default {
		name: "sale-list",
		components: {
			SaleDetail
		},
		inject: ['reload'],
		watch: {
			'startTime': function(newValue) {
				console.log('前置');
				this.reloadSaleData();
			},
			'endTime': function(newValue) {
				this.reloadSaleData();
			}
		},
		data() {
			return {
				key: "",
				startTime: null,
				endTime: null,
				backSaleState:1,
				modal1: false,
				itemSaleId: '',
				modal2: false,
				empMap:null,
				memberMap:null,
				saleListHeader: [
					{
						title: '序号',
						width:70,
						render: (h, params) => {
							return h('div',
								params.index+1
							)
						},
					},{
						title: '订单号',
						key: 'id',
						sortable: true
					},
					{
						title: '操作员',
						key: 'employeeId',
						width: 100,
						render: (h, params) => {
							return h('div',
								this.empMap.get(params.row.employeeId)
							)
						},
					},
					{
						title: '顾客姓名',
						key: 'memberId',
						render: (h, params) => {
							return h('div',
								this.memberMap.get(params.row.memberId)
							)
						},
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
						width:150,
						render: (h, params) => {
							return h('div',
								formatDate(new Date(params.row.saleTime), 'yyyy-MM-dd hh:mm')
							)
						},
						sortable: true
					},
					{
						title: '操作',
						key: 'action',
						width: 125,
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
								}, '详单'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small',
										disabled: (params.row.saleRejectRemark == 0)
									},
									on: {
										click: () => {
											this.delIndex = params.index;
											this.modal2 = true;
										}
									}
								}, '退货')
							]);
						}
					}
				],
				saleListData: [],
			}
		},

		created: function() {
			this.reloadEmpData();
			this.reloadMemberData();
			this.reloadSaleData();
		},
		methods: {
			// 页面跳转
			gotoView: function(path) {
				this.$router.replace(path)
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

			// 重新载入销售单
			reloadSaleData: function() {
				getSaleList(this.startTime, this.endTime, this.key,this.backSaleState).then(res => {
					this.saleListData = res.data
					console.log(res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},
			
			//导入员工数据，用于显示时替换员工id 
			reloadEmpData: function() {
				getAllEmp().then(res => {
					var empList = res.data
					this.empMap = new Map([]);
					for(var i=0;i<empList.length;i++){
						this.empMap.set(empList[i].id,empList[i].empName)
					}
					console.log("员工列表信息",res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},
			//导入客户数据，用于显示时替换客户id
			reloadMemberData: function() {
				getMemberList().then(res => {
					var memberList = res.data;
					this.memberMap = new Map([]);
					for(var i=0;i<memberList.length;i++){
						this.memberMap.set(memberList[i].memberTelp,memberList[i].memberName)
					}
					console.log("会员列表信息",res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},

			// 退货
			del: function() {
				backSake(this.saleListData[this.delIndex].id).then(res => {
					this.modal2 = false;
					console.log("退货成功");
					this.reload();
				}).catch(function(error) {
					console.log(error);
				});
			},

			show(index) {
				this.itemSaleId = this.saleListData[index].id;
				console.log("itemSaleId", this.itemSaleId);
				this.modal1 = true;
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
