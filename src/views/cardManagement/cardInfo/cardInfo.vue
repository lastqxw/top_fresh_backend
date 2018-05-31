<style lang="less">
	@import '../../../styles/common.less';
</style>
<style lang="less" scoped>
 
</style>

<template>
	<div>
		<Row>
			<Card>
                 <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    选择文件
                </p>
                <Row style="padding-bottom:10px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        卡券编号
                    </Col>
                    <Col span="12">
                        <Upload
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或拖拽上传文件</p>
                            </div>
                        </Upload>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="6">
                        <span>文件中卡券个数</span>
                         <Input v-model="cardNumber" disabled placeholder="1000个" style="width:200px"></Input>
                    </Col>
                    <Col span="12">
                        <span> 请选择对应的实体商品</span>
                        <Select v-model="type" style="width:200px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="count1" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <Button type="primary" :loading="loading" @click="toLoading">
                            <span v-if="!loading">预览</span>
                            <span v-else>正在生成预览...</span>
                        </Button>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="8">
                        <span>请选择此批卡有效时间</span>
                         <Select v-model="type1" style="width:200px">
                            <Option v-for="item in typeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                        <span>请选择卡券激活状况</span>
                        <Select v-model="type2" style="width:200px">
                            <Option v-for="item in typeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                        <Button type="primary" :loading="loading1" @click="toLoading1">
                            <span v-if="!loading1">保存</span>
                            <span v-else>正在保存...</span>
                        </Button>
                    </Col>
                </Row>
			</Card>
		</Row>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
                count1:"",
                loading:false,
                loading1:false,
                loading2:false,
                cardNumber:'',
                type:"商品1",
                type1:"一年",
                type2:"未激活",
                typeList: [
					{
						value: '商品1',
						label: '商品1'
					},
					{
						value: '商品2',
						label: '商品2'
                    },
                    {
						value: '商品3',
						label: '商品3'
					}
                ],
                typeList1: [
					{
						value: '一年',
						label: '一年'
					},
					{
						value: '两年',
						label: '两年'
                    },
                    {
						value: '三年',
						label: '三年'
					}
                ],
                typeList2: [
					{
						value: '激活',
						label: '激活'
					},
					{
						value: '未激活',
						label: '未激活'
                    }
                ],
               
            }
		},
		methods: {
			 toLoading () {
                this.loading = true;
            },
            toLoading1 () {
                this.loading = true;
            },
            toLoading2 () {
                this.loading = true;
            },
		}
	}
</script>