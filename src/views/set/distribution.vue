<template>
  <div class="layout">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!-- 表格 -->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
    <el-table-column align="center" label="序号" width='60'>
        <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
        </template>
</el-table-column>   
<el-table-column align="left" label="推荐人关系下字段" >
        <template slot-scope="scope">
              <span>{{scope.row.retailStoreRelation}}</span>
        </template>
</el-table-column>
<el-table-column align="left" label="交易手续费奖励活动">
    <template slot-scope="scope">
					  <span>{{scope.row.serviceChargeAward}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作"  class-name="small-padding" width="200">
	<template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">编辑</el-button>
		  <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="del_item(scope.row)">删除
		  </el-button>
	</template>
</el-table-column>
</el-table>
<!-- 弹出层 -->
<el-dialog :title="title" :visible.sync="show_dialog">
    <el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
       
        <el-form-item label="推荐人关系" prop="type">
            <el-input v-model='form.retailStoreRelation' type='textarea'></el-input>
        </el-form-item>
        <el-form-item label="交易手续费奖励活动" prop="type">
            <el-input v-model='form.serviceChargeAward' type='textarea'></el-input>
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
                    shortName: ''
                },
                options: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Get({
                    url: 'retailStore/findAll',
                    success: res => {
                        this.list = res.data;
                    }
                })
            },
            cancel_click() {
                this.init_form();
            },
            agree_click() {
                if (this.type == 'add') {
                    Post({
                        url: 'retailStore/addRetailStore',
                        data: {
                            retailStoreRelation: this.form.retailStoreRelation,
                            serviceChargeAward: this.form.serviceChargeAward,
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
                        url: 'retailStore/updateRetailStore',
                        data: {
                            id: this.form.id,
                            retailStoreRelation: this.form.retailStoreRelation,
                            serviceChargeAward: this.form.serviceChargeAward,
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
                    url: 'retailStore/deleteRetailStore',
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
                this.form.isStart = this.form.isStart + '';
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
