<style lang="less">
	@import "../../../styles/common.less";
	</style>
	<style lang="less" scoped>
	</style>
	
	<template>
		<div>
			<Row>
				<Card>
					 <p slot="title">
						<Icon type="ios-film-outline"></Icon>
						卡号
					</p>
					<Row style="padding-bottom:10px;border-bottom:1px solid #e9eaec">
						<Col span="20">
							<span>卡号:</span>
							<Input v-model="cardNumber" disabled placeholder="请输入字母和数字(不区分大小写)" style="width:400px"></Input>
						</Col>
						<Col span="4">
							<Button type="primary" :loading="loading" @click="toLoading">
								<span v-if="!loading">检测</span>
								<span v-else>正在检测...</span>
							</Button>
						</Col>
					</Row>
					<Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
						<Col span="24">
							<span>对应折扣：0.01-0.99</span>
							<input v-model="cardNumber" class="inputDefault" type="number" min="0" max="1" placeholder="请输入" style="width: 200px">
							 
						</Col>
					</Row>
					<Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
						<Col span="8">
							<Button type="primary" :loading="loading1" @click="toLoading1">
								<span v-if="!loading1">保存</span>
								<span v-else>正在保存...</span>
							</Button>
						</Col>
					</Row>
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
		  count1: "",
		  url: "",
		  loading: false,
		  loading1: false,
		  loading2: false,
		  productList: [],
		  random: "",
		  cardNumber: "",
		  odProductId: "",
		  timesize: "",
		  state: "",
		  typeList: [],
		  typeList1: [
			{
			  value: "一年",
			  label: "一年"
			},
			{
			  value: "两年",
			  label: "两年"
			},
			{
			  value: "三年",
			  label: "三年"
			}
		  ],
		  typeList2: [
			{
			  value: "6",
			  label: "激活"
			},
			{
			  value: "1",
			  label: "未激活"
			}
		  ]
		};
	  },
	  methods: {
		toLoading() {
		  this.loading = true;
		},
		toLoading1() {
		  this.loading = true;
		  var token = Cookies.get("token");
		  var staffId = Cookies.get("staffId");
		  var params = {
			token,
			staffId,
			random: this.random,
			odProductId: this.odProductId,
			timesize: this.timesize,
			state: this.state
		  };
		  this.updateLading(params).then(res => {
			if (res.code == 100000) {
			  this.$Message.success("添加成功");
			} else {
			  this.$Message.error(res.message);
			}
		  });
		},
		toLoading2() {
		  this.loading = true;
		},
		handleSuccess(file) {
		  if (file.code == 100000) {
			this.random = file.data[0];
			this.cardNumber = file.data[1];
		  } else {
			this.$Message.error(file.message);
		  }
		}
	  },
	  mounted() {
		var token = Cookies.get("token");
		var staffId = Cookies.get("staffId");
		var url =
		  "http://39.106.31.12:8080/fresh_show/Excel/upload?token=" +
		  token +
		  "&staffId=" +
		  staffId;
		this.url = url;
		var params = {
		  token,
		  staffId,
		  pageSize: 1000000,
		  pageNum: 1
		};
		this.getProduct1(params).then(res => {
		  if (res.code == 100000) {
			this.productList = res.data;
		  }
		});
	  }
	};
	</script>