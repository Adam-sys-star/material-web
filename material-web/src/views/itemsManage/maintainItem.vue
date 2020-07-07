<template>
	<div align="center">


	<!-- 商品货号 -->
	<div :class="{ after: AfterIsHide }">
		<label style="font-weight: bold;"  >商品货号：</label>
		<label class="lable1" style="margin-left: 10px;" >{{Iteminfo.id}}</label>
	
	<br /><br /><br />
	</div>
	
	<!-- 商品名称 -->
	<label style="font-weight: bold;" >商品名称：</label>
	<Input type="text" v-model="Iteminfo.itemName" placeholder="请输入商品名称" id="itemName" search
	  clearable style="" class="text" :class="{ defore: BeforeIsHide }" >
	</Input>
	<label class="lable1" style="width: 150px;" :class="{ after: AfterIsHide }" >{{Iteminfo.itemName}}</label>
	
	<!-- 商品类别 -->
	<label style="font-weight: bold;" >商品类别：</label>
	<Cascader :data="itemclass" v-model="itemClass"  id="itemClassId"  :class="{ defore: BeforeIsHide }"
	placeholder="请选择商品类别" class="text" @on-change="(value,selectedData)=>{handleListenCascader(value,selectedData)}" ></Cascader>
	<label class="lable1" style="width: 300px;" :class="{ after: AfterIsHide }" >{{itemClassLabel}}</label>
	
	<br /><br /><br />
	
	<!-- 规格 -->
	<label style="font-weight: bold;" >商品规格：</label>
	<label class="lable1" style="width: 190px;" :class="{ after: AfterIsHide }" >{{Iteminfo.itemSpec}}</label>
	<div :class="{ defore: BeforeIsHide }">
		<Input type="text" v-model="Iteminfo.itemSpec1" placeholder="" id="itemSpec1" search
		  clearable style="float: left;width: 70px;margin:30px 5px 0px 0px;" class="" >
		</Input>
		
		<Cascader :data="Unit1" change-on-select  v-model="Iteminfo.Unit1"  placeholder="单位" 
		class="" style="float: left;width: 55px;margin:30px 5px 0px 0px;"  ></Cascader>
		
		<Cascader :data="Unit2" change-on-select  v-model="Iteminfo.Unit2" 
		class="" style="float: left;width: 40px;margin:30px 5px 0px 0px;" ></Cascader>
		
		<Input type="text" v-model="Iteminfo.itemSpec2" placeholder="" id="itemSpec2" search
		  clearable style="float: left;width: 70px;margin:30px 5px 0px 0px;" class="" >
		</Input>
		
		<Cascader :data="Unit3" change-on-select  v-model="Iteminfo.Unit3"  placeholder="单位"
		class="" style="float: left;width: 55px;margin:30px 5px 0px 0px;" ></Cascader>
	</div>
	
	<!-- 单位 -->
	<label style="font-weight: bold;margin-left: 10px;" > 单 &nbsp; &nbsp; &nbsp; 位：</label>
	<Cascader :data="itemUnit" change-on-select  v-model="Iteminfo.itemUnit"  placeholder="单位" id="itemUnit"
	class="" style="float: left;width: 55px;margin:30px 5px 0px 0px;" :class="{ defore: BeforeIsHide }" ></Cascader>
	<label class="lable1" style="" :class="{ after: AfterIsHide }" >{{Iteminfo.itemUnit}}</label>
	
	<br /><br /><br />
	
	<!-- 零售单价 -->
	<label style="font-weight: bold;" >零售单价：</label>
	<Input type="text" v-model="Iteminfo.itemSalePrice" placeholder="￥" id="itemSalePrice" search
	 :class="{ defore: BeforeIsHide }" clearable style="" class="itemSalePrice" >
	</Input>
	<label class="lable1" style="width: 151px;" :class="{ after: AfterIsHide }" >{{Iteminfo.itemSalePrice+" 元"}}</label>
	<label style="margin-left: 10px;" :class="{ defore: BeforeIsHide }">元</label>
	
	<!-- 享受折扣 -->
	<label style="font-weight: bold;" >享受折扣：</label>
	<Checkbox v-model="Iteminfo.itemDiscState" id="itemDiscState" 
	style="font-size: 15px;margin-left: 10px;" >是</Checkbox>
	
	<br /><br /><br />
	
	<!-- 厂家名称 -->
	<label style="font-weight: bold;" >厂家名称：</label>
	<Input type="text" v-model="Iteminfo.itemFactoryName" placeholder="请输入厂家名称" id="itemFactoryName" search
	  clearable style="" class="text" :class="{ defore: BeforeIsHide }">
	</Input>
	<label class="lable1" style="" :class="{ after: AfterIsHide }" >{{Iteminfo.itemFactoryName}}</label>
	
	<div :class="{ after: AfterIsHide }">
		<br /><br /><br />
		
		<!-- 最近价格 -->
		<label style="font-weight: bold;"  >进货价格：</label>
		<label  style="width: 95px;"  class="lable1"
		id="itemLatelyPic" >{{Iteminfo.itemLatelyPic}}</label>
		
		<!-- 拼音码 -->
		<label style="font-weight: bold;"  >拼音码：</label>
		<label  style="width: 95px;"  class="lable1"
		id="itemSpell" >{{Iteminfo.itemSpell}}</label>
		
		<!-- 五笔码 -->
		<label style="font-weight: bold;"  >五笔码：</label>
		<label  style="width: 95px;"  class="lable1"
		id="itemWubi" >{{Iteminfo.itemWubi}}</label>
		
		<br /><br /><br />
		
		<!-- 商品条码 -->
		<label style="font-weight: bold;"  >商品条码：</label>
		<img :src="Iteminfo.itemCode" width="321px" height="105px" 
		 style="float: left;margin-top: 30px;"/>
	
	</div>
	
	<br /><br /><br />
	
	<!-- 添加商品  按钮 -->
	<Button type="success" @click="addItemByFrom" class="button"
	style="margin-right: 60px;" :class="{ defore1: BeforeIsHide1 }" > 添 加 ✔</Button>
	
	<!-- 添加清空  按钮 -->
	<Button type="warning" @click="reset" class="button"
	style="margin-right: 29px;" :class="{ defore1: BeforeIsHide1 }" >重 置 ✘</Button>
	
	<!-- 添加修改 按钮 -->
	<Button type="info" @click="update" class="button"
	style="margin-right: 29px;" :class="{ after1: AfterIsHide1 }" >修 改 ⚒</Button>
	
	<!-- 添加删除 按钮 -->
	<Button type="error" @click="deletemodal = true" class="button"
	style="margin-right: 29px;" :class="{ after1: AfterIsHide1 }" >删 除 ✘</Button>
	
	<!-- 添加修改 按钮 -->
	<Button type="info" @click="AffirmUpdate" class="button"
	style="margin-right: 29px;" :class="{ after2: AfterIsHide2 }" >确 认 修 改 ✔</Button>
	
	<Modal
		v-model="deletemodal"
		title="确认删除商品"
		@on-ok="ok"
		@on-cancel="">
		<p>是否确认删除商品：{{items.itemName}}</p>
	</Modal>
	</div>
	
