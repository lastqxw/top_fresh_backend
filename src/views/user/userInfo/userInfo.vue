<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row>
					<Col span="6">
						<img :src="staffPhotourl" alt="" style="width:80%;margin-left:10%">
					</Col>
					<Col span="18">
						<Row>
							<Col span="6">
								<span class="margin-left-10">用户手机号:</span>
								<Input v-model="phone"   readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">用户昵称:</span>
								<Input v-model="nickName"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">状态:</span>
								<Input v-model="type"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<Button class="margin-left-20" type="error" >封禁</Button>
							</Col>
						</Row>
						<Row style='margin-top:20px'>
							<Col span="6">
								<span class="margin-left-10">用户注册时间:</span>
								<Input v-model="coupon"   readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">积分数:</span>
								<Input v-model="integral"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10"></span>
								
							</Col>
							<Col span="6">
								<Button class="margin-left-20" type="info" >发红包</Button>
							</Col>
						</Row>
					</Col>
                </Row>           
			</Card>
		</Row>
		<Row style="margin-top:20px;">
			<Card>
				<Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePageSize" :total="count" :current="1" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
import Cookies from "js-cookie";
import user from "../service/user.js";
export default {
  mixins: [user],
  data() {
    return {
      staffPhotourl:
        "http://liushiming.oss-cn-qingdao.aliyuncs.com/picture/20180622/351449321529647739657.png",
      coupon: "",
      integral: "",
      active: "",
      type: "",
      count:10,
      pageSize:10,
      pageNum:1,
      phone: "",
      nickName: "",
      tableData1: [],
      tableColumns1: [
        {
          title: "订单号",
          key: "orderCode",
          width: 150,
          align: "center"
        },
        {
          title: "收货地址信息",
          key: "orderAddressinfo",
          align: "center"
        },
        {
          title: "联系方式",
          key: "type",
          align: "center"
        },
        {
          title: "订单金额",
          key: "orderAllmoney",
          align: "center"
        },
        {
          title: "订单时间",
          key: "orderCreatetime",
          align: "center"
        },
        {
          title: "订单状态",
          key: "orderState",
          align: "center",
          //   render: (h, params) => {
          //     return h("span", [
          //       h("span", {}, this.status(params.row.orderState))
          //     ]);
          //   }
          render: (h, params) => {
            return h("span", [
              h("span", {}, this.status(params.row.orderState))
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.orderCode);
                    }
                  }
                },
                "物流"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    margin: "5px"
                  },
                  on: {
                    click: () => {
                      this.info(params.row.orderId);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.confirm();
                    }
                  }
                },
                "退款"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    status(type) {
      switch (type) {
        case "1":
          return "代付款";
          break;
        case "2":
          return "已付款";
          break;
        case "3":
          return "待收货";
          break;
        case "4":
          return "已完成";
          break;
        case "5":
          return "已取消";
          break;
      }
    },
    info(orderId) {
      let argu = { orderId: orderId };
      this.$router.push({
        name: "order-info",
        params: argu
      });
    },
    mockTableData1() {
       var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var staffid = this.$route.params.staffid;
    var params = {
      token,
      staffid,
      staffId,
      pageSize:this.pageSize,
      pageNum:this.pageNum
    };
      this.selectOrderListBack(params)
      .then(res => {
      console.log(res)
      if(res.code==100000){
        this.tableData1=res.data;
        this.count=res.count
      }
    })
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
     changePageSize(pageSize) {
      this.pageSize=pageSize
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.mockTableData1();
    },
    changePage(pageNum) {
      this.pageNum=pageNum
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.mockTableData1();
    }
  },
  beforeMount() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var staffid = this.$route.params.staffid;
    this.mockTableData1()
    var params = {
      token,
      staffid,
      staffId
    };
    this.getStaffInfoBack(params).then(res => {
      console.log(res);
      if (res.code == 100000) {
        this.phone = res.data.staffPhone;
        this.nickName = res.data.staffNickname;
        this.integral = res.data.staffScore;
        this.type = res.data.staffType == 1 ? "正常" : "封禁";
        this.coupon = res.data.staffCreatdate;
        this.staffPhotourl = res.data.staffPhotourl
          ? res.data.staffPhotourl
          : this.staffPhotourl;
      }
    });
    
  }
};
</script>