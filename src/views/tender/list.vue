<template>
  <div class="layout">
<!--
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入真实姓名" v-model="listQuery.loginName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
    </div>
-->
<!--表格-->
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
                <el-table-column align="center" label="用户昵称" >
					<template slot-scope="scope">
					  <span>{{scope.row.nickname}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="真实姓名">
	<template slot-scope="scope">
					  <span>{{scope.row.realname}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="用户微信收钱码">
	<template slot-scope="scope">
                      <img :src="scope.row.user_wechar" alt="" style="width:40px;height:40px" @click='$store.commit("open_img",scope.row.user_wechar)'>
					</template>
</el-table-column>
<el-table-column align="center" label="用户支付宝收钱码">
	<template slot-scope="scope">
		<img :src="scope.row.user_alipay" alt="" style="width:40px;height:40px" @click='$store.commit("open_img",scope.row.user_alipay)'>
	</template>
</el-table-column>
<el-table-column align="center" label="银行卡号">
	<template slot-scope="scope">
					  <span>{{scope.row.user_bank_card}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="银行名称">
	<template slot-scope="scope">
					  <span>{{scope.row.user_bank}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="银行卡持有人">
	<template slot-scope="scope">
					  <span>{{scope.row.user_bank_user}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="银行卡预留手机号">
	<template slot-scope="scope">
					  <span>{{scope.row.user_bank_phone}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="法币交易最大值" width='180'>
	<template slot-scope="scope">
					  <span>{{scope.row.fb_max_value}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="法币交易最小值" width='180'>
	<template slot-scope="scope">
					  <span>{{scope.row.fb_min_value}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="单价">
	<template slot-scope="scope">
					  <span>{{scope.row.fb_price}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="操作">
	<template slot-scope="scope">
<!--			  <span>{{scope.row.userBankPhone}}</span>-->
<el-button type='success' size='mini' @click='edit_item(scope.row)'>编辑</el-button>
	</template>
</el-table-column>
</el-table>
<!--弹出层-->
<div class="pagination-container page_size">
	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>
<el-dialog title="编辑" :visible.sync="show_dialog">
	<el-form ref="dataForm" label-position="left" label-width="120px" style='width: 600px; margin-left:50px;'>
		<el-form-item label="法币交易最大值" prop="type">
			<el-input v-model='form.fbMaxValue' type='number'></el-input>
		</el-form-item>
		<el-form-item label="法币交易最小值" prop="type" value-key='id'>
			<el-input v-model='form.fbMinValue' type='number'></el-input>
		</el-form-item>
		<el-form-item label="银行卡号">
			<el-input v-model='form.userBankCard' type='number'></el-input>
		</el-form-item>
		<el-form-item label="银行名称">
			<el-input v-model='form.userBank'></el-input>
		</el-form-item>
		<el-form-item label="银行卡持有人">
			<el-input v-model='form.userBankUser'></el-input>
		</el-form-item>
		<el-form-item label="银行卡持有人">
			<el-input v-model='form.userBankUser'></el-input>
		</el-form-item>
		<el-form-item label="银行预留号码">
			<el-input v-model='form.userBankPhone' type='number'></el-input>
		</el-form-item>
		<el-form-item label="是否开启交易">
			<el-select v-model='form.fbIsOpen' style='width:100%'>
				<el-option value='true' label='开启'></el-option>
				<el-option value='false' label='关闭'></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="单价">
			<el-input v-model='form.fbPrice' type='number'></el-input>
		</el-form-item>
		<el-form-item label="支付宝收钱码">
			<div class="upload-imgList" v-show='userAlipay'>
				<i class="el-icon-close" @click='delimg'></i>
				<img :src="userAlipay" alt="">
			</div>
			<el-upload ref='upload' v-show='!userAlipay' :action="config + 'fb/updateUserValue'" :data='data1' list-type="picture-card" :limit='1' :on-success='successload' :on-error='errorload' :on-change='pushImg1' name='userAlipay'>
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<el-form-item label="微信收钱码">
			<div class="upload-imgList" v-show='userWechar'>
				<i class="el-icon-close" @click='delimg3'></i>
				<img :src="userWechar" alt="">
			</div>
			<el-upload ref='upload3' v-show='!userWechar' :action="config + 'fb/updateUserValue'" :data='data' list-type="picture-card" :limit='1' :on-success='successload' :on-error='errorload' :on-change='pushImg' name='userWechar'>
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<!--
		<el-form-item label="单价">
			<el-input v-model='form.WecharName'></el-input>
		</el-form-item>
		<el-form-item label="单价">
			<el-input v-model='form.AlipayName'></el-input>
		</el-form-item>
-->
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="cancel_click">取 消</el-button>
		<el-button type="primary" @click="agree_click">确 定</el-button>
	</div>
</el-dialog>
</div>
</template>

<script>
	import config from '@/config.js'
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
				config: config,
				userWechar: '',
				userAlipay: '',
				form: {
					id: null,
					fbMinValue: '',
					userWechar: '',
					userAlipay: '',
					userBankCard: '',
					userBank: '',
					userBankUser: '',
					userBankPhone: '',
					fbIsOpen: '',
					fbPrice: '',
					WecharName: '',
					AlipayName: '',
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
				data: {

				},
				data1: {

				}
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				Get({
					url: 'fb/findUser',
					data: {
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
					},
					success: res => {
						this.list = res.data;
						this.total = res.extra.pageData.totalCount;
					}
				})
			},
			delimg() {
				this.userAlipay = '';
				this.$refs.upload.clearFiles();
			},
			successload(res) {
				this.init();
			},
			pushImg1(file, fileList) {
				this.userAlipay = file.url;
			}, //上传支付宝收款码
			pushImg(file, fileList) {
				this.userWechar = file.url;
			},
			delimg3() {
				this.userWechar = '';
				this.$refs.upload3.clearFiles();
			},
			errorload(res) {

			},
			cancel_click() {
				this.init_form();
			},
			agree_click() {
//				return
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
						url: 'fb/updateUserValue',
						data: {
							id:this.form.id || '',
							userId: this.form.uid || '',
							fbMinValue: this.form.fbMinValue || '', //法币交易最小值
							fbMaxValue: this.form.fbMaxValue || '', //法币交易最小值
							userWechar: '', //用户微信收钱码
							userAlipay: '', //用户支付宝收钱码
							userBankCard: this.form.userBankCard || '', //银行卡号
							userBank: this.form.userBank || '', //银行名称
							userBankUser: this.form.userBankUser || '', //银行卡持有人
							userBankPhone: this.form.userBankPhone || '', //银行卡所绑定的手机号
							fbIsOpen: this.form.fbIsOpen || '', //是否开启交易
							fbPrice: this.form.fbPrice || '', //单价
							WecharName: this.form.WecharName || '', //微信图片名称，在更换图片之后 这个值 前台换成图片的名字
							AlipayName: this.form.AlipayName || '', //支付宝图片名称，在更换图片之后 这个值 前台换成图片的名字
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
				this.type = 'update';
				this.title = '编辑';
				for (var k in row) {
					var arr = k.split('_');
					var newStr = arr.map((res, i) => {
						if (i !== 0) {
							return res[0].toUpperCase() + res.slice(1)
						} else {
							return res
						}
					}).join('');
					row[newStr] = row[k];
				}
				this.form = Object.assign({}, row);
				for (var k in this.form) {
					if (this.form[k] + '' !== 'null') {
						this.form[k] = this.form[k] + ''
					}
				}
				this.form.WecharName = this.form.user_wechar;
				this.form.AlipayName = this.form.user_alipay;
				this.show_dialog = true;
				this.userWechar = row.userWechar;
				this.userAlipay = row.userAlipay;

				this.data = {
					id:this.form.id || '',
					userId: this.form.uid || '',
					fbMinValue: this.form.fbMinValue || '', //法币交易最小值
					fbMaxValue: this.form.fbMaxValue || '', //法币交易最小值
					//					userWechar: this.userWechar, //用户微信收钱码
					userAlipay: '', //用户支付宝收钱码
					userBankCard: this.form.userBankCard || '', //银行卡号
					userBank: this.form.userBank || '', //银行名称
					userBankUser: this.form.userBankUser || '', //银行卡持有人
					userBankPhone: this.form.userBankPhone || '', //银行卡所绑定的手机号
					fbIsOpen: this.form.fbIsOpen || '', //是否开启交易
					fbPrice: this.form.fbPrice || '', //单价
					WecharName: this.form.WecharName || '', //微信图片名称，在更换图片之后 这个值 前台换成图片的名字
					AlipayName: this.form.AlipayName || '',
				}; //上传微信
				this.data1 = {
					id:this.form.id || '',
					userId: this.form.uid || '',
					fbMinValue: this.form.fbMinValue || '', //法币交易最小值
					fbMaxValue: this.form.fbMaxValue || '', //法币交易最小值
					//					userWechar: '', //用户微信收钱码
					//					userAlipay: '', //用户支付宝收钱码
					userBankCard: this.form.userBankCard || '', //银行卡号
					userBank: this.form.userBank || '', //银行名称
					userBankUser: this.form.userBankUser || '', //银行卡持有人
					userBankPhone: this.form.userBankPhone || '', //银行卡所绑定的手机号
					fbIsOpen: this.form.fbIsOpen || '', //是否开启交易
					fbPrice: this.form.fbPrice || '', //单价
					WecharName: this.form.WecharName || '', //微信图片名称，在更换图片之后 这个值 前台换成图片的名字
					AlipayName: this.form.AlipayName || '',
				} //上传支付宝
				console.log(JSON.stringify(this.data1, null, 4))
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
	.upload-imgList {
		width: 148px;
		height: 148px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.upload-imgList img {
		width: 100%;
	}

	.upload-imgList .el-icon-close {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 18px;
		color: #000;
		cursor: pointer;
	}

</style>
