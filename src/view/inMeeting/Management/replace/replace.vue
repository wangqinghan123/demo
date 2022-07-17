<template>
  <div class="replace">
    <p>当前发言方席位不足，需移除一个发言方</p>
    <img src="../image/cha2.png" alt="" class="cha" @click="cha" />
    <ul>
      <li
        v-for="(value, index) in Render_tihuan"
        :key="index"
        @click="jk(value)"
      >
        <img src="../image/tihuan.png" alt="" /><span class="txt">{{
          value.userName
        }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      Render_tihuan: "",
    };
  },
  mounted() {
    this.Render_tihuan = this.join.meeting.paticipators.filter((res) => {
      return res.speakStatus == 1;
    });
  },
  methods: {
    cha() {
      this.$parent.tihuan(false);
    },
    jk(e) {
      let parameter123 = {
        cmdCode: "optSpeak",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        destPeerId: e.peerId,
        operateType: 2,
      };
      this.ws.sendMsg(parameter123, null, this.assign_S);
      this.$parent.tihuan(false);

      setTimeout(() => {
        let name = JSON.parse(sessionStorage.getItem("substitution"));
        let parameter1 = {
          cmdCode: "optSpeak",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: name.peerId,
          operateType: 1,
        };
        this.ws.sendMsg(parameter1, null, this.assign_S);
      }, 2000);
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      roomMode: "get_roomMode", //会议模式
      // ziji: "getZiji",
      // roomMode: "get_roomMode",
      // ju_ren: "get_ju_ren",
      // isEmcee: "getIsEmcee",
      // flag: "get_flag",
      // consent: "get_consent",
    }),
  },
  watch: {
    "join.meeting.paticipators": {
      deep: true,

      handler: function (newV, oldV) {
        // if (this.Render_tihuan.length < 6) {
        this.Render_tihuan = this.join.meeting.paticipators.filter((res) => {
          return res.speakStatus == 1;
        });
        // }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.replace {
  width: 800px;
  height: 320px;
  background: rgba(000, 000, 000, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -160px;
  z-index: 20;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100000;

  .cha {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 30px;
    top: 25px;
  }
  p {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-top: 40px;
  }
  ul {
    width: 100%;
    height: 210px;
    // background: red;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    li {
      width: 240px;
      height: 64px;
      background: rgba(000, 000, 000, 0.8);
      // background: #ffffff;
      margin-left: 10px;
      margin-right: 10px;
      border-radius: 32px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 30px;
        height: 38px;
        margin-right: 10px;
      }
      span {
        width: 260px;
        height: 50px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-left: 10px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>