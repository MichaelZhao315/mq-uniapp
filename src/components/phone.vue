<template>
    <view class="content">
        <image src="@/static/images/24h.png" class="phone" @click="call()" />
        <uni-popup ref="alertDialog" type="dialog" class="dialogPup" :mask-click="false">
            <uni-popup-dialog type="info" cancelText="取消" :before-close="true" confirmText="确认" title="留言"
                @confirm="dialogConfirm" @close="dialogClose">
                <view class="popup-content">
                    <uni-forms ref="baseForm" :rules="rules" :modelValue="baseFormData">
                        <uni-forms-item label="姓名" required name="realname">
                            <uni-easyinput v-model="baseFormData.realname" placeholder="请输入姓名" />
                        </uni-forms-item>
                        <uni-forms-item label="电话" required name="phoneno">
                            <uni-easyinput v-model="baseFormData.phoneno" placeholder="请输入电话" type="number" />
                        </uni-forms-item>
                        <uni-forms-item label="留言">
                            <uni-easyinput type="textarea" v-model="baseFormData.basicDescription"
                                placeholder="请输入留言" />
                        </uni-forms-item>
                    </uni-forms>
                    <view class="tip">温馨提示：</view>
                    <view class="tipContent">由于是非工作时间，请留下您的联系方式，我们会上班后第一时间联系您</view>
                </view>
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>
    
<script setup lang="ts">
import { reactive, toRefs, ref, nextTick } from 'vue'
import { mqCompanyAddress, addNewContact } from "@/api/index";

const state: {
    workTime: boolean,
    address: {
        companyAddress: string,
        companyName: string,
        companyPicUrl: string,
        createBy: string,
        createTime: string,
        id: string,
        incharge: string,
        phoneno: string,
        sysOrgCode: string,
        updateBy: string,
        updateTime: string,
        workBeginTime: string,
        workDayType: string,
        workEndTime: string
    },
    baseFormData: {
        realname: string,
        phoneno: number | undefined,
        basicDescription: string
    },
    rules: any
} = reactive({
    address: {
        companyAddress: '',
        companyName: '',
        companyPicUrl: '',
        createBy: '',
        createTime: '',
        id: '',
        incharge: '',
        phoneno: '',
        sysOrgCode: '',
        updateBy: '',
        updateTime: '',
        workBeginTime: '',
        workDayType: '',
        workEndTime: ''
    },
    baseFormData: {
        realname: "",
        phoneno: undefined,
        basicDescription: ""
    },
    workTime: false,
    rules: {
        realname: {
            rules: [{
                required: true,
                errorMessage: '姓名不能为空'
            }]
        },
        phoneno: {
            rules: [{
                required: true,
                errorMessage: '电话号码不能为空'
            }, {
                format: 'number',
                errorMessage: '电话号码只能输入数字'
            }]
        }
    },
})

const { baseFormData, rules } = toRefs(state);
const alertDialog = ref<any>(null);
const baseForm = ref<any>(null)
async function getLocationFn() {
    const res = await mqCompanyAddress()
    if (res.code == 200) {
        state.address = res.result[0]
    }
}
getLocationFn()

function call() {
    if (checkWorkDate(state.address.workBeginTime, state.address.workEndTime)) {
        uni.makePhoneCall({
            phoneNumber: state.address.phoneno
        });
    } else {
        alertDialog.value.open()
    }
}
function checkWorkDate(startTime: string, endTime: string) {
    let date = new Date();
    let hoursMinutes = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes).padStart(2, '0') + ':00';
    let days = date.getDay();
    if (days >= 1 && days <= 5 && hoursMinutes >= startTime && hoursMinutes <= endTime) {
        return true;
    } else {
        return false;
    }
}
function dialogClose() {
    alertDialog.value.close()
}
function dialogConfirm() {
    const data = state.baseFormData
    // nextTick(() => {
    baseForm?.value?.validate().then((res: any) => {
        addNewContact(data).then(res => {
            if (res.code == 200) {
                uni.showToast({
                    title: '提交成功!',
                    duration: 2000
                });
                alertDialog.value.close()
            }
        })
    }).catch((err: any) => {
        console.log('err', err);
    })
    // })


}
</script>
<style lang="scss" scoped>
.phone {
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    right: 0;
    bottom: 15%;
    z-index: 3;
}

.tip {
    color: #004751;
    font-size: 24rpx;
}

.tipContent {
    font-size: 24rpx;
    color: #666;
}
</style>
  
    
   
    