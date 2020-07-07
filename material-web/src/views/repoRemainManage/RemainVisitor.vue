<template>

    <chart :options="option" class="echarts" id="chart" style="width: 550px;height: 300px;"> </chart>

</template>

<style scoped>
.echarts {
  border-radius:4px;
  height: 250px;
  width: 900px;
}
</style>

<script>
	
import {getClassRemain} from '@/api/searchRemain.js';
	
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
	getClassRemain(classId){
		
		//重新赋值
		for(let i = 0 ; i < data.length ; i++){
			data[i].value = "";
			data[i].name = "";
		}
		
		getAllClassRemain(classId);
		
	},
    methods:{
		
		getAllClassRemain(classId){
			
			getClassRemain(classId).then(res => {
				
				let classes = res.data;
				
				let legend = this.option.legend.data;
				
				console.log(classes)
				
				for(let i = 0 ; i < classes.length ; i++ ){
					
					
					data[i].value = classes[i].allTotalRemain;
					data[i].name = classes[i].itemClassName;
					
					legend[i] = classes[i].itemClassName;
					
				}
				
			});
			
		},
		
	},
	//生命周期 —— 钩子函数
	created() {
		
		this.getAllClassRemain(0);
		
	},
	 mounted() {
		// methods里面定义的方法, 需要赋值给window
	   window.getAllClassRemain = this.getAllClassRemain;
	},
  data: function () {
   
    return {

option : {
    // backgroundColor: '#49586e',
	//标题
    title: {
        text: '商品类别库存分配统计',
        x: '27%',
        y: '0%',
        textStyle: {
            fontWeight: '500',
            fontSize: 20,
            color: '#7e7e7e',
        }
    },
	//环单选项
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
	//选项卡
    legend: {
        orient: 'vertical',
        left: '65%',
        top: '25%',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 18,
            color: '#fff',
        },
		//每个选项
        data: ["0TC类","处方类","保健食品类","药食同源类","医疗器械","个人护理"]
    },
	//总环
    series: [{
        type: 'pie',
        selectedMode: 'single',
        center: ['30%', '55%'],
        radius: ['40%', '80%'],
        // color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
        color: ['#AF89D6', '#5ab6df', '#6a8bc0', '#4acacb', '#fe8676', '#73daff'],
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