<template>
  <div class="layout">
    <div class="filter-container">
<!--
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入币种名称" v-model="listQuery.shortName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
-->
        <el-select v-model='listQuery.isStart'  @change='init'>
            <el-option value='2' label='全部状态'></el-option>
            <el-option value='0' label='启用'></el-option>
            <el-option value='1' label='关闭'></el-option>
        </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!-- 表格 -->
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="用户名" width="80">
					<template slot-scope="scope">
					  <span>{{scope.row.loginName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="分组">
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
<el-table-column align="center" label="状态" width="120">
    <template slot-scope="scope">
          <el-button type="success" size="mini" @click="change_status(scope.row)" v-if='!scope.row.isStart'>启用</el-button>
          <el-button type="warning" size="mini" @click="change_status(scope.row)" v-if='scope.row.isStart'>禁用</el-button>
    </template>
</el-table-column>
<el-table-column align="center" label="操作" class-name="small-padding" width="200">
    <template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">编辑</el-button>
		  <el-button size="mini" type="danger" @click="del_item(scope.row)">删除
		  </el-button>
	</template>
</el-table-column>
</el-table>
<!-- 弹出层 -->
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
        <el-form-item label="状态" prop="type">
            <el-select v-model='form.isStart' style='width:260px'>
                <el-option value='0' label='启用'></el-option>
                <el-option value='1' label='禁用'></el-option>
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
    import MD5 from 'js-md5' // 水波纹指令
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
                options: [],
                form: {
                    loginName: "",
                    organize: "",
                    phone: "",
                    email: "",
                    isStart: "0",
                    loginPassword: "",
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
                    id: ''
                },
                fileList: [],
                value1: '',
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Get({
                    url: 'admin/findAll',
                    data: {
                        isStart: this.listQuery.isStart,
                        pageSize: this.listQuery.pageSize,
                        pageNo: this.listQuery.pageNo,
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
            upload_error() {
                this.$message({
                    type: 'error',
                    message: '上传失败'
                })
            },
            agree_click() {
                if (this.type == 'add') {
                    Post({
                        url: 'admin/addAdmin',
                        data: {
                            loginName: this.form.loginName,
                            organize: this.form.organize,
                            phone: this.form.phone,
                            email: this.form.email,
                            isStart: this.form.isStart,
                            loginPassword: MD5(this.form.loginPassword),
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
                        url: 'admin/updateAdmin',
                        data: {
                            id: this.form.id,
                            loginName: this.form.loginName,
                            organize: this.form.organize,
                            phone: this.form.phone,
                            email: this.form.email,
                            isStart: this.form.isStart,
                            loginPassword: MD5(this.form.loginPassword),
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
                this.form = {
                    loginName: "",
                    organize: "",
                    phone: "",
                    email: "",
                    isStart: "0",
                    loginPassword: "",
                    id: null
                }
            },
            edit_item(row) {
                this.title = '编辑';
                this.show_dialog = true;
                this.type = 'update';
                this.form = Object.assign({}, row);
                for (var k in this.form) {
                    if (this.form[k] + '' !== 'null') {
                        this.form[k] = this.form[k] + ''
                    }
                }
                this.form.loginPassword = ''

            },
            init_form() {
                this.show_dialog = false;
                this.form = {
                    loginName: "",
                    organize: "",
                    phone: "",
                    email: "",
                    isStart: "0",
                    loginPassword: "",
                    id: null
                }

            }

        }
    }

</script>
