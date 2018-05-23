<template>
  <div class="layout">

<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
<el-table-column align="center" label="是否开启自动撤单">
    <template slot-scope="scope">
					  <span>{{scope.row.isOpenTimer ? '关闭' : "开启"}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="自动撤单时间">
    <template slot-scope="scope">
					  <span>{{scope.row.scanningTime}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作" width="150" class-name="small-padding">
    <template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">编辑</el-button>
	</template>
</el-table-column>
</el-table>
<template>
	<div class="warning">
		注：<br>
			1、自动撤单适用于所有交易市场<br>
			2、撤单的功能触发的临界值单位为:小时<br>
			3、所有撤单均为不可逆<br>
			4、撤单只能撤回未交易或者部分交易的订单</div>
</template>
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
    <el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="是否开启自动撤单" prop="type">
            <el-select v-model='form.isOpenTimer' style='width:260px'>
                <el-option label='开启' value='0'></el-option>
                <el-option label='关闭' value='1'></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="自动撤单时间" prop="type">
            <el-input v-model='form.scanningTime'></el-input>
        </el-form-item>
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
                    isOpenTimer: '',
                    loginPassword: '',
                    scanningTime: '',
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
                url: 'setRevoke/findAll',
                data: {
                    isOpenTimer: '',
                    scanningTime: ''
                },
                success: res => {
                    this.list = [res.data];
                    // this.total = res.extra.pageData.totalCount;
                }
            })
        },
        methods: {
            init() {
                Get({
                    url: 'setRevoke/findAll',
                    data: {
                        isOpenTimer: this.listQuery.isOpenTimer,
                        scanningTime: this.listQuery.scanningTime,
                    },
                    success: res => {
                        this.list = [res.data];
                        // this.total = res.extra.pageData.totalCount;
                    }
                })
            },
            cancel_click() {
                this.init_form();
            },
            agree_click() {
                Post({
                    url: 'setRevoke/updateSetRevoke',
                    data: {
                        id: this.form.id,
                        isOpenTimer: this.form.isOpenTimer,
                        scanningTime: this.form.scanningTime,
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

            }, //点击弹出框确认的事件；
            change_status(row) {
                Post({
                    url: 'setRevoke/updateSetRevoke',
                    data: {
                        id: row.id,
                        isOpenTimer: this.form.isOpenTimer,
                        scanningTime: this.form.scanningTime,
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
                this.form = Object.assign({}, row);
                for (var k in this.form) {
                    if (this.form[k] + '' !== 'null') {
                        this.form[k] = this.form[k] + ''
                    }
                }
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
<style>
    .warning {
        margin-top: 20px;
        color: red;
        line-height: 35px;
        font-size: 12px;
/*        widows: 500px;*/
/*        float: right*/
    }

</style>
