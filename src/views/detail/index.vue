<template>
    <div class="detail">
        <mt-navbar v-model="selecteValue">
            <mt-tab-item id="1">风险值超限</mt-tab-item>
            <mt-tab-item id="0">风险值未超限</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selecteValue">
            <mt-tab-container-item id="1">
                <div class="line" v-for="(item,index) in detailArr" :key="index" @click="changeProject(item,index)" v-if="item.flag == 1">
                    <div class="line-left" v-if="item.objectInfo">
                        <p class="one-p">{{item.objectInfo.localName || ''}}</p>
                        <mt-progress :value='Number(parseFloat(item.value).toFixed(2))' :bar-height="6"></mt-progress>
                        <span>{{parseFloat(item.value).toFixed(2)}}万元</span>
                    </div>
                    <div class="line-right">
                        <i class="iconfont icon-ic_arrow_r" @click="this.router.push('/')"></i>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="0">
                <div class="line" v-for="(item,index) in detailArr" :key="index" @click="changeProject(item,index)" v-if="item.flag == 0">
                    <div class="line-left" v-if="item.objectInfo">
                        <p class="one-p">{{item.objectInfo.localName || ''}}</p>
                        <mt-progress :value='Number(parseFloat(item.value).toFixed(2))' :bar-height="6"></mt-progress>
                        <span>{{parseFloat(item.value).toFixed(2)}}万元</span>
                    </div>
                    <div class="line-right">
                        <i class="iconfont icon-ic_arrow_r" @click="this.router.push('/')"></i>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <floating-layer :isShowModal.sync="popupVisible" :risk="risk" :itemValue="itemValue" ref="floatingLayer"></floating-layer>
    </div>
</template>
<script>
import floatingLayer from "./floatinglayer1";
import axios from "axios";
import { Transfinite, sourcesRisk } from "@/api/repair.js";
export default {
    components: {
        floatingLayer
    },
    data() {
        return {
            popupVisible: false,
            selecteValue: "1",
            itemValue: {},
            subItem: [], //传过来的对象
            detailArr: [],
            popup: false,
            popupData:'',
            flag:'',
            riskPoint:'',
            risk:{}, //风险来源值
        };
    },
    computed: {
        modalShow: {
            get() {
                return this.isShowModal;
            },
            set(val) {
                this.$emit("update:isShowModal", val);
            }
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.subItem = JSON.parse(this.$route.query.item);
            this.detailArr = JSON.parse(this.$route.query.detailArr);
            this.detailTransFun()
            if(this.detailArr.length>0){
                this.detailTransfiniteFun()
            }
            // 
            // if (this.itemValue && this.itemValue.objectInfo.id) {
            //     this.ThesourcesRisk(,this.itemValue.objectInfo.id);
            // }
        });
    },

    methods: {
        detailTransFun(){
            this.detailArr.forEach(element => {
                this.flag=element.flag
            });
            this.riskPoint=this.subItem.id
        },
        // 风险值超限
        detailTransfiniteFun() {
            let params = {
                getParams: {
                    riskPoint: this.riskPoint,
                    flag:this.flag
                }
            };
            Transfinite(params).then(res => {
                if (res.result == "success") {
                    this.detailArr=res.content
                }
            });
        },
        // 点击显示弹窗
        changeProject(itemValue, i) {
            this.itemValue = itemValue;
            this.popupVisible = true;
            this.ThesourcesRisk(itemValue.objectInfo.id, itemValue.flag, i);
        },
        // 风险计算来源
        ThesourcesRisk(id, pFlag, i) {
            let params = {
                getParams: {
                    obj: id
                }
            };
            sourcesRisk(params).then(res => {
                if (res.content.length > 0) {
                    this.popupData = res.content
                    // this.$refs.floatingLayer.inititemValue(this.popupData)
                    this.risk = res.content[0].risk
                    // this.isShowContent[`popup${i + 1}`] = true;
                    // this.isShowTag(i);
                    // this.detailPop.equipments = res.content;
                }
            });
        }
    }
};
</script>

<style scoped lang="less" style="text/less">
.detail {
    .line {
        display: flex;
        justify-content: space-between;
        height: 120px;
        border-bottom: 1px solid #efeff4;
        padding: 0 32px;
        background: #fff;
        .line-left {
            position: relative;
            width: 628px;
            margin-top: 18px;
            height: 84px;
            p {
                padding: 0;
                height: 42px;
                color: #212128;
                font-size: 30px;
            }
            span {
                font-size: 24px;
                color: #777d95;
                position: absolute;
                right: -20px;
                bottom: 0;
            }
        }
        .line-right {
            padding: 40px 0;
            .icon-ic_arrow_r {
                width: 12px;
                height: 20px;
                font-size: 12px;
                color: #d5d7e7;
            }
        }
    }
}
</style>
<style lang="less">
.detail {
    .line .mt-progress {
        width: 548px;
        height: 6px;
        margin-top: 22px;
    }
    .mint-navbar {
        height: 120px;
        background: #f3f3f6;
        letter-spacing: px;
        padding: 20px 146px;
        .mint-tab-item {
            width: 228px;
            height: 60px;
            text-align: center;
            margin-top: 10px;
            padding: 15px 28px 10px 28px;
            color: #4c8bd8;
            font-size: 28px;
            display: inline-block;
            border: 1px solid #4c8bd8;
        }
        .mint-tab-item:nth-of-type(1) {
            border-radius: 10px 0 0 10px;
        }
        .mint-tab-item:nth-of-type(2) {
            border-radius: 0 10px 10px 0px;
        }
        .mint-tab-item-label {
            font-size: 28px;
            letter-spacing: -1px;
        }
        .is-selected {
            background: #4c8bd8;
            color: #fff;
            position: relative;
        }
        .is-selected:after {
            display: none;
        }
    }
    .mint-popup {
        width: 100%;
        height: 80%;
        overflow: scroll;
    }
    .popup-box {
        .mint-tab-item {
            flex: none;
            padding-left: 10px;
        }
        .mint-navbar {
            text-align: left;
        }
        .is-selected {
            border: none;
        }
    }
}
</style>


