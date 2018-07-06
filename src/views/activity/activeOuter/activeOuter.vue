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
              外链详情
              <span class="publish-button" style="float:right;margin-right:25px">
						    <Button  icon="ios-checkmark" style="width:90px;" type="success"  @click="addContent">更新</Button>
					    </span>
            </p>
            <div >
							<Input v-model="content" placeholder="请输入外链链接" style="width: 300px"></Input>
						</div>            
           
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
      activeId: ""
    };
  },
  methods: {
    add() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      console.log(this.defaultList);
      var params = {
        token,
        staffId,
        acTitle: this.articleTitle,
        acIcon: this.defaultList[0].imgUrl,
        acCreattime: this.acCreattime,
        acEndtime: this.acEndtime,
        acType: 5
      };
      this.addActivity(params).then(res => {
        console.log(res);
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
    updata() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      console.log(this.defaultList);
      var params = {
        token,
        staffId,
        acTitle: this.articleTitle,
        acIcon: this.defaultList[0].imgUrl,
        acCreattime: this.acCreattime,
        acEndtime: this.acEndtime,
        acType: 5,
        acId: this.activeId
      };
      this.updateActivity(params).then(res => {
        console.log(res);
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
        acSrc: this.content
      };
      this.updateActivity(params).then(res => {
        console.log(res);
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
      console.log(file);
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
    }
  },
  mounted() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    this.url =
      "http://39.107.126.201:8080/fresh_show//User/uploadAll?token=" +
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
        console.log(res);
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
          this.content = res.data[0].acSrc;
        }
      });
    }
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
</style>