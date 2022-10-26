<template>
  <view>
    <view class="headtitle">《上海市居住证》积分模拟打分计算器</view>
    <view class="content">
      <view class="desc">基础指标及分值</view>
      <uni-forms ref="baseForm" :modelValue="baseFormData">
        <uni-forms-item>
          <view class="title">一、您的年龄</view>
          <uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" class="inputText" type="number" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">二、教育背景</view>
          <view class="uni-list">
            <radio-group @change="radioChange('jiaoyu',$event)">
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
            <radio-group @change="radioChange('zhicheng',$event)">
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
          <uni-easyinput v-model="baseFormData.year" placeholder="请输入缴费年限，未缴填0" class="inputText" type="number" />
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">五、紧急急需专业</view>
          <view class="uni-list">
            <radio-group @change="radioChange('jinji',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio :value="30" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">六、投资纳税或带动本地就业</view>
          <view class="uni-list">
            <radio-group @change="radioChange('nashui',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">无</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">最近连续3年平均每年纳税额在10万元人民币及以上 </text>
                  <radio :value="1" />
                </view>
              </label>
              <view v-if="baseFormData.nashui==1">纳税金额(单位：万)
                <uni-easyinput v-model="baseFormData.nashuiNum1" placeholder="请输入纳税金额" class="inputText" type="number"
                  style="margin-bottom: 10rpx;" />
              </view>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">最近连续3年平均每年聘用本市户籍人员10人及以上</text>
                  <radio :value="2" />
                </view>
              </label>
            </radio-group>
            <view v-if="baseFormData.nashui==2">聘用人数：
              <uni-easyinput v-model="baseFormData.nashuiNum2" placeholder="请输入聘用上海户籍人数" class="inputText"
                type="number" />
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">七、缴纳职工社会保险费基数</view>
          <view class="uni-list">
            <view>技术标准：2018年7132元，2019年7832元（2019年11月起8211元），2020年7月9339元</view>
            <view style="margin-bottom: 10rpx;">最近4年内累计36个月在上海市缴纳职工社会保险费基数同上海市上年度职工平均工资比较：</view>
            <radio-group @change="radioChange('shebao',$event)">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in item3" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{item.name}}</text>
                  <radio :value="item.value" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">八、特定的公共服务领域（环卫）</view>
          <view class="uni-list">
            <radio-group @change="radioChange('huanwei',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio :value="1" />
                </view>
              </label>
            </radio-group>
            <view v-if="baseFormData.huanwei">
              <text>工作年限</text>
              <uni-easyinput v-model="baseFormData.huanweiNum" placeholder="请输入年限" class="inputText" type="number" />
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">九、远郊重点区域（临港地区）</view>
          <view class="uni-list">
            <radio-group @change="radioChange('yuanjiao',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio :value="1" />
                </view>
              </label>
            </radio-group>
            <view v-if="baseFormData.yuanjiao">
              <text>居住年限</text>
              <uni-easyinput v-model="baseFormData.yuanjiaoNum" placeholder="请输入居住年限" class="inputText" type="number" />
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十、是否全日制应届高校大学毕业生</view>
          <view class="uni-list">
            <radio-group @change="radioChange('daxue',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio :value="10" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十一、您在上海工作期间是否获得过表彰奖励</view>
          <view class="uni-list">
            <radio-group @change="radioChange('jiangli',$event)">
              <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in item4" :key="item.value">
                <view class="radioTag">
                  <text class="radioName">{{item.name}}</text>
                  <radio :value="item.value" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十二、配偶为本地户籍人员</view>
          <view class="uni-list">
            <radio-group @change="radioChange('peiou',$event)">

              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">否</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">是</text>
                  <radio :value="1" />
                </view>
              </label>
            </radio-group>
            <view v-if="baseFormData.peiou">
              <text>结婚年限</text>
              <uni-easyinput v-model="baseFormData.peiouNum" placeholder="请输入结婚年限" class="inputText" type="number" />
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十三、三年内申请积分时提供虚假材料</view>
          <view class="uni-list">
            <radio-group @change="radioChange('xujia',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">无</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">一次</text>
                  <radio :value="-150" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">两次</text>
                  <radio :value="-300" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十四、五年内行政拘留记录</view>
          <view class="uni-list">
            <radio-group @change="radioChange('juliu',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">无</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">一次</text>
                  <radio :value="-50" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">两次</text>
                  <radio :value="-100" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <view class="title">十五、五年内一般刑事犯罪记录</view>
          <view class="uni-list">
            <radio-group @change="radioChange('fanzui',$event)">
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">无</text>
                  <radio :value="0" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">一次</text>
                  <radio :value="-150" />
                </view>
              </label>
              <label class="uni-list-cell uni-list-cell-pd">
                <view class="radioTag">
                  <text class="radioName">两次</text>
                  <radio :value="-300" />
                </view>
              </label>
            </radio-group>
          </view>
        </uni-forms-item>
        <uni-forms-item>
          <button type="default" @click="handleSubmit" style="background:#007aff;color:white">计算积分</button>
        </uni-forms-item>
      </uni-forms>
    </view>
    <!-- <onlineChat /> -->
    <phone />
    <!-- <MyDialog ref="MyDialogRef"> </MyDialog> -->
  </view>
