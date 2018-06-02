<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <div>
        <Row>
            <Card>
                <span>订单号：</span>
                <Input v-model="value" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
                <span class="margin-left-10">类型：</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="margin-left-10">状态：</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span class="margin-left-10">时间范围：</span>
                <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></DatePicker>
                <Button class="margin-left-10" type="success" icon="android-add" @click="Search">查找</Button>
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
        <!--物流-->
        <Modal
                v-model="Logistics"
                title="物流详情">
            <ul class="logistics">
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    济南市|济南市【济南历城五部001】，【吴虎/15688882514】正在派件
                </li>
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    济南市|到济南市【济南历城五部001】
                </li>
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    济南市|济南市【济南转运中心】，正发往【济南历城五部001】
                </li>
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    济南市|到济南市【济南转运中心】
                </li>
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    金华市|金华市【义乌转运中心】，正发往【济南转运中心】
                </li>
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    金华市|金华市【义乌转运中心】，正发往【济南转运中心】
                </li>
                <li>
                    <p>2018年6月2日 上午8:54:49</p>
                    金华市|金华市【义乌转运中心】，正发往【济南转运中心】
                </li>
            </ul>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
                model1: '全部',
                Refund: false,
                Logistics: false,
                cityList: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '卡券',
                        label: '卡券'
                    },
                    {
                        value: '现货',
                        label: '现货'
                    }
                ],
                statusList: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '待付款',
                        label: '待付款'
                    },
                    {
                        value: '已超时',
                        label: '已超时'
                    },
                    {
                        value: '待配送',
                        label: '待配送'
                    },
                    {
                        value: '配送中',
                        label: '配送中'
                    },
                    {
                        value: '已完成',
                        label: '已完成'
                    },
                    {
                        value: '退款订单',
                        label: '退款订单'
                    }
                ],
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
                        title: '状态',
                        key: 'Object',
                        align: 'center'
                    },
                    {
                        title: '下单时间',
                        key: 'Object',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.Logistics = true;
                                        }
                                    }
                                }, '物流'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let argu = { id: params.row.id };
                                            this.$router.push({
                                                name: 'ordermanagement-info',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.confirm();
                                        }
                                    }
                                }, '退款')
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            Search () {
                alert('判断不为空，向后台发送数据，给表格重新赋值')
            },
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
            confirm () {
                this.$Modal.confirm({
                    title: '你确定要退款吗？',
                    onOk: () => {
                        this.$Message.info('退款成功');
                    },
                    onCancel: () => {
                        this.$Message.info('取消成功');
                    }
                });
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
<style lang="less" scoped>
    li{
        list-style: none;
    }
    .logistics{
        p{
            margin-top: 10px;
            margin-bottom: 10px;
            color: #f54040;
        }
    }
</style>
