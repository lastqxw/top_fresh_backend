<style lang="less">
	@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>商品名称：</span>
				<Input v-model="value" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">商品类型：</span>
				<Select v-model="model1" style="width:200px">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button class="margin-left-20" type="primary" icon="ios-search" @click="mockTableData1(1)">搜索</Button>
				<Button class="margin-left-10" type="success" icon="android-add" @click="toAdd('add')">新增</Button>
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
		<Modal v-model="modal2" title="系统提示" @on-ok="ok" @on-cancel="cancel">
			<p>是否删除该商品</p>
		</Modal>
	</div>
</template>
<script>
	import Cookies from "js-cookie";
	import headline from "../service/management.js";
	export default {
		mixins: [headline],
		data() {
			return {
				modal2: false,
				value: "",
				model1: "0",
				count: 10,
				id: "",
				token: Cookies.get("token"),
				staffId: Cookies.get("staffId"),
				pageNum: 1,
				pageSize: 10,
				productId: "",
				tableData1: [],
				cityList: [
					{
						value: "0",
						label: "全部"
					},
					{
						value: "1",
						label: "礼卡"
					},
					{
						value: "2",
						label: "礼盒"
					}
				],
				tableColumns1: [
					{
						title: "编号",
						key: "netId",
						width: 80,
						align: "center"
					},
					{
						title: "商品主图",
						key: "netImg",
						align: "center",
						render: (h, params) => {
							return h("img", {
								attrs: {
									src: params.row.netImg,
									width: " 100%"
								},
							});
						}
					},
					{
						title: "商品名称",
						key: "netTitle",
						align: "center",
					},
					{
						title: "雄蟹重量(两)",
						key: "netMale",
						align: "center",
					},
					{
						title: "雌蟹重量(两)",
						key: "netFemale",
						align: "center",
					},
					{
						title: "商品类型",
						key: "netType",
						align: "center",
						render: (h, params) => {
							return h("span", [params.row.netType == 1 ? "礼卡" : "礼盒"]);
						}
					},
					{
						title: "商品包装",
						key: "netType2",
						align: "center",
						render: (h, params) => {
							return h("span", [params.row.netType2 + "对装"]);
						}
					},
					{
						title: "商品价格",
						key: "netPrice",
						align: "center",
						render: (h, params) => {
							return h("span", ["¥" + params.row.netPrice]);
						}
					},
					// {
					// 	title: "赠品",
					// 	key: "netGift",
					// 	align: "center",
					// },
					// {
					// 	title: "包装类型",
					// 	key: "netPacking",
					// 	align: "center",
					// },
					{
						title: "商品链接",
						key: "netLink",
						align: "center",
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
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												let argu = { netId: params.row.netId };
												this.$router.push({
													name: "indexProduct-info",
													params: argu
												});
											}
										}
									},
									"编辑"
								),
								h(
									"Button",
									{
										props: {
											type: "error",
											size: "small"
										},
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												this.remove(params.row.netId);
											}
										}
									},
									"删除"
								),
							]);
						}
					}
				]
			};
		},
		methods: {
			mockTableData1() {
				var token = this.token;
				var staffId = this.staffId;
				var params = {
					token: token,
					staffId: staffId,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				if (this.value) {
					params.netTitle = this.value
				}
				if (this.model1 != 0) {
					params.netType = this.model1
				}
				this.getlist(params).then(res => {
					console.log(res)
					if (res.code == 100000) {
						this.tableData1 = res.data;
						this.count = res.count ? parseInt(res.count) : 10;
					} else {
						this.$Message.error(res.message)
						this.tableData1 = [];
					}
				});
			},
			changePage(pageNum) {
				this.pageNum = pageNum;
				this.mockTableData1();
			},
			changePageSize(pageSize) {
				this.pageSize = pageSize;
				this.mockTableData1();
			},
			toAdd(id) {
				let argu = { netId: id };
				this.$router.push({
					name: "indexProduct-info",
					params: argu
				});
			},
			remove(id) {
				this.id = id;
				this.modal2 = true;
			},
			ok() {
				var that = this;
				var params = {
					token: this.token,
					staffId: this.staffId,
					netId: this.id
				}
				this.delNetPro(params)
					.then(res => {
						console.log(res)
						if (res.code == 100000) {
							this.$Message.success("删除成功");
							that.mockTableData1();
						} else {
							this.$Message.error(res.message)
							that.mockTableData1();
						}
					})
			},
			cancel() { },
		},
		mounted() {
			this.mockTableData1();
		}
	};
</script>