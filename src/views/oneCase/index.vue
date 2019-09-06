<template>
  <div class="one-case">
    <div class="one-title">
      <img
        v-if="this.obj.headPortrait"
        :src="`/image-service/common/file_get?systemId=dataPlatform&key=${obj.headPortrait}`"
      />
      <img v-else src="../../assets/img/noimg.png" />
      <div>
        <p>{{this.obj.name}}</p>
        <p>{{this.obj.name}}</p>
      </div>
    </div>
    <div class="one-bottom">
      <el-collapse accordion v-for="(item,index) in lists" :key="index">
        <el-collapse-item>
          <template slot="title">
            {{item.plan.planName}}
            <img
              v-if="item.isPass"
              class="col-img"
              src="../../assets/img/通过.png"
            />
            <img v-else class="col-img" src="../../assets/img/不通过.png" />
          </template>
          <div class="em-crd">
            <div class="every-card">
              <div class="crd-img">
                <img src="../../assets/img/笔试.png" />
                <p class="crd-p">笔试</p>
              </div>
              <div class="crd-div">
                <p>是否通过</p>
                <p>考试日期</p>
                <p>下次考试日期</p>
              </div>
              <div class="crd-div" v-if="item.master">
                <p
                  :class="item.master.writtenState == 2?'red':''"
                >{{item.master.writtenState == 1?"通过":(item.master.writtenState == 2?'不通过':'')}}</p>
                <p>{{formatDate(item.master.writtenExamTime)}}</p>
                <p>{{formatDate(item.master.writtenNextTime)}}</p>
              </div>
            </div>
            <div class="every-card">
              <div class="crd-img">
                <img src="../../assets/img/线下实操.png" />
                <p class="crd-p">线下实操</p>
              </div>
              <div class="crd-div">
                <p>是否通过</p>
                <p>考试日期</p>
                <p>下次考试日期</p>
              </div>
              <div class="crd-div" v-if="item.master">
                <p
                  :class="item.master.operationState == 2?'red':''"
                >{{item.master.operationState == 1?"通过":(item.master.operationState == 2?"不通过":'')}}</p>
                <p>{{formatDate(item.master.operationExamTime)}}</p>
                <p>{{formatDate(item.master.operationNextTime)}}</p>
              </div>
            </div>
            <div class="every-card">
              <div class="crd-img">
                <img src="../../assets/img/应急演练.png" />
                <p class="crd-p">应急演练</p>
              </div>
              <div class="crd-div">
                <p>是否通过</p>
                <p>考试日期</p>
                <p>下次考试日期</p>
              </div>
              <div class="crd-div" v-if="item.master">
                <p
                  :class="item.master.emergencyState == 2?'red':''"
                >{{item.master.emergencyState == 1?"通过":(item.master.emergencyState == 2?"不通过":'')}}</p>
                <p>{{formatDate(item.master.emergencyExamTime)}}</p>
                <p>{{formatDate(item.master.emergencyNextTime)}}</p>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { QueryIncident } from "@/api/gold.js";
var moment = require("moment");
import "moment/locale/zh-cn";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      lists: [],
      obj: {}
    };
  },
  computed: {
    ...mapGetters(["projectId"])
  },
  mounted() {
    this.$nextTick(function() {
      this.obj = JSON.parse(this.$route.query.obj);
      console.log(this.obj);
      if (this.obj.personId) {
        this.getQuery();
      }
    });
  },

  methods: {
    formatDate(date) {
      if (date) {
        let time = moment.unix(date / 1000).format("YYYY.MM.DD");
        return time;
      }
    },
    getQuery() {
      let params = {
        postParams: {
          criteria: {
            personId: this.obj.personId
          }
        }
      };
      QueryIncident(params).then(res => {
        console.log(res);
        this.lists = res.content;
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.one-case {
  .one-title {
    height: 176px;
    padding: 32px;
    background: #fff;
    margin-bottom: 20px;
    img {
      float: left;
      width: 80px;
      height: 112px;
      margin-right: 32px;
    }
    p {
      font-size: 32px;
      color: #1c1d1f;
      padding-top: 16px;
    }
    p:nth-child(2) {
      font-size: 28px;
      color: #7a818d;
    }
  }
  .one-bottom {
    background: #fff;
    .el-collapse-item {
      position: relative;
    }
    .col-img {
      position: absolute;
      right: 80px;
      width: 36px;
      height: 40px;
      line-height: 40px;
      top: 26px;
    }
    .em-crd {
      margin-top: 32px;
    }
    .card-grade {
      float: right;
      padding: 0 30px;
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      text-align: center;
      color: #36a4aa;
      background: #dff2f3;
      font-size: 28px;
      margin-right: 32px;
    }
    .fail {
      color: #e65959;
      background: #fbe4e4;
      float: right;
      padding: 0 30px;
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      text-align: center;
      font-size: 28px;
      margin-right: 32px;
    }
    .every-card {
      width: 686px;
      height: 174px;
      background: #fff;
      border-radius: 12px;
      margin: 12px 0;
      padding: 32px;
      display: flex;
      justify-content: space-between;
      margin-left: 32px;
      .crd-img {
        float: left;
        text-align: center;
        img {
          width: 64px;
          height: 64px;
        }
        .crd-p {
          font-size: 24px;
          color: #272727;
        }
      }
      .crd-div {
        color: #666;
        font-size: 24px;
        width: 170px;
        margin-left: 40px;
        p {
          line-height: 34px;
          height: 34px;
          span {
            // padding-left:48px;
          }
        }
        .red {
          color: #e65959;
        }
      }
    }
  }
}
</style>
<style lang="less">
.one-case {
  .el-collapse-item__wrap {
    background: #f2f3f6;
  }
  .el-collapse-item__header {
    padding-left: 32px;
  }
}
</style>




