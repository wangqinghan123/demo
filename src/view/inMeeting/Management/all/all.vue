<template>
  <div class="box">
    <div class="top">
      <span class="s1">全部参会方</span>

      <button class="s4" @click="all_mai" v-if="isEmcee">全体禁麦</button>
      <button class="s5" @click="all_yin" v-if="isEmcee">全体静音</button>
    </div>
    <div class="content">
      <div class="left">
        <el-tree
          :data="data"
          node-key="id"
          icon-class="null"
          @node-click="nodeclick"
          accordion
          :props="{
            children: 'subNode',
            label: 'name',
          }"
        >
        </el-tree>
      </div>

      <div class="right">
        <div class="right_top">
          <input
            type="text"
            v-model="search"
            class="right_top_input"
            @input="vague"
          />
          <img src="../image/sousuo.png" alt="加载失败" class="right_top_img" />
        </div>

        <ul>
          <li v-for="val of list_right" :key="val.peerId" class="li_box">
            <div class="li_1">
              <span class="li_11">{{ val.userName }}</span>
              <img
                src="../image/zhuchi.png"
                alt=""
                class="li_12"
                v-if="val.peerId == log.peerId"
              />
            </div>
            <img
              :src="val.speakStatus == 1 ? ren1 : ren"
              alt=""
              class="li_2"
              @click="make_click(val)"
              v-if="isEmcee"
            />
            <div class="li_3" @click="tan_click(val)" v-if="isEmcee">
              <img src="../image/sheng.png" alt="" />
            </div>
            <!-- 以下是弹窗 -->

            <div
              class="tan_box"
              v-show="val.yes"
              @mouseleave.stop="chu(val, 1)"
              @mouseover.stop="ru(val, 1)"
            >
              <ul class="tan" v-show="val.speakStatus == 1">
                <li @click="mai(val)">
                  {{ val.micStatus == 1 ? "关闭麦克风" : "打开麦克风" }}
                </li>
                <li @click="yang(val)">
                  {{ val.loudSpeakerStatus == 1 ? "关闭扬声器" : "打开扬声器" }}
                </li>
                <li @click="she(val)">
                  {{ val.camStaus == 1 ? "关闭摄像头" : "打开摄像头" }}
                </li>
              </ul>
              <ul class="tan" v-show="val.speakStatus == 2">
                <li>请先发言</li>
              </ul>
            </div>
            <div
              class="tan_box"
              v-show="val.no"
              @mouseleave.stop="chu(val, 2)"
              @mouseover.stop="ru(val, 2)"
            >
              <!-- 不是主持人 -->
              <ul class="tan" v-show="val.speakStatus == 1">
                <li @click="mai(val)">
                  {{ val.micStatus == 1 ? "关闭麦克风" : "打开麦克风" }}
                </li>
                <li @click="yang(val)">
                  {{ val.loudSpeakerStatus == 1 ? "关闭扬声器" : "打开扬声器" }}
                </li>
                <li @click="she(val)">
                  {{ val.camStaus == 1 ? "关闭摄像头" : "打开摄像头" }}
                </li>
                <li @click="zhuan(val)">转授主持人</li>
                <li @click="qing(val)">请出会议室</li>
              </ul>
              <ul class="tan" v-show="val.speakStatus == 2">
                <li @click="zhuan(val)">转授主持人</li>
                <li @click="qing(val)">请出会议室</li>
              </ul>
            </div>
          </li>
        </ul>
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
      quan: null, //全部参会方
      //---------新版--------------
      search: null, //搜索
      data: [], //组织架构的数据
      ren: require("../image/ren.png"),
      ren1: require("../image/ren1.png"),
      ass: true, //关于指控发言的防抖
      list_right: [], //列表v-for的数据
      //滑入滑出的定时器
      time1: null,
      time2: null,
      //麦扬摄转请的防抖
      mai_s: true,
      yang_s: true,
      she_f: true,
      zhuan_f: true,
      qing_f: true,
    };
  },

  mounted() {
    //请求组织架构
    this.$Throw.login().then((mark) => {
      //请求当前的自己的唯一标识符
      if (mark.data.code == 0) {
        const Id = mark.data.data.company.nodeId;
        this.$Throw.organList({}, this.log.companyId).then((zu) => {
          //请求组织架构
          if (zu.data.code == 0) {
            const zu_result = zu.data.data;
            switch (Id) {
              case zu_result.id:
                this.data.push(zu_result);
                break;
              case zu_result.subNode[0].id:
                this.data.push(zu_result.subNode[0]);

                break;
              case zu_result.subNode[0].subNode[0].id:
                this.data.push(zu_result.subNode[0].subNode[0]);

                break;
              case zu_result.subNode[0].subNode[0].subNode[0].id:
                this.data.push(zu_result.subNode[0].subNode[0].subNode[0]);

                break;
              case zu_result.subNode[0].subNode[0].subNode[0].subNode[0].id:
                this.data.push(
                  zu_result.subNode[0].subNode[0].subNode[0].subNode[0]
                );
                break;
            }
          }
        });
      }
    });
  },
  methods: {
    make_click(e) {
      if (this.ass) {
        this.ass = false;
        setTimeout((res) => {
          this.ass = true;
        }, 3000);

        this.make_e = e;
        let parameter = {
          cmdCode: "getRoomInfo", //会议信息
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
        };
        this.ws.sendMsg(parameter, null, this.getRoomInfo_back);
      }
    },
    getRoomInfo_back(e) {
      if (e.meeting.roomMode == 0) {
        //主持模式
        e.meeting.paticipators.forEach((res) => {
          if (res.peerId == this.ziji.peerId) {
            if (res.dataShareStatus == 2) {
              //没有开启数据共享
              if (this.make_e.speakStatus == 1) {
                this.ppp = 2;
              } else {
                this.ppp = 1;
              }
              if (this.make < 6) {
                let parameter = {
                  cmdCode: "optSpeak",
                  peerId: this.log.peerId,
                  binderId: this.log.binderId,
                  destPeerId: this.make_e.peerId,
                  operateType: this.ppp,
                };
                this.ws.sendMsg(parameter, null, this.assign_S);
              } else {
                if (this.ppp != 1) {
                  let parameter123 = {
                    cmdCode: "optSpeak",
                    peerId: this.log.peerId,
                    binderId: this.log.binderId,
                    destPeerId: this.make_e.peerId,
                    operateType: this.ppp,
                  };
                  this.ws.sendMsg(parameter123, null, this.assign_S);
                } else {
                  this.$parent.$parent.tihuan(true);
                  sessionStorage.setItem(
                    "substitution",
                    JSON.stringify(this.make_e)
                  );
                }
              }
            } else {
              //开启数据共享
              if (this.make_e.speakStatus == 1) {
                this.ppp = 2;
              } else {
                this.ppp = 1;
              }
              if (this.make < 5) {
                let parameter = {
                  cmdCode: "optSpeak",
                  peerId: this.log.peerId,
                  binderId: this.log.binderId,
                  destPeerId: this.make_e.peerId,
                  operateType: this.ppp,
                };
                this.ws.sendMsg(parameter, null, this.assign_S);
              } else {
                if (this.ppp != 1) {
                  let parameter123 = {
                    cmdCode: "optSpeak",
                    peerId: this.log.peerId,
                    binderId: this.log.binderId,
                    destPeerId: this.make_e.peerId,
                    operateType: this.ppp,
                  };
                  this.ws.sendMsg(parameter123, null, this.assign_S);
                } else {
                  this.$parent.$parent.tihuan(true);

                  console.log("0.0");
                  sessionStorage.setItem(
                    "substitution",
                    JSON.stringify(this.make_e)
                  );
                }
              }
            }
          }
        });
      } else {
        //自由模式
        if (this.make_e.speakStatus == 1) {
          this.ppp = 2;
        } else {
          this.ppp = 1;
        }
        let parameter = {
          cmdCode: "optSpeak",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: this.make_e.peerId,
          operateType: this.ppp,
        };
        this.ws.sendMsg(parameter, null, this.assign_S);
      }
    },
    tan_click(e) {
      //判断是否是主持人？
      if (e.peerId == this.log.peerId) {
        this.$set(e, "yes", true);
        this.time1 = setTimeout(() => {
          this.$set(e, "yes", false);
        }, 3000);
      } else {
        this.$set(e, "no", true);
        this.time2 = setTimeout(() => {
          this.$set(e, "no", false);
        }, 3000);
      }
    },
    nodeclick(val, node) {
      this.list_right = [];
      this.$Throw.contact({}, val.id).then((res) => {
        let result1 = res.data.data.filter((res) => {
          return res.type != "node";
        });
        if (result1.length != 0) {
          this.quan.forEach((res) => {
            result1.forEach((res1) => {
              if (res1.peerId == res.peerId) {
                this.list_right.push(res);
              }
            });
          });
        }

        sessionStorage.setItem("arr", JSON.stringify(this.list_right));
      });
    },

    //滑入，滑出
    ru(e, num) {
      if (num == 1) {
        clearTimeout(this.time1);
      } else {
        clearTimeout(this.time2);
      }
    },
    chu(e, num) {
      if (num == 1) {
        e.yes = false;
      } else {
        e.no = false;
      }
    },
    mai(e) {
      if (this.mai_s) {
        this.mai_s = false;
        setTimeout(() => {
          this.mai_s = true;
        }, 3000);
        let micStatus;
        if (e.micStatus == 1) {
          micStatus = 2;
        } else {
          micStatus = 1;
        }

        let parameter = {
          cmdCode: "optMicrophone",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: e.peerId,
          operateType: micStatus,
        };

        this.ws.sendMsg(parameter, null, this.mai_h);
      }
    },

    yang(e) {
      if (this.yang_s) {
        this.yang_s = false;
        setTimeout((res) => {
          this.yang_s = true;
        }, 3000);
        let loudSpeakerStatus;
        if (e.loudSpeakerStatus == 1) {
          loudSpeakerStatus = 2;
        } else {
          loudSpeakerStatus = 1;
        }

        let parameter1 = {
          cmdCode: "optLoudSpeaker",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: e.peerId,
          operateType: loudSpeakerStatus,
        };

        this.ws.sendMsg(parameter1, null, this.yang_h);
      }
    },

    she(e) {
      if (this.she_f) {
        this.she_f = false;
        setTimeout((res) => {
          this.she_f = true;
        }, 3000);
        let camStaus;
        if (e.camStaus == 1) {
          camStaus = 2;
        } else {
          camStaus = 1;
        }

        let parameter2 = {
          cmdCode: "optCamera",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: e.peerId,
          operateType: camStaus,
        };
        this.ws.sendMsg(parameter2, null, this.she_S);
      }
    },
    //转授主持人，要求传本人id和被传人的id，当前人的信息通过事件加入过来的
    zhuan(e) {
      if (this.zhuan_f) {
        this.zhuan_f = false;
        setTimeout(() => {
          this.zhuan_f = true;
        }, 3000);
        let parameter = {
          cmdCode: "changeManager",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          newManagerId: e.peerId,
        };
        this.ws.sendMsg(parameter, null, this.Manager_S);
        this.$store.dispatch("set_flag", false);
      }
    },
    qing(e) {
      if (this.qing_f) {
        this.qing_f = false;
        setTimeout(() => {
          this.qing_f = true;
        }, 3000);

        let parameter = {
          cmdCode: "evict",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: e.peerId,
        };
        this.ws.sendMsg(parameter, null, this.expel_S);
      }
    },
    expel_S(e) {
      if (e.result == 0) {
        this.ws.addEvent("evict", null, this.expel_H);
      }
    },
    expel_H(e) {
      if (e.result == 0) {
        //从quan里过滤掉
        this.quan = this.join.meeting.paticipators.filter((res) => {
          return res.peerId != e.destPeerId;
        });
      }
    },
    all_mai() {
      let verify;
      if (this.verify == 1) {
        verify = 2;
      } else {
        verify = 1;
      }
      let query = {
        cmdCode: "optAllMicrophone",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        operateType: verify,
      };
      this.ws.sendMsg(query, null, this.mai_S);
    },
    all_yin() {
      let verify1;
      if (this.verify1 == 1) {
        verify1 = 2;
      } else {
        verify1 = 1;
      }
      let query = {
        cmdCode: "optAllLoudSpeaker",
        peerId: this.log.peerId,
        binderId: this.log.binderId,
        operateType: verify1,
      };
      this.ws.sendMsg(query, null, this.yin_S);
    },
    //模糊搜索
    vague() {
      let actions7 = /^[0-9]*$/;

      let actions8 = actions7.test(this.search);

      let source = JSON.parse(sessionStorage.getItem("arr"));
      let arr = [];
      if (actions8) {
        source.forEach((res) => {
          if (res.peerId.toString().indexOf(this.search) != -1) {
            arr.push(res);
          }
        });
      } else {
        source.forEach((res) => {
          if (res.userName.indexOf(this.search) != -1) {
            arr.push(res);
          }
        });
      }

      this.list_right = arr;
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      ziji: "getZiji",
      seek: "getSeek", //本地搜索筛选出来的数据
      isEmcee: "getIsEmcee",
      make: "get_make", //发言_length
      isEmcee: "getIsEmcee", //是否是主持人
    }),
  },
  watch: {
    "join.meeting.paticipators": {
      deep: true,
      handler: function (newV, oldV) {
        this.quan = newV; //触发join 都会重新赋值

        let make_length = this.join.meeting.paticipators.filter((res) => {
          return res.speakStatus == 1;
        });
        this.$store.dispatch("set_make", make_length.length);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  // background: pink;
  border-radius: 0px 0px 20px 20px;
  .top {
    width: 100%;
    height: 76px;
    background: #f6f6f6;
    display: flex;
    align-items: center;
    .s1 {
      width: 120px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 26px;
    }
    .s2 {
      width: 250px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 152px;
    }
    .s3 {
      width: 155px;
      height: 44px;
      background: rgba(45, 151, 225, 0);
      border: 1px solid #2d97e1;
      border-radius: 3px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #2d97e1;
      margin-left: 83px;
    }
    .s4 {
      width: 175px;
      height: 47px;
      background: #dfdfdf;
      border: none;
      border-radius: 10px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 700px;
    }
    .s5 {
      width: 175px;
      height: 47px;
      background: #dfdfdf;
      border: none;
      border-radius: 10px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 45px;
    }
  }
  .content {
    width: 100%;
    height: 614px;
    border-radius: 0 0 20px 20px;
    display: flex;
    .left {
      width: 23.5%;
      height: 100%;
      border-right: solid 1px #d8d8d8;
      /deep/.el-tree-node__content {
        height: 38px;
      }
      /deep/.el-tree-node__label {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000;
      }
    }
    .right {
      width: 76.5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      .right_top {
        width: 100%;
        height: 46px;
        margin-top: 16px;
        margin-left: 46px;
        position: relative;
        position: absolute;
        left: 0;
        top: 0;

        .right_top_input {
          width: 380px;
          height: 100%;
          border: 1px solid #cccccc;
          outline: none;
          border-radius: 5px;

          text-indent: 2em;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .right_top_img {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 337px;
          top: 50%;
          margin-top: -10px;
        }
      }
      ul {
        width: 100%;
        height: 100%;
        overflow: auto;
        margin-top: 60px;
        .li_box {
          width: 91%;
          height: 110px;
          display: flex;
          align-items: center;
          margin-left: 4.5%;
          border-bottom: solid 1px #d8d8d8;
          position: relative;
          .li_1 {
            width: 400px;
            height: 28px;
            display: flex;
            align-items: center;
            .li_11 {
              font-size: 22px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #333333;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .li_12 {
              margin-left: 13px;
            }
          }
          .li_2 {
            width: 26px;
            margin-left: 327px;
          }
          .li_3 {
            width: 30px;
            height: 20px;
            margin-left: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .tan_box {
            width: 144px;
            height: 246px;
            position: absolute;
            right: 0px;
            top: 70px;
            background: rgba(0, 0, 0, 0.75);
            border-radius: 5px;
            z-index: 1;
            .tan {
              display: flex;
              flex-direction: column;
              margin: 0;
              li {
                width: 100%;
                height: 25px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #2ba5fa;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>