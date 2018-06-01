<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row style="width:80%;display:inline-table">
                    <Col span="6">
                        <span class="margin-left-10">手机号:</span>
				        <Input v-model="phone" placeholder="请输入用户手机号" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="6">
                        <span class="margin-left-10">状态:</span>
                        <Select v-model="type" style="width:200px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style="width:19%;display:inline-table">
                    <Button class="margin-left-20" type="primary" icon="ios-search">查找</Button>
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
                type:"全部",
                phone:"",
                typeList: [
					{
						value: '全部',
						label: '全部'
					},
					{
						value: '正常',
						label: '正常'
					},
					{
						value: '封禁',
						label: '封禁'
					}
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
						title: '用户昵称',
						key: 'name',
						align: 'center',
                    },
                    {
						title: '手机号',
						key: 'phone',
						align: 'center',
                    },
                    {
						title: '代金券数',
						key: 'range',
						align: 'center',
                    },
                    {
						title: '积分',
						key: 'rule',
						align: 'center',
                    },
                    {
						title: '状态',
						key: 'validity',
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
											let argu = { product_id: params.row.id };
											this.$router.push({
												name: 'user-info',
												params: argu
											});
										}
									}
								}, '查看'),
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
								}, '封禁')
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
                        name: i % 3 == 0 ? '王大锤' : '娇儿郎',
                        phone:i % 3 == 0 ? '17615833291' : '15666440735',
						range:i % 3 == 0 ? '12' : '20',
						rule:i % 5 == 0 ? "1024" : '2048',
						validity:"正常",
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