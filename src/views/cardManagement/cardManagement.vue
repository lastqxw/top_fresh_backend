<style lang="less">
@import "../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
        <Row style="width:80%;display:inline-table">
          <span class="margin-left-10">卡券编号:</span>
          <Input v-model="number" placeholder="请输入卡券编号" clearable style="width: 200px"></Input>
          <span class="margin-left-10">状态:</span>
          <Select v-model="type" style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="margin-left-20" type="primary" icon="ios-search" @click="search">查找</Button>
          <Button class="margin-left-20" type="info" icon="ios-plus-outline" @click="toPlush">录入卡券</Button>
        </Row>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="tableColumns1" :data="tableData1" @on-selection-change='jihuo'></Table>
				<div style="margin: 10px;overflow: hidden">
                    <div style="float:left">
                        <Button type="primary" @click="pljihuo">批量激活</Button>
                    </div>
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
import card from "./service/card.js";
export default {
  mixins: [card],
  data() {
    return {
      type: "",
      name: "",
      number: "",
      count: 10,
      pageSize: 10,
      pageNum: 1,
      id: [],
      typeList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "已激活"
		},
		{
          value: "3",
          label: "已使用"
        },
        {
          value: "6",
          label: "未激活"
        }
      ],
      tableData1: [],
      tableColumns1: [
        {
          type: "selection",
          width: 60,
          key: "_disabled",
          align: "center"
        },
        {
          title: "卡券编号",
          key: "card",
          width: 150,
          align: "center"
        },
        {
          title: "有效期(年)",
          key: "timesize",
          align: "center"
        },
        {
          title: "卡券状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            return h("span", [params.row.state == 6 ? "激活" : params.row.state == 1 ? "未激活" :"已使用" ]);
          }
        },
        {
          title: "卡券卡密",
          key: "hidecard",
          align: "center"
        },
        {
          title: "录入时间",
          key: "createtime",
          align: "center"
        },
        {
          title: "指向商品名称",
          key: "odProductName",
          align: "center"
        },
        {
          title: "激活时间",
          key: "jihuotime",
          width: 150,
          align: "center"
        },
        {
          title: "使用人",
          key: "name",
          align: "center"
        },
        {
          title: "使用时间",
          key: "usetime",
          width: 150,
          align: "center"
        }
      ]
    };
  },
  methods: {
    search() {
      this.mockTableData1();
    },
    jihuo(val) {
      this.id = val;
    },
    pljihuo() {
      var that = this;
      var ids ='';
      for (var i = 0; i < this.id.length; i++) {
		// ids.push(this.id[i].odId);
		ids += this.id[i].odId+","
	  }
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        odIds: ids.substring(0,ids.length-1)
      };
      this.updateBatchState(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success({
            content: "激活成功",
            onClose: function() {
              that.mockTableData1();
            }
          });
        }
      });
    },
    toPlush() {
      this.$router.push({
        name: "card-info"
      });
    },
    mockTableData1() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.type != 0 || this.type != "") {
        params.state = this.type;
      }
      if (this.number != "") {
        params.card = this.number;
      }
      this.getLadingList(params).then(res => {
        if (res.code == 100000) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].state == 6 || res.data[i].state==3 ) {
              res.data[i]._disabled = true;
            } else {
              res.data[i]._disabled = false;
            }
          }
          this.tableData1 = res.data;
          this.count = res.count;
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
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.pageNum = pageNum;
      this.mockTableData1();
    },
    changePageSize(pageSize) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.pageSize = pageSize;
      this.mockTableData1();
    }
  },
  mounted() {
    this.mockTableData1();
  }
};
</script>