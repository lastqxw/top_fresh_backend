<style lang="less">
	@import "../../../styles/common.less";
</style>
<template>
	<div style="background:#eee;padding: 20px">
		<Card :bordered="false">
			<p slot="title">设置首页活动</p>
			<div style="margin-bottom:30px">
				<span>首页活动栏左方活动设置：</span>
				<Select style="width:200px" @on-change="type">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
				<Select v-model="model1" style="width:200px">
                    <Option v-for="item in activeList" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
				</Select>
				<span class="demo-upload-list1" style="margin-left: 30px">首页展示图:</span>
				<div class="demo-upload-list" v-for="item in uploadList">
					<template v-if="item.status === 'finished'">
						<img :src="item.imgUrl" style="width:100%;height:400px">
						<div class="demo-upload-list-cover">
							<Icon type="ios-eye-outline" @click.native="handleView(item.imgUrl)"></Icon>
							<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
						</div>
					</template>
					<template v-else>
						<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
					</template>
				</div>
				<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
				 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
				 multiple type="drag" :action="url" style="display: inline-block;width:58px;">
					<div style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="camera" size="20"></Icon>
					</div>
				</Upload>
				<Modal title="View Image" v-model="visible">
					<img :src=" imgName" style="width: 100%">
				</Modal>
			</div>
			<div style="margin-bottom:30px">
				<span>首页活动栏右上方活动设置：</span>
				<Select style="width:200px" @on-change="type1">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
				<Select v-model="model2" style="width:200px">
                    <Option v-for="item in activeList1" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
				</Select>
				<span class="demo-upload-list1" style="margin-left: 30px">首页展示图:</span>
				<div class="demo-upload-list2" v-for="item in uploadList2">
					<template v-if="item.status === 'finished'">
						<img :src="item.imgUrl" style="width:100%;height:auto">
						<div class="demo-upload-list-cover2">
							<Icon type="ios-eye-outline" @click.native="handleView2(item.imgUrl)"></Icon>
							<Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
						</div>
					</template>
					<template v-else>
						<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
					</template>
				</div>
				<Upload ref="upload2" :show-upload-list="false" :default-file-list="defaultList2" :on-success="handleSuccess2" :format="['jpg','jpeg','png']"
				 :max-size="2048" :on-format-error="handleFormatError2" :on-exceeded-size="handleMaxSize2" :before-upload="handleBeforeUpload2"
				 multiple type="drag" :action="url" style="display: inline-block;width:58px;">
					<div style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="camera" size="20"></Icon>
					</div>
				</Upload>
				<Modal title="View Image" v-model="visible2">
					<img :src=" imgName" style="width: 100%">
				</Modal>
			</div>
			<div style="margin-bottom:30px">
				<span>首页活动栏右下方活动设置：</span>
				<Select style="width:200px" @on-change="type2">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
				<Select v-model="model3" style="width:200px">
                    <Option v-for="item in activeList2" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
				</Select>
				<span class="demo-upload-list1" style="margin-left: 30px">首页展示图:</span>
				<div class="demo-upload-list3" v-for="item in uploadList3">
					<template v-if="item.status === 'finished'">
						<img :src="item.imgUrl" style="width:100%;height:auto">
						<div class="demo-upload-list-cover3">
							<Icon type="ios-eye-outline" @click.native="handleView3(item.imgUrl)"></Icon>
							<Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
						</div>
					</template>
					<template v-else>
						<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
					</template>
				</div>
				<Upload ref="upload3" :show-upload-list="false" :default-file-list="defaultList3" :on-success="handleSuccess3" :format="['jpg','jpeg','png']"
				 :max-size="2048" :on-format-error="handleFormatError3" :on-exceeded-size="handleMaxSize3" :before-upload="handleBeforeUpload3"
				 multiple type="drag" :action="url" style="display: inline-block;width:58px;">
					<div style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="camera" size="20"></Icon>
					</div>
				</Upload>
				<Modal title="View Image" v-model="visible3">
					<img :src=" imgName" style="width: 100%">
				</Modal>
			</div>
			<div style="margin-bottom:30px">
				<Button type="primary" @click="save">保存</Button>
			</div>
		</Card>
		<Card :bordered="false" style="margin-top:20px">
			<p slot="title">已设置的首页活动</p>
			<Table stripe border :columns="tableColumns1" :data="active"></Table>
		</Card>
	</div>
