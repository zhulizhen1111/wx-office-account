<template>
  <div class="first">
    <div class="container">
      <!-- 风险提示 -->
      <div class="prompt">
        <mt-cell class="title-top" title="业主督办事项" to="/risk" is-link></mt-cell>
        <span class="iconRed">{{riskData.length}}</span>
        <div class="cell-box" v-for="(item,index) in riskData.slice(0,3)" :key="index" @click="show(item)">
          <p class="cell-info">{{item.title}}</p>
          <p class="cell-time">
            <span>计划完成日期：{{item.cutoffTime}}</span>
            <span class="cell-name">责任人：{{item.chargeUserName}}</span>
          </p>
        </div>
      </div>
      <!-- 年化风险价值 -->
      <risk-annualized-value></risk-annualized-value>
      <!-- 人员 -->
      <risk-personnel v-if="personInfo" :personInfo="personInfo"></risk-personnel>
      <!-- 工单 -->
      <risk-work-order v-if="Object.keys(workOrder).length>0" :workOrder="workOrder"></risk-work-order>
      <!-- 环境 -->
      <risk-environmental-science :environment="environment"></risk-environmental-science>
      <!-- 能耗 -->
      <risk-energy-consumption
        v-if=" Object.keys(getAnnualEnergy).length>0"
        :getAnnualEnergy="getAnnualEnergy"
        ref="RiskEnergyConsumption"
      ></risk-energy-consumption>
      <!-- 跳转方式 -->
      <risk-jump-mode></risk-jump-mode>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import RiskAnnualizedValue from "./RiskAnnualizedValue"; //年化风险价值
import RiskPersonnel from "./RiskPersonnel"; //人员
import RiskWorkOrder from "./RiskWorkOrder"; //工单
import RiskEnvironmentalScience from "./RiskEnvironmentalScience"; //环境
import RiskEnergyConsumption from "./RiskEnergyConsumption"; //能耗
import RiskJumpMode from "./RiskJumpMode"; //跳转方式
import axios from "axios";
import { querySummaryData, executingdDetail } from "@/api/repair.js";
import { querySupervise } from "@/api/gold.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    RiskAnnualizedValue,
    RiskPersonnel,
    RiskWorkOrder,
    RiskEnvironmentalScience,
    RiskEnergyConsumption,
    RiskJumpMode
  },
  props: {},
  data() {
    return {
      isActive: false,
      popupVisible: false,
      // 业主督办事项
      riskData: [],
      //人员
      personInfo: {},
      // 工单
      workOrder: {},
      //环境
      environment: {
        averageTdb: 0,
        averageCo2: 0,
        maxTdbValue: 0,
        minTdbValue: 0,
        maxCo2Value: 0,
        minCo2Value: 0
      },
      //能耗
      getAnnualEnergy: {
        // averageTodayEnergy: 0,
        // averageLastDayEnergy: 0,
        // data: []
      }
    };
  },

  computed: {
    ...mapGetters(["projectId"])
  },

  mounted() {
    this.querySummaryData();
    this.queryEnery();
    this.getData();
    // this.$refs.RiskEnergyConsumption.formatData()
  },

  methods: {
    getData() {
      let params = {
        postParams: {
          criteria: {
            status: [1, 2]
          },
          orders: [
            {
              column: "createTime",
              asc: true
            }
          ]
        }
      };
      querySupervise(params).then(res => {
        console.log(res);
        this.riskData = res.content;
      });
    },
    show(item) {
       this.$router.push({
                path: '/lookRisk',
                query: { id:item.id }
            })
    },
    xianqin() {
      this.popupVisible = true;
    },
    infospan(index) {
      this.isActive = index + 1;
    },
    // 人员 工单 环境
    querySummaryData() {
      let params = {
        getParams: {}
      };
      querySummaryData(params).then(res => {
        if (res.result == "success") {
          this.personInfo = res.content.personInfo.data;
          this.workOrder = res.content.workOrder;
          this.environment = res.content.environment;
        }
      });
    },
    // 能耗
    queryEnery() {
      let params = {
        getParams: {}
      };
      executingdDetail(params).then(res => {
        if (res.result == "success") {
          this.getAnnualEnergy = res.content;
        }
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.first {
  .container {
    width: 100%;
  }
  .prompt {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    .iconRed {
      position: absolute;
      display: inline-block;
      width: 44px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 20px;
      background: #fe6764;
      color: #fff;
      font-size: 22px;
      top: 30px;
      right: 60px;
    }
    .cell-box {
      height: 138px;
      border-bottom: 1px solid #efeff4;
      padding: 0 32px;
      //   line-height: 69px;
      .cell-info {
        font-size: 30px;
        color: #212128;
        font-weight: bold;
        margin-top: 26px;
        margin-bottom: 16px;
      }
      .cell-time {
        font-size: 24px;
        color: #7b8092;
        .cell-name {
          float: right;
        }
      }
    }
  }
  .prompt {
    .prompt-title {
      letter-spacing: -1px;
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 70px;
      background-color: #f6f7fc;
      text-align: left;
      span {
        font-size: 24px;
        color: #777d95;
      }
      span:nth-of-type(1) {
        width: 334px;
      }
      span:nth-of-type(2) {
        width: 76px;
      }
      span:nth-of-type(3) {
        width: 152px;
      }
    }
    .prompt-top {
      letter-spacing: -1px;
      padding: 0 32px 0 0;
      background-color: #ffffff;
      position: relative;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // height: 96px;
        padding: 25px 0;
        border-bottom: 1px solid #f3f3f6;
        margin-left: 32px;
        span {
          font-size: 30px;
          color: #212128;
        }
        span:nth-of-type(1) {
          width: 324px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          i {
            color: #51ba2c;
          }
          &.active {
            width: 324px;
            overflow: visible;
            white-space: normal;
          }
        }
        span:nth-of-type(3) {
          width: 152px;
        }
      }
      .mint-popup .mint-popup-left {
        width: 100px;
        p {
          width: 200px;
          height: 100px;
        }
      }
    }

    .p-bottom {
      width: 280px;
      height: 34px;
      font-size: 24px;
      color: #777d95;
      letter-spacing: -1px;
      margin: 18px auto;
    }
  }
}
</style>
<style lang="less" style="text/less">
.prompt {
  color: #212128;
  .title-top {
    .mint-cell-text {
      font-size: 34px;
      color: #212128;
    }
  }
  .mint-cell-wrapper {
    font-size: 30px;
    padding: 0 32px;
    color: #212128;
    line-height: 42px;
    letter-spacing: -1px;
    .mint-cell-value {
      color: #212128;
    }
  }
  .mint-cell-allow-right::after {
    border: solid 4px #d5d7e7;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 40px;
    position: absolute;
    width: 20px;
    height: 20px;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
  }
}
</style>

