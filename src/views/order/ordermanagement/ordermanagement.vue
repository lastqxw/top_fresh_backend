<template>
    <div>
        <Col span="16">
            <Card>
                <p slot="title">
                    <Icon type="android-contact"></Icon>
                    订单管理
                </p>
                <Row>
                    <!--头部表单-->
                    <Col span="18">
                        <Form :model="formTop" label-position="left" inline>
                            <FormItem label="订单号">
                                <Input v-model="formTop.input1"></Input>
                            </FormItem>
                            <FormItem label="类型">
                                <Select v-model="formTop.selectOne">
                                    <Option value="全部">全部</Option>
                                    <Option value="卡卷">卡卷</Option>
                                    <Option value="礼货">礼货</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="状态">
                                <Select v-model="formTop.selectTwo" style="width: 100px;">
                                    <Option value="全部">全部</Option>
                                    <Option value="待付款">待付款</Option>
                                    <Option value="已超时">已超时</Option>
                                    <Option value="待配送">待配送</Option>
                                    <Option value="配送中">配送中</Option>
                                    <Option value="已完成">已完成</Option>
                                    <Option value="退款订单">退款订单</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="时间范围">
                                <FormItem prop="date">
                                    <DatePicker type="date" placeholder="开始时间" v-model="formTop.date"></DatePicker>
                                    <DatePicker type="date" placeholder="结束时间" v-model="formTop.dateEnd"></DatePicker>
                                </FormItem>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="2" style="margin-top: 33px">
                        <Button type="primary" shape="circle" icon="ios-search">查找</Button>
                    </Col>
                </Row>
                <!--底部表格-->
                <div style="margin-bottom: 10px">
                    <Table border :columns="columns" :data="info"></Table>
                </div>
                <ButtonGroup shape="circle">
                    <Button type="ghost">上一页</Button>
                    <Button type="ghost">1/12</Button>
                    <Button type="ghost">上一页</Button>
                </ButtonGroup>
            </Card>
        </Col>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formTop: {
                    input1: '',
                    selectOne: '',
                    selectTwo: '',
                    date: '',
                    dateEnd: ''
                },
                // 表单表头
                columns: [
                    {
                        title: '订单号',
                        key: 'orderNumber'
                    },
                    {
                        title: '商品名称',
                        key: 'productName'
                    },
                    {
                        title: '联系人',
                        key: 'name'
                    },
                    {
                        title: '收货地址',
                        key: 'address'
                    },
                    {
                        title: '联系方式',
                        key: 'contact'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '下单时间',
                        key: 'date'
                    },
                    {
                        title: '管理',
                        key: 'management'
                    }
                ],
                // 表单数据
                info: [
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    },
                    {
                        orderNumber: '3993010',
                        productName: '阳澄湖大闸蟹4对装礼品卡',
                        name: '马云',
                        contact: '17753757670',
                        address: '中国日本省东京市',
                        status: '配送中',
                        date: '2018.03.12 12:12:12',
                        management: '物流 详情 退款'
                    }
                ]
            };
        }
    };
</script>

<style>

</style>
