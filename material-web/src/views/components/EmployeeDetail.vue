<template>

<div>


     <Row>
        <Col span="24" >


            <div style="" class="doc-content">
                <h5>员工信息详情</h5>


            </div>
        </Col>




    </Row>




  <Row>
        <Col span="24" >

            <i-form :model="formItem" :label-width="80">
                   <Form-item label="员工工号">
                       <i-input :value.sync="formItem.input" placeholder="请输入"></i-input>
                   </Form-item>
				     <Form-item>
				               <i-button type="primary" @click="handleSubmit('formInline')">查询</i-button>
				           </Form-item>
                   <Form-item label="员工姓名">
                       <i-select :model.sync="formItem.select" placeholder="请选择">
                           <i-option value="beijing">北京市</i-option>
                           <i-option value="shanghai">上海市</i-option>
                           <i-option value="shenzhen">深圳市</i-option>
                       </i-select>
                   </Form-item>
                   <Form-item label="日期控件">
                       <Row>
                           <i-col span="11">
                               <Date-picker type="date" placeholder="选择日期" :value.sync="formItem.date"></Date-picker>
                           </i-col>
                           <i-col span="2" style="text-align: center">-</i-col>
                           <i-col span="11">
                               <Time-picker type="time" placeholder="选择时间" :value.sync="formItem.time"></Time-picker>
                           </i-col>
                       </Row>
                   </Form-item>
                   <Form-item label="员工性别">
                       <Radio-group :model.sync="formItem.radio">
                           <Radio value="male">男</Radio>
                           <Radio value="female">女</Radio>
                       </Radio-group>
                   </Form-item>
                   <Form-item label="开关">
                       <Switch :checked.sync="formItem.switch" size="large">
                           <span slot="open">开启</span>
                           <span slot="close">关闭</span>
                       </Switch>
                   </Form-item>
                   <Form-item label="滑块">
                       <Slider :value.sync="formItem.slider" range></Slider>
                   </Form-item>
                   <Form-item label="文本域">
                       <i-input :value.sync="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
                   </Form-item>
                   <Form-item>
                       <i-button type="primary">提交</i-button>
                       <i-button type="ghost" style="margin-left: 8px">取消</i-button>
                   </Form-item>
               </i-form>
        </Col>



    </Row>





</div>

</template>
<script>
   export default {
           data () {
               return {
                   formItem: {
                       input: '',
                       select: '',
                       radio: 'male',
                       switch: true,
                       date: '',
                       time: '',
                       slider: [20, 50],
                       textarea: ''
                   }
               }
           }
       }
</script>