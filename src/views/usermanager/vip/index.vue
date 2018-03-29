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
					label: 'id',
					prop: 'id',
				}, {
					label: 'vip等级',
					prop: 'viplevel',
					type: 'select',
					options: [{
						id: '1',
						value: '1'
					}, {
						id: '2',
						value: "2"
					}, {
						id: '3',
						value: '3'
					}]
				}, {
					type: 'search'
				}, {
					type: 'add'
				}],
				form_data: [{
					label: 'id',
					prop: 'id',
				}, {
					label: 'vip等级',
					prop: 'viplevel',
					type: 'select',
					default: '0',
					options: [{
						id: '1',
						value: '1'
					}, {
						id: '2',
						value: "2"
					}, {
						id: '3',
						value: "3"
					}]
				}, {
					label: '交易总消费金额',
					prop: 'socre',
				}, {
					label: '交易手续费折扣',
					prop: 'tradingPoundageDiscount',
				}, {
					label: '提现手续费折扣',
					prop: 'reflectPoundageDiscount',
				}],
				table_data: [{
					label: 'id',
					prop: 'id',
					width: 80
				}, {
					label: 'vip等级',
					prop: 'viplevel'
				}, {
					label: '交易总消费金额',
					prop: 'socre'
				}, {
					label: '交易手续费折扣',
					prop: 'tradingPoundageDiscount'
				},{
					label: '提现手续费折扣',
					prop: 'reflectPoundageDiscount'
				}, {
					label: '操作',
					type: 'action',
					width: 150
				}],
				url: {
					search: {
						url: 'vip/findallvipuser',
						params: {
							viplevel:'',
						},
					},
					add: {
						url: 'vip/addvipuser',
						params: [{
							name: 'viplevel',
						}, {
							name: 'socre',
						}, {
							name: 'tradingPoundageDiscount',
						}, {
							name: 'reflectPoundageDiscount',
						}]
					},
					update: {
						url: 'vip/updatevipuserbyid',
						params: [
							{
							name: 'id',
						}, {
							name: 'viplevel',
						}, {
							name: 'socre',
						}, {
							name: 'tradingPoundageDiscount',
						}, {
							name: 'reflectPoundageDiscount',
						}]
					},
					update_status: {
						url: 'vip/updateisStart',
						params: [{
							name: 'id',
						}, {
							name: 'viplevel',
						}],
						query: 'viplevel'
					},
					del: {
						url: 'vip/deletevipuserbyid',
						params: [{
							name: 'id',
						}]
					},
					find: {
						url: 'vip/findAllById',
						params: [{
							name: 'viplevel',
						}],
						data: 'viplevel',
						query: 'viplevel',
					}
				}
			}
		}
	}
</script>
