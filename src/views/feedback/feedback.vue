<style lang="less">
	@import "../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<Row style="width:80%;display:inline-table;margin-bottom: 20px">
					<span class="margin-left-10">反馈时间段:</span>
					<DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" @on-change="chooseData"></DatePicker>
					<Button class="margin-left-20" type="primary" icon="ios-search" @click="mockTableData1">查找</Button>
				</Row>
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
	import getProduct from "./service/feedback.js";
	export default {
		mixins: [getProduct],
		data() {
			return {
				modal2: false,
				value: "",
				model1: "",
				count: 10,
				pageNum: 1,
				pageSize: 10,
				productId: "",
				tableData1: [],
				btime:"",
				etime:"",
				tableColumns1: [
					{
						title: "编号",
						key: "feedbackId",
						width: 80,
						align: "center"
					},
					{
						title: "手机号",
						key: "feedbackPhone",
						align: "center"
					},
					{
						title: "反馈时间",
						key: "feedbackTime",
						align: "center",
					},
					{
						title: "反馈内容",
						key: "feedbackContent",
						align: "center",
					},
					// {
					//   title: "备注",
					//   key: "feedbackBeizhu",
					//   align: "center",
					// }
				]
			};
		},
		methods: {
			chooseData(val){
				this.btime=val[0],
				this.etime=val[1]
			},
			mockTableData1() {
				let data = [];
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token: token,
					staffId: staffId,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				};
				if(this.btime != ""){
					params.btime = this.btime+ " 00:00:00";
				}
				if(this.etime != ""){
					params.etime = this.etime+ " 00:00:00";
				}
				this.selectevaluationlist(params).then(res => {
					if (res.code == 100000) {
						data = res.data;
						this.tableData1 = data;
						this.count = res.count;
					} else {
						this.$Message.error(res.message);
					}
				});
			},
			changePageSize(pageSize) {
				this.pageSize = pageSize;
				this.mockTableData1();
			},
			changePage(pageNum) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.pageNum = pageNum;
				this.mockTableData1();
			}
		},
		mounted() {
			this.mockTableData1();
		}
	};
</script>