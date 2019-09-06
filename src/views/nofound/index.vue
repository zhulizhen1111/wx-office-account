<template>
    <div class="nofound">
        <div class="nofoundWrap">
            <p class="imgWrap"><img src="../../assets/fail.png" /></p>
            <p class="nofoundText">很抱歉，页面找不到了</p>
            <div class="btnWrap">
                <p class="btn-close one" @touchstart.prevent="close">返回公众号</p>
                <p class="btn-close two" @touchstart.prevent="goBack">重新加载</p>
            </div>
        </div>

    </div>
</template>

<script>
import { closeWindow } from 'api/global'
export default {
    name: 'nofound',
    data: function() {
        return {}
    },
    methods: {
        close() {
            closeWindow()
        },
        goBack() {
            windows.history.back()
        }
    },
    created() {}
}
</script>

<style lang="less" scoped>
@rem: 30rem;
.nofound {
    /*padding: 40/@rem;*/
    width: 100%;
    height: 100%;
    background: #ecedf4;
}

.imgWrap {
    width: 25%;
    margin: 0 auto;
    padding-top: 200 / @rem;
    img {
        width: 100%;
    }
}

.nofoundText {
    text-align: center;
    font-size: 30 / @rem;
    margin: 26 / @rem 0 40 / @rem 0;
}

.btnWrap {
    text-align: center;
}

.btn-close {
    display: inline-block;
    background: white;
    font-size: 28 / @rem;
    color: #333333;
    text-align: center;
    width: 200 / @rem;
    font-family: 'pingfangSC-MEDIUM';
    height: 64 / @rem;
    line-height: 64 / @rem;
    border-radius: 8 / @rem;
    border: 2 / @rem solid #ccc;
}

.one {
    margin-right: 20 / @rem;
}

.two {
    margin-left: 20 / @rem;
}
</style>