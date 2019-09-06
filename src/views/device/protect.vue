<template>
  <div class="maintenance">
    <mt-cell title="维保情况" value="2018年01月-2020年2月"></mt-cell>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">短期维保</mt-tab-item>
      <mt-tab-item id="2">长期维保</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <p class="title">SOP名称</p>
        <div class="custom">
          <div class="protect-legend">
            <div>
              <i class="react-complete"></i>实际完成时间
            </div>
            <div>
              <i class="plan-complete"></i>要求开始时间
            </div>
            <div>
              <i class="life">
                <i class="shelf-life"></i>
              </i>质保期
            </div>
            <div>
              <i class="pro-plan">
                <i class="shelf-life"></i>
              </i>维保计划
            </div>
          </div>
          <coordinate v-if="runData.length > 0" :min="min" :max="max" :list="runData" :type="type"></coordinate>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">222</mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { QueryIncident } from "@/api/gold.js";
var moment = require("moment");
import "moment/locale/zh-cn";
import { mapGetters } from "vuex";
import echarts from "echarts";
import Coordinate from "./corrdinate.vue";
export default {
  components: { Coordinate },
  data() {
    return {
      selected: "1",
      type: "date",
      min: 1552147200,
      max: 1568908800,
      runData: [
        {
          start: 1554825600, //实际开始时间2019.04.10
          end: 1559145600, //实际结束时间2019.05.30
          time: 4320000, //质保期 ,时间戳差值
          type: 0
        },
        {
          start: 1557072000, //实际开始时间2019.05.06
          end: 1558281600, //实际结束时间2019.05.20
          time: 1209600, //质保期 ,时间戳差值
          type: 0
        },
        {
          start: 1562342400, //2019.07.06
          end: 1566230400, //2019.08.20
          time: 3888000,
          type: 1
        }
      ]
    };
  },

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
    .protect-legend {
      background: #fff;
      height: 78px;
      padding: 0 20px;
      font-size: 24px;
      color: #7b8092;
      display: flex;
      justify-content: space-between;
      .react-complete {
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
      .plan-complete {
        width: 16px;
        height: 16px;
        display: inline-block;
        border: 4px solid #ffbb3e;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 4px;
          height: 10px;
          background: #ffbb3e;
          top: 10px;
          left: 3px;
        }
      }
      .life {
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
      .pro-plan {
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
            rgba(255, 187, 62, 0.3) 0%,
            rgba(255, 208, 62, 0) 100%
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




