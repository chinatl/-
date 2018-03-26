<template>
  <div class="layout">
    <div class="filter-container">
		<div  class='head_form'>
			<el-select v-model="listQuery.tradeMarket" 
		   	style='width:120px'
			placeholder="请选择"  @change='init'>
				<el-option label='全部' value=''></el-option>
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
		<div  class='head_form'>
			<el-input v-model='listQuery.id' placeholder='请输入用户订单号'></el-input>
		</div>
		<div  class='head_form'>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
		</div>
   
    </div>
<!--表格-->
    <el-table :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
		<el-table-column align="center" width='80' label='订单号'>
				<template slot-scope="scope" >
					{{scope.row.id}}
				</template>
		</el-table-column>	
		<el-table-column align="center"  label='买方'>
				<template slot-scope="scope" >
					{{scope.row.buyName}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='120' label='交易市场'>
				<template slot-scope="scope" >
					{{scope.row.tradeMarket}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='120' label='交易市场'>
				<template slot-scope="scope" >
					{{scope.row.tradeMarket}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='80' label='委托类型'>
				<template slot-scope="scope" >
					{{scope.row.entrustType ? '卖出' :"买入"}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='120' label='委托时间'>
				<template slot-scope="scope" >
					{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='80' label='交易价格'>
				<template slot-scope="scope" >
					{{scope.row.prize && scope.row.prize.toFixed(2) }}
				</template>
		</el-table-column>
		<el-table-column align="center" label='交易数量'>
				<template slot-scope="scope" >
					{{scope.row.amount && scope.row.amount.toFixed(2) }}
				</template>
		</el-table-column>
		<el-table-column align="center" label='已成交量'>
				<template slot-scope="scope" >
					{{scope.row.leftAmount && scope.row.leftAmount.toFixed(2) }}
				</template>
		</el-table-column>
		<el-table-column align="center" label='状态'>
				<template slot-scope="scope" >
					{{scope.row.poolStatus === 1 ? '完全成交' : null}}
					{{scope.row.poolStatus === 2 ? '部分成交' : null}}
					{{scope.row.poolStatus === 3 ? '用户撤销' : null}}
					{{scope.row.poolStatus === 4 ? '全部状态' : null}}
					{{scope.row.poolStatus === 0 ? '未成交' : null}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='120' label='最后更新时间'>
				<template slot-scope="scope" >
					{{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d}')}}
				</template>
		</el-table-column>
		<el-table-column align="center" width='120' label='交易折算金额'>
				<template slot-scope="scope" >
					{{scope.row.poolCount}}
				</template>
		</el-table-column>
		<el-table-column align="center" label='交易总额'>
				<template slot-scope="scope" >
					{{scope.row.leftCount && scope.row.leftCount.toFixed(2)}}
				</template>
		</el-table-column>
		<el-table-column align="center" label='手续费'>
				<template slot-scope="scope" >
					{{scope.row.leftFees && scope.row.leftFees.toFixed(2)}}
				</template>
		</el-table-column>
		<el-table-column align="center" label='剩余手续费'>
				<template slot-scope="scope" >
					{{scope.row.leftFees && scope.row.leftFees.toFixed(2)}}
				</template>
		</el-table-column>
		<el-table-column align="center" label='操作'>
				<template slot-scope="scope" >
					取消委托
				</template>
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
				list: [],
				total: null,
				options: [],
				listQuery: {
					pageNo: 1,
					pageSize: 5,
					tradeMarket: '',
					id: '',
					entrustType: '2',
					poolStatus: '4'
				}
			}
		},
		created() {
			Get({
				url: 'transaction/findtradingmarket',
				success: res => {
					this.options = res.data;
					Get({
						url: 'transaction/findalltransactionmanagement',
						data: {
							tradeMarket: '',
							id: '',
							entrustType: '2',
							poolStatus: '4'
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
			extend(default_obj, product_obj) {
				for (var k in default_obj) {
					default_obj[k] = product_obj[k]
				}
				return default_obj
			},
			/*将第二个对象的属性赋值到第一个对象上*/
			init(k) {
				Get({
					url: 'transaction/findalltransactionmanagement',
					data: this.listQuery,
					success: res => {
						this.list = res.data;
						this.total = res.extra.pageData.totalCount;
					}
				})
			},
			change_status(row) {
				//
				
				
				
			}, //修改状态
			select_item() {
				this.listQuery.page = 1
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
			del_item(row, status) {
				/*	Post({
						url: this.delete_url.url,
						data: params_data,
						success: res => {
							this.$notify({
								title: '成功',
								message: '删除成功！',
								type: 'success',
								duration: 2000
							})
							this.init();
						}
					})*/
			},

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
