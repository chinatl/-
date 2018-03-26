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
					prop: 'realName',
				}, {
					label: '证件是否已审',
					prop: 'hasRealValidate',
					type: 'select',
					options: [
						 {
						id: '全部',
						value: '2'
					},{
						id: '未审核',
						value: '0'
					}, {
						id: '已审核',
						value: "1"
					}]
				}, {
					type: 'search'
				}, {
					type: 'add'
				}],
				form_data: [{
					label: '昵称',
					prop: 'nickName',
				}, {
					label: '真实姓名',
					prop: 'realName',
				}, {
					label: '推荐人',
					prop: 'introUserId',
				}, {
					label: '电话',
					prop: 'phone',
				}, {
					label: '身份证',
					prop: 'iDCardNo',
				}, {
					label: '邮箱',
					prop: 'email',
				}, {
					label: '是否已完成实名认证',
					prop: 'isValid',
					type: 'select',
					default: '1',
					options: [{
						id: '通过认证',
						value: '1'
					}, {
						id: '没有认证',
						value: "2"
					}]
				}],
				table_data: [{
					label: '昵称',
					prop: 'nickName',
					width: 100
				}, {
					label: '真实姓名',
					prop: 'realName'
				}, {
					label: '身份证',
					prop: 'iDCardNo'
				}, {
					label: '电话',
					prop: 'phone'
				}, {
					label: '邮箱',
					prop: 'email'
				}, {
					label: '状态',
					prop: 'userStatus',
					type: 'status',
					width: 120
				}, {
					label: '操作',
					type: 'action',
					width: 150
				}],
				url: {
					search: {
						url: 'log/findAll',
						params: {
							hasRealValidate: '2',
							realName: ''
						},
					},
					add: {
						url: 'log/addUser',
						params: [{
							name: 'iDCardNo',
						}, {
							name: 'isValid',
						}, {
							name: 'nickName',
						}, {
							name: 'email',
						}, {
						},{
							name: 'realName',
						}, {
							name: 'introUserId',
						}]
					},
					update: {
						url: 'log/updateUser',
						params: [{
							name: 'id',
						},{
							name: 'iDCardNo',
						}, {
							name: 'isValid',
						}, {
							name: 'nickName',
						}, {
							name: 'email',
						}, {
						},{
							name: 'realName',
						}, {
							name: 'introUserId',
						}]
					},
					update_status: {
						url: 'log/updateUserStatus',
						params: [{
							name: 'id',
						}, {
							name: 'userStatus',
						}],
						query: 'userStatus'
					},
					del: {
						url: 'log/deleteUser',
						params: [{
							name: 'id',
						}]
					},
					find: {
						url: 'log/findIdByName',
						params: [{
							name: 'nickName',
						}],
						data: 'id',//返回的
						query: 'introUserId',
						status:true,
						check_name:true
					}
				}
			}
		}
	}

</script>
