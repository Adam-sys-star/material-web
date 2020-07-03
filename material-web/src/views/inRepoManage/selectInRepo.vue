<template>
	
	<Form ref="inRepository" autoComplete="on" :model="inRepository"  class="card-box">
	
		<Row style="margin-top: 25px;">
			<Col span="8">
				<label style="" class="topTitleLable" >&nbsp;供 应 商 ：</label>
				<Select v-model="RemainDetail.supplierId" style="float: left;width: 194px;"  clearable
				 placeholder="选择供应商" filterable>
					<Option v-for="item in supplierlist" :value="item.value" :key="item.value" >{{ item.label }}</Option>
				</Select>
			</Col>
		</Row>
	
	</Form>
	
</template>

<script>
	
	export default {
		data(){
			return{
				inRepository:{
					
					
				},
			}
		},
		
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
