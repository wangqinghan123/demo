<template>
  <div class="zong">
    <div class="home">
      <div class="top">
        <div class="t1">
          <img src="./image/xiaotouxiang.png" alt="" class="tou1" />
          <span class="name">{{ name }}</span>
          <button class="inp1">{{ pattern }}</button>

          <span class="s1"
            >会议号：<span>{{ number }}</span></span
          >
        </div>
        <div class="t2">
          <div class="t21"></div>
          <div class="t22">
            <span class="s1">{{ date1.time }}</span
            ><img
              src="./image/dianyuan.png"
              alt=""
              @click="quit()"
              class="d1"
            />
          </div>
        </div>
      </div>
      <div class="major">
        <div class="m1">
          <img
            :src="major.Render1"
            alt=""
            class="p"
            @click.stop="ICR(1)"
            @mouseenter="r(1)"
            @mouseout.stop="c(1)"
          />

          <div class="gai" v-show="cover.cover1"></div>
          <img
            src="./image/tuichuyuan.png"
            alt=""
            class="tcy"
            v-show="qie.show1"
          />
          <span>{{ major.typeface1 }}</span>
        </div>
        <div class="m2">
          <img
            :src="major.Render2"
            alt=""
            class="p"
            @mouseover="r(2)"
            @mouseleave="c(2)"
            @click.stop="ICR(2)"
          />
          <div class="gai" v-show="cover.cover2"></div>
          <img
            src="./image/tuichuyuan.png"
            alt=""
            class="tcy"
            v-show="qie.show2"
          />

          <span>{{ major.typeface2 }}</span>
        </div>
        <div class="m3">
          <img
            :src="major.Render3"
            alt=""
            class="p"
            @mouseover="r(3)"
            @mouseleave="c(3)"
            @click.stop="ICR(3)"
          />
          <div class="gai" v-show="cover.cover3"></div>
          <img
            src="./image/tuichuyuan.png"
            alt=""
            class="tcy"
            v-show="qie.show3"
          />
          <span>{{ major.typeface3 }}</span>
        </div>
        <div class="m4" v-if="isEmcee">
          <img
            :src="major.Render4"
            alt=""
            class="p"
            @mouseover="r(4)"
            @mouseleave="c(4)"
            @click.stop="ICR(4)"
          />
          <div class="gai" v-show="cover.cover4"></div>
          <img
            src="./image/tuichuyuan.png"
            alt=""
            class="tcy"
            v-show="qie.show4"
          />
          <span>{{ major.typeface4 }}</span>
        </div>
        <div class="m5" v-else>
          <img
            :src="major.Render5"
            alt=""
            class="p"
            @mouseover="r(5)"
            @mouseleave="c(5)"
            @click.stop="ICR(5)"
          />
          <div class="gai" v-show="cover.cover5"></div>
          <img
            src="./image/tuichuyuan.png"
            alt=""
            class="tcy"
            v-show="qie.show5"
          />
          <span>{{ major.typeface5 }}</span>
        </div>
      </div>
      <div class="function">
        <div class="o1" @click="dialOpen">
          <div class="im1"></div>
          <img src="./image/qiehuan.png" alt="" class="tu1" />
          <span>切换视图</span>
        </div>

        <div class="o2" @click="manage1">
          <div class="im2"></div>
          <img src="./image/guanli.png" alt="" class="tu2" />
          <span v-if="isEmcee">管理参会方</span>
          <span v-else>参会方</span>
        </div>
        <div class="o3">
          <div v-if="isEmcee">
            <div class="im3"></div>
            <img
              src="./image/yaoqing.png"
              alt=""
              class="im3_1"
              @click="ask_s()"
            />
          </div>
          <div v-else>
            <div class="im3"></div>
            <img
              src="./image/hui_yao.png"
              alt=""
              class="im3_2"
              @click="NotHost_S()"
            />
          </div>

          <span>邀请</span>
        </div>
        <div class="o4">
          <div v-if="isEmcee">
            <div class="im4"></div>
            <img src="./image/lunxun.png" alt="" class="tu4" @click="open()" />
          </div>
          <div v-else>
            <div class="im4"></div>
            <img
              src="./image/hui_lun.png"
              alt=""
              class="tu4"
              @click="NotHost_S()"
            />
          </div>

          <span>轮巡</span>
        </div>
        <div class="o5">
          <!-- 默认倒计时的动画是不显示的，只有在点击im5后，触发倒计时事件 -->
          <div class="im123" v-if="count" @click.stop="isEnd">
            <img src="./image/san.png" alt="" v-show="countTime == 3" />
            <img src="./image/er.png" alt="" v-show="countTime == 2" />
            <img src="./image/yi.png" alt="" v-show="countTime == 1" />
          </div>

          <div class="im5" v-if="isEmcee" @click.stop="count_S">
            <img
              src="./image/yuan.png"
              alt=""
              class="yuan"
              v-if="countTime > 0"
            />
            <img src="./image/hongyuan.png" alt="" v-else class="yuan" />
            <img src="./image/dian.png" alt="" class="dian" v-show="dot" />
            <div id="animat" class="hong" v-show="countTime == 0"></div>
          </div>
          <div class="im5" v-else @click="NotHost_S">
            <img src="./image/hui_lu.png" alt="" class="hui_lu" />
          </div>
          <span class="yun">云端录制</span>
        </div>

        <div class="o6" @click="openUp">
          <div class="im6"></div>
          <img src="./image/shezhi.png" alt="" class="tu6" />
          <span>设置</span>
        </div>
      </div>
      <div class="bottom">
        <img src="./image/shoudongyinliang.png" alt="" class="b1" />
        <el-slider
          @change="controlVolume"
          v-model="value1"
          class="b2"
        ></el-slider>
      </div>
    </div>
    <transition name="fade">
      <div class="bj" v-show="bj">
        <quit></quit>
      </div>
    </transition>
    <transition name="fade">
      <isEnd v-show="isEnd_show"></isEnd>
    </transition>

    <transition name="fade">
      <div class="Management" v-show="Management">
        <Management2></Management2>
      </div>
    </transition>
    <transition name="fade">
      <begin v-show="NotHost"></begin>
    </transition>
    <patrolDialog :show.sync="show" class="lun"></patrolDialog>
    <switchView
      :dialogShow.sync="dialogShow"
      :layoutMessage="layout"
      class="qie"
    ></switchView>
    <sutUpView :setUpIndex.sync="setUpIndex" class="she"></sutUpView>
    <transition name="fade">
      <pop v-show="pop_show"></pop>
    </transition>
    <transition name="fade">
      <ask v-show="askIndex"></ask>
    </transition>
    <transition name="fade">
      <replace v-show="tihuan101"></replace>
    </transition>
  </div>
