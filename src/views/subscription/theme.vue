<template>
  <div class="layout">
<!--
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
-->
<!-- 表格 -->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
<!--
			<el-table-column align="center" label="序号" width="80">
					<template slot-scope="scope">
					  <span>{{scope.$index+1}}</span>
					</template>
</el-table-column>
-->
<el-table-column align="center" label="题目">
    <template slot-scope="scope">
					  <span>{{scope.row.timu}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="题目显示开始时间">
    <template slot-scope="scope">
					  <span>{{scope.row.timuTime}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="字体大小" width="120">
    <template slot-scope="scope">
					  <span>{{scope.row.fontSize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作" class-name="small-padding" width="200">
    <template slot-scope="scope">
		  <el-button type="primary" size="mini" @click="edit_item(scope.row)">编辑</el-button>
<!--
		  <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="del_item(scope.row)">删除
		  </el-button>
-->
	</template>
</el-table-column>
</el-table>
<!-- 弹出层 -->
<el-dialog :title="title" :visible.sync="show_dialog">
    <el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="题目" prop="type">
            <el-input v-model='form.timu' type='textarea'></el-input>
        </el-form-item>
        <el-form-item label="题目显示开始时间" prop="type">
            <el-input v-model='form.timuTime' type='textarea'></el-input>
        </el-form-item>
        <el-form-item label="字体大小" prop="type">
            <el-input v-model='form.fontSize' type='number'></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_click">取 消</el-button>
        <el-button type="primary" @click="agree_click">确 定</el-button>
    </div>
</el-dialog>
<!--
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
                    id: '',
                    timu: '',
                    timuTime: '',
                    fontSize: ''
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
                    id: '',
                    timu: '',
                    timuTime: '',
                    fontSize: ''
                },
            }
        },
        created() {
            Get({
                url: 'prompt/findAll',
                data: {
                    timu: '',
                },
                success: res => {
                    this.list = res.data;
                    // this.total = res.extra.pageData.totalCount;
                }
            })
        },
        methods: {
            init() {
                Get({
                    url: 'prompt/findAll',
                    data: {
                        id: this.listQuery.id,
                        timu: this.listQuery.timu,
                        timuTime: this.listQuery.timuTime,
                        fontSize: this.listQuery.fontSize,

                    },
                    success: res => {
                        this.list = res.data;
                        // this.total = res.extra.pageData.totalCount;
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
                        url: 'prompt/addPrompt',
                        data: {
                            timu: this.form.timu,
                            timuTime: this.form.timuTime,
                            fontSize: this.form.fontSize,
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
                    if (this.form.fontSize < 14 && this.form.fontSize < 40) {
                        this.$notify({
                            message: '请输入14到40的整数！',
                            type: 'error',
                            duration: 2000
                        })
                        return
                    }
                    Post({
                        url: 'prompt/updatePrompt',
                        data: {
                            id: this.form.id,
                            timu: this.form.timu,
                            timuTime: this.form.timuTime,
                            fontSize: this.form.fontSize,
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
                    url: 'prompt/deletePrompt',
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
                    id: '',
                    timu: '',
                    timuTime: '',
                    fontSize: ''
                }

            }

        }
    }

</script>
