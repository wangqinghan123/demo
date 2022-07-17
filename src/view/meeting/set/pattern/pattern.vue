<template>
  <div class="pattern">
    <p class="one">入会模式</p>
    <div class="two">
      <p class="one1">启动自动应答</p>
      <el-switch
        v-model="switch7"
        active-color="#2D97E1"
        inactive-color="#ccc"
        class="two1"
        :width="60"
        @change="changeSwitch()"
      >
      </el-switch>
    </div>
    <p class="three">开启自动应答后，收到会议邀请时可自动加入会议</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      switch7: "",
      number7: "",
    };
  },

  methods: {
    changeSwitch() {
      let parameter = {
        peerId: this.log.peerId,
        cmdCode: "setAutoJoinMeeting",
        operateType: this.number7,
        binderId: this.log.binderId,
      };
      this.ws.sendMsg(parameter, null, this.Switch_h);
    },
    Switch_h(e) {
      if (e.result == 0) {
        this.$store.dispatch("set_isauto", this.number7);
      }
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
      automatic: "get_automatic", //自应答
    }),
  },
  watch: {
    automatic: {
      deep: true,
      handler: function (newV, oldV) {
        if (newV.isAutoJoinMeeting == 1) {
          this.switch7 = true;
          this.number7 = 2;
        } else {
          this.switch7 = false;
          this.number7 = 1;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.pattern {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .one {
    height: 25px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-left: 60px;
    margin-top: 36px;
  }
  .two {
    width: 1599px;
    height: 81px;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    margin-left: 50px;
    .one1 {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      margin-left: 28px;
    }
    .two1 {
      margin-right: 34px;
    }
  }
  .three {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #555555;
    margin-left: 75.4px;
    margin-top: 23px;
  }
}
</style>