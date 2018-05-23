<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="160px">
	<el-form-item label="选择币种：" >
		 <el-select v-model="form.currId" placeholder="请选择" style='width:400px' @change='Get_data' disabled>
               <el-option  v-for="item in options"
          :key="item.value"
          :label="item.vName"
          :value="item.id"></el-option>
        </el-select>
	</el-form-item>
	<el-form-item label="最小卖出价格：">
		<el-input v-model="form.minSell"  placeholder="最小卖出价格"></el-input>
	</el-form-item>
	<el-form-item label="最小买入价格：">
		<el-input v-model="form.minBuy"  placeholder="最小买入价格："></el-input>
	</el-form-item>
	<el-form-item label="买入手续费：">
		<el-input v-model="form.buyCost"  placeholder="买入手续费"></el-input>
	</el-form-item>
	<el-form-item label="卖出手续费：">
		<el-input v-model="form.sellCost"  placeholder="卖出手续费"></el-input>
	</el-form-item>
	<el-form-item label="买单交易最小数量：">
		<el-input v-model="form.buyMinTradeSum"  placeholder="买单交易最小数量"></el-input>
	</el-form-item>
 	<el-form-item label="卖单交易最小数量：">
 	    <el-input v-model="form.sellMinTradeSum"  placeholder="卖单交易最小数量"></el-input>
	 </el-form-item>
    <el-form-item label="交易状态：" >
		 <el-select v-model="form.tradeType" placeholder="请选择" style='width:400px'>
             <el-option label='开启' value='0'></el-option>
             <el-option label='关闭' value='1'></el-option>
        </el-select>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="onSubmit">{{submit ? '创建':'修改'}}</el-button>
		<el-button>取消</el-button>
	</el-form-item>
</el-form>
</div>
</template>

<script>
    import Get from '@/api/get.js'
    import Post from '@/api/post.js'
    export default {
        data() {
            return {
                form: {
                    minSell: '', // 最小卖出价格
                    minBuy: '', // 最小买入价格
                    buyCost: '', //买入手续费
                    sellCost: '', // 卖出手续费
                    buyMinTradeSum: '', //买单交易最小数量
                    sellMinTradeSum: '', //卖单交易最小数量
                    tradeType: '', //卖单交易最小数量
                },
                options: [],
                id: '',
                submit: 1
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Get({
                    url: 'work/selCurrid',
                    success: res => {
                        this.options = res.data;
                        var index = 0;
                        for(var i =0;i<res.data.length;i++){
                            if( res.data[i].vName == 'QC'){
                                index = i ;
                            }
                        }
                        this.form.currId = this.options[index].id;
                        this.id = this.options[index].id;
                        this.Get_data(this.id)
                    }
                });
            },
            Get_data(id) {
                Get({
                    url: 'work/sellegalTenderRedact',
                    data: {
                        currId: id
                    },
                    success: res => {
                        if (res.code === 0) {
                            if (res.data + '' === 'null') {
                                this.submit = 1;
                                this.form.minSell = '';
                                this.form.minBuy = '';
                                this.form.buyCost = '';
                                this.form.sellCost = '';
                                this.form.buyMinTradeSum = '';
                                this.form.sellMinTradeSum = '';
                                this.form.tradeType = '';
                            } else {
                                this.submit = 0
                                this.form.minSell = res.data.minSell;
                                this.form.minBuy = res.data.minBuy;
                                this.form.buyCost = res.data.buyCost;
                                this.form.sellCost = res.data.sellCost;
                                this.form.buyMinTradeSum = res.data.buyMinTradeSum;
                                this.form.sellMinTradeSum = res.data.sellMinTradeSum;
                                this.form.tradeType = res.data.tradeType + '';
                            }
                        }

                    }
                })
            },
            onSubmit() {
                //                this.$store.state.loading.loading = true;
                for (var k in this.form) {
                    if (!this.form[k]) {
                        this.$message({
                            message: '数据不完整！',
                            type: 'error',
                            duration: 2000
                        })
                        return
                    }
                }
                Post({
                    url: 'work/addlegalTenderRedact',
                    data: {
                        currId: this.form.currId,
                        minSell: this.form.minSell,
                        minBuy: this.form.minBuy,
                        buyCost: this.form.buyCost,
                        sellCost: this.form.sellCost,
                        buyMinTradeSum: this.form.buyMinTradeSum,
                        sellMinTradeSum: this.form.sellMinTradeSum,
                        tradeType: this.form.tradeType,
                    },
                    success: res => {
                        if (res.code === 0) {
                            this.$message({
                                title: '成功',
                                message: '创建成功！',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$message({
                                title: '成功',
                                message: '创建成功！',
                                type: 'success',
                                duration: 2000
                            })
                        }

                    },
                    fail: res => {
                        //                        this.$store.state.app.loading = false;
                    }
                })
            }
        }
    }

</script>

<style scoped>
    .layout {
        width: 600px;
    }

</style>
