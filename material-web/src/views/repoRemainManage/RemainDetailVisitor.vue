<template>

    <chart :options="option" class="echarts" id="chart" 
	style="margin-left: 40px;margin-top: 10px;width: 350px;height: 390px;float: left;"> </chart>

</template>

<style scoped>
.echarts {
  border-radius:4px;
  height: 250px;
  width: 900px;
}
</style>

<script>
	
import {getRemainDetail} from '@/api/searchRemain.js';
	
var data = [
	{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	},{
		value:"",
		name:""
	}
];

export default {
	getTheRemainDetail(id,totalRemain,inRepoDate,supplierId){
		
		//重新赋值
		for(let i = 0 ; i < data.length ; i++){
			data[i].value = "";
			data[i].name = "";
		}
		
		getAllRemainDetail(id,totalRemain,inRepoDate,supplierId);
		
	},
    methods:{
		
		getAllRemainDetail(id,totalRemain,inRepoDate,supplierId){
			
			getRemainDetail(id,totalRemain,inRepoDate,supplierId).then(res => {
				
				let info = res.data;
				
				let legend = this.option.legend.data;
				
				//其他总数
				let othersum = 0;
				
				for(let i = 0 ; i < info.length ; i++ ){
					
					//超过9个算  其他
					if(info.length > 9 && i >= 9){
						othersum = othersum + info[i].remainAmount;
					}else{
						data[i].value = info[i].remainAmount;
						data[i].name = info[i].times;
						legend[i] = info[i].times;
					}
				}
				
				if(othersum != 0){
					data[9].value = othersum;
					data[9].name = "其它";
					legend[9] = "其它";
				}
				
			});
			
		},
		
	},
	//生命周期 —— 钩子函数
	created() {
		
		// this.getAllRemainDetail(null,null,null,null);
		
	},
	 mounted() {
		// methods里面定义的方法, 需要赋值给window
	   window.getAllRemainDetail = this.getAllRemainDetail;
	},
  data: function () {
   
    return {

option : {
    backgroundColor: '#49586e',
	// 标题
    title: {
        text: '批次:',
        x: '5%',
        y: '77%',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            color: '#fff',
        }
    },
	//环单选项
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}批次: {c} ({d}%)"
    },
	//选项卡
    legend: {
        orient: 'vertical',
        left: '21%',
        top: '77%',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 18,
            color: '#fff',
        },
		//每个选项
        data: []
    },
	//总环
    series: [{
        type: 'pie',
        selectedMode: 'single',
        center: ['50%', '39%'],
        radius: ['40%', '80%'],
        color: ['#FA5858', '#FAAC58', '#F4FA58', '#ACFA58','#82FA58',
		 '#58FAAC', '#58FAF4','#58ACFA','#5858FA','#AC58FA'],
        label: {
            normal: {
                position: 'inner',
                formatter: '{d}%',

                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 12
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: data,
    }]
}
    }
  }
}

</script>