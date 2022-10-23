<template>
    <view class="content">
        <image src="@/static/images/24h.png" class="phone" @click="call()" />
        <uni-popup ref="alertDialog" type="dialog" class="dialogPup">
            <uni-popup-dialog type="info" cancelText="取消" confirmText="确认" title="留言" @confirm="dialogConfirm"
                @close="dialogClose">
                <view class="popup-content">
                    <uni-forms ref="baseForm" :modelValue="baseFormData">
                        <uni-forms-item label="姓名">
                            <uni-easyinput v-model="baseFormData.realname" placeholder="请输入姓名" />
                        </uni-forms-item>
                        <uni-forms-item label="电话">
                            <uni-easyinput v-model="baseFormData.phoneno" placeholder="请输入电话" />
                        </uni-forms-item>
                        <uni-forms-item label="留言">
                            <uni-easyinput type="textarea" v-model="baseFormData.basicDescription"
                                placeholder="请输入留言" />
                        </uni-forms-item>
                    </uni-forms>
                </view>
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>
    
<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
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
        phoneno: number,
        basicDescription: string
    },
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
        phoneno: 0,
        basicDescription: ""
    },
    workTime: false
})

const { baseFormData } = toRefs(state);
const alertDialog = ref<any>(null);

async function getLocationFn() {
    const res = await mqCompanyAddress()
    if (res.code == 200) {
        state.address = res.result[0]
    }
}
getLocationFn()

function call() {
    if (!checkWorkDate(state.address.workBeginTime, state.address.workEndTime)) {
        alertDialog.value.open()
    } else {
        uni.makePhoneCall({
            phoneNumber: state.address.phoneno
        });
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
    addNewContact(data).then(res => {
        if (res.code == 200) {
            uni.showToast({
                title: '提交成功～～',
                duration: 2000
            });
        }
    })
}
</script>
<style lang="scss" scoped>
.phone {
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    right: 0;
    bottom: 200rpx;
    z-index: 3;
}

.dialogPup {}
</style>
  
    
   
    