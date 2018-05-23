<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    import Get from '@/api/get'
    require('echarts/theme/macarons') // echarts theme
    import {
        debounce
    } from '@/utils'

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
                default: '350px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            chartData: {
                type: Object
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
                url: 'total/imgOne',
                success: res => {
                    if (res.code === 0) {
                        var arr1 = [];
                        var arr2 = [];
                        for (var i = 0; i < res.data.length; i++) {
                            arr1.push(res.data[i].ableSum)
                            arr2.push(res.data[i].shortName)
                        }
                        this.initChart(arr1, arr2)
                    }
                }
            })
            //            this.initChart()
//            if (this.autoResize) {
//                this.__resizeHanlder = debounce(() => {
//                    if (this.chart) {
//                        this.chart.resize()
//                    }
//                }, 100)
//                window.addEventListener('resize', this.__resizeHanlder)
//            }

            // 监听侧边栏的变化
            const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
            sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            if (this.autoResize) {
                window.removeEventListener('resize', this.__resizeHanlder)
            }

            const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
            sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

            this.chart.dispose()
            this.chart = null
        },
        methods: {
            setOptions: (obj,actualData, xData) => {
                obj.setOption({
                    xAxis: {
                        data: xData,
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: 20,
                        top: 30,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: [5, 10]
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        name: '可用数量',
                        smooth: true,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#3888fa',
                                lineStyle: {
                                    color: '#3888fa',
                                    width: 2
                                },
                                areaStyle: {
                                    color: '#f3f8ff'
                                }
                            }
                        },
                        data: actualData,
                        animationDuration: 2800,
                        animationEasing: 'quadraticOut'
                    }]
                })
            },
            initChart(data1, data2) {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chart,data1, data2)
            }
        }
    }

</script>
