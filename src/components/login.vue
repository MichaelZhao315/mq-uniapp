<template>

    <view class="content">
        <image src="@/static/images/logo.png" class="logo" />
        <view class="step1">第一步：需授权基础信息</view>
        <view class="info">获取昵称，头像更好的享受平台服务</view>
        <button open-type="getUserInfo" type="primary" class="btn" @getuserinfo="getuserinfo">确定授权</button>
        <button open-type="getPhoneNumber" type="warn" class="btn" @getphonenumber="getPhoneNumber">获取手机号</button>
        <button type="info" class="btn">取消</button>
    </view>

    <!-- <uni-popup ref="alertDialog" class="dialogC" type="center">
        <view class="popup-content">
            <view class="confirm" hover-class="none">
                <view>{{props.content}}荷兰来咯</view>
                <slot></slot>
            </view>
            <view class="btn" hover-class="none">
                <span class="cancel" @click='cancelFn'>{{ props.cancel }}</span>
                <span class="yes" @click='confirmFn'>{{ props.confirm }}</span>
            </view>
        </view>
    </uni-popup> -->
</template>
<script setup lang="ts">
import { reactive, getCurrentInstance, withDefaults } from 'vue';
import { addmqMembers } from "@/api/index";
import { onLoad, onReachBottom, onReady } from '@dcloudio/uni-app';

const state: {
    code: string,
    openid: string,
    unionid: string,
    session_key: string
} = reactive({
    // 响应式数据
    code: '',
    openid: "",
    unionid: "",
    session_key: ""
});

onLoad(() => {
    login()
})

function login() {
    uni.login({
        provider: 'weixin',
        success(res) {
            console.log(res)
            if (res.code) {         //微信登录成功 已拿到code  
                state.code = res.code
                uni.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    method: 'GET',
                    data: {
                        appid: "wxa4c6732b0dda40ed",        //你的小程序的APPID  
                        secret: '99027dd45ddf9fd87ff003aa4d8fa3c7',       //你的小程序的secret,  
                        code: res.code              //wx.login 登录成功后的code  
                    },
                    success: (cts: { data: any }) => {
                        // 换取成功后 暂存这些数据 留作后续操作  
                        state.openid = cts.data.openid     //openid 用户唯一标识  
                        state.unionid = cts.data.unionid     //unionid 开放平台唯一标识  
                        state.session_key = cts.data.session_key     //session_key  会话密钥  
                        console.log(cts, 'cts')
                    }
                });
            } else {
                console.log('登录失败！' + res.errMsg)
            }
        },
        fail(err) {
            console.log(err);
        }
    })
}
function getuserinfo(e: { detail: any; }) {
    // login()
    

}

function getPhoneNumber(e: { detail: { errMsg: string; encryptedData: any; iv: any; }; }) {
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {       //用户决绝授权  
        //拒绝授权后弹出一些提示  
    } else {      //允许授权  
        console.log(e.detail, '手机号码')
        e.detail.encryptedData      //加密的用户信息  
        e.detail.iv     //加密算法的初始向量  时要用到  
    }
}


</script>

<style lang="scss" scoped>
.content {
    width: 80%;
    position: absolute;
    top: 20%;
    background-color: white;
    border: 1rpx solid #ccc;
    z-index: 22;
    padding: 20rpx;
    margin: auto;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .step1 {
        font-size: 30rpx;
        color: #2F2F2F;
        margin-bottom: 20rpx;
    }

    .info {
        font-size: 24rpx;
        color: #363636;
        margin-bottom: 200rpx;
    }

    .btn {
        width: 100%;
        margin-bottom: 20rpx;
    }

    .logo {
        width: 200rpx;
        height: 200rpx;
    }
}


.dialogC {
    width: 80%;
}

.popup-content {
    display: flex;
    flex-direction: column;
    padding: 40rpx;
    width: 530rpx;
    box-sizing: border-box;
    height: 400rpx;
    background-color: #fff;
    border-radius: 16rpx;

    .btn {
        display: flex;
        justify-content: space-between;

        span {
            width: 207rpx;
            border-radius: 36rpx;
            height: 71rpx;
            line-height: 71rpx;
            text-align: center;
        }
    }

    .confirm {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
        margin: 12rpx auto 65rpx auto;
    }

    .yes {
        background: #F3BE1D;
        box-shadow: 0px 2px 15px 0px rgba(168, 18, 18, 0.5);
        color: white;
    }

    .cancel {
        color: #F3BE1D;
        background: #FFFFFF;
        box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.15);
    }

    .smile {
        width: 150rpx;
        height: 126rpx;
        display: block;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

}
</style>
