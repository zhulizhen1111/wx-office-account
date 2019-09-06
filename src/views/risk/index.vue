<template>
  <div class="risk">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="getData(selected)">待处理</mt-tab-item>
      <mt-tab-item id="2" @click.native="getData(selected)">处理中</mt-tab-item>
      <mt-tab-item id="3" @click.native="getData(selected)">暂停</mt-tab-item>
      <mt-tab-item id="4" @click.native="getData(selected)">已完成</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <my-ower :riskData="riskData" :status="1"></my-ower>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <my-ower :riskData="riskData" :status="2"></my-ower>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <my-ower :riskData="riskData" :status="3"></my-ower>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <my-ower :riskData="riskData" :status="4"></my-ower>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import myOwer from "./owener";
import { querySupervise } from "@/api/gold.js";
export default {
  components: { myOwer },
  props: {},
  data() {
    return {
      selected: "1",
      isActive: false,
      riskData: []
    };
  },

  created() {
      
  },

  mounted() {
    if(this.$route.query.selectId){
          this.selected = this.$route.query.selectId.toString()
      }else{
          this.selected = '1'
      }
      this.getData(this.selected)
  },

  methods: {
    getData(status) {
      let order = null;
      if (status == 1) {
        order = [
          {
            column: "createTime",
            asc: true
          }
        ];
      } else if (status == 2 || status == 3) {
        order = [
          {
            column: "cutoffTime",
            asc: true
          },
          {
              column:"statusChangeTime",
              asc:true
          }
        ];
      } else {
        order = [
          {
            column: "finishTime",
            asc: false
          }
        ];
      }
      let params = {
        postParams: {
          criteria: {
            status: status
          },
          orders: [
            {
              column: "createTime",
              asc: true
            }
          ]
        }
      };
      this.riskData = [];
      querySupervise(params).then(res => {
        console.log(res);
        if (res.result == "success") {
          if (res.content) {
            this.riskData = res.content;
          }
        }
      });
    },
    infospan(index) {
      this.isActive = index + 1;
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.risk {
  background: #f3f3f6;
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
      .explain {
        position: absolute;
        z-index: 99;
        display: inline-block;
        padding: 5px;
        background: #40455a;
        padding: 20px;
        left: 50px;
        top: 50px;
        border-radius: 4px;
        color: #fff;
        display: none;
      }
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
          display: inline-block;
        }
        span:nth-of-type(1) {
          width: 324px;
          // word-break: break-all;
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
<style scoped lang="less" style="text/less">
.risk {
  .mint-tab-container .mint-tab-container-wrap .mint-tab-container-item {
    background: #fff;
    margin-top: 2px;
  }
}
</style>
