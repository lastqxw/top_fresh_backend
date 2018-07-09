<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    添加banner
                </p>
                <Col span="4">
                    <div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.imgUrl">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
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
							<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
						</Modal>
                </Col>
                <Col span="8">
                    <span class="margin-left-10">指定类型：</span>
                <Select v-model="bannerType" style="width:200px" @on-change='status'>
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="8" v-if="product">
                    <span class="margin-left-10">指定对象(商品)：</span>
                <Select v-model="bannerLink" style="width:200px">
                    <Option v-for="item in productList" :value="item.productId" :key="item.productId">{{ item.productName }}</Option>
                </Select>
                </Col>
                <Col span="8" v-if="active">
                    <span class="margin-left-10">指定对象(活动)：</span>
                <Select v-model="bannerLink" style="width:200px">
                    <Option v-for="item in activeList" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
                </Select>
                </Col>
                <Col span="8" v-if="outer">
                    <span class="margin-left-10">指定对象(外链)：</span>
                    <Input v-model="bannerLink" placeholder="请输入设置的外链地址" clearable style="width: 200px"></Input>
                </Col>
                <Col span="4">
                    <Button class="margin-left-10" type="success" icon="android-add" @click="add">新增</Button>
                </Col>
                <p style="clear:both"></p>
            </Card>
        </Row>
        <Row>
            <Card>
                <Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
            </Card>
        </Row>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import Banner from "../service/appBanner.js";
export default {
  mixins: [Banner],
  data() {
    return {
      value: "",
      bannerLink: "",
      product: true,
      active: false,
      outer: false,
      url: "",
      bannerType: "",
      model2: "",
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      cityList: [
        {
          value: "1",
          label: "商品"
        },
        {
          value: "2",
          label: "活动"
        },
        {
          value: "3",
          label: "外链"
        },
        {
          value: "4",
          label: "置空"
        }
      ],
      productList: [],
      activeList: [],
      tableData1: [],
      tableColumns1: [
        {
          title: "编号",
          key: "bannerId",
          width: 150,
          align: "center"
        },
        {
          title: "主图",
          key: "bannerUrl",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.bannerUrl,
                width: 200
              },
              on: {
                click: () => {
                  // console.log(params,'12')
                  // this.show(params.index)
                }
              }
            });
          }
        },
        {
          title: "指向类型",
          key: "bannerType",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("span", [h("span", {}, this.type(params.row.bannerType))]);
          }
        },
        {
          title: "指向对象",
          key: "bannerTitle",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
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
                      this.confirm("删除", params.row.bannerId);
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
    add() {
      var that = this;
      var token = Cookies.get("token"),
        staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        bannerLink: this.bannerLink,
        bannerType: this.bannerType,
        bannerUrl: this.uploadList[0].imgUrl
      };
      this.addBanner(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success("添加成功");
          that.mockTableData1();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    type(lei) {
      switch (lei) {
        case "1":
          return "商品";
          break;
        case "2":
          return "活动";
          break;
        case "3":
          return "外链";
          break;
        case "4":
          return "置空";
          break;
      }
    },
    status(val) {
      console.log(val);
      if (val == 1) {
        this.product = true;
        this.active = false;
        this.outer = false;
      } else if (val == 2) {
        this.product = false;
        this.active = true;
        this.outer = false;
      } else if (val == 3) {
        this.product = false;
        this.active = false;
        this.outer = true;
      } else {
        this.product = false;
        this.active = false;
        this.outer = false;
        this.bannerLink = "";
      }
    },
    confirm(type, index) {
      this.$Modal.confirm({
        title: "你确定要" + type + "吗？",
        onOk: () => {
          var that = this;
          var token = Cookies.get("token"),
            staffId = Cookies.get("staffId");
          var params = {
            token,
            staffId,
            bannerId: index
          };
          this.removeBanner(params).then(res => {
            console.log(res);
            if (res.code == 100000) {
              this.$Message.success("删除成功");
              that.mockTableData1();
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
      var token = Cookies.get("token"),
        staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId
      };
      this.getBanner(params).then(res => {
        console.log(res);
        this.tableData1 = res.data;
      });
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
        title: "图片大小超出限制",
        desc: "文件名  " + file.name + " 大小不能超过2M"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能添加一张图片."
        });
      }
      return check;
    }
  },
  mounted() {
    this.mockTableData1();
    this.uploadList = this.$refs.upload.fileList;
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    this.url =
      "http://39.107.126.201:8080/fresh_show//User/uploadAll?token=" +
      token +
      "&staffId=" +
      staffId +
      "&type=1";
    var params = {
      token,
      staffId,
      pageSize: 1000000000,
      pageNum: 1
    };
    this.getProduct(params).then(res => {
      console.log(res);
      if (res.code == 100000) {
        this.productList = res.data;
      }
    });
    this.selectlist(params).then(res => {
      console.log(res);
      if (res.code == 100000) {
        this.activeList = res.data;
      }
    });
  }
};
</script>
<style>
.ivu-upload {
  display: inline-block;
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
