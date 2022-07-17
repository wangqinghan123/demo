<template>
  <div class="box_qqq">
    <div class="bei_q"></div>
    <div class="content">
      <div class="one">
        <p class="p1">
          <img src="../image/cha(2).png" alt="" @click="tui_q" />
        </p>
        <p class="p2">
          <img src="../image/gantanhao.png" alt="" /><span>是否确认退出？</span>
        </p>
        <p class="p3">
          <el-button type="primary" @click="tui_que">确认</el-button
          ><el-button type="info" @click="tui_qu">取消</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    tui_q() {
      //触发复方法，关闭
      this.$parent.quit(false);
    },
    tui_que() {
      let parameter4 = {
        cmdCode: "exitRoom",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
      };
      this.ws.sendMsg(parameter4, null, this.tui_que_s);
    },
    tui_que_s(e) {
      if (e.result == 0) {
        this.$router.push("/overall/one"); //-----俩res-------
        this.$store.dispatch("set_hands", 0);
        this.$store.dispatch("set_make", 0);
      }
    },
    tui_qu() {
      this.tui_q();
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
.box_qqq {
  width: 1920px;
  height: 1080px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  .bei_q {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.78;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    .one {
      width: 695px;
      height: 389px;
      background: #ffffff;
      box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      z-index: 100;
      .p1 {
        width: 100%;
        height: 28px;
        display: flex;
        justify-content: right;
        align-items: center;
        margin-top: 38px;
        img {
          width: 28px;
          height: 28px;
          margin-right: 38px;
        }
      }
      .p2 {
        width: 100%;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        img {
          width: 52px;
          height: 52px;
          margin-right: 9px;
        }
        span {
          height: 52px;
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          margin-left: 9px;
        }
      }
      .p3 {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
        .el-button {
          width: 179px;
          height: 70px;
          border-radius: 5px;
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          margin-right: 43px;
          margin-left: 43px;
        }
      }
    }
  }
}
</style>