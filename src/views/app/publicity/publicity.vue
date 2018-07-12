<style lang="less">
@import "../../../styles/common.less";
</style>

<template>
	<div>
		<Row>
			<Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        首页宣传设置
                    </p>
                    <Form>
                        <!-- 宣传设置-->
                        <FormItem>
                            <div style="display:block">
                                <textarea id="articleEditor" v-model="value3"></textarea>
                            </div>
                        </FormItem>
                    </Form>
                    <Button class="margin-left-20" type="info"  @click="updata">保存</Button>
                </Card>
                
			</Col>
            <Upload :action="url" :on-success="editorImg" style="display:none">
                <Button type="ghost" icon="ios-cloud-upload-outline" @click="up" ref="btn" id="btn">Upload files</Button>
            </Upload>
		</Row>
	</div>
	
</template>

<script>
import tinymce from "tinymce";
import Cookies from "js-cookie";
import getProduct from "../service/appBanner.js";
export default {
  name: "artical-publish",
  mixins: [getProduct],
  data() {
    return {
      modal1: false,
      url: "",
      id: "",
      token: Cookies.get("token"),
      staffId: Cookies.get("staffId"),
      value3: "",
      content: null
    };
  },
  methods: {
    up() {
    },
    updata() {
      var that = this;
      var id = this.id;
      var params = {
        id,
        // token
        token: this.token,
        // userid
        staffId: this.staffId,
        // 图文信息介绍
        content: tinymce.activeEditor.getContent()
      };
      this.updataContent(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success("修改成功");
        }
      });
    },
    productDetails() {
      var that = this;
      var params = {
        token: that.token,
        staffId: that.staffId
      };
      this.selectContent(params).then(res => {
        if (res.code == 100000) {
          this.content = res.data[0].content;
          sessionStorage.setItem("content", res.data[0].content);
          // tinymce.activeEditor.setContent(res.data[0].content);
          this.id = res.data[0].id;
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
    showImageSelector(cb) {
      $("#btn").click();
    }
  },
  mounted() {
    this.productDetails();
    this.url =
      "http://39.107.126.201:8080/fresh_show//User/uploadAll?token=" +
      this.token +
      "&staffId=" +
      this.staffId +
      "&type=1";
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
              var content = sessionStorage.getItem("content");
              editor.setContent(content);
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