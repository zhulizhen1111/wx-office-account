<template>
    <div class="device">
        <mt-cell title="设备基本信息"></mt-cell>
        <div class="device-header">
            <div class="device-header-left">
                <img class="device-img" src="../../assets/img/QR.jpg" alt />
                <p class="device-img-name">设备二维码</p>
            </div>
            <div class="device-header-right">
                <p class="device-all">
                    <span>设备名称</span>
                    {{content.name}}
                </p>
                <p class="device-all">
                    <span>本地编号</span>
                    {{content.localId}}
                </p>
                <p class="device-all">
                    <span>设备类型</span>
                    {{category}}
                </p>
                <p class="device-all">
                    <span>设备位置</span>
                    {{content.floorLocalName?content.floorLocalName + (content.spaceLocalName?'-'+content.spaceLocalName:""):""}}
                </p>
            </div>
        </div>
        <div class="device-position">
            <!-- <cad-graphy :cadWidth="cadWidth" :cadHeight="cadHeight" :dataUrl='dataUrl' :point='point'></cad-graphy>-->
            <img :src="`${content.positionImg}`" alt />
        </div>
        <div class="run-con">
            <mt-cell title="运行情况" value="5月4日-5月11日"></mt-cell>
            <div class="run-lengend">
                <div>
                    <i class="plan-time"></i>
                    <span>计划时间段</span>
                </div>
                <div>
                    <i class="run-nomal"></i>
                    <span>正常</span>
                </div>
                <div>
                    <i class="run-enomal"></i>
                    <span>异常</span>
                </div>
            </div>
            <graphics v-if="run.rundata.length > 0" :min="run.minX" :max="run.maxX" :minY="run.minY" :maxY="run.maxY" :list="run.rundata" :type="type"></graphics>
        </div>
        <div class="inspection-con">
            <mt-cell title="巡检情况" value="5月4日-5月11日"></mt-cell>
            <div class="inspection-select">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">日常巡检</mt-tab-item>
                    <mt-tab-item id="2">专项巡检</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <p class="title">隔油池参数查看</p>
                        <div class="maint-lengend">
                            <div>
                                <i class="plan"></i>计划时间
                            </div>
                            <div>
                                <i class="react"></i>实际时间
                            </div>
                        </div>
                        <main-day v-if="maint.maintdata.length > 0" :min="maint.minX" :max="maint.maxX" :minY="maint.minY" :maxY="maint.maxY" :list="maint.maintdata" :type="type"></main-day>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">222</mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!-- 维修情况 -->
        <maintenance></maintenance>
        <!-- 维保情况 -->
        <protect></protect>
        <active></active>
        <a-link></a-link>
    </div>
</template>

<script>
var moment = require('moment')
//// import cadGraphy from './cad-graphy'
import 'moment/locale/zh-cn'
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import MainDay from './mainDay' //巡检情况
import maintenance from './maintenance.vue' //维修情况
import protect from './protect.vue' //维保情况
import active from './active.vue' //设备动态信息
import ALink from './link.vue' //关联信息
import { queryEquipManetPosition, categoryQuery } from '@/api/gold.js'
import Graphics from './graphics.vue'

