<template>
  <div class="rectangular">
    <!-- 运行柱形 -->
    <div
      :class="['wrap', colorClass]"
      :style="`height:${YSPaceHeight(item.time1,item.time2)}px;width:${width}px`"
    >
      <section class="reac-wrap" @click.self="$emit('t-click', {})">
        <div class="reac" @click="onClick"></div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 72
    },
    yHeight: {
      type: Number,
      default: 180
    },
    item: {
      type: Object
    },
    colorClass: {
      type: String,
      default: "blue" // 枚举 blue, yellow, red
    }
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {
    // 间隔2小时的高度是30px,
    YSPaceHeight(time1, time2) {
      const time = time2.slice(0, 2) - time1.slice(0, 2);
      const k = this.yHeight / 24;
      return (time * k * 2).toFixed(0);
    },
    getStyle() {
      return `
        height: ${this.height}px;  
      `;
    },
    onClick() {
      this.$emit("t-click", { ...this.$attrs, ...this.$props });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.rectangular {
  .wrap {
    // width: 86px;
    height: 48px;
    margin-left: 50px;
    position: relative;
    .reac-wrap {
      overflow: hidden;
      width: 100%;
      height: 100%;
      .reac {
        width: 100%;
        height: 100%;
        background: #edf2fe;
      }
    }
  }
}
</style>
