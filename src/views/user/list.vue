<template>
  <div class="layout">
    <div class="filter-container">
      	<el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
       	<el-input  style="width: 200px;" class="filter-item" placeholder="请输入邮箱" v-model="email"> </el-input>
       	<el-input  style="width: 200px;" class="filter-item" placeholder="请输入手机号码" v-model="phone"> </el-input>
		<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
<el-table-column align="center" label="uid">
    <template slot-scope="scope">
					  <span>{{scope.row.uid}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="昵称">
    <template slot-scope="scope">
					  <span>{{scope.row.nickName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="真实姓名">
    <template slot-scope="scope">
					  <span>{{scope.row.realName}}</span>
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
<el-table-column align="center" label="证件是否已审">
    <template slot-scope="scope">
					  <span>{{scope.row.hasRealValidate ? '已审核': "未审核"}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="注册时间">
    <template slot-scope="scope">
					  <span>{{scope.row.registerTime
 | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="用户状态">
    <template slot-scope="scope">
                    <el-button :type=" !scope.row.userStatus ? 'success':'warning'" size="mini" @click="update_item(scope.row)">{{scope.row.userStatus ? '冻结':"正常"
}}</el-button>
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
    <el-form ref="dataForm" label-position="left" :model="form" label-width="140px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="昵称" prop="type">
            <el-input v-model='form.nickName' :maxlength=8></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="type">
            <el-input v-model='form.realName'></el-input>
        </el-form-item>
        <el-form-item label="推荐人ID">
            <el-input v-model='form.introUserId' palceholder='请填写用户UID'></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model='form.phone'></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model='form.email'></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model='form.iDCardNo'></el-input>
        </el-form-item>
        <el-form-item label="是否已完成实名认证">
            <el-select v-model="form.isValid" style='width:260px'>
                <el-option label="通过认证" value="1"></el-option>
                <el-option label="没有认证" value="2"></el-option>
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
        data() {
            return {
				email:'',
				phone:'',
                form: {
                    nickName: '', //登录名
                    realName: '', //登录密码
                    phone: '', //分组
                    email: '', //邮箱
                    isValid: '1', //状态（0：开启；1：关闭）
                    id: null,
                    introUserId: '',
                    iDCardNo: ''
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
                    url: 'log/findAll',
                    data: {
                        pageSize: this.listQuery.pageSize,
                        pageNo: this.listQuery.pageNo,
                        email:this.email,
                        phone:this.phone,
                    },
                    success: res => {
                        this.list = res.data;
                        this.total = res.extra.pageData.totalCount;
                    }
                })
            },
            update_item(raw) {
                Post({
                    url: 'log/updateUserStatus',
                    data: {
                        userStatus: !raw.userStatus - 0,
                        id: raw.id
                    },
                    success: res => {
                        console.log(res)
                        this.init()
                    }
                })
            },
            cancel_click() {
                this.init_form();
            },
            agree_click() {
                if (this.type == 'add') {
                    Get({
                        url: 'log/findIdByuid',
                        data: {
                            uid: this.form.introUserId
                        },
                        success: res => {
                            if (res.code !== 0) {
                                this.$message({
                                    message: res.data,
                                    type: 'error',
                                    duration: 2000
                                })
                                return
                            }
                            var introUser_id = res.data;
                            Post({
                                url: 'log/addUser',
                                data: {
                                    introUserId: introUser_id,
                                    nickName: this.form.nickName,
                                    realName: this.form.realName,
                                    phone: this.form.phone,
                                    email: this.form.email,
                                    isValid: this.form.isValid,
                                    shortName: this.form.shortName,
                                    iDCardNo: this.form.iDCardNo,
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
                        }
                    })
                } else {
                    Post({
                        url: 'log/updateUser',
                        data: {
                            id: this.form.id,
                            nickName: this.form.nickName,
                            realName: this.form.realName,
                            phone: this.form.phone,
                            email: this.form.email,
                            isValid: this.form.isValid,
                            shortName: this.form.shortName,
                            iDCardNo: this.form.iDCardNo,
                            introUserId: this.form.introUserId,
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
                    url: 'log/deleteUser',
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
                    nickName: '', //登录名
                    realName: '', //登录密码
                    phone: '', //分组
                    email: '', //邮箱
                    isValid: '1', //状态（0：开启；1：关闭）
                    id: null,
                    introUserId: ''
                }
            },
            edit_item(row) {
                this.title = '编辑';
                this.show_dialog = true;
                this.type = 'update';
                this.form = Object.assign({}, row);
                this.form.isStart = this.form.isStart + '';
                for (var k in this.form) {
                    if (this.form[k] + '' !== 'null') {
                        this.form[k] = this.form[k] + ''
                    }
                }
            },
            init_form() {
                this.show_dialog = false;
                this.form = {
                    nickName: '', //登录名
                    realName: '', //登录密码
                    phone: '', //分组
                    email: '', //邮箱
                    isValid: '1', //状态（0：开启；1：关闭）
                    id: null,
                    introUserId: ''
                }

            }

        }
    }

</script>
