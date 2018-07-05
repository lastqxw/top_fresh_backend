<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>商品名称：</span>
				<Input v-model="value" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">商品类型：</span>
				<Select v-model="model1" style="width:200px">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button class="margin-left-20" type="primary" icon="ios-search" @click="mockTableData1(1)">搜索</Button>
				<Button class="margin-left-10" type="success" icon="android-add" @click="toAdd('add')">新增</Button>
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
			v-model="modal2"
			title="系统提示"
			@on-ok="ok"
			@on-cancel="cancel">
			<p>是否删除该商品</p>
    	</Modal>
	</div>
</template>
<script>
import Cookies from "js-cookie";
import getProduct from "../service/product.js";
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
      pageSize:10,
      productId: "",
      cityList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "礼券"
        },
        {
          value: "2",
          label: "现货"
        }
      ],
      tableData1: [],
      tableColumns1: [
        {
          title: "ID",
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
                width: " 100%"
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
          title: "原价",
          key: "productOprice",
          align: "center",
          render: (h, params) => {
            return h("span", ["¥" + params.row.productOprice]);
          }
        },
        {
          title: "销售价",
          key: "productPrice",
          align: "center",
          render: (h, params) => {
            return h("span", ["¥" + params.row.productPrice]);
          }
        },
        {
          title: "类型",
          key: "productPtype",
          align: "center",
          render: (h, params) => {
            return h("span", [params.row.productPtype == 1 ? "礼券" : "现货"]);
          }
        },
        {
          title: "规格",
          key: "productDetail",
          align: "center"
        },
        {
          title: "是否上架",
          key: "productIsUse",
          align: "center",
          sortable: true,
          render: (h, params) => {
            return h("Icon", {
              props: {
                type: params.row.productIsUse == 1 ? "checkmark" : "close"
              },
              style: {
                fontSize: "20px",
                color: params.row.productIsUse == 1 ? "green" : "red"
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300,
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
                      let argu = { product_id: params.row.productId };
                      this.$router.push({
                        name: "product-info",
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.productId);
                    }
                  }
                },
                "删除"
              ),
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
                      let argu = { evaluateId: params.row.productId };
                      this.$router.push({
                        name: "evaluate-info",
                        params: argu
                      });
                    }
                  }
                },
                "商品评价"
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
      var token = this.token;
      var staffId = this.staffId;
      var productPtype = this.model1 != 0 ? this.model1 : "";
      var product_name = this.value;
      var params = {
        token: token,
        staffId: staffId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        productPtype: productPtype,
        productName: product_name
      };
      this.getProduct(params).then(res => {
        console.log(res);
        if(res.code==100000){
          data = res.data;
        console.log(data);
        this.tableData1 = data;
        this.count = res.count;
        console.log(this.tableData1);
        }else{
          this.$Message.error(res.message)
        }
      });
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.mockTableData1();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.mockTableData1();
    },
    toAdd(index) {
      let argu = { product_id: index };
      this.$router.push({
        name: "product-info",
        params: argu
      });
    },
    ok() {
      var params = {
        token: this.token,
        staffId: this.staffId,
        productId: this.productId
      };
      this.removeProduct(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.$Message.success("删除成功");
          this.mockTableData1(this.pageNum);
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