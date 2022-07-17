<template>
  <div class="box">
    <p class="yun">{{ text }}</p>
    <input
      v-model="loginForm.peerId"
      :placeholder="placeholder_id"
      maxlength="10"
      class="inp1"
      @focus="get_id()"
      @blur="lose_id()"
    />
    <input
      v-model="loginForm.vertifyCode"
      :placeholder="placeholder_verification"
      maxlength="4"
      class="inp2"
      @focus="get_y()"
      @blur="lose_y()"
    />
    <el-button class="btn" @click="login()" v-if="bang_t">绑定</el-button>
    <el-button type="primary" class="btn" :loading="true" v-else
      >绑定中</el-button
    >
    <img src="./image/tu5.png" alt="" class="tu1" />
    <img src="./image/tu6.png" alt="" class="tu2" />
    <a href="https://www.google.cn/chrome/" class="link"
      >建议使用Chrome浏览器，去下载</a
    >
    <img src="./image/tu7.png" alt="" class="tu3" />
    <span class="version">中控web端版本号{{ version }}</span>
  </div>
</template>
<script>
import $ from "jquery";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        cmdCode: "bind",
        peerId: "",
        vertifyCode: "",
      },
      version: "1.1.0",
      placeholder_id: "视讯号",
      placeholder_verification: "验证码",

      text: "先锋视讯云中控后台",

      bang_t: true,

      timer: null, //关于绑定按钮的定时器
    };
  },

  mounted() {
    let brush = localStorage.getItem("brush");

    if (brush == 1) {
      localStorage.setItem("brush", 0);
      window.location.reload();
    }

    this.$keyBoard(this);

    switch (_WebSocket.edition) {
      case 1:
        this.text = "先锋视讯云中控后台";
        break;
      case 2:
        this.text = "视讯云中控后台";
        break;
      case 3:
        this.text = "微盛网中控后台";
        break;
    }

    sessionStorage.clear();
    if (this.ws) {
      this.ws.close();
    }
  },

  methods: {
    //回车触发登陆事件
    keydown() {
      if (this.$route.path == "/login") {
        this.login();
      }
    },

    get_id() {
      this.placeholder_id = "";
    },
    lose_id() {
      this.placeholder_id = "请输入视讯号";
    },
    get_y() {
      this.placeholder_verification = "";
    },
    lose_y() {
      this.placeholder_verification = "请输入验证码";
    },

    loginCallback(data) {
      if (data.result == 0) {
        this.ws.delEvent("bind");
        clearTimeout(this.timer);
        var timestamp = new Date().getTime();

        this.$store.dispatch("set_launch", timestamp);

        this.ws.setIntervalEstablish(); //小宋自己封装的方法

        localStorage.setItem("brush", 1);

        window.sessionStorage.setItem("binderId", data.binderId);
        window.sessionStorage.setItem("peerId", data.peerId);
        window.sessionStorage.setItem("token", data.token);

        window.sessionStorage.setItem("log", JSON.stringify(data));

        document.cookie = "token  =" + data.token + ";";

        this.$store.dispatch("ste_strike", data.token);

        if (this.$route.path == "/login") {
          this.$router.push("/overall/one");
          this.$store.dispatch("set_Refresh", 1); //页面刷新
        }
      }
    },
    login() {
      let _this = this;
      window.sessionStorage.setItem("id", this.loginForm.peerId);
      window.sessionStorage.setItem("code", this.loginForm.vertifyCode);
      if (this.loginForm.peerId.length < 8 || this.loginForm.vertifyCode < 4) {
        this.open1();
        _this.ws.close();
        _this.ws.delEvent("bind");
      } else {
        var query = $.param(this.loginForm);
        window.sessionStorage.setItem("peerId", this.loginForm.peerId);

        _this.ws.initWs("?" + query);
        _this.ws.addEvent("bind", null, this.loginCallback);
        this.bang_t = false;
        this.timer = setTimeout((res) => {
          this.bang_t = true;
          this.openVn();
        }, 5000);
      }
    },
    open1() {
      this.$message("账号或密码不对哦");
    },

    openVn() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [
          h("span", null, "绑定失败 "),
          h("i", { style: "color: teal" }, "请重新绑定"),
        ]),
      });
    },
  },

  computed: {
    ...mapGetters({
      Refresh: "get_Refresh",
    }),
  },
};
</script>
<style lang="less" scoped>
.box {
  // width: 1900px;
  height: 1080px;
  width: 100%;
  // height: 100%;

  background: url(./image/tu4.png);
  background-size: 1920px 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.yun {
  // width: 432px;
  height: 46px;
  font-size: 48px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  margin-top: 272px;
}
.inp1 {
  width: 700px;
  height: 82px;
  border-radius: 5px;
  margin-top: 76px;
  font-size: 30px;
  border: none;
  outline: none;
  text-indent: 3em;
  color: #8b8b8b;
}
.inp2 {
  width: 700px;
  height: 82px;
  border-radius: 5px;
  margin-top: 47px;
  font-size: 30px;
  border: none;
  outline: none;
  text-indent: 3em;
  color: #8b8b8b;
}
.btn {
  width: 316px;
  height: 84px;
  background: #2b8ff3;
  border-radius: 10px;
  font-size: 36px;
  color: #ffffff;
  margin-top: 93px;
  border: none;
}
.tu1 {
  width: 26px;
  height: 26px;
  position: absolute;
  left: 647px;
  top: 423px;
}
.tu2 {
  width: 26px;
  height: 26px;
  position: absolute;
  left: 646px;
  top: 554px;
}
.tu3 {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 52px;
  top: 1008px;
}
.link {
  height: 31px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  text-decoration: underline;
  color: #ffffff;
  position: absolute;
  left: 97px;
  top: 1005px;
}
.version {
  // width: 338px;
  height: 24px;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  left: 1540px;
  top: 1013px;
}
</style>
