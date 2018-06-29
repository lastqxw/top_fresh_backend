import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询用户列表
        getStaffList(params) {
            return Util.get('fresh_show/staff/getStaffList', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 查看个人信息详情
        getStaffInfoBack(params) {
            return Util.get('fresh_show/staff/getStaffInfoBack', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 用户封禁
        updateStaffFeng(params) {
            return Util.get('fresh_show/staff/updateStaffFeng', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 用户解封
        updateStaffJie(params) {
            return Util.get('fresh_show/staff/updateStaffJie', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 根据用户ID查询用户所属订单
        selectOrderListBack(params) {
            return Util.get('fresh_show/order/selectOrderList_back', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },

    }
}