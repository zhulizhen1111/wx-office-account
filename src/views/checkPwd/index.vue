<template>
    <div class='check'>
        <div class='phone'>
            <p class='p1'>密码重置</p>
            <input type='text' autocomplete='off' class='Input phoneInput' v-model='phone' placeholder='请输入手机号码'  @change="changeInput()">
            <input type='text' autocomplete='off' class='Input' v-model='code' placeholder='请输入验证码'  @change="changeInput()">
            <span class='span1' @click='getCode' v-if='showTime'>获取验证码</span>
            <span class='span1' @click='getCode' v-else> {{time}}s</span>
        </div>
        <button class='btn' @click='Determine'>确定</button>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import axios from 'axios'
import { sendMsgCode, checkMsgCode } from '@/api/repair.js'
export default {
    data() {
        return {
            phone: '', // 电话号码
            code: '', // 验证码
            showTime: true, //倒计时
            time: 60
        }
    },
    methods: {
        // 倒计时
        countDown() {
            this.time = 60
            let vm = this
            this.clearTime = setInterval(function() {
                vm.time--
                if (vm.time < 0) {
                    vm.time = 60
                    vm.showTime = true
                    // 获取验证码
                    clearInterval(this.clearTime)
                }
            }, 1000)
        },
        // 重发验证码
        getCode() {
            clearInterval(this.clearTime)
            this.time = 60
            if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
                this.showTime = false
                let params = {
                    getParams: {
                        phone: this.phone
                    }
                }
                sendMsgCode(params).then(res => {
                    if (res.result == 'fail') {
                        this.showTime = true
                        MessageBox('提示', res.message)
                    } else if (res.result == 'success') {
                        this.countDown()
                    }
                })
            } else {
                this.showTime = true
                MessageBox('提示', '手机号错误')
            }
        },
        //input改变
        changeInput(){
            if(this.phone!=''&&this.code!=''){
                document.querySelector('.btn').style.opacity = '1'
            }else {
                document.querySelector('.btn').style.opacity = '0.7'
            }

        },
        // 确定
        Determine() {
            if (this.code == '') {
                MessageBox('提示', '验证码不能为空,请填写')
                return
            }
            if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
                MessageBox('提示', '手机号有误，请重新输入')
                return
            }
            if (this.phone == '') {
                MessageBox('提示', '手机号不能为空，请填写')
                return
            }
            let params = {
                phone: this.phone,
                code: this.code
            }
            checkMsgCode(params).then(res => {
                if (res.result == 'success') {
                    document.querySelector('.btn').style.opacity = '1'
                    // this.$router.push('/forgetPwd')
                    this.$router.push({ path: '/forgetPwd', query: { phone: this.phone, code: this.code } })
                } else if (res.result == 'fail') {
                    MessageBox('提示', res.message)
                }
            })
        },
        //审核省份
        checkPhone() {
            //通过 跳转 changePwd
            //如果不通过，重新认证
            let params = {
                getParams: {
                    phone: this.phone
                }
            }
            sendMsgCode(params).then(res => {
                if (res.result == 'fail') {
                    MessageBox('提示', res.message)
                } else {
                    this.$router.replace({ path: '/forgetpwd' })
                }
            })
        }
    },
    mounted() {
        // this.checkPhone()
    }
}
</script>

<style lang="less" scoped>
.check {
    padding: 80px 32px;
    background: #fff;
    height: 100%;
    .phone {
        position: relative;
        .p1 {
            // width: 224px;
            height: 80px;
            font-size: 56px;
            color: #212128;
            line-height: 80px;
        }
        .Input {
            border: none;
            outline: none;
            padding: 35px 0;
            background: rgba(255, 255, 255, 1);
            border-bottom: 2px solid rgba(235, 235, 235, 1);
            width: 686px;
            color: rgba(33, 33, 40, 1);
            font-size: 30px;
        }
        .phoneInput {
            margin-top: 32px;
        }
        .span1 {
            position: absolute;
            height: 34px;
            color: #777d95;
            font-size: 24px;
            right: 0;
            bottom: 34px;
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
}
</style>
