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
					label: '用户名',
					prop: 'nickName',
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
					label: '用户名',
					prop: 'nickName',
				}, {
					label: '操作类型',
					prop: 'type',
				}, {
					label: 'IP地址',
					prop: 'ip',
				}, {
					label: '登录地址',
					prop: 'loginAddress',
				}, {
					label: '备注',
					prop: 'remark',
				}, {
					label: '状态',
					prop: 'isStart',
					type: 'select',
					default: '0',
					options: [{
						id: '启用',
						value: '0'
					}, {
						id: '关闭',
						value: "1"
					}]
				}],
				table_data: [{
					label: '用户名',
					prop: 'nickName',
					width: 80
				}, {
					label: '操作类型',
					prop: 'type'
				}, {
					label: 'IP',
					prop: 'ip'
				}, {
					label: '登录地址',
					prop: 'loginAddress'
				}, {
					label: '备注',
					prop: 'remark'
				}, {
					label: '状态',
					prop: 'isStart',
					type: 'status',
					width: 120
				}, {
					label: '操作',
					type: 'action',
					width: 150
				}],
				url: {
					search: {
						url: 'userLog/findAll',
						params: {
							isStart: '2',
							nickName: ''
						},
					},
					add: {
						url: 'userLog/addUserLog',
						params: [{
							name: 'userId',

						}, {
							name: 'type',
						}, {
							name: 'ip',
						}, {
							name: 'loginAddress',
						}, {
							name: 'remark',
						}, {
							name: 'isStart',
							type: 'status'
						}]
					},
					update: {
						url: 'userLog/updateUserLog',
						params: [{
							name: 'id',
						}, {
							name: 'type',
						}, {
							name: 'userId'
						}, {
							name: 'ip',
						}, {
							name: 'loginAddress',
						}, {
							name: 'remark',
						}, {
							name: 'isStart',
							type: 'status'
						}]
					},
					update_status: {
						url: 'userLog/updateIsStart',
						params: [{
							name: 'id',
						}, {
							name: 'isStart',
						}],
						query: 'isStart'
					},
					del: {
						url: 'userLog/deleteUserLog',
						params: [{
							name: 'id',
						}]
					},
					find: {
						url: 'log/findIdByName',
						params: [{
							name: 'nickName',
						}],
						data: 'id',
						query: 'userId',
						status:true
					}
				}
			}
		}
	}

</script>
