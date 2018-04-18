<template>
  <div class="layout">
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入币种名称" v-model="listQuery.shortName">
      </el-input>
      <el-select  style="width:200px"  v-model="listQuery.tradeType" placeholder="全部状态">
        <el-option label="全部状态" value="2"></el-option>
        <el-option label="已启用" value="1"></el-option>
        <el-option label="未启用" value="0"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="select_item">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add_item" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
<!--表格-->
   
    <el-table :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%;margin-top:20px">
			<el-table-column align="center" label="英文名称" width="80">
					<template slot-scope="scope">
					  <span>{{scope.row.shortName }}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="市场标题" width="80">
	<template slot-scope="scope">
					  <span>{{scope.row.basisV}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="最高价格">
	<template slot-scope="scope">
					  <span>{{scope.row.maxPrize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="最低价格">
	<template slot-scope="scope">
					  <span>{{scope.row.minPrize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="最新价格">
	<template slot-scope="scope">
					  <span>{{scope.row.latestPrize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="成交量">
	<template slot-scope="scope">
					  <span>{{scope.row.countPrize}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="日涨跌">
	<template slot-scope="scope">
					  <span>{{scope.row.roseFall}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="买入手续费">
	<template slot-scope="scope">
					  <span>{{scope.row.buyCost}}</span>
					</template>
</el-table-column>
<el-table-column align="center" label="卖出手续费">
	<template slot-scope="scope">
					  <span>{{scope.row.sellCost}}</span>
					</template>
</el-table-column>
<el-table-column class-name="status-col" label="交易状态" width="80" align='center'>
	<template slot-scope="scope">
					<el-button size="mini" :type="scope.row.tradeType ? 'warning' : 'success' " @click='change_status(scope.row)'>{{scope.row.tradeType ? "关闭":"开启"}}</el-button>
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
<!--弹出层-->
<el-dialog :title="title" :visible.sync="show_dialog">
	<el-form ref="dataForm" label-position="left" label-width="140px" style='width: 400px; margin-left:50px;'>
		<el-form-item label="币种id" prop="type">
			<el-input v-model='form.currId'></el-input>
		</el-form-item>
		<el-form-item label="基础市场id" prop="type">
			<el-input v-model='form.basisId'></el-input>
		</el-form-item>
		<el-form-item label="最新价格" prop="type">
			<el-input v-model='form.latestPrize'></el-input>
		</el-form-item>
		<el-form-item label="涨幅限制" prop="type">
			<el-input v-model='form.roseLimit'></el-input>
		</el-form-item>
		<el-form-item label="跌幅限制" prop="type">
			<el-input v-model='form.fallLimit'></el-input>
		</el-form-item>
		<el-form-item label="最大卖出价" prop="type">
			<el-input v-model='form.maxSellPrize'></el-input>
		</el-form-item>
		<el-form-item label="昨天收盘价" prop="type">
			<el-input v-model='form.yesterdayShou'></el-input>
		</el-form-item>
		<el-form-item label="今日开盘价" prop="type">
			<el-input v-model='form.todayKai'></el-input>
		</el-form-item>
		<el-form-item label="买入手续费" prop="type">
			<el-input v-model='form.buyCost'></el-input>
		</el-form-item>
		<el-form-item label="卖出手续费" prop="type">
			<el-input v-model='form.sellCost'></el-input>
		</el-form-item>
		<el-form-item label="买单交易最小数量" prop="type">
			<el-input v-model='form.buyMinTradeSum'></el-input>
		</el-form-item>
		<el-form-item label="卖单交易最小数量" prop="type">
			<el-input v-model='form.sellMinTradeSum'></el-input>
		</el-form-item>
		<el-form-item label="卖出手续费" prop="type">
			<el-input v-model='form.sellCost'></el-input>
		</el-form-item>
		<el-form-item label="交易状态" prop="type">
			<el-select v-model='form.tradeType'>
				<el-option label="开启" value="0"></el-option>
				<el-option label="关闭" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="在家赠送是否开启" prop="type" >
			<el-select v-model='form.buySendState'>
				<el-option label="开启" value="0"></el-option>
				<el-option label="关闭" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="卖家赠送是否开启" prop="type">
			<el-select  v-model="form.sellSendState">
				<el-option label="开启" value="0"></el-option>
				<el-option label="关闭" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="买家赠送币种ID" prop="type">
			<el-input v-model='form.buySendCurrId'></el-input>
		</el-form-item>
		<el-form-item label="卖家赠送币种ID" prop="type">
			<el-input v-model='form.sellSendCurrId'></el-input>
		</el-form-item>
		<el-form-item label="买家自己赠送比例" prop="type">
			<el-input v-model='form.buySendScaleSelf'></el-input>
		</el-form-item>
		<el-form-item label="买家一代赠送比例" prop="type">
			<el-input v-model='form.buySendScale1'></el-input>
		</el-form-item>
		<el-form-item label="买家二代赠送比例" prop="type">
			<el-input v-model='form.buySendScale2'></el-input>
		</el-form-item>
		<el-form-item label="买家三代赠送比例" prop="type">
			<el-input v-model='form.buySendScale3'></el-input>
		</el-form-item>
		<el-form-item label="卖家自己赠送比例" prop="type">
			<el-input v-model='form.sellSendScaleSelf'></el-input>
		</el-form-item>
		<el-form-item label="卖家一代赠送比例" prop="type">
			<el-input v-model='form.sellSendScale1'></el-input>
		</el-form-item>
		<el-form-item label="卖家二代赠送比例" prop="type">
			<el-input v-model='form.sellSendScale2'></el-input>
		</el-form-item>
		<el-form-item label="卖家三代赠送比例" prop="type">
			<el-input v-model='form.sellSendScale3'></el-input>
		</el-form-item>

	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="cancel_click">取 消</el-button>
		<el-button type="primary" @click="agree_click">确 定</el-button>
	</div>
</el-dialog>
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
					shortName: '', //登录名
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
					// pageNo: 1,
					// pageSize: 5,
					// isStart: '2',
					// shortName: '',
					tradeType:'2',
					shortName:'',
					latestPrize:'',
					minPrize:'',
					maxPrize:'',
					tradeAmount:'',
					roseFall:'',
					buyCost:'',
					sellCost:'',
					pageSize:5
				},
			}
		},
		created() {
			Get({
				url: 'currencyManage/findAll',
				data: {
					tradeType: '',
					shortName: '',
					basisV:''
				},
				success: res => {
					this.list = res.data;
					this.total = res.extra.pageData.totalCount;
				}
			})
		},
		methods: {
			init() {
				Get({
					url: 'currencyManage/findrest',
					data: {
						tradeMarket:this.listQuery.tradeMarket,
						tradeType: this.listQuery.tradeType,
						shortName: this.listQuery.shortName,
						latestPrize:this.listQuery.latestPrize,
						minPrize:this.listQuery.minPrize,
						maxPrize:this.listQuery.maxPrize,
						tradeAmount:this.listQuery.tradeAmount,
						roseFall:this.listQuery.roseFall,
						buyCost:this.listQuery.buyCost,
						sellCost:this.listQuery.sellCost,
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
			agree_click() {
				if (this.type == 'add') {
					Post({
						url: 'currencyManage/addCurrencyManage',
						data: {
							currId: this.form.currId, 
							basisId: this.form.basisId, 
							roseLimit: this.form.roseLimit, 
							fallLimit: this.form.fallLimit, 
							maxSellPrize: this.form.maxSellPrize, 
							yesterdayShou: this.form.yesterdayShou, 
							todayKai: this.form.todayKai, 
							buyCost: this.form.buyCost, 
							sellCost: this.form.sellCost, 
							buyMinTradeSum: this.form.buyMinTradeSum, 
							sellMinTradeSum: this.form.sellMinTradeSum, 
							tradeType: this.form.tradeType, 
							buySendState: this.form.buySendState, 
							sellSendState: this.form.sellSendState, 
							buySendCurrId: this.form.buySendCurrId, 
							sellSendCurrId: this.form.sellSendCurrId, 
							buySendScaleSelf: this.form.buySendScaleSelf, 
							buySendScale1: this.form.buySendScale1,
							buySendScale2: this.form.buySendScale2,
							buySendScale3: this.form.buySendScale3,
							sellSendScaleSelf: this.form.sellSendScaleSelf,
							sellSendScale1: this.form.sellSendScale1,
							sellSendScale2: this.form.sellSendScale2,
							sellSendScale3: this.form.sellSendScale3,
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
						url: 'currencyManage/updateCurrencyManage',
						data: {
							id: this.form.currId,
							roseLimit: this.form.roseLimit, 
							fallLimit: this.form.fallLimit, 
							buyCost: this.form.buyCost, 
							sellCost: this.form.sellCost, 
							buyMinTradeSum: this.form.buyMinTradeSum, 
							sellMinTradeSum: this.form.sellMinTradeSum, 
							tradeType: this.form.tradeType,
							buySendState: this.form.buySendState,
							sellSendState: this.form.sellSendState,
							buySendCurrId: this.form.buySendCurrId,
							sellSendCurrId: this.form.sellSendCurrId,
							buySendScaleSelf: this.form.buySendScaleSelf,
							buySendScale1: this.form.buySendScale1,
							buySendScale2: this.form.buySendScale2,
							buySendScale3: this.form.buySendScale3,
							sellSendScaleSelf: this.form.sellSendScaleSelf,
							sellSendScale1: this.form.sellSendScale1,
							sellSendScale2: this.form.sellSendScale2,
							sellSendScale3: this.form.sellSendScale3,
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
					url: 'currencyManage/updateTradeType',
					data: {
						id: row.id,
						tradeType: !row.tradeType - 0
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
					url: 'currencyManage/deleteCurrencyManage',
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
				this.form = Object.assign({},row);
				this.form.tradeType = this.form.tradeType +'';
			},
			init_form() {
				this.show_dialog = false;
				this.form = {
					loginName: '',
					loginPassword: '', 
					organize: '', 
					phone: '', 
					email: '', 
					tradeType: '0', 
					id: null
				}

			}

		}
	}

</script>
