<template>

    <uni-popup ref="alertDialog" class="dialogC" type="center">
        <view class="popup-content">
            <view class="content" v-if="!nickname">
                <image src="@/static/images/logo.png" class="logo" />
                <view class="step1">第一步：需授权基础信息</view>
                <view class="info">获取昵称，头像更好的享受平台服务</view>
                <button open-type="getUserInfo" type="primary" class="btn" @getuserinfo="getuserinfo">确定授权</button>
                <button type="info" class="btn" @click="cancel">取消</button>
            </view>
            <view class="content" v-if="nickname&&!isbindphone">
                <image src="@/static/images/logo.png" class="logo" />
                <view class="step1">第二步：需授权基础信息</view>
                <view class="info">绑定手机号后成为会员</view>
                <button open-type="getPhoneNumber" type="warn" class="btn"
                    @getphonenumber="getPhoneNumber">获取手机号</button>
                <button type="info" class="btn" @click="cancel">取消</button>
            </view>
        </view>
    </uni-popup>
</template>
<script setup lang="ts">
import { reactive, getCurrentInstance, withDefaults, toRefs, ref, onMounted } from 'vue';
import { addmqMembers } from "@/api/index";
import { onLoad, onReachBottom, onReady, onShow } from '@dcloudio/uni-app';

const state: {
    code: string,
    openid: string,
    unionid: string,
    session_key: string,
    headerImg: string,
    nickname: string,
    isbindphone: boolean
} = reactive({
    // 响应式数据
    code: '',
    openid: "",
    unionid: "",
    session_key: "",
    headerImg: "",
    nickname: "",
    isbindphone: false
});
const { nickname, isbindphone } = toRefs(state)
const alertDialog = ref<any>(null);
onLoad(() => {
    uni.getStorage({
        key: 'nickname',
        success: function (res: any) {
            if (!res.data) {
                login()
            } else {
                state.nickname = res.data
            }
        },
        fail: function (res) {
            login()
        },
    });
})
onMounted(() => {
    alertDialog.value && alertDialog.value.open();
})
function login() {
    uni.login({
        provider: 'weixin',
        success(res) {
            if (res.code) {         //微信登录成功 已拿到code  
                state.code = res.code
                uni.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    method: 'GET',
                    data: {
                        appid: "wxa4c6732b0dda40ed",        //你的小程序的APPID  
                        secret: '99027dd45ddf9fd87ff003aa4d8fa3c7',       //你的小程序的secret,  
                        // code: res.code,              //wx.login 登录成功后的code  
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    },
                    success: (cts: { data: any }) => {
                        // 换取成功后 暂存这些数据 留作后续操作  
                        state.openid = cts.data.openid     //openid 用户唯一标识  
                        state.unionid = cts.data.unionid     //unionid 开放平台唯一标识  
                        state.session_key = cts.data.session_key     //session_key  会话密钥  
                        uni.setStorage({
                            key: 'openid',
                            data: cts.data.openid
                        });
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
    uni.getUserInfo({
        provider: 'weixin',
        success: function (infoRes: { userInfo: any }) {
            console.log(infoRes, '昵称头像')
            //调用解密
            state.nickname = infoRes.userInfo.avatarUrl
            uni.setStorage({
                key: 'nickname',
                data: infoRes.userInfo.avatarUrl
            });
        }
    });
}

function getPhoneNumber(e: { detail: { errMsg: string; encryptedData: any; iv: any; }; }) {
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {       //用户决绝授权  
        //拒绝授权后弹出一些提示  
    } else {      //允许授权  
        console.log(e.detail, '手机号码')
        e.detail.encryptedData      //加密的用户信息  
        e.detail.iv     //加密算法的初始向量  时要用到  
        const data = {
            "headerImg": state.headerImg,
            "nickname": state.nickname,
            "phoneno": e.detail,
        }
        addmqMembers(data).then(res => {
            if (res.code == 200) {
                uni.showToast({
                    title: '绑定成功～',
                    duration: 2000
                });
            }
        })

    }
}

function cancel() {
    alertDialog.value && alertDialog.value.close();
}

</script>

<style lang="scss" scoped>
.content {
    padding: 20rpx;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;

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

.popup-content {
    display: flex;
    flex-direction: column;
    padding: 40rpx;
    width: 570rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;
}
</style>
