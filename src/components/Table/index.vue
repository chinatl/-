<template>
  <div class="layout">
    <div class="filter-container">
		<div v-for='item in head_data' class='head_form'>
			<el-input v-model='listQuery[item.prop]' v-if='item.type === undefined' :placeholder='item.label'></el-input>
			<el-select v-model="listQuery[item.prop]" 
		   	style='width:120px'
			placeholder="请选择" value-key="id" v-if='item.type === "select"' @change='init'>
				<el-option
				  v-for="(item,i) in item.options"
				  :key="item.id"
				  :label="item.id"
				  :value="item.value">
				</el-option>
			</el-select>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item" v-if='item.type === "search"'>搜索</el-button>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-edit" @click="add_item" v-if='item.type === "add"'>添加</el-button>
		</div>
    </div>
<!--表格-->
    <el-table :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
		<el-table-column align="center" :label="item.label" v-for='item in table_data' :width='item.width'>
			<template 
			slot-scope="scope" >
				<span 
					v-if='item.type === undefined'>{{scope.row[item.prop]}}</span>
					<span v-if='item.type === "date"'>{{scope.row[item.prop] | parseTime('{y}-{m}-{d}')}}</span>
				<el-button size="mini"
					v-if='item.type === "status"'
					:type="scope.row[item.prop] ? 'warning' : 'success' "
					:disabled='item.status'
					@click='change_status(scope.row)'>{{scope.row[item.prop] ? "关闭":"开启"}}</el-button>
				<el-button 
					type="primary" 
					size="mini"
					v-if="item.type === 'action'"
					@click="edit_item(scope.row)">编辑</el-button>
				<el-button 
					size="mini" 
					type="danger"
					v-if="item.type === 'action'"
					@click="del_item(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
	<el-form ref="dataForm" label-position="right" label-width="160px" style='width: 400px; margin-left:50px;'>
		<el-form-item prop="type" v-for='item in form_data' :label="item.label+'：'">
			<el-input v-model='form[item.prop]' v-if='item.type === undefined'></el-input>
			<el-select v-model="form[item.prop]" placeholder="请选择" value-key="id" v-if='item.type === "select"'>
				<el-option v-for="(item,i) in item.options" :key="item.id" :label="item.id" :value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="cancel_click">取 消</el-button>
		<el-button type="primary" @click="agree_click">确 定</el-button>
	</div>
</el-dialog>
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
		props: ['urlData', 'headData', 'formData', 'tableData'],
		data() {
			return {
				head_data: [],
				form_data: [],
				table_data: [],
				url: {

				},
				form: {

				},
				type: 'add',
				title: '数据添加',
				show_dialog: false,
				list: [],
				total: null,
				listQuery: {
					pageNo: 1,
					pageSize: 5,
				},
				search_url: {
					url: '',
					params: {

					}
				},
				add_url: {
					url: '',
					params: {

					}
				},
				update_url: {
					url: '',
					params: {

					}
				},
				update_status_url: {
					url: '',
					params: {

					}
				},
				delete_url: {
					url: '',
					params: {

					}
				},
				find_url: {
					url: '',
					params: {

					},
				}
			}
		},
		created() {
			/*表单数据*/
			this.form_data = Object.assign({}, this.$props.formData);
			for (var i = 0; i < this.$props.formData.length; i++) {
				let v = this.$props.formData[i];
				if (v.type == 'select') {
					this.form[v.name] = v.default;
				} else {
					this.form[v.name] = '';
				}
			};
			/*初始化顶部查询*/
			var temp_search = Object.assign({},this.$props.urlData.search.params)
			this.listQuery = Object.assign(this.$props.urlData.search.params, this.listQuery)
			this.head_data = Object.assign({}, this.$props.headData);
			this.table_data = Object.assign({}, this.$props.tableData);
			/*初始化查询接口*/
			this.search_url.url = this.$props.urlData.search.url;
			this.search_url.params = this.listQuery;
			/*初始化添加接口*/
			this.add_url.url = this.$props.urlData.add.url;
			for (var j = 0; j < this.$props.urlData.add.params.length; j++) {
				let v = this.$props.urlData.add.params[j];
				this.add_url.params[v.name] = '';
			}
			/*初始化更新接口*/
			this.update_url.url = this.$props.urlData.update.url;
			for (var j = 0; j < this.$props.urlData.update.params.length; j++) {
				let v = this.$props.urlData.update.params[j];
				this.update_url.params[v.name] = '';
			}
			/*初始化更新状态接口*/
			this.update_status_url.url = this.$props.urlData.update_status.url;
			this.update_status_url.query = this.$props.urlData.update_status.query;
			for (var j = 0; j < this.$props.urlData.update_status.params.length; j++) {
				let v = this.$props.urlData.update_status.params[j];
				this.update_status_url.params[v.name] = '';
			}
			/*初始化删除借口*/
			this.delete_url.url = this.$props.urlData.del.url;
			for (var j = 0; j < this.$props.urlData.del.params.length; j++) {
				let v = this.$props.urlData.del.params[j];
				this.delete_url.params[v.name] = '';
			}
			/*初始化通用查询借口*/
			this.find_url.url = this.$props.urlData.find.url;
			this.find_url.data = this.$props.urlData.find.data;
			this.find_url.query = this.$props.urlData.find.query;
			this.find_url.status = this.$props.urlData.find.status;
			this.find_url.check_name = this.$props.urlData.find.check_name;
			for (var j = 0; j < this.$props.urlData.find.params.length; j++) {
				let v = this.$props.urlData.find.params[j];
				this.find_url.params[v.name] = '';
			}
			Get({
				url: this.search_url.url,
				data: temp_search,
				success: res => {
					this.list = res.data;
					this.total = res.extra.pageData.totalCount;
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
			init() {
				Get({
					url: this.search_url.url,
					data: this.listQuery,
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
					if (this.find_url.status) {
						var find_data = null;
						if(this.find_url.check_name){
							for(var k in this.find_url.params){
								this.find_url.params[k] = this.form[this.find_url.query]
							}
							find_data = this.find_url.params;
						}else {
							find_data = this.extend(this.find_url.params, this.form)
						}
						Get({
							url: this.find_url.url,
							data: find_data,
							success: res => {
								if (res.data + '' === 'null' || res.code !== 0) {
									alert('没有人');
									return
								}
								this.add_url.params[this.find_url.query] = res.data[this.find_url.data];
								var params_data = this.extend(this.add_url.params, this.form);
								params_data[this.find_url.query] = res.data[this.find_url.data];
								Post({
									url: this.add_url.url,
									data: params_data,
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
							}
						})
					} else {
						Post({
							url: this.add_url.url,
							data: this.extend(this.add_url.params,this.form),
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
					}

				} else {
					Post({
						url: this.update_url.url,
						data: this.extend(this.update_url.params, this.form),
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
				var params_data = this.extend(this.update_status_url.params, row);
				params_data[this.update_status_url.query] = !row[this.update_status_url.query] - 0;
				Post({
					url: this.update_status_url.url,
					data: this.update_status_url.params,
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
				var params_data = this.extend(this.delete_url.params, row);
				Post({
					url: this.delete_url.url,
					data: params_data,
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
				this.form = Object.assign({}, row);
				this.form.isStart = this.form.isStart + '';
			},
			init_form() {
				this.show_dialog = false;
				this.form = {
					userId: '', //登录名
					type: '', //登录密码
					ip: '', //分组
					remark: '', //电话
					isStart: '0', //状态（0：开启；1：关闭）
					loginAddress: '',
					id: null,
					nickName: '',
				}
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
