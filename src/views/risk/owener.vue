<template>
    <div class="ower">
        <div class="hasrisk" v-if="riskData.length>0">
            <div class="cell-box" v-for="(item,index) in this.riskData" :key="index" @click="showDetail(item)">
                <p class="cell-info">{{item.title}}</p>
                <p class="cell-time">
                    <span v-if="item.status==2" :class="utiTime(item.cutoffTime)>new Date().getTime()/1000?'red':''">计划完成日期：{{item.cutoffTime}}</span>
                     <span v-if="item.status==3">计划完成日期：{{item.cutoffTime}}</span>
                    <span v-if="item.status==1">创建日期：{{formatTime(item.createTime)}}</span>
                     <span v-if="item.status==4">{{formatTime(item.createTime)}}-{{formatTime(item.finishTime)}}</span>
                    <span class="cell-name" v-if="item.status==1">创建人：{{item.createUserName}}</span>
                    <span class="cell-name" v-else>责任人：{{item.chargeUser}}</span>
                </p>
            </div>
        </div>
        <div class="norisk" v-else>
            <p>
                <img src="../../assets/img/页面内容为空.png" alt />
            </p>
            <p>还没有督办事项</p>
        </div>
         <div class="bottom" v-if="status==1">
                <button @click="creatRisk">创建督办事项</button>
        </div>
    </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
    props: ['riskData','status'],
    computed:{
        
    },
    methods: {
        showDetail(item) {
            this.$router.push({
                path: '/lookRisk',
                query: { id:item.id }
            })
        },
        creatRisk() {
            this.$router.push({ path: '/creatRisk' })
        },
        //时间戳变成时间格式
        formatTime(time) {
            return moment.unix(time/1000).format("YYYY.MM.DD");
        },
        //时间格式变成时间戳
        utiTime(str){
           return moment(str).unix()
        }
    }
}
</script>

<style scoped lang="less" style="text/less">
.ower {
    .hasrisk {
        .cell-box {
            height: 138px;
            border-bottom: 1px solid #efeff4;
            padding: 0 32px;
            //   line-height: 69px;
            .cell-info {
                font-size: 30px;
                color: #212128;
                font-weight: bold;
                margin-top: 26px;
                margin-bottom: 16px;
            }
            .cell-time {
                font-size: 24px;
                color: #7b8092;
                .red{
                    color: #FE6764 ;
                }
                .cell-name {
                    float: right;
                }
            }
        }
    }
    .bottom {
      margin-left: 32px;
        button {
            position: fixed;
            bottom: 10px;
            width: 100%;
            background: #4186fb;
            border: 1px solid rgba(5, 5, 5, 0.08);
            border-radius: 4px;
            width: 686px;
            height: 80px;;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            // margin: 0 auto;
            border: none;
            -moz-appearance: none;
            -webkit-appearance: none; /*解决ios上按钮的圆角问题*/
            border-radius: 4px; /*解决ios上输入框圆角问题*/
            outline: medium; /*去掉鼠标点击的默认黄色边框*/
        }
    }
    .norisk {
        text-align: center;
        margin-top: 400px;
        height: 900px;
        p {
            font-size: 36px;
            color: #262626;
            margin-top: 40px;
        }
    }
}
</style>