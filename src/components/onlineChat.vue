<template>
    <view class="content">
        <image src="@/static/images/online_chat.png" class="online" />
        <button type="primary" open-type="contact">开始聊天</button>
    </view>
</template>
    
<script setup lang="ts">
import { ref } from 'vue'

</script>
<style lang="scss" scoped>
.online {
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    right: 0;
    top: 750rpx;
    z-index: 3;
}
</style>
  
    
   
    