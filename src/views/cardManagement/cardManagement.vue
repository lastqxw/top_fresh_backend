<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
                <Row style="width:80%;display:inline-table">
                    <Col span="6">
                        <span class="margin-left-10">卡券编号:</span>
				        <Input v-model="number" placeholder="请输入卡券编号" clearable style="width: 200px"></Input>
                    </Col>
                     <Col span="6">
                        <span class="margin-left-10">卡券名称:</span>
				        <Input v-model="name" placeholder="请输入卡券名称" clearable style="width: 200px"></Input>
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
                    <Button class="margin-left-20" type="info" icon="ios-plus-outline" @click="toPlush">录入卡券</Button>
                </Row>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
				<div style="margin: 10px;overflow: hidden">
                    <div style="float:left">
                        <Button type="primary">批量导出</Button>
                    </div>
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
                name:"",
                number:"",

                typeList: [
					{
						value: '全部',
						label: '全部'
					},
					{
						value: '已激活',
						label: '已激活'
					},
					{
						value: '未激活',
						label: '未激活'
					},
					{
						value: '已使用',
						label: '已使用'
                    },
					{
						value: '未使用',
						label: '未使用'
					}
				],
				tableData1: this.mockTableData1(10),
				tableColumns1: [
					{
						title: '卡券编号',
						key: 'id',
						width: 80,
						align: 'center',
					},
					{
						title: '有效期',
						key: 'validity',
						align: 'center',
                    },
                    {
						title: '卡券状态',
						key: 'type',
						align: 'center',
                    },
                    {
						title: '卡券卡密',
						key: 'cam',
						align: 'center',
                    },
                    {
						title: '录入时间',
						key: 'entry',
						align: 'center',
                    },
                    {
						title: '激活时间',
						key: 'activation',
						align: 'center',
                    },
                    {
						title: '使用人',
						key: 'name',
						align: 'center',
                    },
                    {
						title: '使用时间',
						key: 'useTime',
						align: 'center',
                    },
					{
						title: '管理',
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
							]);
						}
                    },
                    { 
                        title:' ',
                        key: 'checkbox',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Checkbox', {
									style: {
										marginRight: '5px'
									},
								}, ''),
							]);
						}

                    }
				],
			}
		},
		methods: {
			toPlush(){
				this.$router.push({
					name: 'card-info',
					
				});
			},
			mockTableData1(pageSize) {
				let data = [];
				for (let i = 0; i < pageSize; i++) {
					data.push({
                        id: '12354331',
                        type:"未使用",
                        cam:'JKHKHGGKJ',
                        entry:'2018-03-21',
                        activation:'无',
                        name: '无',
                        useTime:'无',
						validity:"3年",
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