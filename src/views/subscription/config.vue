<template>
  <div class="layout">
    <div class="filter-container">
<!--
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入币种名称" v-model="listQuery.shortName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
-->
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
<el-table-column align="center" label="币种名称">
    <template slot-scope="scope">
					  <span>{{scope.row.vName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="发行总份数" width="120">
    <template slot-scope="scope">
					  <span>{{scope.row.circulation}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="发行总个数" width="120">
    <template slot-scope="scope">
					  <span>{{scope.row.issueNumber}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="已认购份数" width="80">
    <template slot-scope="scope">
					  <span>{{scope.row.surplusCopies}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="已认购个数" width="80">
    <template slot-scope="scope">
					  <span>{{scope.row.surplusNumber}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="每份个数" width="80">
    <template slot-scope="scope">
					  <span>{{scope.row.eachNumber}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易规则" width="80">
    <template slot-scope="scope">
					  <span>{{scope.row.dealexplain}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="备注">
    <template slot-scope="scope">
					  <span>{{scope.row.remark}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="最大认购份数">
    <template slot-scope="scope">
					  <span>{{scope.row.maxCopies}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="发行开始时间">
    <template slot-scope="scope">
					  <span>{{scope.row.startTime | parseTime('{y}-{m}-{d}')}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="发行结束时间">
    <template slot-scope="scope">
					  <span>{{scope.row.endTime | parseTime('{y}-{m}-{d}')}}</span>
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
        <el-form-item label="币种名称" prop="type">
            <el-select v-model='form.virtualId' style='width:260px'>
                <el-option v-for="item in options" :key="item.id" :label="item.shortName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="兑换规则" prop="type">
            <el-input v-model='form.rule'></el-input>
        </el-form-item>
        <el-form-item label="项目介绍" prop="type">
            <el-input v-model='form.proIntroduce' type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="发行总份数" prop="type">
           <el-input v-model='form.circulation' type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="发行总个数" prop="type">
            <el-input v-model='form.issueNumber'></el-input>
        </el-form-item>
        <el-form-item label="剩余份数" prop="type">
            <el-input v-model='form.surplusCopies'></el-input>
        </el-form-item>
        <el-form-item label="剩余个数" prop="type">
            <el-input v-model='form.surplusNumber'></el-input>
        </el-form-item>
        <el-form-item label="每份个数" prop="type">
            <el-input v-model='form.eachNumber'></el-input>
        </el-form-item>
        <el-form-item label="交易规则" prop="type">
            <el-input v-model='form.dealexplain' type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="type">
            <el-input v-model='form.remark' type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="最大认购份数" prop="type">
            <el-input v-model='form.maxCopies'></el-input>
        </el-form-item>
        <el-form-item label="发行开始时间" prop="type">
            <el-date-picker v-model='form.startTime' type="date" placeholder="选择日期" style='width:260px' @change='checkStartDate' :disabled='type === "update"'></el-date-picker>
        </el-form-item>
        <el-form-item label="发行结束时间" prop="type">
            <el-date-picker v-model='form.endTime' type="date" placeholder="选择日期" style='width:260px' @change='checkEndDate'></el-date-picker>
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
            }
        },
        created() {
            Get({
                url: 'subscription/findAll',
                data: {
                    shortName: ''
                },
                success: res => {
                    this.list = res.data;
                    // this.total = res.extra.pageData.totalCount;
                }
            });
            Get({
                url: 'currencyManagement/findAll?pageSize=40',
                success: res => {
                    if (res.code === 0) {
                        this.options = res.data
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
                    url: 'subscription/findAll',
                    data: {
                        id: this.listQuery.id,
                        vName: this.listQuery.vName,
                        shortName: this.listQuery.shortName,
                        pageSize: this.listQuery.pageSize,
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
            checkEndDate(e) {
                if ( this.form.endTime < this.form.startTime) {
                    this.$message({
                        type: 'error',
                        message: '结束日期应大于开始日期'
                    })
                    this.form.endTime = this.form.startTime;
                    return
                }
            },
            checkStartDate() {
                if ( this.form.endTime && this.form.endTime < this.form.startTime) {
                    this.$message({
                        type: 'error',
                        message: '开始日期应大于结束日期'
                    })
                    this.form.startTime = this.form.endTime;
                    return
                }
            },
            agree_click() {
                this.form.startTime = +this.form.startTime;
                this.form.endTime = +this.form.endTime;
                console.log(this.form.endTime)
                console.log(this.form.startTime)
                if (this.type == 'add') {
                    Post({
                        url: 'subscription/addSubscription',
                        data: {
                            virtualId: this.form.virtualId,
                            circulation: this.form.circulation,
                            issueNumber: this.form.issueNumber,
                            surplusCopies: this.form.surplusCopies,
                            surplusNumber: this.form.surplusNumber,
                            eachNumber: this.form.eachNumber,
                            dealexplain: this.form.dealexplain,
                            remark: this.form.remark,
                            maxCopies: this.form.maxCopies,
                            startTime: this.form.startTime,
                            endTime: this.form.endTime,
                            rule: this.form.rule,
                            proIntroduce: this.form.proIntroduce,
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
                        url: 'subscription/updateSubscription',
                        data: {
                            id: this.form.id,
                            virtualId: this.form.virtualId,
                            circulation: this.form.circulation,
                            issueNumber: this.form.issueNumber,
                            surplusCopies: this.form.surplusCopies,
                            surplusNumber: this.form.surplusNumber,
                            eachNumber: this.form.eachNumber,
                            dealexplain: this.form.dealexplain,
                            remark: this.form.remark,
                            maxCopies: this.form.maxCopies,
                            startTime: this.form.startTime,
                            endTime: this.form.endTime,
                            rule: this.form.rule,
                            proIntroduce: this.form.proIntroduce,
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
                    url: 'currencyManagement/updatevStatus',
                    data: {
                        id: row.id,
                        vStatus: !row.isStart - 0
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
                    url: 'subscription/deleteSubscription',
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
                    virtualId: "",
                    circulation: "",
                    issueNumber: "",
                    surplusCopies: "",
                    surplusNumber: "",
                    eachNumber: "",
                    dealexplain: "",
                    remark: "",
                    maxCopies: "",
                    startTime: "",
                    endTime: "",
                    rule: "",
                    proIntroduce: "",
                }
            },
            edit_item(row) {
                this.title = '编辑';
                this.show_dialog = true;
                this.type = 'update';
                this.form = Object.assign({}, row);

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
<style scoped="true">
    img {
        width: 100px;
        height: 50px;
    }

</style>
