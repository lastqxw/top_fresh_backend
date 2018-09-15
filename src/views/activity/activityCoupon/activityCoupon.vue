<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Col span="16" style="margin-right:20px">
                <Row>
                    <Card>
                        <div style="border-bottom: 1px solid #ccc; margin-top: 20px">
                            <h1>优惠券活动设置</h1>
                        </div>
                        <div style="margin-bottom: 20px;margin-top:10px">
                            <span>活动名称：</span>
                            <Input v-model="articleTitle"  icon="android-list"  style="width:300px"/>
                        </div>
                        <div style="margin-bottom:20px">
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
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
						 multiple type="drag"  :action="url" style="display: inline-block;width:58px;">
							<div style="width: 58px;height:58px;line-height: 58px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src="imgName" v-if="visible" style="width: 100%">
                        </Modal>
                        </div>
                        <div style="border-bottom: 1px solid #ccc; margin-top: 20px">
                            <h1>本活动中添加优惠券</h1>
                        </div>
                        <div style="margin-top: 20px">
                            <span class="margin-left-10">选择优惠券：</span>
                            <Select v-model="iId" style="width:200px">
                                <Option v-for="item in couponList" :value="item.couponsId" :key="item.couponId">{{ item.couponsName }}</Option>
                            </Select>
                            <span class="margin-left-10">设置优惠券数量：</span>
                                <Input v-model="couponNum"  icon="android-list"  style="width:100px"/>
                            <Button type="primary" @click="addCoupon">添加代金卷</Button>
                        </div>
                    </Card>
                    <Card style="margin-top: 10px;">
                        <Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page show-elevator show-sizer @on-page-size-change="changePageSize" :total="count" :current="1" @on-change="changePage"></Page>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Col>
            <Col span="7">
                <Row>
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
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button">
						<Button  icon="ios-checkmark" style="width:90px;" type="success"  @click="edit">更新</Button>
					</span>
				</Row>
			</Card>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import active from "../service/active.js";
export default {
  mixins: [active],
  data() {
    return {
      isAdd: false,
      // 活动标题
      couponNum: "",
      data1: "",
      articleTitle: "",
      //   所选优惠券的id
      iId: "",
      //   优惠券list
      couponList: [],
      acCreattime: "",
      acEndtime: "",
      url: "",
      type: "",
      pageSize: 10,
      pageNum: 1,
      count: 10,
      value6: "",
      value7: "",
      model1: "",
      model2: "",
      defaultList: [
        {
          imgUrl: "",
          imgName: ""
        }
      ],
      imgName: "",
      visible: false,
      uploadList: [],
      tableData1: [],
      couponsId: [],
      tableColumns1: [
        {
          title: "优惠券编号",
          key: "couponsId",
          width: 150,
          align: "center"
        },
        {
          title: "优惠券名称",
          key: "couponsName",
          align: "center"
        },
        {
          title: "优惠券类型",
          key: "couponsType",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.couponsType == 1 ? "满减券" : "直减券"
            ]);
          }
        },
        {
          title: "适用范围",
          key: "useScope",
          align: "center",
          render: (h, params) => {
            return h("span", [
              h("span", {}, this.useScope(params.row.useScope))
            ]);
          }
        },
        {
          title: "可领取数量",
          key: "couponsNum",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.confirm("删除", params.row.couponsId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    end(val) {
      this.acEndtime = val;
    },
    start(val) {
      this.acCreattime = val;
    },
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
        acType: 1
      };
      this.addActivity(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "添加活动成功",
            onClose: function() {
              that.activeId = res.data;
              that.mockTableData1();
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    edit() {
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
        acType: 1,
        acId: this.activeId
      };
      this.updateActivity(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "修改活动成功",
            onClose: function() {
              //   that.activeId = res.data;
              that.mockTableData1();
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    addCoupon() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        acType: 1,
        couponsId: this.iId,
        activityId: this.activeId,
        couponsNum: this.couponNum
      };
      this.editCoupons(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "添加成功",
            onClose: function() {
              //   that.activeId = res.data;
              that.mockTableData1();
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    date(val) {
      this.acCreattime = val[0];
      this.acEndtime = val[1];
    },
    useScope(use) {
      switch (use) {
        case "ALL":
          return "全部";
          break;
        case "A1":
          return "礼品卡";
          break;
        case "A2":
          return "现货";
          break;
        default:
          use;
      }
    },
    confirm(type, index) {
      var that = this;
      this.$Modal.confirm({
        title: "你确定要" + type + "吗？",
        onOk: () => {
          var token = Cookies.get("token");
          var staffId = Cookies.get("staffId");
          var params = {
            token,
            staffId,
            couponsId: index,
            activityId: ""
          };
          this.editCoupons(params).then(res => {
            if (res.code == 100000) {
              this.$Message.success({
                content: "删除成功",
                onClose: function() {
                  that.mockTableData1();
                }
              });
            } else {
              this.$Message.error(res.message);
            }
          });
        },
        onCancel: () => {
          this.$Message.info("取消成功");
        }
      });
    },
    mockTableData1() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        activityId: this.activeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.selectCouponsList(params).then(res => {
        if (res.code == 100000) {
          this.tableData1 = res.data;
          this.count = res.totalNum;
        }
      });
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
    },
    // 图片上传
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      this.defaultList=[];
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
          title: "最多只能上传1张图片"
        });
      }
      return check;
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

    var type = this.$route.params.activeId;
    if (type != "add") {
      var params = {
        token,
        staffId,
        acId: type
      };
      this.selectByPrimaryKey(params).then(res => {
        if (res.code == 100000) {
          this.articleTitle = res.data[0].acTitle;
          this.defaultList = [];
          this.defaultList.push({
            imgUrl: res.data[0].acIcon,
            imgName: res.data[0].acTitle
          });
          this.$nextTick(() => {
            this.uploadList = this.$refs.upload.fileList;
          });
          this.value6 = res.data[0].acCreattime;
          this.value7 = res.data[0].acEndtime;
        }
      });
      this.isAdd = true;
      this.activeId = type;
      this.mockTableData1();
    }
    var params = {
      token,
      staffId,
      pageNum: this.pageNum,
      pageSize: this.pageSize
    };
    this.selectCouponsList(params).then(res => {
      if (res.code == 100000) {
        this.couponList = res.data;
      }
    });
  }
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
