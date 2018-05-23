<template>
  <div class="layout">

   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			
<el-table-column align="center" label="用户昵称">
    <template slot-scope="scope">
	  <span>{{scope.row.nickName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="币种">
	<template slot-scope="scope">
	  <span>{{scope.row.shortName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="提现额度">
	<template slot-scope="scope">
	  <span>{{scope.row.value}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="冲向地址">
	<template slot-scope="scope">
	  <span>{{scope.row.address}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="创建时间">
	<template slot-scope="scope">
	  <span>{{scope.row.createtime| parseTime()}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="审核状态">
	<template slot-scope="scope">
		  <span>
		  {{scope.row.statusid === 0 ? '待审核': null}}
		  {{scope.row.statusid === 1 ? '拒绝': null}}
		  {{scope.row.statusid === 2 ? '审核通过': null}}
		  </span>
	</template>
</el-table-column>
<el-table-column align="center" label="操作" width="150" class-name="small-padding">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">审核</el-button>
		  </el-button>
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
			this.init()
		},
		methods: {
			init() {
				Get({
					url: 'CashRecord/findAllCashRecord',
					data: {
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize
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
			agree_click() {
				if (this.type == 'add') {
					Post({
						url: 'wallet/addWalletAddress',
						data: {
							// userId: this.form.userId, 
							shortName: this.form.shortName,
							num: this.form.num,
						},
						success: res => {
							this.show_dialog = false;
							this.$notify({
								title: '成功',
								message: '增加成功',
								type: 'success',
								duration: 2000
							})
							this.init_form();
							this.init();
						}
					})
				} else {
					Post({
						url: 'wallet/addWalletAddress',
						data: {
							shortName: this.form.shortName,
							num: this.form.num,
						},
						success: res => {
							this.show_dialog = false;
							this.$notify({
								title: '成功',
								message: '编辑成功！',
								type: 'success',
								duration: 2000
							})
							this.init();
							this.init_form();
						}
					})
				}
			}, //点击弹出框确认的事件；
			change_status(row) {
				Post({
					url: 'admin/updateisStart',
					data: {
						id: row.id,
						isStart: !row.isStart - 0
					},
					success: res => {
						this.$notify({
							title: '成功',
							message: '更新成功！',
							type: 'success',
							duration: 2000
						})
						this.init_form();
						this.init();
					}
				})
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
			del_item(row, status) {
				Post({
					url: 'subscriptionCurrency/deleteSubscriptionCurrency',
					data: {
						id: row.id
					},
					success: res => {
						this.$notify({
							title: '成功',
							message: '删除成功！',
							type: 'success',
							duration: 2000
						})
						this.init_form();
						this.init();
					}
				})
			},
			add_item() {
				this.show_dialog = true;
				this.type = 'add';
				this.title = '添加';
			},
			edit_item(row) {
				var id = row.id;
				this.$confirm('是否审核通过?', '提示', {
					confirmButtonText: '通过',
					cancelButtonText: '拒绝',
					type: 'warning'
				}).then(() => {
					Post({
						url: 'CashRecord/updateCashRecordStatus',
						data: {
							status: '2',
							id: id
						},
						success: res => {
							this.init()
							this.$message({
								type: 'success',
								message: '审核通过!'
							});
						}
					})
				}).catch(() => {
					Post({
						url: 'CashRecord/updateCashRecordStatus',
						data: {
							status: '1',
							id: id
						},
						success: res => {
							this.init()
							this.$message({
								type: 'success',
								message: '审核未通过'
							});
						}
					})
				});
				//                this.title = '编辑';
				//                this.show_dialog = true;
				//                this.type = 'update';
				//                this.form = Object.assign({}, row);
				//                this.form.isStart = this.form.isStart + '';
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
					id: null
				}

			}

		}
	}

</script>
