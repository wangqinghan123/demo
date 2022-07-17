import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import less from "less";
import router from "./router";
import store from "./store/index";

import "default-passive-events";

import Throw from "./api/index";
import ws from "./dispacher";

import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);

Vue.prototype.$Throw = Throw;
Vue.prototype.ws = ws;

Vue.use(less);
Vue.config.productionTip = false;
Vue.use(ElementUI);

import "./config/rem";
Vue.filter("msgFormat", function(msg) {
  let arr = msg.toString();

  let y = arr.substring(0, 3);
  let e = arr.substring(3, 6);
  let s = arr.substring(6, arr.length);
  let newArr = "";
  newArr += y;
  newArr += "  ";
  newArr += e;
  newArr += "  ";
  newArr += s;
  return newArr;
});

Vue.prototype.bus = new Vue();

Vue.prototype.$keyBoard = function(vm) {
  document.onkeydown = function() {
    let key = window.event.keyCode; //keyCode键盘码值
    //当按下键盘1时，执行有参函数keydown(1, 0),这里的函数keydown按自己的需求更改
    if (key == 13) {
      //1 ->键盘按键 1
      vm.keydown(1, 0); //keydown是自定义方法。按键触发
    }
  };
};

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
