<template>
    <div class='temperature'>
        <p class='my-title'>环境</p>
        <div class='my-div'>
            <div class='my-card'>
                <span>平均温度</span>
                <span>{{environment.averageTdb.toFixed(1)}} ℃</span>
            </div>
            <div class='my-card'>
                <span>平均CO2</span>
                <span>{{environment.averageCo2.toFixed(1)}} ppm</span>
            </div>
            <div class='my-bottom'>
                <span>温度范围</span>
                <span>{{environment.minTdbValue.toFixed(1)}} ℃ - {{environment.maxTdbValue.toFixed(1)}} ℃</span>
            </div>
            <div class='my-bottom'>
                <span>CO2范围</span>
                <span>{{environment.minCo2Value.toFixed(1)}} ppm - {{environment.maxCo2Value.toFixed(1)}} ppm</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['environment'],
    data() {
        return {}
    }
}
</script>
<style scoped lang="less" style="text/less">
.temperature {
    background: #fff;
    .my-title {
        color: #212128;
        font-size: 32px;
        border-bottom: 2px solid #e6e7f0;
        height: 120px;
        line-height: 120px;
        padding-left: 48px;
        color: #212128;
        font-size: 34px;
        box-shadow: 0px 1PX 0px 0px rgba(230, 231, 240, 1);
        font-weight: bold;
    }
    .my-div {
        display: flex;
        flex-wrap: wrap;
        .my-card {
            width: 326px;
            height: 160px;
            background: #fafafc;
            display: inline-block;
            margin: 32px 0px 32px 32px;
            span {
                display: block;
            }
            span:nth-of-type(1) {
                padding-left: 32px;
                padding-top: 32px;
                font-size: 28px;
                color: #777d95;
                letter-spacing: -1px;
            }
            span:nth-of-type(2) {
                padding-top: 8px;
                color: #212128;
                padding-left: 34px;
                font-size: 32px;
                letter-spacing: -1px;
                font-weight: bold;
            }
        }
    }
    .my-bottom {
        width: 686px;
        height: 112px;
        margin: 0 auto;
        margin-bottom: 32px;
        background: #fafafc;
        span {
            display: inline-block;
        }
        span:nth-of-type(1) {
            height: 40px;
            line-height: 40px;
            padding: 36px 32px;
            font-size: 28px;
            letter-spacing: -1px;
            color: #777d94;
        }
        span:nth-of-type(2) {
            height: 48px;
            font-size: 34px;
            color: #212128;
            font-weight: bold;
        }
    }
}
</style>