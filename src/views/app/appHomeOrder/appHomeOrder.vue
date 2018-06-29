<style lang="less">
@import "../../../styles/common.less";
</style>
<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">设置首页活动</p>
            <div style="margin-bottom:30px">
                <span>首页活动栏左方活动设置：</span>
                <Select  style="width:200px" @on-change="type" >
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in activeList" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
                </Select>
            </div>
            <div style="margin-bottom:30px">
                <span>首页活动栏右上方活动设置：</span>
                <Select  style="width:200px" @on-change="type1">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in activeList1" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
                </Select>
            </div>
            <div style="margin-bottom:30px">
                <span>首页活动栏右下方活动设置：</span>
                <Select  style="width:200px" @on-change="type2">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="model3" style="width:200px">
                    <Option v-for="item in activeList2" :value="item.acId" :key="item.acId">{{ item.acTitle }}</Option>
                </Select>
            </div>
            <div style="margin-bottom:30px">
                <Button type="primary" @click="save">保存</Button>
            </div>
        </Card>
        <Card :bordered="false" style="margin-top:20px">
            <p slot="title">已设置的首页活动</p>
            <Table stripe border :columns="tableColumns1" :data="active"></Table>
        </Card>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import card from "../service/appBanner.js";
export default {
  mixins: [card],
  data() {
    return {
      model1: "",
      activeList: [],
      activeList1: [],
      activeList2: [],
      model2: "",
      model3: "",
      active: [],
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
      tableColumns1: [
        {
          title: "活动编号",
          key: "acId",
          width: 150,
          align: "center"
        },
        {
          title: "活动名称",
          key: "acTitle",
          align: "center"
        },
        {
          title: "主图",
          key: "acIcon",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.acIcon,
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
        }
      ]
    };
  },
  methods: {
    type(val) {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageSize: 10,
        pageNum: 1,
        acType: val
      };
      this.selectlist(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.activeList = res.data;
        }
      });
    },
    type1(val) {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageSize: 10,
        pageNum: 1,
        acType: val
      };
      this.selectlist(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.activeList1 = res.data;
        }
      });
    },
    type2(val) {
      var token = Cookies.get("token");
      var staffId = Cookies.get("staffId");
      var params = {
        token,
        staffId,
        pageSize: 10,
        pageNum: 1,
        acType: val
      };
      this.selectlist(params).then(res => {
        console.log(res);
        if (res.code == 100000) {
          this.activeList2 = res.data;
        }
      });
    },
    save() {
      var that = this;
      if (this.model1 == "" || this.model2 == "" || this.model3 == "") {
        this.$Message.error("在设置首页活动时，需同时设置三个位置的活动");
      } else {
        //   调用保存活动的接口
        var acIds = this.model1 + "," + this.model2 + "," + this.model3;
        var token = Cookies.get("token");
        var staffId = Cookies.get("staffId");
        var params = {
          token,
          staffId,
          acIds,
          ishot: 1
        };
        this.updateActivity(params).then(res => {
          console.log(res);
          if (res.code == 100000) {
            this.$Message.success({
              content: "添加成功",
              onClose: function() {
                var params = {
                  token,
                  staffId,
                  pageSize: 10,
                  pageNum: 1,
                  ishot: 1
                };
                that.selectlist(params).then(res => {
                  console.log(res);
                  if (res.code == 100000) {
                    that.active = res.data;
                    console.log(that.active);
                  }
                });
              }
            });
          }
        });
      }
    }
  },
  beforeMount() {
    var token = Cookies.get("token");
    var staffId = Cookies.get("staffId");
    var params = {
      token,
      staffId,
      pageSize: 10,
      pageNum: 1,
      ishot: 1
    };
    this.selectlist(params).then(res => {
      console.log(res);
      if (res.code == 100000) {
        this.active = res.data;
      }
    });
  }
};
</script>