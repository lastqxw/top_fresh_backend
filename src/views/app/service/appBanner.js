import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询首页Banner列表
        getBanner(params) {
            return Util.get('fresh_show/banner/selectBannerList_back', params)
                .then(res => {
                    return res.data
                })
        },
        // 删除banner
        removeBanner(params) {
            return Util.get('fresh_show/banner/delBanner_back', params)
                .then(res => {
                    return res.data
                })
        },
        // 添加Banner
        addBanner(params) {
            return Util.get('fresh_show/banner/addBanner_back', params)
                .then(res => {
                    return res.data
                })
        },
        //查询以及获取商品列表
        getProduct(params) {
            return Util.get("fresh_show/pr/selectList_back", params)
                .then(res => {
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },
        // 查询首页推荐商品列表
        selectHotListBack(params) {
            return Util.get("fresh_show/pr/selectHotList_back", params)
                .then(res => {
                    return res.data
                })
        },
        // 添加/删除推荐商品
        updateProIsHotBack(params) {
            return Util.get("fresh_show/pr/updateProIsHot_back", params)
                .then(res => {
                    return res.data;


                })
        },
        // 获取活动列表
        selectlist(params) {
            return Util.get('fresh_show/activity/selectlist', params)
                .then(res => {
                    return res.data
                })
        },
        //保存首页推荐活动
        updateActivity(params) {
            return Util.get('fresh_show/activity/updateHotActivity', params)
                .then(res => {
                    return res.data
                })
        },
        //查询首页宣传配置
        selectContent(params) {
            return Util.get('fresh_show/banner/selectContent', params)
                .then(res => {
                    return res.data
                })
        },
        //查询首页宣传配置
        updataContent(params) {
            return Util.get('fresh_show/banner/updateContent', params)
                .then(res => {
                    return res.data
                })
        },
    }
}