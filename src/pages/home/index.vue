<template>
  <view class="content">
    <!-- head -->
    <view class="headContent">
      <!-- <image src="@/static/images/top_bg_shanghai.png" class="bgimg" />
      <image src="@/static/images/top_bg_mask.png" class="bgimg" /> -->
      <swiper class="swiper bgimg" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
        <swiper-item v-for="item in banner" :key="item.id">
          <view class="swiper-item uni-bg-red">
            <image :src="item.mobileImgUrl" class="bgimg" />
          </view>
        </swiper-item>
      </swiper>
      <uni-nav-bar title="名企—上海落户通" color="white" :border="false" backgroundColor="transparent" class="navbar">
      </uni-nav-bar>
      <view class="search">
        <uni-search-bar class="uni-mt-10" radius="100" placeholder="输入搜索内容" clearButton="none" cancelButton="none"
          @confirm="search" />
      </view>
      <view class="itemWrap">
        <view :class="`item ${active==index&&'active'}`" @click="handleChange(index,item.id)"
          v-for="(item,index) in newType" :key="item.id">
          <image :src="item.typeIcon" class="imgtag" />
          <text class="tagname">{{item.typeName}}</text>
        </view>
      </view>
    </view>
    <view class="listcontent">
      <!-- 第一条 -->
      <template v-if="newList.length>0">
        <view class="list1" @click="toDetailFun(newList[0].id)">
          <image class="img" :src="newList[0].infoPicUrl" />
          <text class="title">{{newList[0].titile}}</text>
          <view class="time">
            <view>
              <image src="@/static/images/view.png" class="view" /> {{newList[0].readingAmount}}
            </view>
            <text>{{newList[0].createTime}}</text>
          </view>
        </view>
      </template>
      <!-- 第+1条 -->
      <template v-if="newList.length>1">
        <view class="list" v-for="list in newList" :key="list.id" @click="toDetailFun(list.id)">
          <view class="left">
            <text class="title">{{list.titile}}</text>
            <view class="time">
              <view class="num">
                <image src="@/static/images/view.png" class="view" /> {{list.readingAmount}}
              </view>
              <text>{{list.createTime}}</text>
            </view>
          </view>
          <image class="rightImg" :src="newList[0].infoPicUrl" />
        </view>
      </template>
      <uni-load-more :status="load" :class="newList.length<=0&&'load'"></uni-load-more>
    </view>
    <!-- <onlineChat /> -->
    <phone />
    <!-- <MyDialog ref="confirmPopup"> </MyDialog> -->
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, getCurrentInstance } from 'vue'
import {
  onReachBottom, onReady
} from '@dcloudio/uni-app';
import { getBanner, getNewsType, getNewsInfo } from "@/api/index";
import { resultDataInterface } from './index';
import phone from "@/components/phone.vue";
// import onlineChat from "@/components/onlineChat.vue";
const state: {
  active: number,
  newList: Array<any>,
  newType: Array<any>,
  banner: Array<any>,
  infoType: string,
  load: string,
  content: string,
  page: {
    pageSize: number,
    pageNum: number,
    total: number,
  },
} = reactive({
  // 响应式数据
  active: 0,
  infoType: '',
  newList: [],
  newType: [],
  banner: [],
  load: "nomore",
  content: "",
  page: {
    pageSize: 10,
    pageNum: 1,
    total: 0,
  },

});
const { active, newList, newType, banner, load } = toRefs(state);


onReady(() => {
  // const confirmPopup: any = ref(null);
  // confirmPopup.value.alertDialogShowFunc(true);
})


onReachBottom(() => {
  state.page.pageNum++;
  let data = {
    infoType: state.infoType,
    infoContent: state.content ? state.content : ""
  }
  state.load = "loading";
  getNewsInfo(data).then((res: resultDataInterface) => {
    if (res.code == 200) {
      state.page.total = res.result.total;
      if (res.result.current >= res.result.pages) {
        state.load = "nomore"
      } else {
        state.newList = [...state.newList, ...res.result.records];
        state.load = "more"
      }
    }
  });
})
getTabsListFn()
getBannerFn()
//详情
function toDetailFun(id: string): void {
  uni.navigateTo({
    url: '/pages/newDetail/index?id=' + id
  });
}

//获取分类
async function getTabsListFn() {
  const res = await getNewsType()
  if (res.code == 200) {
    state.newType = res.result
    const data = {
      infoType: res.result[0].id,
      infoContent: ""
    }
    getNewsFn(data)
  }
}


//获取资讯
async function getNewsFn(data: object) {
  const res = await getNewsInfo(data)
  if (res.code == 200) {
    state.newList = res.result.records
  }
}
//banner图
async function getBannerFn() {
  const res = await getBanner()
  if (res.code == 200) {
    state.banner = res.result
  }
}


//搜索
function search(res: { value: any; }) {
  state.content = res.value
  const data = {
    infoContent: res.value,
    infoType: ""
  }
  getNewsFn(data)
}

//切换分类
function handleChange(val: number, infoType: string) {
  state.active = val
  state.infoType = infoType
  const data = {
    infoType: infoType,
    infoContent: ""
  }
  getNewsFn(data)
}


</script>

<style lang="scss" scoped>
.headContent {
  width: 100%;
  height: 700rpx;
  background-size: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .navbar {
    font-family: MicrosoftYaHei;
    font-size: 32rpx;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    position: relative;
    margin-top: 32rpx;
  }

  .bgimg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 768rpx;
    display: inline-block;
  }

  .search {
    margin: 0 0 140rpx 0;
    position: relative;
    z-index: 2;
    width: 652rpx;
  }
}

.view {
  width: 28rpx;
  height: 18rpx;
  margin-right: 4rpx;
}

.load {
  margin-top: 70rpx;
}

.itemWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 652rpx;
  background: white;
  margin: 130rpx auto 0 auto;
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
  border-bottom: 1rpx solid #ccc;
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
  border-bottom: 1rpx solid #ccc;
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
