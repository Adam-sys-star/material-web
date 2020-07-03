<template>
	<div>
		
		<Form ref="RemainDetail" autoComplete="on" :model="RemainDetail"  class="card-box">
				<Row >
					<Col span="5">
						<label style="" class="topTitleLable" >仓库名称：</label>
						<label style="" class="topLable" >{{RemainInfo.repoName}}</label>
					</Col>
					<Col span="6">
						<label style="" class="topTitleLable" >商品货号：</label>
						<label style="width: 200px;" class="topLable" >{{RemainInfo.id}}</label>
					</Col>
					<Col span="5">
						<label style="" class="topTitleLable" >商品名称：</label>
						<label style="" class="topLable" >{{RemainInfo.itemName}}</label>
					</Col>
					<Col span="6">
						<label style="" class="topTitleLable" >商品类别：</label>
						<label style="" class="topLable" >{{RemainInfo.itemClassName}}</label> 
					</Col>
				</Row>
				<Row>
					<Col span="5">
						<label style="" class="topTitleLable" >生产厂家：</label>
						<label style="" class="topLable" >{{RemainInfo.itemFactoryName}}</label>
					</Col>
					<Col span="6">
						<label style="" class="topTitleLable" >最近入库：</label>
						<label style="" class="topLable" >{{RemainInfo.inRepoDate}}</label>
					</Col>
					<Col span="5">
					<label style="" class="topTitleLable" > 总 成 本 ：</label>
					<label style="" class="topLable" >{{RemainInfo.remainAllInPic}}</label>
					</Col>
					<Col span="4">
						<label style="" class="topTitleLable" > 总 库 存 ：</label>
						<label style="" class="topLable" >{{RemainInfo.totalRemain}}</label>
					</Col>
					<Col span="4">
					<label style="" class="topTitleLable" >平均成本：</label>
					<label style="" class="topLable" >{{RemainInfo.avgInPic}}</label>
					</Col>
				</Row>
				
				<Row style="margin-top: 10px;">
					<hr style="height:2px;border:none;border-top:2px dotted #979797;
					margin-top: 15px;width: 10%;float: left;" />
					<label style="float: left;font-size: 15px;font-weight: 500;color: #979797;" >&nbsp;库 存 查 询&nbsp;</label>
					<hr style="height:2px;border:none;border-top:2px dotted #979797;
					margin-top: 15px;width: 45%;float: left;" />
					
					<hr style="height:2px;border:none;border-top:2px dotted #979797;margin-left: 35px;
					margin-top: 15px;width: 18.5%;float: left;" />
					<label style="float: left;font-size: 15px;font-weight: 500;color: #979797;" >&nbsp;数 据 统 计&nbsp;</label>
					<hr style="height:2px;border:none;border-top:2px dotted #979797;
					margin-top: 15px;width: 69px;float: left;" />
				</Row>
				
				<Row style="margin-top: 25px;">
					<Col span="8">
						<label style="" class="topTitleLable" >库存情况：</label>
						<Select v-model="RemainDetail.remainStatus" style="float: left;width: 100px;" filterable 
								:label-in-value="true"  @on-change="value=>{selectChange(value)}"   >
							<Option v-for="item in remainList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
						</Select>
						<label style="margin-left: 6px;width: 18px;" class="topTitleLable" > <= </label>
						<Input type="text" v-model="RemainDetail.totalRemain" placeholder="库存数量" id="totalRemain" search
						  clearable style="float: left;width: 100px;margin-left: 5px;" :disabled="isDisabled" >
						</Input>
					</Col>
					<Col span="8">
						<label style="" class="topTitleLable" >&nbsp;供 应 商 ：</label>
						<Select v-model="RemainDetail.supplierId" style="float: left;width: 194px;"  clearable
						 placeholder="选择供应商" filterable>
							<Option v-for="item in supplierlist" :value="item.value" :key="item.value" >{{ item.label }}</Option>
						</Select>
					</Col>
				</Row>
				<Row style="margin-top: 15px;">
					<Col span="8">
						<label style="" class="topTitleLable" >时间范围：</label>
						<DatePicker type="daterange" split-panels v-model="RemainDetail.inRepoDate" format="yyyy-MM-dd"
						 placeholder="选择入库的时间范围" style="float:left;width: 230px;" ></DatePicker>
					</Col>
					<Col span="8">
						<label style="" class="topTitleLable" >入库批次：</label>
						<Select v-model="RemainDetail.times" style="float: left;width: 90px;" clearable
						 placeholder="选择批次" filterable>
							<Option v-for="item in timeslist" :value="item.value" :key="item.value" >{{ item.value }}</Option>
						</Select>
						<Button type="primary" @click="selectTheRemainDetail"
						style="height: 32px;float: left;margin-left: 30px;width: 75px;"  icon="ios-search">搜 索</Button>
					</Col>
				</Row >
					
				<Row style="margin-top: 15px;">
					<Col span="15">
						<Table border :columns="TableColumn" :data="TableData"  ></Table>
					</Col>
					<Col span="9" style="margin-top: -110px;" >
						<remain-visitor> </remain-visitor>
					</Col>
				</Row >
					
				<Row style="margin-top: 15px;margin-left: 115px;">
					<Col span="15">
						<Page :total="pageNum" :page-size="pageSize" show-elevator @on-change="onChange" />
					</Col>
				</Row >
		</Form>
		
	</div>
