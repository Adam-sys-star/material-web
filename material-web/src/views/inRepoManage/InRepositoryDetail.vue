<template>
	<div align="center">
		
		<!-- 商品信息 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 200px;" >商品信息：</label>
		<Input type="text" v-model="InRepoDetail.itemId" placeholder="请输入商品货号、名称" id="itemId" search
		  clearable style="float: left;width: 200px;" >
		</Input>
		<!-- 供 应 商 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 30px;" >供 应 商：</label>
		<Input type="text" v-model="InRepoDetail.supplierId" placeholder="请输入供应商编号、名称" id="itemId" search
		  clearable style="float: left;width: 200px;" >
		</Input>
		
		<br /><br />
		
		<!-- 售价范围 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 200px;" >入库数量：</label>
		<Input type="text" v-model="InRepoDetail.inRepoNumber1" placeholder="￥" id="itemSalePrice1" search
		  clearable style="float: left;width: 85px;" >
		</Input>
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 11px;margin-right: 10px;" >~</label>
		<Input type="text" v-model="InRepoDetail.inRepoNumber2" placeholder="￥" id="itemSalePrice2" search
		  clearable style="float: left;width: 85px;" >
		</Input>
		
		
		<Button type="primary" @click="selectInRepoDetail"
		style="height: 32px;margin-left: 100px;width: 75px;float: left;"  icon="ios-search">搜 索</Button>
		
		<Button type="success" @click="addInRepositoryDetail"
		style="height: 32px;margin-left: 22px;width: 100px;float: left;" :disabled=isDisabled >✔ 确认入库</Button>
		
		<br /><br /><br />
		
		<Table border :columns="TableColumn" :data="TableData"  ></Table>
		<br />
		<Page :total="pageNum" ref="pageno" :page-size="pageSize" show-elevator @on-change="onChange" />
	</div>
</template>

