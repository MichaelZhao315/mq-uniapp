<template>
  <view>
    <view class="headtitle">上海落户信息填写</view>
    <image class="element" src="@/static/images/element.png"></image>
    <view class="content">
      <view class="desc">上海落户信息填写</view>
      <uni-forms ref="baseForm" :modelValue="baseFormData">
        <uni-forms-item>
          <view class="title">一、您的姓名</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">三、文化程度</view>
          <view class="uni-list">
            <radio-group @change="radioChange">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{item.name}}</text>
                  <radio :value="item.value" :checked="index === current" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">四、学位</view>
          <view class="uni-list">
            <radio-group @change="radioChange">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in item2" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{item.name}}</text>
                  <radio :value="item.value" :checked="index === current" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">四、社会保险年</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入缴费念书，为缴填0" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <button type="primary">提交</button>
        </uni-forms-item>
      </uni-forms>
    </view>
  </view>
</template>
  
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
let state = reactive({
  // 响应式数据
  baseFormData: {
    discount: 0,
    name: "",
    email: "",
    phone: "",
  },
  items: [{
    value: 'USA',
    name: '高中（中专、职校、技校）及以下',
    checked: 'true'
  },
  {
    value: 'CHN',
    name: '大专（高职）学历'
  },
  {
    value: 'BRA',
    name: '大学本科学历和学士学位'
  },
  {
    value: 'JPN',
    name: '硕士研究生学历学位'
  },
  {
    value: 'ENG',
    name: '博士研究生学历'
  },
  ],
  item2: [{
    value: 'USA',
    name: '博士',
    checked: 'true'
  },
  {
    value: 'CHN',
    name: '本科'
  },
  {
    value: 'BRA',
    name: '大专'
  },
  {
    value: 'BRA',
    name: '无'
  },
  ]
});
const { baseFormData, items, item2 } = toRefs(state);
function radioChange(evt) {

}
</script>
  
<style lang="scss" scoped>
.element {
  width: 218rpx;
  height: 218rpx;
  margin: 80rpx auto;
  display: block;
}

.headtitle {
  font-family: PingFangSC-Regular;
  font-size: 32rpx;
  color: #004751;
  letter-spacing: 0;
  padding: 60rpx 0 30rpx 0;
  font-weight: 400;
  text-align: center;
  background: white;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 48rpx 48rpx 180rpx 48rpx;

  .title {
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #202046;
    letter-spacing: 0;
    font-weight: 400;
    padding: 0 0 22rpx 0;
  }

  .radioTag {
    border: 1px solid rgba(231, 231, 231, 1);
    border-radius: 30rpx;
    padding: 34rpx;
    background: #FFFFFF;
    margin-bottom: 22rpx;
    display: flex;
    justify-content: space-between;
  }



  .desc {
    padding: 0 0 20rpx 0;
  }

  .inputText {
    width: 100%;
    height: 88rpx;
  }

  .radioName {
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #061423;
    letter-spacing: 0;
    font-weight: 400;
  }
}
</style>
  