<template>
  <div class="gather">
    <div class="set">
      <div id="top">
        <span class="f1">设置</span>
        <img src="../image/tu5.png" alt="" class="t1" />
        <a href="javascript:void(0);" class="f2" @click="establish">召开</a>
        <img src="../image/tu6.png" alt="" class="t2" />
        <a href="javascript:void(0);" class="f3" @click="yu()">预约</a>
        <input
          type="text"
          class="inp1"
          v-model="social"
          placeholder="请输入会议号"
        />

        <el-button class="btn" @click="btn_join">加入</el-button>
      </div>
      <div class="bottom">
        <div class="head">
          <el-button
            @click="mo()"
            :class="{ 'el-button1': is1, 'el-button2': is2 }"
            >模式设置</el-button
          >

          <el-button
            @click="yun()"
            :class="{ 'el-button1': is2, 'el-button2': is1 }"
            >云端录制</el-button
          >
        </div>
        <div class="chu">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <transition name="fade">
      <order v-show="show"></order>
    </transition>
    <transition name="fade">
      <subscribe v-show="show1"></subscribe>
    </transition>
  </div>
</template>
<script>
import order from "./order/order.vue"; //预约选择日期的页面

import subscribe from "./subscribe/subscribe.vue"; //选择日期页面后选择人员的页面
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      social: "", //搜索会议号码
      is1: true, //切换按钮的背景色
      is2: false, //切换按钮的背景色

      show: false, //关于预约日期的弹框
      show1: false, //关于预约日期后点击选择人员的页面

      hosttype: "", //设备信息

      //---------防止李征疯狂点击--------
      flag_1: true,
      flag_2: true,
    };
  },
  components: {
    order,
    subscribe,
  },

  methods: {
    show1_s(value) {
      if (this.show) {
        this.show = value;
      } else {
        this.show = true;
      }
    },
    show2_s(value) {
      this.show1 = value;
    },
    //------------关于创建会议--------------------------
    establish() {
      //召开创建会议并且加入
      this.openFullScreen2();

      setTimeout(() => {
        this.loading.close();
      }, 10000);
      if (this.flag_1) {
        let p = {
          roomType: "immediate",
          mediaType: "video",
          roomMode: "manage",
          title: this.hosttype.hosttype + "的会议",
        };
        this.$Throw.found(p).then((res) => {
          let parameter = {
            cmdCode: "joinRoom",
            peerId: this.log.peerId,
            binderId: this.log.binderId,
            roomId: res.data.data.roomId,
          };
          this.ws.sendMsg(parameter, null, this.join_S);
          this.flag_1 = false;
        });
        setTimeout(() => {
          this.flag_1 = true;
        }, 1500);
      }
    },

    btn_join() {
      //搜索框的加入
      this.openFullScreen2();

      setTimeout(() => {
        this.loading.close();
      }, 10000);
      if (this.flag_2) {
        this.$Throw.inquire({}, this.social).then((res) => {
          if (res.data.code != -1) {
            let parameter = {
              cmdCode: "joinRoom",
              peerId: this.log.peerId,
              binderId: this.log.binderId,
              roomId: this.social,
            };
            this.ws.sendMsg(parameter, null, this.join_S);
            this.flag_2 = false;
          } else {
            this.open();
          }
        });
      }
      setTimeout(() => {
        this.flag_2 = true;
      }, 1500);
    },

    join_S(e) {
      if (e.result == 0) {
        let parameter101 = {
          cmdCode: "getRoomInfo", //获取最新会议信息
          peerId: window.sessionStorage.getItem("peerId"),
          binderId: window.sessionStorage.getItem("binderId"),
        };
        this.ws.sendMsg(parameter101, null, this.reconnection);
        setTimeout(() => {
          this.loading.close();
        }, 10000);
      } else {
        this.loading.close();
        this.open();
      }
    },
    reconnection(e) {
      if (e.result == 0) {
        this.$router.push("/home");
        this.loading.close();
        this.$store.dispatch("set_join", e); //得到最新的结果
        this.$store.dispatch("set_roomMode", e.meeting.roomMode);
      }
    },

    openFullScreen2() {
      //遮罩层
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // setTimeout(() => {

      // }, 2000);
    },

    //-----------------------------------

    open() {
      this.$message({
        message: "会议号，错误哦！",
        type: "warning",
        offset: 800,
      });
    },

    yu() {
      //点击进入预约会议
      this.show = true;
    },
    tui(value) {
      //子组件触发父组件的事件
      this.show = value;
    },
    mo() {
      //模式设置
      let url = this.$route.path;
      if (url != "/overall/set/pattern") {
        this.$router.push("/overall/set/pattern");
        this.is1 = true;
        this.is2 = false;
      }
    },
    yun() {
      //云端
      let url = this.$route.path;
      if (url != "/overall/set/cloud") {
        this.$router.push("/overall/set/cloud");
        this.is2 = true;
        this.is1 = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
      sign: "get_sign",
      automatic: "get_automatic", //自应答
    }),
  },
  watch: {
    automatic: {
      deep: true,
      handler: function (newV, oldV) {
        this.hosttype = newV;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-switch__core {
  width: 60px !important;
}

#top {
  width: 100%;
  height: 110px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  .f1 {
    width: 138px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-left: 50px;
  }
  .t1 {
    width: 36px;
    height: 30px;
    margin-left: 750px;
  }
  .f2 {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-left: 14px;
  }
  .f3 {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-left: 10px;
  }
  .t2 {
    width: 34px;
    height: 34px;
    margin-left: 42px;
  }
  .inp1 {
    width: 295px;
    height: 50px;
    background: rgba(2, 179, 252, 0);
    border: 1px solid #c4c4c4;
    border-radius: 25px;
    outline: none;
    text-indent: 2em;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    margin-left: 48px;
  }
  .btn {
    width: 94px;
    height: 50px;
    background: #2d97e1;
    border-radius: 5px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding: 0;
    margin-left: 14px;
  }
}

a {
  text-decoration: none;
}
.set {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom {
  width: 1704px;
  height: 899px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  margin-top: 24px;
  .head {
    width: 100%;
    height: 115px;
    display: flex;
    align-items: center;
    .el-button {
      width: 216px;
      height: 63px;
      border-radius: 5px;
      margin-left: 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
    }
    .el-button1 {
      width: 216px;
      height: 63px;
      border-radius: 5px;
      margin-left: 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      background: #2d97e1;
      color: #fff;
    }
    .el-button2 {
      width: 216px;
      height: 63px;
      border-radius: 5px;
      margin-left: 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000;
    }
  }
  .chu {
    width: 100%;
    height: 783.5px;
  }
}
</style>