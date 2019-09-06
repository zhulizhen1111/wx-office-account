<template>
  <div class="coordiante">
    <section class="container" @click.self="detailInfo = {}">
      <ul>
        <template v-for="(item, index) in myList">
          <!-- :style="`transform: translateX(${getOffsetLeft(item.start)}px)`" -->
          <li
            :key="index"
            :style="`transform: translate(${getOffsetLeftX(item.week)}px,${getOffsetTop(item.time1)}px)`"
          >
            <rectangular
              v-bind="item"
              @t-click="showDetail"
              :item="item"
              :yHeight="yHeight"
              :width="XWidth/7"
            ></rectangular>
          </li>
          <li
            :key="index"
            :style="`transform: translate(${getOffsetLeftX(item.week)}px,${getOffsetTop(item.state)}px)`"
          >
            <a-line v-bind="item" @t-click="showDetail"></a-line>
          </li>
        </template>
      </ul>
    </section>

    <section class="ruler">
      <ul>
        <template v-for="(item, index) in ruler">
          <li :key="index" :style="`transform: translateX(${index * unit}px)`">{{ showLabel(item) }}</li>
        </template>
      </ul>
    </section>
    <section class="yruler">
      <ul>
        <template v-for="(item, index) in yruler">
          <li
            :key="index"
            :style="`transform:translateX(${index * space}px) rotate(-90deg)`"
          >{{ (item) }}</li>
        </template>
      </ul>
    </section>

    <section
      :class="['detail-info', detailInfo.colorClass]"
      v-if="detailInfo && Object.keys(detailInfo).length > 0"
    >
      <div v-if="detailInfo.type==1">
        <p>
          <span>开启</span>
        </p>
        <p class="detail-time">要求开始时间 {{detailInfo.time1}} - {{detailInfo.time2}}</p>
        <p class="detail-time">实际开始时间 {{ detailInfo.state }}</p>
      </div>
      <div v-if="detailInfo.type==0">
        <p>
          <span>关闭</span>
        </p>
        <p class="detail-time">要求关闭时间 {{detailInfo.time1}} - {{detailInfo.time2}}</p>
        <p class="detail-time">实际关闭时间 {{ detailInfo.state }}</p>
      </div>
    </section>
  </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
import Rectangular from "./rectangular.vue";
import ALine from "./line.vue";
export default {
  components: {
    Rectangular,
    ALine
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
    minY: { type: Number, default: 0 },
    maxY: { type: Number, default: 0 },
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
    yHeight() {
      if (this.type === "week") {
        return 180;
      }
    },
    XWidth() {
      if (this.type === "week") {
        //得到手机屏幕的宽度
        let htmlWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        return htmlWidth - 120;
      }
    },
    ruler() {
      let rulerList = [];
      let n = 6; // 6格，7个刻度值
      if (this.type === "week") {
        return ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      }
      // 每个格的时间跨度 unitTime
      const unitTime = (this.max - this.min) / n;
      rulerList[0] = this.min;
      for (let i = 1; i <= n; i++) {
        rulerList[i] = rulerList[i - 1] + unitTime;
      }
      return rulerList;
    },
    yruler() {
      let yrulerList = [];
      let n = 5; // 4格，5个刻度值
      if (this.type === "week") {
        return [
          "00:00",
          //   "01:00",
          //   "02:00",
          //   "03:00",
          //   "04:00",
          //   "05:00",
          "06:00",
          //   "07:00",
          //   "08:00",
          //   "09:00",
          //   "10:00",
          //   "11:00",
          "12:00",
          //   "13:00",
          //   "14:00",
          //   "15:00",
          //   "16:00",
          //   "17:00",
          "18:00",
          //   "19:00",
          //   "20:00",
          //   "21:00",
          //   "22:00",
          //   "23:00",
          "24:00"
        ];
      }
      //   每个格的时间跨度 unitTime
      const unitTime = 24 / n;
      yrulerList[0] = "00:00";
      for (let i = 1; i <= n; i++) {
        yrulerList[i] = yrulerList[i - 1 + unitTime];
      }
      return yrulerList;
    },
    // 每一格对应 unit px
    unit() {
      // n格
      const n = this.ruler.length - 1;
      return this.XWidth / n;
    },
    space() {
      // n格
      const n = this.yruler.length - 1;
      return this.yHeight / n;
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
      this.myList = [...this.list];
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
    //方块的横坐标
    getOffsetLeftX(week) {
      const k = (week - this.min) / (this.max - this.min);
      if (this.type === "week") {
        return (k * this.XWidth - 20).toFixed(0);
      }
    },
    //方块的纵坐标
    getOffsetTop(time2) {
      const k = this.yHeight / 24;
      return (k * Number(time2.slice(0, 2))).toFixed(0);
    },
    // yanse
    getClass(type) {
      let className = "blue";
      switch (type) {
        case 0:
          className = "red";
          break;
        case 1:
          className = "blue";
          break;
        case -1:
          className = "yellow";
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
  width: 600px;
  margin: 0 auto;
  position: relative;
  margin-left: 100px;
  ul {
    position: relative;
    padding: 0;
    li {
      position: absolute;
      list-style: none;
      top: 20px;
    }
  }
  .container {
    height: 520px;
    overflow: hidden;
    border-bottom: 2px solid #e6e7f0;
    display: flex;
    align-items: center;
    ul {
      width: 100%;
      height: 72px;
      display: flex;
      align-items: flex-end;
      top: 70px;
      font-size: 24px;
      position: absolute;
    }
  }
  .ruler {
    background: #fff;
    height: 80px;
    color: #7b8092;
  }
  .yruler {
    background: #fff;
    width: 10px;
    height: 440px;
    position: absolute;
    top: 80px;
    left: 0px;
    text-align: center;
    color: #7b8092;
    border-right: 2px solid #e6e7f0;
    ul {
      transform: rotate(90deg);
      // margin-right: 20px;
      li {
        transform: rotate(90deg);
      }
    }
  }
  .detail-info {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    padding: 10px 20px;
    text-align: left;
    // border: 1px solid #4186fb;
    background: #ffffff;
    box-shadow: 0 -2px 4px 0 rgba(33, 33, 40, 0.25);
    border-radius: 4px;
    &.yellow {
      border-color: #ffbb3e;
    }
    &.red {
      border-color: #fe6764;
    }
    p {
      margin: 0;
    }
    .detail-time {
      color: #7b8092;
    }
  }
  .hidden {
    visibility: hidden;
  }
}
</style>
