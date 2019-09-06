<template>
    <div class="risk-control">
        <p class="title">事故</p>
        <div id="accident" style="width:330px;height:400px;margin-left:16px;"></div>
        <p class="title">品质</p>
        <div id="quality" style="width:330px;height:400px;margin-left:16px"></div>
        <p class="title">成本</p>
        <div id="cost" style="width:330px;height:400px;margin-left:16px"></div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    components: {},
    props: {},
    data() {
        return {};
    },

    computed: {},

    mounted() {
        this.draw();
        this.drawCost();
        this.drawAccident();
    },
    created() {},
    methods: {
        draw() {
            var quality = echarts.init(document.getElementById("quality"));
            var option = {
                // tooltip: {
                //     trigger: 'axis'
                // },
                // calculable: true,
                xAxis: [
                    {
                        type: "value",
                        splitLine: {
                            //网格线
                            show: false
                        },
                        axisLine: {
                            //y轴
                            show: true,
                            lineStyle: {
                                color: "#777D95"
                            }
                        },
                        boundaryGap: [0, 0.01],
                        color: "#212128"
                    }
                ],
                yAxis: [
                    {
                        type: "category",
                        axisTick: {
                            //x轴刻度线
                            show: false
                        },
                        data: ["运行", "维修", "维保", "改造", "培训", "其他"]
                    }
                ],
                series: [
                    {
                        name: "",
                        type: "bar",
                        barWidth: 20, //柱图宽度
                        itemStyle: {
                            normal: {
                                color: "#4C8BD8",
                                label: {
                                    show: true, //开启显示
                                    position: "right", //在上方显示
                                    formatter: "{c}万元",
                                    textStyle: {
                                        //数值样式
                                        color: "#212128",
                                        fontSize: 16
                                    }
                                }
                            }
                        },
                        data: [18, 23, 29, 70, 13, 63]
                    }
                ]
            };
            quality.setOption(option);
            setTimeout(() => {
                window.onresize = function() {
                    quality.resize();
                };
            }, 10);
        },
        drawCost() {
            var accident = echarts.init(document.getElementById("accident"));
            var option = {
                // tooltip: {
                //     trigger: 'axis'
                // },
                // calculable: true,
                xAxis: [
                    {
                        type: "value",
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            //网格线
                            show: false
                        },
                        axisLine: {
                            //y轴
                            show: true,
                            lineStyle: {
                                color: "#777D95"
                            }
                        },
                        color: "#212128"
                    }
                ],
                yAxis: [
                    {
                        type: "category",
                        axisTick: {
                            //x轴刻度线
                            show: false
                        },
                        data: ["运行", "维修", "维保", "改造", "培训", "其他"]
                    }
                ],
                series: [
                    {
                        name: "",
                        type: "bar",
                        barWidth: 20, //柱图宽度
                        itemStyle: {
                            normal: {
                                color: "#4C8BD8",
                                label: {
                                    show: true, //开启显示
                                    position: "right", //在上方显示
                                    formatter: "{c}万元",
                                    textStyle: {
                                        //数值样式
                                        color: "#212128",
                                        fontSize: 16
                                    }
                                }
                            }
                        },
                        data: [18, 23, 29, 70, 13, 63]
                    }
                ]
            };
            accident.setOption(option);
            setTimeout(() => {
                window.onresize = function() {
                    accident.resize();
                };
            }, 10);
        },
        drawAccident() {
            var cost = echarts.init(document.getElementById("cost"));
            var option = {
                // tooltip: {
                //     trigger: 'axis'
                // },
                // calculable: true,
                xAxis: [
                    {
                        type: "value",
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            //网格线
                            show: false
                        },
                        axisLine: {
                            //y轴
                            show: true,
                            lineStyle: {
                                color: "#777D95"
                            }
                        },
                        color: "#212128"
                    }
                ],
                yAxis: [
                    {
                        type: "category",
                        axisTick: {
                            //x轴刻度线
                            show: false
                        },
                        data: ["运行", "维修", "维保", "改造", "培训", "其他"]
                    }
                ],
                series: [
                    {
                        name: "",
                        type: "bar",
                        barWidth: 20, //柱图宽度
                        itemStyle: {
                            normal: {
                                color: "#4C8BD8",
                                label: {
                                    show: true, //开启显示
                                    position: "right", //在上方显示
                                    formatter: "{c}万元",
                                    textStyle: {
                                        //数值样式
                                        color: "#212128",
                                        fontSize: 16
                                    }
                                }
                            }
                        },
                        data: [18, 23, 29, 70, 13, 63]
                    }
                ]
            };
            cost.setOption(option);
            setTimeout(() => {
                window.onresize = function() {
                    cost.resize();
                };
            }, 10);
        }
    }
};
</script>

<style scoped lang="less" style="text/less">
.risk-control {
    width: 100%;
    background: #fff;
    .title {
        height: 120px;
        line-height: 120px;
        padding-left: 32px;
        font-size: 34px;
        color: #212128;
        border-bottom: 1PX solid #efeff4;
    }
}
</style>