</template>
  
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
// import onlineChat from "@/components/onlineChat.vue";
import phone from "@/components/phone.vue";
let state: {
  baseFormData: {
    age: number,
    jiaoyu: number,
    zhicheng: number,
    year: number,
    jinji: number,
    nashui: number,
    shebao: number,
    huanwei: number,
    yuanjiao: number,
    daxue: number,
    jiangli: number,
    peiou: number,
    xujia: number,
    juliu: number,
    fanzui: number,
    huanweiNum: number,
    yuanjiaoNum: number,
    peiouNum: number,
    [propName: string]: number;
    [propName: number]: number;
  },
  current: number,
  items: Array<any>,
  item2: Array<any>,
  item3: Array<any>,
  item4: Array<any>,
} = reactive({
  // 响应式数据
  baseFormData: {
    age: 0,
    jiaoyu: 0,
    zhicheng: 0,
    year: 0,
    jinji: 0,
    nashui: 0,
    shebao: 0,
    huanwei: 0,
    yuanjiao: 0,
    daxue: 0,
    jiangli: 0,
    peiou: 0,
    xujia: 0,
    juliu: 0,
    fanzui: 0,
    huanweiNum: 0,
    yuanjiaoNum: 0,
    peiouNum: 0
  },
  current: 0,
  items: [{
    value: 0,
    name: '高中（中专、职校、技校）及以下',
  },
  {
    value: 50,
    name: '大专（高职）学历'
  },
  {
    value: 60,
    name: '大学本科学历'
  },
  {
    value: 90,
    name: '大学本科学历和学士学位'
  },
  {
    value: 100,
    name: '硕士研究生学历学位'
  },
  {
    value: 110,
    name: '博士研究生学历学位'
  },
  ],
  item2: [{
    value: 0,
    name: '无专业技术职称和技能等级',
  },
  {
    value: 15,
    name: '国家职业资格五级'
  },
  {
    value: 30,
    name: '国家职业资格四级'
  },
  {
    value: 60,
    name: '国家职业资格三级'
  },
  {
    value: 100,
    name: '国家职业资格二级（技师）'
  },
  {
    value: 140,
    name: '国家职业资格一级（高级技师)'
  },
  ],
  item3: [
    {
      value: 0,
      name: '未缴纳'
    },
    {
      value: 0,
      name: '低于80%'
    },
    {
      value: 25,
      name: '上年社平80%<=基数<上年社平'
    },
    {
      value: 50,
      name: '上年社平<=基数<上年社平2倍'
    },
    {
      value: 100,
      name: '基数>=上年社平2倍'
    },

  ],
  item4: [
    {
      value: 0,
      name: '无'
    },
    {
      value: 30,
      name: '获得过上海市委办局等市级机关专项性表彰奖励'
    },
    {
      value: 60,
      name: '获得过上海市委办局等市级机关综合性表彰奖励'
    },
    {
      value: 110,
      name: '获得过省部级以上政府表彰奖励'
    }
  ]
});
const { baseFormData, items, item2, item3, item4 } = toRefs(state);

function radioChange(key: string, evt: { detail: { value: number; }; }) {
  state.baseFormData[key] = Number(evt.detail.value)
}
function handleSubmit() {

  var summary = 0
  const age = state.baseFormData.age
  const jiaoyu = state.baseFormData['jiaoyu']
  const zhicheng = state.baseFormData['zhicheng']
  const year = state.baseFormData['year']
  const huanwei = state.baseFormData['huanwei']
  const huanweiNum = state.baseFormData['huanweiNum']
  const yuanjiao = state.baseFormData['yuanjiao']
  const yuanjiaoNum = state.baseFormData['yuanjiaoNum']
  const peiou = state.baseFormData['peiou']
  const peiouNum = state.baseFormData['peiouNum']
  const nashui = state.baseFormData['nashui']
  const nashuiNum1 = state.baseFormData['nashuiNum1']
  const nashuiNum2 = state.baseFormData['nashuiNum2']

  var age_score: number = 0, huanwei_score: number = 0, yuanjiao_score: number = 0,
    peiou_score: number = 0, nashui_score: number = 0;
  var jiaoyu_zhicheng_score = jiaoyu > zhicheng ? jiaoyu : zhicheng
  var year_score = year * 3

  if (age <= 60) {
    if (age >= 56) {
      age_score = 5
    } else {
      age_score = (56 - age) * 2 > 30 ? 30 : (56 - age) * 2
    }
  }
  if (huanwei == 1 && huanweiNum >= 5) {
    huanwei_score = huanweiNum * 4
  }
  if (yuanjiao == 1 && yuanjiaoNum >= 5) {
    yuanjiao_score = yuanjiaoNum * 2 > 20 ? 20 : yuanjiaoNum * 2
  }
  if (peiou == 1) {
    peiou_score = peiouNum * 4 > 40 ? 40 : peiouNum * 4
  }
  if (nashui !== 0) {
    var nashuiScore1 = nashuiNum1 ? (Math.floor(nashuiNum1 / 10) * 10 > 100 ? 100 : Math.floor(nashuiNum1 / 10) * 10) : 0
    var nashuiScore2 = nashuiNum2 ? (Math.floor(nashuiNum2 / 10) * 10 > 100 ? 100 : Math.floor(nashuiNum2 / 10) * 10) : 0
    nashui_score = nashuiScore1 > nashuiScore2 ? nashuiScore1 : nashuiScore2
  }

  summary = age_score + jiaoyu_zhicheng_score + year_score + nashui_score + yuanjiao_score + huanwei_score + peiou_score + state.baseFormData['jinji'] +
    state.baseFormData['shebao'] + state.baseFormData['daxue'] + state.baseFormData['jiangli'] + state.baseFormData['xujia'] + state.baseFormData['juliu'] +
    state.baseFormData['fanzui']

  if (summary <= 0) {
    summary = 0
  }
  if (summary >= 120) {
    summary = 120
  }
  uni.showModal({
    title: "总分：" + summary,
    content: "此分值为模拟打分，最终分值以实际申报材料计分为准！",
    success: function (res) {
      if (res.confirm) {
        console.log(summary, '用户点击确定');
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}

</script>
  
<style lang="scss" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 48rpx 48rpx 180rpx 48rpx;

  .title {
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
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
  