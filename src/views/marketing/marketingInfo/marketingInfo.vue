/*
 * @Author: By.zhangTeng 
 * @Date: 2018-06-25 18:03:23 
 * @Last Modified by: By.zhangTeng
 * @Last Modified time: 2018-06-26 10:37:43
 */
<style scoped>
.ivu-form .ivu-form-item-label {
  width: 20% !important;
}
</style>

<template>
    <div style="background-color:#fff;padding:20px"> 
        <Form :model="formItem" :label-width="150">
        <FormItem label="优惠券名称">
            <Input v-model="formItem.couponsName" placeholder="请输入优惠券名称" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="优惠券类型">
            <Select v-model="formItem.couponsType" style="width: 300px">
                <Option value="1">满减券</Option>
                <Option value="2">直减券</Option>
            </Select>
        </FormItem>
        <!-- <FormItem label="优惠券类型">
            <Select v-model="formItem.couponsGet" style="width: 300px">
                <Option value="1">注册送</Option>
                <Option value="2">消费所得</Option>
                <Option value="3">二级经销商赠送</Option>
                <Option value="4">礼券中心领取</Option>
            </Select>
        </FormItem> -->
        <FormItem label="优惠券可领取数量	">
            <Input v-model="formItem.couponsUsenum" placeholder="请输入优惠券可领取数量	" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="优惠券面值">
            <Input v-model="formItem.couponsValue" placeholder="请输入优惠券面值" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="最低消费可用	">
            <Input v-model="formItem.couponsMin" placeholder="请输入最低消费可用" style="width: 300px"></Input>
        </FormItem>
        <!-- <FormItem label="优惠券描述">
            <Input v-model="formItem.couponsDes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入简短的优惠券描述" style="width: 300px"></Input>
        </FormItem> -->
         <!-- <FormItem label="订单金额最低可送		">
            <Input v-model="formItem.couponsOrderMoney" placeholder="请输入订单金额最低可送" style="width: 300px"></Input>
        </FormItem>
         <FormItem label="库存">
            <Input v-model="formItem.couponsNum" placeholder="请输入库存" style="width: 300px"></Input>
        </FormItem> -->
        <FormItem label="生效时间">
            <DatePicker type="date" v-model="formItem.couponsStartTime" format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 200px" @on-change="start"></DatePicker>
        </FormItem>
        <FormItem label="失效时间">
            <DatePicker type="date" @on-change="end" v-model="formItem.couponsEndTime" format="yyyy-MM-dd"  placeholder="选择失效时间" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="优惠券使用范围" style="width: 300px">
            <Select v-model="formItem.useScope" @on-change="isShop" >
                <Option value="ALL">全类部</Option>
                <Option value="A1">礼品卡</Option>
                <Option value="A2">现货</Option>
                <Option value="商品">指定商品</Option>
            </Select>
        </FormItem>
        <FormItem label="选择商品" :style="{'display':block}" style="width: 300px">
            <Select v-model="formItem.useScope">
                <Option v-for="item in productList" :value="item.productId" :key="item.value">{{ item.productName }}</Option>
            </Select>
        </FormItem>
        <FormItem >
            <Button type="primary" @click="sub">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import coupon from "../service/marketing.js";
export default {
  mixins: [coupon],
  data() {
    return {
      block: "none",

      productList: null,
      formItem: {
        couponsName: "",
        couponsType: "1",
        // couponsGet: "1",
        staffId: "",
        token: "",
        couponsName: "",
        couponsType: "",
        couponsGet: "",
        couponsUsenum: "",
        couponsValue: "",
        couponsMin: "",
        // couponsDes: "",
        // couponsOrderMoney: "",
        // couponsNum: "",
        couponsStartTime: "",
        couponsEndTime: "",
        useScope: "ALL",
        couponsIsdel: 1
      }
    };
  },
  methods: {
    start(val) {
      console.log(val);
      this.formItem.couponsStartTime = val;
    },
    end(val) {
      console.log(val);
      this.formItem.couponsEndTime = val;
    },
    isShop() {
      console.log("1111111");
      if (this.formItem.useScope == "商品") {
        this.block = "block";
      } else {
        this.block = "none";
      }
    },
    sub() {
      var that = this;
      var staffId = Cookies.get("staffId");
      var token = Cookies.get("token");
      this.formItem.staffId = staffId;
      this.formItem.token = token;
      console.log(this.formItem);
      var id = this.$route.params.couponId;
      var params = this.formItem;
      if (id == "add") {
        this.addCoupons(params).then(res => {
          console.log(res);
          if (res.code == 100000) {
            this.$Message.success({
              content: "添加成功",
              onClose: function() {
                that.$router.go(-1);
              }
            });
          }
        });
      } else {
        params.couponsId = id;
        this.editCoupons(params).then(res => {
          console.log(res);
          if (res.code == 100000) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    }
  },
  beforeMount() {
    console.log(this.$route);
    var couponsId = this.$route.params.couponId;
    var staffId = Cookies.get("staffId");
    var token = Cookies.get("token");
    this.formItem.staffId = staffId;
    this.formItem.token = token;
    console.log(this.formItem);
    var params1 = {
      token,
      staffId,
      pageNum: "1",
      pageSize: "1000000"
    };
    this.getProduct(params1).then(res => {
      console.log(res);
      if (res.code == 100000) {
        this.productList = res.data;
      }
    });
    if (couponsId != "add") {
      var params = {
        couponsId,
        token,
        staffId
      };
      this.selectByPrimaryKey(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.formItem = res.data;
          if (
            res.data.useScope != "ALL" &&
            res.data.useScope != "A1" &&
            res.data.useScope != "A2"
          ) {
            this.block = "block";
          }
        }
      });
    }
  }
};
</script>