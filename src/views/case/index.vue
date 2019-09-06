<template>
  <div class="case">
    <div class="case-tab" v-if="tabNames.length>0">
      <mt-navbar v-model="selected" :style="`transform:translateX(${leftX}px)`">
        <mt-tab-item
          :id="item.plan.id"
          v-for="(item,index) in tabNames"
          :key="index"
          @click.native="queryPlan(item.plan.id,index)"
        >{{item.plan.planShortName}}</mt-tab-item>
      </mt-navbar>
      <div class="ing-d">
         <img src="../../assets/img/menu.png" @click="popup" />
      </div>
      <mt-popup v-model="popupVisible" position="top">
        <div class="pop-div">
          <p>
            选择预案
            <img class="close2" @click="close" src="../../assets/img/close.png" />
          </p>
          <div>
            <div
              class="div1"
              v-for="(item,index) in tabNames"
              :key="index"
              :class="selected==item.plan.id?'active':''"
              @click="queryPlan(item.plan.id,index)"
            >
              <span class="s1">{{item.plan.planShortName}}</span>
              <i class="pop-right">
                <span class="pop-span">{{item.passCount}}</span>
                /{{item.allCount}}
              </i>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="case-top" v-if="tabNames.length>0">
      <div class="case-1">
        <p class="num">{{passCount}}</p>
        <p>通过人数</p>
      </div>
      <div>
        <p class="num">{{allCount}}</p>
        <p>参加考试人数</p>
      </div>
    </div>
    <div class="case-bottom" v-if="lists.length>0" v-for="(item,index) in lists" :key="index">
      <p class="case-type">{{item.name}}</p>
      <div class="case-data">
        <div
          class="case-div"
          v-for="(item1,index1) in item.personExamResults"
          :key="index1"
          @click="showDetail(item1)"
        >
          <span class="personImg">
            <img
              v-if="item1.headPortrait"
              :src="`/image-service/common/file_get?systemId=dataPlatform&key=${item1.headPortrait}`"
            />
            <img v-else src="../../assets/img/noimg.png" />
          </span>
          <span class="passImg">
            <img v-if="item1.isPass" class="col-img" src="../../assets/img/通过.png" />
            <img v-else class="col-img" src="../../assets/img/不通过.png" />
          </span>
          <p>{{item1.name}}</p>
        </div>
      </div>
    </div>
    <div class="status-icon" v-if="tabNames.length==0">
      <div>
        <img src="../../assets/img/页面内容为空.png" />
        <p class="text">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryEventReport, queryPlan } from "@/api/gold.js";
var moment = require("moment");
import "moment/locale/zh-cn";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      selected: 2,
      popupVisible: false,
      planId: "",
      tabNames: [], //tabs的名称组合
      allCount: 0,
      passCount: 0,
      lists: [],
      leftX:0
    };
  },
  computed: {
    ...mapGetters(["projectId"]),
    
  },
  mounted() {
    this.query();
  },

  methods: {
    query() {
      let params = {
        postParams: {
          criteria: {},
          orders: [
            {
              column: "planName",
              asc: false
            }
          ]
        }
      };
      queryPlan(params).then(res => {
        console.log(res);
        if (res.content.length > 0) {
          this.tabNames = res.content;
          if (res.content.length > 0) {
            this.selected = res.content[0].plan.id;
            this.queryPlan(this.selected);
          }
        }
      });
    },
    queryPlan(selected,index) {
      this.selected = selected;
      if(index > 1){
        this.leftX = -110 * (index-1)
      }else{
        this.leftX = 0
      }
      
      let params = {
        postParams: {
          criteria: {
            id: selected
          }
        }
      };
      queryPlan(params).then(res => {
        console.log(res);
        if (res.content.length > 0) {
          this.passCount = res.content[0].passCount;
          this.allCount = res.content[0].allCount;
          this.lists = res.content[0].personPositions;
          this.popupVisible = false;
        }
      });
    },
    popup() {
      this.popupVisible = true;
    },
    close() {
      this.popupVisible = false;
    },
    showDetail(item) {
      this.$router.push({
        path: "/oneCase",
        query: { obj: JSON.stringify(item) }
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.case {
  .case-tab {
    overflow: hidden;
    position: relative;
    background: #fff;
    .ing-d{
     
      background: #fff;
      z-index: 3;
      position: absolute;
      right: 0px;
      top:0;
      overflow: hidden;
      text-align: center;
      img {
        width: 36px;
        height: 32px;
        margin: 30px;
      
      }
    }
    
    .pop-div {
      padding: 0 0 32px 32px;
      p {
        position: fixed;
        text-align: center;
        font-size: 32px;
        padding: 32px 0;
        top: 0;
        left: 40%;
        .close2{
          position: fixed;
          top: 32px;
          right: 32px;
          width: 32px;
          height: 32px;
        }
      }
      div {
        margin-top: 100px;
        .div1 {
          display: inline-block;
          width: 333px;
          height: 80px;
          line-height: 60px;
          margin: 10px 10px 10px 0;
          padding: 12px 32px;
          background: #f7f7fa;
          border-radius: 4px;
          .s1 {
            width: 200px;
            font-size: 28px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
          }
          .pop-right {
            display: inline-block;
            .pop-span {
              color: #00d19b;
              display: inline-block;
            }
          }
        }
        .active {
          border: 1PX solid #4186fb;
          color: #4186fb;
        }
        .div1:hover {
          border: 1px solid #4186fb;
          color: #4186fb;
        }
      }
    }
  }
  .case-top {
    height: 196px;
    background: #fff;
    display: flex;
    justify-content: space-evenly;
    .case-1 {
      width: 35%;
      border-right: 1px solid #efeff4;
    }
    .num {
      font-size: 64px;
      color: #4bcd9e;
      padding-top: 32px;
      padding-left: 25px;
    }
  }
  .case-bottom {
    .case-type {
      height: 80px;
      font-size: 28px;
      color: #1c1d1f;
      padding-left: 32px;
      line-height: 80px;
    }
    .case-data {
      background: #fff;
      .case-div {
        display: inline-block;
        margin: 38px;
        .personImg {
          img {
            position: relative;
            width: 100px;
            height: 140px;
            border: 2px solid #f3f3f6;
          }
        }
        .passImg {
          img {
            position: absolute;
            width: 32px;
            height: 35px;
            margin-left: 60px;
            margin-top: -40px;
            z-index: 3;
          }
        }
        img {
          width: 100px;
          height: 140px;
        }
        p {
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #7a818d;
          font-size: 26px;
          background: #f3f3f6;
        }
      }
    }
  }
  .status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 310px;
    div {
      text-align: center;
      img {
        width: 164px;
        height: 132px;
      }
      .text {
        font-size: 36px;
        color: #262626;
        padding-top: 40px;
      }
    }
  }
}
</style>
<style lang="less">
.case {
  .mint-popup {
    width: 100%;
    height: 450px;
    overflow: scroll;
  }
  .mint-tab-item{
    .mint-tab-item-label {
        width: 240px;
     }
  }
  
}
</style>




