<template>
  <div class="maintenance">
    <mt-cell title="维修情况" value="2019年"></mt-cell>
    <p class="title">
      全年共维修
      <span class="num">4</span>次
    </p>
    <div class="custom">
      <div class="maintenanceLegend">
        <div>
          <i class="complete"></i>实际完成时间
        </div>
        <div>
          <i class="life-wrap">
            <i class="shelf-life"></i>
          </i>质保期
        </div>
      </div>
      <coordinate v-if="runData.length > 0" :min="min" :max="max" :list="runData" :type="type"></coordinate>
    </div>
  </div>
</template>

<script>
import { QueryIncident } from "@/api/gold.js";
import { mapGetters } from "vuex";
import echarts from "echarts";
import Coordinate from "./corrdinate.vue";
export default {
  data() {
    return {
      type: "month",
      min: 1546272000, // 2019.01.01
      max: 1577808000, // 2020.01.01
      runData: [
        {
          start: 1549036800, //实际开始时间2019.02.02
          end: 1552579200, //实际结束时间2019.03.15  一天的时间戳86400
          time: 3542400, //质保期 ,时间戳差值
          type: 0 // 0，已完成的巡检；1，巡检计划, -1, 红色交叉
        },
        {
          start: 1551715200, //实际开始时间2019.03.05
          end: 1558281600, //实际结束时间2019.05.20
          time: 6566400, //质保期 ,时间戳差值
          type: 0 // 0，已完成的巡检；1，巡检计划，-1, 红色交叉
        },
        {
          start: 1550592000, //实际开始时间2019.02.20
          end: 1558281600, //实际结束时间2019.05.20
          time: 7689600, //质保期 ,时间戳差值
          type: 0 // 0，已完成的巡检；1，巡检计划，-1, 红色交叉
        },
        {
          start: 1560960000, //2019.06.20
          end: 1567094400, //2019.08.30
          time: 6134400,
          type: 1 // 0，已完成的巡检；1，巡检计划，-1, 红色交叉
        }
      ]
    };
  },
  components: { Coordinate },
  computed: {
    ...mapGetters(["projectId"])
  },
  updated() {},
  mounted() {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="less" style="text/less">
.maintenance {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  .title {
    font-size: 28px;
    color: #212128;
    padding: 34px 32px;
    background: #fff;
    .num {
      font-size: 32px;
      color: #4186fb;
    }
  }
  .custom {
    .maintenanceLegend {
      background: #fff;
      height: 78px;
      padding: 0 20px;
      font-size: 24px;
      color: #7b8092;
      display: flex;
      justify-content: space-between;
      .complete {
        width: 16px;
        height: 16px;
        display: inline-block;
        border: 4px solid #4186fb;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 4px;
          height: 10px;
          background: #4186fb;
          top: 10px;
          left: 3px;
        }
      }
      .life-wrap {
        display: inline-block;
        width: 30px;
        height: 24px;
        overflow: hidden;
        .shelf-life {
          display: inline-block;
          width: 30px;
          height: 24px;
          margin-right: 10px;
          background-image: linear-gradient(
            90deg,
            rgba(65, 134, 251, 0.7) 0%,
            rgba(85, 227, 242, 0.1) 100%
          );
          transform: rotate(40deg);
          transform-origin: 0px 0px;
        }
      }
    }
  }
}
</style>
<style lang="less">
</style>




