<style lang="less">
	@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>商品名称：</span>
				<Input v-model="value" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
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
			<p>是否删除该条头条资讯</p>
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
				count: 10,
				id: "",
				token: Cookies.get("token"),
				staffId: Cookies.get("staffId"),
				pageNum: 1,
				pageSize: 10,
				productId: "",
				tableData1: [],
				tableColumns1: [
					{
						title: "编号",
						key: "topId",
						width: 80,
						align: "center"
					},
					{
						title: "封面",
						key: "topCover",
						align: "center",
						render: (h, params) => {
							return h("img", {
								attrs: {
									src: params.row.topCover,
									width: " 100%"
								},
								on: {
									click: () => {
										// this.show(params.index)
									}
								}
							});
						}
					},
					{
						title: "头条标题",
						key: "topTitle",
						align: "center",
					},
					{
						title: "发布时间",
						key: "topCreattime",
						align: "center",
					},
					{
						title: "阅读数",
						key: "topRead",
						align: "center",
					},
					{
						title: "操作",
						key: "action",
						width: 300,
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
												let argu = { topId: params.row.topId };
												this.$router.push({
													name: "headline-info",
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
												this.remove(params.row.topId);
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
					beginRow: this.pageNum,
					pageSize: this.pageSize,
					productName: this.value
				};
				this.selectTopline(params).then(res => {
					console.log(res)
					if (res.code == 100000) {
						this.tableData1 = res.data;
						this.count = res.data[0].topCount ? parseInt(res.data[0].topCount) :10 ;
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
				let argu = { topId: id };
				this.$router.push({
					name: "headline-info",
					params: argu
				});
			},
			remove(id) {
				this.id = id;
				this.modal2=true;
			},
			ok() {
				var that=this;
				var params={
					token:this.token,
					staffId:this.staffId,
					topId:this.id
				}
				this.deleteTopline(params)
				.then(res => {
					console.log(res)
					if(res.code==100000){
						this.$Message.success("删除成功");
						that.mockTableData1();
					}else{
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