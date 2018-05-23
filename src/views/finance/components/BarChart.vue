<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import {
        debounce
    } from '@/utils'
    import Get from '@/api/get'
    const animationDuration = 6000

    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300px'
            }
        },
        data() {
            return {
                chart: null
            }
        },
        created() {

        },
        mounted() {
            Get({
                url: 'total/imgTwo',
                success: res => {
                    if (res.code === 0) {
                        var xarr = [];
                        var data = [];
                        for (var i = 0; i < res.data.length; i++) {
                            data.push(res.data[i].sumCount)
                            xarr.push(res.data[i].sname)
                        }
                        this.initChart(xarr, data)
                    }
                }
            })
            //            this.__resizeHanlder = debounce(() => {
            //                if (this.chart) {
            //                    this.chart.resize()
            //                }
            //            }, 100)
            //            window.addEventListener('resize', this.__resizeHanlder)
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            window.removeEventListener('resize', this.__resizeHanlder)
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart(Xdata, arr) {
                this.chart = echarts.init(this.$el, 'macarons')
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: 10,
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: Xdata,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }],
                    series: [{
                        name: '市场交易量',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: arr,
                        animationDuration
                    }, ]
                })
            }
        }
    }

</script>