export default {
    components: {
        maintenance,
        active,
        ALink,
        protect,
        Graphics,
        MainDay,
        //cadGraphy
    },
    data() {
        return {
            cadWidth: 300,
            cadHeight: 200,
            dataUrl:
                '/graphy-service/image-service/common/file_get/Fl4201050001c72ff970d2ba11e8a57543fa3e79672520181120041440bim.jsonz?systemId=revit',
            point: [148176.88274222793, 57218.121920407],
            selected: '1',
            content: {},
            category: '',
            type: 'week',
            run: {
                minX: 1,
                maxX: 7,
                minY: 0,
                maxY: 24,
                rundata: [
                    {
                        time1: '06:00',
                        time2: '08:00',
                        week: 1,
                        state: '06:00',
                        type: 1 //正常开启
                    },
                    {
                        time1: '16:00',
                        time2: '18:00',
                        week: 1,
                        state: '20:00',
                        type: 0 //异常关闭
                    },
                    {
                        time1: '06:00',
                        time2: '08:00',
                        state: '06:00',
                        week: 4,
                        type: 1 //正常开启
                    },
                    {
                        time1: '18:00',
                        time2: '20:00',
                        state: '15:00',
                        week: 4,
                        type: 0 //异常关闭
                    }
                ]
            },
            maint: {
                minX: 1,
                maxX: 7,
                minY: 0,
                maxY: 24,
                maintdata: [
                    {
                        planTime1: '03:00',
                        planTime2: '10:00',
                        planTime: '2018.06.10 03:00 - 2018.06.10 10:00', //计划时间
                        state: 1, //按时完成
                        week: 1,
                        reacTime1: '04:00',
                        reacTime2: '08:00',
                        reacTime: '2018.06.10 04:00 - 2018.06.10 08:00' //实际完成时间
                    },
                    {
                        planTime1: '12:00',
                        planTime2: '20:00',
                        planTime: '2018.06.10 12:00 - 2018.06.10 20:00', //计划时间
                        week: 1,
                        state: 1,
                        reacTime1: '18:00',
                        reacTime2: '23:00',
                        reacTime: '2018.06.10 18:00 - 2018.06.10 23:00' //实际完成时间
                    },
                    {
                        planTime1: '03:00',
                        planTime2: '10:00',
                        planTime: '2018.06.11 03:00 - 2018.06.11 10:00', //计划时间
                        week: 2,
                        state: 0,
                        reacTime1: '06:00',
                        reacTime2: '12:00',
                        reacTime: '2018.06.11 06:00 - 2018.06.11 12:00' //实际完成时间
                    },
                    {
                        planTime1: '12:00',
                        planTime2: '20:00',
                        planTime: '2018.06.11 12:00 - 2018.06.11 20:00', //计划时间
                        state: 1,
                        week: 2,
                        reacTime1: '14:00',
                        reacTime2: '19:00',
                        reacTime: '2018.06.11 14:00 - 2018.06.11 19:00' //实际完成时间
                    },
                    {
                        planTime1: '16:00',
                        planTime2: '22:00',
                        planTime: '2018.06.12 16:00 - 2018.06.12 22:00', //计划时间
                        state: 0,
                        reacTime1: '22:00',
                        reacTime2: '24:00',
                        week: 3,
                        reacTime: '2018.06.12 22:00 - 2018.06.12 24:00' //实际完成时间
                    },
                    {
                        planTime1: '01:00',
                        planTime2: '10:00',
                        planTime: '2018.06.13 01:00 - 2018.06.13 10:00', //计划时间
                        state: 1,
                        reacTime1: '01:00',
                        reacTime2: '08:00',
                        week: 4,
                        reacTime: '2018.06.12 03:00 - 2018.06.13 08:00' //实际完成时间
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['projectId'])
    },

    mounted() {
        this.init()
    },

    methods: {
        init() {},
        //设备数据
        getDeviceData() {
            let params = {
                postParams: {
                    criteria: {
                        id: 'Eq1101010001001ACATFC001'
                    }
                }
            }
            queryEquipManetPosition(params).then(res => {
                this.content = res.content
                if (this.content.equipmentCategory) {
                    this.getCategory(this.content.equipmentCategory)
                }
            })
        },
        //设备位置
        getCategory(category) {
            let params = {
                postParams: {
                    criteria: {
                        equipCode: category
                    }
                }
            }
            categoryQuery(params).then(res => {
                this.category = res.content[0].equipName
            })
        }
    }
}
</script>

<style scoped lang="less" style="text/less">
.device {
    color: #212128;
    .device-header {
        background: #fff;
        padding-bottom: 48px;
        .device-header-left {
            float: left;
            .device-img {
                width: 150px;
                height: 150px;
                margin: 8px 48px;
            }
            .device-img-name {
                color: #7b8092;
                font-size: 26px;
                text-align: center;
            }
        }
        .device-header-right {
            .device-all {
                font-size: 30px;
                padding: 8px 0;
                span {
                    color: #7b8092;
                    padding-right: 16px;
                }
            }
        }
    }
    .device-position {
        background: #fff;
        padding: 0 32px 32px 32px;
        margin-bottom: 20px;
        img {
            width: 686px;
            height: 372px;
        }
    }
    .run-con {
        margin-top: 20px;
        background: #fff;
        .run-lengend {
            background: #fff;
            height: 78px;
            padding: 0 20px;
            font-size: 24px;
            color: #7b8092;
            display: flex;
            justify-content: space-between;
            .plan-time {
                display: inline-block;
                width: 38px;
                height: 24px;
                background: #edf2fe;
                margin-right: 10px;
            }
            .run-nomal {
                display: inline-block;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #fff;
                border: 2px solid #6ecfb0;
                position: relative;
                z-index: 0;
                margin-right: 20px;
                &::before {
                    content: '';
                    width: 16px;
                    height: 4px;
                    background: #6ecfb0;
                    position: absolute;
                    top: 5px;
                    z-index: 3;
                    left: 20px;
                }
                &::after {
                    content: '';
                    width: 16px;
                    height: 4px;
                    background: #6ecfb0;
                    position: absolute;
                    top: 5px;
                    z-index: 3;
                    left: -22px;
                }
            }
            .run-enomal {
                display: inline-block;
                margin-right: 20px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #fff;
                border: 2px solid #fe6764;
                position: relative;
                z-index: 0;
                &::before {
                    content: '';
                    width: 16px;
                    height: 4px;
                    background: #fe6764;
                    position: absolute;
                    top: 5px;
                    z-index: 3;
                    left: 20px;
                }
                &::after {
                    content: '';
                    width: 16px;
                    height: 4px;
                    background: #fe6764;
                    position: absolute;
                    top: 5px;
                    z-index: 3;
                    left: -22px;
                }
            }
        }
    }
    .inspection-con {
        margin-top: 20px;
        .inspection-select {
            background: #fff;
            .title {
                font-size: 28px;
                color: #212128;
                padding: 34px 32px;
            }
            .maint-lengend {
                background: #fff;
                height: 78px;
                padding: 0 20px;
                font-size: 24px;
                color: #7b8092;
                display: flex;
                justify-content: space-between;
                .plan {
                    display: inline-block;
                    width: 38px;
                    height: 24px;
                    background: #edf2fe;
                    margin-right: 10px;
                }
                .react {
                    display: inline-block;
                    width: 38px;
                    height: 24px;
                    border-left: 2px solid #4186fb;
                    border-right: 2px solid #4186fb;
                    background: #cbdefd;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
<style lang="less">
.device {
    .mint-cell {
        .mint-cell-wrapper {
            padding: 0 32px;
            background: none;
        }
        .mint-cell-text {
            color: #212128;
            font-size: 34px;
            font-weight: bold;
        }
        .mint-cell-value {
            font-size: 28px;
            color: #7b8092;
        }
    }
}
</style>




