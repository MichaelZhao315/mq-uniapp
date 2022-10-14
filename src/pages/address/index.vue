<template>
  <view class="content">
    <view class="wrap">
      <image class="addressImg" src="@/static/images/pic.jpeg" />
      <view class="detail">
        <image class="icon" src="@/static/images/company.png" />
        <view class="right">
          <text class="word">浦东新区人才交流中心</text>
          <text class="time">工作日：8:00～17：00</text>
          <text class="word">上海市浦东新区环科路999弄浦东国际人才港1号楼一楼受理大厅</text>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="name">
        <image class="icon" src="@/static/images/tag.png" />路线
      </view>
      <view class="name">
        <image class="icon" src="@/static/images/support_2.png" />电话
      </view>
      <view class="name">
        <image class="icon" src="@/static/images/share.png" />分享
      </view>
    </view>
    <onlineChat />
    <phone />
  </view>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import onlineChat from "@/components/onlineChat.vue";
import phone from "@/components/phone.vue";
</script>
<style lang="scss" scoped>
.content {
  width: 638rpx;
  margin: 0 auto;
}

.wrap {
  border-radius: 16rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 46rpx;
  background-color: white;
}

.addressImg {
  width: 100%;
  height: 420rpx;
  border-radius: 16rpx 16rpx 0 0;
  display: inline-block;
}

.detail {
  padding: 48rpx 12rpx;
  display: flex;
  width: 100%;
  box-sizing: border-box;

  .icon {
    width: 120rpx;
    height: 120rpx;
    display: inline-block;
  }

  .right {
    display: flex;
    flex-direction: column;
    flex: 1;

    .word {
      font-family: PingFangSC-Medium;
      font-size: 32rpx;
      color: #01000D;
      font-weight: 500;
    }

    .time {
      font-family: PingFangSC-Regular;
      font-size: 28rpx;
      color: #8F92A1;
      font-weight: 400;
      margin: 15rpx 0 24rpx 0;
    }
  }
}

.item {
  background: #EDEEEF;
  border-radius: 0 0 16rpx 16rpx;
  width: 586rpx;
  display: flex;
  margin: 0 auto;
  padding: 22rpx;
  box-sizing: border-box;
  justify-content: space-around;

  .icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx;
  }

  .name {
    font-family: PingFangSC-Semibold;
    font-size: 32rpx;
    color: #008789;
    display: flex;
    align-items: center;
    font-weight: 600;
  }

}
</style>

  
 
  