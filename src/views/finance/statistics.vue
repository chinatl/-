<template>
  <div class="dashboard-editor-container">
<!--    <github-corner></github-corner>-->

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>

<!--
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart></raddar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
-->
  
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
           <div style="margin:20px 0">
           <label for="">选择币种</label>
           	<el-select v-model='listQuery.vcid' @change='init'> 
           		<el-option v-for='item in options' :label='item.shortName' :value='item.id'></el-option>
           	</el-select>
           	<span style='margin:0 10px'>总额</span> {{amount}}
           </div>
            <el-table :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
                <el-table-column align="center" label="用户名字" >
					<template slot-scope="scope">
					  <span>{{scope.row.nname}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="币种名称">
	<template slot-scope="scope">
														  <span>{{scope.row.vname}}</span>
														</template>
</el-table-column>
<el-table-column align="center" label="余额">
	<template slot-scope="scope">
	  <span>{{scope.row.total}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="冻结金额">
	<template slot-scope="scope">
	  <span>{{scope.row.ftotal}}</span>
	</template>
</el-table-column>

</el-table>
<div class="pagination-container page_size" style="margin-bottom:20px">
	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>
</el-row>

<!--<el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table></transaction-table>
      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <todo-list></todo-list>
      </el-col>
      <el-col :xs="{span: 12}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}">
        <box-card></box-card>
      </el-col>
    </el-row>-->

</div>
</template>

<script>
	import Get from '@/api/get'
	//import GithubCorner from '@/components/GithubCorner'
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'
	//import RaddarChart from './components/RaddarChart'
	//import PieChart from './components/PieChart'
	import BarChart from './components/BarChart'
	//import TransactionTable from './components/TransactionTable'
	//import TodoList from './components/TodoList'
	//import BoxCard from './components/BoxCard'

	const lineChartData = {
		newVisitis: {
			expectedData: [100, 120, 161, 134, 105, 160, 165],
			actualData: [120, 82, 91, 154, 162, 140, 145]
		},
		messages: {
			expectedData: [200, 192, 120, 144, 160, 130, 140],
			actualData: [180, 160, 151, 106, 145, 150, 130]
		},
		purchases: {
			expectedData: [80, 100, 121, 104, 105, 90, 100],
			actualData: [120, 90, 100, 138, 142, 130, 130]
		},
		shoppings: {
			expectedData: [130, 140, 141, 142, 145, 150, 160],
			actualData: [120, 82, 91, 154, 162, 140, 130]
		}
	}

	export default {
		name: 'dashboard-admin',
		components: {
			//    GithubCorner,
			PanelGroup,
			LineChart,
			//    RaddarChart,
			//    PieChart,
			BarChart,
			//    TransactionTable,
			//    TodoList,
			//    BoxCard
		},

		data() {
			return {
				lineChartData: lineChartData.newVisitis,
				total: 5,
				list: [],
				options: [],
				amount:'',
				listQuery: {
					pageNo: 1,
					pageSize: 5,
					vcid: '',
				},
			}
		},
		methods: {
			handleSetLineChartData(type) {
				return
				this.lineChartData = lineChartData[type]
			},
			handleCurrentChange(e) {
				this.pageNo = e;
				this.init(this.pageSize, this.pageSize)
			},
			handleSizeChange(e) {
				this.pageSize = e;
				this.init(this.pageSize, this.pageSize)
			},
			init() {
				Get({
					url: 'total/showVU',
					data: {
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
						vcid: this.listQuery.vcid,
					},
					success: res => {
						this.list = res.data.data.list;
						this.amount = res.data.amount;
						this.total = res.data.data.pageData.totalCount;
					}
				})
			},
		},
		created() {
			Get({
				url: 'currencyManagement/findAll?pageSize=40',
				success: res => {
					this.options = res.data;
					this.options.unshift({
						shortName: '全部币种',
						id: ''
					})
					this.init()
				}
			})
		}
	}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard-editor-container {
		padding: 32px;
		background-color: rgb(240, 242, 245);
		.chart-wrapper {
			background: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}

</style>
