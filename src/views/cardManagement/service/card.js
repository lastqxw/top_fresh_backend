import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询卡券列表
        getLadingList(params) {
            return Util.get('fresh_show/orderTail/getLadingList', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 卡券导入保存信息
        updateLading(params) {
            return Util.get('fresh_show/orderTail/updateLading', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
        // 查询商品列表
        getProduct1(params) {
            return Util.get("fresh_show/pr/selectList_back", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },
        // 卡券批量激活
        updateBatchState(params) {
            return Util.get("fresh_show/orderTail/updateBatchState", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 100000) {
                        return res.data;
                    }

                })
        },

    }
}