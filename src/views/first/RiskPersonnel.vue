<template>
    <div class='personnel'>
        <p>今日在岗人数：{{personInfo.length}}人</p>
        <p class='p-else' v-for='(item,index1) in personInfo' :key='index1'>
            <span>{{item.name}}</span>
            <span>
                <a :href='`tel:${item.phone}`'>{{item.phone}}</a>
            </span>
        </p>
    </div>
</template>
<script>
export default {
    props: ['personInfo'],
    data() {
        return {}
    }
}
</script>
<style scoped lang="less" style="text/less">
.personnel {
    background: #fff;
    p {
        color: #212128;
        display: flex;
        justify-content: space-between;
        padding-left: 32px;
    }
    p:nth-of-type(1) {
        padding-top: 36px;
        padding-bottom: 34px;
        font-size: 34px;
        line-height: 48px;
        border-bottom: 2px solid #e6e7f0;
    }
    .p-else {
        font-size: 30px;
        margin-left: 34px;
        padding: 30px 32px 30px 0;
        border-bottom: 2px solid #e6e7f0;
    }
    p:last-child {
        border-bottom: none;
    }
}
</style>