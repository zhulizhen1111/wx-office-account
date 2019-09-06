<template>
  <div class="container">
    <el-form class="creat-risk" ref="ruleForm" :model="creat" :rules="rules">
      <div class="head">
        <el-form-item label="事项标题" prop="title">
          <el-input v-model="creat.title" placeholder="请输入事项标题"></el-input>
        </el-form-item>
      </div>
      <div class="head">
        <el-form-item label="事项描述" prop="description">
          <el-input v-model="creat.description" placeholder="请输入事项描述"></el-input>
        </el-form-item>
      </div>
      <div class="head">
        <el-form-item label="要求完成时间" prop="cutoffTime">
           <div class="time-box">
               <span class="time-span1" placeholder="请输入事项描述">{{formatTime(creat.cutoffTime) }}</span>
                <span class="time-span2" @click="openPicker"> > </span>
           </div>
            <mt-datetime-picker
                ref="picker"
                type="date"
                v-model="creat.cutoffTime">
            </mt-datetime-picker>
        </el-form-item>
      </div>
      <div class="head3">
        <p class="p1">关联工作项</p>
        <div class="p-box">
          <p class="p-img">
            <img src="../../assets/img/gl.png" alt />
            <span>手工填写</span>
            <input type="text" maxlength="20" v-model="creat.contentItem" placeholder="请填写工作项" />
          </p>
          <p class="p-img">
            <img src="../../assets/img/gl.png" alt />
            <span>关联事件</span>
            <input type="text" v-model="creat.eventId" placeholder="请填写事件编号" />
          </p>
          <p class="p-img">
            <img src="../../assets/img/gl.png" alt />
            <span>关联工单</span>
            <input type="text" v-model="creat.workorderId" placeholder="请填写工单编号" />
          </p>
        </div>
      </div>
      <div class="head">
        <el-form-item label="责任人" prop="chargeUserName">
          <el-input v-model="creat.chargeUserName" placeholder="请填写责任人姓名"></el-input>
        </el-form-item>
      </div>
      <div class="head">
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="creat.remarks" placeholder="请填写备注"></el-input>
        </el-form-item>
        <div class="risk-photo">
          <div class="img-box" v-for="(url,ind) in this.creat.pic" :key="ind">
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
      </div>
    </el-form>
    <div class="risk-creat">
      <button @click="saveSupervise">确认创建</button>
    </div>
  </div>
</template>

<script>
import { creatSupervise } from "@/api/gold.js";
import { mapGetters } from "vuex";
import tools from "@/utils/tools";
var moment = require("moment");
import "moment/locale/zh-cn";
export default {
  components: {},
  props: {},
  data() {
    return {
      creat: {
        title: "", //事项标题
        description: "", //事项描述
        cutoffTime: new Date(
          Date.UTC(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() + 7
          )
        )
          .toISOString()
          .slice(0, 10), //要求完成时间
        chargeUserName: "", //责任人
        remarks: "", //备注
        contentItem: "", //工作项名称
        eventId: "", //关联事件
        workorderId: "", //关联工单
        pic: []
      },
      rules: {
        title: [
          { required: true, message: "请输入是事项标题", trigger: "blur" },
          { min: 0, max: 20, message: "不超过20个汉字", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入事项描述", trigger: "blur" },
          { min: 0, max: 50, message: "不超过50个汉字", trigger: "blur" }
        ],
        cutoffTime: [
          { required: true, message: "请输入要求完成时间", trigger: "blur" }
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
        chargeUserName: [
          { min: 0, max: 20, message: "不超过20个汉字", trigger: "blur" }
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
    this.creat.cutoffTime = this.timeDefault;
  },

  methods: {
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
              _this.creat.pic = _this.distinct(arr);
              console.log(_this.creat.pic);
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
    openPicker () {
     this.$refs.picker.open()
    },
    saveSupervise() {
      let _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let userId = tools.getStorage("username");
          console.log(userId);
          let params = {
            postParams: {
              projectId: "Pj4419000005",
            //   createUser: "90000001",
              createUser:userId,
              title: this.creat.title.trim(),
              description: this.creat.description.trim(),
              cutoffTime: this.formatTime(this.creat.cutoffTime),
              contentItem: this.creat.contentItem.trim(),
              eventId: this.creat.eventId.trim(),
              workorderId: this.creat.workorderId.trim(),
              chargeUser: this.creat.chargeUserName.trim(),
              remarks: [
                {
                  content: this.creat.remarks.trim(),
                  pics: this.creat.pic
                }
              ]
            }
          };
          creatSupervise(params).then(res => {
            console.log(res);
            if (res.result == "success") {
              _this.$message({ type: "success", message: "创建成功!" });
              this.$router.push({
                path: "/risk",
                query: { selectId: res.status }
              });
            } else {
              _this.$message.error("创建失败！ ");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.container {
  input {
    border: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    outline: medium;
    background-color: transparent;
    color: #7A818D;
  }
  .creat-risk {
    .head {
      padding: 0px 32px;
      background: #ffffff;
      font-family: PingFangSC-Regular;
      //margin-bottom: 20px;
      .time-box {
          float: left;
          width: 100%;
          .time-span1{
              color: #7A818D;
          }
          .time-span2{
              float: right;
              color: #BAC0C9;
          }
      }
      .risk-photo {
        padding-bottom: 34px;
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
    .head3 {
      padding: 0px 32px;
      background: #ffffff;
      font-family: PingFangSC-Regular;
      margin-bottom: 44px;
      .p1 {
        font-size: 32px;
        padding-top: 24px;
        color: #212128;
      }
      .p-box {
        padding: 32px 0;
        .p-img {
          margin-bottom: 16px;
          img {
            width: 32px;
            height: 32px;
            display: inline-block;
            vertical-align: middle;
          }
          span {
            margin-left: 15px;
            margin-right: 24px;
            height: 40px;
            font-size: 28px;
            color: #212128;
          }
          input {
            border: 1px solid #bac0c9;
            border-radius: 4px;
            padding: 16px 0 16px 24px;
          }
        }
        .p-img:nth-of-type(3) {
          margin-bottom: 8px;
        }
      }
    }
  }
  .risk-creat {
    //margin-top: 24px;
    width: 100%;
    background: #ffffff;
    border-top: 1px solid rgb(244, 244, 246);
    border-bottom: 1px solid rgb(244, 244, 246);
    padding: 24px 0;
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
.container {
  input::-webkit-input-placeholder {
    color: #bac0c9;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #bac0c9;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #bac0c9;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #bac0c9;
  }
  .el-form-item{
      margin-bottom: 34px;
  }
  .el-form-item__error{
      font-size: 20px;
      padding-top: 4px;
  }
  .el-form-item__label {
    color: #212128;
    font-size: 32px;
  }
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

  .el-input {
    border: none;
    outline: none;
    margin-bottom: 0;
    .el-input__inner {
      border: none;
      outline: none;
      padding: 0;
      color: #7a818d;
    }
  }
  .el-textarea {
    .el-textarea__inner {
      border: none;
      outline: none;
      color: #7a818d;
    }
  }
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
</style>