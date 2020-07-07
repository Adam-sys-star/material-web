<template>
	<div align="center">
		
		<!-- 商品信息 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 120px;" >商品信息：</label>
		<Input type="text" v-model="Remaininfo.itemName" placeholder="请输入商品货号、商品名称" id="itemName" search
		  clearable style="float: left;width: 200px;" >
		</Input>
		
		<!-- 仓库名字 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 30px;" >仓库名字：</label>
		<Select v-model="Remaininfo.repoId" style="float: left;width: 90px;">
			<Option v-for="item in repoList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
		</Select>
		
		<!-- 库存情况 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 20px;" >库存情况：</label>
		<Select v-model="Remaininfo.remainStatus" style="float: left;width: 80px;" filterable 
				:label-in-value="true"  @on-change="value=>{selectChange(value)}"   >
			<Option v-for="item in remainList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
		</Select>
		
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 5px;" > <= </label>
		
		<Input type="text" v-model="Remaininfo.totalRemain" placeholder="库存数量" id="totalRemain" search
		  clearable style="float: left;width: 81px;margin-left: 5px;" :disabled="isDisabled" >
		</Input>
		
		<br /><br />
		
		<!-- 厂家名称 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 120px;" >厂家名称：</label>
		<Input type="text" v-model="Remaininfo.itemFactoryName" placeholder="请输入厂家名称" id="itemFactoryName" search
		  clearable style="float: left;width: 200px;" >
		</Input>
		
		<!-- 商品类别 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 30px;" >商品类别：</label>
		<Cascader :data="itemclass" change-on-select  v-model="itemClass"  placeholder="请选择商品类别" filterable
		style="width: 265px;float: left;"></Cascader>
		
		<!-- 搜索  按钮 -->
		<Button type="primary" @click="selectRemain" 
		style="height: 32px;float: left;margin-left: 30px;"  icon="ios-search">搜 索</Button>
		
		<br /><br /><br />
		
		<Table border :columns="TableColumn" :data="TableData"  ></Table>
		<br />
		<Page :total="pageNum" ref="pageno" :page-size="pageSize" show-elevator @on-change="onChange" />
		
		<br /><br />
		
		<div class='linear ' style='width:100%;height:300px;' align="center">
			<remain-visitor> </remain-visitor>
		</div>
	</div>
