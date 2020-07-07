<template>
	<div>
		<h1 style="font-size: 60px; text-align: center;">会员规则</h1>

		<Modal v-model="modal2" title="确认删除" width="300px" @on-ok="ok" @on-cancel="cancel">
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

		<Modal v-model="modal1" title="添加会员规则" width="500px" @on-ok="ok" @on-cancel="cancel">
			<Row>
				<Col span=5>
				<label class="member_title">会员名称</label>
				</Col>
				<Input v-model="memberClassName" placeholder="请输入会员名称" style="width: 300px;" @keyup.enter.native="searchSaleList"></Input>
			</Row>
			<br />

			<Row>
				<Col span=5>
				<label class="member_title">会员折扣</label>
				</Col>
				<InputNumber :max="1" :min="0.1" :step="0.02" v-model="memberClassDiscount" placeholder="请输入会员折扣" style="width: 300px;"></InputNumber>
				<!-- <Input v-model="memberClassDiscount" placeholder="请输入会员折扣" style="width: 300px;" @keyup.enter.native="searchSaleList"></Input> -->
			</Row>
			<br />

			<Row>
				<Col span=16>
				<Button v-on:click="createRule" type="warning" style="width: 80px;margin-left: 50px;">添加</Button>

				</Col>
				<Col span=6>

				<Button v-on:click="cancel" type="warning" style="width: 80px;margin-right: 50px;">取消</Button>
				</Col>
			</Row>
			<div slot="footer"></div>
		</Modal>

		<Row>
			<Col span=3 offset=16>
			<Button v-on:click="createView" type="warning" style="float: right;">添加规则</Button>
			</Col>
			<Col span=3>
			<Button v-on:click="saveModify" type="warning" style="float: right;">保存修改</Button>
			</Col>
		</Row>
		<br />
		<Table border :columns="memberRuleHeader" :data="memberRuleData" height="400"></Table>
	</div>
</template>

<script>
	import {
		createRule,
		getMemberRule,
		saveModify,
		delRule
	} from '@/api/member.js'
	export default {
		inject: ['reload'],
		data() {
			return {
				memberClassName: '',
				memberClassDiscount: 1,
				modifyData: [],
				delIndex: -1,
				modal1: false,
				modal2: false,
				memberRuleHeader: [{
						title: '规则编号',
						key: 'id',
						sortable: true
					},
					{
						title: '会员名称',
						key: 'memberClassName'
					},
					{
						title: '会员折扣',
						key: 'memberClassDiscount',
						render: (h, param) => {
							let vm = this;
							return h(
								"div", {
									props: {}
								},
								[
									h("InputNumber", {
										props: {
											step: 0.02,
											value: param.row.memberClassDiscount,
											// value: param.row.memberClassDiscount,
											min: 0,
											max: 1
										},

										on: {
											"on-change": event => {
												//判断输入框是否为空，为空的话虚拟字段变成“不能为空”
												console.log(event)
												if (event == "") {
													this.memberRuleData[param.index].valid = "不能为空";
												} else {
													//不为空，即通过验证，将值附上去，然后把虚拟字段置空
													param.row.memberClassDiscount = event;
													this.memberRuleData[param.index].memberClassDiscount = event;
													this.memberRuleData[param.index].valid = "";
													this.modifyData.push(this.memberRuleData[param.index]);
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
						title: '操作',
						key: 'action',
						width: 100,
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
				memberRuleData: [],

			}
		},
		created: function() {
			getMemberRule().then(res => {
				this.memberRuleData = res.data
				console.log(res.data);
			}).catch(function(error) {
				console.log(error);
			});
		},
		methods: {
			createRule: function() {
				createRule(this.memberClassName, this.memberClassDiscount);
				this.reload();
				this.modal1 = false;
			},
			createView: function() {
				console.log("请求会员注册")
				this.modal1 = true;
			},
			saveModify: function() {
				let finalData = this.unique(this.modifyData);
				saveModify(finalData).then(res=>{
					alert("保存成功")
				}).catch(error=>{
					alert("保存失败")
				});
				
				console.log(finalData);
			},
			del: function() {
				delRule(this.memberRuleData[this.delIndex].id).then(res => {
					this.modal2 = false;
					console.log("删除成功");
					this.memberRuleData.splice(this.delIndex, 1);
				}).catch(function(error) {
					console.log(error);
				});
			},
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
			},
			ok() {
				// this.$Message.info('Clicked ok');
			},
			cancel() {
				this.$Message.info('Clicked cancel');
				this.memberClassDiscount = 1;
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
