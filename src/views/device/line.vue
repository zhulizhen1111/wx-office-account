<template>
  <div :class="['line', colorClass]">
    <!-- 运行的线 -->
    <div class="circle"></div>
  </div>
</template>
<script>
export default {
  props: {
    colorClass: {
      type: String,
      default: "blue" // 枚举 blue, yellow, red
    },
  },
  data() {
    return {};
  }
};
</script>
<style scoped lang="less" style="text/less">
.line {
  background: #fff;
  position: relative;
  margin: 0 auto;
  margin-left: 82px;
  .circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #6ecfb0;
    position: relative;
    z-index: 0;
    &::before {
      content: "";
      width: 30px;
      height: 4px;
      background: #6ecfb0;
      position: absolute;
      top: 5px;
      z-index: 3;
      left: 20px;
    }
    &::after {
      content: "";
      width: 30px;
      height: 4px;
      background: #6ecfb0;
      position: absolute;
      top: 5px;
      z-index: 3;
      left: -36px;
    }
  }
}
.blue {
  .circle {
    border: 2px solid #6ecfb0;
    &::before {
      background: #6ecfb0;
    }
    &::after {
      background: #6ecfb0;
    }
  }
}
.red {
  .circle {
    border: 2px solid #fe6764;
    &::before {
      background: #fe6764;
    }
    &::after {
      background: #fe6764;
    }
  }
}
</style>


