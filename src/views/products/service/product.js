import Util from '../../../libs/util.js'
export default {
    methods:{
        //查询以及获取商品列表
        getProduct(params){
            return Util.get("fresh_show/pr/selectList_back",params)
            .then(res => {
                console.log(res.data)
                if(res.data.code==100000){
                   return res.data;
                }
                
            })
        },
        // 删除商品
        removeProduct(params){
            return Util.get('/fresh_show/pr/delPro_back',params)
            .then( res => {
                console.log(res)
                return res.data
            })
        },
        // 添加商品
        addProduct(params){
            return Util.post('fresh_show/pr/addPro_back',params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 修改商品
        updateProduct(params){
            return Util.get('fresh_show/pr/updatePro_back',params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 查询商品详情
        selectProduct(params){
            return Util.get('fresh_show/pro/selectProDetaiById',params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 保存轮播图
        saveProImg(params){
            return Util.get("fresh_show/img/saveProImg",params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 删除轮播图
        deteleProImg(params){
            return Util.get("fresh_show/img/deteleProImg",params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 修改轮播图
        updateProImg(params){
            return Util.get("fresh_show/img/updateProImg",params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 查询商品评价
        selectevaluationlist(params){
            return Util.get("fresh_show/evaluation/selectevaluationlist",params)
            .then(res => {
                console.log(res)
                return res.data
            })
        },
        // 删除商品评价
        deleteEvaluation(params){
            return Util.get("fresh_show/evaluation/deleteEvaluation",params)
            .then(res => {
                console.log(res)
                return res.data
            })
        }
    }
}