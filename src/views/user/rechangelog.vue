<template>
  <div class="layout">

   <div class="filter-container">
      <el-select v-model='listQuery.type' @change='init'>
      	<el-option value='' label='全部类型'></el-option>
      	<el-option value='1' label='充值'></el-option>
      	<el-option value='2' label='提现'></el-option>
      </el-select>
    </div>
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			
<el-table-column align="center" label="用户昵称">
    <template slot-scope="scope">
	  <span>{{scope.row.nickName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="记账类型">
	<template slot-scope="scope">
	  <span>
	  		{{scope.row.type === 1 ? '充值' : '提现'}}
	  </span>
	</template>
</el-table-column>
<el-table-column align="center" label="币种类型">
	<template slot-scope="scope">
	  <span>
	  		{{scope.row.currency_type === 0 ? '比特':null}}
	  		{{scope.row.currency_type === 1 ? '以太':null}}
	  		{{scope.row.currency_type === 2 ? 'sc':null}}
	  </span>
	</template>
</el-table-column>
<el-table-column align="center" label="币种标识">
	<template slot-scope="scope">
	  <span>{{scope.row.short_name}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="确认次数">
	<template slot-scope="scope">
	  <span>{{scope.row.confirmation_num}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="金额">
	<template slot-scope="scope">
	  <span>{{scope.row.recharge_num}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="处理时间">
	<template slot-scope="scope">
	  <span>{{scope.row.time | parseTime('{y}-{m}-{d}')}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="到账状态">
	<template slot-scope="scope">
	  <span>{{scope.row.account_status ? '已到账' : '未到账'}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="钱包地址">
	<template slot-scope="scope">
	  <span>{{scope.row.wallet_address}}</span>
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
					type: '',
				},
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				Get({
					url: 'rechargeRecord/findAll',
					data: {
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
						type: this.listQuery.type,
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
