<template>

    <view class="detail">
        <view class="headtop">
            <view class="title">{{detail.titile}}</view>
            <view class="time">
                <view>
                    <image src="@/static/images/view.png" class="view" /> {{detail.readingAmount}}
                </view>
                <view>{{detail.updateTime}}</view>
            </view>
        </view>
        <view class="richtext">
            <rich-text :nodes="detail.infoContent"></rich-text>
        </view>

    </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { queryById } from "@/api/index";

let state: { detail: any } = reactive({ // 响应式数据
    detail: {}
})
const { detail } = toRefs(state);

async function getDetail() {
    queryById({
        id: useRoute().query.id,
    }).then(res => {
        if (res.code == 200) {
            state.detail = res.result
        }
    })
}

getDetail()

</script>

<style lang="scss" scoped>
.detail {
    padding: 0 40rpx 40rpx 40rpx;
    width: 100%;
    box-sizing: border-box;
}

.headtop {
    padding: 30rpx 0 10rpx 0;
    border-bottom: 1rpx solid #ccc;
    margin-bottom: 20rpx;
}

.title {
    text-align: center;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.time {
    display: flex;
    justify-content: space-between;
    color: #ccc;
    font-size: 24rpx;
}

.view {
    width: 28rpx;
    height: 18rpx;
    margin-right: 4rpx;
}

.richtext {
    img {
        max-width: 100%;
    }
}
</style>

    