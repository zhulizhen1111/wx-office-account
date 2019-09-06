<template>
  <div class="riskBox">
    <ul class="asideMenu">
      <li v-for="(item,index) in menuList" :key="index" @click="showToggle(item,index)">
        <div class="oneMenu">
          <div class="oneMenu-left">
            <span>{{item.name}}:{{item.value}}万元</span>
            <mt-progress :value="item.value" :bar-height="6"></mt-progress>
            <div class="icont"></div>
          </div>
          <div class="icont oneMenu-right">
            <span class="number">{{item.subItems.length}}</span>
            <i v-if="item.isSubShow" class="iconfont icon-shangsanjiaoxing"></i>
            <i v-else class="iconfont icon-xiasanjiaoxing"></i>

            <div v-if="overlayer && index == 0" class="overlayer" @touchmove.prevent>
              <div class="mask"></div>
              <div class="over-popo">子系统数量统计</div>
              <div class="over-text" @click="know" @touchmove.prevent>我知道了</div>
            </div>
          </div>
        </div>
        <div
          v-show="item.isSubShow"
          class="line"
          v-for="(subItem,indexs) in item.subItems"
          :key="indexs"
          @click="showDetail(subItem)"
        >
          <div class="line-left">
            <p class="one-p">{{subItem.indoor}}</p>
            <mt-progress :value="item.value" :bar-height="6"></mt-progress>
            <span>{{subItem.values}}万</span>
          </div>
          <div class="line-right">
            <i class="iconfont icon-ic_arrow_r" @click="this.router.push('/')"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlayer: true,
      menuList: [
        //风险类别
        {
          name: "消防",
          size: 6,
          value: 30,
          isSubShow: true,
          subItems: [
            {
              indoor: "防排烟系统",
              values: 50
            },
            {
              indoor: "厨房自动灭火系统",
              values: 40
            },
            {
              indoor: "气体灭火系统",
              values: 20
            },
            {
              indoor: "燃气报警系统",
              values: 70
            },
            {
              indoor: "消防给水系统",
              values: 50
            },
            {
              indoor: "防火卷帘门系统",
              values: 40
            },
            {
              indoor: "灭火器系统",
              values: 20
            },
            {
              indoor: "火灾报警系统",
              values: 70
            },
            {
              indoor: "应急照明及疏散指示系统",
              values: 70
            }
          ]
        },
        {
          name: "强电",
          value: 50,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        },
        {
          name: "弱电",
          value: 60,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        },
        {
          name: "给排水",
          value: 40,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        },
        {
          name: "空调",
          value: 40,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        },
        {
          name: "安防",
          value: 40,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        },
        {
          name: "土建",
          value: 40,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        },
        {
          name: "其他",
          value: 40,
          size: 30,
          isSubShow: false,
          subItems: [
            {
              indoor: "室内温度过高",
              values: 50
            },
            {
              indoor: "室内温度偏冷",
              values: 40
            },
            {
              indoor: "室内温度偏大",
              values: 20
            },
            {
              indoor: "室内干燥",
              values: 70
            }
          ]
        }
      ]
    };
  },
  components: {},
  methods: {
    know() {
      this.overlayer = false;
    },
    // 点击展开折叠菜单事件
    showToggle(item, ind) {
      this.menuList.forEach(i => {
        if (i.isSubShow !== this.menuList[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
    },
    showDetail(item) {
      this.$router.push("/detail");
    },
    changeWeight(val) {}
  }
};
</script>

<style lang="less" scoped>
.riskBox {
  height: 100%;
  width: 100%;
  background: #f8f8f8;
  .asideMenu {
    li {
      border-bottom: 1PX solid #efeff4;
      background: #fff;
      .oneMenu {
        width: 100%;
        height: 136px;
        display: flex;
        justify-content: space-between;
        padding: 32px 34px;
        border-bottom: 1PX solid #efeff4;
        .oneMenu-left {
          width: 544px;
          span {
            font-size: 34px;
            color: #212128;
            letter-spacing: -1px;
          }
        }
        .oneMenu-right {
          width: 120px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          span {
            display: inline-block;
            width: 64px;
            height: 44px;
            border-radius: 22px;
            color: #4c8bd8;
            font-size: 30px;
            line-height: 46px;
            text-align: center;
            opacity: 1;
            background: rgba(215, 221, 225, 0.48);
          }
          i {
            width: 22px;
            height: 14px;
            color: #d9dbe5;
            padding-bottom: 30px;
            font-size: 14px;
          }
          .overlayer {
            position: absolute;
            background: rgba(200, 200, 200, 0.5);
            left: -18px;
            width: 80%;
            height: 80%;
            z-index: 999;
            .mask {
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              background: rgba(0, 0, 0, 0.5);
            }
            .over-popo {
              position: absolute;
              right: -16px;
              top: -90px;
              border-radius: 15px;
              padding: 20px 32px;
              background-color: #fff;
              white-space: nowrap;
            }
            .over-popo:after {
              content: "";
              display: block;
              border-width: 15px;
              position: absolute;
              bottom: -30px;
              right: 30px;
              border-style: solid dashed dashed;
              border-color: #fff transparent transparent;
            }
            .tag:after {
              bottom: 33px;
              border-color: #fff transparent transparent;
            }
            .over-text {
              position: fixed;
              left: 50%;
              top: 70%;
              font-size: 36px;
              transform: translateX(-50%);
              color: #ffffff;
              border: 1PX solid #ffffff;
              border-radius: 47px;
              background: transparent;
              padding: 22px 88px;
              font-weight: 400;
            }
          }
        }
      }
      .line {
        display: flex;
        justify-content: space-between;
        height: 120px;
        border-bottom: 1PX solid #efeff4;
        padding: 0 32px;
        background: #fafafc;
        .line-left {
          position: relative;
          width: 628px;
          margin-top: 18px;
          height: 84px;
          p {
            padding: 0;
            height: 42px;
            color: #212128;
            font-size: 30px;
          }
          span {
            font-size: 24px;
            color: #777d95;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        .line-right {
          padding: 40px 0;
          .icon-ic_arrow_r {
            width: 12px;
            height: 20px;
            font-size: 12px;
            color: #d5d7e7;
          }
        }
      }
    }
  }
}
</style>
<style >
.mt-progress {
  width: 80%;
  padding-left: 16px;
}
.mt-progress-progress {
  background: -webkit-linear-gradient(left, #4c8bd8 30%, #93b9e8 100%);
}
</style>
