import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询优惠券列表
        selectCouponsList(params) {
            return Util.get('fresh_show/coupons/selectCouponsList', params)
                .then(res => {
                    return res.data
                })
        },
        //查询优惠券详情
        selectByPrimaryKey(params) {
            return Util.get('fresh_show/coupons/selectByPrimaryKey', params)
                .then(res => {
                    return res.data
                })
        },
        // 删除优惠券
        deleteCoupons(params) {
            return Util.get('fresh_show/coupons/deleteCoupons', params)
                .then(res => {
                    return res.data
                })
        },
        // 添加优惠券
        addCoupons(params) {
            return Util.post('fresh_show/coupons/addCoupons', params)
                .then(res => {
                    return res.data
                })
        },
        // 编辑优惠券
        editCoupons(params) {
            return Util.post('fresh_show/coupons/editCoupons', params)
                .then(res => {
                    return res.data
                })
        },
        //查询所有商品
        getProduct(params) {
            return Util.get('fresh_show/pr/selectList_back', params)
                .then(res => {
                    return res.data
                })
        },
        // 红包
        // 查询红包列表以及条件查询
        getRedEnvelope(params) {
            return Util.get("fresh_show/redEnvelope/getRedEnvelope", params)
                .then(res => {
                    return res.data
                })
        },
        // 添加红包
        addRedEnvelope(params) {
            return Util.get("fresh_show/redEnvelope/addRedEnvelope", params)
                .then(res => {
                    return res.data
                })
        },
        // 编辑红包
        editRedEnvelope(params) {
            return Util.get("fresh_show/redEnvelope/editRedEnvelope", params)
                .then(res => {
                    return res.data
                })
        },
        // 删除红包
        deleteRedEnvelope(params) {
            return Util.get("fresh_show/redEnvelope/deleteRedEnvelope", params)
                .then(res => {
                    return res.data
                })
        },
        // 查询红包详情
        getRedEnvelopeInfo(params) {
            return Util.get("fresh_show/redEnvelope/getRedEnvelopeInfo", params)
                .then(res => {
                    return res.data
                })
        },
        // 积分设置查询
        getList(params) {
            return Util.get("fresh_show/score/getList", params)
                .then(res => {
                    return res.data
                })
        },
        // 更新积分设置
        updateScore(params) {
            return Util.get("fresh_show/score/updateScore", params)
                .then(res => {
                    return res.data
                })
        },
    }
}