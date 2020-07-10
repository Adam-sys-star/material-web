<template>
	<div>
		<!-- <h1 style="font-size: 60px; text-align: center;">会员管理</h1> -->

		<Modal v-model="modal2" title="确认删除" width="300px"
		 :styles="{top: '60px'}" @on-ok="ok" @on-cancel="cancel">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span width="100px">确认删除？</span>
			</p>
			<div style="text-align:center">
				<p>请确认是否删除该条记录</p>

			</div>
			<div slot="footer">
				<Button type="error" long :loading="modal_loading" @click="del">删除</Button>
			</div>
		</Modal>

		<Modal v-model="modal1" title="会员注册" width="500px" @on-ok="ok" @on-cancel="cancel">
			<Row>
				<Col span=6>
				<label class="member_title">手机号</label>
				</Col>
				<Input v-model="member.memberTelp" placeholder="请输入客户的手机号" style="width: 300px;" @keyup.enter.native="searchSaleList"></Input>
			</Row>
			<br />

			<Row>
				<Col span=6>
				<label class="member_title">身份证号</label>
				</Col>
				<Input v-model="member.memberIdNum" placeholder="请输入客户的身份证号" style="width: 300px;" @keyup.enter.native="searchSaleList"></Input>
			</Row>
			<br />
			<Row>
				<Col span=6>
				<label class="member_title">姓名</label>
				</Col>
				<Input v-model="member.memberName" placeholder="请输入客户的姓名" style="width: 300px;" @keyup.enter.native="searchSaleList"></Input>
			</Row><br />
			<Row>
				<Col span=6>
				<label class="member_title">会员类型</label>
				</Col>
				<Select v-model="member.memberClassId" style="width:300px">
					<Option v-for="item in memberClass" :value="item.id" :key="item.id">{{ item.memberClassName }}</Option>
				</Select>
			</Row><br />
			<Row>
				<Col span=12>
				<Button v-on:click="register" type="warning" style="width: 80px;margin-left: 50px;">保存</Button>

				</Col>
				<Col span=12>

				<Button v-on:click="cancel" type="warning" style="width: 80px;margin-right: 50px;">取消</Button>
				</Col>
			</Row>
			<div slot="footer"></div>
		</Modal>

		<Row>
			<div style="width: 90%;">
				<Button v-on:click="registerView" type="warning" style="float: right;">注册会员</Button>
			</div>
		</Row>
		<br />
		<Table border :columns="memberHeader" :data="memberData" height="400"></Table>
	</div>
</template>

<script>
	import {
		register,
		getMemberList,
		delMember,
		getMemberRule
	} from '@/api/member.js'
	import {
		formatDate
	} from '@/utils/dataFormat.js'
	export default {
		inject: ['reload'],
		data() {
			return {
				member: {
					memberName: '',
					memberClassId: '',
					memberIdNum: '',
					memberTelp: ''
				},
				modal2: false,
				memberClass: [],
				model2: 'Canberra',
				modal1: false,
				memberHeader: [{
						title: '手机号',
						key: 'memberTelp',
						sortable: true,
						width: 110
					},
					{
						title: '客户姓名',
						key: 'memberName',
						width: 90
					},
					{
						title: '身份证号',
						key: 'memberIdNum',
						width: 160
					},
					{
						title: '会员类型',
						key: 'memberClassId',
						width: 90,
						render: (h, params) => {
							return h('div',
								this.stateFormat(params.row, null)
							)
						}
					},
					{
						title: '注册时间',
						key: 'memberRegTime',
						width: 150,
						render: (h, params) => {
							return h('div',
								formatDate(new Date(params.row.memberRegTime), 'yyyy-MM-dd')
							)
						}
					},
					{
						title: '至今总消费金额（元）',
						key: 'memberAmountMoney'
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
											this.showInfo(params.index)
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.delIndex = params.index;
											// this.remove(params.index)
											this.modal2 = true;
										}
									}
								}, '删除')
							]);
						}
					}
				],
				memberData: [],

			}
		},
		created: function() {
			this.reloadMemberData();
			this.loadMemberClass();
		},
		methods: {
			reloadMemberData: function() {
				getMemberList().then(res => {
					this.memberData = res.data
					console.log(res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},
			loadMemberClass() {
				getMemberRule().then(res => {
					this.memberClass = res.data
					console.log(res.data);
				}).catch(function(error) {
					console.log(error);
				});
			},
			register: function() {
				register(this.member);
				this.reload();
				this.modal1 = false;
			},
			registerView: function() {
				this.modal1 = true;
			},
			showInfo: function(index) {
				this.member = this.memberData[index];
				this.modal1 = true;
			},
			del: function() {
				delMember(this.memberData[this.delIndex].memberTelp).then(res => {
					this.modal2 = false;
					console.log("删除成功");
					this.memberData.splice(this.delIndex, 1);
				}).catch(function(error) {
					console.log(error);
				});
			},
			stateFormat: function(row, column) {
				for (var i = 0; i < this.memberClass.length; i++) {
					if ('' + row.memberClassId == this.memberClass[i].id) {
						return this.memberClass[i].memberClassName;
					}
				}
				return '错误';
			},
			ok() {
				// this.$Message.info('Clicked ok');
			},
			cancel() {
				this.$Message.info('Clicked cancel');
				this.reload();
			}
		}
	}
</script>

<style>
	.member_title {
		font-size: 18px;
	}
</style>
