<template>
	<tl-table 
		:headData ='head_data'
		:formData ='form_data'
		:tableData ='table_data'
		:urlData ='url'
	></tl-table>
</template>

<script>
	import tlTable from '@/components/Table';
	export default {
		components: {
			tlTable
		},
		data() {
			return {
				head_data: [{
					label: '币种名称',
					prop: 'vName',
				}, {
					label: '操作类型',
					prop: 'isStart',
					type: 'select',
					options: [
						{
						id: '全部',
						value: '2'
					},{
						id: '开启',
						value: '0'
					}, {
						id: '关闭',
						value: "1"
					}]
				}, {
					type: 'search'
				}, {
					type: 'add'
				}],
				form_data: [{
					label: '币种id',
					prop: 'virtualId',
					width: 80
				}, {
					label: '发行总份数',
					prop: 'circulation'
				}, {
					label: '发行总个数',
					prop: 'issueNumber'
				}, {
					label: '剩余份数',
					prop: 'surplusCopies'
				}, {
					label: '剩余个数',
					prop: 'surplusNumber'
				}, {
					label: '每份个数',
					prop: 'eachNumber'
				}, {
					label: '交易规则',
					prop: 'explain'
				}, {
					label: '备注',
					prop: 'remark'
				}, {
					label: '最大认购份数',
					prop: 'maxCopies'
				}, {
					label: '发行开始时间',
					prop: 'startTime',
					type:'date'
				}, {
					label: '发行结束时间',
					prop: 'endTime',
					type:'date'
				}],
				table_data: [{
					label: '币种id',
					prop: 'virtualId',
					width: 80
				}, {
					label: '发行总份数',
					prop: 'circulation'
				}, {
					label: '发行总个数',
					prop: 'issueNumber'
				}, {
					label: '剩余份数',
					prop: 'surplusCopies'
				}, {
					label: '剩余个数',
					prop: 'surplusNumber'
				}, {
					label: '每份个数',
					prop: 'eachNumber'
				}, {
					label: '交易规则',
					prop: 'explain'
				}, {
					label: '备注',
					prop: 'remark'
				}, {
					label: '最大认购份数',
					prop: 'maxCopies'
				}, {
					label: '发行开始时间',
					prop: 'startTime',
				}, {
					label: '发行结束时间',
					prop: 'endTime',
				}, {
					label: '操作',
					type: 'action',
					width: 150
				}],
				url: {
					search: {
						url: 'subscription/findAll',
						params: {
							vName: ''
						},
					},
					add: {
						url: 'subscription/addSubscription',
						params: [{
							name: 'virtualId',
						}, {
							name: 'circulation',
						}, {
							name: 'issueNumber',
						}, {
							name: 'surplusCopies',
						}, {
							name: 'surplusNumber',
						}, {
							name: 'eachNumber',
						}, {
							name: 'explain',
						}, {
							name: 'remark',
						}, {
							name: 'maxCopies',
						}, {
							name: 'startTime',
						}, {
							name: 'endTime',
						}]
					},
					update: {
						url: 'subscription/updateSubscription',
						params: [{
							name: 'id',
						},{
							name: 'virtualId',
						}, {
							name: 'circulation'
						}, {
							name: 'issueNumber',
						}, {
							name: 'surplusCopies',
						}, {
							name: 'surplusNumber',
						}, {
							name: 'eachNumber',
						}, {
							name: 'explain',
						}, {
							name: 'remark',
						}, {
							name: 'maxCopies',
						}, {
							name: 'startTime',
						}, {
							name: 'endTime',
						}]
					},
					update_status: {
						url: 'subscription/updateIsStart',
						params: [{
							name: 'id',
						}, {
							name: 'vName',
						}],
						query: 'vName'
					},
					del: {
						url: 'subscription/updateSubscription',
						params: [{
							name: 'id',
						}]
					},
					find: {
						url: 'subscription/findAll',
						params: [{
							name: 'id',
						}],
						data: 'id',
						query: 'virtualId',
						status:true
					}
				}
			}
		}
	}

</script>


