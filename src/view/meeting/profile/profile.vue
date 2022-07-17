<template>
  <div class="profile">
    <img src="../../inMeeting/image/xiaotouxiang.png" alt="" class="one" />
    <span class="four">{{ vrayList.userName }}</span>

    <div class="two">
      <ul>
        <li>
          <span>视讯号</span><span>{{ vrayList.peerId }}</span>
        </li>
        <li>
          <span>主机型号</span><span>{{ vrayList.hosttype }}</span>
        </li>
        <li>
          <span>主机版本号</span><span>{{ vrayList.version }}</span>
        </li>
        <li>
          <span>序列号</span><span>{{ vrayList.imei }}</span>
        </li>
        <li>
          <span>截止日期</span><span>{{ vrayList.endtime }}</span>
        </li>
      </ul>
    </div>
    <button class="three" @click="untie()">解绑</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      vrayList: {
        cmdCode: "",
        peerId: "",
        binderId: "",
        userName: "",
        hosttype: "",
        version: "",
        imei: "",
        endtime: "",
      },
    };
  },

  methods: {
    untie() {
      let parameter = {
        cmdCode: "unbind",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
      };
      this.ws.sendMsg(parameter, null, this.unbundle);
    },
    unbundle(e) {
      //解绑
      if (e.result == 0) {
        sessionStorage.clear();
        this.ws.onclose();
        this.$router.push("/login");
      }
    },
  },

  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
      hosttype1: "getFacility",
      automatic: "get_automatic", //自应答
    }),
  },
  watch: {
    automatic: {
      deep: true,
      handler: function (newV, oldV) {
        this.vrayList.peerId = this.log.peerId;
        this.vrayList.endtime = newV.endtime;
        this.vrayList.hosttype = newV.hosttype;
        this.vrayList.version = newV.version;
        this.vrayList.imei = newV.imei;
        this.vrayList.userName = newV.userName;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .one {
    width: 136px;
    height: 139px;
    margin-top: 144px;
  }
  .two {
    width: 1131px;
    height: 381px;
    background: #ffffff;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    margin-top: 38px;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 75px;
        border-bottom: solid 1px #e3e3e3;
        span {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 33px;
          margin-right: 26px;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
  .three {
    width: 308px;
    height: 83px;
    background: #ef453d;
    border-radius: 41px;
    border: none;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-top: 72px;
  }
  .four {
    height: 30px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-top: 10px;
  }
}
</style>