</template>
<script>
import quit from "./quit/quit.vue"; //退出的组件
import patrolDialog from "../../components/dialog.vue"; //轮巡
import switchView from "../../components/meetingLayout.vue"; //切换视图
import sutUpView from "../../components/setUp.vue"; //设置

import pop from "./pop-up/pop-up.vue"; //非主持人的情况下退出的组件
import ask from "./ask/ask.vue"; //邀请的组件

import Management2 from "./Management/Management.vue"; //管理参会方

import replace from "./Management/replace/replace.vue"; //人数超过六个就显示弹框

import isEnd from "./isEnd/isEnd.vue"; //确定退出会议（主持的情况下）
import begin from "./begin/begin.vue"; //开始录制或者不是主持的弹框组件
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //----录制倒计时------
      count: false, //关于3，2，1倒计时的div的显示，默认不显示，点击im5去触发事件再显示
      countTime: 3, //倒计时的时候显示那张图片，一旦图片结束后去显示动画；
      dot: true, //关于动画
      isEnd_show: false, //是否取消录制的组件的显示与隐藏
      //----------
      log: JSON.parse(sessionStorage.getItem("log")),
      number: "", //会议号
      name: "", //账号
      show: false, //轮巡弹框的初始值
      dialogShow: false, //切换视图的初始值
      setUpIndex: false, //设置弹框的初始值
      askIndex: false, //关于邀请的弹框的show
      pattern: "主持模式", //模式
      value1: 0, //手动音量的值
      bj: false, //点击电源入口显示与隐藏

      Management: false, //点击参会方的弹窗
      status: 1, //会议的形式（模式）
      //--------------------

      tihuan101: false, //超过六个出来的弹框

      cover: {
        //.gai的图层 用来覆盖按钮不能点击
        cover1: false,
        cover2: false,
        cover3: false,
        cover4: false,
        cover5: false,
      },
      date1: {
        time: "00:00:00", //进会时间
        m: "00", //秒
        f: "00", //分钟
        s: "00", //小时
      },
      clear: null, //清除定时器
      major: {
        //切换的四个大图片与相应的文字
        Render1: null,
        Render2: null,
        Render3: null,
        Render4: null, //图片
        Render5: null, //图片
        typeface1: null,
        typeface2: null,
        typeface3: null,
        typeface4: null, //字体
        typeface5: null, //字体
        hover: require("./image/tuichuyuan.png"),
        im1: require("./image/maikefeng.png"),
        im2: require("./image/yinliang.png"),
        im3: require("./image/shexiangtou.png"),
        im4: require("./image/yonghu.png"),
        im5: require("./image/jushou.png"),
        im6: require("../inMeeting/image/jzmaikefeng.png"),
        im7: require("../inMeeting/image/jzyinliang.png"),
        im8: require("../inMeeting/image/jzshexiang.png"),
        im9: require("../inMeeting/image/jzfayan.png"),
        im10: require("./image/jushouzhong.png"),
        s1: "关闭麦克风",
        s2: "关闭扬声器",
        s3: "关闭摄像头",
        s4: "取消发言",
        s5: "举手",
        s6: "打开麦克风",
        s7: "打开扬声器",
        s8: "打开摄像头",
        s9: "发言",
        s10: "举手中",
      }, //四个大按钮的图片与相应的文字
      qie: {
        //显示隐藏动画圆圈
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
      }, //四个大图片对应的背影动画

      pop_show: false, //非主持人的退出
      list_ju: [], //举手人信息
      NotHost: false, //开始录制或者不是主持人的弹框

      lift_list: [], //保存所有举手人的信息

      is101: true, //关于举手设置的标志；（区分是否在lift_list）

      sj: "", //每次举手都会计算出来的举手人的信息
      // is102: false, //关于举手设置的标志；（区分是否在lift_list）

      //-------------------------
      //根据现在的状态，做出取反的值；
      spak_NOT: "",

      micStatus_NOT: "",
      loudSpeakerStatus_NOT: "",
      camStaus_NOT: "",

      // 获取布局信息

      layout: null,

      //------------防止李征疯狂点击------------
      // ①上面五个按钮
      tcr_5: true,
      tcr_4: true,
      tcr_3: true,
      tcr_2: true,
      tcr_1: true,
      num7: null,
      clear: null,
      //关于转授主持人 得到两次通知，做的拦截
      turnIntercept: false,
      ////关于点击录制的一些变量
      ji: null,
    };
  },

  components: {
    quit,
    Management2,
    patrolDialog,
    switchView,
    sutUpView,
    pop,
    ask,
    isEnd,
    begin,
    replace,
  },
  beforeMount() {
    window.sessionStorage.setItem("to", "home");
  },
  mounted() {
    //监听事件

    this.deviceData();
    this.wang();

    this.ws.addEvent("changeMode", null, this.handsS_t); //模式变更事件

    this.ws.addNotifyEvent("handsUp", this.handsUp_t); //监听举手

    this.ws.addEvent("joinRoom", null, this.join_t); //监听成员加入的事件
    this.ws.addEvent("optSpeak", null, this.Speak_H); //监听有人成功发言和有人取消发言

    this.ws.addEvent("optMicrophone", null, this.mai_t); //麦克风
    this.ws.addEvent("optLoudSpeaker", null, this.yang_t); //扬声器
    this.ws.addEvent("optCamera", null, this.she_t); //摄像头

    this.ws.addEvent("newMaster", null, this.newMaster_s); //拦截转授主持人的返回通知

    this.ws.addEvent("closeTheRoom", null, this.finishMeeting); //身为参会方的情况下，主持人结束会议的通知。

    //时间的计算
    if (this.meetingTime) {
      this.date1.m = this.meetingTime.slice(6);
      this.date1.f = this.meetingTime.slice(3, 5);
      this.date1.s = this.meetingTime.slice(0, 2);
      this.turnTime();
      this.$store.dispatch("set_meetingTime", null);
    } else {
      this.turnTime();
    }
  },

  methods: {
    //监听通知事件(指令共用)
    wang() {
      let zhi = this.join.meeting.paticipators.filter((res) => {
        return res.peerId == window.sessionStorage.getItem("peerId");
      }); //从集合里过滤出自己的数据
      this.$store.dispatch("set_ziji", zhi[0]);

      this.join.meeting.paticipators.forEach((element) => {
        this.$set(element, "xian1", false);
      }); //添加属性
      this.join.meeting.paticipators.forEach((element) => {
        this.$set(element, "xian2", false);
      }); //添加属性
      this.join.meeting.paticipators.forEach((element) => {
        this.$set(element, "xian3", false);
      }); //添加属性

      //计算状态显示对应的图片
      if (this.ziji.camStaus != 1) {
        //摄像头状态
        this.major.Render3 = this.major.im3;
        this.major.typeface3 = this.major.s3;
      } else {
        this.major.Render3 = this.major.im8;
        this.major.typeface3 = this.major.s8;
      }
      if (this.ziji.micStatus != 1) {
        //麦克风状态
        this.major.Render1 = this.major.im1;
        this.major.typeface1 = this.major.s1;
      } else {
        this.major.Render1 = this.major.im6;
        this.major.typeface1 = this.major.s6;
      }
      if (this.ziji.loudSpeakerStatus != 1) {
        //扬声器状态
        this.major.Render2 = this.major.im2;
        this.major.typeface2 = this.major.s2;
      } else {
        this.major.Render2 = this.major.im7;
        this.major.typeface2 = this.major.s7;
      }

      if (this.ziji.speakStatus == 1) {
        //默认给第四个按钮一个状态
        this.major.Render4 = this.major.im4;
        this.major.typeface4 = this.major.s4;
      } else {
        this.major.Render4 = this.major.im9;
        this.major.typeface4 = this.major.s9;
      }

      if (this.ziji.speakStatus != 1) {
        //默认给第五个按钮一个状态

        this.major.Render5 = this.major.im5;
        this.major.typeface5 = this.major.s5;
      } else {
        this.major.Render5 = this.major.im4;
        this.major.typeface5 = this.major.s4;
      }

      this.number = this.join.meeting.roomId; //会议账号赋值
      this.name = this.join.meeting.managerName; //名字赋值

      switch (this.join.meeting.roomMode) {
        case 0:
          this.$store.dispatch("set_roomMode", 0);
          break;
        case 1:
          this.$store.dispatch("set_roomMode", 1);
          break;
        case 2:
          this.$store.dispatch("set_roomMode", 2);
          break;
      }

      if (this.join.meeting.managerId == sessionStorage.getItem("peerId")) {
        //是不是主持人

        this.$store.dispatch("set_isEmcee", true);
      } else {
        this.$store.dispatch("set_isEmcee", false);

        //不是主持的话，没举手之前先盖住
        this.cover.cover1 = true;
        this.cover.cover3 = true;
      }
    },

    //关于转授主持的时间的问题
    turnTime() {
      this.clear = setInterval(() => {
        if (this.date1.m < 59) {
          this.date1.m++;
          if (this.date1.m < 10) {
            this.date1.m = `0${this.date1.m}`;
          }
        } else {
          if (this.date1.f < 59) {
            this.date1.f++;
            if (this.date1.f < 10) {
              this.date1.f = `0${this.date1.f}`;
            }
            this.date1.m = "00";
          } else {
            this.date1.s++;
            if (this.date1.s < 10) {
              this.date1.s = `0${this.date1.s}`;
            }
            this.date1.f = "00";
            this.date1.m = "00";
          }
        }
        this.date1.time = `${this.date1.s}:${this.date1.f}:${this.date1.m}`;
      }, 1000);
    },
    //-----录制倒计时--------

    //------点击执行当前动画，当倒计时结束后，（等待通知res）----------------
    count_S() {
      this.count = true;
      this.dot = false;
      // this.open3();

      let parameter3 = {
        cmdCode: "recordMeeting",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        destPeerId: this.ziji.peerId,
        operateType: 1,
      };
      this.ws.sendMsg(parameter3, null, this.transcribe);

      let ji = setInterval(() => {
        this.countTime--;
        if (this.countTime == 0) {
          clearInterval(ji);
        }
      }, 1000);
    },

    transcribe(e) {
      if (e.result != 0) {
        console.log("recordMeeting（开始录制）的回调状态不对");
      }
    },
    //--------是否结束录制的事件------------
    isEnd(e) {
      if (this.isEnd_show) {
        this.isEnd_show = e;
      } else {
        this.isEnd_show = true;
      }
    },

    endRecord() {
      this.count = false;
      this.countTime = 3;
      this.dot = true;
    },

    //---------参会者的情况下去点击灰色按钮----------
    NotHost_S() {
      this.NotHost = true;
      setTimeout(() => {
        this.NotHost = false;
      }, 3000);
    },
    //-------身为参会者的情况下主持人结束会议。-------------
    finishMeeting(e) {
      if (e.result == 0) {
        this.$router.push("/overall/one");
        this.$store.dispatch("set_finishMeeting", true); //改变vuex的数据  在外边侦听进行弹窗的显示
      }
    },
    //---------------------转授主持人的拦截通知--------------------------
    newMaster_s(e) {
      //转主持人的拦截
      this.turnIntercept = !this.turnIntercept;
      if (this.turnIntercept) {
        if (e.result == 0) {
          let parameter = {
            cmdCode: "getRoomInfo",
            peerId: this.log.peerId,
            binderId: this.log.binderId,
          };
          this.ws.sendMsg(parameter, null, this.newest);
        }
        setTimeout((res) => {
          this.turnIntercept = false;
        }, 5000);
      }
    },
    newest(e) {
      //获取最新会议信息的回调

      this.$store.dispatch("set_join", e); //得到最新的结果

      this.$store.dispatch("set_roomMode", e.meeting.roomMode);
      this.$store.dispatch("set_flag", true);

      this.Management = true; //隐藏弹框
    },
    mai_t(e) {
      if (e.type == "notify") {
        if (e.result == 0) {
          if (e.destPeerId == this.log.peerId) {
            this.ziji.micStatus = e.operateType;
          } else {
            this.join.meeting.paticipators.forEach((res) => {
              if (res.peerId == e.destPeerId) {
                res.micStatus = e.operateType;
              }
            });
          }
        }
      } else {
        if (e.type == "res") {
          if (e.result != 0) {
          }
        }
      }
    },
    yang_t(e) {
      if (e.type == "notify") {
        if (e.result == 0) {
          if (e.destPeerId == this.log.peerId) {
            this.ziji.loudSpeakerStatus = e.operateType;
          } else {
            this.join.meeting.paticipators.forEach((res) => {
              if (res.peerId == e.destPeerId) {
                res.loudSpeakerStatus = e.operateType;
              }
            });
          }
        }
      }
    },
    she_t(e) {
      if (e.type == "notify") {
        if (e.result == 0) {
          if (e.destPeerId == this.log.peerId) {
            this.ziji.camStaus = e.operateType;
          } else {
            this.join.meeting.paticipators.forEach((res) => {
              if (res.peerId == e.destPeerId) {
                res.camStaus = e.operateType;
              }
            });
          }
        }
      }
    },

    handsUp_t(e) {
      //单向举手专用

      if (e.result == 0) {
        this.sj = this.join.meeting.paticipators.filter((res) => {
          return res.peerId == e.destPeerId;
        });

        if (this.lift_list.length == 0) {
          this.lift_list.push(...this.sj);
          this.open2();
        } else {
          let is101 = true;
          for (let i = 0; i < this.lift_list.length; i++) {
            if (this.lift_list[i].peerId == this.sj[0].peerId) {
              is101 = false;
            }
          }
          if (is101) {
            this.lift_list.push(...this.sj);
          }
        }

        this.$store.dispatch("set_ju_ren", this.lift_list); //举手人
        this.$store.dispatch("set_hands", this.lift_list.length); //举手长度
      }
    },
    join_t(e) {
      if (e.result == 0) {
        if (e.operateType == 1) {
          this.join.meeting.paticipators.push(e.paticipator);
        } else {
          this.join.meeting.paticipators =
            this.join.meeting.paticipators.filter((res) => {
              return res.peerId != e.paticipator.peerId;
            });
        }
      }
    },
    handsS_t(e) {
      //模式变更

      switch (e.roomMode * 1) {
        case 0:
          this.$store.dispatch("set_roomMode", e.roomMode);

          break;
        case 1:
          this.$store.dispatch("set_roomMode", e.roomMode);

          break;
        case 2:
          this.$store.dispatch("set_roomMode", e.roomMode);
          break;
      }
    },

    //---------element弹窗-------------
    open2() {
      this.$message({
        message: "有新的举手消息",
        type: "success",
      });
    },
    open3() {
      this.$message({
        message: "功能正在优化中",
        type: "warning",
      });
    },

    //----------------------------
    //轮巡的点击事件
    open() {
      this.show = true;
    },
    //获取视图布局的信息
    switchView(data) {
      if (data.result == 0) {
        this.layout = data.layout;
      } else {
        console.log("获取视图布局的信息,失败");
      }
    },

    //切换视图按钮
    dialOpen() {
      this.dialogShow = true;
      // 获取会议的布局
      let parameter = {
        cmdCode: "getSpeakerPanel",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
      };

      this.ws.sendMsg(parameter, null, this.switchView);
    },
    volumeData(re) {
      console.log(re);
    },
    //设置按钮
    openUp() {
      this.setUpIndex = true;
    },
    switchVideo(res) {
      if (res.result == 0) {
        this.value1 = Number(res.speakerDevices.volume);
      }
    },
    deviceData() {
      let parment = {
        cmdCode: "getDeviceInfo",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
      };
      this.ws.sendMsg(parment, null, this.switchVideo);
    },
    controlVolume() {
      let params = {
        cmdCode: "setVolume",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
        volume: this.value1,
      };
      this.ws.sendMsg(params, null, this.volumeData);
    },
    manage1(e) {
      //点击参加管理参会方的按钮
      if (this.Management) {
        this.Management = e;
      } else {
        this.Management = true;
      }
    },
    //------非主持下的弹框----------
    quit(e) {
      if (this.isEmcee) {
        //---是主持---
        if (this.bj === false) {
          this.bj = true;
        } else {
          this.bj = e;
        }
      } else {
        //----非主持----
        if (this.pop_show) {
          this.pop_show = e;
        } else {
          this.pop_show = true;
        }
      }
      //控制电源按钮弹框的显示与隐藏
    },
    //home页面的四个大圆圈的滑入滑出事件
    r(e) {
      //划入事件
      switch (e) {
        case 1:
          this.qie = {
            show1: true,
          };
          break;
        case 2:
          this.qie = {
            show2: true,
          };
          break;
        case 3:
          this.qie = {
            show3: true,
          };
          break;
        case 4:
          this.qie = {
            show4: true,
          };
          break;
        case 5:
          this.qie = {
            show5: true,
          };
          break;
      }
    },
    c(e) {
      //滑出事件
      switch (e) {
        case 1:
          this.qie = {
            show1: false,
          };
          break;
        case 2:
          this.qie = {
            show2: false,
          };
          break;
        case 3:
          this.qie = {
            show3: false,
          };
          break;
        case 4:
          this.qie = {
            show4: false,
          };
          break;
        case 5:
          this.qie = {
            show5: false,
          };
          break;
      }
    },

    ICR(e) {
      //点击事件
      switch (e) {
        case 1:
          if (this.tcr_1) {
            this.tcr_1 = false;
            if (this.ziji.micStatus == 1) {
              this.micStatus_NOT = 2;
            } else {
              this.micStatus_NOT = 1;
            }

            let parameter = {
              cmdCode: "optMicrophone",
              peerId: this.log.peerId,
              binderId: this.log.binderId,
              destPeerId: this.ziji.peerId,
              operateType: this.micStatus_NOT,
            };

            this.ws.sendMsg(parameter, null, this.MIC_S);
          }
          setTimeout(() => {
            this.tcr_1 = true;
          }, 3000);

          break;
        case 2:
          if (this.tcr_2) {
            this.tcr_2 = false;
            if (this.ziji.loudSpeakerStatus == 1) {
              this.loudSpeakerStatus_NOT = 2;
            } else {
              this.loudSpeakerStatus_NOT = 1;
            }

            let parameter1 = {
              cmdCode: "optLoudSpeaker",
              peerId: this.log.peerId,
              binderId: this.log.binderId,
              destPeerId: this.ziji.peerId,
              operateType: this.loudSpeakerStatus_NOT,
            };

            this.ws.sendMsg(parameter1, null, this.Spk_S);
          }
          setTimeout(() => {
            this.tcr_2 = true;
          }, 3000);

          break;
        case 3:
          if (this.tcr_3) {
            this.tcr_3 = false;
            if (this.ziji.camStaus == 1) {
              this.camStaus_NOT = 2;
            } else {
              this.camStaus_NOT = 1;
            }

            let parameter2 = {
              cmdCode: "optCamera",
              peerId: this.log.peerId,
              binderId: this.log.binderId,
              destPeerId: this.ziji.peerId,
              operateType: this.camStaus_NOT,
            };

            this.ws.sendMsg(parameter2, null, this.OIS_S);
          }
          setTimeout(() => {
            this.tcr_3 = true;
          }, 3000);

          break;
        case 4:
          if (this.tcr_4) {
            this.tcr_4 = false;
            if (this.ziji.speakStatus == 1) {
              this.spak_NOT = 2;
            } else {
              this.spak_NOT = 1;
            }

            if (this.make < 6) {
              let parameter3 = {
                cmdCode: "optSpeak",
                peerId: this.log.peerId,
                binderId: this.log.binderId,
                destPeerId: this.ziji.peerId,
                operateType: this.spak_NOT,
              };
              this.ws.sendMsg(parameter3, null, this.Speak_H);
            } else {
              if (this.spak_NOT != 1) {
                let parameter123 = {
                  cmdCode: "optSpeak",
                  peerId: this.log.peerId,
                  binderId: this.log.binderId,
                  destPeerId: this.ziji.peerId,
                  operateType: this.spak_NOT,
                };
                this.ws.sendMsg(parameter123, null, this.Speak_H);
              } else {
                this.tihuan101 = true;

                sessionStorage.setItem(
                  "substitution",
                  JSON.stringify(this.log)
                );
              }
            }
          }
          setTimeout(() => {
            this.tcr_4 = true;
          }, 3000);

          break;
        case 5:
          if (this.tcr_5) {
            this.tcr_5 = false;
            if (this.ziji.speakStatus == 1) {
              //参会者发言状态
              this.spak_NOT = 2;
              let parameter3 = {
                cmdCode: "optSpeak",
                peerId: this.log.peerId,
                binderId: this.log.binderId,
                destPeerId: this.ziji.peerId,
                operateType: this.spak_NOT,
              };
              this.ws.sendMsg(parameter3, null, this.Speak_H);
            } else {
              //参会者未发言状态
              this.spak_NOT = 1;
              let parameter4 = {
                cmdCode: "handsUp",
                peerId: this.log.peerId,
                binderId: this.log.binderId,
                destPeerId: this.ziji.peerId,
                operateType: this.spak_NOT,
              };
              this.ws.sendMsg(parameter4, null, this.hands_S);
            }
          }
          setTimeout(() => {
            this.tcr_5 = true;
          }, 3000);
      }
    },
    tihuan(value) {
      this.tihuan101 = value;
    },
    ask_s(e) {
      if (this.askIndex) {
        this.askIndex = e;
      } else {
        this.askIndex = true;
      }
    },
    //举手
    hands_S(e) {
      //（本质上走得第五个按钮）走得参会者下
      if (e.result == 0) {
        this.major.Render5 = this.major.im10;
        this.major.typeface5 = this.major.s10;
        this.cover.cover5 = true; //举手后，变成举手中；然后不可点击！
        this.ws.addEvent("optSpeak", null, this.Speak_H);
      }
    },
    //发言
    Speak_H(e) {
      if (e.type == "notify") {
        if (this.flag) {
          //转授主持人后 依然得到通知，但选择获取最新会议信息去覆盖，加此标志以此区分，不接受转手主持人后的消息。

          if (e.result == 0) {
            if (e.destPeerId == this.log.peerId) {
              this.ziji.speakStatus = e.operateType;
            } else {
              //不是自己的情况下
              if (e.operateType == 1) {
                this.join.meeting.paticipators.forEach((res) => {
                  if (res.peerId == e.destPeerId) {
                    res.speakStatus = 1;
                  }
                });
              } else {
                this.join.meeting.paticipators.forEach((res) => {
                  if (res.peerId == e.destPeerId) {
                    res.speakStatus = 2;
                  }
                });
              }
            }
          }
        }
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
  watch: {
    join: {
      handler: function (newV, oldV) {
        this.$store.dispatch("set_meetingTime", this.date1.time);
        this.$router.push("/overuse"); //跳转到过度组件
      },
    },
    ziji: {
      deep: true,
      handler: function (newV, oldV) {
        if (newV.micStatus != 1) {
          this.major.Render1 = this.major.im6;
          this.major.typeface1 = this.major.s6;
        } else {
          this.major.Render1 = this.major.im1;
          this.major.typeface1 = this.major.s1;
        }
        if (newV.loudSpeakerStatus != 1) {
          this.major.Render2 = this.major.im7;
          this.major.typeface2 = this.major.s7;
        } else {
          this.major.Render2 = this.major.im2;
          this.major.typeface2 = this.major.s2;
        }
        if (newV.camStaus != 1) {
          this.major.Render3 = this.major.im8;
          this.major.typeface3 = this.major.s8;
        } else {
          this.major.Render3 = this.major.im3;
          this.major.typeface3 = this.major.s3;
        }
        //------发言-----

        if (this.isEmcee) {
          //都在调用这个方法，所以要区分本次点击是不是主持人，然后去去显示对应的图片
          if (newV.speakStatus != 1) {
            this.major.Render4 = this.major.im9;
            this.major.typeface4 = this.major.s9;
          } else {
            this.major.Render4 = this.major.im4;
            this.major.typeface4 = this.major.s4;
          }
        } else {
          //走得第五个按钮的情况下，把计算主持人的初始加入的的图层在这一步给隐藏掉
          this.cover.cover5 = false;
          if (newV.speakStatus == 1) {
            //计算是否成功；（目前是按照自己的请求头（this.si.initial5）去判断；所有的计算都是如此）
            this.major.Render5 = this.major.im4; //正常举手成功后变成取消发言
            this.major.typeface5 = this.major.s4;

            this.cover.cover1 = false;
            this.cover.cover3 = false;
          } else {
            this.major.Render5 = this.major.im5;
            this.major.typeface5 = this.major.s5;
            this.cover.cover1 = true;
            this.cover.cover3 = true;
          }
        }
      },
    },
    roomMode: {
      deep: true,
      handler: function (newV, oldV) {
        switch (newV * 1) {
          case 0:
            this.pattern = "主持模式";
            break;
          case 1:
            this.pattern = "自由模式";
            break;
          case 2:
            this.pattern = "参会模式";
            break;
        }
      },
      immediate: true,
    },
    consent: {
      deep: true,
      handler: function (newV, oldV) {
        this.lift_list = this.lift_list.filter((res) => {
          return res.peerId != newV.peerId;
        });
        this.$store.dispatch("set_ju_ren", this.lift_list); //举手人
        this.$store.dispatch("set_hands", this.lift_list.length); //举手长度
      },
    },
  },
  beforeDestroy() {
    clearInterval(this.clear);
  },
};
</script>
<style lang="less" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

#animat {
  width: 15px;
  height: 15px;
  background: orangered;
  border-radius: 50%;
  animation: mymove 5s infinite;
  -webkit-animation: mymove 5s infinite; /*Safari and Chrome*/
  animation-direction: alternate; /*轮流反向播放动画。*/
  animation-timing-function: ease-in-out; /*动画的速度曲线*/
  /* Safari 和 Chrome */
  -webkit-animation: mymove 5s infinite;
  -webkit-animation-direction: alternate; /*轮流反向播放动画。*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
}
@keyframes mymove {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  20% {
    transform: scale(1.6); /*放大1.1倍*/
  }
  40% {
    transform: scale(1); /*放大1.1倍*/
  }
  60% {
    transform: scale(1.6);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.6);
  }
}
.zong {
  width: 100%;
  height: 100%;
  // background: red;
  // position: absolute;
  // left: 0;
  // top: 0;
}
.bj {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1100;
}

