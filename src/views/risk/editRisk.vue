<template>
  <div class="edit-risk">
    <p class="edit-top">
      <span>
        <img src="../../assets/img/工单.png" alt />
      </span>
      <span>{{title}}</span>
    </p>
    <el-form class="edit-content" ref="form2" :model="data" :rules="rules">
      <el-form-item label="要求完成时间" prop="cutoffTime">
        <div class="time-box">
          <span class="time-span1" placeholder="请输入事项描述">{{formatTime(data.cutoffTime) }}</span>
          <span class="time-span2" @click="openPicker">></span>
        </div>
        <mt-datetime-picker ref="picker" type="date" v-model="data.cutoffTime"></mt-datetime-picker>
      </el-form-item>
      <!-- <el-form-item label="要求完成时间" prop="cutoffTime">
        <el-date-picker
          format="yyyy.MM.dd"
          value-format="yyyyMMdd"
          v-model="data.cutoffTime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>-->
      <div class="edit-relation">
        <p class="edit-guanlian">关联工作项</p>
        <p class="edit-name">
          <span>
            <img src="../../assets/img/gl.png" alt />
          </span>
          <input type="text" maxlength="20" v-model="data.contentItem" placeholder="这是工作项名称" />
        </p>
        <p class="edit-name">
          <span>
            <img src="../../assets/img/gl.png" alt />
          </span>
          <input type="text" v-model="data.eventId" placeholder="这是关联事件编号" />
        </p>
        <p class="edit-name">
          <span>
            <img src="../../assets/img/gl.png" alt />
          </span>
          <input type="text" v-model="data.workorderId" placeholder="这是关联工单编号" />
        </p>
      </div>
      <p class="edit-zeren">
        <el-form-item label="责任人" prop="chargeUserName">
          <el-input v-model="data.chargeUser" placeholder="请填写责任人姓名"></el-input>
        </el-form-item>
      </p>
      <el-form-item label="追加备注" prop="remarks">
        <el-input type="textarea" v-model="data.remarks" placeholder="请填写新增备注"></el-input>
      </el-form-item>
      <div class="risk-photo">
        <div class="img-box" v-for="(url,ind) in data.pic" :key="ind">
          <img :src="url" alt />
        </div>
        <el-upload
          :on-change="getImage"
          action="/"
          list-type="picture-card"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-form>
    <div class="risk-creat">
      <button @click="saveEvent">保存</button>
    </div>
  </div>
</template>

<script>
import { updateSupervise } from "@/api/gold.js";
import { mapGetters } from "vuex";
import tools from "@/utils/tools";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
  components: {},
  props: {},
  data() {
    return {
      riskId: "",
      title: "",
      data: {
        cutoffTime: "",
        contentItem: "",
        eventId: "",
        workorderId: "",
        chargeUser: "",
        remarks: "",
        pic: []
      },
      rules: {
        cutoffTime: [
          { required: true, message: "请输入要求完成时间", trigger: "blur" }
        ],
        chargeUser: [
          { min: 0, max: 20, message: "不超过20个汉字", trigger: "blur" }
        ],
        contentItem:[
             { min: 0, max: 20, message: "不超过20个汉字", trigger: "blur" }
        ],
        eventId:[
            { min: 0, max: 20, message: "不超过45个汉字", trigger: "blur" }
        ],
        workorderId:[
             { min: 0, max: 20, message: "不超过45个汉字", trigger: "blur" }
        ],
        remarks: [
          { min: 0, max: 50, message: "不超过50个汉字", trigger: "blur" }
        ]
      },
      imageUrl:
        "/image-service/common/image_get?systemId=saas&secret=46f869eea8b31d14&key="
    };
  },

  computed: {
    ...mapGetters(["projectId"]),
    timeDefault() {
      var date = new Date();
      var s1 =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        (date.getDate() + 7);
      return s1;
    }
  },

  mounted() {
    this.data.cutoffTime = this.timeDefault;
    this.getData();
  },

  methods: {
    getData() {
      let obj = JSON.parse(this.$route.query.obj);
      if (obj) {
        this.riskId = obj.id;
        this.title = obj.title;
      }
    },
    openPicker () {
     this.$refs.picker.open()
    },
    saveEvent() {
      let _this = this;
      this.$refs.form2.validate(valid => {
        if (valid) {
          let updateUser = tools.getStorage("username");
          let params = {
            postParams: {
              id: _this.riskId,
              chargeUser: _this.data.chargeUser.trim(),
              cutoffTime: _this.formatTime(_this.data.cutoffTime) ,
              contentItem: _this.data.contentItem.trim(),
              eventId: _this.data.eventId.trim(),
              workorderId: _this.data.workorderId.trim(),
            //   updateUser: "90000001",
              updateUser:updateUser,
              remarks: [
                {
                  content: _this.data.remarks.trim(),
                  pics: _this.data.pic
                }
              ]
            }
          };
          updateSupervise(params).then(res => {
            console.log(res);
            if (res.result == "success") {
              _this.$message({ type: "success", message: "保存成功!" });
              _this.$router.push({ path: "/lookRisk", query: { id: res.id } });
            } else {
              _this.$message.error("保存失败！ ");
            }
          });
        }
      });
    },
    distinct(a) {
      return Array.from(new Set([...a]));
    },
    getImage(event) {
      console.log(event);
      this.fileName = new Date().getTime() + "_" + event.name;
      let url =
        "/image-service/common/image_upload?systemId=saas&secret=46f869eea8b31d14&key=" +
        this.fileName;
      let _this = this;
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.raw);
      reader.onload = function(e) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send(reader.result);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              let arr = [];
              arr.push(_this.imageUrl + _this.fileName);
              _this.data.pic = _this.distinct(arr);
              console.log("图片上传成功！");
            }
          }
        };
      };
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
     formatTime(time) {
      return moment.unix(time / 1000).format("YYYY.MM.DD");
    },
  }
};
</script>

