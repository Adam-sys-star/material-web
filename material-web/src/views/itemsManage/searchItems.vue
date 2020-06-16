<template>
	<div align="center">
		<label style="float: left;font-size: 18px;margin-top: 4px;margin-left: 40px;" >商品类别 ： </label>
		<Cascader :data="itemclass" change-on-select v-model="itemClass"  size="large" style="width: 300px;float: left;"></Cascader>
        <Button type="primary" @click="ClickSearchItem" style="height: 33px;margin-top: 2px;float: right;margin-right: 40px;"  icon="ios-search">搜索</Button>
		<Input type="text" v-model="itemName" id="itemName" search enter-button="Search"   size="large" 
		 clearable style="width: 350px;float: right;margin-right: 10px;" >
			<Icon type="ios-search" slot="prepend" ></Icon>
		</Input>
		<br /><br /><br />
		<Table border :columns="TableColumn" :data="TableData"  ></Table>
		<br />
		<Page :total="pageNum" ref="pageno" page-size="10" show-elevator @on-change="onChange" />
    </div>
</template>

<script>
	
	import {searchItem} from '@/api/searchItem.js'
	
	export default {
		data () {
			return {
				//药品名字
				itemName:'',
				//药品类别
				itemClass:'',
				pageNum:100,
				pageNo:1,
				//table的数据
				TableData: [],
				//商品类别选择  父级类别写死，子级列别通过后台查询
				itemclass: [{
						value: '1',
						label: '0TC类',
						children: [
							{
								value: '9',
								label: '感冒清热解毒'
							},{
								value: '10',
								label: '心脑血管类'
							}
						]
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
						width:150,
						align: 'center',
					},
					{
						title: '商品名称',
						key: 'itemName',
						width:150,
						align: 'center',
					},
					{
						title: '商品类别',
						key: 'itemClassName',
						width:150,
						align: 'center',
					},{
						title: '生产厂家',
						key: 'itemFactoryName',
						width:150,
						align: 'center',
					},
					{
						title: '规格/单位',
						key: 'itemUnit',
						width:100,
						align: 'center',
					},
					{
						title: '零售价',
						key: 'itemSalePrice',
						sortable: true,
						width:100,
						align: 'center',
					},
					{
						title: '是否折扣',
						key: 'itemDiscState',
						width:100,
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						width:118,
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
								// h('Button', {
								// 	props: {
								// 		type: 'primary',
								// 		size: 'small',
								// 		icon:"eye",
								// 	},
								// 	style: {
								// 		width:"70px",
								// 		height :"30px",
								// 	},
								// 	on: {
								// 		click: () => {
								// 			this.show(params.index)
								// 		}
								// 	}
								// }, ' 详 情'),
								h('Button', {
									props: {
										type: 'success',
										size: 'small',
									},
									style: {
										width:"70px",
										height :"30px"
									},
									on: {
										click: () => {s
											this.show(params.index)
										}
									}
								},' 添加 ✔'),
								])
							]);
						}
					}
				]
			}
		},
		methods: {
			onChange(currentPage){
				
				this.pageNo = currentPage;
				
				this.searchItemByClassAndName(this.itemClass,this.itemName);
				
			},ClickSearchItem(){
				
				this.pageNo = 1;
				
				this.$refs["pageno"].currentPage = 1;
				
				this.searchItemByClassAndName(this.itemClass,this.itemName);
				
			},
			searchItemByClassAndName(itemClass,itemName){
				
				var classstr = '';
				
				 if(itemClass[1] != null){
					classstr = itemClass[1];
				}else if(itemClass[0] != null){
					classstr = itemClass[0];
				}
				
				// itemName,itemClass
				searchItem(this.pageNo,classstr,itemName).then(res => {
					
					var itemDatas = res.data.list;
					for(var i = 0;i < res.data.length;i++){
						let itemdata = itemDatas[i];
						if(itemdata.itemDiscState == 1){
							itemdata.itemDiscState = '是'
						} else if(itemdata.itemDiscState == 0){
							itemdata.itemDiscState = '否'
						}
					}
					this.TableData = itemDatas
					
					this.pageNum = res.data.pages
					
					console.log(res.data)
				}).catch(function(error){
					console.log(error);
				});
				
			},show (index) {
				
				this.$Modal.info({
					title: 'User Info',
					content: `货号：${this.TableData[index].id}<br>商品名称：${this.TableData[index].itemName}<br>商品类别：${this.TableData[index].itemClassId}<br>零售价：${this.TableData[index].itemSalePrice}`
				})
			},
			remove (index) {
				this.data6.splice(index, 1);
			}
		},
		//钩子函数，在组件完成创建后触发 不需要写在methods中 ,create方法使用要放在最后，methods之后才能去调用方法。
		created(){
			this.searchItemByClassAndName(this.itemClass,this.itemName)
		}
	}
</script>

<style>
</style>
