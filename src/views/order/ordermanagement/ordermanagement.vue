<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <span>订单号：</span>
                <Input v-model="orderCode" placeholder="请输入订单编号" clearable style="width: 200px"></Input>
                <!-- <span class="margin-left-10">类型：</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <span class="margin-left-10">状态：</span>
                <Select v-model="orderState" style="width:200px">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="margin-left-10">时间范围：</span>
                <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px" @on-change="data"></DatePicker>
                <Button class="margin-left-10" type="success" icon="android-add" @click="search">查找</Button>

            </Card>
        </Row>
        <Row>
            <Card>
                <Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page show-elevator show-sizer @on-page-size-change="changePageSize" :total="count" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </Card>
        </Row>
        <!--物流-->
        <Modal
                v-model="Logistics"
                cancel-text	=""
                title="物流详情">
            <ul class="logistics" v-if="shouw">
                <li v-for="item in wuliu">
                    <p>{{item.ftime}}</p>
                    {{item.context}}
                </li>
            </ul>
            <ul class="logistics" v-else>
                <li>
                   <p>暂无物流信息</p>
                </li>
            </ul>
        </Modal>
    </div>
</template>
<script>
import { Decrypt, Encrypt } from "../service/MD5.js";
import Cookies from "js-cookie";
import order from "../service/order.js";
export default {
  mixins: [order],
  data() {
    return {
      shouw: true,
      wuliu: null,
      Logistics: false,
      orderCode: "",
      orderState: "",
      count: 10,
      orderPaytime: "",
      orderCreatetime: "",
      pageSize: 10,
      pageNum: 1,
      Refund: false,
      cityList: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "卡券",
          label: "卡券"
        },
        {
          value: "现货",
          label: "现货"
        }
      ],
      statusList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "待付款"
        },
        {
          value: "2",
          label: "已付款"
        },
        {
          value: "3",
          label: "待收货"
        },
        {
          value: "4",
          label: "待评价"
        },
        {
          value: "5",
          label: "已取消"
        }
      ],
      tableData1: [],
      tableColumns1: [
        {
          title: "订单号",
          key: "orderCode",
          width: 150,
          align: "center"
        },
        {
          title: "联系人",
          key: "orderAddressinfo",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.orderAddressinfo
                ? params.row.orderAddressinfo.split(",")[0]
                : "暂无"
            ]);
          }
        },
        {
          title: "收货地址信息",
          key: "orderAddressinfo",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.orderAddressinfo
                ? params.row.orderAddressinfo.split(",")[1]
                : "暂无"
            ]);
          }
        },
        {
          title: "联系方式",
          key: "type",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.orderAddressinfo
                ? params.row.orderAddressinfo.split(",")[2]
                : "暂无"
            ]);
          }
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
                    size: "small",
                    disabled: this.type1(params.row.orderState)
                  },
                  on: {
                    click: () => {
                      this.showMode(params.row.orderSendcode);
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
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    data(val) {
      this.orderCreatetime = val[0];
      this.orderPaytime = val[1];
    },
    showMode(val) {
      this.Logistics = true;
      var pams = {
        com: "shunfeng",
        num: "044149697173"
      };
      var code = "shunfeng," + val;
      console.log(code);
      console.log(Encrypt(code));
      var params = {
        code: Encrypt("shunfeng," + val)
      };
      this.chaxun(params).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.wuliu = res.data.reverse();
        } else {
          this.shouw = false;
        }
      });
    },
    search() {
      this.mockTableData1();
    },
    info(orderId) {
      let argu = { orderId: orderId };
      this.$router.push({
        name: "order-info",
        params: argu
      });
    },
    type1(type) {
      switch (type) {
        case "1":
          return true;
          break;
        case "2":
          return true;
          break;
        case "3":
          return false;
          break;
        case "4":
          return false;
          break;
        case "5":
          return true;
          break;
      }
    },
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
          return "待评价";
          break;
        case "5":
          return "已取消";
          break;
      }
    },

    mockTableData1() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      var orderPaytime = this.orderPaytime;
      var orderCode = this.orderCode;
      var orderCreatetime = this.orderCreatetime;
      var orderState = this.orderState == 0 ? "" : this.orderState;
      console.log(orderPaytime, orderCode, orderCreatetime, orderState);
      if (orderPaytime != "") {
        params.orderPaytime = orderPaytime;
      }
      if (orderCode != "") {
        params.orderCode = orderCode;
      }
      if (orderCreatetime != "") {
        params.orderCreatetime = orderCreatetime;
      }
      if (orderState != "") {
        params.orderState = orderState;
      }
      console.log(params);
      this.selectOrderListBack(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.tableData1 = res.data.reverse();
          this.count = res.count;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    confirm() {
      this.$Modal.confirm({
        title: "你确定要退款吗？",
        onOk: () => {
          this.$Message.info("退款成功");
        },
        onCancel: () => {
          this.$Message.info("取消成功");
        }
      });
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
      console.log(pageSize);
      this.pageSize = pageSize;
      this.mockTableData1();
    },
    changePage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.mockTableData1();
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      //   this.tableData1 = this.mockTableData1(pageNum);
    }
  },
  mounted() {
    this.mockTableData1();
  }
};
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
.logistics {
  p {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #f54040;
  }
}
</style>
