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
                    触发式红包
                </p>
                <Row style="padding-bottom:10px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        新注册用户，获取红包：
                    </Col>
                    <Col span="12">
                        <Select v-model="type" style="width:200px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="count" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        订单实际付款金额满N元时，获取红包：
                    </Col>
                    <Col span="12">
                        <Input v-model="money" placeholder="请输入订单金额" clearable style="width: 200px"></Input>
                        <Select v-model="type1" style="width:200px">
                            <Option v-for="item in typeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="count1" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        用户第一次下单，获取红包：
                    </Col>
                    <Col span="12">
                        <Select v-model="type2" style="width:200px">
                            <Option v-for="item in typeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="count2" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                    
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        用户下单后分享，好友领红包：
                    </Col>
                    <Col span="12">
                        <Select v-model="type3" style="width:200px">
                            <Option v-for="item in typeList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="count3" placeholder="请设置总共分发红包个数" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec" >
                    <Col span="12">
                               
                    </Col>
                    <Col span="12">
                    <Button type="primary" :loading="loading" @click="toLoading">
                        <span v-if="!loading">保存</span>
                        <span v-else>正在提交...</span>
                    </Button>
                    </Col>
                </Row>
			</Card>
            <Card style="margin-top:20px">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    天降式红包
                </p>
                <Row style="padding-bottom:13px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        <span>手机号：</span>
                        <Input v-model="phone" placeholder="请输入手机号" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="12">
                        <span>用户注册时长：</span>
                        <Input v-model="time" placeholder="请输入用户注册时长（单位 年）" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                    
                    </Col>
                    <Col span="12">
                        <span>某段时间的消费情况:</span>
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                        <Input v-model="consumption" placeholder="请输入消费金额" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                 <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="18">
                        <span>某段时间购买过某类或某种商品:</span>
                        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                        <Select v-model="type4" style="width:200px">
                            <Option v-for="item in typeList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="consumption" placeholder="请输入消费金额" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <Button type="primary" :loading="loading1" @click="toLoading1">
                            <span v-if="!loading">筛选</span>
                            <span v-else>正在进行条件筛选...</span>
                        </Button>
                    </Col>
                </Row>
                 <Row style="padding-bottom:13px;padding-top:20px;border-bottom:1px solid #e9eaec">
                    <Col span="12">
                        筛选出目标用户个数：{{people}}人
                    </Col>
                    <Col span="12">
                        <Button type="warning" :loading="loading1" @click="toLoading1">
                            <span v-if="!loading">发放优惠券</span>
                            <span v-else>正在进行优惠券的发放...</span>
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
                people:20,
                consumption:"",
                phone:"",
                time:"",
                loading: false,
                loading1: false,
                count:"",
                count1:"",
                count2:"",
                count3:"",
                money:"",
                type:"请选择红包",
                type1:"请选择红包",
                type2:"请选择红包",
                type3:"请选择红包",
                type4:"请选择商品种类",
                typeList: [
					{
						value: '请选择红包',
						label: '请选择红包'
					},
					{
						value: '新人专享红包',
						label: '新人专享红包'
                    },
                    {
						value: '老用户专享红包',
						label: '老用户专享红包'
					}
                ],
                typeList4: [
					{
						value: '请选择商品种类',
						label: '请选择商品种类'
					},
					{
						value: '全部',
						label: '全部'
                    },
                    {
						value: '礼券类',
						label: '礼券类'
                    },
                    {
						value: '实体类',
						label: '实体类'
					}
                ],
                typeList1: [
					{
						value: '请选择红包',
						label: '请选择红包'
					},
					{
						value: '新人专享红包',
						label: '新人专享红包'
                    },
                    {
						value: '老用户专享红包',
						label: '老用户专享红包'
					}
                ],
                typeList2: [
					{
						value: '请选择红包',
						label: '请选择红包'
					},
					{
						value: '新人专享红包',
						label: '新人专享红包'
                    },
                    {
						value: '老用户专享红包',
						label: '老用户专享红包'
					}
                ],
                typeList3: [
					{
						value: '请选择红包',
						label: '请选择红包'
					},
					{
						value: '新人专享红包',
						label: '新人专享红包'
                    },
                    {
						value: '老用户专享红包',
						label: '老用户专享红包'
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
		}
	}
</script>