<template>
    <div class='popup-box'>
        <mt-popup v-model='modalShow' position='bottom' modal='true'>
            <div class='float-layer' v-if="itemValue.objectInfo">
                <div class='head'>
                    <span>{{itemValue.objectInfo.localName}}</span>
                    <span>{{parseFloat(itemValue.value).toFixed(2)}}万</span>
                </div>
                <div class='float-content'>
                    <div class='float-nav'>
                        <span v-if="Object.keys(risk).length>0 || float1" @click="float1=true;float2=false;float3=false;float4=false;float5=false">第一级</span>
                        <span v-if="pop2Data.length>0 || float2" @click="float2=true;float1=false;float3=false;float4=false;float5=false">第二级</span>
                        <span v-if="Object.keys(risk3).length>0 || float3" @click="float3=true;float1=false;float2=false;float4=false;float5=false">第三级</span>
                        <span v-if="pop4Data.length>0 || float4" @click="float4=true;float1=false;float2=false;float3=false;float5=false">第四级</span>
                        <span v-if="Object.keys(risk5).length>0 || float5" @click="float5=true;float1=false;float2=false;float3=false;float4=false">第五级</span>
                    </div>
                    <!-- 一级浮层 -->
                    <div>
                        <div class='float-bottom popup1' v-if="float1">
                        <p class='grren-nav'>风险值计算涞源</p>
                        <div class='grren-count'>
                            <div class='count-t'>
                                <span>Pr,e</span>
                            </div>
                            <div class='count-b' >
                                <p>
                                    <span>运行：</span>
                                    <span>{{parseFloat(risk.p1).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>维保：</span>
                                    <span>{{parseFloat(risk.p2).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>维修：</span>
                                    <span>{{parseFloat(risk.p3).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>改造：</span>
                                    <span>{{parseFloat(risk.p4).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>培训：</span>
                                    <span>{{parseFloat(risk.p5).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>人力：</span>
                                    <span>{{parseFloat(risk.p6).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>巡检：</span>
                                    <span>{{parseFloat(risk.p7).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>投诉：</span>
                                    <span>{{parseFloat(risk.p8).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>物联网：</span>
                                    <span>{{parseFloat(risk.p9).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span>供电单元：</span>
                                    <span>{{parseFloat(risk.p10).toFixed(2)}}</span>
                                    <i class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup2('p10')"></i>
                                </p>
                                <p>
                                    <span>控制单元：</span>
                                    <span>{{parseFloat(risk.p11).toFixed(2)}}</span>
                                     <i class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup2('p11')"></i>
                                </p>
                                <p>
                                    <span>系统下元设备集合：</span>
                                    <span>{{parseFloat(risk.p12).toFixed(2)}}</span>
                                    <i class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup2('p12')"></i>
                                </p>
                                <p class='none'></p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- 二级浮层 -->
                    <div>
                        <div class='float-bottom popup2' v-if="float2">
                        <p class='grren-nav'>设备</p>
                        <div class='grren-count'>
                            <div class='count-t'>
                                <span>设备</span>
                            </div>
                            <div class='count-b'>
                                <p v-for="(item,index) in pop2Data" :key="index">
                                    <span># {{index+1}}. {{item.objectInfo.localName}}</span>
                                    <span>{{parseFloat(item.risk.p).toFixed(2)}}</span>
                                    <i class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup3(item)"></i>
                                </p>
                                <p class='none'></p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- 三级浮层 -->
                    <div>
                        <div class='float-bottom popup3' v-if="float3">
                            <p class='grren-nav'>风险值计算涞源</p>
                            <div class='grren-count'>
                                <div class='count-t'>
                                    <span>Pr,e</span>
                                </div>
                                <div class='count-b' >
                                    <p>
                                        <span>运行：</span>
                                        <span>{{parseFloat(risk3.p1 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>维保：</span>
                                        <span>{{parseFloat(risk3.p2 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>维修：</span>
                                        <span>{{parseFloat(risk3.p3 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>改造：</span>
                                        <span>{{parseFloat(risk3.p4 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>培训：</span>
                                        <span>{{parseFloat(risk3.p5 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>人力：</span>
                                        <span>{{parseFloat(risk3.p6 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>巡检：</span>
                                        <span>{{parseFloat(risk3.p7 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>投诉：</span>
                                        <span>{{parseFloat(risk3.p8 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>物联网：</span>
                                        <span>{{parseFloat(risk3.p9 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>供电单元：</span>
                                        <span>{{parseFloat(risk3.p10 || 0).toFixed(2)}}</span>
                                        <i v-if="Object.keys(risk3).length>0" class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup4('p10')"></i>
                                    </p>
                                    <p>
                                        <span>控制单元：</span>
                                        <span>{{parseFloat(risk3.p11 || 0).toFixed(2)}}</span>
                                        <i v-if="Object.keys(risk3).length>0" class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup4('p11')"></i>
                                    </p>
                                    <p>
                                        <span>系统下元设备集合：</span>
                                        <span>{{parseFloat(risk3.p12 || 0).toFixed(2)}}</span>
                                        <i v-if="Object.keys(risk3).length>0" class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup4('p12')"></i>
                                    </p>
                                    <p class='none'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 四级浮层 -->
                    <div>
                        <div class='float-bottom popup4' v-if="float4">
                        <p class='grren-nav'>设备</p>
                        <div class='grren-count'>
                            <div class='count-t'>
                                <span>设备</span>
                            </div>
                            <div class='count-b'>
                                <p v-for="(item,index) in pop4Data" :key="index">
                                    <span># {{index+1}}. {{item.objectInfo.localName}}</span>
                                    <span>{{parseFloat(item.risk.p).toFixed(2)}}</span>
                                    <i class='iconfont icon-ic_arrow_r' id="icond" @click="isShowPopup5(item)"></i>
                                </p>
                                <p class='none'></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <!-- 五级浮层 -->
                    <div>
                        <div class='float-bottom popup3' v-if="float5">
                            <p class='grren-nav'>风险值计算涞源</p>
                            <div class='grren-count'>
                                <div class='count-t'>
                                    <span>Pr,e</span>
                                </div>
                                <div class='count-b' >
                                    <p>
                                        <span>运行：</span>
                                        <span>{{parseFloat(risk5.p1 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>维保：</span>
                                        <span>{{parseFloat(risk5.p2 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>维修：</span>
                                        <span>{{parseFloat(risk5.p3 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>改造：</span>
                                        <span>{{parseFloat(risk5.p4 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>培训：</span>
                                        <span>{{parseFloat(risk5.p5 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>人力：</span>
                                        <span>{{parseFloat(risk5.p6 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>巡检：</span>
                                        <span>{{parseFloat(risk5.p7 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>投诉：</span>
                                        <span>{{parseFloat(risk5.p8 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>物联网：</span>
                                        <span>{{parseFloat(risk5.p9 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>供电单元：</span>
                                        <span>{{parseFloat(risk5.p10 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>控制单元：</span>
                                        <span>{{parseFloat(risk5.p11 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p>
                                        <span>系统下元设备集合：</span>
                                        <span>{{parseFloat(risk5.p12 || 0).toFixed(2)}}</span>
                                    </p>
                                    <p class='none'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style='width:100%;height:50px;margin-bottom:50px;'></div>
                <div class='foot' @click='close'>
                    <span>关闭</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import axios from "axios";
import {
    sourcesRisk,
    SourceFatherObjPFlag
} from "@/api/repair.js";
export default {
    props: ["isShowModal", "itemValue","risk"],
    data() {
        return {
          float1:true,//第一级
          float2:false,//第二级
          float3:false,//第三级
          float4:false,//第四级
          float5:false,//第五级
          pop2Data:[],  //2级浮层的设备数组
          pop4Data:[], //4级浮层的设备数组
          risk3:{}, //3级浮层的p数据
          risk5:{}, //5级浮层的p数据
          item:{} //把第三级的设备存起来，第四级用
        };
    },
    computed: {
        //关闭弹框
        modalShow: {
            get() {
                return this.isShowModal;
            },
            set(val) {
                this.$emit("update:isShowModal", val);
            }
        }
    },
    methods: {
       //关闭弹窗
        close() {
            this.modalShow = false;
        },
        // 二级浮层得到设备数组
        isShowPopup2(pFlag){
            let params = {
                getParams: {
                    fatherObj: this.itemValue.objectInfo.id,
                    pFlag: pFlag
                }
            };
            SourceFatherObjPFlag(params).then(res => {
                this.pop2Data = res.content
                console.log(this.pop2Data)         
                this.float1 = false;
                this.float2 = true;            
            })
        },
        //三级浮层得到p对象
         isShowPopup3(item){
             let params = {
                getParams: {
                    obj: item.objectInfo.id
                }
            };
            this.item = item
            sourcesRisk(params).then(res => {
                console.log(res)
                 this.float2 = false;
                 this.float3 = true;
                if(res.content.length>0){
                    this.risk3 = res.content[0].risk
                }
            })

         },
         // 四级浮层得到设备数组
        isShowPopup4(pFlag){
            let params = {
                getParams: {
                    fatherObj: this.item.objectInfo.id,
                    pFlag: pFlag
                }
            };
            SourceFatherObjPFlag(params).then(res => {
                this.pop4Data = res.content
                console.log(this.pop4Data)    
                this.float3 = false;
                this.float4 = true;      
            })
        },
        //五级浮层得到p对象
         isShowPopup5(item){
             let params = {
                getParams: {
                    obj: item.objectInfo.id
                }
            };
            sourcesRisk(params).then(res => {
                console.log(res)
                 this.float4 = false;
                 this.float5 = true;
                if(res.content.length>0){
                    this.risk5 = res.content[0].risk
                }
            })

         },
    }
};
</script>

<style scoped lang="less" style="text/less">
.popup-box {
    letter-spacing: 2px;
    width: 100%;
    height: 100%;
    overflow: scroll;
    .mint-popup {
        height: 80%;
        .float-layer {
            width: 100%;
            overflow: scroll;
            height: 100%;
            //标题
            .head {
                padding: 0 32px;
                width: 100%;
                height: 120px;
                background: rgba(255, 255, 255, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f6f7fc;
                span {
                    height: 48px;
                    font-size: 34px;
                    letter-spacing: -1px;
                }
            }
            // 层级
            .float-content {
                .float-nav {
                    height: 70px;
                    width: 100%;
                    padding: 0 32px;
                    display: flex;
                    align-items: center;
                    span {
                        width: 72px;
                        height: 34px;
                        font-size: 24px;
                        letter-spacing: -1px;
                        margin-right: 48px;
                        color: #212128;
                    }
                }
                .float-bottom {
                    width: 100%;
                    .grren-nav {
                        padding: 0 32px;
                        height: 70px;
                        background: rgba(246, 247, 252, 1);
                        display: flex;
                        align-items: center;
                        color: #777d95;
                        font-size: 24px;
                        letter-spacing: -1px;
                    }
                    .grren-count {
                        .count-t {
                            display: flex;
                            align-items: center;
                            height: 96px;
                            background: rgba(255, 255, 255, 1);
                            box-shadow: 0px 1px 0px 0px rgba(231, 232, 241, 1);
                            span {
                                padding: 0 32px;
                                font-size: 30px;
                                font-family: PingFangSC;
                                color: rgba(33, 33, 40, 1);
                                letter-spacing: -1px;
                                font-weight: bold;
                            }
                        }
                        .else {
                            box-shadow: none;
                        }
                        .count-b {
                            position: relative;
                            :last-child {
                                border-bottom: 0;
                            }
                            p {
                                height: 80px;
                                padding: 0 96px 0 0;
                                border-bottom: 1px solid #e7e8f1;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-left: 32px;
                                span {
                                    font-size: 24px;
                                    letter-spacing: -1px;
                                }
                            }
                            .none {
                                position: absolute;
                                bottom: 0;
                                left: 0;
                            }
                            i {
                                position: absolute;
                                right: 32px;
                            }
                        }
                    }
                }
            }
            // 底部
            .foot {
                width: 100%;
                height: 102px;
                background: rgba(250, 250, 252, 1);
                box-shadow: 0px 0.5px 0px 0px rgba(230, 230, 230, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                border-top: 1px solid #e7e8f1;
                position: absolute;
                bottom: 0;
                left: 0;
                span {
                    width: 80px;
                    height: 50px;
                    font-size: 36px;
                }
            }
        }
    }
}
</style>
<style lang="less">
.popup-box {
    overflow: scroll;
    .v-modal {
        opacity: 0.8 !important;
    }
    .mt-progress-runway {
        background: #ccc;
    }
    .mint-popup {
        width: 100%;
        height: 100%;
        border-radius: 16px 16px 0 0;
        .float-nav {
            .active {
                color: #4c8bd8 !important;
            }
        }
    }
    .v-modal {
        opacity: 0.07;
    }
}
</style>