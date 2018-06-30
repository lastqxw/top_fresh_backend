<style lang="less">
	@import '../../../styles/common.less';
</style>
<template>
    <div style="background-color:#fff;height:100%;padding-top:20px">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160" >
            <FormItem label="名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入优惠券名称" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="类型" prop="type" style="width: 300px">
                <Select v-model="formValidate.type" placeholder="选择优惠券类型">
                    <Option value="0">满减券</Option>
                    <Option value="1">直减券</Option>
                </Select>
            </FormItem>
            <FormItem label="使用范围" prop="range" style="width: 300px">
                <Select v-model="formValidate.range" placeholder="选择优惠券使用范围">
                    <Option value="0">全部类</Option>
                    <Option value="1">单分类</Option>
                    <Option value="2">单商品</Option>
                </Select>
            </FormItem>
            <FormItem label="选择商品" prop="product" style="width: 300px" v-if="formValidate.range =='2'">
                <Select v-model="formValidate.product" placeholder="选择优惠券对应商品">
                    <Option value="0">两队螃蟹</Option>
                    <Option value="1">单分类</Option>
                    <Option value="2">单商品</Option>
                </Select>
            </FormItem>
            <FormItem label="选择单分类" prop="class" style="width: 300px" v-if="formValidate.range == '1'">
                <Select v-model="formValidate.class" placeholder="选择优惠券对应分类">
                    <Option value="0">卡券类</Option>
                    <Option value="1">现货类</Option>
                    <Option value="2">结合类</Option>
                </Select>
            </FormItem>
            <FormItem label="有效期" prop="date">
                <DatePicker type="daterange" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        name: "",
        type: "",
        range:"",
        date: "",
        product:"",
        class:"",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "Please select the type",
            trigger: "change"
          }
        ],
        range: [
          {
            required: true,
            message: "Please select the range",
            trigger: "change"
          }
        ],
        product: [
          {
            required: true,
            message: "Please select the product",
            trigger: "change"
          }
        ],
         class: [
          {
            required: true,
            message: "Please select the class",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted(){
      
      if(this.$route.params.couponid != 0){
        console.log('11111')
        this.formValidate= {
        name: "123",
        type: 0,
        range:0,
        date: "2018-06-07 - 2018-07-04",
      }
      }
  }
};
</script> 