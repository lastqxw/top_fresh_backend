import Util from '../libs/util.js'
export default {
    methods:{
        // 登录
        login(params){
            return Util.get('fresh_show/staffC/BackLogin',params)
            .then(res => {
                return res.data
            })
        },
    }
}