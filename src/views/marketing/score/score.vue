<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row>
                    <Col span="24">
                        <span class="margin-left-10">积分获取比例:</span>
                        <span class="margin-left-10">每消费100元得：</span>
				        <input v-model="score" placeholder="请输入获得积分数" class="inputDefault" type="number" min="0"  clearable style="width: 200px">
                        <span class="margin-left-10">积分</span>
                    </Col>
                    <Col span="24" style="margin-top:40px">
                        <span class="margin-left-10">积分兑现比例:</span>
                        <span class="margin-left-10">每100积分兑换：</span>
				        <input v-model="money" placeholder="请输入兑换的金额" class="inputDefault" type="number" min="0" clearable style="width: 200px">
                        <span class="margin-left-10">元</span>
                    </Col>
                </Row>
                <Row style="margin-top:40px">
				    <Button class="margin-left-10" type="success"  @click="add">更新</Button>
                </Row>
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
      score: "",
      money: ""
    };
  },
  methods: {
    add() {
      var that = this;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        confId: 100002,
        confValue: this.score
      };
      this.updateScore(params).then(res => {
        if (res.code == 100000) {
          var params1 = {
            token,
            staffId,
            confId: 100003,
            confValue: this.money
          };
          this.updateScore(params1).then(res => {
            if (res.code == 100000) {
              this.$Message.success("修改成功");
              that.mockTableData1()
            } else {
              this.$Message.success(res.message);
            }
          });
        } else {
          this.$Message.success(res.message);
        }
      });
    },
    mockTableData1() {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId
      };
      this.getList(params).then(res => {
        if (res.code == 100000) {
          this.score = res.data[0].confValue;
          this.money = res.data[1].confValue;
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  },
  mounted() {
    this.mockTableData1();
  }
};
</script>