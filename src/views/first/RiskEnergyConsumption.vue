<template>
    <div class="enery">
        <p class="my-title">能耗</p>
        <div class="my-div">
            <div class="my-card">
                <p class="p1">今日能耗</p>
                <p class="p2">{{Number(parseFloat(getAnnualEnergy.todayEnergy)).toFixed(1) || '--'}}</p>
            </div>
            <div class="my-card">
                <p class="p1">昨日能耗</p>
                <p class="p2">{{Number(parseFloat(getAnnualEnergy.lastDayEnergy)).toFixed(1) || '--'}}</p>
            </div>
        </div>
        <p class="ec-title">
            能耗变化曲线
            <span>
                <i class="today-leg"></i> 今日 &nbsp;&nbsp;&nbsp;&nbsp;
                <i class="wey-leg"></i> 昨日
            </span>
        </p>
        <div id="eneryType" style="width:100%;height:254px;padding-left:20px;"></div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    components: {},
    props: ["getAnnualEnergy"],
    data() {
        return {
            todayData: [],
            yesterdayData: []
        };
    },

    computed: {},

    mounted() {
        this.formatData();
    },
    created() {},
    methods: {
        formatData() {
            let today = this.getAnnualEnergy.today;
            let yesterday = this.getAnnualEnergy.lastDay;
            this.todayData = [];
            this.yesterdayData = [];
            let todayArr = [];
            let yesterdayArr = [];
            for (let i in today) {
                todayArr.push(today[i]); 
            }
             for (let i in yesterday) {
                yesterdayArr.push(yesterday[i]); 
            }
            if (todayArr) {
                this.todayData = Object.values(todayArr);
                
            }
            if (yesterdayArr) {
                this.yesterdayData = Object.values(yesterdayArr);
            }
            this.drawEnery();
        },
        drawEnery() {
            let eneryType = echarts.init(document.getElementById("eneryType"));
            let option = {
                tooltip: {
                    trigger: "axis"
                },
                // legend: {
                //     data:['今日','昨日'],
                //     icon:"rect",
                //     x: 'right' //居右显示
                // },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        axisTick: {
                            //x轴刻度线
                            show: false
                        },
                        axisLine: {
                            //x轴
                            show: false,
                            lineStyle: {
                                color: "#777D94"
                            }
                        },
                        data: [
                            "00:00",
                            "01:00",
                            "02:00",
                            "03:00",
                            "04:00",
                            "05:00",
                            "06:00",
                            "07:00",
                            "08:00",
                            "09:00",
                            "10:00",
                            "11:00",
                            "12:00",
                            "13:00",
                            "14:00",
                            "15:00",
                            "16:00",
                            "17:00",
                            "18:00",
                            "19:00",
                            "20:00",
                            "21:00",
                            "22:00",
                            "23:00",
                            "24:00"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLabel: {
                            formatter: "{value} "
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false
                        },
                        splitLine: {
                            //网格线
                            show: false
                        },
                        axisLine: {
                            //y轴
                            show: false,
                            lineStyle: {
                                color: "#777D94"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "昨日",
                        type: "line",
                        // symbol:'none',  //这句就是去掉点的
                        smooth: true, //这句就是让曲线变平滑的

                        itemStyle: {
                            normal: {
                                color: "#D7DDE1"
                            }
                        },
                        data: this.yesterdayData
                    },
                    {
                        name: "今日",
                        type: "line",
                        // symbol:'none',  //这句就是去掉点的
                        smooth: true, //这句就是让曲线变平滑的

                        itemStyle: {
                            normal: {
                                color: "#4C8BD8"
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(81,114,250,0.1)"
                                        },
                                        // {
                                        //     offset: 0.2,
                                        //     color: 'rgba(81,114,250,0.1)'
                                        // },
                                        {
                                            offset: 1,
                                            color: "rgba(81,114,250,0.01)"
                                        }
                                    ],
                                    false
                                )
                            }
                        },
                        data: this.todayData
                    }
                ]
            };
            eneryType.setOption(option);
            setTimeout(() => {
                window.onresize = function() {
                    eneryType.resize();
                };
            }, 10);
        }
    },
    watch: {}
};
</script>

<style scoped lang="less" style="text/less">
.enery {
    background: #fff;
    margin-top: 20px;
    .my-title {
        width: 100%;
        height: 120px;
        line-height: 120px;
        padding-left: 48px;
        border-bottom: 2px solid #e6e7f0;
        color: #212128;
        font-size: 34px;
        box-shadow: 0px 1px 0px 0px rgba(230, 231, 240, 1);
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
                letter-spacing: -1px;
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
        height: 70px;
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
