<template>
    <view class="content">
        <button class='online contactbtn' open-type='contact'>客服</button>
        <image src="@/static/images/online_chat.png" class="online" />
    </view>
</template>
    
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.online {
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    right: 0;
    bottom: 350rpx;
    display: block;
    z-index: 3;
}

.contactbtn {
    opacity: 0;
    z-index: 4;
}
</style>
  
    
   
    