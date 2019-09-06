<template>
    <div class="look-risk" v-if="show">
        <div class="header">
            <p>事项标题</p>
            <p>{{risk.title}}</p>
        </div>
        <div class="header">
            <p>创建时间</p>
            <p>{{formatTime(risk.createTime)}}</p>
        </div>
        <div class="header">
            <p>创建人</p>
            <p>{{risk.createUserName}}</p>
        </div>
        <div class="cont1">
            <p>事项描述</p>
            <p>{{risk.description}}</p>
        </div>
        <div class="header">
            <p>当前状态</p>
            <p>{{status}}</p>
        </div>
        <div class="cont2">
            <p class="p1">备注</p>
            <div class="cont2-bottom" v-if="risk.remarks" v-for="(remark,index) in risk.remarks" :key="index">
                <p>{{remark.content}}</p>
                <p class="img-p" v-if="remark.pics">
                    <span v-for="(url,ind) in remark.pics" :key="ind">
                        <img :src="url">
                    </span>
                </p>
                <p class="info-p">
                    <span>{{remark.createUserName}}</span>
                    <span>{{formatTime(remark.createTime) }}</span>
                </p>
            </div>
        </div>
        <div class="cont-3">
            <p class="p1">关联工作项</p>
            <div class="cont3-p">
                <p class="cont3-p1">
                    <span class="cont3-span1">
                        <img src="../../assets/img/gl.png" alt="">
                    </span>
                    <span class="cont3-span2">{{risk.contentItem}}</span>
                </p>
                <p class="cont3-p1">
                    <span class="cont3-span1">
                        <img src="../../assets/img/gl.png" alt="">
                    </span>
                    <span class="cont3-span2">{{risk.eventId}}
                        <span v-if="risk.eventStatus" class="cont3-span3" :class="risk.eventStatus==1?'org':'blue'">
                            <span v-if="risk.eventStatus">
                                <img v-if="risk.eventStatus==2" src="../../assets/img/ywc.png" alt="">
                                <img v-else src="../../assets/img/jxz.png" alt="">
                                </span>
                            <span v-if="risk.eventStatus">{{risk.eventStatus==1?'进行中':'已完成'}}</span>
                        </span>
                    </span>
                </p>
                <p class="cont3-p1">
                    <span class="cont3-span1">
                        <img src="../../assets/img/gl.png" alt="">
                    </span>
                    <span class="cont3-span2">{{risk.workorderId}}
                        <span v-if="risk.workorderStatus" class="cont3-span3" :class="risk.workorderStatus==1?'org':'blue'">
                            <span v-if="risk.workorderStatus">
                                <img v-if="risk.workorderStatus==1" src="../../assets/img/jxz.png" alt="">
                                 <img v-else src="../../assets/img/ywc.png" alt="">
                                </span>
                            <span v-if="risk.workorderStatus">{{risk.workorderStatus==1?'进行中':'已完成'}}</span>
                        </span>
                    </span>
                </p>
            </div>
        </div>

        <div class="header">
            <p>责任人</p>
            <p>{{risk.chargeUser}}</p>
        </div>
        <div class="header">
            <p>要求完成时间</p>
            <p>{{risk.cutoffTime}}</p>
        </div>
        <div class="foot" v-if="risk.status!=4">
            <button @click="more">更多操作</button>
        </div>
        <mt-popup v-model="popupVisible" position="bottom">
            <div class="popBottom">
                <p @click="edit">编辑事项</p>
                <p @click="setStatus(4)">完成事项</p>
                <p v-if="risk.status!=3" @click="setStatus(3)">暂停事项</p>
                <p v-if="risk.status==3" @click="setStatus(2)">恢复事项</p>
                <p class="button" @click="button">关闭</p>
            </div>

        </mt-popup>

    </div>
</template>

<script>
import {detailSupervise,setSuperviseStatus} from "@/api/gold.js";
import tools from "@/utils/tools";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
    components: {},
    props: {},
    data() {
        return {
            show: false,
            popupVisible: false,
            risk: {
            },
            riskId:"",
            status:""
        }
    },

    computed: {
      
    },

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            this.riskId = this.$route.query.id
            console.log(this.riskId)
            let params = {
                getParams:{
                    id:this.riskId
                } 
            }
            detailSupervise(params).then(res=>{
                console.log(res)
                if(res.result=='success'){
                     this.risk = res.data
                     if(this.risk.status==1){
                         this.status='待处理'
                     }else if(this.risk.status==2){
                         this.status='处理中'
                     }else if(this.risk.status==3){
                         this.status='暂停'
                     }else{
                          this.status='已完成'
                     }
                     this.show = true
                } 
            })
        },
        more() {
            this.popupVisible = true
        },
        button() {
            this.popupVisible = false
        },
         formatTime(time) {
            return moment.unix(time/1000).format("YYYY.MM.DD");
        },
        edit() {
            this.$router.push({ path: '/editRisk',query:{obj:JSON.stringify(this.risk)} })
        },
        setStatus(status){
            console.log(status)
            let updateUser = tools.getStorage("username");
            let params = {
                postParams:{
                    id:this.risk.id,
                    status:status,
                    //updateUser: "90000001",
                    updateUser:updateUser
                }
            }
            setSuperviseStatus(params).then(res=>{
                if(res.result=='success'){
                     this.$message({ type: "success", message: "设置成功!" });
                     this.popupVisible = false
                     this.getData()
                }else{
                     this.$message.error("设置失败！ ");
                }
            })
        }
    }
}
</script>

