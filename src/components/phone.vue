<template>
    <view class="content" @click="call()">
        <image src="@/static/images/24h.png" class="phone" />
        <uni-popup ref="alertDialog" type="dialog" class="dialogPup">
            <uni-popup-dialog type="info" cancelText="取消" confirmText="确认" title="留言" @confirm="dialogConfirm"
                @close="dialogClose">
                <view class="popup-content">
                    <uni-forms ref="baseForm" :modelValue="baseFormData">
                        <uni-forms-item label="姓名">
                            <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
                        </uni-forms-item>
                        <uni-forms-item label="电话">
                            <uni-easyinput v-model="baseFormData.phone" placeholder="请输入电话" />
                        </uni-forms-item>
                        <uni-forms-item label="留言">
                            <uni-easyinput type="textarea" v-model="baseFormData.notice" placeholder="请输入留言" />
                        </uni-forms-item>
                    </uni-forms>
                </view>
            </uni-popup-dialog>
        </uni-popup>
    </view>
</template>
    
<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import { mqCompanyAddress } from "@/api/index";

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
        name: string,
        phone: number,
        notice: string
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
        name: "",
        phone: 0,
        notice: ""
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
    if (1) {
        alertDialog.value.open()
    } else {
        uni.makePhoneCall({
            phoneNumber: state.address.phoneno
        });
    }

}
function dialogClose() {
    alertDialog.value.close()
}
function dialogConfirm() {

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
  
    
   
    