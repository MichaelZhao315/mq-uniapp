<template>
    <view class="content" @click="call('17521061937')">
        <image src="@/static/images/24h.png" class="phone" />
    </view>
</template>
    
<script setup lang="ts">
import { ref } from 'vue'
function call(phone: string) {
    const res = uni.getSystemInfoSync();
    uni.makePhoneCall({
        phoneNumber: phone
    });
    // ios系统默认有个模态框
    if (res.platform == 'ios') {
        uni.makePhoneCall({
            phoneNumber: phone,
            success() {
                console.log('拨打成功了');
            },
            fail() {
                console.log('拨打失败了');
            }
        })
    } else {
        //安卓手机手动设置一个showActionSheet
        uni.showActionSheet({
            itemList: [phone, '呼叫'],
            success: function (res) {
                if (res.tapIndex == 1) {
                    uni.makePhoneCall({
                        phoneNumber: phone,
                    })
                }
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.phone {
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    right: 0;
    top: 900rpx;
    z-index: 3;
}
</style>
  
    
   
    