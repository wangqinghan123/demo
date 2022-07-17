<template>
  <div class="box">
    <div class="left">
      <div class="tb1">
        <div
          :class="['t1', is.is1 ? 'active' : '', i.i1 ? 'active1' : '']"
        ></div>
        <div class="z1" @click="profile()" @mouseover="r(1)" @mouseleave="c(1)">
          <img src="./image/xiaotouxiang.png" alt="" class="t11" />
          <span class="f11">{{ log.userName }}</span>
        </div>
      </div>
      <div class="tb2">
        <div
          :class="['t2', is.is2 ? 'active' : '', i.i2 ? 'active1' : '']"
        ></div>
        <div class="z2" @click="list()" @mouseover="r(2)" @mouseleave="c(2)">
          <img src="./image/tu8.png" alt="" class="t21" />
        </div>
      </div>

      <div class="tb3">
        <div
          :class="['t3', is.is3 ? 'active' : '', i.i3 ? 'active1' : '']"
        ></div>
        <div class="z3" @click="address()" @mouseover="r(3)" @mouseleave="c(3)">
          <img src="./image/tu2.png" alt="" class="t31" />
        </div>
      </div>
      <div class="tb4">
        <div
          :class="['t4', is.is4 ? 'active' : '', i.i4 ? 'active1' : '']"
        ></div>
        <div class="z4" @click="set()" @mouseover="r(4)" @mouseleave="c(4)">
          <img src="./image/tu3.png" alt="" class="t41" />
        </div>
      </div>
      <div class="tb5">
        <div
          :class="['t5', is.is5 ? 'active' : '', i.i5 ? 'active1' : '']"
        ></div>
        <div class="z5" @click="edition()" @mouseover="r(5)" @mouseleave="c(5)">
          <img src="./image/tu4.png" alt="" class="im" />
          <span class="f2">视讯云</span>
        </div>
      </div>
    </div>
    <div class="finish" v-show="dissolve">
      <p>主持人已解散会议</p>
      <el-button type="primary" class="btn" @click="dissolve = false"
        >确认</el-button
      >
    </div>
    <transition name="fade">
      <invitation
        v-show="invite"
        @immediately="immediately"
        @cancel="cancel"
        :meeting="meeting"
      ></invitation>
    </transition>
    <div class="bottom">
      <router-view></router-view>
    </div>

    <div class="masking" v-show="being">
      <div class="detection" v-show="hou">
        <img src="./image/jiazai.png" alt="" class="spin" ref="spin" />
        <p class="p1">正在检测网络，请稍后......</p>
      </div>

      <div class="detection" v-show="bad">
        <div class="im">
          <img src="./image/jiaocha.png" alt="" />
        </div>

        <p class="p3">您当前的网络情况较差 请检查网络环境</p>

        <p class="p1">
          <span>最大延时数字为：</span><span class="span2">43</span>
        </p>
        <p class="p2">
          <span>平均延时数字为：</span><span class="span2">29.5</span>
        </p>

        <button class="bt" @click="ok(1)">知道了</button>
      </div>
      <div class="detection" v-show="ordinary">
        <div class="im">
          <img src="./image/yiban.png" alt="" />
        </div>

        <p class="p3">您当前的网络情况一般 请检查网络环境</p>
        <p class="p1">
          <span>最大延时数字为：</span><span class="span2">43</span>
        </p>
        <p class="p2">
          <span>平均延时数字为：</span><span class="span2">29.5</span>
        </p>
        <button class="bt" @click="ok(2)">知道了</button>
      </div>
      <div class="detection" v-show="good">
        <div class="im">
          <img src="./image/lianghao.png" alt="" />
        </div>
        <p class="p3">您当前的网络情况良好</p>
        <p class="p1">
          <span>最大延时数字为：</span><span class="span2">{{ Re1 }}</span>
        </p>
        <p class="p2">
          <span>平均延时数字为：</span><span class="span2">{{ Re2 }}</span>
        </p>
        <button class="bt" @click="ok(3)">知道了</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import invitation from "./invitation/invitation.vue"; //邀请会议提醒
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      dissolve: false, //主持人解散会议，监听到后赋的值；
      is: {
        is1: false,
        is2: true,
        is3: false,
        is4: false,
        is5: false,
      }, //动态切换active
      i: {
        i1: false,
        i2: false,
        i3: false,
        i4: false,
        i5: false,
      },
      invite: false, //收到邀请会议（不是自应答的情况下）的通知的弹窗
      meeting: "", //储存收到邀请的会议信息

      switch1: "", //储存是否是自应答
      //--以下都是网络监测--
      being: false, //弹框显示
      hou: false,
      bad: false, //坏
      ordinary: false, //一般
      good: false, //良好

      num7: 0, //最后返回的结果

      //--------
      clear: null, //到达条件停止发送

      timePoke1: [], //发送的时间戳的保存

      timePoke2: [], //回来请求的当前时间

      timePoke3: [], //两次时间计算出来的差值

      Re1: null, //最大延时数
      Re2: null, //平均延时数
    };
  },
  components: { invitation },
  mounted() {
    //关于检测网络的正在加载中图片的旋转
    let el = this.$refs.spin;
    let angle = 0;
    setInterval((res) => {
      angle += 10;
      el.style.transform = `rotate(${angle}deg)`;
    }, 100);

    //关于路由
    let url = this.$route.path;

    switch (url) {
      case "/overall/profile":
        this.is = { is1: true };
        break;
      case "/overall/one":
        this.is = { is2: true };
        break;
      case "/overall/address":
        this.is = { is3: true };
        break;
      case "/overall/set/pattern":
        this.is = { is4: true };
        break;
      case "/overall/edition":
        this.is = { is5: true };
    }
    //----------等待通知-------------
    let parameter = {
      cmdCode: "getDevice",
      peerId: this.log.peerId,
      binderId: this.log.binderId,
    };
    this.ws.sendMsg(parameter, null, this.editionH); //请求数据，用来计算是否开启自应答；

    this.ws.addEvent("ctrlInvite", null, this.ctrlInvite_s);
  },
  methods: {
    //---

    ok(e) {
      switch (e) {
        case 1:
          console.log(e);
          this.being = false;
          this.bad = false;
          break;
        case 2:
          console.log(e);
          this.being = false;
          this.ordinary = false;
          break;
        default:
          console.log(e);
          this.being = false;
          this.good = false;
      }
    },

    //------计算是否开启自应答-------------
    editionH(e) {
      this.$store.dispatch("set_isauto", e.isAutoJoinMeeting);
      this.$store.dispatch("set_automatic", e);
    },

    //------把此方法传给子组件，并且把通知收到的会议信息传给子组件----------------
    immediately(e) {
      let parameter = {
        cmdCode: "joinRoom",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        roomId: e,
      };

      this.ws.sendMsg(parameter, null, this.inHome);
    },

    //---------关于点击取消进会的事件---------
    cancel(e) {
      this.invite = false;
    },
    //------关于自动进会--------
    ctrlInvite_s(e) {
      if (e.type == "notify") {
        if (e.destPeerIds.indexOf(this.log.peerId) != -1) {
          //true 自动进会
          if (this.isauto == 1) {
            let parameter = {
              cmdCode: "joinRoom",
              peerId: this.log.peerId,
              binderId: this.log.binderId,
              roomId: e.roomId,
            };
            this.ws.sendMsg(parameter, null, this.inHome);
          } else {
            //false 出现弹框
            this.meeting = e;
            this.invite = true;
          }
        }
      }
    },
    inHome(e) {
      console.log(e);
      if (e.result == 0) {
        let parameter101 = {
          cmdCode: "getRoomInfo",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
        };
        this.ws.sendMsg(parameter101, null, this.reconnection);
      }
    },

    reconnection(e) {
      console.log(e);
      this.$store.dispatch("set_join", e);
      this.$router.push("/home");
    },
    //--------------------
    profile() {
      let url = this.$route.path;
      if (url != "/overall/profile") {
        this.$router.push("/overall/profile");
        this.is = { is1: true };
      }
    },
    list() {
      let url = this.$route.path;

      if (url != "/overall/one") {
        this.$router.push("/overall/one");
        this.is = { is2: true };
      }
    },
    address() {
      let url = this.$route.path;
      if (url != "/overall/address") {
        this.$router.push("/overall/address");
        this.is = { is3: true };
      }
    },
    set() {
      let url = this.$route.path;
      if (url != "/overall/set" && url != "/overall/set/pattern") {
        this.$router.push("/overall/set/pattern");
        this.is = { is4: true };
      }
    },
    edition() {
      let url = this.$route.path;
      if (url != "/overall/edition") {
        this.$router.push("/overall/edition");
        this.is = { is5: true };
      }
    },
    c(e) {
      switch (e) {
        case 1:
          this.i.i1 = false;
          break;
        case 2:
          this.i.i2 = false;
          break;
        case 3:
          this.i.i3 = false;
          break;
        case 4:
          this.i.i4 = false;
          break;
        case 5:
          this.i.i5 = false;
          break;
      }
    },
    r(e) {
      switch (e) {
        case 1:
          this.i.i1 = true;
          break;
        case 2:
          this.i.i2 = true;
          break;
        case 3:
          this.i.i3 = true;
          break;
        case 4:
          this.i.i4 = true;
          break;
        case 5:
          this.i.i5 = true;
          break;
      }
    },
    //-------检测会议发送50条请求检测------------
    j_S(e) {
      if (e.result == 0) {
        this.num7++;

        //时间戳
        let timestamp = new Date().getTime();
        this.timePoke2.push(timestamp);
      }
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
      finish: "get_finishMeeting",
      // automatic: "get_automatic", //自应答
      isauto: "get_isauto",
      masking: "get_masking1",
    }),
  },
  watch: {
    finish: {
      handler: function (newV, oldV) {
        this.dissolve = newV;
      },
    },
    masking: {
      handler: function (newV, oldV) {
        this.being = true;
        this.hou = true;
        let i = 0;
        this.clear = setInterval((res) => {
          i++;
          if (i == 50) {
            clearInterval(this.clear);
            setTimeout((res) => {
              if (this.num7 > 45) {
                console.log(this.num7, "this.num7 > 45");
                this.hou = false;
                this.good = true;
              } else {
                if (this.num7 > 35) {
                  console.log(this.num7, "this.num7 > 35");
                  this.hou = false;
                  this.ordinary = true;
                } else {
                  console.log(this.num7, "!>35");
                  this.hou = false;
                  this.bad = true;
                }
              }

              this.timePoke2.forEach((element1, index1) => {
                this.timePoke1.forEach((element2, index2) => {
                  if (index1 == index2) {
                    this.timePoke3.push(element1 - element2);
                  }
                });
              });

              this.timePoke3.sort((a, b) => {
                return b - a;
              });

              this.Re1 = this.timePoke3.shift();

              let overall = this.timePoke3.reduce((a, b) => {
                return a + b;
              });
              let zan = overall / this.num7;
              this.Re2 = zan.toFixed(2);
            }, 10000);
          }

          //时间戳
          let timestamp = new Date().getTime();
          this.timePoke1.push(timestamp);

          let parameter = {
            cmdCode: "testBinder",
            number: i,
            peerId: this.log.peerId,
          };
          this.ws.sendMsg(parameter, null, this.j_S);
        }, 100);
      },
    },
    num7: {
      handler: function (newV, oldV) {},
    },
  },
};
</script>
<style lang="less" scoped>
.active {
  background: #000000;
  opacity: 0.2;
}
.active1 {
  background: #000000;
  opacity: 0.2;
}
.box {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  position: relative;

  .detection {
    width: 816px;
    height: 492px;
    background: #ffffff;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -408px;
    margin-top: -246px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .im {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 108px;
        height: 107px;
      }
    }
    .p1 {
      width: 400px;
      margin-top: 34px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #555555;
      align-content: center;
      text-align: center;
      .span2 {
        color: #115bd5;
      }
    }
    .p2 {
      width: 400px;
      margin-top: 34px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #555555;
      align-content: center;
      text-align: center;
      .span2 {
        color: #115bd5;
      }
    }
    .p3 {
      width: 500px;
      margin-top: 34px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      align-content: center;
      text-align: center;
    }
    .bt {
      width: 180px;
      height: 40px;
      margin-top: 60px;
      background-color: #169bd5;
      border: none;
      border-radius: 10px;
      color: #ffffff;
    }
    .bt:hover {
      background: #115bd5;
    }
  }

  .masking {
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.75);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left {
    width: 174px;
    height: 1080px;
    background: url(./image/tu1.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .tb1 {
      width: 173px;
      height: 194px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .t1 {
        width: 173px;
        height: 194px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 64.5px;

        position: absolute;
        left: 0;
        top: 0;
      }
      .z1 {
        width: 173px;
        height: 194px;
        margin-top: 64.5px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .t11 {
          width: 96px;
          height: 96px;
        }
        .f11 {
          width: 80%;
          height: 29px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          margin-top: 26px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .tb2 {
      width: 175px;
      height: 122px;
      position: relative;
      margin-top: 170px;
      .t2 {
        width: 175px;
        height: 122px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
      }
      .z2 {
        width: 175px;
        height: 122px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .t21 {
          width: 44px;
          height: 28px;
        }
      }
    }
    .tb3 {
      width: 175px;
      height: 122px;
      position: relative;

      .t3 {
        width: 175px;
        height: 122px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
      }
      .z3 {
        width: 175px;
        height: 122px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .t31 {
          width: 44px;
          height: 42px;
        }
      }
    }

    .tb4 {
      width: 175px;
      height: 122px;
      position: relative;
      .t4 {
        width: 175px;
        height: 122px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
      }
      .z4 {
        width: 175px;
        height: 122px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .t41 {
          width: 44px;
          height: 44px;
        }
      }
    }
    .tb5 {
      width: 173px;
      height: 187px;
      position: relative;
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      bottom: 0;

      .t5 {
        width: 173px;
        height: 187px;

        position: absolute;
        left: 0;
        bottom: 0;
      }
      .z5 {
        width: 173px;
        height: 187px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .im {
          width: 46px;
          height: 46px;
        }
        .f2 {
          height: 23px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          margin-top: 20px;
        }
      }
    }
  }
  .finish {
    width: 300px;
    height: 160px;
    background: #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    flex-direction: column;
    p {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: bolder;
      color: #000000;
    }
    .btn {
      width: 100px;
      height: 40px;
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .bottom {
    width: 1746px;
    height: 100%;
    border-radius: 5px;
    border-radius: 5px;
  }
}
</style>
