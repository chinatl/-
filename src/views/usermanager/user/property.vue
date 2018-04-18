<template>
  <div class="layout">
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
      		<el-table-column align="center" label="序号" width="80" type="index"
      :index="indexMethod" >
			</el-table-column>
			<el-table-column align="center" label="用户名" >
					<template slot-scope="scope">
					  <span>{{scope.row.nickName}}</span>
					</template>
			</el-table-column>

			<el-table-column align="center" label="操作"  class-name="small-padding">
				<template slot-scope="scope">
					  <el-button type="primary" size="mini" @click="edit_item(scope.row)">查看详情</el-button><
				</template>
			</el-table-column>
	</el-table>
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
	<el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="币种名称" >
					<template slot-scope="scope">
					  <span>{{scope.row.vName}}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="冻结数量" >
					<template slot-scope="scope">
					  <span>{{scope.row.frozenTotal}}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="总数量" >
					<template slot-scope="scope">
					  <span>{{scope.row.vTotal}}</span>
					</template>
			</el-table-column>

	</el-table>
</el-dialog>
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
					loginName: '', //登录名
					loginPassword: '', //登录密码
					organize: '', //分组
					phone: '', //电话
					email: '', //邮箱
					isStart: '0', //状态（0：开启；1：关闭）
					id: null
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
					isStart: '2',
					loginName: '',
				},
			}
		},
		created() {
			Get({
				url: 'virtualWallet/findAll',
				data: {
					
				},
				success: res => {
					this.list = res.data;
					this.total = res.extra.pageData.totalCount;
				}
			})
		},
		methods: {
			indexMethod(index) {
		        return index + 1;
		      },
		   
			init() {
				Get({
					url: 'virtualWallet/findAll',
					data: {
						isStart: this.listQuery.isStart,
						pageNo: this.listQuery.pageNo,
						loginName: this.listQuery.loginName,
						pageSize: this.listQuery.pageSize,
					},
					success: res => {
						this.list = res.data;
						this.total = res.extra.pageData.totalCount;
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
			edit_item(row) {
				this.title = '详情';
				this.show_dialog = true;
				this.type = 'update';
				this.form = Object.assign({},row);
				Get({
					url: 'virtualWallet/findVirtualIdCount',
					data: {},
					success: res => {}
				})
			},
			init_form() {
				this.show_dialog = false;
				this.form = {
					// loginName: '', //登录名
					// loginPassword: '', //登录密码
					// organize: '', //分组
					// phone: '', //电话
					// email: '', //邮箱
					// isStart: '0', //状态（0：开启；1：关闭）
					// id: null
				}

			}

		}
	}

</script>