<style scoped lang="less" style="text/less">
.look-risk {
    font-family: PingFangSC-Regular;
    padding: 0 32px;
    background: #ffffff;
    .header {
        display: flex;
        justify-content: space-between;
        padding: 24px 0;
        border-bottom: 1px solid rgba(239, 239, 244, 0.8);
        p:nth-of-type(1) {
            height: 44px;
            font-size: 32px;
            color: #212128;
        }
        p:nth-of-type(2) {
            height: 42px;
            font-size: 30px;
            color: #7a818d;
        }
    }
    .cont1 {
        padding: 24px 0;
        border-bottom: 1px solid rgba(239, 239, 244, 0.8);
        p:nth-of-type(1) {
            font-size: 32px;
            color: #212128;
            height: 44px;
            margin-bottom: 24px;
        }
        p:nth-of-type(2) {
            width: 686px;
            height: 88px;
            font-size: 30px;
            color: #7a818d;
        }
    }
    // 备注
    .cont2 {
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(239, 239, 244, 0.8);
        .p1 {
            font-size: 32px;
            color: #212128;
            height: 44px;
            margin: 24px 0;
        }
        .cont2-bottom {
            // height: 412px;
            background: #f7f7fa;
            border-radius: 4px;
            margin-bottom: 16px;
            padding: 24px 32px;
            overflow: hidden;
            p:nth-of-type(1) {
                // height: 80px;
                font-size: 28px;
                color: #7a818d;
            }
           .img-p {
                padding: 32px 0 24px 0;
                span {
                    background: #fff;
                    display: inline-block;
                    border-radius: 2px;
                    width: 184px;
                    height: 184px;
                    margin-right: 20px;
                    img {
                        width: 184px;
                        height: 184px;
                        display: inline-block;
                    }
                }
                span:nth-of-type(3) {
                    margin-right: 0;
                }
            }
           .info-p {
                font-size: 24px;
                height: 34px;
                color: #7a818d;
                float: right;
                span:nth-of-type(2) {
                    margin-left: 32px;
                }
            }
        }
    }
    // 关联工作项
    .cont-3 {
        .p1 {
            padding: 24px 0;
            font-size: 32px;
            color: #212128;
        }
        .cont3-p {
            .cont3-p1 {
                margin-bottom: 16px;
                .cont3-span1 {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .cont3-span2 {
                    width: 634px;
                    height: 72px;
                    display: inline-block;
                    font-size: 28px;
                    color: #7a818d;
                    padding: 16px 24px;
                    background: #f7f7fa;
                    border-radius: 4px;
                    position: relative;
                    .org{
                         background: #FFBB3E;
                    }
                    .blue{
                        background: #4BCD9E;
                    }
                    .cont3-span3 {
                        width: 122px;
                        height: 40px;
                        position: absolute;
                        bottom: 16px;
                        right: 24px;
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        span:nth-of-type(1) {
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            margin: 0 8px 0 12px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        span:nth-of-type(2) {
                            display: inline-block;
                            font-size: 22px;
                            color: #ffffff;
                            height: 32px;
                            line-height: 32px;
                        }
                    }
                }
            }
        }
    }
    // 更多操作按钮
    .foot {
        width: 686px;
        margin: 0 auto;
        padding: 24px 0;
        button {
            font-size: 32px;
            width: 100%;
            height: 80px;
            background: #4186fb;
            border: 1px solid rgba(5, 5, 5, 0.08);
            border-radius: 8px;
            color: #ffffff;
            text-align: center;
        }
    }
    // 底部弹框
    .popBottom {
        width: 100%;
        background: #fff;
        p {
            padding: 0 32px;
            width: 100%;
            height: 102px;
            padding: 28px 0;
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #272727;
            text-align: center;
            line-height: 50px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .button {
            background: #fafafc;
            box-shadow: 0 0 0 0 #e6e6e6;
            font-size: 36px;
        }
    }
}
</style>
<style lang="less">
.look-risk {
    .mint-popup-bottom {
        width: 100%;
    }
}
</style>