<style lang="less">
	@import '../../../../styles/common.less';
	@import 'activityTeamwork-detail.less';
</style>

<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<Form :label-width="100">
					<!-- 商品名称 -->
					<FormItem label="序号" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<!-- 商品主图 -->
					<FormItem label="活动发起人时间" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="已参与人数" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="状态" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<FormItem label="操作" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import tinymce from 'tinymce';
	export default {
		name: 'artical-publish',
		data() {
			return {
				defaultList: [
					{
						'name': 'a42bdcc1178e62b4694c830f028db5c0',
						'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
					},
					{
						'name': 'bc7521e033abdd1e92222d733590f104',
						'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
					}
				],
				imgName: '',
				visible: false,
				uploadList: [],
				value: '',
				model1: '礼卡',
				cityList: [
					{
						value: '礼卡',
						label: '礼卡'
					},
					{
						value: '现货',
						label: '现货'
					},
				],
				articleTitle: '',
				articleError: '',
				publishLoading: false,

			};
		},
		methods: {
			handleSuccess(res, file) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
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
						this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
						this.articlePath = this.articleTitle;
						this.articlePathHasEdited = true;
						this.showLink = true;
					}
				} else {
					// this.articleError = '文章标题不可为空哦';
					this.$Message.error('文章标题不可为空哦');
				}
			},
			handlePublish() {
				if (this.canPublish()) {
					this.publishLoading = true;
					setTimeout(() => {
						this.publishLoading = false;
						this.$Notice.success({
							title: '保存成功',
							desc: '文章《' + this.articleTitle + '》保存成功'
						});
					}, 1000);
				}
			},
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;

			tinymce.init({
				selector: '#articleEditor',
				branding: false,
				elementpath: false,
				height: 600,
				language: 'zh_CN.GB2312',
				menubar: 'edit insert view format table tools',
				theme: 'modern',
				plugins: [
					'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
					'searchreplace visualblocks visualchars code fullscreen fullpage',
					'insertdatetime media nonbreaking save table contextmenu directionality',
					'emoticons paste textcolor colorpicker textpattern imagetools codesample'
				],
				toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
				autosave_interval: '20s',
				image_advtab: true,
				table_default_styles: {
					width: '100%',
					borderCollapse: 'collapse'
				}
			});
		},
		destroyed() {
			tinymce.get('articleEditor').destroy();
		}
	};
</script>
