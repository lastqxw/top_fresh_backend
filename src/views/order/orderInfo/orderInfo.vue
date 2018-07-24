<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row>
					<Col span="24">
						<Row>
							<Col span="6">
								<span class="margin-left-10">订单编号:</span>
								<Input v-model="order.orderCode"   readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">订单状态:</span>
								<Input v-model="order.orderState"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">支付方式:</span>
								<Input v-model="order.orderPaytype"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">创建时间:</span>
								<Input v-model="order.orderCreatetime"  readonly style="width: 200px"></Input>
							</Col>
						</Row>
						<Row style='margin-top:20px'>
							<Col span="6">
								<span class="margin-left-10">支付时间:</span>
								<Input v-model="order.orderPaytime"   readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">使用优惠:</span>
								<Input v-model="order.youhui"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">订单商品价格:</span>
								<Input v-model="order.orderPmoney"  readonly style="width: 200px"></Input>
							</Col>
							<Col span="6">
								<span class="margin-left-10">订单价格:</span>
								<Input v-model="order.orderAllmoney"  readonly style="width: 200px"></Input>
							</Col>
						</Row>
                        <Row style='margin-top:20px'>
							<Col span="6">
								<span class="margin-left-10">地址信息:</span>
								<Input v-model="order.orderAddressinfo"   readonly style="width: 200px"></Input>
							</Col>
							<!-- <Col span="6">
								<span class="margin-left-10">订单号:</span>
								<Input v-model="order.orderDelivermoney"  readonly style="width: 200px"></Input>
							</Col> -->
						</Row>
					</Col>
                </Row>           
			</Card>
		</Row>
		<Row style="margin-top:20px;">
			<Card>
				<Table stripe border :columns="tableColumns1" :data="order.orderdetails"></Table>
			</Card>
		</Row>
	</div>
</template>
<script>
import Cookies from "js-cookie";
import user from "../service/order.js";
export default {
  mixins: [user],
  data() {
    return {
      order: [],
      tableColumns1: [
        {
          title: "商品编号",
          key: "odProductId",
          width: 150,
          align: "center"
        },
        {
          title: "商品名称",
          key: "odProductName",
          align: "center"
        },
        {
          title: "商品主图",
          key: "odProductIcon",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.odProductIcon,
                width: " 100%"
              },
              on: {
                click: () => {
                }
              }
            });
          }
        },
        {
          title: "商品数量",
          key: "odProductNum",
          align: "center"
        },
        {
          title: "商品描述",
          key: "odProductDes",
          align: "center"
        },
        {
          title: "商品类型",
          key: "odPtypeId",
		  align: "center",
		  render: (h, params) => {
            return h("span", [params.row.odPtypeId == 1 ? "礼卡" : "现货"]);
          }
        },
        {
          title: "商品原价",
          key: "odProductOprice",
          align: "center"
        },
        {
          title: "商品售价",
          key: "odProductPprice",
          align: "center"
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
    }
  },
  beforeMount() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var orderId = this.$route.params.orderId;
    var params = {
      token,
      orderId,
      staffId
    };
    this.selectOrderPrimaryKeyBack(params).then(res => {
      if (res.code == 100000) {
        this.order = res.data;
		var type = res.data.orderState;
		this.order.youhui="积分优惠：¥"+res.data.orderScoremoney+";\t优惠券优惠：¥"+res.data.orderCouponsmoney
        switch (type) {
          case "1":
            this.order.orderState = "代付款";
            break;
          case "2":
            this.order.orderState = "已付款";
            break;
          case "3":
            this.order.orderState = "待收货";
            break;
          case "4":
            this.order.orderState = "已完成";
            break;
          case "5":
            this.order.orderState = "已取消";
            break;
        }
      }
    });
  }
};
</script>