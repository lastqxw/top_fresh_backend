<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
        
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">Admin</b>
                                            <p>管理员</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                        </Card>
            </Col>
        </Row>
    <Spin fix v-if="loading">
			<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
			<div>推送中...</div>
		</Spin>
		<Modal title="新增" @on-ok="handleAddNotice" v-model="commentShowAdd" class-name="vertical-center-modal">
			<Input v-model="title" placeholder="请输入新增系统消息的标题"></Input>
			<Input class="margin-top-20" v-model="content" placeholder="请输入新增系统消息的内容"></Input>
		</Modal>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-shuffle-strong"></Icon>
					系统推送消息
				</p>
				<a href="#" slot="extra" @click.prevent="commentShowAdd = true">
					<Icon type="plus"></Icon>
					发布系统消息
				</a>
				<div class="map-con">
          <Row>
            <Card>
                <span>名称：</span>
                <Input v-model="name1" placeholder="请输入名称" clearable style="width: 200px"></Input>
                <Button class="margin-left-10" type="success" icon="android-add" @click="search">查找</Button>
            </Card>
        </Row>
					<Col span="24">
					  <Table :columns="columns" :data="resultValue"></Table>
              <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                      <Page show-elevator show-sizer @on-page-size-change="changePageSize" :total="count" :current="1" @on-change="changePage"></Page>
                  </div>
              </div>
          </Col>
				</div>
			</Card>
		</Row>
    </div>
</template>

<script>
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import visiteVolume from "./components/visiteVolume.vue";
import serviceRequests from "./components/serviceRequests.vue";
import userFlow from "./components/userFlow.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";
import mapDataTable from "./components/mapDataTable.vue";
import toDoListItem from "./components/toDoListItem.vue";
import xitong from "./service/hong.js";
import Cookies from "js-cookie";
export default {
  name: "home",
  mixins:[xitong],
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      name1:"",
      resultValue: [],
      pageNum:1,
      pageSize:10,
      count:10,
      loading:false,
      showAddNewTodo: false,
      newToDoItemValue: "",
      commentShowAdd: false,
      title: "",
      content: "",
      columns: [
        {
          title: "标题",
          align: "center",
          key: "noticeName"
        },
        {
          title: "内容",
          align: "center",
          key: "noticeContent"
        },
        {
          title: "发布时间",
          align: "center",
          key: "noticeCreatetime"
        },
        {
          title: "操作",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.deleteNotice(params.row.noticeId);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      style: {
                        marginRight: "5px"
                      },
                      props: {
                        size: "small",
                        type: "error",
                        placement: "top"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
      search(){
        this.mockTableData1();
      },
      deleteNotice(val){
        var that=this
          var token = Cookies.get("token");
          var staffId = Cookies.get("staffId");
          var params = {
              token,
              staffId,
              noticeId:val
          };
          if(this.name1 != ""){
            params.noticeName=this.name1
          }
          this.deleteSystemNotice(params)
          .then( res => {
              console.log(res)
              if(res.code==100000){
                  this.$Message.success("删除成功")
                  that.mockTableData1()
              }else{
                  this.$Message.error(res.message)
                  that.xitong=null;
              }
          })
      },
      handleAddNotice(){
        var that=this
        this.loading=true;
        var token = Cookies.get("token");
          var staffId = Cookies.get("staffId");
          var params = {
              token,
              staffId,
              noticeName:this.title,
              noticeContent:this.content,
          };
          this.addSystemNotice(params)
          .then( res => {
              console.log(res)
              if(res.code==100000){
                  this.$Message.success("添加成功")
                  that.mockTableData1();
                  that.loading=false

              }else{
                  this.$Message.error(res.message)
              }
          })
      },
      mockTableData1(){
        var token = Cookies.get("token");
        var staffId = Cookies.get("staffId");
        var params = {
            token,
            staffId,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        if(this.name1 != ""){
          params.noticeName=this.name1
        }
        this.selectSystemNotice(params)
        .then( res => {
            console.log(res)
            if(res.code==100000){
                this.resultValue=res.data;
                this.count=res.count
            }else{
                this.$Message.error(res.message)
            }
        })
      },
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        });
        setTimeout(() => {
          this.newToDoItemValue = "";
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error("请输入待办事项内容");
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = "";
    },
    changePageSize(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.mockTableData1();
    },
    changePage(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.mockTableData1();
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      //   this.tableData1 = this.mockTableData1(pageNum);
    }
  },
  mounted(){
    this.mockTableData1();
  }
};
</script>
