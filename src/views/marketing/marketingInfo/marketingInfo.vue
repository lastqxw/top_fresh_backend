/*
 * @Author: By.zhangTeng 
 * @Date: 2018-06-25 18:03:23 
 * @Last Modified by: ZT.zhangTeng
 * @Last Modified time: 2018-07-17 10:51:46
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
            <Select v-model="formItem.couponsType" style="width: 300px" @on-change="isMan">
                <Option value="1">满减券</Option>
                <Option value="2">直减券</Option>
            </Select>
        </FormItem>
        <FormItem label="优惠券可领取数量">
            <Input v-model="formItem.couponsUsenum" placeholder="请输入优惠券可领取数量	" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="优惠券面值">
            <Input v-model="formItem.couponsValue" placeholder="请输入优惠券面值" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="最低消费可用	" v-if="isZui">
            <Input v-model="formItem.couponsMin" placeholder="请输入最低消费可用" style="width: 300px"></Input>
        </FormItem>
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
            <Select v-model="pruductId" @on-change="selectProduct" >
                <Option v-for="item in productList" :value="item.productId" :key="item.productId">{{ item.productName }}</Option>
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
      isZui: true,
      productList: null,
      pruductId: "",
      formItem: {
        couponsName: "",
        couponsType: "1",
        staffId: "",
        token: "",
        couponsName: "",
        couponsType: "",
        couponsGet: "",
        couponsUsenum: "",
        couponsValue: "",
        couponsMin: "",
        couponsStartTime: "",
        couponsEndTime: "",
        useScope: "ALL",
        couponsIsdel: 1
	  },
	  couponsStartTime: "",
      couponsEndTime: "",
    };
  },
  methods: {
    start(val) {
		this.couponsStartTime=val;
      this.formItem.couponsStartTime = val;
    },
    isMan(val) {
      val == 2 ? (this.isZui = false) : (this.isZui = true);
    },
    end(val) {
		this.couponsEndTime=val;
      this.formItem.couponsEndTime = val;
    },
    isShop() {
      if (this.formItem.useScope == "商品") {
        this.block = "block";
      } else {
        this.block = "none";
      }
    },
    selectProduct(val) {
      // this.formItem.useScope = val;
    },
    sub() {
      var that = this;
      var staffId = Cookies.get("staffId");
      var token = Cookies.get("token");
      this.formItem.staffId = staffId;
      this.formItem.token = token;
      var id = this.$route.params.couponId;
	  var params = this.formItem;
	  
      if (this.formItem.useScope == "商品") {
        this.formItem.useScope = this.pruductId;
      }
      if (id == "add") {
        this.addCoupons(params).then(res => {
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
		params.couponsEndTime=this.couponsEndTime;
		params.couponsStartTime=this.couponsStartTime;
        this.editCoupons(params).then(res => {
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
    var couponsId = this.$route.params.couponId;
    var staffId = Cookies.get("staffId");
    var token = Cookies.get("token");
    this.formItem.staffId = staffId;
    this.formItem.token = token;
    var params1 = {
      token,
      staffId,
      pageNum: "1",
      pageSize: "1000000"
    };
    this.getProduct(params1).then(res => {
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
        if (res.code == 100000) {
		  this.formItem = res.data;
		  this.couponsEndTime=res.data.couponsEndTime;
		  this.couponsStartTime=res.data.couponsStartTime;
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