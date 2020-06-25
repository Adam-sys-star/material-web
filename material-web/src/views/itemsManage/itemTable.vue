<template>
	<div align="center">
		<!-- 商品信息 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 120px;" >商品信息：</label>
		<Input type="text" v-model="Iteminfo.itemName" placeholder="请输入商品货号、商品名称" id="itemName" search
		  clearable style="float: left;width: 200px;" >
		</Input>
		<!-- 商品类别 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 30px;" >商品类别：</label>
		<Cascader :data="itemclass" change-on-select  v-model="itemClass"  style="width: 250px;float: left;"></Cascader>
		
		<!-- 添加商品  按钮 -->
		<Button type="warning" @click="AddItem"
		style="height: 32px;float: left;margin-left: 29px;"  icon="ios-plus">添 加</Button>
		
		<br /><br />
		<!-- 厂家名称 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 120px;" >厂家名称：</label>
		<Input type="text" v-model="Iteminfo.itemFactoryName" placeholder="请输入厂家名称" id="itemFactoryName" search
		  clearable style="float: left;width: 200px;" >
		</Input>
		<!-- 售价范围 -->
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 30px;" >售价范围：</label>
		<Input type="text" v-model="Iteminfo.itemSalePrice1" placeholder="￥" id="itemSalePrice1" search
		  clearable style="float: left;width: 110px;" >
		</Input>
		<label style="float: left;font-size: 15px;margin-top: 4px;margin-left: 10px;margin-right: 10px;" >~</label>
		<Input type="text" v-model="Iteminfo.itemSalePrice2" placeholder="￥" id="itemSalePrice2" search
		  clearable style="float: left;width: 110px;" >
		</Input>
		
		<!-- 搜索  按钮 -->
		<Button type="primary" @click="selectItem" 
		style="height: 32px;float: left;margin-left: 30px;"  icon="ios-search">搜 索</Button>
		
		<br /><br /><br />
		
		<Table border :columns="TableColumn" :data="TableData"  ></Table>
		<br />
		<Page :total="pageNum" ref="pageno" :page-size="pageSize" show-elevator @on-change="onChange" />
		
	</div>
</template>
<script>
	 
	import {searchItemClass,selectItem} from '@/api/searchItem.js'
	
    export default {
        data () {
            return {
				Iteminfo:{
					itemName:"",
					itemFactoryName:"",
					itemSalePrice1:"",
					itemSalePrice2:"",
					itemClassId:""
				},
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
					},
					{
						title: '商品名称',
						key: 'itemName',
						align: 'center',
					},
					{
						title: '商品类别',
						key: 'itemClassName',
						align: 'center',
					},{
						title: '生产厂家',
						key: 'itemFactoryName',
						align: 'center',
					},
					{
						title: '零售价',
						key: 'itemSalePrice',
						sortable: true,
						width:150,
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						width:150,
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
										width:"70px",
										height :"30px",
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, ' 详 情'),
								// h('Button', {
								// 	props: {
								// 		type: 'success',
								// 		size: 'small',
								// 	},
								// 	style: {
								// 		width:"70px",
								// 		height :"30px"
								// 	},
								// 	on: {
								// 		click: () => {s
								// 			this.show(params.index)
								// 		}
								// 	}
								// },' 添加 ✔'),
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
				
				this.selectItem();
				
			},
			//搜索商品
			selectItem(){
				//当前查询的商品信息
				let item = this.Iteminfo
				//商品类别的判断
				
				if(this.itemClass[1] != null){
					item.itemClassId = this.itemClass[1];
				}else if(this.itemClass[0] != null){
					item.itemClassId = this.itemClass[0];
				}else if(this.itemClass == ""){
					item.itemClassId = null;
				}
				
				//发起查询商品请求
				selectItem(item,this.pageNo,this.pageSize).then(res => {
					
					var itemDatas = res.data.list;
					
					
					this.pageNum = res.data.pages*this.pageSize
					
					this.TableData = itemDatas
					
					
				});
				
				
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
			}
			
			
			
			
        },
		//钩子函数，在组件完成创建后触发 不需要写在methods中 ,create方法使用要放在最后，methods之后才能去调用方法。
		created(){
			
			//搜索商品类别
			this.searchItemClass()
			
			//搜索商品
			this.selectItem()
			
		}
    }
</script>
