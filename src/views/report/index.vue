<template>
  <div class="advance">
    <div class="my-card" v-for="(item,index) in lists" :key="index">
      <p class="my-name">
        <a
          :href="`/image-service/common/file_get?systemId=saas&secret=46f869eea8b31d14&key=${item.fileName}`"
        >{{item.presentationName}}</a>
      </p>
      <p class="my-time">{{formatDate(item.updateTime)}}更新</p>
    </div>
  </div>
</template>

<script>
import { QueryReport } from "@/api/gold.js";
import { mapGetters } from "vuex";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
  components: {},
  data() {
    return {
      lists: []
    };
  },
  computed: {},
  mounted() {
    this.query();
  },
  computed: {
    ...mapGetters(["projectId"])
  },
  methods: {
    query() {
      let params = {
        postParams: {
          // projectId: this.projectId
          projectId: "Pj4419000005",
          orders: [
            {
              column: "updateTime",
              asc: false
            }
          ]
        }
      };
      QueryReport(params).then(res => {
        this.lists = res.content;
      });
    },
    formatDate(date) {
      const now = new Date().getTime();
      const toDay = moment.unix(now / 1000).format("YYYY/MM/DD");
      // 计算出今天00:00时刻的时间戳
      const oneDay = 24 * 60 * 60 * 1000;
      const todayStart = new Date(toDay).getTime();
      let time = null;
      if (date < todayStart + oneDay && date >= todayStart) {
        time = "今天";
      } else if (date < todayStart && date >= todayStart - oneDay) {
        time = "昨天";
      } else if (
        date < todayStart - oneDay &&
        date >= todayStart - 2 * oneDay
      ) {
        time = "前天";
      } else {
        time = moment.unix(date / 1000).format("YYYY.MM.DD");
      }
      return time;
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.advance {
  margin: 20px;
  .my-card {
    height: 158px;
    padding: 32px;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    margin-bottom: 20px;
  }
  .my-name {
    font-size: 32px;
    color: #1c1d1f;
  }
  .my-time {
    color: #bac0c9;
    margin-top: 16px;
  }
}
</style>