</template>

<script>
	
	import {searchItemClass,addItem,updateItem,deleteItem,searchItemById} from '@/api/searchItem.js';
	import { validateNum } from 'utils/validate';
	
	export default {
		data(){
			return{
				Iteminfo:{
					id:"",
					itemName:"",
					itemClassId:"",
					itemSpec:"",
					itemSpec1:"",
					Unit1:"g",
					Unit2:"/",
					itemSpec2:"",
					Unit3:"g",
					itemUnit:"盒",
					itemSpell:"",
					itemWubi:"",
					itemSalePrice:"",
					itemFactoryName:"",
					itemDiscState:"",
					itemLatelyPic:"",
					itemCode:"",
				},
				//商品信息
				items:"",
				// 商品类别
				itemClassLabel:"",
				itemClass:"[]",
				//规格单位类别
				Unit1:[
					{value: 'mg',label: 'mg',},
					{value: 'g',label: 'g',},
					{value: 'ml',label: 'ml',},
					{value: 'u',label: 'u',},
					{value: '万u',label: '万u',},
					{value: '片',label: '片',},
					{value: '丸',label: '丸',}
				],
				Unit2:[
					{value: '/',label: '/',},
					{value: '※',label: '※',}
				],
				Unit3:[
					{value: 'g',label: 'g',},
					{value: 'ml',label: 'ml',},
					{value: '万u',label: '万u',},
					{value: '片',label: '片',},
					{value: '袋',label: '袋',},
					{value: '贴',label: '贴',},
					{value: '板',label: '板',},
					{value: '包',label: '包',},
				],
				itemUnit:[
					{value: '盒',label: '盒',},
					{value: '支',label: '支',},
					{value: '瓶',label: '瓶',},
				],
				//商品类别
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
				//关于绑定的css样式
				BeforeIsHide:false,
				BeforeIsHide1:false,
				AfterIsHide:true,
				AfterIsHide1:true,
				AfterIsHide2:true,
				//删除对话框
				deletemodal:false,
			}
		},methods:{
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
			//添加商品
			addItemByFrom(){
				
				//获得商品信息
				let item = this.Iteminfo;
				// 判断数据格式
				let b = this.format(item);
				//格式不对不执行
				if(!b){
					return;
				}
				
				//商品单位改为字符串模式
				item.itemUnit = item.itemUnit+""
				//整合商品的规格
				item.itemSpec = item.itemSpec1+item.Unit1+item.Unit2+item.itemSpec2+item.Unit3+""
				
				//判断商品折扣状态
				if(item.itemDiscState){
					item.itemDiscState = 1;
				}else{
					item.itemDiscState = 0;
				}
				
				//判断商品类别
				if(this.itemClass[1] != null){
					item.itemClassId = this.itemClass[1];
				}else if(this.itemClass[0] != null){
					item.itemClassId = this.itemClass[0];
				}else if(this.itemClass == ""){
					item.itemClassId = null;
				}
				
				//添加商品，到后台
				addItem(item).then(res => {
					console.log(res);
					
					if(res.data == -1){
						
						this.$Notice.error({
						   title: '失败',
						   desc:  '商品 '+this.Iteminfo.itemName+' 已存在'
						});
						
					}else if(res.data != null){
						
						this.items = res.data;
						
						let items = this.items;
						
						this.$Notice.success({
						   title: '成功',
						   desc:  '商品 '+items.itemName+' 添加成功'
						});
						//重置信息
						// this.reset();
						//赋值到标签中
						this.assign(items);
						
					}
					
					
				});
			},
			//讲商品信息赋值到标签
			assign(item){
				let info = this.Iteminfo;
				info.id = item.id;
				info.itemLatelyPic = item.itemLatelyPic;
				info.itemSpell = item.itemSpell;
				info.itemWubi = item.itemWubi;
				info.itemCode = "http://localhost:8989/static/"+item.itemCode;
				
				info.itemName = item.itemName;
				info.itemSpec = item.itemSpec;
				info.itemUnit = item.itemUnit;
				info.itemSalePrice = item.itemSalePrice;
				
				if(item.itemDiscState == 1){
					
					info.itemDiscState = true;
					
				}
				
				info.itemFactoryName = item.itemFactoryName;
				
				//显示所有的标签
				this.AfterIsHide = false;
				//隐藏所有文本款
				this.BeforeIsHide = true;
				//隐藏重置与添加按钮
				this.BeforeIsHide1 = true;
				//显示修改按钮
				this.AfterIsHide1 = false;
				//隐藏确认修改按钮
				this.AfterIsHide2 = true;
			},
			//修改信息
			update(){
				
				//隐藏所有的标签
				this.AfterIsHide = true;
				//显示所有文本款
				this.BeforeIsHide = false;
				//隐藏修改按钮
				this.AfterIsHide1 = true;
				//显示确认修改按钮
				this.AfterIsHide2 = false;
				
			},
			//确认修改
			AffirmUpdate(){
				
				let item = this.Iteminfo;
				
				// 判断数据格式
				let b = this.format(item);
				
				//格式不对不执行
				if(!b){
					return;
				}
				
				
				//商品单位改为字符串模式
				item.itemUnit = item.itemUnit+""
				//整合商品的规格
				item.itemSpec = item.itemSpec1+item.Unit1+item.Unit2+item.itemSpec2+item.Unit3+""
				//判断商品折扣状态
				if(item.itemDiscState){
					item.itemDiscState = 1;
				}else{
					item.itemDiscState = 0;
				}
				//判断商品类别
				if(this.itemClass[1] != null){
					item.itemClassId = this.itemClass[1];
				}else if(this.itemClass[0] != null){
					item.itemClassId = this.itemClass[0];
				}else if(this.itemClass == ""){
					item.itemClassId = null;
				}
				
				console.log(item)
				
				updateItem(item).then(res => {
					
					console.log(res)
					
					if(res.data != null){
						
						this.items = res.data;
						
						let items = this.items;
						
						this.$Notice.success({
						   title: '成功',
						   desc:  '商品 '+items.itemName+' 修改成功'
						});
						//赋值到标签中
						this.assign(items);
						
					}
					
				});
				
			},
			deleteItem(){
				
				deleteItem(this.items.id).then(res => {
					
					if(res.data == true){
						
						this.$Notice.success({
						   title: '成功',
						   desc:  '商品 '+this.items.itemName+' 删除成功'
						});
						
						this.$router.push("./itemTable");
						
					}
					
				});
				
			},
			//重置信息
			reset(){
				
				let i = this.Iteminfo;
				
				i.itemName="";
				this.itemClass = "";
				i.itemSpec1="";
				i.Unit1="g";
				i.Unit2="/";
				i.itemSpec2="";
				i.Unit3="g";
				i.itemUnit="盒";
				i.itemSalePrice="";
				i.itemDiscState=false,
				i.itemFactoryName="";
				
				// // id:"",
				// i.itemClassId="";
				// // itemSpec:"",
				// // i.itemSpell="",
				// // i.itemWubi="",
				// // itemLatelyPic:"",
				// // itemCode:"",
				
			},
			handleListenCascader(value,selectedData){
				
				//获得商品的类别的内容
				this.itemClassLabel = selectedData[1].__label;
				
			},
			format(item){
				// 判断数据是否为空
				if(item.itemName == "" || this.itemClass == "" || item.itemSpec1 == "" ||
				 item.itemSalePrice == "" || item.itemFactoryName == ""){
					this.$Notice.error({
					    title: '错误',
					    desc:  '商品信息未补全'
				    });
					return false;
				}
				
				// 判断商品规格格式
				let b1 = validateNum(item.itemSpec1);
				if(!b1  || item.Unit1 == ""){
					this.$Notice.error({
					    title: '格式错误',
					    desc:  '商品规格格式为数字、小数点'
				    });
					return false;
				}
				
				if(item.itemSpec2 != "" ){
					// 判断商品规格格式
					b1 = validateNum(item.itemSpec2);
					if(!b1){
						this.$Notice.error({
						    title: '格式错误',
						    desc:  '商品规格格式为数字、小数点'
					    });
						return false;
					}
				}else{
					
					if(item.Unit2 != "" || item.Unit3 != ""){
						this.$Notice.error({
						    title: '格式错误',
						    desc:  '商品规格错误'
					    });
						return false;
					}
				}
				
				// 判断商品零售单价
				b1 = validateNum(item.itemSalePrice);
				if(!b1){
					this.$Notice.error({
					    title: '格式错误',
					    desc:  '零售单价格式为数字、小数点'
					});
					return false;
				}
				
				return true;
			},
			//确认对话框
			ok () {
				this.deleteItem();
			},
			//通过主键查询
			searchItemByRouteId(id){
				
				searchItemById(id).then(res => {
					
					let item = res.data;
					this.items = item;
					
					
					//讲商品信息赋值到标签
					this.assign(item);
					
					// 同时给文本款赋值
					let Iteminfo = this.Iteminfo;
					//商品类别
					let iclass = this.itemclass;
					//循环添加商品类别
					for(let i = 0 ; i < iclass.length ; i++ ){
						for(let j = 0 ; j < iclass[i].children.length ; j++ ){
							
							let childs = iclass[i];
							
							let child = childs.children[j];
							
							if(child.value == item.itemClassId){
								
								this.itemClassLabel = childs.label+" / "+child.label;
								
							}
							
						}
					}
					
					
				});
				
			},
			//获取路由的参数
			getParams(){
				
				// 取到路由带过来的参数
				const id = this.$route.query.id;
				//是通过查看详情过来的
				 if(id != null){
					
					this.searchItemByRouteId(id);
					
					//显示所有的标签
					this.AfterIsHide = false;
					//隐藏所有文本款
					this.BeforeIsHide = true;
					//显示修改按钮
					this.AfterIsHide1 = false;
					//隐藏添加重置按钮
					this.BeforeIsHide1 = true;
					
					
				 }
			  
			},
		},
	   //监听路由
	   watch: {
			'$route': 'getParams'
		},
		//钩子函数，在组件完成创建后触发 不需要写在methods中 ,create方法使用要放在最后，methods之后才能去调用方法。
		created(){
			
			//搜索商品类别
			this.searchItemClass()
			//获取传递过来的参数
			this.getParams()
		}
	}
	
</script>

<style>
	
	label {
		margin-left: 50px;
		font-size: 15px;
		float: left; 
		margin-top: 34px;
	}
	
	.text {
		float: left;
		width: 200px;
		margin-top: 30px;
	}
	
	.itemSalePrice{
		float: left;
		width: 100px;
		margin-top: 30px;
	}
	
	.button{
		height: 32px;
		float: right;
		margin-top: 40px;
	}
	.after{
		display:none;
	}
	.defore{
		display:none;
	}
	.defore1{
		display:none;
	}
	.after1{
		display:none;
	}
	.after2{
		display:none;
	}
	.lable1{
		margin-left: 10px;
		width: 200px;
		text-align: left;
	}
</style>
