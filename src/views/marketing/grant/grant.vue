<style lang="less">
@import "../../../styles/common.less";
</style>
<style lang="less" scoped>
</style>

<template>
	<div>
		<Row>
			<Card>
                 <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    触发式红包
                </p>
                <Row style="padding-bottom:10px;border-bottom:1px solid #e9eaec">
                    <Col span="6">
                        新注册用户，获取红包：
                    </Col>
                    <Col span="12">
                        <Select v-model="type" style="width:200px">
                            <Option v-for="item in typeList" :value="item.redEnvelopeId" :key="item.redEnvelopeId">{{ item.redEnvelopeName }}</Option>
                        </Select>
                        <Input v-model="count" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">红包剩余待领取个数:</span>
								        <Input v-model="integral1"  readonly style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="6">
                        订单实际付款金额满N元时，获取红包：
                    </Col>
                    <Col span="12">
                        <Input v-model="money" placeholder="请输入订单金额" clearable style="width: 200px"></Input>
                        <Select v-model="type1" style="width:200px">
                            <Option v-for="item in typeList" :value="item.redEnvelopeId" :key="item.redEnvelopeId">{{ item.redEnvelopeName }}</Option>
                        </Select>
                        <Input v-model="count1" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">红包剩余待领取个数:</span>
								        <Input v-model="integral2"  readonly style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="6">
                        用户第一次下单，获取红包：
                    </Col>
                    <Col span="12">
                        <Select v-model="type2" style="width:200px">
                            <Option v-for="item in typeList" :value="item.redEnvelopeId" :key="item.redEnvelopeId">{{ item.redEnvelopeName }}</Option>
                        </Select>
                        <Input v-model="count2" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                     <Col span="6">
                        <span class="margin-left-10">红包剩余待领取个数:</span>
								        <Input v-model="integral3"  readonly style="width: 200px"></Input>
                    </Col>
                </Row>
                <!-- <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="6">
                        用户下单后分享，好友领红包：
                    </Col>
                    <Col span="12">
                        <Select v-model="type3" style="width:200px">
                            <Option v-for="item in typeList" :value="item.redEnvelopeId" :key="item.redEnvelopeId">{{ item.redEnvelopeName }}</Option>
                        </Select>
                        <Input v-model="count3" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">红包剩余待领取个数:</span>
								        <Input v-model="integral4"  readonly style="width: 200px"></Input>
                    </Col>
                </Row> -->
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec" >
                    <Col span="12">
                               
                    </Col>
                    <Col span="12">
                    <Button type="primary" :loading="loading" @click="save">
                        <span v-if="!loading">保存</span>
                        <span v-else>正在提交...</span>
                    </Button>
                    </Col>
                </Row>
			</Card>
            <Card style="margin-top:20px">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    天降式红包
                </p>
                <Row style="padding-bottom:13px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        <span>手机号：</span>
                        <Input v-model="phone" placeholder="请输入手机号" clearable style="width: 200px" @on-change="isValue"></Input>
                    </Col>
                    <Col span="12">
                        <span>用户注册时长：</span>
                        <Input v-model="time" placeholder="请输入用户注册时长（单位 年）" clearable style="width: 200px"  @on-change="isValue"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                    
                    </Col>
                    <Col span="12">
                        <span>某段时间的消费情况:</span>
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px" @on-change="datarange"></DatePicker>
                        <Input v-model="payNum" placeholder="请输入消费金额" clearable style="width: 200px"  @on-change="isValue"></Input>
                    </Col>
                </Row>
                 <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="18">
                        <span>某段时间购买过某类或某种商品:</span>
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px" @on-change="datarange1"></DatePicker>
                        <Select v-model="type4" style="width:200px" @on-change="isValue"  clearable>
                            <Option v-for="item in typeList4" :value="item.productId" :key="item.redEnvelopeId" >{{ item.productName }}</Option>
                        </Select>
                        <Input v-model="consumption" placeholder="请输入消费金额" clearable style="width: 200px"  @on-change="isValue"></Input>
                    </Col>
                    <Col span="6">
                        <Button type="primary" :loading="loading2" @click="toLoading2" :disabled="disabled">
                            <span v-if="!loading2" @click="search">筛选</span>
                            <span v-else>正在进行条件筛选...</span>
                        </Button>
                    </Col>
                </Row>
                 <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="8">
                        筛选出目标用户个数：<span style="font-size:24px;color:red">{{people}} </span>人
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                     <Col span="8">
                       <span>选择所要发放的红包</span>
                       <Select v-model="type5" style="width:200px">
                            <Option v-for="item in couponList" :value="item.redEnvelopeId" :key="item.redEnvelopeId">{{ item.redEnvelopeName }}</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                        <Button type="warning" :loading="loading1" @click="toLoading1" :disabled="disabled1">
                            <span v-if="!loading1" @click="send">发放优惠券</span>
                            <span v-else>正在进行优惠券的发放...</span>
                        </Button>
                    </Col>
                </Row>
            </Card>
		</Row>
		
	</div>
