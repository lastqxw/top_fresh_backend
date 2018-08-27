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
						<span>{{order.orderCode}}</span>
						<!-- <Input v-model="order.orderCode"   readonly style="width: 200px"></Input> -->
						</Col>
						<Col span="6">
						<span class="margin-left-10">订单状态:</span>
						<span>{{order.orderState}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">支付方式:</span>
						<span>{{order.orderPaytype }}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">创建时间:</span>
						<span>{{order.orderCreatetime}}</span>
						</Col>
					</Row>
					<Row style='margin-top:20px'>
						<Col span="6">
						<span class="margin-left-10">支付时间:</span>
						<span>{{order.orderPaytime}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">使用优惠:</span>
						<span>{{order.youhui}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">商品价格:</span>
						<span> {{order.orderdetails[0].odProductPprice ? "¥ "+order.orderdetails[0].odProductPprice:"未查询到数据"}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">总支付金额:</span>
						<span>{{order.orderAllmoney && order.orderAllmoney != "无" ?  "¥ "+order.orderAllmoney :"未查询到数据"}}</span>
						</Col>
					</Row>
					<Row style='margin-top:20px'>
						<Col span="6">
						<span class="margin-left-10">联系人:</span>
						<span>{{order.orderAddressinfo ? this.ishave(order.orderAddressinfo,1) :"暂无信息"}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">联系方式:</span>
						<span>{{order.orderAddressinfo ? this.ishave(order.orderAddressinfo,3) :"暂无信息"}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">地址信息:</span>
						<span>{{order.orderAddressinfo ? this.ishave(order.orderAddressinfo,2) :"暂无信息"}}</span>
						</Col>
						<Col span="6">
						<span class="margin-left-10">提货类型:</span>
						<span>{{order.type}}</span>
						</Col>
					</Row>
					<Row style='margin-top:40px'>

						<Col span="20">
						<span> </span>
						<span> </span>
						</Col>
						<Col span="4" style="float:right;">
						<Button type="error" @click="removeorder(order.orderId)" :disabled="isFive">关闭订单</Button>
						<Button type="success" @click="handleRender(order.orderId)" :disabled="disabled">发货</Button>
						</Col>
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
				value: "",
				orderType: "",
				isFive:false,
				modal1: false,
				disabled: true,
				disabled1: true,
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
			removeorder(orderId) {
				this.modal1 = true;
			},
			ishave(orderlist,index){
				if(index == 1){
					return orderlist.split(",")[0]
				}else if(index ==2 ){
					let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if(!reg.test(orderlist.split(",")[2])){
						return orderlist.split(",")[1]+orderlist.split(",")[2]
					}else{
						return orderlist.split(",")[1]
					}
				}else if(index == 3){
					let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if(!reg.test(orderlist.split(",")[2])){
						return orderlist.split(",")[3]
					}else{
						return orderlist.split(",")[2]
					}
				}
			},
			ok() {
				// this.order.orderId
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var orderId = this.$route.params.orderId;
				var params = {
					token,
					orderId,
					staffId
				};
				this.cancelOrder(params)
					.then(res => {
						console.log(res)
						if (res.code == 100000) {
							this.$Message.success("关闭成功")
							window.onload()
						} else {
							this.$Message.error(res.message)
						}
					})
			},
			cancel() {
				this.$Message.info('Clicked cancel');
			},
			handleRender(orderId) {
				var that = this;
				this.$Modal.confirm({
					render: h => {
						return h("Input", {
							title: "发货",
							props: {
								value: this.value,
								autofocus: true,
								placeholder: "请输入运单号"
							},
							on: {
								input: val => {
									this.value = val;
								}
							}
						});
					},
					onOk: () => {
						// 发货
						if (this.value) {
							var token = Cookies.get("token");
							var staffId = Cookies.get("staffId");
							var params = {
								token,
								staffId,
								orderId,
								orderSendcode: this.value
							};
							that.sendOrderBack(params).then(res => {
								if (res.code == 100000) {
									this.$Message.success({
										content: "发货成功",
										onClose: function () {
											that.mockTableData1();
										}
									});
								} else {
									this.$Message.error(res.message);
								}
							});
						} else {
							this.$Message.error("请输入运单号")
						}

					}
				});
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
					var orderPaytype = res.data.orderPaytype;
					var thType = res.data.type;
					if (type == 2 && orderPaytype != 3) {
						this.disabled = false
					}
					if(type==5){
						this.isFive=true
					}
					if(thType==3){
						this.order.orderAllmoney="0"
					}	
					var orderScoremoney= res.data.orderScoremoney ? "积分优惠：¥" +res.data.orderScoremoney : "积分优惠:未使用优惠"  
					var orderCouponsmoney= res.data.orderCouponsmoney ? "优惠券优惠：¥" +res.data.orderCouponsmoney : "优惠券优惠:未使用优惠"  
					this.order.youhui =orderScoremoney+"\t"+orderCouponsmoney
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
					switch (thType) {
						case "1":
							this.order.type = "现货";
							break;
						case "2":
							this.order.type = "礼卡";
							break;
						case "3":
							this.order.type = "虚拟提货券";
							break;
					}
					switch (orderPaytype) {
						case "1":
							this.order.orderPaytype = "支付宝支付";
							break;
						case "2":
							this.order.orderPaytype = "微信APP支付";
							break;
						case "3":
							this.order.orderPaytype = "微信公众号支付";
							break;
					}
				}
			});
		}
	};
</script>