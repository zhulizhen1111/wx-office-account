<template>
    <div class='forget-pwd'>
        <p class='p1'>重置密码</p>
        <input type='text' class='Input userInput' autocomplete='off' v-model='user' placeholder='请输入账号'  @change="changeInput()">
        <input type='password' v-if='eye1' autocomplete='new-password' class='Input newInput' v-model='newPwd' placeholder='请输入新密码'  @change="changeInput()">
        <input type='text' autocomplete='off' v-else class='Input newInput' v-model='newPwd' placeholder='请输入新密码'  @change="changeInput()">
        <i class='iconfont icon-biyan-- icon1' v-if='eye1' @click='eye1=false'></i>
        <i class='iconfont icon-zhengyan icon1' v-else @click='eye1=true'></i>
        <input type='password' autocomplete='new-password' v-if='eye2' class='Input confirmInput' v-model='confirmPwd' placeholder='请再次输入新密码'  @change="changeInput()">
        <input type='text' autocomplete='off' v-else class='Input confirmInput' v-model='confirmPwd' placeholder='请再次输入新密码'  @change="changeInput()">
        <i class='iconfont icon-biyan-- icon2' v-if='eye2' @click='eye2=false'></i>
        <i class='iconfont icon-zhengyan icon2' v-else @click='eye2=true'></i>
        <button class='btn' @click='getConfirmclick'>确认</button>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import axios from 'axios'
import { getConfirm } from '@/api/repair.js'
export default {
    name: 'forgetPwd',
    components: {},
    data: function() {
        return {
            user: '',
            newPwd: '',
            confirmPwd: '',
            eye1: true,
            eye2: true,
            code: ''
        }
    },
    mounted() {
        this.getPhoneAndCode()
    },
    methods: {
        // 传过来的phone和code
        getPhoneAndCode() {
            this.phone = this.$route.query.phone
            this.code = this.$route.query.code
        },
        //input改变
        changeInput(){
            if(this.user!=''&&this.newPwd!=''&&this.confirmPwd!=''){
                document.querySelector('.btn').style.opacity = '1'
            }else{
                document.querySelector('.btn').style.opacity = '0.7'
            }

        },
        //重置密码确认

        getConfirmclick() {
            //先确认两次密码一样
            // 发送网络请求
            //如果修改成功，直接跳转主页
            //不成功，提示
            if (this.newPwd != this.confirmPwd) {
                MessageBox('提示', '两次填写的密码不一样，请重新填写')
                return
            }
            if (this.newPwd == '' || this.confirmPwd == '') {
                MessageBox('提示', '修改的密码不能为空，请重新填写')
                return
            }
            let params = {
                postParams: {
                    username: this.user,
                    phone: this.phone,
                    code: this.code,
                    newPwd: this.newPwd
                }
            }
            getConfirm(params).then(res => {
                if (res.result == 'success') {
                    MessageBox('提示', '修改成功')
                    this.$router.push('/login')
                } else if (res.result == 'fail') {
                    MessageBox('提示', res.message)
                }
            })
            document.querySelector('.btn').style.opacity = '1'
        }
    }
}
</script>

<style lang="less" scoped>
.forget-pwd {
    position: relative;
    padding: 80px 32px;
    background: #fff;
    height: 100%;
    .p1 {
        // width: 336px;
        height: 80px;
        font-size: 56px;
        color: rgba(33, 33, 40, 1);
        line-height: 56px;
    }
    .Input {
        border: 1px solid red;
        margin-top: 32px;
        border: none;
        outline: none;
        width: 686px;
        padding: 35px 0;
        background: rgba(255, 255, 255, 1);
        border-bottom: 2px solid rgba(235, 235, 235, 1);
        color: #b2b2b2;
        font-size: 30px;
        position: relative;
    }
    .newInput,
    .confirmInput {
        margin-top: 64px;
        color: rgba(119, 125, 149, 1);
    }
    .icon1 {
        position: absolute;
        right: 50px;
        top: 400px;
    }
    .icon2 {
        position: absolute;
        right: 50px;
        top: 575px;
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