import Util from '../../../libs/util.js'
export default {
    methods: {
        //新增系统公告
        addSystemNotice(params) {
            return Util.get('fresh_show/sysnotice/addSystemNotice', params)
                .then(res => {
                    return res.data
                })
        },
        //查询公告列表
        selectSystemNotice(params) {
            return Util.get('fresh_show/sysnotice/selectSystemNotice', params)
                .then(res => {
                    return res.data
                })
        },
        // 删除公告
        deleteSystemNotice(params) {
            return Util.get('fresh_show/sysnotice/deleteSystemNotice', params)
                .then(res => {
                    return res.data
                })
        },
    }
}