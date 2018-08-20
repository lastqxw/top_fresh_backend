<style lang="less">
	@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<Row style="width:80%;display:inline-table">
					<span class="margin-left-10">优惠码编号:</span>
					<Input v-model="number" placeholder="请输入优惠码编号" clearable style="width: 200px"></Input>
					<span class="margin-left-10">状态:</span>
					<Select v-model="type" style="width:200px">
				<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			  </Select>
					<Button class="margin-left-20" type="primary" icon="ios-search" @click="search">查找</Button>
					<Button class="margin-left-20" type="info" icon="ios-plus-outline" @click="toPlush">新增优惠码</Button>
				</Row>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="tableColumns1" :data="tableData1" @on-selection-change='jihuo'></Table>
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
	import card from "../service/card.js";
	export default {
		mixins: [card],
		data() {
			return {
				type: "0",
				name: "",
				number: "",
				isshow: false,
				count: 10,
				pageSize: 10,
				pageNum: 1,
				url: "",
				id: [],
				typeList: [
					{
						value: "0",
						label: "全部"
					},
					{
						value: "1",
						label: "未激活"
					},
					{
						value: "3",
						label: "已使用"
					},
					{
						value: "6",
						label: "已激活"
					}
				],
				tableData1: [],
				tableColumns1: [
					{
						title: "优惠码",
						key: "card",
						width: 150,
						align: "center"
					},
					{
						title: "折扣信息",
						key: "timesize",
						align: "center"
					},
					{
						title: "状态",
						key: "state",
						align: "center",
						render: (h, params) => {
							return h("span", [params.row.state == 6 ? "激活" : params.row.state == 1 ? "未激活" : "已使用"]);
						}
					},
					{
						title: "使用人昵称",
						key: "name",
						align: "center"
					},
					{
						title: "使用时间",
						key: "usetime",
						width: 150,
						align: "center"
					},
					{
						title: "操作",
						width: 200,
						align: "center",
						render: (h, params) => {
							return h("div", [
								h(
									"Poptip",
									{
										props: {
											confirm: true,
											title: "您确定要删除这条数据吗?",
											transfer: true
										},
										on: {
											"on-ok": () => {
												this.deleteNotice(params.row.noticeId);
											}
										}
									},
									[
										h(
											"Button",
											{
												style: {
													marginRight: "5px"
												},
												props: {
													size: "small",
													type: "error",
													placement: "top"
												}
											},
											"删除"
										)
									]
								)
							]);
						}
					}
				]
			};
		},
		methods: {
			search() {
				this.mockTableData1();
			},
			deleteNotice(){

			},
			toPlush() {
				this.$router.push({
					name: "promo-info"
				});
			},
			daochu() {
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token,
					staffId
				}
				this.daochuorderTail(params)
					.then(res => {
						console.log(res)
						if (res.code == 100000) {
							console.log(11111)
							this.isshow = true;
							var url = res.data + "?token=" + token + "&staffId=" + staffId;
							this.url = url
						} else {
							this.$Message.error(res.message)
						}
					})
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
				console.log(this.type)
				if (this.type != "0" && this.type != "") {
					params.state = this.type;
				}
				if (this.number != "") {
					params.card = this.number;
				}
				this.getLadingList(params).then(res => {
					if (res.code == 100000) {
						for (var i = 0; i < res.data.length; i++) {
							if (res.data[i].state == 6 || res.data[i].state == 3) {
								res.data[i]._disabled = true;
							} else {
								res.data[i]._disabled = false;
							}
						}
						this.tableData1 = res.data;
						this.count = res.count;
					} else {
						this.$Message.error(res.message);
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
			changePage(pageNum) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.pageNum = pageNum;
				this.mockTableData1();
			},
			changePageSize(pageSize) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.pageSize = pageSize;
				this.mockTableData1();
			}
		},
		mounted() {
			this.mockTableData1();
		}
	};
</script>