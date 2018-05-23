<template>
  <div class="layout">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!-- 表格 -->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="序号" width="80">
					<template slot-scope="scope">
					  <span>{{scope.$index+1}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="币种市场">
    <template slot-scope="scope">
					  <span>{{scope.row.tradeMarket}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="奖励币种id">
    <template slot-scope="scope">
					  <span>{{scope.row.shortName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="基数1-3">
    <template slot-scope="scope">
					  <span>{{scope.row.cardinal1_3}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="基数4_10">
    <template slot-scope="scope">
					  <span>{{scope.row.cardinal4_10}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="基数11_20">
    <template slot-scope="scope">
					  <span>{{scope.row.cardinal11_20}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="基数21_50">
    <template slot-scope="scope">
					  <span>{{scope.row.cardinal21_50}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="基数51_100">
    <template slot-scope="scope">
					  <span>{{scope.row.cardinal51_100}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="递减1-3">
    <template slot-scope="scope">
					  <span>{{scope.row.decrease1_3}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="递减4_10">
    <template slot-scope="scope">
					  <span>{{scope.row.decrease4_10}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="递减11_20">
    <template slot-scope="scope">
					  <span>{{scope.row.decrease11_20}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="递减21_50">
    <template slot-scope="scope">
					  <span>{{scope.row.decrease21_50}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="递减51_100">
    <template slot-scope="scope">
					  <span>{{scope.row.decrease51_100}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作" class-name="small-padding" width="200">
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
        <el-form-item label="币种市场" prop="type">
            <el-select v-model="form.tradeMarket" placeholder="请选择" style='width:260px'>
                <el-option v-for="item in options" :key="item.tradeMarket" :label="item.shortName + '_' + item.basisV" :value="item.shortName + '_' + item.basisV"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="奖励币种id" prop="type">
            <el-select v-model="form.virtualId" placeholder="请选择" style='width:260px'>
                <el-option v-for="item in options1" :key="item.tradeMarket" :label="item.shortName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="基数1-3" prop="type">
            <el-input v-model='form.cardinal1_3'></el-input>
        </el-form-item>
        <el-form-item label="基数4_10" prop="type">
            <el-input v-model='form.cardinal4_10'></el-input>
        </el-form-item>
        <el-form-item label="基数11_20" prop="type">
            <el-input v-model='form.cardinal11_20'></el-input>
        </el-form-item>
        <el-form-item label="基数21_50" prop="type">
            <el-input v-model='form.cardinal21_50'></el-input>
        </el-form-item>
        <el-form-item label="基数51_100" prop="type">
            <el-input v-model='form.cardinal51_100'></el-input>
        </el-form-item>
        <el-form-item label="递减1-3" prop="type">
            <el-input v-model='form.decrease1_3'></el-input>
        </el-form-item>
        <el-form-item label="递减4_10" prop="type">
            <el-input v-model='form.decrease4_10'></el-input>
        </el-form-item>
        <el-form-item label="递减11_20" prop="type">
            <el-input v-model='form.decrease11_20'></el-input>
        </el-form-item>
        <el-form-item label="递减21_50" prop="type">
            <el-input v-model='form.decrease21_50'></el-input>
        </el-form-item>
        <el-form-item label="递减51_100" prop="type">
            <el-input v-model='form.decrease51_100'></el-input>
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
                options: [],
                form: {
                    virtualId: '',
                    tradeMarket: '',
                    cardinal1_3: '',
                    cardinal4_10: '',
                    cardinal11_20: '',
                    cardinal21_50: '',
                    cardinal51_100: '',
                    decrease1_3: '',
                    decrease4_10: '',
                    decrease11_20: '',
                    decrease21_50: '',
                    decrease51_100: '',
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
                options: [],
                options1: [],
            }
        },
        created() {
            Get({
                url: 'rankingAward/findAll',
                data: {

                },
                success: res => {
                    this.list = res.data;
//                    this.total = res.extra.pageData.totalCount;
                }
            })
            Get({
                url: 'currencyManage/findAll',
                data: {
                    pageSize: 40
                },
                success: res => {
                    if (res.code === 0) {
                        this.options = res.data
                    }

                    //                    this.list = res.data;
                    //					this.total = res.extra.pageData.totalCount;
                }
            })
            Get({
                url: 'currencyManagement/findAll?pageSize=40',
                success: res => {
                    if (res.code === 0) {
                        this.options1 = res.data
                    } else {

                    }
                    //                    this.list = res.data;
                    //					this.total = res.extra.pageData.totalCount;
                }
            })
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            init() {
                Get({
                    url: 'rankingAward/findAll',
//                    data: {
//                        pageNo: this.listQuery.pageNo,
//                        pageSize: this.listQuery.pageSize
//                    },
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
                        url: 'rankingAward/addRankingAward',
                        data: {
                            tradeMarket: this.form.tradeMarket,
                            virtualId: this.form.virtualId,
                            cardinal1_3: this.form.cardinal1_3,
                            cardinal4_10: this.form.cardinal4_10,
                            cardinal11_20: this.form.cardinal11_20,
                            cardinal21_50: this.form.cardinal21_50,
                            cardinal51_100: this.form.cardinal51_100,
                            decrease1_3: this.form.decrease1_3,
                            decrease4_10: this.form.decrease4_10,
                            decrease11_20: this.form.decrease11_20,
                            decrease21_50: this.form.decrease21_50,
                            decrease51_100: this.form.decrease51_100,
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
                        url: 'rankingAward/updateRankingAward',
                        data: {
                            id: this.form.id,
                            tradeMarket: this.form.tradeMarket,
                            virtualId: this.form.virtualId,
                            cardinal1_3: this.form.cardinal1_3,
                            cardinal4_10: this.form.cardinal4_10,
                            cardinal11_20: this.form.cardinal11_20,
                            cardinal21_50: this.form.cardinal21_50,
                            cardinal51_100: this.form.cardinal51_100,
                            decrease1_3: this.form.decrease1_3,
                            decrease4_10: this.form.decrease4_10,
                            decrease11_20: this.form.decrease11_20,
                            decrease21_50: this.form.decrease21_50,
                            decrease51_100: this.form.decrease51_100,
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
                    url: 'rankingAward/deleteRankingAward',
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
                    virtualId: '',
                    tradeMarket: '',
                    cardinal1_3: '',
                    cardinal4_10: '',
                    cardinal11_20: '',
                    cardinal21_50: '',
                    cardinal51_100: '',
                    decrease1_3: '',
                    decrease4_10: '',
                    decrease11_20: '',
                    decrease21_50: '',
                    decrease51_100: '',
                }
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
