<template>
	<div align="center">
	<Form ref="inRepository" autoComplete="on" :model="inRepository" class="card-box">
	
				<label style="margin-left: -50px;" class="topTitleLable" >&nbsp;单 &nbsp; 号 ：</label>
				<Input type="text" v-model="inRepository.id" placeholder="请输入收货、订货单号" id="id" search
				  clearable style="width: 200px;margin-left: 5px;" >
				</Input>

				<label style="margin-left: 50px;" class="topTitleLable" >时间范围：</label>
				<DatePicker type="daterange" split-panels v-model="inRepository.inRepoDate" format="yyyy-MM-dd"
				 placeholder="选择入库的时间范围" style="width: 200px;" ></DatePicker>
				
				<br /><br />
				
				<label style="margin-left:-50px;" class="topTitleLable" >&nbsp;员 &nbsp; 工 ：</label>
				<Input type="text" v-model="inRepository.employeeId" placeholder="请输入员工便编号、名字" id="employeeId" search
				  clearable style="width: 200px;margin-left: 5px;" >
				</Input>

				<label style="margin-left: 50px;" class="topTitleLable" >入库状态：</label>
				<Select v-model="inRepository.inRepoState" style="width: 90px;" clearable filterable>
					<Option v-for="item in instatelist" :value="item.value" :key="item.value" >{{ item.label }}</Option>
				</Select>

				<Button type="primary" @click="selectInRepository"
				style="height: 32px;margin-left: 30px;width: 75px;"  icon="ios-search">搜 索</Button>
				
				<br /><br />
				
				<Table border :columns="TableColumn" :data="TableData"  ></Table>
				
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
					},{
						title: '收货单号',
						key: 'receiveId',
						align: 'center',
					},{
						title: '收货人员',
						key: 'empName1',
						align: 'center',
					},{
						title: '入库人员',
						key: 'empName2',
						align: 'center',
					},{
						title: '到货状态',
						key: 'inRepoState',
						align: 'center',
					},{
						title: '操作日期',
						key: 'inRepoDate',
						sortable: true,
						align: 'center',
					},{
						title: '操作',
						key: 'action',
						align: 'center',
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
											let TableData = this.TableData[index];
											//路由转发
											this.$router.push({
												path: "./InRepositoryDetail",
												//传递参数
												query: {
													
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
	.topLable{
		width: 100px;
		font-size: 15px;
		margin-left: -5px;
	}
	.topTitleLable{
		font-weight: bold;
		font-size: 15px;
	}
</style>
