<template>
  <div class="valuerisk">
    <div class="my-title-top" v-for="(item,index1) in tempera1" :key="index1">
      <p class="my-title">{{item.str}}风险价值： {{item.value}}万元</p>
      <div class="my-div" :class="`my-div${index1}`">
        <div
          :class="`my-card${index+1}`"
          v-for="(compan,index) in item.data"
          :key="index"
          @click="toRouter(compan.data)"
        >
          <div class="cart-in">
            <div class="cart-in-i">
              <i :class="compan.icon"></i>
            </div>
            <div>
              <p class="p1">
                <span>{{compan.value}}</span>
                <span>万元</span>
              </p>
              <p class="p2">{{compan.str}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["tempera1"],
  data() {
    return {};
  },
  computed: {},

  mounted() {},

  methods: {
    toRouter(compan) {
      this.$router.push({ path: "/progress", query: { compan: JSON.stringify(compan)} });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.valuerisk {
  width: 100%;
  .my-title-top {
    padding-bottom: 10px;
    background: #fff;
    margin-bottom: 20px;
    font-weight: bold;
    .my-title {
      width: 100%;
      line-height: 48px;
      padding-left: 32px;
      padding-bottom: 36px;
      padding-top: 36px;
      border-bottom: 1PX solid #e6e7f0;
      color: #212128;
      font-size: 34px;
      box-shadow: 0px 0.5px 0px 0px rgba(230, 231, 240, 1);
      font-weight: bold;
    }
    .my-div {
      padding: 0 4px;
      display: flex;
      flex-wrap: wrap;
      margin: 20px 16px;
      .my-card2 {
        border-bottom: 1PX dashed #d3d3e1;
      }
      .my-card3 {
        border-right: 1PX dashed #d3d3e1;
      }
      .my-card5 {
        border-right: 1PX dashed #d3d3e1;
      }
      .my-card1 {
        border-bottom: 1PX dashed #d3d3e1;
        border-right: 1PX dashed #d3d3e1;
      }
      .my-card1,
      .my-card2,
      .my-card3,
      .my-card4,
      .my-card5 {
        width: 347px;
        display: flex;
        justify-content: space-around;
        p:nth-of-type(2n) {
          border-right: none;
        }
        .cart-in {
          display: flex;
          justify-content: space-between;
          margin: 0;
          .cart-in-i {
            width: 64px;
            height: 64px;
            margin: 46px 16px 38px 0px;
            i {
              display: inline-block;
              color: #4c8bd8;
              width: 100%;
              height: 100%;
              font-size: 48px;
              padding: 0 10px 10px 10px;
            }
          }
          .p1 {
            height: 52px;
            font-size: 38px;
            line-height: 52px;
            color: #212128;
            margin-top: 26px;
            font-weight: bold;
            span:nth-of-type(2){
              font-size: 24px;
            }
          }
          .p2 {
            color: #777d95;
            width: 246px;
            height: 17px;
            font-size: 24px;
            padding-bottom: 23px;
          }
        }
      }
    }
    .my-div0 {
      .my-card4 {
        border-bottom: 1PX dashed #d3d3e1;
      }
      .my-card3 {
        // border-bottom: 1PX dashed #d3d3e1;
      }
    }
  }
  #fixed {
    width: 80px;
    height: 80px;
    position: fixed;
    text-align: center;
    background: #fff;
    right: 72px;
    z-index: 999;
    top: 1020px;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 #bebece;
    display: block;
    img {
      width: 32px;
      height: 40px;
      margin-top: 20px;
    }
  }
}
</style>