<style lang="less">
@import "../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
        <Row style="width:75%;display:inline-table">
          <span class="margin-left-10">类型:</span>
          <Select v-model="couponsType" style="width:200px">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span class="margin-left-10">使用范围:</span>
          <Select v-model="usescope" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span class="margin-left-10">折扣价格:</span>
          <Input v-model="couponsValue" placeholder="请输入折扣价格" clearable style="width: 200px"></Input>
          <span class="margin-left-10">名称:</span>
          <Input v-model="couponsName" placeholder="请输入优惠券名称" clearable style="width: 200px"></Input>
        </Row>
        <Row style="width:22%;display:inline-table">
          <Button class="margin-left-20" type="primary" icon="ios-search" @click="search">搜索</Button>
          <Button class="margin-left-10" type="success" icon="android-add" @click="add">新增</Button>
        </Row>
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
        v-model="modal"
        title="系统提示"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>是否要删除该优惠券</p>
    </Modal>
	</div>
</template>
<script>
import Cookies from "js-cookie";
import marketing from "./service/marketing.js";
export default {
  mixins: [marketing],
  data() {
    return {
      token: Cookies.get("token"),
      staffId: Cookies.get("staffId"),
      couponsType: "",
      usescope: "",
      couponsValue: "",
      couponsName: "",
      model1: "全部",
      modal: false,
      count: 10,
      pageNum: 1,
      pageSize: 10,
      couponsId: "",
      typeList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "满减券"
        },
        {
          value: "2",
          label: "直减券"
        }
      ],
      cityList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "ALL",
          label: "全部类"
        },
        {
          value: "A1",
          label: "礼品卡"
        },
        {
          value: "A2",
          label: "现货"
        }
      ],
      tableData1: [],
      tableColumns1: [
        {
          title: "编号",
          key: "couponsId",
          width: 80,
          align: "center"
        },
        {
          title: "名称",
          key: "couponsName",
          align: "center"
        },
        {
          title: "类型",
          key: "couponsType",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.couponsType == 1 ? "满减券" : "直减券"
            ]);
          }
        },
        {
          title: "使用范围",
          key: "useScope",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("span", [this.useScope1(params.row.useScope)]);
          }
        },
        {
          title: "规则",
          key: "couponsMin",
          align: "center",
          render: (h, params) => {
            return h("span", [
              "满" + params.row.couponsMin,
              " 减" + params.row.couponsValue
            ]);
          }
        },
        {
          title: "有效期",
          width: 300,
          key: "couponsStartTime",
          align: "center",
          render: (h, params) => {
            return h("span", [
              params.row.couponsStartTime,
              " - " + params.row.couponsEndTime
            ]);
          }
        },
        {
          title: "已发放数量",
          key: "couponsReceiveNum",
          align: "center"
        },
        {
          title: "可使用数量",
          key: "couponsUsenum",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let argu = { couponId: params.row.couponsId };
                      this.$router.push({
                        name: "market-info",
                        params: argu
                      });
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
                  on: {
                    click: () => {
                      this.remove(params.row.couponsId);
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
    useScope1(use) {
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
          return use;
          break;
      }
    },
    ok() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        couponsId: this.couponsId
      };
      var that = this;
      this.deleteCoupons(params).then(res => {
        console.log(res);
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
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    remove(id) {
      this.couponsId = id;
      this.modal = true;
    },
    add() {
      let argu = { couponId: "add" };
      this.$router.push({
        name: "market-info",
        params: argu
      });
    },
    search() {
      this.mockTableData1();
    },
    mockTableData1() {
      var couponsType = this.couponsType;
      var usescope = this.usescope;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        couponsType: this.couponsType == 0 ? "" : this.couponsType,
        couponsValue: this.couponsValue,
        couponsName: this.couponsName,
        useScope: this.usescope == 0 ? "" : this.usescope
      };
      this.selectCouponsList(params).then(res => {
        if (res.code == 100000) {
          var data = res.data;
          this.count = res.totalNum;
          this.tableData1 = data;
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