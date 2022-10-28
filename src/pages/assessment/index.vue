<template>
  <view>
    <view class="headtitle">上海落户信息填写</view>
    <image class="element" src="@/static/images/element.png"></image>
    <view class="content">
      <uni-forms ref="baseForm" :modelValue="baseFormData" class="assessmentbox">
        <uni-forms-item>
          <view class="title">一、您的姓名</view>
          <uni-easyinput v-model="baseFormData.realName" placeholder="请输入姓名" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">二、性别</view>
          <view class="uni-list">
            <radio-group @change="radioChange('sex', $event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">男</text>
                  <radio value="1" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">女</text>
                  <radio value="2" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">三、文化程度</view>
          <view class="uni-list">
            <radio-group @change="radioChange('educationLevel', $event)">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{ item.name }}</text>
                  <radio :value="item.value" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">四、学位</view>
          <view class="uni-list">
            <radio-group @change="radioChange('ademicDegree', $event)">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in item2" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{ item.name }}</text>
                  <radio :value="item.value" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">五、所学专业</view>
          <uni-easyinput v-model="baseFormData.major" placeholder="填写大专以上专业" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">六、公司是否是高新企业或重点金融企业</view>
          <view class="uni-list">
            <radio-group @change="radioChange('companyType', $event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio value="1" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio value="0" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">七、何时入职</view>
          <view class="example-body">
            <uni-datetime-picker type="date" :clear-icon="false" v-model="baseFormData.checkInDate" />
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">八、有无中高级职称/技能资格证书</view>
          <view class="uni-list">
            <radio-group @change="radioChange('hasSeniorProfessionalTitle', $event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">有</text>
                  <radio value="1" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">无</text>
                  <radio value="0" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">九、职称/技能全称</view>
          <uni-easyinput v-model="baseFormData.seniorProfessionalTitle" placeholder="请输入您的职称/技能全称" class="inputText" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十、居住证首次办证时间</view>
          <view class="example-body">
            <uni-datetime-picker type="date" :clear-icon="false" v-model="baseFormData.firstResidencePermitDate" />
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十一、近四年上海社保缴纳的基数</view>
          <!-- <view class="title">例：2018年1月 - -至今</view> -->
          <view class="mb">
            <uni-easyinput v-model="baseFormData.socialSecurityFirstYears"
              :placeholder="'填写' + new Date().getFullYear() + '年社保基数'" type="number" />
          </view>
          <view class="mb">
            <uni-easyinput v-model="baseFormData.socialSecuritySecondYears"
              :placeholder="'填写' + (new Date().getFullYear() - 1) + '年社保基数'" type="number" />
          </view>
          <view class="mb">
            <uni-easyinput v-model="baseFormData.socialSecurityThirdYears"
              :placeholder="'填写' + (new Date().getFullYear() - 2) + '年社保基数'" type="number" />
          </view>
          <view class="mb">
            <uni-easyinput v-model="baseFormData.socialSecurityForthYears" :placeholder="'填写' +
            (new Date().getFullYear() - 3) + '年社保基数'" type="number" />
          </view>

        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十二、联系方式</view>
          <uni-easyinput v-model="baseFormData.contactTelephone" placeholder="填写联系方式" class="inputText" type="number" />
          <view class="title" style="text-align: right;margin-top: 5rpx;">之后会有老师联系您</view>
        </uni-forms-item>
        <uni-forms-item>
          <button type="default" @click="handleSubmit" style="background:#007aff;color:white">提交</button>
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
    <!-- <onlineChat /> -->
    <phone />
    <!-- <MyDialog ref="MyDialogRef">
    </MyDialog> -->
  </view>
</template>
  
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { addInfo } from "@/api/index";
// import onlineChat from "@/components/onlineChat.vue";
import phone from "@/components/phone.vue";
let state: {
  baseFormData: {
    realName: string,
    sex: string,
    educationLevel: string,
    ademicDegree: string,
    major: string,
    companyType: string,
    checkInDate: string,
    hasSeniorProfessionalTitle: string,
    seniorProfessionalTitle: string,
    firstResidencePermitDate: string,
    socialSecurityFirstYears: string,
    socialSecuritySecondYears: string,
    socialSecurityThirdYears: string,
    socialSecurityForthYears: string,
    contactTelephone: string,
    [propName: string]: string;
  },
  items: Array<any>,
  item2: Array<any>,
} = reactive({
  // 响应式数据
  baseFormData: {
    realName: "",
    sex: "",
    educationLevel: "",
    ademicDegree: "",
    major: "",
    companyType: "",
    checkInDate: "",
    hasSeniorProfessionalTitle: "",
    seniorProfessionalTitle: "",
    firstResidencePermitDate: "",
    socialSecurityFirstYears: "",
    socialSecuritySecondYears: "",
    socialSecurityThirdYears: "",
    socialSecurityForthYears: "",
    contactTelephone: ""
  },
  items: [{
    value: '1',
    name: '研究生',
    checked: 'true'
  },
  {
    value: '2',
    name: '本科'
  },
  {
    value: '3',
    name: '大专（高等职校）'
  },
  {
    value: '4',
    name: '普通高中'
  },
  {
    value: '5',
    name: '中专、技校'
  },
  {
    value: '6',
    name: '高中以下'
  },
  ],
  item2: [{
    value: '1',
    name: '博士',
    checked: 'true'
  },
  {
    value: '2',
    name: '硕士'
  },
  {
    value: '3',
    name: '学士'
  },
  {
    value: '4',
    name: '无'
  },
  ]
});
const { baseFormData, items, item2, } = toRefs(state);
function radioChange(key: string, evt: { detail: { value: string; }; }) {
  state.baseFormData[key] = evt.detail.value
}

function handleSubmit() {
  addInfo(state.baseFormData).then(res => {
    if (res.code == 200) {
      uni.showModal({
        title: '提示',
        content: '信息提交成功！！',
        success: function (res) {
          if (res.confirm) {
            state.baseFormData = {
              realName: "",
              sex: "",
              educationLevel: "",
              ademicDegree: "",
              major: "",
              companyType: "",
              checkInDate: "",
              hasSeniorProfessionalTitle: "",
              seniorProfessionalTitle: "",
              firstResidencePermitDate: "",
              socialSecurityFirstYears: "",
              socialSecuritySecondYears: "",
              socialSecurityThirdYears: "",
              socialSecurityForthYears: "",
              contactTelephone: ""
            }
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  })
}
</script>
<style >
page {
  background-color: #F8F9FA
}

.assessmentbox /deep/ .uni-easyinput__content {
  height: 92rpx;
  border-radius: 30rpx;
  padding-left: 20rpx;
}

.inputText {
  width: 100%;
  height: 92rpx;
  border-radius: 30rpx;
}
</style>
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
  box-shadow: 0 88rpx 130rpx 0 rgba(0, 0, 0, 0.06);
  border-radius: 0 0 30rpx 30rpx;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 48rpx 48rpx 180rpx 48rpx;
  font-size: 28rpx;

  .mb {
    margin-bottom: 10rpx;
  }

  .title {
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
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
    margin-bottom: 10rpx;
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
  