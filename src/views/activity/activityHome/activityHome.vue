<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <div>
        <Row>
            <Card>
                <span>活动名称：</span>
                <Input v-model="value" placeholder="请输入" clearable style="width: 200px"></Input>
                <span class="margin-left-10">类型：</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="margin-left-10">状态：</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in objectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button class="margin-left-10" type="primary" icon="ios-search">查找</Button>
                <Button class="margin-left-10" type="success" icon="android-add">新增</Button>
            </Card>
        </Row>
        <Row>
            <Card>
                <Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page show-elevator show-sizer @on-page-size-change="changePage" :total="100" :current="1" @on-change="changePage(10)"></Page>
                    </div>
                </div>
            </Card>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
                model1: '',
                model2: '',
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                cityList: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '优惠卷领取',
                        label: '优惠卷领取'
                    },
                    {
                        value: '多人拼团',
                        label: '多人拼团'
                    },
                    {
                        value: '商品集锦',
                        label: '商品集锦'
                    },
                    {
                        value: '静态活动展示',
                        label: '静态活动展示'
                    },
                    {
                        value: '外链活动',
                        label: '外链活动'
                    }
                ],
                objectList: [
                    {
                        value: '进行中',
                        label: '进行中'
                    },
                    {
                        value: '已完成',
                        label: '已完成'
                    }
                ],
                tableData1: this.mockTableData1(10),
                tableColumns1: [
                    {
                        title: '序号',
                        key: 'id',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '活动名称',
                        key: 'activityName',
                        align: 'center'
                    },
                    {
                        title: '主图',
                        key: 'img',
                        align: 'center',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.img,
                                    width: 100,
                                    height: 100
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
                        title: '活动时间',
                        key: 'activityDate',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '热度',
                        key: 'heat',
                        align: 'center'
                    },
                    {
                        title: '参与人数',
                        key: 'numberOfpeople',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            mockTableData1 (pageSize) {
                let data = [];
                for (let i = 0; i < pageSize; i++) {
                    data.push({
                        id: i + 1,
                        activityName: '阳澄湖大闸蟹8对',
                        img: '//img12.360buyimg.com/n1/jfs/t19426/264/1610686010/451016/9b083eb8/5ad0334bNde6fb162.jpg',
                        activityDate: '2018.03.21-2018.04.21',
                        status: '已完成',
                        type: '多人拼团',
                        heat: '10000',
                        numberOfpeople: '199'
                    });
                }
                return data;
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage (pageSize) {
                this.tableData1 = this.mockTableData1(pageSize);
            }
        },
        mounted () {
        }
    };
</script>
