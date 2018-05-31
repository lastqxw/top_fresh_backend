<style lang="less">
	@import '../../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row style="width:80%;display:inline-table">
                    <Col span="12">
                        <span class="margin-left-10">名称:</span>
				        <Input v-model="value" placeholder="请输入代金券名称" clearable style="width: 200px"></Input>
                    </Col>
                    <Col span="12">
                        <span class="margin-left-10">代金券个数:</span>
				        <Input v-model="value1" placeholder="请输入代金券个数" clearable style="width: 200px"></Input>
                    </Col>
                </Row>
                <Row style="width:19%;display:inline-table">
                    <Button class="margin-left-20" type="primary" icon="ios-search">搜索</Button>
				    <Button class="margin-left-10" type="success" icon="android-add">新增</Button>
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
                value: '',
                value1:"",
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
						title: '内容',
						key: 'type',
						align: 'center',
                    },
                    {
						title: '代金券个数',
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
											let argu = { product_id: params.row.id };
											this.$router.push({
												name: 'product-info',
												params: argu
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
											this.remove(params.index)
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
			mockTableData1(pageSize) {
				let data = [];
				for (let i = 0; i < pageSize; i++) {
					data.push({
                        id: i + 1,
                        type: i % 2 == 0 ? "某代金券X1 某代金券X2 某直减券X3" : "某代金券X1 某代金券X2",
						name: i % 3 == 0 ? '新人专享红包' : '首单专享红包',
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
		}
	}
</script>