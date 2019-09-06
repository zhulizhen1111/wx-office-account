<template>
    <div class='bill'>
        <p class='my-title'>工单</p>
        <div class='my-div'>
            <div class='my-card'>
                <p class='p1'>新发工单</p>
                <p class='p2'>{{workOrder.createOrderNum}}</p>
            </div>
            <div class='my-card'>
                <p class='p1'>已完成工单</p>
                <p class='p2'>{{workOrder.finishOrderNum}}</p>
            </div>
        </div>
        <p class='ec-title'>
            四类工单完成情况
            <span>
                <i class='today-leg'></i> 今日 &nbsp;&nbsp;&nbsp;&nbsp;
                <i class='wey-leg'></i> 昨日
            </span>
        </p>
        <div id='billType' style='width:100%;height:254px;padding-left: 20px;'></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    components: {},
    props: ['workOrder'],
    data() {
        return {
            todayData:[],
            yesterdayData:[]
        }
    },

    computed: {},

    mounted() {
        this.$nextTick(function(){
            let today = this.workOrder.today
            let yesterday = this.workOrder.yesterday
            this.todayData = []
            this.todayData.push(
                today.runOrderNum,
                today.inspectOrderNum,
                today.repairOrderNum,
                today.maintainOrderNum,
                )          
            this.yesterdayData = []
            this.yesterdayData.push(
                yesterday.runOrderNum,
                yesterday.inspectOrderNum,
                yesterday.repairOrderNum,
                yesterday.maintainOrderNum
                )  
            this.drawBill()
        })
        
    },
    created() {},
    methods: {
        drawBill() {
            let billType = echarts.init(document.getElementById('billType'))
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            //x轴刻度线
                            show: false
                        },
                        axisLine: {
                            //y轴
                            show: false,
                            lineStyle: {
                                color: '#777D94'
                            }
                        },
                        color: '#777D94',
                        data: ['运行', '巡检', '维修', '维保']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            //y轴
                            show: false,
                            lineStyle: {
                                color: '#777D94'
                            }
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false
                        },
                        splitLine: {
                            //网格线
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '今日',
                        type: 'bar',
                        barGap: 0,
                        symbol: 'none', //这句就是去掉点的
                        smooth: true, //这句就是让曲线变平滑的
                        data: this.todayData,
                        // data: [2.0, 4.9, 7.0, 23.2],
                        itemStyle: {
                            normal: {
                                color: '#4C8BD8'
                            }
                        }
                    },
                    {
                        name: '昨日',
                        type: 'bar',
                        symbol: 'none', //这句就是去掉点的
                        smooth: true, //这句就是让曲线变平滑的
                        itemStyle: {
                            normal: {
                                color: '#D7DDE1'
                            }
                        },
                        data: this.yesterdayData
                        // data: [2.6, 5.9, 9.0, 26.4]
                    }
                ]
            }
            billType.setOption(option)
            setTimeout(() => {
                window.onresize = function() {
                    billType.resize()
                }
            }, 10)
        }
    }
}
</script>

<style scoped lang="less" style="text/less">
.bill {
    background: #fff;
    margin: 20px 0;
    .my-title {
        height: 120px;
        line-height: 120px;
        padding-left: 48px;
        border-bottom: 2px solid #e6e7f0;
        color: #212128;
        font-size: 34px;
        box-shadow: 0px 1PX 0px 0px rgba(230, 231, 240, 1);
        font-weight: bold;
    }
    .my-div {
        display: flex;
        .my-card {
            width: 326px;
            height: 160px;
            background: #fafafc;
            display: inline-block;
            margin: 32px 0px 32px 32px;
            .p1 {
                padding-left: 32px;
                padding-top: 32px;
                font-size: 28px;
                color: #777d95;
                letter-spacing: -1.32px;
            }
            .p2 {
                padding-top: 8px;
                color: #212128;
                padding-left: 32px;
                font-size: 34px;
                font-weight: bold;
            }
        }
    }
    .ec-title {
        line-height: 70px;
        color: #777d95;
        background: #f6f7fc;
        font-size: 24px;
        padding-left: 32px;
        > span {
            float: right;
            margin-right: 40px;
            .today-leg {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: #4c8bd8;
            }
            .wey-leg {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: #d7dde1;
            }
        }
    }
}
</style>
