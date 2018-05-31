<template>
    <div>
        <Col span="16">
            <Card>
                <p slot="title">
                    <Icon type="android-contact"></Icon>
                    待配送订单
                </p>
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
                        management: '发货 拒单'
                    }
                ]
            };
        }
    };
</script>

<style>

</style>
