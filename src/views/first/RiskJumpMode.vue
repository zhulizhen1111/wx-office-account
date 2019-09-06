<template>
    <div class="jump">
        <div class="jump-cell">
            <mt-cell title="冷站" to is-link value></mt-cell>
            <mt-cell title="环境" to is-link value></mt-cell>
            <mt-cell title="报警" to is-link value></mt-cell>
            <mt-cell title="运行" to is-link value></mt-cell>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {}
    },

    computed: {},

    mounted() {},

    methods: {}
}
</script>

<style scoped lang="less" style="text/less">
.jump {
    background-color: #ffffff;
    width: 100%;
    margin-bottom: 22px;
}
</style>
<style lang="less" style="text/less">
.jump {
    .mint-cell {
        margin-left: 30px;
        border-bottom: none;
        font-size: 3px;
        color: #212128;
        font-weight:bold;
    }
    .mint-cell:last-child {
        border-bottom: none;
    }
    .mint-cell-allow-right::after {
        border: solid 4px #d5d7e7;
        border-bottom-width: 0;
        border-left-width: 0;
        content: ' ';
        top: 50%;
        right: 40px;
        position: absolute;
        width: 18px;
        height: 18px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
}
</style>

