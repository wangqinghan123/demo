<template>
  <div class="box">
    <div class="top">
      <span class="s1">发言</span>
      <!-- <p class="s2">当前位置：<span class="s21">五华区/大关街道</span></p> -->

      <button class="s4">全体禁麦</button>
      <button class="s5">全体静音</button>
    </div>
    <div class="content">
      <div class="left">
        <el-tree
          :data="data"
          node-key="id"
          icon-class="null"
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
          <li v-for="(val, index) of list_right" :key="index" class="li_box">
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
            />
            <div class="li_3" @click="tan_click(val)">
              <img src="../image/sheng.png" alt="" />
            </div>

            <div
              class="tan_box"
              v-show="val.yes"
              @mouseleave.stop="chu(val, 1)"
              @mouseover.stop="ru(val, 1)"
            >
              <ul class="tan">
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
            </div>
            <div
              class="tan_box"
              v-show="val.no"
              @mouseleave.stop="chu(val, 2)"
              @mouseover.stop="ru(val, 2)"
            >
              <!-- 不是主持人 -->
              <ul class="tan">
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

      time1: null,
      time2: null,
      //-------防止李征疯狂点击--------
      ass: true,
      mai_f: true,
      yang_f: true,
      she_f: true,
      zhuan_f: true,
      qing_f: true,
      search: null,
      ren: require("../image/ren.png"),
      ren1: require("../image/ren1.png"),
      data: [],
      list_right: [],
    };
  },
  mounted() {
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

    make_click(e) {
      if (this.ass) {
        this.ass = false;
        setTimeout(() => {
          this.ass = true;
        }, 3000);
        e.speakStatus = 2;

        let parameter = {
          cmdCode: "optSpeak",
          peerId: this.log.peerId,
          binderId: this.log.binderId,
          destPeerId: e.peerId,
          operateType: e.speakStatus,
        };
        this.ws.sendMsg(parameter, null, this.assign_S);
      }
    },

    mai(e) {
      let micStatus;
      if (this.mai_f) {
        this.mai_f = false;
        setTimeout(() => {
          this.mai_f = true;
        }, 3000);
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
        this.ws.sendMsg(parameter, null, this.mai_S);
      }
    },

    yang(e) {
      let loudSpeakerStatus;
      if (this.yang_f) {
        this.yang_f = false;
        setTimeout(() => {
          this.yang_f = true;
        }, 3000);
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

        this.ws.sendMsg(parameter1, null, this.yang_S);
      }
    },

    she(e) {
      let camStaus;
      if (this.she_f) {
        this.she_f = false;
        setTimeout(() => {
          this.she_f = true;
        }, 3000);

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

    zhuan(e) {
      //转授主持人，要求传本人id和被传人的id，当前人的信息通过事件加入过来的
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
      }
    },

    qing(e) {
      //逐出发送指令
      if (this.qing_f == true) {
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
    expel_S() {
      this.ws.addEvent("evict", null, this.expel_H);
    },
    expel_H(e) {
      if (e.result == 0) {
        this.quan = this.join.meeting.paticipators.filter((res) => {
          return res.peerId != e.destPeerId;
        });
      }
    },

    vague() {
      let actions7 = /^[0-9]*$/;

      let actions8 = actions7.test(this.search);

      let source = JSON.parse(sessionStorage.getItem("arr1"));
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
      seek: "getSeek",
    }),
  },
  watch: {
    "join.meeting.paticipators": {
      deep: true,
      handler: function (newV, oldV) {
        this.list_right = this.join.meeting.paticipators.filter((res) => {
          return res.speakStatus == 1;
        });
        sessionStorage.setItem("arr1", JSON.stringify(this.list_right));
        this.$store.dispatch("set_make", this.list_right.length);
        this.$store.dispatch("set_Current", this.list_right);
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
          // box-sizing: border-box;
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
            margin-left: 70px;
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