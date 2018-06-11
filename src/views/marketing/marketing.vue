<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row style="width:80%;display:inline-table">
                    <Col span="6">
                        <span class="margin-left-10">类型:</span>
                        <Select v-model="type" style="width:200px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">使用范围:</span>
                        <Select v-model="range" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">折扣价格:</span>
				        <Input v-model="value" placeholder="请输入折扣价格" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">名称:</span>
				        <Input v-model="value1" placeholder="请输入优惠券名称" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="width:19%;display:inline-table">
                    <Button class="margin-left-20" type="primary" icon="ios-search">搜索</Button>
				    <Button class="margin-left-10" type="success" icon="android-add" @click="addCoupon">新增</Button>
                </Row>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="100" :current="1" @on-change="changePage(10)"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				modal2: false,
				modal_loading: false,
                type:"满减券",
                range:"全部类",
                value: '',
                value1:"",
                model1: '全部',
                typeList: [
					{
						value: '满减券',
						label: '满减券'
					},
					{
						value: '直减券',
						label: '直减券'
					}
				],
				cityList: [
					{
						value: '全部类',
						label: '全部类'
					},
					{
						value: '单品类',
						label: '单品类'
					},
					{
						value: '单商品',
						label: '单商品'
					},
				],
				tableData1: this.mockTableData1(10),
				tableColumns1: [
					{
						title: '编号',
						key: 'id',
						width: 80,
						align: 'center',
					},
					{
						title: '名称',
						key: 'name',
						align: 'center',
                    },
                    {
						title: '类型',
						key: 'type',
						align: 'center',
                    },
                    {
						title: '使用范围',
						key: 'range',
						align: 'center',
                    },
                    {
						title: '规则',
						key: 'rule',
						align: 'center',
                    },
                    {
						title: '有效期',
						key: 'validity',
						align: 'center',
                    }, 
                    {
						title: '已发放数量',
						key: 'counted',
						align: 'center',
                    },
                    {
						title: '使用数量',
						key: 'count',
						align: 'center',
                    },
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											let argu = { couponid: params.row.id };
											this.$router.push({
												name: 'market-info',
												params: argu,
											});
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.confirm('删除', params.index);
										}
									}
								}, '删除')
							]);
						}
					}
				],
			}
		},
		methods: {
			confirm (type, index) {
            this.$Modal.confirm({
                title: '你确定要' + type + '吗？',
                onOk: () => {
                    this.$Message.info(type + '成功');
                    this.tableData1.splice(index, 1);
                },
                onCancel: () => {
                    this.$Message.info('取消成功');
                }
            });
        },
			mockTableData1(pageSize) {
				let data = [];
				for (let i = 0; i < pageSize; i++) {
					data.push({
                        id: i + 1,
                        type: i % 2 == 0 ? "满减券" : "直减券",
						name: i % 3 == 0 ? '全品类代金券' : '单商品代金券',
						range:i % 3 == 0 ? '全品类' : '单商品',
						rule:i % 5 == 0 ? "满50减3块" : '直减10块',
						validity:"两个月",
						counted: i % 5 == 0 ? "10000" : '100',
						count:i % 5 == 0 ? "400" : "20"
					})
				}
				return data;
			},
			formatDate(date) {
				const y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			changePage(pageSize) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.tableData1 = this.mockTableData1(pageSize);
			},
			addCoupon(){
				this.$router.push({
					name: 'market-info',
					params: {
						couponid:0,
					},
				});
			}
		}
	}
</script>