</template>
<script>
	
	import {searchItemClass} from '@/api/searchItem.js';
	import {selectAllRemain} from '@/api/searchRemain.js';
	import { validateNum } from 'utils/validate';
	//数据饼状图
	import RemainVisitor from './RemainVisitor.vue';
	
	import {getClassRemain} from './RemainVisitor.vue';
	
	
	
    export default {
		components:{RemainVisitor},
        data () {
            return {
				Remaininfo:{
					//商品名称
					itemName:"",
					// 厂家名称
					itemFactoryName:"",
					//商品类别编号
					itemClassId:"",
					//仓库编号
					repoId:"1",
					//库存情况
					remainStatus:"2",
					//库存数量
					totalRemain:"",
				},
				isDisabled:false,
				//仓库类别
				repoList:[
					{
						value: "1",
						label: "一号仓库",
					},
				],
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
				// 商品类别
				  itemClass:"",
				//商品表格数据
				TableData:[],
				pageNum:100,
				pageNo:1,
				pageSize:5,
				itemclass: [
					{
						value: '1',
						label: '0TC类',
						children: []
					},{
						value: '2',
						label: '处方类',
						children: []
					},{
						value: '3',
						label: '保健食品类',
						children: []
					},{
						value: '4',
						label: '药食同源类',
						children: []
					},{
						value: '5',
						label: '医疗器械',
						children: []
					},{
						value: '6',
						label: '个人护理',
						children: []
					}
				],
				
				TableColumn: [
					{
						title: '货号',
						key: 'id',
						align: 'center',
					},{
						title: '商品名称',
						key: 'itemName',
						align: 'center',
					},{
						title: '商品类别',
						key: 'itemClassName',
						align: 'center',
					},{
						title: '生产厂家',
						key: 'itemFactoryName',
						align: 'center',
					},{
						title: '仓库',
						key: 'repoName',
						align: 'center',
					},{
						title: '总库存量',
						key: 'totalRemain',
						sortable: true,
						align: 'center',
					},{
						title: '总成本(元)',
						key: 'remainAllInPic',
						sortable: true,
						align: 'center',
					},{
						title: '最近入库',
						key: 'inRepoDate',
						sortable: true,
						width:130,
						align: 'center',
					},{
						title: '操作',
						key: 'action',
						width:100,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button-group',
								{
								  props: {
									shape: 'circle',
								  }
								},
								[
								h('Button', {
									props: {
										type: 'primary',
										size: 'small',
										icon:"eye",
									},
									style: {
										width:"65px",
										height :"30px",
									},
									on: {
										click: () => {
											//获得当前行
											let index = params.index;
											
											let TableData = this.TableData[index];
											//路由转发
											this.$router.push({
												path: "./RemainDetail",
												//传递参数
												query: {
													id:TableData.id,
													itemName:TableData.itemName,
													itemClassName:TableData.itemClassName,
													itemFactoryName:TableData.itemFactoryName,
													repoName:TableData.repoName,
													totalRemain:TableData.totalRemain,
													remainAllInPic:TableData.remainAllInPic,
													inRepoDate:TableData.inRepoDate,
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
			//根据库存情况下拉款的选择触发事件 修改库存数量文本款是否禁用
			selectChange(value){
				console.log(value)
				if(value.value == 3){
					this.isDisabled = true;
					this.Remaininfo.totalRemain = "";
				}else{
					this.isDisabled = false;
				}
			},
			onChange(currentPage){
				
				this.pageNo = currentPage;
				
				this.selectRemain();
				
			},
			//搜索库存
			selectRemain(){
				
				//当前查询的商品库存信息
				let remain = this.Remaininfo
				
				if(remain.totalRemain != ""){
					 //判断数字格式
					let b = validateNum(remain.totalRemain);
					if(!b){
						this.$Notice.error({
							title: '格式错误',
							desc:  '库存数量格式为数字、小数点'
						});
						return;
					}
				}
				
				
				//商品类别的判断
				if(this.itemClass[1] != null){
					remain.itemClassId = this.itemClass[1];
				}else if(this.itemClass[0] != null){
					remain.itemClassId = this.itemClass[0];
				}else if(this.itemClass == ""){
					remain.itemClassId = null;
				}
				
				
				// console.log(remain)
				selectAllRemain(remain,this.pageNo,this.pageSize).then( res => {
					
					
					console.log(res)
					
					// this.pageNum = res.data.pages*this.pageSize
					this.pageNum = res.data.total
					
					var itemDatas = res.data.list;
					
					this.TableData = itemDatas
					
				});
				
				//修改饼状图
				if(this.itemClass[0] != null){
					getClassRemain(this.itemClass[0]);
				}else{
					getClassRemain(0);
				}
				
			},
			//搜索商品类别
			searchItemClass(){
				//获取Promise对象的data
				searchItemClass().then(res => {
					//获取了商品类别的集合
					let items = res.data;
					console.log("一共有"+items.length+"种商品类别")
					//缓存类别数组
					var arr = [];
					//缓存当前父类级别
					var findex = 1;
					//缓存到第几个
					var num = 0;
					for(let j = 0;j < 6 ; j++){
						for(let i = 0;i < items.length ; i++){
							if(findex == items[num].itemClassFather){
								arr.push(items[num]);
								num++;
								if(num == items.length-1){
									arr.push(items[num]);
									break;
								}
							}else{
								this.itemclass[j].children = arr.map(item => {
									return {
										value: item.id,
										label: item.itemClassName
									}
								})
								arr = [];
								findex = items[num].itemClassFather;
								break;
							}
						}
					}
					//最后一步未添加，在循环外添加
					this.itemclass[5].children = arr.map(item => {
						return {
							value: item.id,
							label: item.itemClassName
						}
					})
				});
			},
        },
		//钩子函数，在组件完成创建后触发 不需要写在methods中 ,create方法使用要放在最后，methods之后才能去调用方法。
		created(){
			
			//搜索商品类别
			this.searchItemClass()
			
			//搜索商品
			this.selectRemain()
			
		}
    }
</script>

<style>
	.linear {
		width: 100%;
		height: 600px;
		FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0, startColorStr=#b8c4cb, endColorStr=red);
		/*IE 6 7 8*/
		background: -webkit-gradient(linear, 0% 0%, 0% 150%, from(#EFF0F4), to(#7a7a7a));
		/*谷歌*/
	}

</style>
