<style lang="less">
	@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>用户留言手机号：</span>
				<Input v-model="value" placeholder="用户留言手机号" clearable style="width: 200px"></Input>
				<Button class="margin-left-20" type="primary" icon="ios-search" @click="mockTableData1()">搜索</Button>
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
			<p>是否删除该条留言</p>
		</Modal>

		<Modal v-model="modal3" title="咨询详情">
			<p style="margin-bottom: 20px">
				<span>咨询用户：</span>
				<Input v-model="phone" readonly style="width: 200px"></Input>
			</p>
			<p style="margin-bottom: 20px">
				<span>咨询时间：</span>
				<Input v-model="time" readonly style="width: 200px"></Input>
			</p>
			<p style="margin-bottom: 20px">
				<span style="float: left;">咨询内容：</span>
				<textarea v-model="content" readonly style="width: 200px"></textarea>
			</p>
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
				phone:"",
				time:"",
				content:"",
				modal2: false,
				modal3: false,
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
						key: "messageId",
						width: 80,
						align: "center"
					},
					{
						title: "咨询用户",
						key: "messageUserphone",
						width: 200,
						align: "center"
					},
					{
						title: "咨询内容",
						key: "messageContent",
						align: "center",
					},
					{
						title: "咨询时间",
						key: "messageCreattime",
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
												this.searchInfo(params.row.messageId)
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
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												this.remove(params.row.messageId);
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
					messageUserphone: this.value
				};
				this.selectMessage(params).then(res => {
					console.log(res)
					if (res.code == 100000) {
						this.tableData1 = res.data;
						this.count = res.data[0].messageCount ? parseInt(res.data[0].messageCount) : 10;
					} else {
						this.$Message.error(res.message)
						this.tableData1 = [];
					}
				});
			},
			searchInfo(id){
				this.modal3=true;
				var token = this.token;
				var staffId = this.staffId;
				var params = {
					token: token,
					staffId: staffId,
					messageId:id
				};
				this.selectMessage(params).then(res => {
					console.log(res)
					if (res.code == 100000) {
						this.phone=res.data[0].messageUserphone;
						this.time=res.data[0].messageCreattime;
						this.content=res.data[0].messageContent;
					} else {
						this.$Message.error(res.message)
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
				this.modal2 = true;
			},
			ok() {
				var that = this;
				var params = {
					token: this.token,
					staffId: this.staffId,
					messageId: this.id
				}
				this.deleteMessage(params)
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