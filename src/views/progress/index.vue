<template>
  <div class="riskBox">
    <ul class="asideMenu">
      <li v-for="(item,index) in menuList" :key="index" @click="showToggle(item,index)">
        <div class="oneMenu">
          <div class="oneMenu-left">
            <span>{{item.str}}:{{item.value}}万元</span>
            <mt-progress :value="item.value" :bar-height="6"></mt-progress>
            <div class="icont"></div>
          </div>
          <div class="icont oneMenu-right">
            <span class="number">{{item.data.length || 0}}</span>
            <i v-if="item.isSubShow" class="iconfont icon-shangsanjiaoxing"></i>
            <i v-else class="iconfont icon-xiasanjiaoxing"></i>
          </div>
        </div>
        <div v-show="item.isSubShow" class="line" v-for="(subItem,indexs) in item.data" :key="indexs" @click="showDetail(subItem)">
          <div class="line-left">
            <p class="one-p">{{subItem.str}}</p>
            <mt-progress :value="item.value" :bar-height="6"></mt-progress>
            <span>{{subItem.value}}万</span>
          </div>
          <div class="line-right">
            <i class="iconfont icon-ic_arrow_r" @click="this.router.push({path:'/'})"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { Transfinite } from "@/api/repair.js";
export default {
    components: {},
    data() {
        return {
            menuList: [], //本页数据
            detailArr: [], //下页数据
            isTransfinite: false, // 风险值超限数据是否为空
            isUnTransfinite: false // 风险值未超限数据是否为空
        };
    },
    methods: {
        // 风险值超限
        isTransfiniteFun(item) {
            let params = {
                getParams: {
                    riskPoint: item.id,
                    flag: "1"
                }
            };
            Transfinite(params).then(res => {
                if (res.result == "success") {
                    if (res.content.length > 0) {
                        this.detailArr = res.content;
                        this.$router.push({
                            name: "detail",
                            query: {
                                item: JSON.stringify(item),
                                detailArr: JSON.stringify(this.detailArr)
                            }
                        });
                    }
                }
            });
        },
        // 风险值未超限
        isUnTransfiniteFun(item) {
            let params = {
                getParams: {
                    riskPoint: item.id,
                    flag: "0"
                }
            };
            Transfinite(params).then(res => {
                if (res.result == "success") {
                    if (res.content.length > 0) {
                        this.detailArr = res.content;
                        this.$router.push({
                            name: "detail",
                            query: {
                                item: JSON.stringify(item),
                                detailArr: JSON.stringify(this.detailArr)
                            }
                        });
                    }
                }
            });
        },
        // 点击展开折叠菜单
        showToggle(item, ind) {
            this.menuList.forEach(i => {
                if (i.isSubShow !== this.menuList[ind].isSubShow) {
                    i.isSubShow = false;
                }
            });
            item.isSubShow = !item.isSubShow;
        },
        showDetail(item) {
            this.isTransfiniteFun(item);
            this.isUnTransfiniteFun(item);
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.menuList = JSON.parse(this.$route.query.compan);
        });
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
            border-bottom: 1px solid #efeff4;
            background: #fff;
            .oneMenu {
                width: 100%;
                height: 136px;
                display: flex;
                justify-content: space-between;
                padding: 32px 34px;
                border-bottom: 1px solid #efeff4;
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
                }
            }
            .line {
                display: flex;
                justify-content: space-between;
                height: 120px;
                border-bottom: 1px solid #efeff4;
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
<style  lang="less">
.oneMenu-left {
    .mt-progress {
        width: 544px;
        height: 6px;
        padding-top: 16px;
    }
}
.line .mt-progress {
    width: 548px;
    height: 6px;
    margin-top: 22px;
}
.mt-progress-progress {
    background: -webkit-linear-gradient(left, #4c8bd8 30%, #93b9e8 100%);
    border-radius: 10px;
}
.mt-progress-runway {
    border-radius: 10px;
}
</style>
