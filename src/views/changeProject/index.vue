<template>
  <div class="change-project">
    <div class="my-project">
      <p>您当前所在项目：</p>
      <input type="text" name="location" class="location" v-model="position" />
      <i class="iconfont icon-Location"></i>
    </div>
    <button class="my-btn" @click="lookAt">确认查看</button>
    <button class="my-btn" @click="changeProject">切换项目</button>
    <mt-popup class="popup" v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <p class="confirm">
        <span @click="close">取消</span>
        <span @click="confirm">确定</span>
      </p>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { projects } from "@/api/repair.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      position: "莞城万科城市广场",
      popupVisible: false,
      projectId: "",
      value: "",
      projects: [
        {
          id: "1",
          name: "莞城万科城市广场"
        },
        {
          id: "2",
          name: "虎门万科"
        },
        {
          id: "3",
          name: "长安万科广场"
        },
        {
          id: "4",
          name: "松湖万科生活广场"
        },
        {
          id: "5",
          name: "厚街万科城市广场"
        }
      ],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },

  computed: {},

  mounted() {
    this.getProject();
  },

  methods: {
    getProject() {
      // this.popupVisible = true
      let params = {
        getParams: {
          personId: "d671bccec8494cbe88cb7cb80618e6c6"
        }
      };
      projects(params).then(res => {
        if (res.result == "success") {
          this.projects = res.content;
          res.content.forEach(el => {
            this.slots[0].values.push(el.localName);
          });
        }
      });
    },
    changeProject() {
      this.popupVisible = true;
    },
    lookAt() {
      this.$router.push("/");
    },
    selected(item) {
      this.popupVisible = false;
      this.position = item.name;
    },
    onValuesChange(picker, values) {
      this.values = values[0];
    },
    confirm() {
      this.popupVisible = false;
      this.position = this.values;
      this.projects.forEach(el => {
        if (el.localName == this.values) {
          this.projectId = el.id;
          tools.setStorage("projectId", this.projectId);
        }
      });
    },
    close() {
      this.popupVisible = false;
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.change-project {
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .my-project {
    width: 640px;
    height: 120px;
    margin-top: 62px;
    position: relative;
    margin-bottom: 82px;
    p {
      font-size: 24px;
      color: #777d95;
      padding-top: 20px;
      margin-bottom: 30px;
    }
    input {
      font-size: 30px;
      width: 100%;
      height: 60px;
      border: none;
    }
    .location {
      border-bottom: 1px solid #d9d9d9;
    }
    i {
      position: absolute;
      right: 0;
      bottom: -5px;
      width: 42px;
      height: 42px;
      font-size: 40px;
      color: #b2b2b2;
    }
  }
  .my-btn {
    width: 686px;
    height: 94px;
    margin-top: 48px;
    font-size: 36px;
    border-radius: 10px;
  }
  .my-btn:nth-of-type(1) {
    background: #4c8bd8;
    color: #ffffff;
  }
  .my-btn:nth-of-type(2) {
    background: #fff;
    color: #212128;
    border: 1px solid #d9d9d9;
  }
  .confirm {
    height: 80px;
    background: #fbf9fe;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #4c8bd8;
      font-size: 30px;
    }
  }
}
</style>
<style lang="less">
.change-project {
  .mint-popup {
    width: 100%;
  }
  .popup {
    width: 100%;
    height: 500px;
  }
}
</style>

