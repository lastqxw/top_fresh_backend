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
                cityList: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '礼券',
                        label: '礼券'
                    },
                    {
                        value: '现货',
                        label: '现货'
                    }
                ],
                tableData1: this.mockTableData1(10),
                tableColumns1: [
                    {
                        title: '编号',
                        key: 'id',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '功能区',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '设置')
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
                this.tableData1 = this.mockTableData1(pageSize);
            }
        }
    };
</script>
