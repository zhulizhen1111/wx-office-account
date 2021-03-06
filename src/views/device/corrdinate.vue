<template>
  <div class="coordiante">
    <section class="container" @click.self="detailInfo = {}">
      <ul>
        <template v-for="(item, index) in myList">
          <li :key="index" :style="`transform: translateX(${getOffsetLeft(item.start)}px)`">
            <triangle v-bind="item" @t-click="showDetail"></triangle>
          </li>
        </template>
      </ul>
    </section>
    <section class="ruler">
      <ul>
        <template v-for="(item, index) in ruler">
          <li
            :class="{ hidden: isHidden(index) }"
            :key="index"
            :style="`transform: translateX(${index * unit}px)`"
          >{{ showLabel(item) }}</li>
        </template>
      </ul>
    </section>

    <section
      :class="['detail-info', detailInfo.colorClass]"
      v-if="detailInfo && Object.keys(detailInfo).length > 0"
    >
      <div>
        <p>维修时间 {{ formatTime(detailInfo.start) }}</p>
        <p>质保期 {{ detailInfo.time/86400 }}天</p>
      </div>
    </section>
  </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
import Triangle from "./triangle.vue";
export default {
  components: {
    Triangle
  },
  props: {
    // 刻度类型
    type: {
      type: String,
      default: "month" // 枚举类型， 'month': 月份； 'date': 天数； 'hour': 小时
    },
    // 时间跨度,最小
    min: {
      type: Number,
      default: 0
    },
    // 时间跨度,最大
    max: {
      type: Number,
      default: 0
    },
    // 三角形数据
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      height: 72,
      myList: [],
      detailInfo: {}
    };
  },

  computed: {
    /**
     * 标尺, 数字类型，
     * eg: [1546272000000, 1546358400000, 、、、] n个刻度，n-1段
     */
    XWidth() {
      if (this.type === "month") {
        let htmlWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        return htmlWidth - 50;
      } else {
        let htmlWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        return htmlWidth - 100;
      }
    },
    ruler() {
      let rulerList = [];
      let n = 6; // 6格，7个刻度值
      if (this.type === "month") {
        // 12格， 13个刻度值, 月份不平均，有的29天，有的31天
        return [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13"
        ];
      }
      // 每个格的时间跨度 unitTime
      const unitTime = (this.max - this.min) / n;
      rulerList[0] = this.min;
      for (let i = 1; i <= n; i++) {
        rulerList[i] = rulerList[i - 1] + unitTime;
      }
      return rulerList;
    },
    // 每一格对应 unit px
    unit() {
      // n格
      const n = this.ruler.length - 1;
      return this.XWidth / n;
    }
  },

  mounted() {
    this.handleList();
  },

  methods: {
    /**
     * 处理list数据， 获取各项的宽、高、重合三角形等
     */
    handleList() {
      this.myList = [...this.list, ...this.getOverlapping(this.list)];
      const k = this.XWidth / (this.max - this.min);
      this.myList = this.myList.map(i => {
        const obj = {
          width: k * i.time,
          height: i.height || this.height,
          colorClass: this.getClass(i.type)
        };
        return { ...i, ...obj };
      });
    },
    // 月份隐藏最后一个
    isHidden(index) {
      if (this.type === "month" && index === this.ruler.length - 1) {
        return true;
      }
      return false;
    },
    // 将时间戳转化为要显示的刻度
    showLabel(item) {
      let label = "";
      const date = new Date(item * 1000);
      switch (this.type) {
        case "date":
          label = `${date.getMonth() + 1}.${date.getDate()}`;
          break;
        case "hour":
          label = "待开发";
          break;
        default:
          label = item;
          break;
      }
      return label;
    },
    getOffsetLeft(start) {
      // max - min 的跨度代表 660px, 则 start - min 的跨度为
      const k = (start - this.min) / (this.max - this.min);
      if (this.type === "month") {
        return (k * this.XWidth).toFixed(0);
      } else {
        return (k * this.XWidth + 15).toFixed(0);
      }
    },
    // 得到重叠部分的三角形
    getOverlapping(list) {
      // 排序
      const _list = list.sort((i, j) => i.start - j.start);
      let arr = [];
      for (let i = 1; i < _list.length; i++) {
        //前一个大于后一个的头
        if (_list[i - 1].start + _list[i - 1].time > _list[i].start) {
          let end = _list[i - 1].start + _list[i - 1].time;
          let start = _list[i].start;
          let time = end - start;
          let height = (time / _list[i - 1].time) * 72;
          //前一个的尾大于后一个的尾巴（前一个包含后一个）
          if (
            _list[i - 1].start + _list[i - 1].time >
            _list[i].start + _list[i].time
          ) {
            end = _list[i].start + _list[i].time;
          }
          let obj = {
            start: start,
            end: end,
            time: end - start,
            height: height,
            type: -1
          };
          arr.push(obj);
        }
      }
      return arr;
    },
    getClass(type) {
      let className = "blue";
      switch (type) {
        case 0:
          className = "blue";
          break;
        case 1:
          className = "yellow";
          break;
        case -1:
          className = "red";
          break;
        default:
          className = "blue";
          break;
      }
      return className;
    },
    showDetail(item) {
      this.detailInfo = item;
    },
    formatTime(time) {
      return moment.unix(time).format("YYYY.MM.DD");
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.coordiante {
  width: 660px;
  margin: 0 auto;
  position: relative;
  ul {
    position: relative;
    padding: 0;
    li {
      position: absolute;
      list-style: none;
    }
  }
  .container {
    height: 400px;
    overflow: hidden;
    border-bottom: 2px solid #e6e7f0;
    display: flex;
    align-items: center;
    ul {
      width: 100%;
      height: 72px;
      display: flex;
      align-items: flex-end;
      margin-top: 200px;
      font-size: 24px;
    }
  }
  .ruler {
    background: #fff;
    height: 80px;
    color: #7b8092;
  }
  .detail-info {
    width: 380px;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    padding: 10px 20px;
    text-align: left;
    border: 1px solid #4186fb;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(33, 33, 40, 0.25);
    &.yellow {
      border-color: #ffbb3e;
    }
    &.red {
      border-color: #fe6764;
    }
    p {
      margin: 0;
    }
  }

  .hidden {
    visibility: hidden;
  }
}
</style>
