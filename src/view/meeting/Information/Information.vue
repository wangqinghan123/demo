<template>
  <div class="box1">
    <div id="top">
      <span class="f1">我的会议</span>
      <img src="../image/tu5.png" alt="" class="t1" />
      <a href="javascript:void(0);" class="f2" @click="establish()">召开</a>

      <img src="../image/tu6.png" alt="" class="t2" />
      <a href="javascript:void(0);" class="f3" @click="show1_s()">预约</a>

      <input
        type="text"
        class="inp1"
        v-model="social"
        :placeholder="placeholder_EUID"
        @focus="get_id()"
        @blur="lose_id()"
        maxlength="10"
      />

      <el-button class="btn" @click="btn_join()">加入</el-button>
    </div>

    <div class="row">
      <p class="head">
        <span class="s1">会议主题</span>
        <span class="s2">会议状态</span>
        <span class="s3">会议号</span>
        <span class="s4">开始时间</span>
        <span class="s5">操作</span>
      </p>
      <ul>
        <li v-for="(val, index) in tableData" :key="index">
          <img src="./image/hui.png" alt="" class="im1" />
          <span class="li1">{{ val.title }}</span>
          <img
            :src="[
              val.roomType === 'appointment'
                ? img2
                : val.roomType === 'immediate'
                ? img1
                : img3,
            ]"
            alt=""
            class="li2"
          />
          <span class="li3">{{ val.roomId }}</span>
          <span class="li4">{{ val.beginTime }}</span>

          <div class="li0">
            <a
              href="javascript:void(0);"
              class="li5"
              @click="details(val)"
              v-show="val.roomType === 'appointment'"
              >详情</a
            >

            <a href="javascript:void(0);" class="li6" @click="inHome(val)"
              >加入</a
            >
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <order v-if="show"></order>
    </transition>
    <transition name="fade">
      <subscribe v-if="show1"></subscribe>
    </transition>
    <transition name="fade">
      <particulars v-if="show2" :mett="meeting_xq"></particulars>
    </transition>
  </div>
</template>
<script>
import order from "./order/order.vue"; //预约选择日期的页面
import subscribe from "./subscribe/subscribe.vue"; //选择日期页面后选择人员的页面

