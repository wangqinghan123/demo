<template>
  <div id="box_zd">
    <router-view></router-view>
  </div>
</template>
<script>
import $ from "jquery";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      time_app: 0, //定时器
      num: null,
      time8: 5000, //接受disipath传过来的时间
    };
  },
  mounted() {
    let kk = document.querySelectorAll("link");

    switch (_WebSocket.edition) {
      case 1:
        kk[0].href = "favicon.ico";
        break;
      case 2:
        kk[0].href = "favicon1.ico";
        break;
      case 3:
        kk[0].href = "favicon1.ico";
        break;
    }

    if (this.$route.name != "login") {
      var timestamp = new Date().getTime();

      this.$store.dispatch("set_launch", timestamp); //为了侦听定时器；

      this.ws.setIntervalEstablish(); //小宋自己封装的方法（启动ws的方法，去启动定时器，此定时器为了检测倒计时，）
    }
    let that = this;
    // window.addEventListener("online", function () {
    //   alert("网络连接了");
    // });
    window.addEventListener("offline", function () {
      //断网关闭；
      that.ws.onclose();
      that.open4();
    });

    this.ws.addEvent("unbind", null, this.unbind_T); //后端检测到断开；

    this.ws.addEvent("showToast", null, this.showData); //清除peerid

    window.onload = function (e) {
      var peerId = window.sessionStorage.getItem("peerId");
      let binderId = window.sessionStorage.getItem("binderId");
      if (peerId && binderId) {
        that.ws.initWs("?" + $.param({ peerId, binderId }));
        that.ws.addEvent("bind", null, that.loginCallback);
      }
      let message = "some word";
      e = e || window.event;
      if (e) {
        e.returnValue = message;
      }
      return;
    };
  },

  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  computed: {
    ...mapGetters({
      strike: "get_strike",
      join: "getJoin",
      launch: "get_launch",
    }),
  },
  methods: {
    //关于浏览器的高度
    //-检测心跳-bg(只提供弹窗)
    HeartTip() {
      this.time_app = setInterval(() => {
        this.num = this.ws.hint().split(",");

        this.time8 = this.num[1] * 1;

        // console.log(this.num);

        if (this.num[0] * 1 < 2) {
          if (this.$route.path != "/login") {
            this.open_she();
            if (this.num[0] * 1 == 0) {
              clearInterval(this.time_app);

              // console.log(1223);
              var a = 10;
            }
          }
          //判断心跳
        }
      }, this.time8);
    },
    //-检测心跳-end
    open4() {
      this.$message.error("网络断开连接，请检查网络。");
    },

    open_she() {
      this.$message.error("终端网络连接不稳定...");
    },

    unbind_T(e) {
      if (e.result == 0) {
        alert(e.errorMsg, "App页面收到解绑");
        sessionStorage.clear();
        this.ws.onclose();
        this.$router.push("/login");
      }
    },

    showData(data) {
      console.log("App页面的 终端（设备）收到showToast", data);
      this.$message({
        message: data.showMsg,
        type: "warning",
      });
    },
    reconnection(e) {
      this.$store.dispatch("set_join", e);
    },
    loginCallback(data) {
      if (data.result == 0) {
        let to = window.sessionStorage.getItem("to");

        if (to == "home") {
          let parameter = {
            cmdCode: "getRoomInfo",
            peerId: window.sessionStorage.getItem("peerId"),
            binderId: window.sessionStorage.getItem("binderId"),
          };
          this.ws.sendMsg(parameter, null, this.reconnection);
        } else {
          this.$router.push("/overuse"); //过度组件
        }
      }
    },
  },
  watch: {
    strike: {
      deep: true,
      handler: function (newV, oldV) {
        setInterval(() => {
          let sp = document.cookie.split("token")[1].split(";")[0];
          let token = sp.substr(1, sp.length);
          let token1 = {
            token,
          };

          this.$Throw.refresh(token1).then((res) => {
            let exp = new Date();
            exp.setTime(exp.getTime() + 3600 * 1000); //过期时间 1小时
            document.cookie =
              "token  =" +
              res.data.data +
              ";expires=" +
              exp.toUTCString() +
              ";";
          });
        }, 3500 * 1000);
      },
    },
    launch: {
      deep: true,
      handler: function (newV, oldV) {
        this.HeartTip();
      },
    },
  },
};
</script>

<style lang="less">
#box_zd {
  width: 1920px;
  height: 1080px;
  position: relative;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.tan,
.tan1 {
  cursor: default;
}
</style>
