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
	
<el-table-column align="center" label="登录名称">
    <template slot-scope="scope">
					  <span>{{scope.row.loginName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="用户权限">
    <template slot-scope="scope">
					  <span>{{check(scope.row)}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作" width="150" class-name="small-padding">
    <template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)" v-if='!checkAdmin(scope.row.role)'>编辑</el-button>
		  </el-button> 
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)" v-if='checkAdmin(scope.row.role)' disabled>不可修改</el-button>
		  </el-button>
	</template>
</el-table-column>
</el-table>
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
    <el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="登录名称" prop="type">
            <el-input v-model='form.loginName' disabled></el-input>
        </el-form-item>
        <el-form-item label="当前权限" prop="type" value-key='id'>
            <el-select v-model="bizhong" multiple style='width:260px'>
                <el-option v-for="item in options" :key="item.id" :label="item.roleName" multiple :value="item.id"></el-option>
            </el-select>
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
                    id: null,
                },
                bizhong: [],
                type: 'add',
                title: '数据添加',
                show_dialog: false,
                tableKey: 0,
                list: [],
                total: null,
                options: [],
                listQuery: {
                    pageNo: 1,
                    pageSize: 5,
                    isStart: '2',
                    loginName: '',
                },

            }
        },
        created() {
            this.init();
            Post({
                url: 'function/findAllRole',
                success: res => {
                    this.options = res.data;
                }
            })
        },
        methods: {
            checkAdmin(role) {
                if (role.length === 0) {
                    return false
                } else {
                    if (role[0].id == 0) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            check(raw) {
                if (raw.role.length === 0) {
                    return '普通用户'
                } else {
                    return raw.role.map(res => {
                        return res.roleName
                    }).join(',')
                }
            },

            init() {
                Get({
                    url: 'function/findAllUserRole',
                    data: {
                        pageNo: this.listQuery.pageNo,
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
                        url: 'wallet/addWalletAddress',
                        data: {
                            // userId: this.form.userId, 
                            shortName: this.form.shortName,
                            num: this.form.num,
                        },
                        success: res => {
                            this.show_dialog = false;
                            if (res.code == 0) {
                                this.init_form();
                                this.init();
                                this.$notify({
                                    message: '修改',
                                    type: 'success',
                                    duration: 2000
                                })
                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'error',
                                    duration: 2000
                                })
                            }
                        }
                    })
                } else {
                    Post({
                        url: 'function/changeUserRole',
                        data: {
                            id: this.form.id,
                            data: this.bizhong.join(',')
                        },
                        success: res => {
                            if (res.code == 0) {
                                this.show_dialog = false;
                                this.$notify({
                                    title: '成功',
                                    message: '编辑成功！',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.init();
                                this.init_form();
                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'error',
                                    duration: 2000
                                })
                            }
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
                this.title = '编辑';
                this.show_dialog = true;
                this.type = 'update';
                this.form = Object.assign({}, row);
                var arr = row.role.map(res => {
                    return res.id
                })
                this.bizhong = arr;
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
