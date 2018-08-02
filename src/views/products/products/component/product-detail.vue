<style lang="less">
	@import "../../../../styles/common.less";
	@import "./product-detail.less";
</style>

<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<Form :label-width="80">
					<!-- 商品名称 -->
					<FormItem label="商品名称" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="商品描述">
						<Input v-model="productInfo" icon="android-list" />
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
					<FormItem label="商品轮播图">
						<div class="demo-upload-list2" v-for="item in uploadList2">
							<template v-if="item.status === 'finished'">
								<img :src="item.imgUrl">
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
						<Modal title="View Image" v-model="visible">
							<img :src="imgName" v-if="visible" style="width: 100%">
						</Modal>
					</FormItem>
					<FormItem label="商品详情">
						<div>
							<textarea id="articleEditor" v-model="value3"></textarea>
						</div>
					</FormItem>
				</Form>
			</Card>
			</Col>
			<Col span="6" class="padding-left-10">
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					商品信息
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;原&nbsp;&nbsp;&nbsp; 价：
					<input v-model="value" class="inputDefault" type="number" min="0" placeholder="请输入商品原价" style="width: 70%">
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;售&nbsp;&nbsp;&nbsp; 价：
					<input v-model="value1" class="inputDefault" type="number" min="0" placeholder="请输入商品售价" style="width: 70%">
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;规&nbsp;&nbsp;&nbsp; 格：
					<Input v-model="value2" placeholder="请输入商品规格" style="width: 70%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp; 型：
					<Select v-model="model1" style="width:70%">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;是否上架：
					<Select v-model="model2" style="width:70%">
							<Option v-for="item in isUse" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;提货日期/现货开售时间：
					<DatePicker type="date" split-panels placeholder="选择开始时间" style="width: 66%" v-model="value6"></DatePicker>

				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;提货截止日期/现货截止时间：
					<DatePicker type="date" split-panels placeholder="选择结束时间" style="width: 66%" v-model="value7"></DatePicker>

				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;商品单位：
					<Input v-model="value8" placeholder="请输入商品单位" style="width: 70%"></Input>
				</p>
				<!-- <p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;积&nbsp;&nbsp;&nbsp; 分：
					<Input v-model="value9" placeholder="请输入商品积分" style="width: 70%"></Input>
				</p> -->
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;商品产地：
					<Input v-model="value4" placeholder="请输入商品产地" style="width: 66%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;配送方式：
					<Input v-model="value5" placeholder="请输入商品配送方式" style="width: 66%"></Input>
				</p>
				<Row class="margin-top-20 publish-button-con" v-if="isAdd">
					<span class="publish-button">
						<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="warning" @click="cancel">取消</Button>
					</span>
					<span class="publish-button">
						<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="success" @click="add">添加</Button>
					</span>
				</Row>
				<Row class="margin-top-20 publish-button-con" v-else>
					<span class="publish-button">
						<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="warning" @click="cancel">取消</Button>
					</span>
					<span class="publish-button">
						<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="error" @click="remove">删除</Button>
					</span>
					<span class="publish-button">
						<Button :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="success" @click="updata">更新</Button>
					</span>
				</Row>
			</Card>
			</Col>
			<Upload :action="url" :on-success="editorImg" style="display:none">
				<Button type="ghost" icon="ios-cloud-upload-outline" @click="up" ref="btn" id="btn">Upload files</Button>
			</Upload>
		</Row>
		<Modal v-model="modal1" title="系统提示" @on-ok="ok" @on-cancel="cancel">
			<p>是否删除该商品</p>
		</Modal>
	</div>

</template>

