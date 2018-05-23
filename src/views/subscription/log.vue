<template>
  <div class="layout">
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入用户昵称" v-model="listQuery.nickName">
      </el-input>
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入币种名称" v-model="listQuery.shortName">
      </el-input>
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入uid" v-model="listQuery.uid">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" width='80' label='序号'>
				<template slot-scope="scope" >
					{{scope.$index+1}}
				</template>
		</el-table-column>
<el-table-column align="center" label="用户昵称" width="150">
	<template slot-scope="scope">
					  <span>{{scope.row.nickName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="币种名称">
	<template slot-scope="scope">
					  <span>{{scope.row.shortName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="认购份数">
	<template slot-scope="scope">
					  <span>{{scope.row.virtualCopies}}</span>
					</template>
</el-table-column>
<!--
<el-table-column align="center" label="所得份数">
	<template slot-scope="scope">
					  <span>{{scope.row.incomeCopies}}</span>
					</template>
</el-table-column>
-->
<el-table-column align="center" label="认购时间" >
	<template slot-scope="scope" >
					  <span>{{scope.row.subscriptionTime | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
<!--
<el-table-column align="center" label="发币时间">
	<template slot-scope="scope">
					  <span>{{scope.row.issuingTime | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
-->
<!--
<el-table-column align="center" label="所的个数">
	<template slot-scope="scope">
					  <span>{{scope.row.incomeNumber}}</span>
					</template>
</el-table-column>
-->
</el-table>
<!--弹出层-->

<div class="pagination-container page_size">
	  <el-pagination
      background
      @size-change="handleSizeChange"
	  @current-change="handleCurrentChange" 
      :current-page.sync="listQuery.pageNo"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
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
				form: {
					vName: '', 
					shortName: '',
					description: '',
					currencyType: '', 
					decimalPlaces: '', 
					vStatus: '0',
					ip:'',
					port:'',
				},
				type: 'add',
				title: '数据添加',
				show_dialog: false,
				tableKey: 0,
				list: [],
				total: null,
				listQuery: {
					pageNo: 1,
					pageSize: 5,
				},
			}
		},
		created() {
			Get({
				url: 'userSubscription/findAll',
				data: {
				},
				success: res => {
					this.list = res.data;
					// this.total = res.extra.pageData.totalCount;
				}
			})
		},
		methods: {
		      handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePreview(file) {
		        console.log(file);
		      },
			init() {
				Get({
					url: 'userSubscription/findAll',
					data: {
						uid:this.listQuery.uid,
						nickName:this.listQuery.nickName,
						shortName: this.listQuery.shortName,
						virtualCopies: this.listQuery.virtualCopies,
						incomeCopies:this.listQuery.incomeCopies,
						subscriptionTime:this.listQuery.subscriptionTime,
						issuingTime:this.listQuery.issuingTime,
						incomeNumber:this.listQuery.incomeNumber,
					},
					success: res => {
						this.list = res.data;
						// this.total = res.extra.pageData.totalCount;
					}
				})
			},
			cancel_click() {
				this.init_form();
			},
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
			init_form() {
				this.show_dialog = false;
				this.form = {
					loginName: '', //登录名
					loginPassword: '', //登录密码
					organize: '', //分组
					phone: '', //电话
					email: '', //邮箱
					isStart: '0', //状态（0：开启；1：关闭）
					id: null,
					// shortName:''
				}

			}

		}
	}

</script>








