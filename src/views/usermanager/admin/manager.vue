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
					label: '真实姓名',
					prop: 'loginName',
				}, {
					label: '操作类型',
					prop: 'isStart',
					type: 'select',
					options: [{
						id: '开启',
						value: '0'
					}, {
						id: '禁用',
						value: "1"
					}, {
						id: '全部',
						value: '2'
					}]
				}, {
					type: 'search'
				}, {
					type: 'add'
				}],
				form_data: [{
					label: '登录名',
					prop: 'loginName',
				}, {
					label: '登录密码',
					prop: 'loginPassword',
				}, {
					label: '分组',
					prop: 'organize',
				}, {
					label: '电话',
					prop: 'phone',
				}, {
					label: '邮箱',
					prop: 'email',
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
					prop: 'loginName',
					width: 80
				}, {
					label: '分组',
					prop: 'organize'
				}, {
					label: '手机号',
					prop: 'phone'
				}, {
					label: '邮箱',
					prop: 'email'
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
						url: 'admin/findAll',
						params: {
							isStart: '2',
							loginName: ''
						},
					},
					add: {
						url: 'admin/addAdmin',
						params: [{
							name: 'loginName',

						}, {
							name: 'loginPassword',
						}, {
							name: 'organize',
						}, {
							name: 'phone',
						}, {
							name: 'email',
						}, {
							name: 'isStart',
							type: 'status'
						}]
					},
					update: {
						url: 'admin/updateAdmin',
						params: [{
							name: 'id',
						}, {
							name: 'loginName',
						},{
							name: 'loginPassword',
						}, {
							name: 'organize'
						}, {
							name: 'phone',
						}, {
							name: 'email',
						}, {
							name: 'isStart',
							type: 'status'
						}]
					},
					update_status: {
						url: 'admin/updateisStart',
						params: [{
							name: 'id',
						}, {
							name: 'isStart',
						}],
						query: 'isStart'
					},
					del: {
						url: 'admin/deleteAdmin',
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
						query: 'userId',
					}
				}
			}
		}
	}
</script>
