<template>
  <div class="worth">
    <mt-navbar v-model="selecteValue">
      <mt-tab-item id="1">年化风险价值</mt-tab-item>
      <mt-tab-item id="2">风险损失量评估</mt-tab-item>
      <mt-tab-item id="3">风险防控措施</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selecteValue">
      <mt-tab-container-item id="1">
        <risk-annualized-detail :tempera1="result"></risk-annualized-detail>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <risk-loss-assessment></risk-loss-assessment>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <risk-prevention-measures></risk-prevention-measures>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from "axios";
import { accidentRisk } from "@/api/repair.js";
import tools from "@/utils/tools";
import RiskAnnualizedDetail from "./RiskAnnualizedDetail.vue";
import RiskLossAssessment from "./RiskLossAssessment.vue";
import RiskPreventionMeasures from "./RiskPreventionMeasures.vue";
export default {
  components: {
    RiskAnnualizedDetail,
    RiskLossAssessment,
    RiskPreventionMeasures
  },
  data() {
    return {
      content: [],
      selected: "1",
      selecteValue: "1",
      result: [],
      obj: {},
      tempera1:[]
     
    };
  },

  computed: {},

  mounted() {
    this.TheaccidentRisk();
  },

  methods: {
    filterString(i) {
      delete i.str;
      delete i.value;
      delete i.icon;
      delete i.id;
      delete i.isSubShow;
      return i;
    },
    toFormat(obj) {
      let arr = Object.values(obj);
      arr.forEach((i, index) => {
        if (i !== null && typeof i === "object") {
          arr[index] = {
            str: i.str,
            value: i.value,
            id: i.id,
            icon: i.icon,
            isSubShow:i.isSubShow,
            data: this.toFormat(this.filterString(i))
          };
        }
      });
      return arr;
    },
    handleData(i, floor) {
      const dataObj = {
        str: i[`c${floor}str`],
        value: i.value,
        icon: i.icon,
        isSubShow:i.isSubShow,
        id: i[`c${floor}`]
      };
      for (let j = 0; j < floor; j++) {
        if (this.obj[i.c1]) {
          if (floor > 1) {
            if (this.obj[i.c1][i.c2]) {
              if (floor > 2) {
                if (this.obj[i.c1][i.c2][i.c3]) {
                  if (floor > 3) {
                    this.obj[i.c1][i.c2][i.c3][i.c4] = dataObj;
                  }
                } else {
                  this.obj[i.c1][i.c2][i.c3] = floor === 3 ? dataObj : {};
                }
              }
            } else {
              this.obj[i.c1][i.c2] = floor === 2 ? dataObj : {};
            }
          }
        } else {
          this.obj[i.c1] = floor === 1 ? dataObj : {};
        }
      }
    },
    // 年化风险值
    TheaccidentRisk() {
      let params = {
        getParams: {}
      };
      accidentRisk(params).then(res => {
        this.obj = {};
        res.content.forEach(i => {
          if (i.c4) {
            // 则c4,c3,c2,c1都存在
            this.handleData(i, 4);
          } else if (i.c3) {
            this.handleData(i, 3);
          } else if (i.c2) {
            this.handleData(i, 2);
          } else {
            this.handleData(i, 1);
          }
        });
        this.result = this.toFormat(this.obj);
        console.log(this.result);
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.worth {
  width: 100%;
}
</style>
<style lang="less">
.oneMenu-left {
  .mt-progress {
    width: 544px;
    height: 6px;
    padding-top: 16px;
    padding-left: 0;
  }
}
.line .mt-progress {
  width: 548px;
  height: 6px;
  margin-top: 22px;
  padding-left: 0;
}
.mt-progress-runway {
  border-radius: 10px;
}
.mt-progress-progress {
  background: -webkit-linear-gradient(left, #4c8bd8 30%, #93b9e8 100%);
  border-radius: 10px;
}
.worth {
  .mint-tab-container {
    overflow: inherit;
  }
  .mint-cell {
    height: 120px;
    border-bottom: 1PX solid #efeff4;
  }
  .mint-navbar {
    height: 102px;
    background: #f3f3f6;
    letter-spacing: -1px;
    padding: 8px 32px;
    border-radius: 4px 0 0 4px;
    .mint-tab-item {
      width: 228px;
      height: 60px;
      text-align: center;
      padding-top: 15px;
      color: #4c8bd8;
      font-size: 28px;
      display: inline-block;
      border: 1PX solid #4c8bd8;
    }
    .mint-tab-item:nth-of-type(1) {
      border-radius: 8px 0 0 8px;
    }
    .mint-tab-item:nth-of-type(2) {
      border-right: none;
      border-left: none;
    }
    .mint-tab-item:nth-of-type(3) {
      border-radius: 0 8px 8px 0;
    }
    .mint-tab-item-label {
      font-size: 28px;
      letter-spacing: -1px;
    }
    .is-selected {
      background: #4c8bd8;
      color: #fff;
      position: relative;
    }
    .is-selected:after {
      display: none;
    }
  }
}
</style>
