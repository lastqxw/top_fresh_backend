import Util from '../../../libs/util.js'
export default {
    methods:{
        //查询以及获取官网头条列表
        selectTopline(params){
            return Util.get("fresh_show/topline/selectTopline",params)
            .then(res => {
                   return res.data;
            })
		},
		// 添加头条
		addTopline(params){
            return Util.get("fresh_show/topline/addTopline",params)
            .then(res => {
                   return res.data;       
            })
		},
		// 删除头条
		deleteTopline(params){
            return Util.get("fresh_show/topline/deleteTopline",params)
            .then(res => {
                   return res.data;
            })
		},
    }
}