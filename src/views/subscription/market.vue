<template>
  <div class="layout">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!-- 表格 -->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="交易币名称" >
					<template slot-scope="scope">
					  <span>{{scope.row.subscriptionName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="认购币名称">
    <template slot-scope="scope">
					  <span>{{scope.row.currencyName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易比率">
    <template slot-scope="scope">
					  <span>{{scope.row.currencyRatio}}</span>
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
<!-- 弹出层 -->
<el-dialog :title="title" :visible.sync="show_dialog">
    <el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="交易币" prop="type">
            <el-select v-model='form.subscriptionId' style='width:260px'>
                <el-option v-for="item in options1" :key="item.id" :label="item.shortName" multiple :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="认购币" prop="type">
            <el-select v-model='form.currencyId' style='width:260px'>
                <el-option v-for="item in options1" :key="item.id" :label="item.shortName" multiple :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="交易比率" prop="type">
            <el-input v-model='form.currencyRatio'></el-input>
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
                    currencyId: '',
                    subscriptionId: '',
                    currencyRatio: '',
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
                options: [],
                options1: []
            }
        },
        created() {
            Get({
                url: 'subscriptionCurrency/findAll',
                success: res => {
                    this.list = res.data;
                    // this.total = res.extra.pageData.totalCount;
                }
            });
            Get({
                url: 'currencyManagement/findAll?pageSize=40',
                success: res => {
                    if (res.code === 0) {
                        this.options1 = res.data
                    }
                    //                    this.list = res.data;
                    //					this.total = res.extra.pageData.totalCount;
                }
            })
        },
        methods: {
            init() {
                Get({
                    url: 'subscriptionCurrency/findAll',
                    success: res => {
                        this.list = res.data;
                        // this.total = res.extra.pageData.totalCount;
                    }
                })
            },
            cancel_click() {
                this.init_form();
            },
            agree_click() {
                if (this.type == 'add') {
                    Post({
                        url: 'subscriptionCurrency/addSubscriptionCurrency',
                        data: {
                            subscriptionId: this.form.subscriptionId,
                            currencyId: this.form.currencyId,
                            currencyRatio: this.form.currencyRatio,
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
                        url: 'subscriptionCurrency/updateSubscriptionCurrency',
                        data: {
                            id: this.form.id,
                            subscriptionId: this.form.subscriptionId,
                            currencyId: this.form.currencyId,
                            currencyRatio: this.form.currencyRatio,
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
                this.form.currencyRatio = '';
                this.form.subscriptionName = '';
                this.form.currencyName = '';
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
                    subscriptionName: '',
                    currencyName: '',
                    currencyRatio: '',
                }

            }

        }
    }

</script>
