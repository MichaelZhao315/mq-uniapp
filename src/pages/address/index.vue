<template>
  <view>
    <view class="content" v-for="item in address" :key="item.id">
      <view class="wrap">
        <image class="addressImg" :src="item.companyPicUrl" />
        <view class="detail">
          <image class="icon" src="@/static/images/company.png" />
          <view class="right">
            <text class="word">{{ item.companyName }}</text>
            <text class="time">{{ `工作日：${item.workBeginTime}～${item.workEndTime}` }}</text>
            <text class="word">{{ item.companyAddress }}</text>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="name" @click="handleLocation(item.latitude, item.longitude,)">
          <image class="icon" src="@/static/images/tag.png" />路线
        </view>
        <view class="name" @click="call(item.phoneno)">
          <image class="icon" src="@/static/images/support_2.png" />电话
        </view>
        <view class="name sharebox" @click="handleShare">
          <button open-type="share" class="shareBtn">分享</button>
          <view class="shareText">
            <image class="icon " src="@/static/images/share.png" />
            分享
          </view>
        </view>
      </view>
    </view>
    <!-- <onlineChat /> -->
    <phone />
    <!-- <MyDialog ref="MyDialogRef">
    </MyDialog> -->
  </view>
</template>
  
<script setup lang="ts">
// import onlineChat from "@/components/onlineChat.vue";
import phone from "@/components/phone.vue";
import { mqCompanyAddress } from "@/api/index";
import { reactive, toRefs, ref } from 'vue'


const state: {
  address: Array<any>,
} = reactive({
  address: []
})

const { address } = toRefs(state)
// let MyDialogRef = ref('MyDialogRef'); // 获取ref节点


async function getLocationFn() {
  const res = await mqCompanyAddress()
  if (res.code == 200) {
    state.address = res.result
  }
}
getLocationFn()

//电话
function call(phone: string) {
  const res = uni.getSystemInfoSync();
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
//地图
function handleLocation(latitude: number, longitude: number) {
  uni.getLocation({
    type: 'gcj02',
    success: function (res) {
      uni.openLocation({
        latitude: latitude,
        longitude: longitude,
        success: function () {
          console.log('success');
        }
      })
    },
    fail: function (err) {
      console.log(err)
    }
  });
}
//分享
function handleShare() {
  uni.share({
    provider: "weixin",
    scene: "WXSceneSession",
    type: 1,
    summary: "浦东新区人才交流中心",
    success: function (res) {
      console.log("success:" + JSON.stringify(res));
    },
    fail: function (err) {
      console.log("fail:" + JSON.stringify(err));
    }
  });
}
</script>
<style lang="scss">
page {
  background-color: #F8F9FA
}
</style>
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

.sharebox {
  position: relative;
}

.shareBtn {
  position: absolute;
  left: 0;
  top: 0;
  width: 120rpx;
  height: 45rpx;
  opacity: 0;
}

.shareText {
  height: 45rpx;
  width: 120rpx;
  display: flex;
  align-items: center;
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

  
 
  