.Management {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1100;
}
.home {
  width: 100%;
  height: 100%;
  background: url(./image/beijing.png) no-repeat;
  background-size: 100% 100%;
  .top {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .t1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 40px;
      margin-top: 24px;

      .s1 {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-left: 20px;
      }
      .inp1 {
        width: 158px;
        height: 50px;
        background: rgba(0, 0, 0, 0);
        border: 1px solid #ffffff;
        border-radius: 25px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-left: 24px;
      }
      .tou1 {
        width: 53px;
        height: 53px;
      }
      .name {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-left: 10px;
      }
    }
    .t2 {
      width: 236px;
      height: 77px;
      border-radius: 20px;
      margin-right: 25px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 24px;
      position: relative;
      .t21 {
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.23;
        border-radius: 20px;
        position: absolute;
        left: 0;
        top: 0;
      }
      .t22 {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        .s1 {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          margin-right: 13px;
        }
        .d1 {
          width: 40px;
        }
      }
    }
  }
  .major {
    width: 100%;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 156px;

    .m1 {
      width: 264px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      .gai {
        width: 100%;
        height: 100%;
        position: absolute;
        background: darkgoldenrod;
        z-index: 100;
        opacity: 0;
      }
      span {
        height: 28px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 13px;
      }
      img {
        width: 264px;
        height: 264px;
        z-index: 1;
      }
      .tcy {
        width: 264px;
        height: 264px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
      .p {
        width: 264px;
        height: 264px;
      }
    }
    .m2 {
      width: 264px;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .gai {
        width: 100%;
        height: 100%;
        position: absolute;
        background: darkgoldenrod;
        z-index: 100;
        opacity: 0;
      }
      span {
        height: 28px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 10px;
      }
      img {
        width: 264px;
        height: 264px;
        z-index: 1;
      }
      .tcy {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
      .p {
        width: 264px;
        height: 264px;
      }
    }
    .m3 {
      width: 264px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .gai {
        width: 100%;
        height: 100%;
        position: absolute;
        background: darkgoldenrod;
        z-index: 100;
        opacity: 0;
      }
      span {
        height: 28px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 13px;
      }
      img {
        width: 264px;
        height: 264px;
        z-index: 1;
      }
      .tcy {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
      .p {
        width: 264px;
        height: 264px;
      }
    }
    .m4 {
      width: 264px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .gai {
        width: 100%;
        height: 100%;
        position: absolute;
        background: darkgoldenrod;
        z-index: 100;
        opacity: 0;
      }
      span {
        height: 28px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 13px;
      }
      img {
        width: 264px;
        height: 264px;
        z-index: 1;
      }
      .tcy {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
      .p {
        width: 264px;
        height: 264px;
      }
    }
    .m5 {
      width: 264px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .gai {
        width: 100%;
        height: 100%;
        position: absolute;
        background: darkgoldenrod;
        z-index: 100;
        opacity: 0;
      }
      span {
        height: 28px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 13px;
      }
      img {
        width: 264px;
        height: 264px;
        z-index: 1;
      }
      .tcy {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
      .p {
        width: 264px;
        height: 264px;
      }
    }
  }
  .function {
    width: 80%;
    height: 162px;
    display: flex;
    align-items: center;
    margin-left: 10%;

    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    // background: red;
    .o1 {
      width: 150px;
      height: 162px;
      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;

      .im1 {
        width: 123px;
        height: 123px;
        background: #000000;
        opacity: 0.25;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -61.5px;
        margin-left: -61.5px;
        z-index: 10;
      }

      .tu1 {
        width: 120px;
        height: 110px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -55px;
        margin-left: -60px;
        z-index: 11;
      }

      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 170px;
      }
    }
    .o1:hover {
      .im1 {
        background: #000000;
        opacity: 0.1;
      }
    }
    .o2 {
      width: 150px;
      height: 162px;
      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;

      .im2 {
        width: 123px;
        height: 123px;
        background: #000000;
        opacity: 0.25;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -61.5px;
        margin-left: -61.5px;
        z-index: 10;
      }

      .tu2 {
        width: 120px;
        height: 110px;
        margin-top: 7px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -55px;
        margin-left: -60px;
        z-index: 11;
      }
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 170px;
      }
    }
    .o2:hover {
      .im2 {
        background: #000000;
        opacity: 0.1;
      }
    }
    .o3 {
      width: 150px;
      height: 162px;
      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;
      .im3 {
        width: 123px;
        height: 123px;
        background: #000000;
        opacity: 0.25;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -61.5px;
        margin-left: -61.5px;
        z-index: 10;
      }
      .im3_1 {
        width: 120px;
        height: 110px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -55px;
        margin-left: -60px;
        z-index: 11;
      }
      .im3_2 {
        width: 120px;
        height: 110px;

        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -55px;
        margin-left: -60px;
        z-index: 11;
      }
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 170px;

        z-index: 11;
      }
    }
    .o3:hover {
      .im3 {
        background: #000000;
        opacity: 0.1;
      }
    }
    .o4 {
      width: 150px;
      height: 162px;
      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;
      .im4 {
        width: 123px;
        height: 123px;
        background: #000000;
        opacity: 0.25;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -61.5px;
        margin-left: -61.5px;
        z-index: 10;
      }
      .tu4 {
        width: 120px;
        height: 110px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -55px;
        margin-left: -60px;
        z-index: 11;
      }
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 170px;

        z-index: 11;
      }
    }
    .o4:hover {
      .im4 {
        background: #000000;
        opacity: 0.1;
      }
    }
    .o5 {
      width: 150px;
      height: 200px;

      margin-top: 70px;
      position: relative;

      //----------------------

      .im123 {
        width: 123px;
        height: 123px;
        position: absolute;
        border-radius: 50%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 30;

        img {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -10px;
          margin-top: -10px;
        }
      }

      ///----------------------

      .im5 {
        width: 123px;
        height: 123px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background: rgba(0, 0, 0, 0.25);
        left: 0;
        top: 0;
        z-index: 20;
        .hui_lu {
          width: 120px;
          height: 110px;
        }
        .yuan {
          width: 93px;
          height: 94px;
        }
        .dian {
          width: 25px;
          height: 25px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -12.5px;
          margin-top: -12.5px;
        }
        .hong {
          margin-left: 10px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -7.5px;
          margin-top: -7.5px;
        }
      }

      .yun {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 30px;
        position: absolute;
        left: 0;
        top: 124px;
      }
    }
    .o5:hover {
      .im5 {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .o6 {
      width: 150px;
      height: 162px;
      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;

      .im6 {
        width: 123px;
        height: 123px;
        background: #000000;
        opacity: 0.25;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -61.5px;
        margin-left: -61.5px;
        z-index: 10;
      }

      .tu6 {
        width: 120px;
        height: 110px;
        margin-top: 7px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -55px;
        margin-left: -60px;
        z-index: 11;
      }
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 170px;

        z-index: 11;
      }
    }
    .o6:hover {
      .im6 {
        background: #000;
        opacity: 0.1;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 150px;

    .b1 {
      width: 120px;
      height: 110px;
    }
    .el-slider {
      width: 390px;
      height: 50px;
    }
  }
}
</style>