<template>
  <div class="layout">
   
<!-- 表格 -->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="序号" width="80">
					<template slot-scope="scope">
					  <span>{{scope.$index+1}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="角色名称">
    <template slot-scope="scope">
					  <span>{{scope.row.roleName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="用户">
    <template slot-scope="scope">
					  <span>{{showUser(scope.row.user)}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="角色描述">
    <template slot-scope="scope">
					  <span>{{scope.row.roleText}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作" class-name="small-padding" width="200">
    <template slot-scope="scope">
		<el-button type="primary" size="mini" @click="edit_item(scope.row)">详情</el-button>
	</template>
</el-table-column>
</el-table>
<!-- 弹出层 -->
<el-dialog :title="title" :visible.sync="show_dialog" @close='closeDia'>
    <el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="角色名称" prop="type">
            <el-input v-model='form.roleName' disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="type">
            <el-input v-model='form.roleText' disabled></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="type">
            <el-tree :data="tree_data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_click">取 消</el-button>
        <el-button type="primary" @click="agree_click">确 定</el-button>
    </div>
</el-dialog>
<el-dialog title="该角色权限" :visible.sync="quanxian_dialog">

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
                quanxian_dialog: false,
                options: [],
                form: {
                    vName: '',
                    shortName: '',
                    description: '',
                    currencyType: '',
                    decimalPlaces: '',
                    vStatus: '0',
                    ip: '',
                    port: '',
                    startTime: "",
                    endTime: ''
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
                    id: ''
                },
                fileList: [],
                value1: '',
                tree_data: [],
                defaultProps: {
                    children: 'lf',
                    label: 'codeName'
                }
            }
        },
        created() {
            Post({
                url: 'function/findAllRole',
                data: {
                    // notice: ''
                },
                success: res => {
                    this.list = res.data;
                    //					this.total = res.extra.pageData.totalCount;
                }
            });
            Post({
                url: 'function/findFunctionByUser',
                success: res => {
                    if (res.code === 0) {
                        this.tree_data = res.data;
                        console.log(this.tree_data)
                    }
                    //                    this.list = res.data;
                    //					this.total = res.extra.pageData.totalCount;
                }
            });

        },
        methods: {
            showUser(obj) {
                return obj.map(res => {
                    return res.loginName
                }).join(',')
            },
            check_item(raw) {
                console.log(raw);
                this.quanxian_dialog = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            init() {
                Post({
                    url: 'function/findAllRole',
                    data: {
                        // notice: this.listQuery.notice,
                        // pageSize: this.listQuery.pageSize,
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
                this.init_form();
                return
                var arr = [];
                var selectarr = this.$refs.tree.getCheckedNodes();
                for (var k = 0; k < selectarr.length; k++) {
                    for (var i = 0; i < this.tree_data.length; i++) {
                        if (selectarr[k].id === this.tree_data[i].id) {
                            arr.push(selectarr[k].id)
                        }
                        for (var j = 0; j < this.tree_data[i].lf.length; j++) {
                            var son_id = this.tree_data[i].lf[j].id
                            if (son_id == selectarr[k].id) {
                                arr.push(this.tree_data[i].id)
                                arr.push(son_id)
                            }
                        }
                    }
                }
                var newArr = Array.from(new Set(arr));
                if (this.type === 'add') {
                    Post({
                        url: 'function/addRole',
                        data: {
                            id: -1,
                            roleName: this.form.roleName,
                            roleText: this.form.roleText,
                            check: newArr.join(','),
                        },
                        success: res => {
                            this.show_dialog = false;
                            this.$notify({
                                title: '成功',
                                message: '增加成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.init_form();
                            this.init();
                        }
                    })

                } else {
                    Post({
                        url: 'function/addRole',
                        data: {
                            id: this.form.id,
                            roleName: this.form.roleName,
                            roleText: this.form.roleText,
                            check: newArr.join(','),
                        },
                        success: res => {
                            this.show_dialog = false;
                            this.$notify({
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.init_form();
                            this.init();
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
                    url: 'function/delRole',
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
                    this.form[k] = this.form[k] + '';
                }
                setTimeout(res => {
                    var arr = this.form.functionString.split(',');
                    this.$refs.tree.setCheckedKeys(arr);
                })
            },
            init_form() {
                this.show_dialog = false;
                this.form = {
                    roleName: '',
                    roleText: ''
                }
                this.$refs.tree.setCheckedKeys([]);
            },
            closeDia() {
                this.form = {
                    roleName: '',
                    roleText: ''
                }
                this.$refs.tree.setCheckedKeys([]);
            }

        }
    }

</script>
