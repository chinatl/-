<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-star-on" style="font-size:40px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">交易量</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="dealSum" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-sort" style="font-size:40px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">手续费</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="procedureSum" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-edit" style="font-size:40px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">可用余额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="balanceSum" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <i class="el-icon-error" style="font-size:40px"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">冻结金额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="freezeSum" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    import CountTo from 'vue-count-to'
    import Get from '@/api/get'
    export default {
        data() {
            return {
                dealSum: 0,
                procedureSum: 0,
                balanceSum: 0,
                freezeSum: 0,
            }
        },
        components: {
            CountTo
        },
        methods: {
            handleSetLineChartData(type) {
                return 
                this.$emit('handleSetLineChartData', type)
            },
            get_data(item) {
                Get({
                    url: 'total/'+item,
                    success: res => {
                        if(res.code === 0){
                            this[item] = res.data   
                        }
                    }
                })
            }
        },
        created() {
            this.get_data('dealSum');
            this.get_data('procedureSum');
            this.get_data('balanceSum');
            this.get_data('freezeSum');
        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .panel-group {
        margin-top: 18px;
        .card-panel-col {
            margin-bottom: 32px;
        }
        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);
            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }
                .icon-people {
                    background: #40c9c6;
                }
                .icon-message {
                    background: #36a3f7;
                }
                .icon-money {
                    background: #f4516c;
                }
                .icon-shoppingCard {
                    background: #34bfa3
                }
            }
            .icon-people {
                color: #40c9c6;
            }
            .icon-message {
                color: #36a3f7;
            }
            .icon-money {
                color: #f4516c;
            }
            .icon-shoppingCard {
                color: #34bfa3
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }

</style>
