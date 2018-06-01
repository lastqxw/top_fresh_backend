<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <div>
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
                model1: '全部',
                tableData1: this.mockTableData1(10),
                tableColumns1: [
                    {
                        title: '订单号',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '联系人',
                        key: 'Object',
                        align: 'center'
                    },
                    {
                        title: '收货地址',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '联系方式',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '下单时间',
                        key: 'Object',
                        align: 'center'
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 150,
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
                                            this.remove(params.index);
                                        }
                                    }
                                }, '发货'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index);
                                        }
                                    }
                                }, '拒单')
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
                        name: '阳澄湖大闸蟹6对礼盒装',
                        type: '商品',
                        Object: '阳澄湖4对装礼品卡',
                        img: '//img12.360buyimg.com/n1/jfs/t19426/264/1610686010/451016/9b083eb8/5ad0334bNde6fb162.jpg',
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
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1(pageSize);
            }
        }
    };
</script>
