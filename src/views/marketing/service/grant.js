import Util from '../../../libs/util.js'
export default {
    methods: {
        //设置新注册用户获得的红包和数量
        setRedEnvelope(params) {
            return Util.get('fresh_show/redEnvelope/setRedEnvelope', params)
                .then(res => {
                    return res.data
                })
        },
        //天降红包查询
        selectComeDownRedEnvelope(params) {
            return Util.get('fresh_show/redEnvelope/selectComeDownRedEnvelope', params)
                .then(res => {
                    return res.data
                })
        },
        // 天降红包(绑定用户)
        comeDownRedEnvelope(params) {
            return Util.get('fresh_show/redEnvelope/comeDownRedEnvelope', params)
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
    }
}