<template>
  <div class="isEnd">
    <div class="bei"></div>
    <div class="content">
      <img src="../image/cah(0.0).png" alt="" class="a" @click="tui()" />
      <div class="b">
        <img src="../image/gantanhao.png" alt="" class="ba" />
        <span class="bb">是否结束录制？</span>
      </div>
      <div class="c">
        <button class="ca" @click="que()">确定</button
        ><button class="cb" @click="tui()">取消</button>
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
    };
  },
  methods: {
    tui() {
      this.$parent.isEnd(false);
    },
    que() {
      let parameter3 = {
        cmdCode: "recordMeeting",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        destPeerId: this.ziji.peerId,
        operateType: 2,
      };
      this.ws.sendMsg(parameter3, null, this.transcribe);
    },
    transcribe(e) {
      if (e.result == 0) {
        this.tui();
        this.$parent.endRecord();
      }
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
      roomMode: "get_roomMode", //会议模式
      ju_ren: "get_ju_ren", //举手人员
      isEmcee: "getIsEmcee", //是不是主持人
      flag: "get_flag", //转授主持人，依然得到通知，用来区别；
      consent: "get_consent", //关于举手
      make: "get_make", //发言_length
      meetingTime: "get_meetingTime",
    }),
  },
};
</script>
<style lang="less" scoped>
.isEnd {
  width: 1920px;
  height: 1080px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  .bei {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.78;
    position: absolute;
    left: 0;
    top: 0;
  }
  .content {
    width: 695px;
    height: 389px;
    background: #ffffff;
    box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -347.5px;
    margin-top: -194.5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .a {
      width: 28px;
      height: 28px;
      margin-left: 630px;
      margin-top: 20px;
    }
    .b {
      width: 350px;
      height: 50px;
      display: flex;
      margin-left: 20px;
      margin-top: 50px;

      .ba {
        width: 52px;
        height: 52px;
      }
      .bb {
        width: 287px;
        height: 32px;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        margin-left: 10px;
      }
    }
    .c {
      width: 100%;
      height: 80px;
      margin-top: 100px;
      display: flex;
      align-items: center;
      .ca {
        width: 179px;
        height: 70px;
        background: #2d97e1;
        border-radius: 5px;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        border: none;
        margin-left: 130px;
      }
      .cb {
        width: 179px;
        height: 70px;
        background: #d7d7d7;
        border-radius: 5px;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        border: none;
        margin-left: 87px;
      }
    }
  }
}
</style>