</template>
<script>
import Cookies from "js-cookie";
import grant from "../service/grant.js";
import marketing from "../service/marketing.js";
export default {
  mixins: [grant, marketing],
  data() {
    return {
      people: 0,
      disabled: true,
      disabled1: true,
      integral1:"",
      integral2:"",
      integral3:"",
      integral4:"",
      consumption: "",
      phone: "",
      time: "",
      payNum: "",
      loading: false,
      loading1: false,
      loading2: false,
      startPayTime: "",
      endPayTime: "",
      startPayProductTime: "",
      endPayProductTime: "",
      count: "",
      count1: "",
      count2: "",
      count3: "",
      money: "",
      type: "",
      type1: "",
      type2: "",
      type3: "",
      type4: "",
      type5: "",
      typeList: [],
      typeList4: [],
      couponList: []
    };
  },
  methods: {
    isValue(val) {
      if (typeof val == "object" && val.data == null) {
        this.disabled = true;
      } else if (val) {
        this.disabled = false;
      } else {
      }
    },
    datarange(val) {
      this.startPayTime = val[0];
      this.endPayTime = val[1];
      this.disabled = false;
    },
    datarange1(val) {
      this.startPayProductTime = val[0];
      this.endPayProductTime = val[1];
      this.disabled = false;
    },
    search() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var orderConditionFlag = this.phone || this.time ? "" : "1";
      var params = {
        token,
        staffId,
        phone: this.phone,
        registerYear: this.time,
        startPayTime: this.startPayTime,
        endPayTime: this.endPayTime,
        payNum: this.payNum,
        startPayProductTime: this.startPayProductTime,
        endPayProductTime: this.endPayProductTime,
        productid: this.type4,
        orderConditionFlag: orderConditionFlag
      };
      this.selectComeDownRedEnvelope(params).then(res => {
        if (res.code == 100000) {
          that.people = res.data;
          that.loading2 = false;
          that.disabled1 = false;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    send() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var orderConditionFlag = this.phone || this.time ? "" : "1";
      var params = {
        token,
        staffId,
        phone: this.phone,
        registerYear: this.time,
        startPayTime: this.startPayTime,
        endPayTime: this.endPayTime,
        payNum: this.payNum,
        startPayProductTime: this.startPayProductTime,
        endPayProductTime: this.endPayProductTime,
        productid: this.type4,
        orderConditionFlag: orderConditionFlag,
        redEnvelopeId: this.type5
      };
      this.comeDownRedEnvelope(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success("发放成功");
          that.loading1 = false;
          that.disabled1 = true;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    toLoading() {
      this.loading = true;
    },
    toLoading1() {
      this.loading1 = true;
    },
    toLoading2() {
      this.loading2 = true;
    },
    save() {
      var that = this;
      this.loading = true;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      if (this.count != "" && this.type != "") {
        var params = {
          token,
          staffId,
          activityNewuser: 1,
          setRedNumN: this.count,
          redEnvelopeId: this.type
        };
        this.setRedEnvelope(params).then(res => {
			console.log(1)
          if (res.code == 100000) {
            this.$Message.success("新注册用户，获取红包设置成功");
          }
        });
      }
      if (that.count1 != "" && that.money != "" && that.type1 != "") {
        var params1 = {
          token,
          staffId,
          activityPayfull: 1,
          setRedNumP: that.count1,
          payNum: that.money,
          redEnvelopeId: that.type1
        };
        that.setRedEnvelope(params1).then(res => {
			console.log(2)
          if (res.code == 100000) {
            this.$Message.success("订单实际付款金额满N元时，获取红包设置成功");
          }
        });
      }
      if (that.count2 != "" && that.type2 != "") {
        var params2 = {
          token,
          staffId,
          activityFirstpay: 1,
          setRedNumF: that.count2,
          redEnvelopeId: that.type2
        };
        that.setRedEnvelope(params2).then(res => {
			console.log(3)
          if (res.code == 100000) {
			this.$Message.success("设置用户第一次下单，获取的红包设置成功");
			this.loading=false
          }
        });
      }
      if (that.count3 != "" && that.type3 != "") {
        var params3 = {
          token,
          staffId,
          setRedEnvelope: 1,
          setRedNumS: that.count3,
          redEnvelopeId: that.type3
        };
        that.setRedEnvelope(params1).then(res => {
          if (res.code == 100000) {
            this.$Message.success("用户下单后分享，好友领的红包设置成功");
          }
        });
      }
    }
  },
  mounted() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var params = {
      token,
      staffId,
      pageNum: 1,
      pageSize: 10000000,
      couponsNum: "",
      redEnvelopeName: ""
    };
    this.getRedEnvelope(params).then(res => {
      if (res.code == 100000) {
        this.typeList = res.data;
      }
    });
    var params1 = {
      token,
      staffId,
      pageNum: 1,
      pageSize: 10000000
    };
    this.getProduct(params1).then(res => {
      if (res.code == 100000) {
        this.typeList4 = res.data;
      }
    });
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var params = {
      token,
      staffId,
      pageNum: 1,
      pageSize: 1000000
    };
    this.getRedEnvelope(params).then(res => {
      if (res.code == 100000) {
        this.couponList = res.data;
      } else {
        this.$Message.error(res.message);
      }
    });
  }
};
</script>