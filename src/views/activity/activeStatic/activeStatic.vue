<style lang="less">
@import "../../../styles/common.less";
</style>

<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<div style="border-bottom: 1px solid #ccc; margin-top: 20px">
                            <h1>静态页活动设置</h1>
                        </div>
                        <div style="margin-bottom: 20px;margin-top:10px">
                            <span>活动名称：</span>
                            <Input v-model="articleTitle"  icon="android-list"  style="width:300px"/>
                        </div>
                        <span class="demo-upload-list1" style="">活动主图:</span>
                        <div class="demo-upload-list" v-for="item in uploadList" >
                            
                            <template v-if="item.status === 'finished'">
                                <img :src="item.imgUrl" style="width:100%;height:auto">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.imgUrl)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag"  :action="url" style="display: inline-block;width:58px;">
                          <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                          </div>
						            </Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src=" imgName" style="width: 100%">
                        </Modal>
			</Card>
      <Card style="margin-top: 10px;">
            <p slot="title">
            <Icon type="ios-film-outline"></Icon>
              静态页详情
              <span class="publish-button" style="float:right;margin-right:25px">
						    <Button  icon="ios-checkmark" style="width:135px;" type="success"  @click="addContent">更新静态页内容</Button>
					    </span>
            </p>
            <textarea id="articleEditor" v-model="text"></textarea>            
           
      </Card>
			</Col>  
			<Col span="6" class="padding-left-10">
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					活动时间
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;活动开始时间：
					<DatePicker type="date" split-panels placeholder="Select date" style="width: 66%" v-model="value6"  @on-change="start"></DatePicker>

				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;活动截止时间：
					<DatePicker type="date" split-panels placeholder="Select date" style="width: 66%" v-model="value7" @on-change="end"></DatePicker>

				</p>
				<Row class="margin-top-20 publish-button-con" v-if="isAdd">
					<span class="publish-button">
						<Button  icon="ios-checkmark" style="width:90px;" type="success" @click="add">添加</Button>
					</span>
				</Row>
				<Row class="margin-top-20 publish-button-con" v-else>
					<span class="publish-button">
						<Button  icon="ios-checkmark" style="width:90px;" type="success"  @click="updata">更新</Button>
					</span>
				</Row>
			</Card>
			</Col>
		</Row>
     <Upload :action="url" :on-success="editorImg" style="display:none">
        <Button type="ghost" icon="ios-cloud-upload-outline" ref="btn" id="btn">Upload files</Button>
      </Upload>
	</div>
  
</template>

<script>
import tinymce from "tinymce";
import Cookies from "js-cookie";
import active from "../service/active.js";
export default {
  name: "artical-publish",
  mixins: [active],
  data() {
    return {
      modal1: false,
      url: "",
      isAdd: true,
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      value6: "",
      value7: "",
      articleTitle: "",
      acEndtime: "",
      acCreattime: "",
      content: "",
      activeId: "",
      text: ""
    };
  },
  methods: {
    add() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        acTitle: this.articleTitle,
        acIcon: this.defaultList[0].imgUrl,
        acCreattime: this.acCreattime,
        acEndtime: this.acEndtime,
        acType: 4
      };
      this.addActivity(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "添加活动成功",
            onClose: function() {
              that.activeId = res.data;
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    editorImg(file, res) {
      tinymce.execCommand(
        "mceInsertContent",
        false,
        '<img alt="Smiley face"  src="' + res.response.data + '"/>'
      );
    },
    updata() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        acTitle: this.articleTitle,
        acIcon: this.defaultList[0].imgUrl,
        acCreattime: this.acCreattime,
        acEndtime: this.acEndtime,
        acType: 4,
        acId: this.activeId
      };
      this.updateActivity(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "修改活动成功",
            onClose: function() {}
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    addContent() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        acId: this.activeId,
        acImg: tinymce.activeEditor.getContent()
      };
      this.updateActivity(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success("更新成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    end(val) {
      this.acEndtime = val;
    },
    start(val) {
      this.acCreattime = val;
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
    handleSuccess1(res, file) {
      this.$refs.child.insertImg(file.response.data);
    },
    handleFormatError1(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize1(file) {
      this.$Notice.warning({
        title: "文件大小超出限制",
        desc: "文件 " + file.name + " 大于限制的2M."
      });
    },
    handleBeforeUpload1() {},
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
    showImageSelector(cb) {
      $("#btn").click();
    }
  },
  mounted() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    this.url =
      "http://39.106.31.12:8080/fresh_show//User/uploadAll?token=" +
      token +
      "&staffId=" +
      staffId +
      "&type=1";
    this.uploadList = this.$refs.upload.fileList;
    var type = this.$route.params.activeId;
    if (type != "add") {
      this.isAdd = false;
      this.activeId = type;
      var params = {
        token,
        staffId,
        acId: type
      };
      this.selectByPrimaryKey(params).then(res => {
        if (res.code == 100000) {
          this.articleTitle = res.data[0].acTitle;
          this.defaultList.push({
            imgUrl: res.data[0].acIcon,
            imgName: res.data[0].acTitle
          });
          this.$nextTick(() => {
            this.uploadList = this.$refs.upload.fileList;
          });
          this.value6 = res.data[0].acCreattime;
          this.value7 = res.data[0].acEndtime;
          this.content = res.data[0].acImg;
          sessionStorage.setItem("acImg", res.data[0].acImg);
        }
      });
    }
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
      setup: function(editor) {
        editor.on("init", function(e) {
          if (that.content) {
            editor.setContent(that.content);
          } else {
            setTimeout(() => {
              if (type != "add") {
                var acImg = sessionStorage.getItem("acImg");
                editor.setContent(acImg);
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
};
</script> 
<style>
.ivu-card-head p {
  overflow: inherit;
}
.demo-upload-list1 {
  display: inline-block;
  width: 60px;
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