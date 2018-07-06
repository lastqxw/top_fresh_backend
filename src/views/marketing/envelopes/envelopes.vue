<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
        <Row style="width:75%;display:inline-table">
          <span class="margin-left-10">名称:</span>
          <Input v-model="redEnvelopeName" placeholder="请输入代金券名称" clearable style="width: 200px"></Input>
          <span class="margin-left-10">优惠券种类个数:</span>
          <Input v-model="coupons" placeholder="请输入优惠券种类个数" clearable style="width: 200px"></Input>
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
	</div>
</template>
<script>
import Cookies from "js-cookie";
import envelope from "../service/marketing.js";
export default {
  mixins: [envelope],
  data() {
    return {
      redEnvelopeName: "",
      coupons: "",
      count: 10,
      tableData1: [],
      pageNum: 1,
      pageSize: 10,
      tableColumns1: [
        {
          title: "编号",
          key: "redEnvelopeId",
          width: 200,
          align: "center"
        },
        {
          title: "名称",
          key: "redEnvelopeName",
          align: "center"
        },
        {
          title: "内容",
          key: "redEnevlopeContent",
          align: "center"
        },
        {
          title: "代金券种类",
          key: "couponsNum",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         let argu = { redEnvelopeId: params.row.redEnvelopeId };
              //         this.$router.push({
              //           name: "envelope-info",
              //           params: argu
              //         });
              //       }
              //     }
              //   },
              //   "编辑"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.redEnvelopeId);
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
      let argu = { redEnvelopeId: "add" };
      this.$router.push({
        name: "envelope-info",
        params: argu
      });
    },
    search() {
      this.mockTableData1();
    },
    remove(redEnvelopeId) {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        redEnvelopeId
      };
      this.deleteRedEnvelope(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success("删除成功");
          this.mockTableData1();
        } else {
          this.$Message.error(res.message);
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
        redEnvelopeName: this.redEnvelopeName,
        couponsNum: this.coupons
      };
      this.getRedEnvelope(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.count = res.count;
          this.tableData1 = res.data;
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
    this.mockTableData1(1);
  }
};
</script>