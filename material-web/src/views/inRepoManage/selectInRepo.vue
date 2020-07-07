<template>
	<div align="center">
	<Form ref="inRepository" autoComplete="on" :model="inRepository" class="card-box">
	
				<label style="margin-left: -50px;" class="TitleLable" >&nbsp;单 &nbsp; 号 ：</label>
				<Input type="text" v-model="inRepository.id" placeholder="请输入收货、订货单号" id="id" search
				  clearable style="width: 200px;margin-left: 5px;" >
				</Input>

				<label style="margin-left: 50px;" class="TitleLable" >时间范围：</label>
				<DatePicker type="daterange" split-panels v-model="inRepository.inRepoDate" format="yyyy-MM-dd"
				 placeholder="选择入库的时间范围" style="width: 200px;" ></DatePicker>
				
				<br /><br />
				
				<label style="margin-left:-50px;" class="TitleLable" >&nbsp;员 &nbsp; 工 ：</label>
				<Input type="text" v-model="inRepository.employeeId" placeholder="请输入员工便编号、名字" id="employeeId" search
				  clearable style="width: 200px;margin-left: 5px;" >
				</Input>

				<label style="margin-left: 50px;" class="TitleLable" >入库状态：</label>
				<Select v-model="inRepository.inRepoState" style="width: 90px;" clearable filterable>
					<Option v-for="item in instatelist" :value="item.value" :key="item.value" >{{ item.label }}</Option>
				</Select>

				<Button type="primary" @click="selectInRepository"
				style="height: 32px;margin-left: 30px;width: 75px;"  icon="ios-search">搜 索</Button>
				
				<br /><br />
				
				<Table border :columns="TableColumn" :data="TableData"  ></Table>
				<br />
				<Page :total="pageNum" :page-size="pageSize" show-elevator @on-change="onChange" />
	</Form>
	</div>
</template>

<script>
	import {selectAllInRepo} from '@/api/seachInRepo.js';
	
	export default {
		data(){
			return{
				pageNum:100,
				pageNo:1,
				pageSize:5,
				//表格数据
				TableData:[],
				inRepository:{
					//编号
					id:"",
					//员工编号
					employeeId:"",
					//入库时间
					inRepoDate:"",
					//入库状态
					inRepoState:"",
					
					pageNo:"",
					pageSize:"",
				},
				//入库状态列表
				instatelist:[
					{
						value: "1",
						label: "已入库",
					},{
						value: "0",
						label: "未入库",
					}
				],
				TableColumn: [
					{
						title: '入库单号',
						key: 'id',
						align: 'center',
						width:160
					},{
						title: '收货单号',
						key: 'receiveId',
						align: 'center',
						width:160
					},{
						title: '收货人员 ( 工号 )',
						key: 'empName1',
						align: 'center',
					},{
						title: '入库人员 ( 工号 )',
						key: 'empName2',
						align: 'center',
					},{
						title: '操作日期',
						key: 'inRepoDate',
						sortable: true,
						align: 'center',
						width:190
					},{
						title: '入库状态',
						key: 'inRepoState',
						align: 'center',
						width:120
					},{
						title: '操作',
						key: 'action',
						align: 'center',
						width:120,
						render: (h, params) => {
							return h('div', [
								h('Button-group',{props: {shape: 'circle',}},[
								h('Button', {
									props: {type: 'primary',size: 'small',icon:"eye",},
									style: {width:"65px",height :"30px",},
									on: {
										click: () => {
											//获得当前行
											let index = params.index;
											let receId = this.TableData[index].receiveId;
											let inRepoId = this.TableData[index].id;
											let inRepoState = this.TableData[index].inRepoState;
											//路由转发
											this.$router.push({
												path: "./InRepositoryDetail",
												//传递参数
												query: {
													receId:receId,
													inRepoId:inRepoId,
													inRepoState:inRepoState
												}});
										}
									}
								}, ' 详 情')
								])
							]);
						}
					}
				],
			}
		},
		 methods: {
		
			onChange(currentPage){
				
				this.pageNo = currentPage;
				
				this.selectInRepository();
				
			},
			//查询入库信息
			selectInRepository(){
				
				let inRepository = this.inRepository;
				
				inRepository.pageNo = this.pageNo;
				inRepository.pageSize = this.pageSize;
				
				selectAllInRepo(inRepository).then(res => {
					
					var TableData = res.data.list;
					
					for(var i = 0;i < TableData.length;i++){
						let itemdata = TableData[i];
						if(itemdata.inRepoState == 1){
							itemdata.inRepoState = '已入库'
						} else if(itemdata.inRepoState == 0){
							itemdata.inRepoState = '未入库'
						}
						
						itemdata.empName1 = itemdata.empName1+" ( "+itemdata.employeeId1+" )";
						
						if(itemdata.empName2 != null || itemdata.employeeId2 != null){
							itemdata.empName2 = itemdata.empName2+" ( "+itemdata.employeeId2+" )";
						}else{
							itemdata.empName2 = "";
						}
					}
					
					this.TableData = TableData;
					
					this.pageNum = res.data.total
					
				});
				
			}
			 
		},
		created(){
			
			this.selectInRepository();
			
		}
	}
	
</script>

<style>
	.Lable{
		width: 100px;
		font-size: 15px;
		margin-left: -5px;
	}
	.TitleLable{
		font-weight: bold;
		font-size: 15px;
	}
</style>
