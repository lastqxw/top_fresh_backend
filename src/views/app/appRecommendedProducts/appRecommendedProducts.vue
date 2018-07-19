<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <span class="margin-left-10">类型：</span>
                <Select v-model="model1" style="width:200px" @on-change="type">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="margin-left-10">商品：</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in objectList" :value="item.productId" :key="item.productId">{{ item.productName }}</Option>
                </Select>
                <Button class="margin-left-10" type="success" icon="android-add" @click="add">新增</Button>
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
      model1: "",
      model2: "",
      imgName: "",
      pageSize: "",
      pageNum: "",
      count: 10,
      visible: false,
      uploadList: [],
      cityList: [
        {
          value: "1",
          label: "礼券"
        },
        {
          value: "2",
          label: "现货"
        }
      ],
      objectList: [],
      tableData1: [],
      tableColumns1: [
        {
          title: "商品编号",
          key: "productId",
          width: 80,
          align: "center"
        },
        {
          title: "商品名称",
          key: "productName",
          align: "center"
        },
        {
          title: "主图",
          key: "productIcon",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.productIcon,
                width: 100
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
          title: "商品规格",
          key: "productDetail",
          align: "center"
        },
        {
          title: "商品原价",
          key: "productOprice",
          align: "center"
        },
        {
          title: "商品售价",
          key: "productPrice",
          align: "center"
        },
        {
          title: "商品类型",
          key: "productPrice",
          align: "center",
          render: (h, params) => {
            return h("span", [params.row.productPtype == 1 ? "礼券" : "现货"]);
          }
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
                      this.confirm(
                        "删除",
                        params.row.productId,
                        params.row.productType
                      );
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
    type(val) {
      var token = Cookies.get("token"),
        staffId = Cookies.get("staffId");
      var that = this;
      var params = {
        token,
        staffId,
        pageSize: 10000000,
        pageNum: 1,

        productPtype: val
      };
      this.getProduct(params).then(res => {
        if (res.code == 100000) {
          this.objectList = res.data;
        }
      });
    },
    add() {
      var token = Cookies.get("token"),
        staffId = Cookies.get("staffId");
      var that = this;
      var params = {
        token,
        staffId,
        productId: this.model2,
        productPtype: this.model1,
        productIshot: 1
      };
      this.updateProIsHotBack(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "添加成功",
            onClose: function() {
              that.mockTableData1();
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    confirm(type, index, productType) {
      var that = this;
      this.$Modal.confirm({
        title: "你确定要" + type + "吗？",
        onOk: () => {
          var token = Cookies.get("token"),
            staffId = Cookies.get("staffId");
          var params = {
            token,
            staffId,
            productId: index,
            productType,
            productIshot: 2
          };
          this.updateProIsHotBack(params).then(res => {
            if (res.code == 100000) {
              this.$Message.success({
                content: "删除成功",
                onClose: function() {
                  that.mockTableData1();
                }
              });
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
        productIshot: 1
      };
      this.selectHotListBack(params).then(res => {
        if (res.code == 100000) {
          this.tableData1 = res.data;
          this.count = res.count;
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
    }
  },
  mounted() {
    this.mockTableData1();
  }
};
</script>
