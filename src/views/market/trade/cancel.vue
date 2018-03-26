<template>
  <div class="layout">
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入真实姓名" v-model="listQuery.loginName">
      </el-input>
      <el-select  style="width:200px"  v-model="listQuery.isStart" placeholder="全部状态">
        <el-option label="全部状态" value="2"></el-option>
        <el-option label="已启用" value="1"></el-option>
        <el-option label="未启用" value="0"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="用户名" width="80">
					<template slot-scope="scope">
					  <span>{{scope.row.loginName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="所在组" width="80">
	<template slot-scope="scope">
					  <span>{{scope.row.organize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="手机号">
	<template slot-scope="scope">
					  <span>{{scope.row.phone}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="邮箱">
	<template slot-scope="scope">
					  <span>{{scope.row.email}}</span>
					</template>
</el-table-column>
<el-table-column class-name="status-col" label="状态" width="80" align='center'>
	<template slot-scope="scope">
					<el-button size="mini" :type="scope.row.isStart ? 'warning' : 'success' " @click='change_status(scope.row)'>{{scope.row.isStart ? "关闭":"开启"}}</el-button>
				</template>
</el-table-column>
<el-table-column align="center" label="操作" width="150" class-name="small-padding">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">编辑</el-button>
		  <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="del_item(scope.row)">删除
		  </el-button>
	</template>
</el-table-column>
</el-table>
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
	<el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
		<el-form-item label="登录名" prop="type">
			<el-input v-model='form.loginName'></el-input>
		</el-form-item>
		<el-form-item label="登录密码" prop="type">
			<el-input v-model='form.loginPassword'></el-input>
		</el-form-item>
		<el-form-item label="分组" prop="type">
			<el-input v-model='form.organize'></el-input>
		</el-form-item>
		<el-form-item label="电话" prop="type">
			<el-input v-model='form.phone'></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="type">
			<el-input v-model='form.email'></el-input>
		</el-form-item>

		<el-form-item label="状态">
			<el-select style="width:200px" v-model="form.isStart">
				<el-option label="开启" value="0"></el-option>
				<el-option label="关闭" value="1"></el-option>
			</el-select>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="cancel_click">取 消</el-button>
		<el-button type="primary" @click="agree_click">确 定</el-button>
	</div>
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
				url: 'admin/findAll',
				data: {
					isStart: '2',
					loginName: ''
				},
				success: res => {
					this.list = res.data;
					this.total = res.extra.pageData.totalCount;
				}
			})
		},
		methods: {
			init() {
				Get({
					url: 'admin/findAll',
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
			agree_click() {
				if (this.type == 'add') {
					Post({
						url: '/admin/addAdmin',
						data: {
							loginName: this.form.loginName, //身份证
							loginPassword: this.form.loginPassword, //是否已完成实名认证（1,通过认证:2,没有认证）
							organize: this.form.organize, //昵称
							email: this.form.emai, //邮箱
							phone: this.form.phone, //电话
							isStart: this.form.isStart, //真实姓名
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
						url: '/admin/updateUser',
						data: {
							id: this.form.loginName.id,
							loginName: this.form.loginName, //身份证
							loginPassword: this.form.loginPassword, //是否已完成实名认证（1,通过认证:2,没有认证）
							organize: this.form.organize, //昵称
							email: this.form.emai, //邮箱
							phone: this.form.phone, //电话
							isStart: this.form.isStart, //真实姓名
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
					url: 'admin/deleteAdmin',
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
				this.title = '编辑';
				this.show_dialog = true;
				this.type = 'update';
				this.form = Object.assign({},row);
				this.form.isStart = this.form.isStart +'';
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