<script>
	import tinymce from "tinymce";
	import Cookies from "js-cookie";
	import getProduct from "../../service/product.js";
	export default {
		name: "artical-publish",
		mixins: [getProduct],
		data() {
			return {
				modal1: false,
				url: "",
				isAdd: true,
				defaultList: [],
				defaultList2: [],
				productId: "",
				productInfo: "",
				productDetail: null,
				token: Cookies.get("token"),
				staffId: Cookies.get("staffId"),
				imgName: "",
				visible: false,
				uploadList: [],
				uploadList2: [],
				imgUrl: [],
				value: "",
				value1: "",
				value2: "",
				value3: "",
				value4: "",
				value5: "",
				value6: "",
				value7: "",
				value8: "",
				value9: "",
				model1: "1",
				model2: "1",
				productImg: null,
				cityList: [
					{
						value: "1",
						label: "礼卡"
					},
					{
						value: "2",
						label: "现货"
					}
				],
				isUse: [
					{
						value: "1",
						label: "上架"
					},
					{
						value: "2",
						label: "下架"
					}
				],
				articleTitle: "",
				articleError: "",
				publishLoading: false
			};
		},
		methods: {
			up() {
			},
			cancel() {
				this.$router.go(-1);
			},
			ok() {
				var productId = this.$route.params.product_id;
				var params = {
					token: this.token,
					staffId: this.staffId,
					productId
				};
				this.removeProduct(params).then(res => {
					if (res.code == 100000) {
						this.$router.go(-1);
					} else {
					}
				});
			},
			cancel() {
				this.$Message.info("取消成功");
			},
			remove() {
				this.modal1 = true;
			},
			updata() {
				var that = this;
				var productId = this.$route.params.product_id;
				var begin = new Date(this.value6);
				var begin_value =
					begin.getFullYear() +
					"-" +
					(begin.getMonth() + 1) +
					"-" +
					begin.getDate();
				var end = new Date(this.value7);
				var end_value =
					end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate();
				var proImg = [];
				for (var i = 0; i < this.uploadList2.length; i++) {
					proImg.push({
						imgUrl: this.uploadList2[i].imgUrl,
						imgName: this.uploadList2[i].imgName,
						order: i
					});
				}
				if (this.value != "" && this.value1 != "") {
					var params = {
						productId,
						// token
						token: this.token,
						// userid
						staffId: this.staffId,
						// 商品名
						productName: this.articleTitle,
						// 商品类型
						productPtype: this.model1,
						//商品描述
						productInfo: this.productInfo,
						// 原价
						productOprice: this.value,
						// 现价
						productPrice: this.value1,
						// 商品图标
						productIcon: this.uploadList[0].imgUrl ? this.uploadList[0].imgUrl : "",
						// 商品产地
						productAddress: this.value4,
						// 图文信息介绍
						productImg: tinymce.activeEditor.getContent(),
						// 商品规格
						productDetail: this.value2,
						// 库存
						productUnit: this.value8,
						// // 积分
						// productScore: this.value9,
						// 商品配送方式
						productSendType: this.value5,
						// 开始时间
						productBeginDate: begin_value,
						// 结束时间
						productEndDate: end_value,
						// 是否上架
						productIsUse: this.model2
						// 商品轮播图list
						// proImgs:this.uploadList,
					};
					this.updateProduct(params).then(res => {
						if (res.code == 100000) {
							var imgList = sessionStorage.obj;
							var obj = JSON.parse(imgList);
							for (var i = 0; i < obj.length; i++) {
								var params = {
									token: that.token,
									staffId: that.staffId,
									imgId: obj[i].imgId
								};
								that.deteleProImg(params).then(res => {
									if (res.code == 100000) {
									}
								});
							}
							// 调用添加商品轮播图的接口
							for (var i = 0; i < proImg.length; i++) {
								var params = {
									token: that.token,
									staffId: that.staffId,
									imgProductId: productId,
									imgName: proImg[i].imgName,
									imgUrl: proImg[i].imgUrl,
									order: proImg[i].order
								};
								if (i != proImg.length - 1) {
									that.saveProImg(params).then(res => {
									});
								} else {
									that.saveProImg(params).then(res => {
										if (res.code == 100000) {
											this.$Message.success("修改成功");
										}
									});
								}
							}
						}
					});
				} else {
					this.$Message.error("请输入商品原价,如无优惠，请输入相同的价格！！！")
				}

			},
			productDetails() {
				var productId = this.$route.params.product_id;
				var that = this;
				// tihs.productId=this.$route.params.product_id !="add" ? this.$route.params.product_id : ""
				if (productId != "add") {
					this.isAdd = false;
					var params = {
						token: that.token,
						staffId: that.staffId,
						productId: productId
					};
					that.selectProduct(params).then(res => {
						if (res.code == 100000) {
							that.articleTitle = res.data.productName;
							that.productInfo = res.data.productInfo;
							that.value = res.data.productOprice;
							that.value1 = res.data.productPrice;
							that.value2 = res.data.productDetail;
							that.model1 = res.data.productPtype;
							that.productId = productId;
							that.defaultList = [
								{
									imgUrl: res.data.productIcon,
									imgName: res.data.productName
								}
							];
							that.defaultList2 = res.data.proImgs ? res.data.proImgs : [];
							var img = res.data.proImgs ? res.data.proImgs : [];
							sessionStorage.obj = JSON.stringify(img)
							// that.imgUrl = res.data.proImgs ? res.data.proImgs : [];
							that.$nextTick(() => {
								that.uploadList = that.$refs.upload.fileList;
								that.uploadList2 = that.$refs.upload2.fileList;
							});
							that.productImg = res.data.productImg;
							sessionStorage.setItem("productImg", res.data.productImg);
							tinymce.activeEditor.setContent(res.data.productImg);
							that.value4 = res.data.productAddress;
							that.value5 = res.data.productSendType
								? res.data.productSendType
								: "";
							that.value6 = res.data.productBeginDate;
							that.value7 = res.data.productEndDate;
							that.value8 = res.data.productUnit;
							// that.value9 = res.data.productScore;
							that.model2 = res.data.productIsUse;
						} else {
							that.$Message.error(res.message);
						}
					});
				}
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleView2(name) {
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
			editorImg(file, res) {
				tinymce.execCommand(
					"mceInsertContent",
					false,
					'<img alt="Smiley face"  src="' + res.response.data + '"/>'
				);
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
			handleSuccess2(res, file) {
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
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: "最多只能上传五张图片"
					});
				}
				return check;
			},
			handleArticletitleBlur() {
				if (this.articleTitle.length !== 0) {
					// this.articleError = '';
					localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
					if (!this.articlePathHasEdited) {
						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();
						this.fixedLink =
							window.location.host + "/" + year + "/" + month + "/" + day + "/";
						this.articlePath = this.articleTitle;
						this.articlePathHasEdited = true;
						this.showLink = true;
					}
				} else {
					// this.articleError = '文章标题不可为空哦';
					this.$Message.error("商品名称不可为空哦");
				}
			},
			handleRemove(file) {
				this.defaultList = [];
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleRemove2(file) {
				const fileList = this.$refs.upload2.fileList;
				this.defaultList2.splice(fileList.indexOf(file), 1);
				// this.$refs.upload2.fileList.splice(fileList.indexOf(file), 1);
				this.uploadList2 = this.defaultList2;
			},
			handlePublish() {
				if (this.canPublish()) {
					this.publishLoading = true;
					setTimeout(() => {
						this.publishLoading = false;
						this.$Notice.success({
							title: "保存成功",
							desc: "文章《" + this.articleTitle + "》保存成功"
						});
					}, 1000);
				}
			},
			// 添加
			add() {
				var that = this;
				var begin = new Date(this.value6);
				var begin_value =
					begin.getFullYear() +
					"-" +
					(begin.getMonth() + 1) +
					"-" +
					begin.getDate();
				var end = new Date(this.value7);
				var end_value =
					end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate();
				var proImg = [];
				for (var i = 0; i < this.uploadList2.length; i++) {
					proImg.push({
						imgUrl: this.uploadList2[i].imgUrl,
						imgName: this.uploadList2[i].imgName,
						order: i
					});
				}
				if (this.value != "" && this.value1 != "") {
					var params = {
						// token
						token: this.token,
						// userid
						staffId: this.staffId,
						// 商品名
						productName: this.articleTitle,
						// 商品类型
						productPtype: this.model1,
						//商品描述
						productInfo: this.productInfo,
						// 原价
						productOprice: this.value,
						// 现价
						productPrice: this.value1,
						// 商品图标
						productIcon: this.uploadList[0].imgUrl ? this.uploadList[0].imgUrl : "",
						// 商品产地
						productAddress: this.value4,
						// 图文信息介绍
						productImg: tinymce.activeEditor.getContent(),
						// 商品规格
						productDetail: this.value2,
						// 库存
						productUnit: this.value8,
						// 积分
						// productScore: this.value9,
						// 商品配送方式
						productSendType: this.value5,
						// 开始时间
						productBeginDate: begin_value,
						// 结束时间
						productEndDate: end_value,
						// 是否上架
						productIsUse: this.model2
						// 商品轮播图list
						// proImg: proImg
					};
					this.addProduct(params).then(res => {
						if (res.code == 100000) {
							// 调用添加商品轮播图的接口
							for (var i = 0; i < proImg.length; i++) {
								var params = {
									token: that.token,
									staffId: that.staffId,
									imgProductId: res.data,
									imgName: proImg[i].imgName,
									imgUrl: proImg[i].imgUrl,
									order: proImg[i].order
								};
								if (i != proImg.length - 1) {
									that.saveProImg(params).then(res => {
									});
								} else {
									that.saveProImg(params).then(res => {
										if (res.code == 100000) {
											this.$Message.success("添加成功，返回列表");
											that.$router.go(-1);
										}
									});
								}
							}
						}
					});
				}else {
					this.$Message.error("请输入商品原价,如无优惠，请输入相同的价格！！！")
				}

			},
			showImageSelector(cb) {
				$("#btn").click();
			}
		},
		mounted() {
			this.productDetails();
			var productId = this.$route.params.product_id;
			this.url =
				"http://39.106.31.12:8080/fresh_show//User/uploadAll?token=" +
				this.token +
				"&staffId=" +
				this.staffId +
				"&type=1";
			this.uploadList = this.$refs.upload.fileList;
			this.uploadList2 = this.$refs.upload2.fileList;
			var that = this;
			tinymce.init({
				selector: "#articleEditor",
				branding: false,
				elementpath: false,
				height: 600,
				language: "zh_CN.GB2312",
				menubar: "edit insert view format table tools",
				theme: "modern",
				plugins: [
					"advlist autolink lists link image charmap print preview imageSelector hr anchor pagebreak imagetools",
					"searchreplace visualblocks visualchars code fullscreen fullpage",
					"insertdatetime media nonbreaking save table contextmenu directionality",
					"emoticons paste   colorpicker textpattern imagetools codesample"
				],
				toolbar1:
					" newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample imageSelector",
				autosave_interval: "20s",
				image_advtab: true,
				imageSelectorCallback: this.showImageSelector,
				table_default_styles: {
					width: "100%",
					borderCollapse: "collapse"
				},
				setup: function (editor) {
					editor.on("init", function (e) {
						if (that.productImg) {
							editor.setContent(that.productImg);
						} else {
							setTimeout(() => {
								if (productId != "add") {
									var productImg = sessionStorage.getItem("productImg");
									editor.setContent(productImg);
								}
							}, 500);
						}
					});
				}
			});
		},
		destroyed() {
			tinymce.get("articleEditor").destroy();
		}
		// mounted(){

		// }
	};
</script>