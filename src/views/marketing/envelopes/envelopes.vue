<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row style="width:80%;display:inline-table">
                    <Col span="12">
                        <span class="margin-left-10">名称:</span>
				        <Input v-model="redEnvelopeName" placeholder="请输入代金券名称" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="12">
                        <span class="margin-left-10">代金券个数:</span>
				        <Input v-model="coupons" placeholder="请输入代金券个数" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="width:19%;display:inline-table">
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
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="count" :current="1" @on-change="changePage(10)"></Page>
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
      pageNum: "",
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
      this.mockTableData1(1);
    },
    remove(redEnvelopeId) {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      this.deleteRedEnvelope(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success({
            content: "删除成功",
            onClose: function() {
              this.mockTableData1(1);
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    mockTableData1(pageNum) {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageNum,
        pageSize: 10,
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
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1(pageNum);
    }
  },
  mounted() {
    this.mockTableData1(1);
  }
};
</script>