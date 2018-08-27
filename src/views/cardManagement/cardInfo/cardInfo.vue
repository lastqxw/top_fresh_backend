<style lang="less">
@import "../../../styles/common.less";
</style>
<style lang="less" scoped>
</style>

<template>
	<div>
		<Row>
			<Card>
                 <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    选择文件
                </p>
                <Row style="padding-bottom:10px;border-bottom:1px solid #e9eaec">
                    <Col span="4">
                        卡券编号
                    </Col>
                    <Col span="20">
                        <Upload
                            multiple
                            type="drag"
                            :on-success="handleSuccess"
                            :action="url" style="width: 200px">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或拖拽上传文件</p>
                            </div>
                        </Upload>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        <span>文件中卡券个数</span>
                         <Input v-model="cardNumber" disabled placeholder="0个" style="width:200px"></Input>
                    </Col>
                    <Col span="12">
                        <span> 请选择对应的实体商品</span>
                        <Select v-model="odProductId" style="width:200px">
                            <Option v-for="item in productList" :value="item.productId" :key="item.productId">{{ item.productName }}</Option>
                        </Select>
                        <!-- <Input v-model="count1" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input> -->
                    </Col>
                    <!-- <Col span="6">
                        <Button type="primary" :loading="loading" @click="toLoading">
                            <span v-if="!loading">预览</span>
                            <span v-else>正在生成预览...</span>
                        </Button>
                    </Col> -->
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="8">
                        <span>请选择此批卡有效时间</span>
                         <Select v-model="timesize" style="width:200px">
                            <Option v-for="item in typeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                        <span>请选择卡券激活状况</span>
                        <Select v-model="state" style="width:200px">
                            <Option v-for="item in typeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                        <Button type="primary" :loading="loading1" @click="toLoading1">
                            <span v-if="!loading1">保存</span>
                            <span v-else>正在保存...</span>
                        </Button>
                    </Col>
                </Row>
			</Card>
		</Row>
		
	</div>
</template>
<script>
import Cookies from "js-cookie";
import card from "../service/card.js";
export default {
  mixins: [card],
  data() {
    return {
      count1: "",
      url: "",
      loading: false,
      loading1: false,
      loading2: false,
      productList: [],
      random: "",
      cardNumber: "",
      odProductId: "",
      timesize: "",
      state: "",
      typeList: [],
      typeList1: [
        {
          value: "一年",
          label: "一年"
        },
        {
          value: "两年",
          label: "两年"
        },
        {
          value: "三年",
          label: "三年"
        }
      ],
      typeList2: [
        {
          value: "6",
          label: "激活"
        },
        {
          value: "1",
          label: "未激活"
        }
      ]
    };
  },
  methods: {
    toLoading() {
      this.loading = true;
    },
    toLoading1() {
      this.loading = true;
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        random: this.random,
        odProductId: this.odProductId,
        timesize: this.timesize,
        state: this.state
      };
      this.updateLading(params).then(res => {
        if (res.code == 100000) {
          this.$Message.success("添加成功");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    toLoading2() {
      this.loading = true;
    },
    handleSuccess(file) {
      if (file.code == 100000) {
        this.random = file.data[0];
        this.cardNumber = file.data[1];
      } else {
        this.$Message.error(file.message);
      }
    }
  },
  mounted() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var url =
      "http://39.106.31.12:8080/fresh_show/Excel/upload?token=" +
      token +
      "&staffId=" +
      staffId;
    this.url = url;
    var params = {
      token,
      staffId,
      pageSize: 1000000,
      pageNum: 1
    };
    this.getProduct1(params).then(res => {
      if (res.code == 100000) {
        this.productList = res.data.filter(x => x.productPtype === '2');
      }
    });
  }
};
</script>