<script>
	
	import {selectInRepoDetail,addInRepositoryDetail} from '@/api/seachInRepo.js';
	import { validateNum } from 'utils/validate';
	
	export default{
		
		data(){
			return{
				TableData:[],
				productTypeList:[
					{
						value:1,
						label:"一号仓库"
					}
				],
				isDisabled:false,
				pageNum:100,
				pageNo:1,
				pageSize:10,
				textvalue:[],
				selectvalue:"",
				InRepoDetail:{
					//收货编号
					receId:"",
					//入库编号
					inRepoId:"",
					//货号  or 商品名称
					itemId:"",
					//供应商编号
					supplierId:"",
					//货源数量
					inRepoNumber1:"",
					//货源数量
					inRepoNumber2:"",
					//仓库编号
					repoId:"",
					//入库状态
					inRepoState:"",
					pageNo:"",
					pageSize:"",
				},
				//入库数据
				inRepoInfos:[],
				inRepoList:{
					employeeId:"",
					ilq:[]
				},
				TableColumn: [
					{
						title: '货号',
						key: 'itemId',
						align: 'center',
						// width:80,
					},{
						title: '商品名称',
						key: 'itemName',
						align: 'center',
						width:180,
					},{
						title: '供应商名称',
						key: 'supplierName',
						align: 'center',
						width:180,
					},{
						title: '单价(元)',
						key: 'itemLatelyPic',
						align: 'center',
						sortable: true,
						width:110,
					},{
						title: '入库数量(件)',
						key: 'itemsNumber',
						align: 'center',
						sortable: true,
						width:130,
					},{
						title: '仓库分配',
						key: 'repoAllo',
						align: 'center',
						width:240,
						render: (h, params) => {
							return h('div',
							{props: {}},[
							//文本框,value:params.row.itemsNumber
							h('Input', {
								props: {type: 'text',size: 'big',placeholder:"数量",disabled:this.isDisabled,value:this.textvalue[params.index]},
								style: {width:"80px",height :"30px"},
								on: {
									'on-enter': event => {
										// alert(event.target._value)
										//判断为空
										if(event.target._value == ""){
											this.$Notice.warning({
											       title: '警告',
											       desc:  '数量不可为空',
											});
											return;
										}
										
										 //判断数字格式
										let b = validateNum(event.target._value);
										if(!b){
											this.$Notice.warning({
												title: '警告',
												desc:  '入库数量格式为数字、小数点'
											});
											return;
										}
										
										//列数
										let index = params.index;
										//获取集合
										let info = this.inRepoInfos;
										
										//获得当前列的货号
										let itemsNumber = this.TableData[index].itemsNumber;
										//判断是否数量过大
										if(event.target._value > itemsNumber || event.target._value <= 0){
											this.$Notice.warning({
											       title: '警告',
											       desc:  '入库数量不合理',
											});
											return;
										}
										
										//获得当前列的货号
										let itemId = this.TableData[index].itemId;
										//循环获得
										for(let i = 0;i < info.length; i++){
											
											if(itemId == info[i].itemId){
												//长度为零
												if(info[i].repoId == ""){
													this.$Notice.warning({
													       title: '警告',
													       desc:  '需要选择仓库',
												    });
													return ;
												}else{
													info[i].inRepoNumber = event.target._value;
													
													this.$Notice.success({
													       title: '成功',
													       desc:  '入库分配成功',
													});
												}
											}
										}
									}
								}
							}),
							//选择器
							h('Select', {
							  props: {size: 'big',placeholder:"选择仓库",disabled:this.isDisabled,value:this.selectvalue},
							  style: {width:"85px",marginLeft:"5px"},
							  on: {
								'on-change': e => {
									//添加值
									//列数
									let index = params.index;
									//获取集合
									let info = this.inRepoInfos;
									//获得当前列的货号
									let itemId = this.TableData[index].itemId;
									
									//循环获得
									for(let i = 0;i < info.length; i++){
										
										if(itemId == info[i].itemId){
											
											info[i].repoId = e;
										}
									}
								}
							  }
							},
							this.productTypeList.map((item) => { // this.productTypeList下拉框里的data
							  return h('Option', { // 下拉框的值
								props: {
								  value: item.value,
								  label: item.label
								}
							  })
							})),
						])
						
						}
					}
				],
			}
		},
		methods:{
			onChange(currentPage){
				
				this.pageNo = currentPage;
				
				this.selectInRepoDetail();
				
			},
			addInRepositoryDetail(){
				
				let info = this.inRepoInfos;
				
				for(let i = 0;i < info.length; i++){
					if(info[i].repoId == "" || info[i].inRepoNumber == ""){
						this.$Notice.error({
							title: '警告',
							desc:  '商品 '+info[i].itemId+' 未分配入库'
						 });
						return;
					}
					
					if(info[i].needInRepoNumber > info[i].inRepoNumber){
						this.$Notice.error({
							title: '警告',
							desc:  '商品 '+info[i].itemId+' 未完全分配'
						 });
						return;
					}
				}
				
				this.inRepoList.employeeId = this.$store.getters.id;
				this.inRepoList.ilq = this.inRepoInfos;
				
				
				addInRepositoryDetail(this.inRepoList).then(res => {
					if(res.data == true){
						this.$Notice.success({
							title: '成功',
							desc:  '商品入库成功'
						 });
						this.$router.push("./selectInRepo");
					}else{
						this.$Notice.error({
							title: '错误',
							desc:  '商品入库失败'
						 });
					}
				});
				
			},
			selectInRepoDetail(){
				
				let InRepoDetail = this.InRepoDetail;
				
				if(InRepoDetail.inRepoNumber1 != ""){
					 //判断数字格式
					let b = validateNum(InRepoDetail.inRepoNumber1);
					 if(!b){
						this.$Notice.error({
							title: '格式错误',
							desc:  '售价范围格式为数字、小数点'
						 });
						 return;
					 }
				}
				
				if(InRepoDetail.inRepoNumber2 != ""){
					 //判断数字格式
					let b = validateNum(InRepoDetail.inRepoNumber2);
					if(!b){
						this.$Notice.error({
							title: '格式错误',
							desc:  '售价范围格式为数字、小数点'
						});
						return;
						
					}
				}
				
				//判断售价范围的判断 并 交换
				if(InRepoDetail.inRepoNumber1 != "" && InRepoDetail.inRepoNumber2 != ""  && InRepoDetail.inRepoNumber1 > InRepoDetail.inRepoNumber2){
					
					let Price = InRepoDetail.inRepoNumber1;
					
					InRepoDetail.inRepoNumber1 = InRepoDetail.inRepoNumber2;
					
					InRepoDetail.inRepoNumber2 = Price;
					
				}
				
				
				InRepoDetail.pageNo = this.pageNo;
				InRepoDetail.pageSize = this.pageSize;
				
				selectInRepoDetail(InRepoDetail).then(res => {
					
					let InRepoDetails = res.data.list;
					
					//表格赋值
					this.TableData = InRepoDetails;
					//页数赋值
					this.pageNum = res.data.total
					
					//如果是已经入库了
					if(this.InRepoDetail.inRepoState == 1){
						
						for(let i = 0;i < InRepoDetails.length; i++){
							
							this.textvalue.push(InRepoDetails[i].itemsNumber);
							
							this.selectvalue = 1;
							
						}
						
					}
					
					//遍历表格数据
					this.inRepoInfos = InRepoDetails.map(item => {
						return {
							inRepoId:this.InRepoDetail.inRepoId,
							itemId:item.itemId,
							itemLatelyPic:item.itemLatelyPic,
							supplierId:item.supplierId,
							needInRepoNumber:item.itemsNumber,
							// 仓库与数量集合
							// repoIdAndNumber:[],
							repoId:"",
							inRepoNumber:""
						}
					})
					
				});
				
			},
			//获取路由的参数
			getParams(){
				// 取到路由带过来的参数
				let receId = this.$route.query.receId;
				let inRepoId = this.$route.query.inRepoId;
				let inRepoState = this.$route.query.inRepoState;
				
				this.InRepoDetail.receId = receId;
				
				this.InRepoDetail.inRepoId = inRepoId;
				
				if(inRepoState == '已入库'){
					inRepoState = 1;
				}else if(inRepoState == '未入库'){
					inRepoState = 0;
				}
				
				this.InRepoDetail.inRepoState = inRepoState;
				
				//修改样式
				if(inRepoState == 1){
					
					this.isDisabled = true;
					
				}
				
			},
		},
		watch: {
			'$route': 'getParams'
		},
		created() {
			//获取传递过来的参数
			this.getParams()
			
			this.selectInRepoDetail();
		}
		
	}
	
</script>

<style>
</style>