</template>

<script>
	
	import {selectRemainDetail,getTimesAndSup} from '@/api/searchRemain.js';
	import { validateNum } from 'utils/validate';
	import RemainVisitor from './RemainDetailVisitor.vue';
	
	import {getTheRemainDetail} from './RemainDetailVisitor.vue';
	
	export default {
		components:{RemainVisitor},
		data(){
			return{
				TableData:[],
				pageNum:100,
				pageNo:1,
				pageSize:5,
				//查询条件
				RemainDetail:{
					//商品货号
					id:"",
					// 供应商编号
					supplierId:"",
					//入库时间范围
					inRepoDate:["",""],
					//批次
					times:"",
					//库存情况
					remainStatus:"2",
					//库存数量
					totalRemain:"",
					pageNo:"",
					pageSize:""
				},
				//传递过来的信息
				RemainInfo:{
					 id:"商品货号",
					 itemName:"商品名称",
					 itemClassName:"商品类别",
					 itemFactoryName:"工厂名称",
					 repoName:" 仓库名称",
					 totalRemain:"总 库 存",
					 remainAllInPic:"总 成 本",
					 inRepoDate:"最近入库",
					 avgInPic:"平均价格",
				},
				timeslist:[{value:1},{value:1}],
				supplierlist:[],
				remainList:[
					{
						value: "1",
						label: "全部",
					},{
						value: "2",
						label: "有库存",
					},{
						value: "3",
						label: "无库存",
					}
				],
				TableColumn: [
					{
						title: '批次',
						key: 'times',
						sortable: true,
						align: 'center',
						width:80,
					},{
						title: '进货单价(元)',
						key: 'repoRemainInPic',
						sortable: true,
						align: 'center',
						width:125,
					},{
						title: '当前库存(件)',
						key: 'remainAmount',
						sortable: true,
						align: 'center',
						width:125,
					},{
						title: '供应商',
						key: 'supplierName',
						align: 'center',
						width:110,
					},{
						title: '入库时间',
						key: 'inRepoDate',
						sortable: true,
						align: 'center',
					}
				],
			}
		},methods:{
			selectTheRemainDetail(){
				
				let detail = this.RemainDetail;
				
				if(detail.totalRemain != ""){
					 //判断数字格式
					let b = validateNum(detail.totalRemain);
					if(!b){
						this.$Notice.error({
							title: '格式错误',
							desc:  '库存数量格式为数字、小数点'
						});
						return;
					}
				}
				
				detail.pageNo = this.pageNo;
				detail.pageSize = this.pageSize;
				
				selectRemainDetail(detail).then(res => {
					
					this.TableData = res.data.list;
					
					this.pageNum = res.data.total
					
					var itemDatas = res.data.list;
					
					// 修改饼状图
					getTheRemainDetail(detail.id,detail.totalRemain,detail.inRepoDate,detail.supplierId);
					
				});
				
			},
			//修改时间选择器的时区问题
			// getPublishDtBegin(dateTime){
			// 	alert(dateTime)
			//       this.RemainDetail.publishDtBegin = dateTime;
			//   },
			//获取路由的参数
			getParams(){
				
				// 取到路由带过来的参数
				const query = this.$route.query;
				
				//判断访问的参数
				 if(query != null){
					
					let info = this.RemainInfo;
					
					this.RemainDetail.id = query.id;
					
					//动态赋值
					 info.id=query.id;
					 info.itemName=query.itemName
					 info.itemClassName=query.itemClassName;
					 info.itemFactoryName=query.itemFactoryName;
					 info.repoName=query.repoName;
					 info.totalRemain=query.totalRemain;
					 info.remainAllInPic=query.remainAllInPic;
					 info.inRepoDate=query.inRepoDate.substring(0,11);
					 
					info.avgInPic= (Math.round(info.remainAllInPic / info.totalRemain * 100)/100 )+" 元 / 件";
					
					info.totalRemain = info.totalRemain+" 件";
					info.remainAllInPic=info.remainAllInPic+" 元";
				 }
			  
			},
			onChange(currentPage){
				
				this.pageNo = currentPage;
				
				this.selectTheRemainDetail();
			},
			//根据库存情况下拉款的选择触发事件 修改库存数量文本款是否禁用
			selectChange(value){
				console.log(value)
				if(value.value == 3){
					this.isDisabled = true;
					this.RemainDetail.totalRemain = "";
				}else{
					this.isDisabled = false;
				}
			},
			//获得批次和供应商
			getTimesAndSup(){
				
				getTimesAndSup(this.RemainDetail.id).then(res => {
					
					let timeslist = this.timeslist;
					
					this.timeslist = res.data.times.map(item => {
						return {
							value: item,
						}
					})
					
					this.supplierlist = res.data.suppliers.map(item => {
						return {
							value: item.id,
							label: item.supplierName
						}
					})
					
					
				});
				
			}
		},
	   //监听路由
	   watch: {
			'$route': 'getParams'
		},
		//钩子函数，在组件完成创建后触发
		created(){
			
			//获取f访问该页面时传递过来的参数
			this.getParams()
			
			this.getTimesAndSup();
			
			this.selectTheRemainDetail();
			
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
		float: left;
		font-size: 15px;
	}
</style>