<style scoped lang="less" style="text/less">
.edit-risk {
  font-family: PingFangSC-Regular;
  position: relative;
  height: 100%;
  background: #fff;
  input,
  button {
    border: none;
    -moz-appearance: none;
    -webkit-appearance: none; /*解决ios上按钮的圆角问题*/
    border-radius: 0; /*解决ios上输入框圆角问题*/
    outline: medium; /*去掉鼠标点击的默认黄色边框*/
  }
  .edit-top {
    padding: 28px 32px 26px 32px;
    background: #f7f7fa;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
    }
    span:nth-of-type(1) {
      width: 30px;
      height: 36px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span:nth-of-type(2) {
      height: 44px;
      font-size: 32px;
      color: #212128;
      font-weight: bold;
    }
  }
  .edit-content {
    padding: 0 32px;
    background: #fff;
    .time-box {
      float: left;
      width: 100%;
      .time-span1 {
        color: #7a818d;
      }
      .time-span2 {
        float: right;
        color: #bac0c9;
      }
    }
    .edit-relation {
      padding: 10px 0;
      .edit-guanlian {
        height: 44px;
        font-size: 32px;
        color: #212128;
        margin-bottom: 36px;
      }
      .edit-name {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 32px;
          height: 32px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        input {
          padding-left: 24px;
          width: 634px;
          height: 72px;
          font-size: 28px;
          background: #f7f7fa;
          border-radius: 4px;
        }
      }
    }
    .edit-zeren {
      border-bottom: 1px solid rgba(239, 239, 244, 0.8);
      border-top: 1px solid rgba(239, 239, 244, 0.8);
    }
    .risk-photo {
      margin-left: 32px;
      .img-box {
        width: 214px;
        height: 214px;
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 12px;
        img {
          width: 214px;
          height: 214px;
        }
      }
      div {
        display: inline-block;
      }
    }
  }
  .risk-creat {
    border-bottom: 1px solid rgb(244, 244, 246);
    padding: 24px 0;
    background: #fff;
    button {
      display: block;
      width: 686px;
      height: 80px;
      font-size: 32px;
      padding: 18px 0;
      background: #4186fb;
      border: 1px solid rgba(5, 5, 5, 0.08);
      border-radius: 8px;
      margin: 0 auto;
      color: #ffffff;
    }
  }
}
</style>
<style lang="less" style="text/less">
.edit-risk {
  .edit-content {
    .is-required {
      .el-form-item__label::after {
        content: "*";
        color: #f56c6c;
        margin-left: 8px;
      }
      .el-form-item__label::before {
        display: none;
      }
    }
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__label {
        color: #212128;
        font-size: 32px;
      }
      .el-form-item__content {
        .el-input {
          border: none;
          outline: none;
          margin-bottom: 24px;
          .el-input__inner {
            border: none;
            outline: none;
            color: #7a818d;
          }
        }
      }
      .el-textarea {
        .el-textarea__inner {
          border: none;
          outline: none;
          color: #7a818d;
        }
      }
    }
    .edit-zeren {
      .el-form-item__content {
        display: flex;
      }
    }
    .risk-photo {
      .el-upload--picture-card {
        width: 214px;
        height: 214px;
        background: #ececf0;
        position: relative;
        .el-icon-plus {
          padding-bottom: 20px;
          position: absolute;
          top: 80px;
          left: 80px;
        }
      }
    }
  }
}
</style>
