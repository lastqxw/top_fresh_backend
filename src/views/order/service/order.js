import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询订单列表
        selectOrderListBack(params) {
            return Util.get('fresh_show/order/selectOrderList_back', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 查看dian详情
        selectOrderPrimaryKeyBack(params) {
            return Util.get('fresh_show/order/selectOrderPrimaryKey_back', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 订单发货
        sendOrderBack(params) {
            return Util.get('fresh_show/order/sendOrder_back', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },

    }
}