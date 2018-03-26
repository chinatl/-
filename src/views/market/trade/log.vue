<template>
  <div class="layout">
    <div class="filter-container">
      <div  class='head_form'>
			<el-select v-model="listQuery.tradeMarket" 
		   	style='width:120px'
			placeholder="请选择"  @change='init'>
				<el-option label='全部' value='all'></el-option>
				<el-option
				  v-for="item in options"
				  :key="item.basisV+'_'+item.shortName"
				  :label="item.basisV+'_'+item.shortName"
				  :value="item.basisV+'_'+item.shortName">
				</el-option>
			</el-select>
		</div>
		<div  class='head_form'>
			<el-select v-model="listQuery.entrustType" 
		   	style='width:120px'
			placeholder="请选择" @change='init'>
				<el-option label='全部方式' value="2"></el-option>
				<el-option label='买入' value="0"></el-option>
				<el-option label='买出' value="1"></el-option>
			</el-select>
		</div>
		<div  class='head_form'>
			<el-select v-model="listQuery.poolStatus" 
		   	style='width:120px'
			placeholder="请选择" @change='init'>
				<el-option label='全部状态' value="4"></el-option>
				<el-option label='未成交' value="0"></el-option>
				<el-option label='完全成交' value="1"></el-option>
				<el-option label='部分成交' value="2"></el-option>
				<el-option label='用户撤销' value="3"></el-option>
			</el-select>
		</div>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="买家名" width="100">
					<template slot-scope="scope">
					  <span>{{scope.row.buyName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="卖家名" width="120">
	<template slot-scope="scope">
					  <span>{{scope.row.sellName || '无'}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易市场">
	<template slot-scope="scope">
					  <span>{{scope.row.tradeMarket}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易单价">
	<template slot-scope="scope">
		  <span>{{scope.row.prize && scope.row.prize.toFixed(2)}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="交易数量">
	<template slot-scope="scope">
		  <span>{{scope.row.amount && scope.row.amount.toFixed(2)}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="交易总金额">
	<template slot-scope="scope">
		  <span>{{scope.row.leftCount  && scope.row.leftCount.toFixed(2)}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="总手续费">
	<template slot-scope="scope">
		  <span>{{scope.row.fees && scope.row.fees.toFixed(2)}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="委托类型">
	<template slot-scope="scope">
		 <span>
		  	{{scope.row.entrustType ? '卖出' : '买入'}}
		</span>
	</template>
</el-table-column>
<el-table-column align="center" label="成交时间">
	<template slot-scope="scope">
		  <span>{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="最后更新时间">
	<template slot-scope="scope">
		  <span>{{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d}')}}</span>
	</template>
</el-table-column>
<el-table-column class-name="status-col" label="状态" width="80" align='center'>
	<template slot-scope="scope">
	  	<span>
		  		{{scope.row.poolStatus === 1 ? '完全成交' : null}}
				{{scope.row.poolStatus === 2 ? '部分成交' : null}}
				{{scope.row.poolStatus === 3 ? '用户撤销' : null}}
				{{scope.row.poolStatus === 4 ? '全部状态' : null}}
				{{scope.row.poolStatus === 0 ? '未成交' : null}}
		</span></template>
</el-table-column>
</el-table>
<!--弹出层-->
<div class="pagination-container page_size">
	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>
</div>
</template>

<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {
		parseTime
	} from '@/utils'
	import Get from '@/api/get.js'
	import Post from '@/api/post.js'
	export default {
		name: 'complexTable',
		directives: {
			waves
		},
		data() {
			return {
				type: 'add',
				options: [],
				tableKey: 0,
				list: [],
				total: null,
				listQuery: {
					pageNo: 1,
					pageSize: 5,
					poolStatus: '4',
					entrustType: '2',
					tradeMarket: 'all'
				},
			}
		},
		created() {
			Get({
				url: 'transaction/findtradingmarket',
				success: res => {
					console.log(res)
					this.options = res.data;
					Get({
						url: 'transaction/findalltransactionmanagement',
						data: {
							poolStatus: '4',
							entrustType: '2',
							tradeMarket: 'all',
						},
						success: res => {
							this.list = res.data;
							this.total = res.extra.pageData.totalCount;
						}
					})
				}
			})

		},
		methods: {
			init() {
				Get({
					url: 'transaction/findalltransactionmanagement',
					data: {
						poolStatus: this.listQuery.poolStatus,
						tradeMarket: this.listQuery.tradeMarket,
						entrustType: this.listQuery.entrustType,
						pageSize: this.listQuery.pageSize,
						pageNo: this.listQuery.pageNo,
					},
					success: res => {
						this.list = res.data;
						this.total = res.extra.pageData.totalCount;
					}
				})
			},
			select_item() {
				this.listQuery.pageNo = 1
				this.init();
			},
			change_select(val) {
				this.init();
			},
			handleSizeChange(val) {
				this.listQuery.pageSize = val
				this.init();
			},
			handleCurrentChange(val) {
				this.listQuery.pageNo = val
				this.init();
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if (j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
			}

		}
	}

</script>
<style>
	.filter-container {
		overflow: hidden
	}
	
	.filter-container .head_form {
		overflow: hidden;
		float: left;
		margin-right: 20px
	}

</style>
