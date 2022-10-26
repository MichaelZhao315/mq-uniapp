<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
page {
  background-color: #F8F9FA
}

uni-page-head {
  display: none;
}

.wx-checkbox-input-checked,
.wx-radio-input-checked,
.wx-switch-input-checked {
  background-color: #007aff !important;
  border-color: #007aff !important;
  color: #fff !important;
}
</style>
