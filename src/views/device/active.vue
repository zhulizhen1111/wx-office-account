<template>
  <div class="active">
    <mt-cell title="设备动态信息"></mt-cell>
    <p class="ac-warn">
      <img src="../../assets/img/报警.png" />
      <span>近3条报警</span>
    </p>
    <div class="warn-box" v-for="(item,index) in warnList" :key="index">
      <p class="p1">
        {{item.name}}
        <button class="warn-btn">{{item.status==1?"已恢复":"未恢复"}}</button>
      </p>
      <p class="warn-time">{{item.time}}</p>
    </div>
    <p class="ac-warn">
      <img src="../../assets/img/工单.png" />
      <span>近3条已完成工单</span>
    </p>
    <div class="bill-box" v-for="(item,index) in billList" :key="index">
      <p class="p1">
        <span class="bill-type">{{item.type}}</span>
        {{item.name}}
        <button class="bill-btn">{{item.state}}</button>
      </p>
      <p class="p2">
        执行人 {{item.people}}
        <span class="bill-time">实际完成时间 {{item.time}}</span>
      </p>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import "moment/locale/zh-cn";
import { mapGetters } from "vuex";
import echarts from "echarts";
export default {
  components: {},
  data() {
    return {
      warnList: [
        { name: "过滤网压差报警", status: 1, time: "2019.05.28  11:00" },
        { name: "过滤网压差报警", status: 0, time: "2019.05.28  11:00" },
        { name: "过滤网压差报警", status: 1, time: "2019.05.28  11:00" }
      ],
      billList: [
        {
          name: "空调箱过滤器维保",
          type: "维保",
          people: "刘福星",
          time: "2019.05.28  11:00",
          state: "延期完成"
        },
        {
          name: "空调箱过滤器维保",
          type: "维保",
          people: "刘福星",
          time: "2019.05.28  11:00",
          state: "按时完成"
        },
        {
          name: "空调箱过滤器维保",
          type: "维保",
          people: "刘福星",
          time: "2019.05.28  11:00",
          state: "延期完成"
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
.active {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  .ac-warn {
    font-size: 28px;
    color: #212128;
    background: #f3f3f6;
    padding: 24px 0 24px 32px;
    img {
      width: 32px;
      height: 40px;
      margin-right: 18px;
    }
  }
  .warn-box {
    padding: 0 32px;
    height: 130px;
    border-bottom: 1px solid #e6e7f0;
    .p1 {
      padding: 24px 0 12px 0;
      color: #212128;
      font-size: 28px;
    }
    .warn-btn {
      float: right;
      font-size: 22px;
      color: #fff;
      padding: 2px 14px;
      background: #fe6764;
      border-radius: 18px;
    }
    .warn-time {
      float: right;
    }
  }
  .bill-box {
    padding: 0 32px;
    height: 130px;
    border-bottom: 1px solid #e6e7f0;
    .bill-time {
      float: right;
    }
    .p1 {
      padding: 24px 0 12px 0;
      color: #212128;
      font-size: 28px;
    }
    .bill-btn {
      float: right;
      font-size: 22px;
      color: #fff;
      padding: 2px 14px;
      background: #4bcd9e;
      border-radius: 18px;
    }
    .bill-type {
      font-size: 22px;
      color: #7a818d;
      padding: 4px 14px;
      border-radius: 18px;
      background: #efeff3;
      margin-right: 16px;
    }
    .p2 {
      font-size: 24px;
      color: #7b8092;
    }
  }
}
</style>
<style lang="less">
</style>




