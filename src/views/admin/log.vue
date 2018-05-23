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
				},
//                            {
//					label: '操作类型',
//					prop: 'isStart',
//					type: 'select',
//					options: [{
//						id: '开启',
//						value: '0'
//					}, {
//						id: '禁用',
//						value: "1"
//					}, {
//						id: '全部',
//						value: '2'
//					}]
//				},
                            {
					type: 'search'
				}
//                    , {
//					type: 'add'
//				}
                           ],
				form_data: [{
					label: '用户名',
					prop: 'loginName',
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
				},{
					label: 'ip地址',
					prop: 'ipAddress'
				}, {
					label: '登录地址',
					prop: 'loginAddress'
				}, {
					label: '登录时间',
					prop: 'loginTime'
				}],
				url: {
					search: {
						url: 'userLog/findAllAdminLog',
						params: {
							isStart: '2',
							nickName: ''
						},
					},
					add: {
						url: 'adminLog/addAdminLog',
						params: [{
							name: 'id',
						}, {
							name: 'adminId',
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
						url: 'adminLog/updateAdminLog',
						params: [{
							name: 'id',
						}, {
							name: 'adminId',
						},{
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
						url: 'adminLog/updateIsStart',
						params: [{
							name: 'id',
						}, {
							name: 'isStart',
						}],
						query: 'isStart'
					},
					del: {
						url: 'adminLog/deleteAdminLog',
						params: [{
							name: 'id',
						}]
					},
					find: {
						url: 'adminLog/findAllById',
						params: [{
							name: 'nickName',
						}],
						data: 'id',
						query: 'userId'
					}
				}
			}
		}
	}
</script>