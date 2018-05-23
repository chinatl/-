<template>
  <div class="layout">
    <div class="filter-container">
       <el-select  style="width:120px"  v-model="listQuery.shortName" placeholder="全部状态" @change='init'>
		   <el-option label='全部市场' value=''></el-option>
			<el-option 
			v-for="item in options"
		  :key="item.shortName"
		  :label="item.shortName"
		  :value="item.shortName"></el-option>
      </el-select>
      <el-select  style="width:100px"  v-model="listQuery.marketOrder" placeholder="全部状态" @change='init'>
        <el-option label="升序" value="0"></el-option>
        <el-option label="降序" value="1"></el-option>
      </el-select>
      <el-select  style="width:200px"  v-model="listQuery.marketState" placeholder="全部状态" @change='init'>
        <el-option label="全部状态" value="2"></el-option>
        <el-option label="已禁用" value="1"></el-option>
        <el-option label="已启用" value="0"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="add_item">添加</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
<el-table-column align="center" label="排序" width="80">
		<template slot-scope="scope">
		  <span>{{scope.row.marketOrder}}</span>
		</template>
</el-table-column>
<el-table-column align="center" label="交易区" width="120">
	<template slot-scope="scope">
		  <span>{{scope.row.shortName}}</span>
		</template>
</el-table-column>
<el-table-column align="center" label="币种">
	<template slot-scope="scope">
	  	<span v-for=' item in scope.row.lcm' style="color:blue;margin:0 10px">{{item.shortName}}</span>
	</template>
</el-table-column>
<el-table-column class-name="status-col" label="状态" width="120" align='center'>
	<template slot-scope="scope">
		<el-button size="mini" :type="scope.row.marketState ? 'warning' : 'success' " @click='change_status(scope.row)'>{{scope.row.marketState ? "已禁用":"已启用"}}</el-button>
	</template>
</el-table-column>
<el-table-column align="center" label="操作" width="150" class-name="small-padding">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">编辑</el-button>
		  <el-button type="warning" size="mini" @click="del_item(scope.row)">删除</el-button>
	
	</template>
</el-table-column>
</el-table>
<!--弹出层-->
<el-dialog title="编辑" :visible.sync="show_dialog">
	<el-form ref="dataForm" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
		<el-form-item label="交易区" prop="type">
			<el-select v-model="form.basisCoinId" style='width:400px'>
				<el-option v-for="item in options1" :key="item.shortName" :label="item.shortName" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="币种" prop="type" value-key='id'>
			<el-select v-model="form.bizhong" multiple style='width:400px'>
				<el-option v-for="item in options" :key="item.id" :label="item.shortName" multiple :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="状态">
			<el-select style='width:400px'v-model="form.marketState">
				<el-option label="启用" value="0"></el-option>
				<el-option label="禁用" value="1"></el-option>
			</el-select>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="cancel_click">取 消</el-button>
		<el-button type="primary" @click="agree_click">确 定</el-button>
	</div>
</el-dialog>
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
				options: [

				],
				options1: [

				],
				form: {
					basisCoinId: '',
					marketState: '0',
					bizhong: []
				},
				type: 'add',
				title: '数据添加',
				show_dialog: false,
				tableKey: 0,
				list: [],
				total: null,
				listQuery: {
					//					pageNo: 1,
					//					pageSize: 5,
					marketOrder: '0',
					shortName: '',
					marketState: '2'
				},
			}
		},
		created() {
			Post({
				url: 'disConfig/findAllBi',
				success: res => {
					console.log(res.data.map(e => {
						return e.id
					}))
					this.options = res.data
					this.options1 = res.data
				}
			})
			Post({
				url: 'disConfig/findAllDisConfig',
				data: {
					shortName: '',
					marketState: '2',
					marketOrder: '0',
				},
				success: res => {
					this.list = res.data;

					//					this.total = res.extra.pageData.totalCount;
				}
			})
		},
		methods: {
		
			init() {
				Post({
					url: 'disConfig/findAllDisConfig',
					data: {
						shortName: this.listQuery.shortName,
						//						pageNo: this.listQuery.pageNo,
						marketState: this.listQuery.marketState,
						marketOrder: this.listQuery.marketOrder,
						//						pageSize: this.listQuery.pageSize,
					},
					success: res => {
						this.list = res.data;
						//						this.total = res.extra.pageData.totalCount;
					}
				})
			},
			cancel_click() {
				this.init_form();
			},
			agree_click() {
				if (this.type == 'add') {
					Post({
						url: 'disConfig/addDisConfig',
						data: {
							basisCoinId: this.form.basisCoinId,
							marketState: this.form.marketState,
							bizhong: this.form.bizhong.join(',')
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
						url: 'disConfig/addDisConfig',
						data: {
							id: this.form.id,
							basisCoinId: this.form.basisCoinId,
							marketState: this.form.marketState,
							bizhong: this.form.bizhong.join(',')
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
					url: 'disConfig/ChangeDisConfigMarkState',
					data: {
						id: row.id,
						marketState: row.marketState - 0
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
				this.listQuery.pageNo = 1
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
					url: 'disConfig/delDisConfig',
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
				this.form.marketState = row.marketState + '';
				this.form.basisCoinId = row.basisCoinId;
				this.form.id = row.id;
				if (!row.lcm.length) {
					this.form.bizhong = [];
				} else {
					this.form.bizhong = row.lcm.map(e => {
						return e.currId
					})
				}

			},
			init_form() {
				this.show_dialog = false;
				this.form = {
					id: null,
					basisCoinId: '',
					marketState: '0',
					bizhong: []
				}
			}

		}
	}

</script>
