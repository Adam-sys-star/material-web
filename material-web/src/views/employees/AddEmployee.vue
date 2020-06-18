<template>

<div>


     <Row>
        <Col span="24" >


            <div style="" class="doc-content">
                <h5>添加员工</h5>


            </div>
        </Col>




    </Row>




  <Form :model="formItem" :label-width="80">
         <FormItem label="员工工号">
             <Input v-model="formItem.id" placeholder="Enter something..."></Input>
         </FormItem>
		 <FormItem label="员工姓名">
		     <Input v-model="formItem.empName" placeholder="Enter something..."></Input>
		 </FormItem>
		 <FormItem label="员工性别">
		     <RadioGroup v-model="formItem.empSex">
		         <Radio label="男">男</Radio>
		         <Radio label="女">女</Radio>
		     </RadioGroup>
		 </FormItem>
         <FormItem label="职位">
             <!-- <Select v-model="formItem.empRole" >
                 <Option value="商品管理员">商品管理员</Option>
                 <Option value="超级管理员">超级管理员</Option>
             </Select> -->
			 <Input v-model="formItem.empRole" placeholder="Enter something..." value="商品管理员" ></Input>
			 
         </FormItem>
         <FormItem label="出生日期">
             <Row>
                 <Col span="11">
                     <DatePicker type="date" placeholder="Select date" v-model="formItem.empBirthday"></DatePicker>
                 </Col>
                <!-- <Col span="2" style="text-align: center">-</Col> -->
                 <!-- <Col span="11">
                     <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                 </Col> -->
             </Row>
         </FormItem>
		 <FormItem label="入职日期">
		     <Row>
		         <Col span="11">
		             <DatePicker type="date" placeholder="Select date" v-model="formItem.empJoinDate"></DatePicker>
		         </Col>
		        <!-- <Col span="2" style="text-align: center">-</Col> -->
		         <!-- <Col span="11">
		             <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
		         </Col> -->
		     </Row>
		 </FormItem>
        
         <!-- <FormItem label="Checkbox">
             <CheckboxGroup v-model="formItem.checkbox">
                 <Checkbox label="Eat"></Checkbox>
                 <Checkbox label="Sleep"></Checkbox>
                 <Checkbox label="Run"></Checkbox>
                 <Checkbox label="Movie"></Checkbox>
             </CheckboxGroup>
         </FormItem>
         <FormItem label="Switch">
             <i-switch v-model="formItem.switch" size="large">
                 <span slot="open">On</span>
                 <span slot="close">Off</span>
             </i-switch>
         </FormItem>
         <FormItem label="Slider">
             <Slider v-model="formItem.slider" range></Slider>
         </FormItem> -->
         <FormItem label="联系方式">
             <!-- <Input v-model="formItem.empTelp" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input> -->
			 <Input v-model="formItem.empTelp" placeholder="Enter something..."></Input>
         </FormItem>
		 
         <FormItem>
             <Button type="primary" v-on:click="submitEmp">提交</Button>
             <Button style="margin-left: 8px">取消</Button>
         </FormItem>
     </Form>





</div>

</template>
<script>
	import {findEmpById} from '../../api/employee.js';
	import {addEmp} from '../../api/employee.js';
   export default {
           data () {
               return {
                   formItem: {
                       id: '',
					   empName:'',
                       // select: '',
                       empSex: '',
                       // checkbox: [],
                       // switch: true,
					   empRole:'',
                       empBirthday: '',
                       // time: '',
                       // slider: [20, 50],
                       // textarea: ''
					   empTelp:'',
					   empJoinDate:''
                   }
               }
           },
		   methods:{
			   submitEmp:function(){
				   console.log("!!!!!!!!!!___-",this.formItem)
				   addEmp(this.formItem).then(()=>{
					   alert("添加成功，即将跳转到员工列表页面");
					   this.$router.replace('/employees')
				   }).catch(function(){
					   alert("添加失败")
					   // this.$router.replace('/employees')
				   });
					   
				   }
				  
			   }
		  
	
       }
</script>