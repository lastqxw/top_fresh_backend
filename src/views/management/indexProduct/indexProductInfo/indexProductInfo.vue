<style lang="less">
	/* @import "../../../../../style/common.less"; */
</style>

<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<p slot="title">
					<Icon type="ios-film-outline"></Icon>
					官网商品管理
				</p>
				<Form :label-width="120">
					<!-- 商品名称 -->
					<FormItem label="商品名称" :error="articleError">
						<Input v-model="netPro.netTitle" icon="android-list" style="width: 300px" />
					</FormItem>
					<!-- 商品主图 -->
					<FormItem label="商品主图">
						<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status == 'finished'">
								<img :src="item.imgUrl">
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
							<img :src="imgName" v-if="visible" style="width: 100%">
						</Modal>
					</FormItem>
					<FormItem label="雄蟹数量(两)" :error="articleError">
						<Input v-model="netPro.netMale" icon="android-list" style="width: 300px" />
					</FormItem>
					<FormItem label="雌蟹数量(两)" :error="articleError">
						<Input v-model="netPro.netFemale" icon="android-list" style="width: 300px" />
					</FormItem>
					<FormItem label="商品类型">
						<Select v-model="netPro.netType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="商品包装">
						<Select v-model="netPro.netType2" style="width:200px">
							<Option v-for="item in bzcityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="商品价格" :error="articleError">
						<Input v-model="netPro.netPrice" icon="android-list" style="width: 300px" />
					</FormItem>
					<!-- <FormItem label="赠品" :error="articleError">
						<Input v-model="netPro.netGift" icon="android-list" style="width: 300px" />
					</FormItem>
					<FormItem label="包装类型" :error="articleError">
						<Input v-model="netPro.netPacking" icon="android-list" style="width: 300px" />
					</FormItem> -->
					<FormItem label="商品链接" :error="articleError">
						<Input v-model="netPro.netLink" icon="android-list" style="width: 300px" />
					</FormItem>
					<FormItem v-if="isAdd">
						<span class="publish-button">
							<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="warning" @click="cancel">取消</Button>
						</span>
						<span class="publish-button">
							<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="success" @click="add">添加</Button>
						</span>
					</FormItem>
					<FormItem v-else>
						<span class="publish-button">
							<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="warning" @click="cancel">取消</Button>
						</span>
						<span class="publish-button">
							<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="error" @click="remove">删除</Button>
						</span>
						<span class="publish-button">
							<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="success" @click="updata">更新</Button>
						</span>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
		<Modal v-model="modal1" title="系统提示" @on-ok="ok" @on-cancel="cancel1">
			<p>是否删除该商品</p>
		</Modal>
	</div>

</template>

<script>
	import tinymce from "tinymce";
	import Cookies from "js-cookie";
	import getProduct from "../../service/management.js";
	export default {
		name: "artical-publish",
		mixins: [getProduct],
		data() {
			return {
				netPro: {
					netTitle: "",
					netMale: "",
					netFemale: "",
					netType: "",
					netType2: "",
					netPrice: "",
					// netGift: "",
					// netPacking: "",
					netLink: "",
				},
				modal1: false,
				netId: "",
				url: "",
				isAdd: true,
				defaultList: [],
				token: Cookies.get("token"),
				staffId: Cookies.get("staffId"),
				imgName: "",
				visible: false,
				uploadList: [],
				articleError: "",
				publishLoading: false,
				cityList: [
					{
						value: '1',
						label: '卡券'
					},
					{
						value: '2',
						label: '现货'
					},
				],
				bzcityList: [
					{
						value: '3',
						label: '3对装'
					},
					{
						value: '4',
						label: '4对装'
					},
					{
						value: '5',
						label: '5对装'
					},
				],
			};
		},
		methods: {
			cancel() {
				this.$router.push({
					name: "indexProduct"
				})
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
							that.$router.push({
								name: "indexProduct"
							})
						} else {
							this.$Message.error(res.message)
						}
					})
			},
			cancel1() {
				this.$Message.info("取消成功");
			},
			remove() {
				this.modal1 = true;
			},
			updata() {
				var that = this;
				var params = this.netPro;
				params.token = this.token;
				params.staffId = this.staffId;
				params.netId = this.netId;
				params.netImg = this.defaultList[0].imgUrl;
				this.addNetPro(params).then(res => {
					console.log(res)
					if (res.code == 100000) {
						this.$Message.success("修改成功")
					} else {
						this.$Message.error(res.message)
					}
				})
			},
			topDetails() {
				var netId = this.$route.params.netId;
				var that = this;
				if (netId != "add") {
					this.isAdd = false;
					var params = {
						token: this.token,
						staffId: this.staffId,
						netId: netId
					}
					this.getlist(params).then(res => {
						console.log(res)
						if (res.code == 100000) {
							this.netPro = res.data[0];
							if (res.data[0].netImg) {
								this.defaultList.push({
									imgUrl: res.data[0].netImg,
									imgName: res.data[0].netTitle
								})
								this.$nextTick(() => {
									this.uploadList = this.$refs.upload.fileList;
								});
							} else {
								this.$Message.error(res.message)
							}
						}
					})
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
			handleRemove(file) {
				this.defaultList = [];
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			// 添加
			add() {
				var that = this;
				var params = this.netPro;
				params.token = this.token;
				params.staffId = this.staffId;
				params.netImg = this.defaultList[0].imgUrl;
				this.addNetPro(params).then(res => {
					console.log(res)
					if (res.code == 100000) {
						this.$Message.success("添加成功")
						that.$router.push({
							name: "indexProduct"
						})
					} else {
						this.$Message.error(res.message)
					}
				})

			},
			showImageSelector(cb) {
				$("#btn").click();
			}
		},
		mounted() {
			this.topDetails();
			var netId = this.$route.params.netId;
			this.netId = netId;
			console.log(this.netId)
			this.url =
				"http://39.107.126.201:8080/fresh_show//User/uploadAll?token=" +
				this.token +
				"&staffId=" +
				this.staffId +
				"&type=1";
			this.uploadList = this.$refs.upload.fileList;
			var that = this;

		},
	};
</script>
<style>
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
</style>