import particulars from "./particulars/particulars.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      kk: null,
      log: JSON.parse(sessionStorage.getItem("log")),
      social: "", //input
      tableData: [],
      fullscreenLoading: false, //等待
      placeholder_EUID: "请输入会议号",
      // img: require("./image/kb.jpg"),
      img1: require("./image/zhengzai.png"),
      img2: require("./image/yuyue.png"),
      // img3: require("./image/jia.png"),
      show: false, //关于预约日期的弹框
      show1: false, //关于预约日期后点击选择人员的页面

      show2: false, //点击详情出现的页面
      flag_1: true, //防抖1
      flag_2: true, //防抖2
      flag_3: true, //防抖3

      hosttype: "", //请求回来的设备信息

      //点击详情查询得到的会议信息
      meeting_xq: " ",
      //----------------------

      loading: true,
      //------------
      num: 0, //发送后，收到的包数量
    };
  },
  components: {
    order,
    subscribe,
    particulars,
  },
  beforeMount() {
    window.sessionStorage.setItem("to", "/overall/one");
  },
  mounted() {
    this.$Throw.query().then((res) => {
      this.tableData = res.data.data;
    });

    this.ws.addEvent("backToRoom", null, this.inHome_recover);
  },

  methods: {
    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },

    //------------------------

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
    show3_s(value) {
      if (this.show2) {
        this.show2 = value;
      } else {
        this.show2 = true;
      }
    },

    //---------------------------
    //监听在会直接进会
    inHome_recover(e) {
      if (e.result == 0) {
        this.$store.dispatch("set_join", e);
        this.$router.push("/home");
      }
    },

    get_id() {
      this.placeholder_EUID = "";
    },
    lose_id() {
      this.placeholder_EUID = "请输入会议号";
    },

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

    inHome(e) {
      //列表加入
      this.openFullScreen2();

      setTimeout(() => {
        this.loading.close();
      }, 10000);

      if (this.flag_3) {
        let parameter = {
          cmdCode: "joinRoom",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          roomId: e.roomId,
        };
        this.ws.sendMsg(parameter, null, this.join_S);
        this.flag_3 = false;
      }
      setTimeout(() => {
        this.flag_3 = true;
      }, 1500);
    },
    open() {
      this.$message({
        message: "会议号错误",
        type: "warning",
      });
    },

    open1() {
      this.$message({
        message: "会议号格式错误",
        type: "warning",
      });
    },
    open2() {
      this.$message({
        message: "会议已结束",
        type: "warning",
      });
    },

    btn_join() {
      // 搜索框的加入;
      this.openFullScreen2();
      setTimeout(() => {
        this.loading.close();
      }, 10000);
      if (this.flag_2) {
        //防抖
        var regPos = /^\d+$/;
        if (regPos.test(this.social)) {
          //非数字
          this.$Throw.inquire({}, this.social).then((res) => {
            if (res.data.code == 0) {
              let parameter = {
                cmdCode: "joinRoom",
                peerId: this.log.peerId,
                binderId: this.log.binderId,
                roomId: this.social,
              };
              this.ws.sendMsg(parameter, null, this.join_S);
              this.flag_2 = false;
            } else {
              if (res.data.code == -1104) {
                this.open2();
              } else {
                this.loading.close();
                this.open();
              }
            }
          });
        } else {
          this.loading.close();
          this.open1();
        }
      }
      setTimeout(() => {
        this.flag_2 = true;
      }, 1500);
    },

    join_S(e) {
      if (e.result == 0) {
        let parameter101 = {
          cmdCode: "getRoomInfo",
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

    details(e) {
      this.$Throw.inquire({}, e.roomId).then((res) => {
        if (res.data.code == 0) {
          this.meeting_xq = res.data.data;
          this.show2 = true;
        }
      });
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
    sign: {
      handler: function (newV, oldV) {
        this.$Throw.query().then((res) => {
          this.tableData = res.data.data;
        });
      },
    },
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
.setting {
  width: 100%;
  height: 100%;
  z-index: 10;
}

.row {
  width: 96%;
  height: 900px;

  margin-left: 2%;
  margin-top: 22px;
  .head {
    width: 100%;
    height: 79px;
    background: #4d565d;
    border-radius: 5px;
    display: flex;
    align-items: center;
    overflow: hidden;
    .s1 {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-left: 110px;
    }
    .s2 {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fff;
      margin-left: 100px;
    }
    .s3 {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fff;
      margin-left: 196px;
    }
    .s4 {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fff;
      margin-left: 240px;
    }
    .s5 {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-left: 440px;
    }
  }
  ul {
    width: 100%;
    height: 800px;
    background: #ffffff;
    overflow: auto;

    li {
      width: 100%;
      height: 72px;

      border-left: none;
      border-right: none;
      display: flex;
      align-items: center;
      border-bottom: solid 1px #e3e3e3;
      .im1 {
        width: 42px;
        height: 42px;
        margin-left: 28px;
      }
      .li1 {
        width: 147px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;

        margin-left: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .li2 {
        width: 115px;
        height: 32px;
        margin-left: 50px;
      }
      .li3 {
        width: 143px;

        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-left: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .li4 {
        width: 240px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 136px;
      }
      .li0 {
        width: 200px;
        margin-left: 275px;
        display: flex;
        align-items: center;

        .li5 {
          width: 50px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #2d97e1;
          margin-left: 10px;
        }
        .li6 {
          width: 50px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #2d97e1;

          margin-left: 80px;
        }
      }
    }
    li:hover {
      background: #e3e3e3;
    }
  }
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
.box1 {
  width: 100%;
  height: 100%;
  border-radius: 5px;

  .head {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;

    border-radius: 5px 5px 0px 0px;
    display: flex;
    align-items: center;

    .f1 {
      height: 28px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 110px;
    }
    .f2 {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 350px;
    }
    .f3 {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 240px;
    }
    .f4 {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 548px;
    }
  }
}
</style>
