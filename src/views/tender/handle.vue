<template>
  <div class="layout">
<!--
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入真实姓名" v-model="listQuery.loginName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
-->
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
<!--
<el-table-column align="center" label="币种标识">
    <template slot-scope="scope">
	  	<span>QC</span>
	</template>
</el-table-column>
-->
<el-table-column align="center" label="昵称">
	<template slot-scope="scope">
					  <span>{{scope.row.nickName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="订单建立时间">
	<template slot-scope="scope">
					  <span>{{scope.row.create_time | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易类型">
	<template slot-scope="scope">
					  <span>{{scope.row.sell_buy ? '卖出' : '买入'}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="订单状态">
	<template slot-scope="scope">
					  <span>
					  {{scope.row.pool_status === 0 ? '未成交' : null}}
					  {{scope.row.pool_status === 1 ? '完全成交' : null}}
					  {{scope.row.pool_status === 2 ? '部分成交' : null}}
					  {{scope.row.pool_status === 3 ? '用户撤销' : null}}
					  {{scope.row.pool_status === 4 ? '后台撤销' : null}}
					  {{scope.row.pool_status === 5 ? '买方已付款' : null}}
					  {{scope.row.pool_status === 6 ? '卖方确认交易' : null}}
					  {{scope.row.pool_status === 7 ? '后台确认交易' : null}}
					  {{scope.row.pool_status === 8 ? '请求后台确认' : null}}
					  {{scope.row.pool_status === 9 ? '取消交易' : null}}
					  </span>
					</template>
</el-table-column>
<el-table-column align="center" label="卖家上传图片">
	<template slot-scope="scope">
					  <img :src="scope.row.deal_img" alt="" style='width:40px;width:40px' @click='$store.commit("open_img",scope.row.deal_img)'>
					</template>
</el-table-column>
<!--
<el-table-column align="center" label="图片上传时间">
    <template slot-scope="scope">
					  <span>{{scope.row.deal_time | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
-->
<el-table-column align="center" label="付款方式">
	<template slot-scope="scope">
					  <span>
					  	{{scope.row.payment === '0' ? '银行卡' : null}}
					  	{{scope.row.payment === '1' ? '支付宝' : null}}
					  	{{scope.row.payment === '2' ? '微信' : null}}
					  </span>
					</template>
</el-table-column>
<el-table-column align="center" label="单价">
	<template slot-scope="scope">
					  <span>{{scope.row.prize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="数量">
	<template slot-scope="scope">
					  <span>{{scope.row.amount}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作" width="200" class-name="small-padding">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)" v-if='!scope.row.pool_status'>确认交易</el-button>
		  </el-button>	
		  <el-button type="danger" size="mini" @click="cancel_item(scope.row)" v-if='!scope.row.pool_status'>取消交易</el-button>
		  </el-button>
	</template>
</el-table-column>
</el-table>
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
	<el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
		<el-form-item label="币种标识" prop="type">
			<el-input v-model='form.shortName' disabled></el-input>
		</el-form-item>
		<el-form-item label="数量" prop="type">
			<el-input v-model='form.num'></el-input>
		</el-form-item>

		<!-- <el-form-item label="状态">
			<el-select style="width:200px" v-model="form.isStart">
				<el-option label="开启" value="0"></el-option>
				<el-option label="关闭" value="1"></el-option>
			</el-select>
		</el-form-item> -->
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="cancel_click">取 消</el-button>
		<el-button type="primary" @click="agree_click">确 定</el-button>
	</div>
</el-dialog>
<!--
<div class="pagination-container page_size">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</div>
-->
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
					url: 'fb/lookOrder',
					data: {
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
						poolStatus: 8
					},
					success: res => {
						this.list = res.data;
						this.total = res.extra.pageData.totalCount;
					}
				})
			},
			cancel_item(row) {
				var url = '';
				if (!row.sell_buy) {
					url = 'fb/cancelOrderOut';
				} else {
					url = 'fb/cancelOrderIn';
				}
				this.$confirm('是否取消交易?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					Post({
						url: url,
						data: {
							orderid: row.id
						},
						success: res => {
							if (res.code === 0) {
								this.$message({
									message: res.data,
									type: 'success',
									duration: 2000
								})
								this.init();
							} else {
								this.$message({
									message: res.data,
									type: 'error',
									duration: 2000
								})
							}

						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
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
				var url = '';
				if (!row.sell_buy) {
					url = 'fb/orderOkOut';
				} else {
					url = 'fb/orderOkIn';
				}
				this.$confirm('是否确认交易?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					Post({
						url: url,
						data: {
							orderid: row.id
						},
						success: res => {
							if (res.code === 0) {
								this.$message({
									message: res.data,
									type: 'success',
									duration: 2000
								})
								this.init();
							} else {
								this.$message({
									message: res.data,
									type: 'error',
									duration: 2000
								})
							}

						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
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
