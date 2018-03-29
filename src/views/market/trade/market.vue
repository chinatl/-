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
				},{
					label: '标题',
					prop: 'shortName',
				}, {
					label: '交易状态',
					prop: 'tradeType',
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
					label: '基础市场id',
					prop: 'basisId',
				}, {
					label: '涨幅限制',
					prop: 'roseLimit',
				}, {
					label: '跌幅限制',
					prop: 'fallLimit',
				}, {
					label: '最大卖出价',
					prop: 'maxSellPrize',
				},{
					label: '昨天收盘价',
					prop: 'yesterdayShou',
				},{
					label: '今日开盘价',
					prop: 'todayKai',
				},{
					label: '买入手续费',
					prop: 'buyCost',
				},{
					label: '卖出手续费',
					prop: 'sellCost',
				}, {
					label: '买单交易最小数量',
					prop: 'buyMinTradeSum',
				},{
					label: '卖单交易最小数量',
					prop: 'sellMinTradeSum',
				},{
					label: '交易状态',
					prop: 'tradeType',
					type: 'select',
					default: '0',
					options: [{
						id: '开启',
						value: '0'
					}, {
						id: '关闭',
						value: "1"
					}]
				},{
					label: '买家赠送是否开启',
					prop: 'buySendState',
					type: 'select',
					default: '0',
					options: [{
						id: '开启',
						value: '0'
					}, {
						id: '关闭',
						value: "1"
					}]
				},{
					label: '卖家赠送是否开启',
					prop: 'sellSendState',
					type: 'select',
					default: '0',
					options: [{
						id: '开启',
						value: '0'
					}, {
						id: '关闭',
						value: "1"
					}]
				},{
					label: '买家赠送币种ID',
					prop: 'buySendCurrId',
				},{
					label: '卖家赠送币种ID',
					prop: 'sellSendCurrId',
				},{
					label: '买家自己赠送比例',
					prop: 'buySendScaleSelf',
				},{
					label: '买家一代赠送比例',
					prop: 'buySendScale1',
				},{
					label: '买家二代赠送比例',
					prop: 'buySendScale2',
				},{
					label: '买家三代赠送比例',
					prop: 'buySendScale3',
				},{
					label: '卖家自己赠送比例',
					prop: 'sellSendScaleSelf',
				},{
					label: '卖家一代赠送比例',
					prop: 'sellSendScale1',
				},{
					label: '卖家二代赠送比例',
					prop: 'sellSendScale2',
				},{
					label: '卖家三代赠送比例',
					prop: 'sellSendScale3',
				}],
				table_data: [{
					label: '用户名',
					prop: 'id',
					width: 80
				},  {
					label: '英文名称',
					prop: 'basisV'
				},{
					label: '市场标题',
					prop: 'vName'
				}, {
					label: '最大价格',
					prop: 'maxPrize'
				},{
					label: '最小价格',
					prop: 'minPrize'
				},{
					label: '最新价格',
					prop: 'latestPrize'
				},{
					label: '成交量',
					prop: 'tradeAmount'
				},{
					label: '日涨跌',
					prop: 'roseFall'
				},{
					label: '买入手续费',
					prop: 'buyCost'
				},{
					label: '卖出手续费',
					prop: 'sellCost'
				},{
					label: '状态',
					prop: 'tradeType',
					type: 'status',
					width: 120
				}, {
					label: '操作',
					type: 'action',
					width: 150
				}],
				url: {
					search: {
						url: 'currencyManage/findAll',
						params: {
							tradeType: '',
							nickName: '',
							basisV:''
						},
					},
					add: {
						url: 'currencyManage/addCurrencyManage',
						params: [{
							name: 'currId',

						}, {
							name: 'basisId',
						}, {
							name: 'roseLimit',
						}, {
							name: 'fallLimit',
						}, {
							name: 'maxSellPrize',
						}, {
							name: 'yesterdayShou',
						}, {
							name: 'todayKai',
						}, {
							name: 'buyCost',
						}, {
							name: 'sellCost',
						}, {
							name: 'buyMinTradeSum',
						}, {
							name: 'sellMinTradeSum',
						}, {
							name: 'tradeType',
						}, {
							name: 'buySendState',
						}, {
							name: 'sellSendState',
						}, {
							name: 'buySendCurrId',
						}, {
							name: 'sellSendCurrId',
						}, {
							name: 'buySendScaleSelf',
						}, {
							name: 'buySendScale1',
						}, {
							name: 'buySendScale2',
						}, {
							name: 'buySendScale3',
						}, {
							name: 'sellSendScaleSelf',
						}, {
							name: 'sellSendScale1',
						}, {
							name: 'sellSendScale2',
						}, {
							name: 'sellSendScale3',
						}]
					},
					update: {
						url: 'currencyManage/updateCurrencyManage',
						params: [{
							name: 'id',
						}, {
							name: 'roseLimit',
						}, {
							name: 'fallLimit'
						}, {
							name: 'buyCost',
						}, {
							name: 'sellCost',
						}, {
							name: 'buyMinTradeSum',
						}, {
							name: 'sellMinTradeSum',
						}, {
							name: 'tradeType',
						},{
							name: 'buySendState',
						},{
							name: 'sellSendState',
						},{
							name: 'buySendCurrId',
						},{
							name: 'sellSendCurrId',
						},{
							name: 'buySendScaleSelf',
						},{
							name: 'buySendScale1',
						},{
							name: 'buySendScale2',
						},{
							name: 'buySendScale3',
						},{
							name: 'sellSendScaleSelf',
						},{
							name: 'sellSendScale1',
						},{
							name: 'sellSendScale2',
						},{
							name: 'sellSendScale3',
						}]
					},
					update_status: {
						url: 'currencyManage/updateTradeType',
						params: [{
							name: 'id',
						}, {
							name: 'tradeType',
						}],
						query: 'tradeType'
					},
					del: {
						url: 'currencyManage/deleteCurrencyManage',
						params: [{
							name: 'id',
						}]
					},
					find: {
						url: 'currencyManage/findAllById',
						params: [{
							name: 'id',
						}],
						data: 'id',
						query: 'id',
						status:true
					}
				}
			}
		}
	}

</script>
