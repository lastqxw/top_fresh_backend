<style lang="less">
	@import "../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<Row style="width:79%;display:inline-table">
					<span class="margin-left-10">手机号:</span>
					<Input v-model="staffPhone" placeholder="请输入用户手机号" clearable style="width: 200px"></Input>
					<span class="margin-left-10">状态:</span>
					<Select v-model="staffIsdel" style="width:200px">
						<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</Row>
				<Row style="width:20%;display:inline-table">
					<Button class="margin-left-20" type="primary" icon="ios-search" @click="search">查找</Button>
				</Row>
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
	</div>
</template>
<script>
	import Cookies from "js-cookie";
	import getUser from "../user/service/user.js";
	export default {
		mixins: [getUser],
		data() {
			return {
				staffIsdel: "0",
				staffPhone: "",
				count: null,
				pageNum: 1,
				pageSize: 10,
				typeList: [
					{
						value: "0",
						label: "全部"
					},
					{
						value: "1",
						label: "正常"
					},
					{
						value: "2",
						label: "封禁"
					}
				],
				tableData1: [],
				tableColumns1: [
					{
						title: "编号",
						key: "staffId",
						width: 80,
						align: "center"
					},
					{
						title: "用户昵称",
						key: "staffNickname",
						align: "center"
					},
					{
						title: "手机号",
						key: "staffPhone",
						align: "center"
					},
					// {
					// 	title: "激活礼卡专享折扣",
					// 	key: "staffPhone",
					// 	align: "center"
					// },
					{
						title: "用户总积分数",
						key: "staffAllscore",
						align: "center"
					},
					{
						title: "积分",
						key: "staffScore",
						align: "center"
					},
					{
						title: "状态",
						key: "staffIsdel",
						align: "center",
						render: (h, params) => {
							return h("span", [params.row.staffIsdel == null ? "正常" : params.row.staffIsdel == 1 ? "正常" : "封禁"]);
						}
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
											type: "primary",
											size: "small"
										},
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												let argu = { staffid: params.row.staffId };
												this.$router.push({
													name: "user-info",
													params: argu
												});
											}
										}
									},
									"查看"
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
												this.remove(params.row.staffId, params.row.staffIsdel);
											}
										}
									},
									params.row.staffIsdel == null ? "封禁" : params.row.staffIsdel == 1 ? "封禁" : "解封"
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
			remove(id, type) {
				var that = this;
				if (type == 1) {
					var params = {
						token: Cookies.get("token"),
						staffId: Cookies.get("staffId"),
						staffid: id
					};
					this.updateStaffFeng(params).then(res => {
						if (res.code == 100000) {
							this.$Message.success({
								content: "用户封禁成功",
								onClose: function () {
									that.mockTableData1();
								}
							});
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
							this.$Message.success({
								content: "用户解封成功",
								onClose: function () {
									that.mockTableData1();
								}
							});
						} else {
							this.$Message.error(res.message);
						}
					});
				}
			},
			mockTableData1() {
				var staffIsdel = this.staffIsdel;
				var staffPhone = this.staffPhone;
				var params = {
					token: Cookies.get("token"),
					staffId: Cookies.get("staffId"),
					pageSize: this.pageSize,
					pageNum: this.pageNum
				};
				if (staffPhone != "") {
					params.staffPhone = staffPhone;
				}
				if (staffIsdel != "" && staffIsdel != "0") {
					params.staffIsdel = staffIsdel;
				}
				this.getStaffList(params).then(res => {
					if (res.code == 100000) {
						var data = res.data;
						this.count = res.count;
						this.tableData1 = data;
					} else {
						this.$Message.error(res.message);
						this.tableData1 = [];
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
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
			}
		},
		mounted() {
			this.mockTableData1();
		}
	};
</script>