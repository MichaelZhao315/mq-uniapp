<template>
  <view class="content">
    <!-- head -->
    <view class="headContent">
      <image src="@/static/images/top_bg_mask.png" class="bgimg" />
      <view class="search">
        <uni-search-bar class="uni-mt-10" radius="100" placeholder="输入搜索内容" clearButton="none" cancelButton="none"
          @confirm="search" />
      </view>
      <view class="itemWrap">
        <view :class="`item ${active==0&&'active'}`" @click="handleChange(0)">
          <image src="@/static/images/jzzjf.png" class="imgtag" />
          <text class="tagname">居住证积分</text>
        </view>
        <view :class="`item ${active==1&&'active'}`" @click="handleChange(1)">
          <image src="@/static/images/jzh.png" class="imgtag" />
          <text class="tagname">居转户</text>
        </view>
        <view :class="`item ${active==2&&'active'}`" @click="handleChange(2)">
          <image src="@/static/images/rcyj.png" class="imgtag" />
          <text class="tagname">人才引进</text>
        </view>
        <view :class="`item ${active==3&&'active'}`" @click="handleChange(3)">
          <image src="@/static/images/lhtk.png" class="imgtag" />
          <text class="tagname">投靠落户</text>
        </view>
        <view :class="`item ${active==4&&'active'}`" @click="handleChange(4)">
          <image src="@/static/images/lxs.png" class="imgtag" />
          <text class="tagname">留学生</text>
        </view>
        <view :class="`item ${active==5&&'active'}`" @click="handleChange(5)">
          <image src="@/static/images/alfx.png" class="imgtag" />
          <text class="tagname">案例分享</text>
        </view>
      </view>
    </view>
    <view class="listcontent">
      <!-- 第一条 -->
      <template v-if="newList.length>0">
        <view class="list1">
          <image class="img" src="@/static/images/pic.jpeg" />
          <text class="title">{{newList[0].title}}</text>
          <view class="time">
            <text>
              <image src="@/static/images/view.png" class="view" /> {{newList[0].readNum}}
            </text>
            <text>{{newList[0].time}}</text>
          </view>
        </view>
      </template>
      <!-- 第+1条 -->
      <template v-if="newList.length>1">
        <view class="list" v-for="list in newList" :key="list.id">
          <view class="left">
            <text class="title">{{list.title}}</text>
            <view class="time">
              <text class="num">
                <image src="@/static/images/view.png" class="view" /> {{list.readNum}}
              </text>
              <text>{{list.time}}</text>
            </view>
          </view>
          <image class="rightImg" src="@/static/images/pic.jpeg" />
        </view>
      </template>
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
  active: number,
  newList: Array<any>
} = reactive({
  // 响应式数据
  active: 0,
  newList: [{
    id: 12,
    title: "1上海落户的排队时怎么个排法？ 分数线时社保和个税吗？",
    readNum: 1,
    time: "2022-12-2",
    img: "@/static/images/pic.jpeg"
  },
  {
    id: 13,
    title: "2上海落户的排队时怎么个排法？ 分数线时社保和个税吗？",
    readNum: 123,
    time: "2022-12-2",
    img: "@/static/images/pic.jpeg"
  },
  {
    id: 14,
    title: "3上海落户的排队时怎么个排法？ 分数线时社保和个税吗？",
    readNum: 311,
    time: "2022-12-2",
    img: "@/static/images/pic.jpeg"
  }
  ]
});
const { active, newList } = toRefs(state);
function handleChange(val: number) {
  state.active = val
}
function search() {

}

</script>


<style lang="scss" scoped>
.headContent {
  background: url('../../static/images/top_bg_shanghai.png') no-repeat top center;
  width: 100%;
  height: 700rpx;
  background-size: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bgimg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 768rpx;
    display: inline-block;
  }

  .search {
    margin: 28rpx 0 140rpx 0;
    position: absolute;
    z-index: 2;
    width: 652rpx;
  }
}

.view {
  width: 28rpx;
  height: 18rpx;
  margin-right: 4rpx;
}


.itemWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 652rpx;
  background: white;
  margin: 0 auto;
  border-radius: 30px;
  padding: 40rpx;
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  bottom: -80rpx;

  .active {
    background: #E7E7E7;
    border-radius: 22px;
  }

  .item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 160rpx;
    height: 180rpx;

    .imgtag {
      width: 100rpx;
      height: 100rpx;
      display: inline-block;
    }

    .tagname {
      font-family: MicrosoftYaHei;
      font-size: 20rpx;
      color: #01000D;
      text-align: center;
      font-weight: 400;
    }

  }
}

.listcontent {
  width: 652rpx;
  margin: 0 auto;
  padding-bottom: 180rpx;
}

.list1 {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1rpx solid rgba(198, 197, 197, 1);
  padding: 10rpx 0;

  .title {
    font-family: MicrosoftYaHei;
    font-size: 28rpx;
    color: #000000;
    margin: 10rpx 0;
  }

  .img {
    width: 652rpx;
    display: inline-block;
    height: 380rpx;
  }

  .time {
    font-family: MicrosoftYaHei;
    font-size: 18rpx;
    color: #C6C5C5;
    letter-spacing: 0;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
}



.list {
  display: flex;
  border-bottom: 1rpx solid rgba(198, 197, 197, 1);
  padding: 10rpx 0;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  .title {
    font-family: MicrosoftYaHei;
    font-size: 28rpx;
    color: #000000;
    margin: 10rpx 0;
    width: 420rpx;
    height: 85rpx;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .time {
    font-family: MicrosoftYaHei;
    font-size: 18rpx;
    color: #C6C5C5;
    letter-spacing: 0;
    font-weight: 400;
    display: flex;
  }

  .rightImg {
    width: 152rpx;
    height: 144rpx;
    display: inline-block;

  }

  .num {
    width: 100rpx;
    margin-right: 100rpx;
  }
}
</style>
