<template>
  <div class="da">
    <div class="beijing"></div>

    <div class="quit">
      <img src="../image/tuichubeijing.png" alt="" class="tuibei" />
      <img src="../image/cha.png" alt="" class="cha" @click="touch()" />
      <div class="center">
        <div class="t1">
          <div
            class="t11"
            @mouseover.stop="r(1)"
            @mouseout.stop="c(1)"
            @click="drop()"
          >
            <img src="../image/tuichu1.png" alt="" class="b" />
            <img
              src="../image/tuichuyuan.png"
              alt=""
              class="s"
              v-show="qie.t1"
            />
          </div>
          <div class="t12"><span>退出会议</span></div>
        </div>
        <div class="t2">
          <div
            class="t21"
            @mouseover.stop="r(2)"
            @mouseout.stop="c(2)"
            @click="finish()"
          >
            <img src="../image/tuichu2.png" alt="" class="b" />
            <img
              src="../image/tuichuyuan.png"
              alt=""
              class="s"
              v-show="qie.t2"
            />
          </div>
          <div class="t22"><span>结束会议</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      loading: null,
      qie: {
        //切换图片的动画
        t1: false,
        t2: false,
      },
    };
  },
  methods: {
    touch() {
      this.$parent.quit(false); //触发父组件的事件
    },
    r(e) {
      //滑入事件
      if (e == 1) {
        this.qie = {
          t1: true,
        };
      } else {
        this.qie = {
          t2: true,
        };
      }
    },
    c(e) {
      //滑出事件
      if (e == 1) {
        this.qie = {
          t1: false,
        };
      } else {
        this.qie = {
          t2: false,
        };
      }
    },

    drop() {
      //退出
      let parameter = {
        cmdCode: "exitRoom",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        isNeedAutoJoinRoom: false,
      };
      this.ws.sendMsg(parameter, null, this.dropH);
      this.openFullScreen2();
      setTimeout(() => {
        this.loading.close();
      }, 10000);
    },
    dropH(e) {
      if (e.type == "notify") {
        if (e.result == 0) {
          this.loading.close();

          this.$router.push("/overall/one");
          this.$store.dispatch("set_hands", 0);
          this.$store.dispatch("set_make", 0);
        }
      }
    },
    finish() {
      //结束
      if (this.join.meeting.managerId == this.log.peerId) {
        let parameter = {
          cmdCode: "closeTheRoom",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
        };
        this.ws.sendMsg(parameter, null, this.finishH);
        this.openFullScreen2();
        setTimeout(() => {
          this.loading.close();
        }, 10000);
      }
    },
    finishH(e) {
      if (e.type == "notify") {
        if (e.result == 0) {
          this.loading.close();
          this.$router.push("/overall/one");

          this.$store.dispatch("set_hands", 0); //清除缓存的vuex数据
          this.$store.dispatch("set_make", 0); //清除缓存的vuex数据
        }
      }
    },

    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
    }),
  },
};
</script>
<style lang="less" scoped>
.beijing {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.75;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
.cha {
  width: 28px;
  height: 28px;
  position: absolute;
  right: 80px;
  top: 50px;
}
.quit {
  width: 1151px;
  height: 793px;

  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -575.5px;
  margin-top: -396.5px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  .tuibei {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .center {
    width: 100%;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .t1 {
      width: 270px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 244px;
      .t11 {
        width: 292px;
        height: 292px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        // background: darkblue;
        .b {
          width: 242px;
          height: 242px;
        }
        .s {
          width: 262px;
          height: 262px;
          position: absolute;
          left: 13px;
          top: -8px;
        }
      }
      .t12 {
        width: 262px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 13px;

        z-index: 10;
        // position: absolute;
        // left: 0;
        // top: 0;

        span {
          height: 28px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .t2 {
      width: 270px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 244px;
      margin-top: 30px;
      .t21 {
        width: 292px;
        height: 292px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        margin-top: -20px;
        .b {
          width: 242px;
          height: 242px;
          margin-top: -18px;
        }
        .s {
          width: 262px;
          height: 262px;
          position: absolute;
          // left: 0;
          top: 0px;
        }
      }
      .t22 {
        width: 262px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 6px;
        z-index: 10;
        span {
          height: 28px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>