<template>
  <div class="device">
    <mt-cell title="设备基本信息"></mt-cell>
    <div class="device-header">
      <div class="device-header-left">
        <img class="device-img" src="../../assets/img/QR.jpg" alt />
        <p class="device-img-name">设备二维码</p>
      </div>
      <div class="device-header-right">
        <p class="device-all">
          <span>空间名称</span>
          {{content.name}}
        </p>
        <p class="device-all">
          <span>本地编号</span>
          {{content.localId}}
        </p>
        <p class="device-all">
          <span>空间功能区类型</span>
          {{formatCodetoClass(equipmentAll,content.roomFuncType)}}
        </p>
        <p class="device-all">
          <span>所在位置</span>
          {{content.floorLocalName?content.floorLocalName + (content.spaceLocalName?'-'+content.spaceLocalName:""):""}}
        </p>
      </div>
    </div>
    <div class="device-position">
      <img :src="`${content.positionImg}`" alt />
    </div>
    <div class="inspection-con">
      <mt-cell title="巡检情况" value="5月4日-5月11日"></mt-cell>
      <div class="inspection-select">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">日常巡检</mt-tab-item>
          <mt-tab-item id="2">专项巡检</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <p class="title">隔油池参数查看</p>
            <div id="inspection" style="width:320px;height:246px;"></div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">222</mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <!-- 维修情况 -->
    <maintenance></maintenance>
    <!-- 维保情况 -->
    <protect></protect>
    <active></active>
    <a-link></a-link>
  </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
import { mapGetters } from "vuex";
import echarts from "echarts";
import maintenance from "./maintenance.vue";
import active from "./active.vue";
import ALink from "./link.vue";
import protect from "./protect.vue";
import { QuerySpaceCategory, querySpacePosition } from "@/api/gold.js";
import { formatCodetoClass } from "../../utils/formatCode.js";
export default {
  components: { maintenance, active, ALink, protect },
  data() {
    return {
      selected: "1",
      formatCodetoClass,
      content: {},
      category: "",
      equipmentAll: [], //所有空间
      rundata: [
        {
          planstart: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["projectId"])
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.getSpaceInfo();
      this.drawInspection();
    },
    //查询空间数据
    getSpaceInfo() {
      let params = {
        postParams: {
          criteria: {
            id: "Sp1101010001001001001"
          }
        }
      };
      querySpacePosition(params).then(res => {
        console.log(res);
        this.content = res.content;
        this.getCategory();
      });
    },
    //设备类型
    getCategory() {
      let params = {};
      QuerySpaceCategory(params).then(res => {
        if (res.result == "success") {
          this.equipmentAll = res.content;
        }
      });
    },
    drawInspection() {
      var inspection = echarts.init(document.getElementById("inspection"));
      let option = {
        backgroundColor: "#fff",
        legend: {
          data: ["计划时间", "实际时间"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          axisTick: {
            //x轴刻度线
            show: false
          },
          axisLine: {
            //y轴
            show: true,
            lineStyle: {
              color: "#777D95"
            }
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "category",
          data: [
            24,
            23,
            22,
            21,
            10,
            19,
            18,
            17,
            16,
            15,
            14,
            13,
            12,
            11,
            10,
            9,
            8,
            7,
            6,
            5,
            4,
            3,
            2,
            1,
            0
          ],
          boundaryGap: false,
          splitLine: {
            //网格线
            show: false
          },
          axisLabel: {
            formatter: "{value}:00"
          },
          axisLine: {
            //y轴
            show: true,
            lineStyle: {
              color: "#777D95"
            }
          }
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              },
              emphasis: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              }
            },
            data: [8, 8, 15, 16, 18, 10, 1]
          },
          {
            name: "实际时间",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                // barBorderColor: "rgba(65,134,251,1)",
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //渐变色在下面修改，这里是透明度
                  [
                    {
                      offset: 0,
                      color: "rgba(65,134,251,1)"
                    },
                    {
                      offset: 0.5,
                      color: "rgba(65,134,251,0.2)"
                    },
                    {
                      offset: 1,
                      color: "rgba(65,134,251,1)"
                    }
                  ]
                )
              }
            },
            data: [6, 6, 13, 14, 16, 9, 3]
          },
          {
            name: "计划时间段2",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              }
            },
            data: [5, 5, 10, 10, 9, 3, 2]
          },
          {
            name: "计划时间段3",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                // barBorderColor: "rgba(237,242,254,1)",
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //渐变色在下面修改，这里是透明度
                  [
                    {
                      offset: 0,
                      color: "rgba(65,134,251,1)"
                    },
                    // {
                    //   offset: 0,
                    //   color: "rgba(65,134,251,0.4)"
                    // },
                    {
                      offset: 0.5,
                      color: "rgba(65,134,251,0.04)"
                    },
                    // {
                    //   offset: 0,
                    //   color: "rgba(65,134,251,0.4)"
                    // },
                    {
                      offset: 1,
                      color: "rgba(65,134,251,1)"
                    }
                  ]
                )
              }
            },
            data: [2, 2, 4, 5, 7, 1, 1]
          },
          {
            name: "计划时间",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(237,242,254,1)",
                color: "rgba(237,242,254,1)"
              }
            },
            data: [2, 4, 6, 8, 10, 1, 2]
          }
        ]
      };

      inspection.setOption(option);
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.device {
  color: #212128;
  .device-header {
    background: #fff;
    padding-bottom: 48px;
    .device-header-left {
      float: left;
      .device-img {
        width: 150px;
        height: 150px;
        margin: 8px 48px;
      }
      .device-img-name {
        color: #7b8092;
        font-size: 26px;
        text-align: center;
      }
    }
    .device-header-right {
      .device-all {
        font-size: 30px;
        padding: 8px 0;
        span {
          color: #7b8092;
          padding-right: 16px;
        }
      }
    }
  }
  .device-position {
    background: #fff;
    padding: 0 32px 32px 32px;
    margin-bottom: 20px;
    img {
      width: 686px;
      height: 372px;
    }
  }
  .run-con {
    margin-top: 20px;
    background: #fff;
    .run-legend {
      background: #fff;
    }
  }
  .inspection-con {
    margin-top: 20px;
    .inspection-select {
      background: #fff;
      .title {
        font-size: 28px;
        color: #212128;
        padding: 34px 32px;
      }
    }
  }
}
</style>
<style lang="less">
.device {
  .mint-cell {
    .mint-cell-wrapper {
      padding: 0 32px;
    }
    .mint-cell-text {
      color: #212128;
      font-size: 34px;
      font-weight: bold;
    }
    .mint-cell-value {
      font-size: 28px;
      color: #7b8092;
    }
  }
}
</style>




