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
                
            </Card>
            <Card>
                <span>请选择需要添加的活动类型：</span>
                <Select v-model="activeType" style="width:200px">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button class="margin-left-10" type="primary" icon="ios-add" @click="add">添加</Button>                
            </Card>
        </Row>
        <Row>
            <Card>
                <Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page show-elevator show-sizer @on-page-size-change="changePage" :total="count" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </Card>
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
      acTitle: "",
      acType: "",
      model2: "",
      pageSize: 10,
      pageNum: 1,
      activeType: "",
      count: 10,
      visible: false,
      cityList: [
        {
          value: "0",
          label: "全部"
        },
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
          title: "状态",
          key: "acType",
          align: "center"
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
    status(type) {
      switch (type) {
        case "1":
          return "优惠券领取";
          break;
        case "2":
          return "多人拼图";
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
      var type = this.activeType;
      let argu = { activeId: "add" };
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
      } else {
        this.$Message.error("请先选择需要添加的活动的类型");
      }
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
            console.log(res);
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
        console.log(res);
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
    this.mockTableData1();
  }
};
</script>
