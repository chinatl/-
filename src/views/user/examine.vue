<template>
  <div class="layout">
<!--表格-->
  	<div class="filter-container">
		<el-select v-model='hasRealValidate' @change='init'>
			<el-option label='全部审核' value=''></el-option>
			<el-option label='未审核' value='0'></el-option>
			<el-option label='已审核' value='1'></el-option>
		</el-select>
    </div>
    <el-table :key='tableKey' :data="list" border fit highlight-current-row fixed
      style="width: 100%;margin-top:20px">
<!--
<el-table-column align="center" label="用户id" >
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
</el-table-column>
-->
<el-table-column align="center" label="用户昵称">
	<template slot-scope="scope">
					  <span>{{scope.row.nickName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="电话">
	<template slot-scope="scope">
					  <span>{{scope.row.phone}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="邮箱">
	<template slot-scope="scope">
					  <span>{{scope.row.email}}</span>
					</template>
</el-table-column>
<!--
<el-table-column align="center" label="身份证正面">
    <template slot-scope="scope">
					  <span><img :src="scope.row.certificatePath1" alt=""  style='width:50px;height:50px'></span>
					</template>
</el-table-column>
<el-table-column align="center" label="身份证反面">
    <template slot-scope="scope">
					  <span><img :src="scope.row.certificatePath2" alt=""  style='width:50px;height:50px'></span>
					</template>
</el-table-column>
<el-table-column align="center" label="手持身份证照片">
    <template slot-scope="scope">
					  <span><img :src="scope.row.certificatePath3" alt="" style='width:50px;height:50px' @click='$store.commit("open_img",scope.row.certificatePath3)'></span>
					</template>
</el-table-column>
-->
<el-table-column align="center" label="证件是否提交">
	<template slot-scope="scope">
					  <span>{{scope.row.postRealValidate ? "已提交":"未提交"}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="证件是否已审">
	<template slot-scope="scope">
					  <span>{{scope.row.hasRealValidate ? "已审核":"未审核"}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="实名认证">
	<template slot-scope="scope">
					  <span>{{scope.row.isValid ? "已认证":"未认证"}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="提交身份认证时间">
	<template slot-scope="scope">
					  <span>{{scope.row.postRealValidateTime | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="身份认证时间">
	<template slot-scope="scope">
					  <span>{{scope.row.hasRealValidateTime | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>

<el-table-column align="center" label="实名认证" class-name="small-padding">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">详情</el-button>
<!--
		  <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="del_item(scope.row)">删除
		  </el-button>
-->
	</template>
</el-table-column>
<el-table-column align="center" label="商家审核" class-name="small-padding">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item1(scope.row)">详情</el-button>
<!--
		  <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="del_item(scope.row)">删除
		  </el-button>
-->
	</template>
</el-table-column>
</el-table>
<!--弹出层-->
<el-dialog title="认证详情" :visible.sync="show_dialog" width='600px'>
	<el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
		<el-form-item label="真实姓名" prop="type">
			<el-input v-model='form.realName' disabled></el-input>
		</el-form-item>
		<el-form-item label="身份证号" prop="type">
			<el-input v-model='form.iDCardNo' disabled></el-input>
		</el-form-item>
		<el-form-item label="身份证正面（人像）" prop="type">
			<img :src="form.certificatePath1" alt="" style='width:80px;height:80px' @click='$store.commit("open_img",form.certificatePath1)'>
		</el-form-item>
		<el-form-item label="身份证反面（国徽）" prop="type">
			<img :src="form.certificatePath2" alt="" style='width:80px;height:80px' @click='$store.commit("open_img",form.certificatePath2)'>
		</el-form-item>
		<el-form-item label="手持身份证" prop="type">
			<img :src="form.certificatePath3" alt="" style='width:80px;height:80px' @click='$store.commit("open_img",form.certificatePath3)'>
		</el-form-item>
		<el-form-item>
			<el-button @click="cancel_click" size='small'>取 消</el-button>
<!--			<el-button type="primary" @click="agree_click(1)" size='small'>初级审核</el-button>-->
			<el-button type="primary" @click="agree_click(0)" size='small'>高级审核</el-button>
		</el-form-item>
	</el-form>
</el-dialog>

<el-dialog title="商家审核" :visible.sync="show_dialog1" width='600px'>
	<el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
		<el-form-item label="微信收款码" prop="type">
			<img :src="form.ltu.userWechar" alt="" style='width:80px;height:80px' @click='$store.commit("open_img",form.ltu.userWechar)'>
		</el-form-item>
		<el-form-item label="支付宝收款码" prop="type">
			<img :src="form.ltu.userAlipay" alt="" style='width:80px;height:80px' @click='$store.commit("open_img",form.ltu.userAlipay)'>
		</el-form-item>
		<el-form-item label="开户行" prop="type">
			<el-input v-model='form.ltu.userBank' disabled></el-input>
		</el-form-item>
		<el-form-item label="银行卡号" prop="type">
			<el-input v-model='form.ltu.userBankCard' disabled></el-input>
		</el-form-item>
		<el-form-item label="银行卡持有人" prop="type">
			<el-input v-model='form.ltu.userBankUser' disabled></el-input>
		</el-form-item>
		<el-form-item label="持有人手机号" prop="type">
			<el-input v-model='form.ltu.userBankPhone' disabled></el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click="cancel_click1">驳 回</el-button>
			<el-button type="primary" @click="agree_click1">审 核</el-button>
		</el-form-item>
	</el-form>
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
				hasRealValidate:'',
				form: {
					loginName: '', //登录名
					loginPassword: '', //登录密码
					organize: '', //分组
					phone: '', //电话
					email: '', //邮箱
					isStart: '0', //状态（0：开启；1：关闭）
					id: null,
					certificatePath1: '',
					certificatePath2: '',
					certificatePath3: '',
					ltu: {}
				},
				type: 'add',
				title: '数据添加',
				show_dialog: false,
				show_dialog1: false,
				tableKey: 0,
				list: [],
				total: null,
				listQuery: {
					pageNo: 1,
					pageSize: 5,
					nickName: '',
				},
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				Get({
					url: 'log/findUserData',
					data: {
						hasRealValidate: this.hasRealValidate,
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
					},
					success: res => {
						this.list = res.data;
						//                        this.total = res.extra.pageData.totalCount;
					}
				})
			},
			cancel_click() {
				this.init_form();
			},
			cancel_click1() {
				Post({
					url: 'log/updateUserStatus',
					data: {
						id: this.form.id,
						isMerchant: 1
					},
					success: res => {
						this.show_dialog = false;
						this.$notify({
							title: '成功',
							message: '驳回成功！',
							type: 'success',
							duration: 2000
						})
						this.init();
						this.init_form();
					}
				})
			},
			agree_click1() {
				Post({
					url: 'log/updateUserStatus',
					data: {
						id: this.form.id,
						isMerchant: 2
					},
					success: res => {
						this.show_dialog = false;
						this.$notify({
							title: '成功',
							message: '审核成功！',
							type: 'success',
							duration: 2000
						})
						this.init();
						this.init_form();
					}
				})
			},
			agree_click(index) {
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
								message: '通过审核',
								type: 'success',
								duration: 2000
							})
							this.init_form();
							this.init();
						}
					})
				} else {
					if (index) { //进初级
						Post({
							url: 'log/updateUserStatus',
							data: {
								id: this.form.id,
								hasRealValidate: 1
							},
							success: res => {
								this.show_dialog = false;
								this.$notify({
									title: '成功',
									message: '认证成功！',
									type: 'success',
									duration: 2000
								})
								this.init();
								this.init_form();
							}
						})
					} else { //高级
						Post({
							url: 'log/updateUserStatus',
							data: {
								id: this.form.id,
								isValid: 1
							},
							success: res => {
								this.show_dialog = false;
								this.$notify({
									title: '成功',
									message: '认证成功！',
									type: 'success',
									duration: 2000
								})
								this.init();
								this.init_form();
							}
						})
					}

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
				this.show_dialog = true;
				this.type = 'update';
				this.form = Object.assign({}, row);
				this.form.isStart = this.form.isStart + '';
			},
			edit_item1(row) {
				this.show_dialog1 = true;
				this.type = 'update';
				this.form = Object.assign({}, row);
				this.form.isStart = this.form.isStart + '';
			},
			init_form() {
				this.show_dialog = false;
				this.show_dialog1 = false;
				this.form = {
					loginName: '', //登录名
					loginPassword: '', //登录密码
					organize: '', //分组
					phone: '', //电话
					email: '', //邮箱
					isStart: '0', //状态（0：开启；1：关闭）
					id: null,
					ltu: {}

				}

			}

		}
	}

</script>
