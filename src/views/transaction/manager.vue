<template>
  <div class="layout">
    <div class="filter-container currensdaaaaacys">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入币种名称" v-model="listQuery.shortName">
      </el-input>
      <el-select  style="width:200px"  v-model="listQuery.vStatus" placeholder="全部状态" @change='init' >
        <el-option label="全部状态" value="2"></el-option>
        <el-option label="开启" value="0"></el-option>
        <el-option label="关闭" value="1"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!-- 表格 -->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="名称" width="80">
					<template slot-scope="scope">
					  <span>{{scope.row.vName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="标题" width="80">
    <template slot-scope="scope">
					  <span>{{scope.row.shortName}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="图片" width="120">
    <template slot-scope="scope">
           
            <el-upload class="upload-demo" 
            :key = 'scope.$index'
             @click='cac(scope.raw.id)'  :on-success='upload_success1' 
              :on-change='log(scope.$index)'
              :show-file-list='false'
              @clearFiles='thisClear'
               action="/currencyManagement/updateMarkUrl" :on-remove="handleRemove" :data="dataS" :on-error='upload_error'>
                <img :src="scope.row.markUrl" alt=""
                 @click='log(scope.$index)'
                 style="width:30px;height:30px;">
            </el-upload>
    </template>
</el-table-column>
<el-table-column align="center" label="类型" width="80">
    <template slot-scope="scope">
					  <span>
					  {{scope.row.currencyType === 0 ? '比特':null}}
					  {{scope.row.currencyType === 1 ? '以太':null}}
					  {{scope.row.currencyType === 2 ? 'SC':null}}
					  {{scope.row.currencyType === -1 ? '其他':null}}

					  </span>
					</template>
</el-table-column>
<el-table-column align="center" label="小数位数" width="80">
    <template slot-scope="scope">
					  <span>{{scope.row.decimalPlaces}}</span>
					</template>
</el-table-column>
<el-table-column class-name="status-col" label="状态" align='center'>
    <template slot-scope="scope">
					<el-button size="mini" :type="scope.row.vStatus ? 'warning' : 'success' " @click='change_status(scope.row)'>{{scope.row.vStatus ? "关闭":"开启"}}</el-button>
				</template>
</el-table-column>
<el-table-column align="center" label="充值" class-name="small-padding">
    <template slot-scope="scope">
					<el-button size="mini" :type="scope.row.isTopUpGiving ? 'warning' : 'success' " @click='change_giving(scope.row)'>{{scope.row.isTopUpGiving ? "关闭":"开启"}}</el-button>
				</template>
</el-table-column>
<el-table-column align="center" label="提现" class-name="small-padding">
    <template slot-scope="scope">
					<el-button size="mini" :type="scope.row.isWithdrawal ? 'warning' : 'success' " @click='change_isWithdrawal(scope.row)'>{{scope.row.isWithdrawal ? "关闭":"开启"}}</el-button>
				</template>
</el-table-column>
<el-table-column align="center" label="充值赠送" class-name="small-padding">
    <template slot-scope="scope">
					<el-button size="mini" :type="scope.row.isTopUp ? 'warning' : 'success' " @click='change_isTopUp(scope.row)'>{{scope.row.isTopUp ? "关闭":"开启"}}</el-button>
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
<el-dialog :title="title" :visible.sync="show_dialog" @close='init_form'>
    <el-form ref="dataForm" label-position="right" label-width="180px" style='width: 500px; margin-left:50px;'>
        <el-form-item label="名称：" prop="type">
            <el-input v-model='form.vName'></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="type">
            <el-input v-model='form.shortName'></el-input>
        </el-form-item>
        <el-form-item label="币种类型：" prop="type">
            <el-select v-model="form.currencyType" placeholder="全部类型" style='width:320px'>
                <el-option label="比特" value="0"></el-option>
                <el-option label="以太" value="1"></el-option>
                <el-option label="SC" value="2"></el-option>
                <el-option label="其他" value="-1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="描述：" prop="type">
            <el-input v-model='form.description' type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="type">
            <el-select v-model="form.vStatus" placeholder="状态" style='width:320px'>
                <el-option label="开启" value="0"></el-option>
                <el-option label="关闭" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="币种的小数位数：" prop="type">
            <el-input v-model='form.decimalPlaces'></el-input>
        </el-form-item>
        <el-form-item label="标志url：" prop="type" v-if='type === "add"'>
            <el-upload class="upload-demo" ref="upload" @clearFiles='hello_world' :limit='1' :on-success='upload_success' :action="addurl" :on-preview="handlePreview" :on-change='changepic' :on-remove="handleRemove" :data="form" :on-error='upload_error' :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="ip地址：" prop="type">
            <el-input v-model='form.ip'></el-input>
        </el-form-item>
        <el-form-item label="端口：" prop="type">
            <el-input v-model='form.port'></el-input>
        </el-form-item>
        <el-form-item label="钱包服务器用户名：" prop="type">
            <el-input v-model='form.serverUserName'></el-input>
        </el-form-item>
        <el-form-item label="钱包服务器密码：" prop="type">
            <el-input v-model='form.serverLoginName'></el-input>
        </el-form-item>
        <el-form-item label="钱包密码：" prop="type">
            <el-input v-model='form.walletPassword'></el-input>
        </el-form-item>
        <el-form-item label="是否可以提现：" prop="type">
            <el-select v-model="form.isWithdrawal" placeholder="状态" style='width:320px'>
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否可以充值：" prop="type">
            <el-select v-model="form.isTopUp" placeholder="状态" style='width:320px'>
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="充值确认次数：" prop="type">
            <el-input v-model='form.confirmCount'></el-input>
        </el-form-item>
        <el-form-item label="充值说明：" prop="type">
            <el-input v-model='form.topUpState' type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="提现手续费：" prop="type">
            <el-input v-model='form.withdrawalCost'></el-input>
        </el-form-item>
        <el-form-item label="最小提现数量：" prop="type">
            <el-input v-model='form.minAmount'></el-input>
        </el-form-item>
        <el-form-item label="最大提现数量：" prop="type">
            <el-input v-model='form.maxAmount'></el-input>
        </el-form-item>
        <el-form-item label="提现需后台审核阈值：" prop="type">
            <el-input v-model='form.withdrawalVerify'></el-input>
        </el-form-item>
        <el-form-item label="是否开启充值赠送：" prop="type">
            <el-select v-model="form.isTopUpGiving" placeholder="状态" style='width:320px'>
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户充值自己赠送比例：" prop="type">
            <el-input v-model='form.topUpSendScaleSelf'></el-input>
        </el-form-item>
        <el-form-item label="充值赠送1代比例：" prop="type">
            <el-input v-model='form.topUpSendScale1'></el-input>
        </el-form-item>
        <el-form-item label="充值赠送2代比例：" prop="type">
            <el-input v-model='form.topUpSendScale2'></el-input>
        </el-form-item>
        <el-form-item label="充值赠送3代比例：" prop="type">
            <el-input v-model='form.topUpSendScale3'></el-input>
        </el-form-item>
        <el-form-item label="要赠送的币种：" prop="type">
            <el-select v-model='form.topUpVirtualCurrency' style='width:320px'>
                <el-option v-for="item in options" :key="item.id" :label="item.shortName" multiple :value="item.id"></el-option>
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
    import request from 'superagent'
    export default {
        name: 'complexTable',
        directives: {
            waves
        },
        data() {
            return {
                dataS: {
                    id: ''
                },
                form: {
                    vName: '', //名称
                    shortName: '', //标题
                    currencyType: '0', //币种类型
                    description: '', //描述
                    vStatus: '0', //状态（0：正常，1：关闭）
                    decimalPlaces: '', //币种的小数位数
                    markUrl: "", //标志url
                    ip: '', //ip地址
                    port: '', //端口
                    serverUserName: '', //钱包服务器用户名
                    serverLoginName: '', //钱包服务器密码
                    walletPassword: '', //钱包密码
                    isWithdrawal: '0', //是否可以提现（0：是，1：否）
                    isTopUp: '0', //是否可以充值（0：是，1：否）
                    confirmCount: '', //充值确认次数
                    topUpState: '', //充值说明
                    withdrawalCost: '', //提现手续费（0-100的整数）
                    minAmount: '', //最小提现数量
                    maxAmount: '', //最大提现数量
                    IntegerwithdrawalVerify: '', //提现需后台审核阈值
                    isTopUpGiving: '0', //是否开启充值赠送(0：开启，1：关闭)
                    topUpSendScaleSelf: '', //用户充值自己赠送比例
                    topUpSendScale1: '', //充值赠送1代比例
                    topUpSendScale2: '', //充值赠送2代比例
                    topUpSendScale3: '', //充值赠送3代比例
                    topUpVirtualCurrency: ""
                },
                type: 'add',
                title: '数据添加',
                show_dialog: false,
                tableKey: 0,
                list: [],
                addurl: '/currencyManagement/addCurrencyManagement',
                total: null,
                listQuery: {
                    pageNo: 1,
                    pageSize: 5,
                    // id:'',
                    vStatus: '2',
                    // shortName:''
                },
                fileList: [],
                options: []
            }
        },
        created() {
            Get({
                url: 'currencyManagement/findAll',
                data: {
                    // vStatus: '',
                    // vName: '',
                    // shortName:''
                },
                success: res => {
                    this.list = res.data;
                    this.total = res.extra.pageData.totalCount;

                }
            })
            Get({
                url: 'currencyManagement/findAll',
                data: {
                    pageSize: 40
                },
                success: res => {
                    this.options = res.data;
                }
            })
        },
        methods: {
            hello_world() {

            },

            changepic(file, fileList) {
                console.log(this.fileList = file.raw)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            init() {
                Get({
                    url: 'currencyManagement/findAll',
                    data: {
                        // id: this.listQuery.id,
                        shortName: this.listQuery.shortName,
                        vName: this.listQuery.vName,
                        vStatus: this.listQuery.vStatus,
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
            upload_error() {
                this.$message({
                    type: 'error',
                    message: '上传失败'
                })
            },
            upload_error1() {
                this.$message({
                    type: 'error',
                    message: '修改失败'
                })
            },
            upload_success1() {
                console.log(this.dataS)
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
                this.thisClear()
                this.init_form();
                this.init();
            },
            upload_success() {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
                this.init_form();
                this.init();
            },
            agree_click() {
                if (this.type == 'add') {
                    this.$refs.upload.submit();
                    return
                    Post({
                        url: 'currencyManagement/addCurrencyManagement',
                        data: {
                            vName: this.form.vName,
                            shortName: this.form.shortName,
                            currencyType: this.form.currencyType,
                            description: this.form.description,
                            vStatus: this.form.vStatus,
                            decimalPlaces: this.form.decimalPlaces,
                            markUrl: this.form.markUrl,
                            ip: this.form.ip,
                            port: this.form.port,
                            serverUserName: this.form.serverUserName,
                            serverLoginName: this.form.serverLoginName,
                            walletPassword: this.form.walletPassword,
                            isWithdrawal: this.form.isWithdrawal,
                            isTopUp: this.form.isTopUp,
                            confirmCount: this.form.confirmCount,
                            topUpState: this.form.topUpState,
                            withdrawalCost: this.form.withdrawalCost,
                            minAmount: this.form.minAmount,
                            maxAmount: this.form.maxAmount,
                            withdrawalVerify: this.form.withdrawalVerify,
                            isTopUpGiving: this.form.isTopUpGiving,
                            topUpSendScaleSelf: this.form.topUpSendScaleSelf,
                            topUpSendScale1: this.form.topUpSendScale1,
                            topUpSendScale2: this.form.topUpSendScale2,
                            topUpSendScale3: this.form.topUpSendScale3,
                            topUpVirtualCurrency: this.form.topUpVirtualCurrency
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
                    var data = {
                        //                        file: this.fileList,
                        id: this.form.id,
                        vName: this.form.vName,
                        shortName: this.form.shortName,
                        currencyType: this.form.currencyType,
                        description: this.form.description,
                        vStatus: this.form.vStatus,
                        decimalPlaces: this.form.decimalPlaces,
                        markUrl: this.form.markUrl,
                        ip: this.form.ip,
                        port: this.form.port,
                        serverUserName: this.form.serverUserName,
                        serverLoginName: this.form.serverLoginName,
                        walletPassword: this.form.walletPassword,
                        isWithdrawal: this.form.isWithdrawal,
                        isTopUp: this.form.isTopUp,
                        confirmCount: this.form.confirmCount,
                        topUpState: this.form.topUpState,
                        withdrawalCost: this.form.withdrawalCost,
                        minAmount: this.form.minAmount,
                        maxAmount: this.form.maxAmount,
                        withdrawalVerify: this.form.withdrawalVerify,
                        isTopUpGiving: this.form.isTopUpGiving,
                        topUpSendScaleSelf: this.form.topUpSendScaleSelf,
                        topUpSendScale1: this.form.topUpSendScale1,
                        topUpSendScale2: this.form.topUpSendScale2,
                        topUpSendScale3: this.form.topUpSendScale3,
                        topUpVirtualCurrency: this.form.topUpVirtualCurrency
                    };
                    request
                        .post('/currencyManagement/updateCurrencyManagement')
                        .set('Content-type', 'application/x-www-form-urlencoded')
                        //                            .set('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundaryRCUgEN2nAjGJ8hWy')
                        .send(data)
                        .then(res => {
                            this.$store.state.loading.loading = false;
                            if (res.body.code === 0) {
                                this.$message({
                                    message: '更新成功！',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.init();
                                this.init_form();
                            } else {
                                this.$message({
                                    message: '更新失败！',
                                    type: 'error',
                                    duration: 2000
                                })
                            }
                        }).catch(res => {
                            this.$store.state.loading.loading = false;
                        })

                }
            }, //点击弹出框确认的事件；
            change_status(row) {
                Post({
                    url: 'currencyManagement/updatevStatus',
                    data: {
                        id: row.id,
                        vStatus: !row.vStatus - 0
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
            log(index) {
                var id = this.list[index].id;
                this.dataS.id = id;
            },
            thisClear(){
                
            },
            change_giving(row) {
                Post({
                    url: 'currencyManagement/updateistopUpgiving',
                    data: {
                        id: row.id,
                        isTopUpGiving: !row.isTopUpGiving - 0
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
            change_isWithdrawal(row) {
                Post({
                    url: 'currencyManagement/updateiswithdrawal',
                    data: {
                        id: row.id,
                        isWithdrawal: !row.isWithdrawal - 0
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
            change_isTopUp(row) {
                Post({
                    url: 'currencyManagement/updateistopUp',
                    data: {
                        id: row.id,
                        isTopUp: !row.isTopUp - 0
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
                    url: 'currencyManagement/deleteCurrencyManagement',
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
                this.fileList = [];
                this.show_dialog = true;
                this.type = 'add';
                this.title = '添加';
                this.addurl = '/currencyManagement/addCurrencyManagement';
            },
            edit_item(row) {
                this.fileList = [];
                this.hello_world()
                //                {name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}
                this.addurl = '/currencyManagement/updateCurrencyManagement';
                this.title = '编辑';
                this.show_dialog = true;
                this.type = 'update';
                this.form = Object.assign({}, row);
                for (var k in this.form) {
                    if (this.form[k] + '' !== 'null') {
                        this.form[k] = this.form[k] + '';
                    }
                }
            },
            init_form() {
                this.show_dialog = false;
                this.form = {
                    vName: '', //名称
                    shortName: '', //标题
                    currencyType: '0', //币种类型
                    description: '', //描述
                    vStatus: '0', //状态（0：正常，1：关闭）
                    decimalPlaces: '', //币种的小数位数
                    markUrl: "", //标志url
                    ip: '', //ip地址
                    port: '', //端口
                    serverUserName: '', //钱包服务器用户名
                    serverLoginName: '', //钱包服务器密码
                    walletPassword: '', //钱包密码
                    isWithdrawal: '0', //是否可以提现（0：是，1：否）
                    isTopUp: '0', //是否可以充值（0：是，1：否）
                    confirmCount: '', //充值确认次数
                    topUpState: '', //充值说明
                    withdrawalCost: '', //提现手续费（0-100的整数）
                    minAmount: '', //最小提现数量
                    maxAmount: '', //最大提现数量
                    IntegerwithdrawalVerify: '', //提现需后台审核阈值
                    isTopUpGiving: '0', //是否开启充值赠送(0：开启，1：关闭)
                    topUpSendScaleSelf: '', //用户充值自己赠送比例
                    topUpSendScale1: '', //充值赠送1代比例
                    topUpSendScale2: '', //充值赠送2代比例
                    topUpSendScale3: '', //充值赠送3代比例
                    topUpVirtualCurrency: ''
                }

            }

        }
    }

</script>
<style>
    .cell img {
        width: 30px;
        height: 30px;
    }

</style>
