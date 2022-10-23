import { createSSRApp } from "vue";
import App from "./App.vue";
import MyDialog from '@/components/login.vue';
export function createApp() {
  const app = createSSRApp(App);
  app.component("MyDialog", MyDialog)
  return {
    app,
  };
}