</template>
<script>
	import Cookies from "js-cookie";
	import card from "../service/appBanner.js";
	export default {
		mixins: [card],
		data() {
			return {
				imgName:"",
				url:"",
				model1: "",
				defaultList: [],
				defaultList2: [],
				defaultList3: [],
				uploadList: [],
				uploadList2: [],
				uploadList3: [],
				visible: false,
				visible2: false,
				visible3: false,
				activeList: [],
				activeList1: [],
				activeList2: [],
				model2: "",
				model3: "",
				active: [],
				typeList: [
					{
						value: "1",
						label: "优惠卷领取"
					},
					{
					  value: "2",
					  label: "多人拼团"
					},
					{
						value: "3",
						label: "商品集锦"
					},
					{
						value: "4",
						label: "静态活动展示"
					},
					{
						value: "5",
						label: "外链活动"
					}
				],
				tableColumns1: [
					{
						title: "活动编号",
						key: "acId",
						width: 150,
						align: "center"
					},
					{
						title: "活动名称",
						key: "acTitle",
						align: "center"
					},
					{
						title: "首页展示图",
						key: "indexIcon",
						align: "center",
						render: (h, params) => {
							return h("img", {
								attrs: {
									src: params.row.indexIcon,
									width: "100%"
								},
								on: {
									click: () => {
										// this.show(params.index)
									}
								}
							});
						}
					},
				]
			};
		},
		methods: {
			type(val) {
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token,
					staffId,
					pageSize: 10,
					pageNum: 1,
					acType: val
				};
				this.selectlist(params).then(res => {
					if (res.code == 100000) {
						this.activeList = res.data;
					}
				});
			},
			type1(val) {
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token,
					staffId,
					pageSize: 10,
					pageNum: 1,
					acType: val
				};
				this.selectlist(params).then(res => {
					if (res.code == 100000) {
						this.activeList1 = res.data;
					}
				});
			},
			type2(val) {
				var token = Cookies.get("token");
				var staffId = Cookies.get("staffId");
				var params = {
					token,
					staffId,
					pageSize: 10,
					pageNum: 1,
					acType: val
				};
				this.selectlist(params).then(res => {
					if (res.code == 100000) {
						this.activeList2 = res.data;
					}
				});
			},
			save() {
				var that = this;
				if (this.model1 == "" || this.model2 == "" || this.model3 == "") {
					this.$Message.error("在设置首页活动时，需同时设置三个位置的活动");
				} else {
					//   调用保存活动的接口
					var indexIcons=this.defaultList[0].imgUrl+","+this.defaultList2[0].imgUrl+","+this.defaultList3[0].imgUrl
					var acIds = this.model1 + "," + this.model2 + "," + this.model3;
					var token = Cookies.get("token");
					var staffId = Cookies.get("staffId");
					var params = {
						token,
						staffId,
						acIds,
						ishot: 1,
						indexIcons,
					};
					this.updateActivity(params).then(res => {
						if (res.code == 100000) {
							this.$Message.success({
								content: "添加成功",
								onClose: function () {
									var params = {
										token,
										staffId,
										pageSize: 10,
										pageNum: 1,
										ishot: 1
									};
									that.selectlist(params).then(res => {
										if (res.code == 100000) {
											that.active = res.data.reverse();
										}
									});
								}
							});
						}
					});
				}
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleSuccess(res, file) {
				this.defaultList = [];
				this.defaultList.push({
					imgUrl: file.response.data,
					imgName: file.name
				});
				this.$nextTick(() => {
					this.uploadList = this.$refs.upload.fileList;
				});
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: "The file format is incorrect",
					desc:
						"File format of " +
						file.name +
						" is incorrect, please select jpg or png."
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: "Exceeding file size limit",
					desc: "File  " + file.name + " is too large, no more than 2M."
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 1;
				if (!check) {
					this.$Notice.warning({
						title: "最多只能上传一张图片"
					});
				}
				return check;
			},
			handleView2(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleSuccess2(res, file) {
				this.defaultList2 = [];
				this.defaultList2.push({
					imgUrl: file.response.data,
					imgName: file.name
				});
				this.$nextTick(() => {
					this.uploadList2 = this.$refs.upload2.fileList;
				});
			},
			handleFormatError2(file) {
				this.$Notice.warning({
					title: "The file format is incorrect",
					desc:
						"File format of " +
						file.name +
						" is incorrect, please select jpg or png."
				});
			},
			handleMaxSize2(file) {
				this.$Notice.warning({
					title: "Exceeding file size limit",
					desc: "File  " + file.name + " is too large, no more than 2M."
				});
			},
			handleBeforeUpload2() {
				const check = this.uploadList2.length < 1;
				if (!check) {
					this.$Notice.warning({
						title: "最多只能上传一张图片"
					});
				}
				return check;
			},
			handleView3(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleSuccess3(res, file) {
				this.defaultList3 = [];
				this.defaultList3.push({
					imgUrl: file.response.data,
					imgName: file.name
				});
				this.$nextTick(() => {
					this.uploadList3 = this.$refs.upload3.fileList;
				});
			},
			handleFormatError3(file) {
				this.$Notice.warning({
					title: "The file format is incorrect",
					desc:
						"File format of " +
						file.name +
						" is incorrect, please select jpg or png."
				});
			},
			handleMaxSize3(file) {
				this.$Notice.warning({
					title: "Exceeding file size limit",
					desc: "File  " + file.name + " is too large, no more than 2M."
				});
			},
			handleBeforeUpload3() {
				const check = this.uploadList3.length < 1;
				if (!check) {
					this.$Notice.warning({
						title: "最多只能上传一张图片"
					});
				}
				return check;
			},
			handleRemove(file) {
				this.defaultList = [];
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleRemove2(file) {
				this.defaultList2 = [];
				const fileList = this.$refs.upload2.fileList;
				this.$refs.upload2.fileList.splice(fileList.indexOf(file), 1);
			},
			handleRemove3(file) {
				this.defaultList3 = [];
				const fileList = this.$refs.upload3.fileList;
				this.$refs.upload3.fileList.splice(fileList.indexOf(file), 1);
			},
		},
		beforeMount() {
			var token = Cookies.get("token");
			var staffId = Cookies.get("staffId");
			this.url =
				"http://39.106.31.12:8080/fresh_show//User/uploadAll?token=" +
				token +
				"&staffId=" +
				staffId +
				"&type=1";
			var token = Cookies.get("token");
			var staffId = Cookies.get("staffId");
			var params = {
				token,
				staffId,
				pageSize: 10,
				pageNum: 1,
				ishot: 1
			};
			this.selectlist(params).then(res => {
				if (res.code == 100000) {
					this.active = res.data.reverse();
				}
			});
		}
	};
</script>
<style scoped>
	.demo-upload-list1 {
		display: inline-block;
		width: 80px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		overflow: hidden;
		margin-right: 10px;
	}

	.demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
		margin-right: 4px;
	}

	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}

	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}

	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	.demo-upload-list2 {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
		margin-right: 4px;
	}

	.demo-upload-list2 img {
		width: 100%;
		height: 100%;
	}

	.demo-upload-list-cover2 {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.demo-upload-list2:hover .demo-upload-list-cover2 {
		display: block;
	}

	.demo-upload-list-cover2 i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	.demo-upload-list3 {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
		margin-right: 4px;
	}

	.demo-upload-list3 img {
		width: 100%;
		height: 100%;
	}

	.demo-upload-list-cover3 {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.demo-upload-list3:hover .demo-upload-list-cover3 {
		display: block;
	}

	.demo-upload-list-cover3 i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
</style>