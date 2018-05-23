<template>
  <div class="layout">
    <div class="filter-container">
       	<el-input  style="width: 200px;" class="filter-item" placeholder="请输入邮箱" v-model="email"> </el-input>
       	<el-input  style="width: 200px;" class="filter-item" placeholder="请输入手机号码" v-model="phone"> </el-input>
		<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
        <el-table-column align="center" label="交易市场" >
					<template slot-scope="scope">
					  <span>{{scope.row.tradeMarket}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="数据新增时间">
    <template slot-scope="scope">
					  <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="类型">
    <template slot-scope="scope">
					  <span>{{scope.row.billType}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="具体操作">
    <template slot-scope="scope">
					  <span>{{scope.row.billOperation}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="具体操作">
    <template slot-scope="scope">
					  <span>{{scope.row.billOperation}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易前余额">
    <template slot-scope="scope">
					  <span>{{scope.row.lastAmount}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="剩余余额">
    <template slot-scope="scope">
					  <span>{{scope.row.currentAmount}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="是否赠送">
    <template slot-scope="scope">
					  <span>{{scope.row.givingType ? '未赠送':'已赠送'}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="交易金额">
    <template slot-scope="scope">
					  <span>{{scope.row.amount}}</span>
					</template>
</el-table-column>

</el-table>
<!--弹出层-->
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
                    url: 'work/seluserBill',
                    data: {
                        pageNo: this.listQuery.pageNo,
                        pageSize: this.listQuery.pageSize,
						phone:this.phone,
						email:this.email,
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
                            loginPassword: this.form.loginPassword,
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
