<style lang="less">
@import "../../../../styles/common.less";
</style>
<template>
	<div>
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
			v-model="modal2"
			title="系统提示"
			@on-ok="ok"
			@on-cancel="cancel">
			<p>是否删除该评价</p>
    	</Modal>
	</div>
</template>
<script>
import Cookies from "js-cookie";
import getProduct from "../../service/product.js";
export default {
  mixins: [getProduct],
  data() {
    return {
      modal2: false,
      value: "",
      model1: "",
      count: 10,
      token: Cookies.get("token"),
      staffId: Cookies.get("staffId"),
      pageNum: 1,
      pageSize: 10,
      productId: "",
      tableData1: [],
      tableColumns1: [
        {
          title: "ID",
          key: "productId",
          width: 80,
          align: "center"
        },
        {
          title: "用户",
          key: "evaluationPhone",
          align: "center"
        },
        {
          title: "评价时间",
          key: "evaluationTime",
          align: "center"
        },
        {
          title: "评价星级",
          key: "evaluationPraiseNum",
          align: "center"
        },
        {
          title: "评价内容",
          key: "evaluationContent",
          align: "center"
        },
        {
          title: "备注",
          key: "evaluationBeizhu",
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
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.evaluationId);
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
    mockTableData1() {
      let data = [];
      var token = Cookies.get("token"),
        staffId = Cookies.get("staffId");
      console.log(this.$route);
      var productId=this.$route.params.evaluateId
      var params = {
        token: token,
        staffId: staffId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        productId,
      };
      this.selectevaluationlist(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          data = res.data;
          this.tableData1 = data;
          this.count = res.count;
          console.log(this.tableData1);
        }else{
            this.$Message.error(res.message)
        }
      });
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.mockTableData1();
    },
    changePage(pageNum) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.pageNum = pageNum;
      this.mockTableData1();
    },
    ok() {
      var params = {
        token: this.token,
        staffId: this.staffId,
        evaluationId: this.productId
      };
      this.deleteEvaluation(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success("删除成功");
          this.mockTableData1();
        } else {
          this.$Message.success(res.messages);
        }
      });
    },
    cancel() {
      this.$Message.info("取消成功");
    },
    remove(productId) {
      this.productId = productId;
      this.modal2 = true;
    }
  },
  mounted() {
    this.mockTableData1();
  }
};
</script>