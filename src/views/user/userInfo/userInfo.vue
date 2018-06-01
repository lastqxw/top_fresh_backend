<style lang="less">
	@import '../../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row>
                    <Col span="6">
                        <span class="margin-left-10">用户手机号:</span>
				        <Input v-model="phone"   readonly style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">用户昵称:</span>
                       	<Input v-model="nickName"  readonly style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">状态:</span>
                       	<Input v-model="type"  readonly style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <Button class="margin-left-20" type="error" >封禁</Button>
                    </Col>
                </Row>
                <Row style='margin-top:20px'>
                    <Col span="6">
                        <span class="margin-left-10">代金券个数:</span>
				        <Input v-model="coupon"   readonly style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">积分数:</span>
                       	<Input v-model="integral"  readonly style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">参与活动次数:</span>
                       	<Input v-model="active"  readonly style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <Button class="margin-left-20" type="info" >发红包</Button>
                    </Col>
                </Row>
               
				
               
				
			</Card>
		</Row>
		<Row style="margin-top:20px;">
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
                coupon:"12个",
                integral:"1024",
                active:"10次",
                type:"正常",
                phone:"17615833291",
                nickName:"王大锤",
				tableData1: this.mockTableData1(10),
				tableColumns1: [
					{
						title: '订单号',
						key: 'id',
						width: 80,
						align: 'center',
					},
					{
						title: '商品名称',
						key: 'name',
						align: 'center',
                    },
                    {
						title: '联系人',
						key: 'contacts',
						align: 'center',
                    },
                    {
						title: '收货地址',
						key: 'address',
						align: 'center',
                    },
                    {
						title: '联系方式',
						key: 'phone',
						align: 'center',
                    },
                    {
						title: '状态',
						key: 'type',
						align: 'center',
                    },
                    {
						title: '下单时间',
						key: 'orderTime',
						align: 'center',
                    },
					{
						title: '操作',
						key: 'action',
						width: 250,
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
											let argu = { product_id: params.row.id };
											this.$router.push({
												name: 'product-info',
												params: argu
											});
										}
									}
                                }, '详情'),
                                h('Button', {
									props: {
										type: 'info',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											let argu = { product_id: params.row.id };
										}
									}
								}, '物流'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								}, '退款')
							]);
						}
					}
				],
			}
		},
		methods: {
			mockTableData1(pageSize) {
				let data = [];
				for (let i = 0; i < pageSize; i++) {
					data.push({
                        id: i + 1,
                        name: i % 3 == 0 ? '阳澄湖大闸蟹4对装礼品卡' : '阳澄湖大闸蟹14对装现货',
                        contacts:"王大锤",
                        address:"山东省济南市历下区舜泰广场九号南楼1102室",
                        phone:'15666440735',
						type:i % 3 == 0 ? '待配送' : '已收货',
						orderTime:i % 5 == 0 ? "2018.03.12 12:12:12" : '2018.06.16 16:16:16',
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
		}
	}
</script>