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
					type: 'search'
				}],
				form_data: [{
					label: '用户名',
					prop: 'nickName',
				}, {
					label: 'ip地址',
					prop: 'ipAddress',
				}, {
					label: '登陆地址',
					prop: 'loginAddress',
				}, {
					label: '登录时间',
					prop: 'loginTime',
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
				}, {
					label: 'ip地址',
					prop: 'ipAddress',
				}, {
					label: '登陆地址',
					prop: 'loginAddress',
				}, {
					label: '登录时间',
					prop: 'loginTime',
				}, ],
				url: {
					search: {
						url: 'userLog/findAll',
						params: {
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
