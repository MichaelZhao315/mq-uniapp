<template>
    <view class="content" @click="call('17521061937')">
        <image src="@/static/images/24h.png" class="phone" />
    </view>
</template>
    
<script setup lang="ts">
function call(phone: string) {
    uni.makePhoneCall({
        phoneNumber: phone
    });
}
</script>
<style lang="scss" scoped>
.phone {
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    right: 0;
    bottom: 200rpx;
    z-index: 3;
}
</style>
  
    
   
    