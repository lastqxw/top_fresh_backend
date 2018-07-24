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
            return Util.post("fresh_show/topline/addTopline",params)
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
		// 修改头条
		updataTopline(params){
            return Util.post("fresh_show/topline/updateTopline",params)
            .then(res => {
                   return res.data;
            })
		},
		// 留言列表
		selectMessage(params){
            return Util.get("fresh_show/message/selectMessage",params)
            .then(res => {
                   return res.data;
            })
		},
		// 删除留言
		deleteMessage(params){
            return Util.get("fresh_show/message/deleteMessage",params)
            .then(res => {
                   return res.data;
            })
		},
		//新增/修改官网商品
		addNetPro(params){
            return Util.get("fresh_show/NetPro/addNetPro",params)
            .then(res => {
                   return res.data;
            })
		},
		//查询官网商品
		getlist(params){
            return Util.get("fresh_show/NetPro/getlist",params)
            .then(res => {
                   return res.data;
            })
		},
		// 删除官网商品
		delNetPro(params){
            return Util.get("fresh_show/NetPro/delNetPro",params)
            .then(res => {
                   return res.data;
            })
		},

    }
}