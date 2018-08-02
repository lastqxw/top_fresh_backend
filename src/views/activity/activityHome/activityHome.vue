<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <span>活动名称：</span>
                <Input v-model="acTitle" placeholder="请输入" clearable style="width: 200px"></Input>
                <span class="margin-left-10">类型：</span>
                <Select v-model="acType" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button class="margin-left-10" type="primary" icon="ios-search" @click="search">查找</Button>
                <Button class="margin-left-10" type="primary" icon="plus" @click="newActive">开启新活动</Button>                 
            </Card>
        </Row>
        <Row>
            <Card>
                <Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page show-elevator show-sizer @on-page-size-change="changePageSize" :total="count" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </Card>
        </Row>
        <Modal
        v-model="model1"
        title="开启新活动"
        @on-ok="add">
          <p style="margin-bottom:20px">
            <span>请选择需要添加的活动类型：</span>
            <Select v-model="activeType" style="width:200px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
          <p style="display:inline-block;margin-right:30px;float:left">
            <span >选择活动主图:</span>
            <div class="demo-upload-list" v-for="item in uploadList" style="display:inline-block">
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
          </p>
          <p style="margin-top:20px">
            <span>设置活动标题：</span>
            <Input v-model="acname" placeholder="请输入活动标题" style="display:inline-block;width:200px"></Input>
          </p>
          <p style="margin-top:20px">
            <span>设置活动开始时间：</span>
            <DatePicker type="date" placeholder="选择活动开始时间" style="width: 200px" @on-change="getshart"></DatePicker>
          </p>
          <p style="margin-top:20px">
            <span>设置活动结束时间：</span>
            <DatePicker type="date" placeholder="选择活动结束时间" style="width: 200px" @on-change="getend"></DatePicker>
          </p>
        </Modal>
    </div>
    
</template>
<script>
import Cookies from "js-cookie";
import active from "../service/active.js";
export default {
  mixins: [active],
  data() {
    return {
      acTitle: "",
      acname: "",
      acType: "",
      url: "",
      model2: "",
      model1: false,
      pageSize: 10,
      pageNum: 1,
      activeType: "",
      acCreattime: "",
      acEndtime: "",
      count: 10,
      visible: false,
      uploadList: [],
      defaultList: [],
      cityList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "优惠卷领取"
        },
        // {
        //   value: "2",
        //   label: "多人拼团"
        // },
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
      objectList: [
        {
          value: "进行中",
          label: "进行中"
        },
        {
          value: "已完成",
          label: "已完成"
        }
      ],
      tableData1: [],
      tableColumns1: [
        {
          title: "序号",
          key: "acId",
          width: 80,
          align: "center"
        },
        {
          title: "活动名称",
          key: "acTitle",
          align: "center"
        },
        {
          title: "主图",
          key: "acSrc",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.acIcon,
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
        {
          title: "活动时间",
          key: "acCreattime",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.acCreattime + "-" + params.row.acEndtime
            ]);
          }
        },
        {
          title: "类型",
          key: "acType",
          align: "center",
          render: (h, params) => {
            return h("span", [h("span", {}, this.status(params.row.acType))]);
          }
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.acId, params.row.acType);
                    }
                  }
                },
                "编辑"
              ),
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
                      this.confirm("删除", params.row.acId);
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
    getshart(val) {
      this.acCreattime = val;
    },
    getend(val) {
      this.acEndtime = val;
    },
    newActive() {
      this.model1 = true;
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleSuccess(res, file) {
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
    status(type) {
      switch (type) {
        case "1":
          return "优惠券领取";
          break;
        case "2":
          return "多人拼团";
          break;
        case "3":
          return "商品集锦";
          break;
        case "4":
          return "静态活动页";
          break;
        case "5":
          return "外链活动";
          break;
      }
    },
    remove(id, type) {
      let argu = { activeId: id };
      if (type == 1) {
        this.$router.push({
          name: "activityCoupon",
          params: argu
        });
      } else if (type == 2) {
        this.$router.push({
          name: "activityTeamwork",
          params: argu
        });
      } else if (type == 3) {
        this.$router.push({
          name: "activityCollection",
          params: argu
        });
      } else if (type == 4) {
        this.$router.push({
          name: "activityStatic",
          params: argu
        });
      } else if (type == 5) {
        this.$router.push({
          name: "activityOuter",
          params: argu
        });
      }
    },
    add() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var type = this.activeType;

      var params = {
        token,
        staffId,
        acTitle: this.acname,
        acIcon: this.defaultList[0].imgUrl,
        acCreattime: this.acCreattime,
        acEndtime: this.acEndtime,
        acType: this.activeType
      };
      this.addActivity(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "添加活动成功",
            onClose: function() {
              var activeId = res.data;
              let argu = { activeId: activeId };
              if (type == 1) {
                that.$router.push({
                  name: "activityCoupon",
                  params: argu
                });
              } else if (type == 2) {
                that.$router.push({
                  name: "activityTeamwork",
                  params: argu
                });
              } else if (type == 3) {
                that.$router.push({
                  name: "activityCollection",
                  params: argu
                });
              } else if (type == 4) {
                that.$router.push({
                  name: "activityStatic",
                  params: argu
                });
              } else if (type == 5) {
                that.$router.push({
                  name: "activityOuter",
                  params: argu
                });
              } else {
                this.$Message.error("请先选择需要添加的活动的类型");
              }
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    search() {
      this.mockTableData1();
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
            acId: index
          };
          this.deleteActivity(params).then(res => {
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
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        acTitle: this.acTitle,
        acType: this.acType == 0 ? "" : this.acType
      };
      this.selectlist(params).then(res => {
        if (res.code == 100000) {
          this.tableData1 = res.data;
          this.count = res.count;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.mockTableData1();
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.mockTableData1();
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
    this.mockTableData1();
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