<template>
    <div class='login'>
        <!-- 手机号登录 -->
        <div class='phone' v-if='isShow'>
            <p class='p1'>手机号码登录</p>
            <input type='text' autocomplete='off' class='Input phoneInput' v-model='phone' placeholder='请输入手机号码'  @change="changeInput()">
            <input type='text' class='Input codeInput' autocomplete='off' v-model='code' placeholder='请输入验证码'  @change="changeInput()">
            <span class='span1' @click='getCode' v-if='showTime'>获取验证码</span>
            <span class='span1' @click='getCode' v-else> {{time}}s</span>
        </div>
        <!-- 账户登录 -->
        <div class='username' v-else>
            <p class='p1'>账号登录</p>
            <input type='text' autocomplete='off' class='Input phoneInput' v-model='user' placeholder='请输入账号'  @change="changeInput()">
            <input
                type='password'
                autocomplete='new-password'
                class='Input codeInput'
                v-if='eye'
                v-model='pwd'
                placeholder='请输入密码'
                @change="changeInput()"
            >
            <input type='text' autocomplete='off' @change="changeInput()" class='Input codeInput' v-else v-model='pwd'>
            <i class='iconfont icon-biyan--' v-if='eye' @click='eye=false'></i>
            <i class='iconfont icon-zhengyan' v-else @click='eye=true'></i>
        </div>
        <button class='btn' @click='loginClick'>登录</button>
        <p class='p3' v-if='isShow'>
            <span @click='toUser'>账号登录</span>
        </p>
        <p class='p3' v-else>
            <span @click='toPhone'>手机号码登录</span>
            <span @click='toForget'>忘记密码？</span>
        </p>
    </div>
</template>

<script>
// 
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "axios";
import { sendMsgCode, loginIn, isLogin } from "@/api/repair.js";
import tools from "@/utils/tools";
export default {
  name: "login",
  components: {},
  data: function() {
    return {
      phone: "", //手机
      code: "", //验证码
      time: 60,
      showTime: true, //获取验证码
      user: "", //用户
      pwd: "", // 密码
      isShow: true, //账号||手机号
      eye: true //icon
    };
  },
  methods: {
    // 倒计时
    countDown() {
      this.time = 60;
      let vm = this;
      this.clearTime = setInterval(function() {
        vm.time--;
        if (vm.time < 0) {
          vm.time = 60;
          vm.showTime = true;
          // 获取验证码
          clearInterval(this.clearTime);
        }
      }, 1000);
    },
    //获取验证码
    getCode() {
      clearInterval(this.clearTime);
      this.time = 60;
      if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone.trim())) {
        this.showTime = false;
        let params = {
          getParams: {
            phone: this.phone
          }
        };
        sendMsgCode(params).then(res => {
          if (res.result == "fail") {
            this.showTime = true;
            MessageBox("提示", "用戶不存在");
          } else if (res.result == "success") {
            this.countDown();
          }
        });
      } else {
        this.showTime = true;
        MessageBox("提示", "手机号错误");
      }
    },
    changeInput() {
      if (this.phone != "" && this.code != "") {
        document.querySelector(".btn").style.opacity = "1";
      } else if (this.user != "" && this.pwd != "") {
        document.querySelector(".btn").style.opacity = "1";
      } else {
        document.querySelector(".btn").style.opacity = "0.7";
      }
    },
    // 账号登录
    toUser() {
      this.isShow = false;
    },
    // 手机号码登录
    toPhone() {
      this.isShow = true;
    },
    // 忘记密码
    toForget() {
      this.$router.replace("/checkPwd");
    },
    // 登录
    loginClick() {
      clearInterval(this.clearTime);
      this.showTime = true;
      let _this = this;
      let params;
      if (this.isShow == true) {
        // 手机号码
        if (this.code == "") {
          MessageBox("提示", "验证码不能为空,请填写");
          return
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
          MessageBox("提示", "手机号有误，请重新输入");
          return
        }
        if (this.phone == "") {
          MessageBox("提示", "手机号不能为空，请填写");
          return
        }
        params = {
          postParams: {
            phone: _this.phone,
            code: _this.code
          }
        };
      } else if (this.isShow == false) {
        // 账号
        if (this.pwd == "") {
          MessageBox("提示", "密码不能为空，请填写");
          return
        }
        if (this.user == "") {
          MessageBox("提示", "用户名不能为空，请填写");
          return
        }
        params = {
          postParams: {
            username: _this.user,
            password: _this.pwd
          }
        };
      }

      loginIn(params).then(res => {
        if (res.result == "success") {
          Toast("登录成功");
          this.checkLogin();
        } else if (res.result == "fail") {
          if (this.isShow == false) {
            MessageBox("提示", res.message);
          } else {
            MessageBox("提示", res.message);
          }
        }
      });
    },
    checkLogin() {
      let params = {
        getParams: {}
      };
      isLogin(params).then(res => {
        if (res.result == "success") {
          let username = res.data.username;
          let userId = res.data.id;
          tools.setStorage("userId", userId);
          tools.setStorage("username", username);
          setTimeout(() => {
            this.$router.replace("/");
          }, 1000);
        }
      });
    },
  },
  created() {
    // let username = tools.getStorage("username");
    // if (username) {
    //   this.$router.replace("/");
    // }
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 80px 32px;
  background: #fff;
  height: 100%;
  .phone {
    position: relative;
    .p1 {
      height: 80px;
      font-size: 56px;
      color: rgba(33, 33, 40, 1);
      line-height: 56px;
    }
    .Input {
      margin-top: 32px;
      border: none;
      outline: none;
      width: 686px;
      padding: 35px 0;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(235, 235, 235, 1);
      color: #b2b2b2;
      font-size: 30px;
    }
    .phoneInput {
      margin-bottom: 32px;
    }
    .span1 {
      position: absolute;
      right: 0;
      bottom: 34px;
      font-size: 24px;
      color: #4c8bd8;
      padding: 0 5px;
      height: 34px;
      line-height: 34px;
    }
  }
  .username {
    .p1 {
      height: 80px;
      font-size: 56px;
      color: rgba(33, 33, 40, 1);
      line-height: 56px;
    }
    .Input {
      margin-top: 32px;
      border: none;
      outline: none;
      width: 686px;
      padding: 35px 0;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(235, 235, 235, 1);
      color: #b2b2b2;
      font-size: 30px;
    }
    .phoneInput {
      margin-bottom: 32px;
    }
    .pwdInput {
      position: relative;
    }
    .iconfont {
      position: absolute;
      top: 400px;
      right: 80px;
    }
  }
  .btn {
    width: 686px;
    height: 94px;
    opacity: 0.7;
    background: #4c8bd8;
    box-shadow: 0px 5px 15px 0px rgba(84, 93, 255, 0.3);
    color: #fff;
    font-size: 36px;
    border-radius: 8px;
    margin-top: 128px;
    outline: none;
  }
  .p3 {
    display: flex;
    justify-content: space-between;
    margin-top: 34px;
    opacity: 1;
    font-size: 25px;
    color: #777d95;
    height: 40px;
  }
}
</style>