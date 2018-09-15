import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询用户列表
        getStaffList(params) {
            return Util.get('fresh_show/staff/getStaffList', params)
                .then(res => {
                    return res.data
                })
        },
        // 查看个人信息详情
        getStaffInfoBack(params) {
            return Util.get('fresh_show/staff/getStaffInfoBack', params)
                .then(res => {
                    return res.data
                })
        },
        // 用户封禁
        updateStaffFeng(params) {
            return Util.get('fresh_show/staff/updateStaffFeng', params)
                .then(res => {
                    return res.data
                })
        },
        // 用户解封
        updateStaffJie(params) {
            return Util.get('fresh_show/staff/updateStaffJie', params)
                .then(res => {
                    return res.data
                })
        },
        // 根据用户ID查询用户所属订单
        selectOrderListBack(params) {
            return Util.get('fresh_show/order/selectOrderList_back', params)
                .then(res => {
                    return res.data
                })
        },
        // 查询红包列表
        getRedEnvelope(params) {
            return Util.get("fresh_show/redEnvelope/getRedEnvelope", params)
                .then(res => {
                    return res.data
                })
        },
        // 物流查询
        chaxun(params) {
            return Util.post('fresh_show/staffC/kuaidiCode', params)
                .then(res => {
                    return res.data
                })
        },
        // 单用户发红包
        comeDownRedEnvelope(params) {
            return Util.get('fresh_show/redEnvelope/comeDownRedEnvelope', params)
                .then(res => {
                    return res.data
                })
		},
		
    }
}