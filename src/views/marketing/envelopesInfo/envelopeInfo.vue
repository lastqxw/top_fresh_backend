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
            <FormItem label="红包名称" style="border-bottom:1px solid #ddd;padding-bottom:20px">
                <Input v-model="formItem.redEnvelopeName" placeholder="请输入红包名称" style="width: 300px"></Input>
            </FormItem>
            <FormItem label="选择优惠券">
                <Select v-model="couponId" style="width: 300px" @on-change="change">
                    <Option v-for="item in productList" :value="item.couponsId+','+item.couponsName" :key="item.value">{{ item.couponsName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="红包内涵优惠券个数">
                <Input v-model="number" placeholder="请输入红包内涵优惠券个数" style="width: 300px"></Input>
            </FormItem>
            <FormItem  style="border-bottom:1px solid #ddd;padding-bottom:20px">
                <Button type="primary" @click="sub">添加</Button>
            </FormItem>
        </Form>
         <Table :columns="columns1" :data="redEnevlopeContent" border ></Table>
         <p style="border-bottom:1px solid #ddd;padding-bottom:20px;margin-bottom:20px"></p>
         <Button type="primary" @click="add" v-if="isShow">添加</Button>
         <Button type="primary" @click="updata" v-else >修改</Button>
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
      couponId: "",
      number: "",
      str: "",
      couponName: "",
      redEnvelopeId: "",
      redEnevlopeContent: [],
      columns1: [
        {
          title: "优惠券名称",
          key: "couponName"
        },
        {
          title: "优惠券个数",
          key: "number"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ],
      isShow: true,
      formItem: {
        redEnvelopeName: "",
        couponsType: "1",
        arrayCoupons: ""
      }
    };
  },
  methods: {
    add() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var arrayCoupons = [];
      var redEnevlopeContent = this.redEnevlopeContent;
      for (var i = 0; i < redEnevlopeContent.length; i++) {
        arrayCoupons.push(
          redEnevlopeContent[i].couponId + ":" + redEnevlopeContent[i].number
        );
      }
      console.log(arrayCoupons.join(","));
      var params = {
        token,
        staffId,
        redEnvelopeName: this.formItem.redEnvelopeName,
        arrayCoupons: arrayCoupons.join(",")
      };
      var that = this;
      this.addRedEnvelope(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success({
            content: "添加成功",
            onClose: function() {
              that.$router.go(-1);
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    updata() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var arrayCoupons = [];
      var redEnevlopeContent = this.redEnevlopeContent;
      for (var i = 0; i < redEnevlopeContent.length; i++) {
        arrayCoupons.push(
          redEnevlopeContent[i].couponId + ":" + redEnevlopeContent[i].number
        );
      }
      console.log(arrayCoupons.join(","));
      var params = {
        token,
        staffId,
        edEnvelopeId: this.redEnvelopeId,
        redEnvelopeName: this.formItem.redEnvelopeName,
        arrayCoupons: arrayCoupons.join(",")
      };
      this.editRedEnvelope(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success({
            content: "修改成功"
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    remove(index) {
      console.log(index);
      this.redEnevlopeContent.splice(index, 1);
    },
    change(val) {
      console.log(val);
      this.couponName = val.split(",")[1];
      console.log(this.couponName);
    },
    sub() {
      console.log(this.formItem.arrayCoupons);
      this.redEnevlopeContent.push({
        couponName: this.couponName,
        number: this.number,
        couponId: this.couponId.split(",")[0]
      });
    }
  },
  mounted() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    console.log(this.$route);
    var redEnvelopeId = this.$route.params.redEnvelopeId;
    this.redEnvelopeId = redEnvelopeId;
    if (redEnvelopeId != "add") {
      this.isShow = false;
      var params = {
        token,
        staffId,
        redEnvelopeId
      };
      this.getRedEnvelopeInfo(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.formItem.redEnvelopeName = res.data[0].redEnvelopeName;
          for (var i = 0; i < res.data.length; i++) {
            this.redEnevlopeContent.push({
              couponName: res.data[i].redEnevlopeContent.split("x")[0],
              number: res.data[i].redEnevlopeContent.split("x")[1],
              couponId: res.data[i].couponsId
            });
          }
        }
      });
    }
    var params = {
      token,
      staffId,
      pageSize: 10000000,
      pageNum: 1
    };
    this.selectCouponsList(params).then(res => {
      console.log(res);
      if (res.code == 100000) {
        this.productList = res.data;
      }
    });
  }
};
</script>