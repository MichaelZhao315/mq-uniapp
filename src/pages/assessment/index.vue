<template>
  <view>
    <view class="headtitle">上海落户信息填写</view>
    <image class="element" src="@/static/images/element.png"></image>
    <view class="content">
      <uni-forms ref="baseForm" :modelValue="baseFormData">
        <uni-forms-item>
          <view class="title">一、您的姓名</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">二、性别</view>
          <view class="uni-list">
            <radio-group @change="radioChange">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">男</text>
                  <radio value="i0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">女</text>
                  <radio value="i0" />
                </view>
              </label>
            </radio-group>
          </view>
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
          <view class="title">五、所学专业</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="填写大专以上专业" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">六、公司是否是高新企业或重点金融企业</view>
          <view class="uni-list">
            <radio-group @change="radioChange">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio value="i0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio value="i0" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">七、何时入职</view>
          <view class="example-body">
            <uni-datetime-picker type="date" :clear-icon="false" />
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">八、有无中高级职称/技能资格证书</view>
          <view class="uni-list">
            <radio-group @change="radioChange">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">有</text>
                  <radio value="i0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">无</text>
                  <radio value="i0" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">九、职称/技能全称</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入您的职称/技能全称" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十、居住证首次办证时间</view>
          <view class="example-body">
            <uni-datetime-picker type="date" :clear-icon="false" />
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十一、近四年上海社保缴纳的基数</view>
          <view class="title">例：2018年1月 - -至今</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="填写近一年社保基数" class="inputText" />
          <uni-easyinput v-model="baseFormData.name" placeholder="填写近二年社保基数" class="inputText" />
          <uni-easyinput v-model="baseFormData.name" placeholder="填写近三年社保基数" class="inputText" />
          <uni-easyinput v-model="baseFormData.name" placeholder="填写近四年社保基数" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十二、联系方式</view>
          <uni-easyinput v-model="baseFormData.name" placeholder="填写联系方式" class="inputText" />
          <view class="title">之后会有老师联系您</view>
        </uni-forms-item>
        <uni-forms-item>
          <button type="primary">提交</button>
        </uni-forms-item>
      </uni-forms>
      <view class="tipBox">
        <view class="step">注：社保查询流程图</view>
        <view class="step">下载“上海人社”APP</view>
        <image src="@/static/images/app001.png" class="app1" />
        <view class="step">第一步：登录或注册上海人社账号</view>
        <image src="@/static/images/app002.png" class="app2" />
        <view class="step">第二步：点击首页“业务经办”模块</view>
        <image src="@/static/images/app003.png" class="app3" />
        <view class="step">第三步：“申领CA证书”并设置CA证书密码（第一次登录需申领，非首次输入密码即可）</view>
        <image src="@/static/images/app004.png" class="app4" />
        <view class="step">第四步：点击“社会保险”模块</view>
        <view class="step">第五步：点击“城保缴费查询”进入“养老保险缴费情况查询”</view>
        <view class="step">最后查看每年社保基数即可</view>
      </view>
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
    padding: 20rpx;
    background: #FFFFFF;
    margin-bottom: 22rpx;
    display: flex;
    justify-content: space-between;
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

.tipBox {
  .step {
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #B20202;
    letter-spacing: 0;
    font-weight: 400;
    margin: 60rpx 0 40rpx 0;
  }



  .app1 {
    width: 458rpx;
    height: 174rpx;
    margin: 0 auto;
    display: flex;
  }

  .app2 {
    width: 398rpx;
    height: 460rpx;
    margin: 0 auto;
    display: flex;
  }

  .app3 {
    width: 296rpx;
    height: 642rpx;
    margin: 0 auto;
    display: flex;
  }

  .app4 {
    width: 554rpx;
    height: 441rpx;
    margin: 0 auto;
    display: flex;
  }
}
</style>
  