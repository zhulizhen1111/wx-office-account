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
import Coordinate from "../device/corrdinate.vue";
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
}
</style>
<style lang="less">
</style>




