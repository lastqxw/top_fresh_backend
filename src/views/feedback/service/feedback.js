import Util from '../../../libs/util.js'
export default {
    methods: {
        //查询用户反馈
        selectevaluationlist(params) {
            return Util.get('fresh_show/feedback/selectfeedbacklist', params)
                .then(res => {
                    console.log(res)
                    return res.data
                })
        },
    }
}