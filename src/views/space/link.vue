<template>
  <div class="link-info">
    <mt-cell title="空间关联信息"></mt-cell>
    <div class="link-box">
      <p class="p1">所属专业-系统</p>
      <div class="p2">暖通专业-空调末端系统1</div>
      <p class="p1">服务空间</p>
      <div class="p2">中庭1、中庭2、中庭3、中庭1、中庭2、中庭3、中庭1、中庭2、中庭3</div>
      <p class="p1">配电关系</p>
      <div class="p2">
        <p>常备电源：配电箱1</p>
        <p>常备电源：配电箱1</p>
      </div>
      <p class="p1">配电关系</p>
      <div class="p2">空调控制箱1</div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
import { mapGetters } from "vuex";
import echarts from "echarts";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["projectId"])
  },
  mounted() {},

  methods: {}
};
</script>

<style scoped lang="less" style="text/less">
.link-info {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  .link-box {
    padding: 0 32px;
    .p1 {
      font-size: 30px;
      color: #7b8092;
    }
    .p2 {
      font-size: 30px;
      color: #212128;
      padding: 8px 0 24px;
    }
  }
}
</style>
<style lang="less">
</style>




