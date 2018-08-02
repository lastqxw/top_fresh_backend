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
						<Col span="8">
						<span class="margin-left-10">用户手机号:</span>
						<Input v-model="phone" readonly style="width: 200px"></Input>
						</Col>
						<Col span="6">
						<span class="margin-left-10">用户昵称:</span>
						<Input v-model="nickName" readonly style="width: 200px"></Input>
						</Col>
						<Col span="6">
						<span class="margin-left-10">状态:</span>
						<Input v-model="type" readonly style="width: 200px"></Input>
						</Col>
						<Col span="4">
						<Button class="margin-left-20" type="error" @click="fengjin(userid,type)">{{fengjie}}</Button>
						</Col>
					</Row>
					<Row style='margin-top:20px'>
						<Col span="8">
						<span class="margin-left-10">用户注册时间:</span>
						<Input v-model="coupon" readonly style="width: 200px"></Input>
						</Col>
						<Col span="6">
						<span class="margin-left-10">积分数:</span>
						<Input v-model="integral" readonly style="width: 200px"></Input>
						</Col>
						<Col span="6">
						<span class="margin-left-10">累计积分</span>
						<Input v-model="staffAllscore" readonly style="width: 200px"></Input>
						</Col>
						<Col span="4">
						<Button class="margin-left-20" type="info" @click="fared">发红包</Button>
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
		<Modal v-model="modal1" title="请选择给用户发送的红包" @on-ok="ok" @on-cancel="cancel">
			<p>
				<span>选择红包</span>
				<Select v-model="couponId" style="width:200px">
            <Option v-for="item in couponsList" :value="item.redEnvelopeId" :key="item.redEnvelopeId">{{ item.redEnvelopeName }}</Option>
          </Select>
			</p>
			<p></p>
			<p></p>
		</Modal>
		<Modal v-model="Logistics" cancel-text="" title="物流详情">
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
	import user from "../service/user.js";
	export default {
		mixins: [user],
		data() {
			return {
				shouw: false,
				Logistics: false,
				wuliu: [],
				fengjie: "封禁",
				couponId: "",
				couponsList: "",
				modal1: false,
				userid: "",
				staffPhotourl:
					"http://liushiming.oss-cn-qingdao.aliyuncs.com/picture/20180622/351449321529647739657.png",
				coupon: "",
				integral: "",
				staffAllscore: "",
				active: "",
				type: "",
				count: 10,
				pageSize: 10,
				pageNum: 1,
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
									? params.row.orderAddressinfo.split(",")[1] + params.row.orderAddressinfo.split(",")[2]
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
									? params.row.orderAddressinfo.split(",")[3]
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
			showMode(val) {
				this.Logistics = true;
				var pams = {
					com: "shunfeng",
					num: "044149697173"
				};
				var code = "shunfeng," + val;
				var params = {
					code: Encrypt("shunfeng," + val)
				};
				this.chaxun(params).then(res => {
					if (res.status == 200) {
						this.wuliu = res.data.reverse();
						this.shouw = true;
					} else {
						this.shouw = false;
					}
				});
			},
			ok() {
				var couponId = this.couponId;
				var phone = this.phone;
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token,
					staffId,
					phone,
					redEnvelopeId: couponId
				}
				this.comeDownRedEnvelope(params)
					.then(res => {
						if (res.code == 100000) {
							this.$Message.success("发送成功")
							this.modal1 = false
						}
					})
			},
			cancel() {
				this.$Message.info("Clicked cancel");
			},
			fengjin(id, type) {
				var that = this;
				if (type == 1) {
					var params = {
						token: Cookies.get("token"),
						staffId: Cookies.get("staffId"),
						staffid: id
					};
					this.updateStaffFeng(params).then(res => {
						if (res.code == 100000) {
							this.$Message.success("用户封禁成功");
							that.type = "封禁";
						} else {
							this.$Message.error(res.message);
						}
					});
				} else {
					var params = {
						token: Cookies.get("token"),
						staffId: Cookies.get("staffId"),
						staffid: id
					};
					this.updateStaffJie(params).then(res => {
						if (res.code == 100000) {
							this.$Message.success("用户解封成功");
							that.type = "正常";
						} else {
							this.$Message.error(res.message);
						}
					});
				}
			},
			fared() {
				this.modal1 = true;
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
					orderStaffid: staffid,
					staffId,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				};
				this.selectOrderListBack(params).then(res => {
					if (res.code == 100000) {
						this.tableData1 = res.data;
						this.count = res.count;
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
				this.pageSize = pageSize;
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.mockTableData1();
			},
			changePage(pageNum) {
				this.pageNum = pageNum;
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.mockTableData1();
			}
		},
		beforeMount() {
			var token = Cookies.get("token");
			var staffId = Cookies.get("staffId");
			var staffid = this.$route.params.staffid;
			this.mockTableData1();
			var params = {
				token,
				staffid,
				staffId
			};
			this.getStaffInfoBack(params).then(res => {
				if (res.code == 100000) {
					this.userid = staffid, this.phone = res.data.staffPhone;
					this.nickName = res.data.staffNickname;
					this.integral = res.data.staffScore;
					this.staffAllscore = res.data.staffAllscore;
					this.type = res.data.staffType == 1 ? "正常" : "封禁";
					this.fengjie = res.data.staffType == 1 ? "封禁" : "解封";
					this.coupon = res.data.staffCreatdate;
					this.staffPhotourl = res.data.staffPhotourl
						? res.data.staffPhotourl
						: this.staffPhotourl;
				}
			});
			var params = {
				token,
				staffId,
				pageNum: 1,
				pageSize: 1000000
			};
			this.getRedEnvelope(params).then(res => {
				if (res.code == 100000) {
					this.couponsList = res.data;
				} else {
					this.$Message.error(res.message);
				}
			});
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