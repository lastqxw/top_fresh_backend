import Util from '../../../libs/util.js'
export default {
    methods: {
        //添加优惠券
        addActivity(params) {
            return Util.get('fresh_show/activity/addActivity', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 获取优惠券列表
        selectCouponsList(params) {
            return Util.get('fresh_show/coupons/selectCouponsList', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 活动--根据活动id查询优惠券列表
        selectCouponsList(params) {
            return Util.get('fresh_show/coupons/selectCouponsList', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 添加活动内容
        editCoupons(params) {
            return Util.get('fresh_show/coupons/editCoupons', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 获取活动列表
        selectlist(params) {
            return Util.get('fresh_show/activity/selectlist', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 获取活动详情
        selectByPrimaryKey(params) {
            return Util.get('fresh_show/activity/selectByPrimaryKey', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 修改活动详情
        updateActivity(params) {
            return Util.get('fresh_show/activity/updateActivity', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 删除活动
        deleteActivity(params) {
            return Util.get('fresh_show/activity/deleteActivity', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 新增/删除商品集锦
        updateProBack(params) {
            return Util.get('fresh_show//pr/updatePro_back', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 商品特辑商品列表查询
        selectListBack(params) {
            return Util.get('fresh_show//pr/selectList_back', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 商品列表查询
        getProduct(params) {
            return Util.get("fresh_show/pr/selectList_back", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },
        // 添加拼团数据  fresh_show/togetherOrder/addTogetherOrderInfo
        addTogetherOrderInfo(params) {
            return Util.get("fresh_show/togetherOrder/addTogetherOrderInfo", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },
        // 查询拼团商品  fresh_show/togetherOrder/getTogetherOrderListHT
        getTogetherOrderListHT(params) {
            return Util.get("fresh_show/togetherOrder/getTogetherOrderListHT", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },
        // 删除拼团商品
        deleteTogetherOrderInfo(params) {
            return Util.get("fresh_show/togetherOrder/deleteTogetherOrderInfo", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },

    }
}