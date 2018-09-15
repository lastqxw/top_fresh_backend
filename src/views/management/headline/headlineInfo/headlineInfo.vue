<style lang="less">
	/* @import "../../../../../style/common.less"; */
</style>

<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="120">
					<!-- 商品名称 -->
					<FormItem label="头条标题" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="头条描述" :error="articleError">
						<Input v-model="toplineBeizhu" type="textarea" :rows="4" placeholder="请输入一句话描述"></Input>
					</FormItem>
					<!-- 商品主图 -->
					<FormItem label="头条主图">
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
					<FormItem label="头条详情">
						<div>
							<textarea id="articleEditor" v-model="value3"></textarea>
						</div>
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
			<Upload :action="url" :on-success="editorImg" style="display:none">
				<Button type="ghost" icon="ios-cloud-upload-outline" @click="up" ref="btn" id="btn">Upload files</Button>
			</Upload>
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
				modal1: false,
				url: "",
				isAdd: true,
				defaultList: [],
				productId: "",
				topId: "",
				productInfo: "",
				productDetail: null,
				token: Cookies.get("token"),
				staffId: Cookies.get("staffId"),
				imgName: "",
				visible: false,
				uploadList: [],
				imgUrl: [],
				value: "",
				value1: "",
				value2: "",
				value3: "",
				productImg: null,
				articleTitle: "",
				articleError: "",
				publishLoading: false,
				toplineBeizhu:"",
			};
		},
		methods: {
			up() {
			},
			cancel() {
				this.$router.push({
					name: "headline"
				})
			},
			ok() {
				var that = this;
				var params = {
					token: this.token,
					staffId: this.staffId,
					topId: this.topId
				}
				this.deleteTopline(params)
					.then(res => {
						console.log(res)
						if (res.code == 100000) {
							this.$Message.success("删除成功");
							this.$router.push({
								name: "headline"
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
				var params = {
					token: this.token,
					staffId: this.staffId,
					topId: this.topId,
					topTitle: this.articleTitle,
					topCover: this.defaultList[0].imgUrl,
					topContent: tinymce.activeEditor.getContent(),
					topBeizhu:this.toplineBeizhu,
				}
				this.updataTopline(params)
					.then(res => {
						console.log(res)
						if (res.code == 100000) {
							this.$Message.success("修改成功")
						}
					})
			},
			topDetails() {
				var topId = this.$route.params.topId;
				var that = this;
				if (topId != "add") {
					this.isAdd = false;
					var params = {
						token: that.token,
						staffId: that.staffId,
						topId: topId,
					};
					that.selectTopline(params).then(res => {
						if (res.code == 100000) {
							this.articleTitle = res.data[0].topTitle;
							this.toplineBeizhu=res.data[0].topBeizhu;
							this.defaultList = [{
								imgUrl: res.data[0].topCover,
								imgName: res.data[0].topTitle,
							}]
							this.$nextTick(() => {
								this.uploadList = this.$refs.upload.fileList;
							});
							sessionStorage.setItem("topContent", res.data[0].topContent)
							this.productImg = res.data[0].topContent;
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
				var params = {
					token: this.token,
					staffId: this.staffId,
					topTitle: this.articleTitle,
					topCover: this.defaultList[0].imgUrl,
					topContent: tinymce.activeEditor.getContent(),
					topBeizhu:this.toplineBeizhu,
				}
				this.addTopline(params)
					.then(res => {
						console.log(res)
						if (res.code == 100000) {
							this.$Message.success("添加成功，返回列表")
							that.$router.push({
								name: "headline",
							})

						}
					})
			},
			showImageSelector(cb) {
				$("#btn").click();
			}
		},
		mounted() {
			this.topDetails();
			var topId = this.$route.params.topId;
			this.topId = topId;
			this.url =
				"http://39.106.31.12:8080/fresh_show//User/uploadAll?token=" +
				this.token +
				"&staffId=" +
				this.staffId +
				"&type=1";
			this.uploadList = this.$refs.upload.fileList;
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
								if (topId != "add") {
									var productImg = sessionStorage.getItem("topContent");
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