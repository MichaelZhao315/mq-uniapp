<template>
  <view>
    <view class="headtitle">《上海市居住证》积分模拟打分计算器</view>
    <view class="content">
      <view class="desc">基础指标及分值</view>
      <uni-forms ref="baseForm" :modelValue="baseFormData">
        <uni-forms-item>
          <view class="title">一、您的年龄</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入年龄" class="inputText" type="number" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">二、教育背景</view>
          <view class="uni-list">
            <radio-group @change="radioChange" >
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{item.name}}</text>
                  <radio :value="item.value" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">三、专业技术职称和技能等级</view>
          <view class="uni-list">
            <radio-group @change="radioChangeGrade" >
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in item2" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{item.name}}</text>
                  <radio :value="item.value" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">四、社会保险年</view>
          <uni-easyinput v-model="baseFormData.year" placeholder="请输入缴费年限，未缴填0" class="inputText" type=”number“ />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="handleSubmit">提交</button>
    </view>
    <onlineChat />
    <phone />
  </view>
</template>
  
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import onlineChat from "@/components/onlineChat.vue";
import phone from "@/components/phone.vue";
const state: {
  baseFormData: {
    name: number,
    edu: string,
    grade: string,
    year: number,
  },
  current: number,
  items: Array<any>,
  item2: Array<any>
} = reactive({
  // 响应式数据
  baseFormData: {
    name: 0,
    edu: "0",
    grade: "0",
    year: 0,
  },
  current: 0,
  items: [{
    value: '0',
    name: '高中（中专、职校、技校）及以下',
  },
  {
    value: '1',
    name: '大专（高职）学历'
  },
  {
    value: '2',
    name: '大学本科学历和学士学位'
  },
  {
    value: '3',
    name: '硕士研究生学历学位'
  },
  {
    value: '4',
    name: '博士研究生学历'
  },
  ],
  item2: [{
    value: '0',
    name: '无专业技术职称和技能等级',
  },
  {
    value: '1',
    name: '国家职业资格五级'
  },
  {
    value: '2',
    name: '国家职业资格四级'
  },
  ]
});
const { baseFormData, items, item2, current } = toRefs(state);

function radioChange(evt: { detail: { value: any; }; }) {
  state.baseFormData.edu = evt.detail.value
}
function radioChangeGrade(evt: { detail: { value: string; }; }) {
  state.baseFormData.grade = evt.detail.value
}
function handleSubmit() {
  console.log(state.baseFormData, 'baseFormData')
}

</script>
  
<style lang="scss" scoped>
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
}

.radioTag {
  border: 1px solid rgba(231, 231, 231, 1);
  border-radius: 30rpx;
  padding: 20rpx;
  background: #FFFFFF;
  margin-bottom: 22rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.desc {
  padding: 0 0 20rpx 0;
}

.inputText {

  width: 100%;

}

.radioName {
  font-family: PingFangSC-Regular;
  font-size: 28rpx;
  color: #061423;
  letter-spacing: 0;
  font-weight: 400;
}
</style>
  