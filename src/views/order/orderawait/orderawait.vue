<style lang="less">
	@import "../../../styles/common.less";
</style>
<template>
	<div>
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
	</div>
</template>
<script>
	import Cookies from "js-cookie";
	import order from "../service/order.js";
	export default {
		mixins: [order],
		data() {
			return {
				tableData1: [],
				count: null,
				pageNum: 1,
				pageSize: 10,
				value: "",
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
									? this.ishave(params.row.orderAddressinfo,1)
									: "暂无"
							]);
						}
					},
					{
						title: "收货地址信息",
						key: "orderAddressinfo",
						width: 300,
						align: "center",
						render: (h, params) => {
							return h("span", [
								params.row.orderAddressinfo
									? this.ishave(params.row.orderAddressinfo,2)
									: "暂无"
							]);
						}
					},
					{
						title: "联系方式",
						key: "orderAddressinfo",
						align: "center",
						render: (h, params) => {
							return h("span", [
								params.row.orderAddressinfo
									? this.ishave(params.row.orderAddressinfo,3)
									: "暂无"
							]);
						}
					},
					{
						title: "订单金额",
						key: "orderAllmoney",
						align: "center",
						render: (h, params) => {
							return h("span", [
								params.row.orderAllmoney
									? params.row.orderAllmoney
									: "暂无"
							]);
						}
					},
					{
						title: "订单支付时间",
						key: "orderPaytime",
						align: "center",
						render: (h, params) => {
							return h("span", [
								params.row.orderPaytime
									? params.row.orderPaytime
									: "暂无"
							]);
						}
					},
					{
						title: "订单类型",
						key: "type",
						align: "center",
						render: (h, params) => {
							return h("span", [
								params.row.type == 1 ? "实货" : params.row.type == 2 ? "礼卡" : "虚拟提货券"
							]);
						}
					},
					{
						title: "管理",
						key: "action",
						width: 150,
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
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												this.handleRender(params.row.orderId);
											}
										}
									},
									"去发货"
								)
								// h(
								//   "Button",
								//   {
								//     props: {
								//       type: "error",
								//       size: "small"
								//     },
								//     on: {
								//       click: () => {
								//         this.confirm(params.row.orderId);
								//       }
								//     }
								//   },
								//   "拒单"
								// )
							]);
						}
					}
				]
			};
		},
		methods: {
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
			mockTableData1() {
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token,
					staffId,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					orderState: 2
				};
				this.selectOrderListBack(params).then(res => {
					if (res.code == 100000) {
						this.count = res.count;
						this.tableData1 = res.data;
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
			confirm(type) {
				this.$Modal.confirm({
					title: "你确定要" + type + "吗？",
					onOk: () => {
						this.$Message.info(type + "成功");
					},
					onCancel: () => {
						this.$Message.info("取消成功");
					}
				});
			},
			changePageSize(pageSize) {
				this.pageSize = pageSize;
				this.mockTableData1();
			},
			changePage(pageNum) {
				this.pageNum = pageNum;
				this.mockTableData1();
			},
			handleRender(orderId) {
				let argu = { orderId: orderId };
				this.$router.push({
					name: "order-info",
					params: argu
				});
			},
		},
		mounted() {
			this.mockTableData1();
		}
	};
</script>
