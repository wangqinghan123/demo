<template>
  <div class="round">
    <el-dialog
      :close-on-click-modal="model"
      :visible.sync="dialogTableVisible"
      @close="diaClose"
    >
      <div class="round-patrol">
        <div class="round-left">
          <div class="left-top">
            <span>轮巡设置</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="round-right">
          <div class="right-top">
            <span>轮巡设置</span>
          </div>
          <div class="right-enable">
            <span>启用轮巡</span>
            <el-switch
              class="el-switch"
              :plain="true"
              @change="enable"
              v-model="value3"
            >
            </el-switch>
          </div>
          <div class="right-enId right-Id">
            <span class="id">轮巡登录ID</span>
            <span class="id-content">{{ signInId }}</span>
          </div>
          <div v-show="whetherIndex">
            <div class="right-pattern">轮巡模式</div>
            <div class="pattern">
              <div class="automatic" v-for="(item, index) in list" :key="index">
                <div>
                  <span class="span1">{{ item.name }}</span
                  ><span class="span2">{{ item.title }}</span>
                </div>
                <img
                  v-for="(a, b) in image"
                  :key="b"
                  @click="patrolId(item.mode)"
                  :src="activeIndex === item.mode ? a.select : a.selectGrey"
                  alt=""
                />
              </div>
            </div>
            <div v-show="showIndex">
              <div class="right-enId layout">
                <span>轮巡布局选择</span>
                <div class="right-right">
                  <div
                    class="floatImg"
                    v-for="(item, index) in layoutImg"
                    :key="index"
                    @click="layout(item.id)"
                  >
                    <img :src="item.images" alt="" />
                    <!-- <img :src="item.images" alt="" /> -->
                  </div>
                  <div class="empty"></div>
                </div>
              </div>
              <div class="right-enId interval">
                <span>轮巡间隔</span>
                <div class="flot-flex">
                  <img
                    @click="minus"
                    src="../assets/roundPatrol/subtraction.png"
                  />
                  <div class="second">
                    <span>{{ pollingNum }}</span
                    >秒
                  </div>
                  <img
                    @click="maxus"
                    class="addition"
                    src="../assets/roundPatrol/Addition .png"
                  />
                </div>
              </div>
              <div class="right-enId list" @click="open">
                <span>轮巡列表</span>
                <div class="people">
                  <div class="square">
                    <span>{{ itemLength }}</span
                    >个轮巡方
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <el-button class="confirm" @click="confirmClick" type="primary">
              <div class="que">确认</div></el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <roundPatrol
      :roundshow.sync="roundshow"
      v-bind:username="username"
      @close="close"
    ></roundPatrol>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import roundPatrol from "./patrolList.vue";
export default {
  data() {
    //接受轮巡列表的数据
    this.bus.$on("itemList", (res) => {
      this.itemList = res;

      this.itemLength = this.itemList.length;
    });
    return {
      dialogTableVisible: this.show, //elementui--是否显示轮巡弹框
      value3: true, //是否启用轮巡
      pollingNum: "0", //轮巡间隔秒数
      roomId: "", //房间号
      username: [], //获取会议信息的参会者
      itemList: [], //轮巡列表弹框，返回的选中要轮巡的列表数据
      itemLength: "0", //就是几个轮巡方
      whetherIndex: true, //启用轮巡时显示轮巡模式的值
      showIndex: true, //轮巡模式是custom(定制模式)显示配置参数的值
      signInId: "", //轮巡登录ID
      activeIndex: "default", //轮巡模式的初始值default（自动）
      roundshow: false, //轮巡列表弹框的初始值
      noStatement: [], //自动轮巡的未发言列表
      imageId: "", //轮巡布局选择的初始值
      model: false, //是否可以通过点击 modal 关闭 轮巡弹框
      id: "", //轮巡配置id
      list: [
        //轮巡模式
        {
          name: "自动轮巡",
          title: "(轮巡所有未发言方)",
          id: "1",
          mode: "default",
        },
        {
          name: "定制轮巡",
          title: "(自定义需要轮巡的未发言方)",
          id: "2",
          mode: "custom",
        },
      ],
      image: [
        //轮巡模式的选中状态的图片
        {
          selectGrey: require("../assets/roundPatrol/selectGrey.png"),
          select: require("../assets/roundPatrol/select.png"),
        },
      ],
      layoutImg: [
        //轮巡布局的初始值以及图片展示
        {
          id: "1",
          images: require("../assets/roundPatrol/one.png"),
        },
        {
          id: "4",
          images: require("../assets/roundPatrol/four.png"),
        },
        {
          id: "9",
          images: require("../assets/roundPatrol/nine.png"),
        },
        // {
        //   id: "16",
        //   images: require("../assets/roundPatrol/twelve.png"),
        // },
      ],
    };
  },
  components: {
    roundPatrol, //轮巡列表的弹框
  },

  mounted() {},
  methods: {
    //轮巡列表下的getRommInfo指令的结果
    setCallback(data) {
      // console.log(data);
      if (data.result == 0) {
        this.username = data.meeting.paticipators;
      } else {
        this.$message({
          message: "拉取失败，请重试",
          type: "warning",
        });
      }
    },
    //自动模式下的getRoomInfo指令的结果
    automatic(newResult) {
      // console.log(newResult);
      if (newResult.result == "0") {
        let meeting = [];
        newResult.meeting.paticipators.forEach((item) => {
          // console.log(item);
          if (item.speakStatus == "2") {
            // this.statement.push(item);
            meeting.push(item.peerId);
          }
        });
        this.noStatement = [...new Set(meeting)];
      }
    },
    //轮巡配置变更指令的结果
    robinList(res) {
      // console.log(res);
      this.itemList = [];
      this.pollingNum = "0";
      this.imageId = "";
      this.layout(this.imageId);
      this.itemLength = "0";
    },
    //轮巡布局选择
    layout(value) {
      // console.log(value);
      // if (this.activeIndex == "custom") {
      this.imageId = value;
      if (this.imageId == "1") {
        this.layoutImg[0].images = require("@/assets/roundPatrol/one2.png");
        this.layoutImg[1].images = require("@/assets/roundPatrol/four.png");
        this.layoutImg[2].images = require("@/assets/roundPatrol/nine.png");
        // this.layoutImg[3].images = require("@/assets/roundPatrol/twelve.png");
      } else if (this.imageId == "4") {
        this.layoutImg[1].images = require("@/assets/roundPatrol/four2.png");
        this.layoutImg[0].images = require("@/assets/roundPatrol/one.png");
        this.layoutImg[2].images = require("@/assets/roundPatrol/nine.png");
        // this.layoutImg[3].images = require("@/assets/roundPatrol/twelve.png");
      } else if (this.imageId == "9") {
        this.layoutImg[2].images = require("@/assets/roundPatrol/nine2.png");
        // this.layoutImg[3].images = require("@/assets/roundPatrol/twelve.png");
        this.layoutImg[0].images = require("@/assets/roundPatrol/one.png");
        this.layoutImg[1].images = require("@/assets/roundPatrol/four.png");
      }
      // else if (this.imageId == "16") {
      //   this.layoutImg[3].images = require("@/assets/roundPatrol/sixteen-blue.png");
      //   this.layoutImg[0].images = require("@/assets/roundPatrol/one.png");
      //   this.layoutImg[1].images = require("@/assets/roundPatrol/four.png");
      //   this.layoutImg[2].images = require("@/assets/roundPatrol/nine.png");
      // }
      else {
        this.layoutImg[0].images = require("@/assets/roundPatrol/one.png");
        this.layoutImg[1].images = require("@/assets/roundPatrol/four.png");
        this.layoutImg[2].images = require("@/assets/roundPatrol/nine.png");
        // this.layoutImg[3].images = require("@/assets/roundPatrol/twelve.png");
      }
      // console.log(this.imageId);
      // }
    },
    //确认按钮下的逻辑
    confirmClick() {
      if (this.activeIndex == "custom") {
        //是定制轮巡的下的弹框
        if (this.imageId == "") {
          this.$message({
            message: "轮巡配置失败，布局未选择！",
            type: "warning",
          });
        } else if (this.itemList.length == 0) {
          this.$message({
            message: "轮巡配置失败，轮巡列表未选择！",
            type: "warning",
          });
        } else if (this.pollingNum == "0") {
          this.$message({
            message: "轮巡配置失败，间隔秒数为0！",
            type: "warning",
          });
        } else {
          this.content();
        }
      } else if (this.activeIndex == "default") {
        //自动模式
        this.content();
      }
    },
    //轮巡模式下的接口配置
    content() {
      // console.log(this.itemList);
      this.$emit("update:show", false);
      if (this.value3 == false) {
        this.$emit("update:show", false);
      } else {
        if (this.activeIndex == "default") {
          //自动模式下的接口配置
          this.$Throw
            .partrolTo({
              id: this.id,
              pollPeerId: this.signInId,
              isOpen: this.whetherIndex,
              mode: this.activeIndex,
              layout: "4",
              intervals: "20",
              itemList: this.noStatement,
            })
            .then((res) => {
              // console.log(res);
              if (res.data.code == "0") {
                this.showIndex = false;
                this.imageId = "";
                this.layout(this.imageId);
                this.itemLength = "0"; //(初始化（轮巡布局、轮巡列表、间隔秒数）)
                let parame = {
                  cmdCode: "changePollingConf", //轮巡配置变更
                  peerId: sessionStorage.getItem("peerId"),
                  binderId: sessionStorage.getItem("binderId"),
                  data: {
                    id: this.id,
                    pollPeerId: this.signInId,
                    isOpen: this.whetherIndex,
                    mode: this.activeIndex,
                    layout: "4",
                    intervals: "10",
                    itemList: this.noStatement,
                  },
                };
                this.ws.sendMsg(parame, null, this.robinList);
              } else if (res.data.code == "-2") {
                this.$message({
                  message: "轮巡配置失败，请重新配置！",
                  type: "warning",
                });
                this.$emit("update:show", false);
              }
            })
            .catch((res) => {});
        } else if (this.activeIndex == "custom") {
          //定制轮巡
          // console.log(this.itemList);
          const list = {
            id: this.id,
            pollPeerId: this.signInId,
            isOpen: this.whetherIndex,
            mode: this.activeIndex,
            intervals: this.pollingNum,
            layout: this.imageId,
            itemList: [...this.itemList],
          };
          this.$Throw
            .partrolTo(list)
            .then((res) => {
              // console.log(res);
              if (res.data.code == "0") {
                // console.log(list);
                let parame = {
                  cmdCode: "changePollingConf", //轮巡配置表更
                  peerId: sessionStorage.getItem("peerId"),
                  binderId: sessionStorage.getItem("binderId"),
                  data: list,
                };
                this.ws.sendMsg(parame, null, this.robinList);
              } else if (res.data.code == "-2") {
                this.$message({
                  message: "轮巡配置失败，请重新配置！",
                  type: "warning",
                });
                this.$emit("update:show", false);
              }
            })
            .catch((res) => {});
        }
      }
    },
    //关闭轮巡按钮
    diaClose() {
      this.$emit("update:show", false);
      this.imageId = "";
      this.layout(this.imageId);
      this.pollingNum = "0";
      this.itemList = [];
      this.itemLength = "0";
    },
    //是否启用 (创建) 轮巡
    enable(value) {

      if (value == true) {
        this.whetherIndex = true;
        this.activeIndex = "default";
        if (this.activeIndex == "default") {
          this.showIndex = false;
        }
        //创建
        // console.log(sessionStorage.getItem("peerId"));
        let parameterId = `?roomId=${
          this.roomId
        }&peerId=${sessionStorage.getItem("peerId")}`;
        //创建轮巡接口
        this.$Throw.patrolId({}, parameterId).then((res) => {
          this.signInId = res.data.data.pollPeerId;
          this.id = res.data.data.id;
          this.roomId = res.data.data.roomId;
        });
      } else if (value == false) {
        this.whetherIndex = false;
        //关闭轮巡接口
        this.$Throw.close({}, this.id).then((res) => {
          if (res.data.code == "0") {
            let parame = {
              cmdCode: "changePollingConf", //轮巡配置变更
              peerId: sessionStorage.getItem("peerId"),
              binderId: sessionStorage.getItem("binderId"),
              data: {
                isOpen: false, //轮巡关闭
                pollPeerId: this.signInId,
              },
            };
            this.ws.sendMsg(parame, null, this.robinList);
            this.signInId = "";
            this.$message({
              message: "警告轮巡已关闭!",
              type: "warning",
            });
            // this.$message({
            //   type:"warning",
            //   dangerouslyUseHTMLString: true,
            //   message:
            //     '<strong class="message-layout">警告 <i>轮巡</i> 已关闭</strong>',
            // });
          }
        });
      }
    },
    //关闭轮巡列表弹框
    close() {
      this.roundshow = false;
      this.show = true;
    },
    //轮巡列表的弹框
    open() {
      let that = this;
      that.show = true;
      that.roundshow = true;
      let parameter = {
        cmdCode: "getRoomInfo",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
      };
      that.ws.sendMsg(parameter, null, that.setCallback);
    },
    //轮巡间隔秒数的加
    maxus() {
      if (this.pollingNum == 180) {
        return this.pollingNum;
      } else {
        this.pollingNum = this.pollingNum - 0 + 5;
      }
    },
    //轮巡间隔秒数的减
    minus() {
      if (this.pollingNum <= 0) {
        return (this.pollingNum = 0);
      } else {
        this.pollingNum = this.pollingNum - 0 - 5;
      }
    },
    //轮巡模式
    patrolId(mode) {
      this.activeIndex = mode;
      if (this.activeIndex == "default") {
        //自动模式下获取的轮巡列表的信息
        this.imageId = "";
        this.pollingNum = "0";
        this.showIndex = false;
        let parameter = {
          cmdCode: "getRoomInfo",
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
        };
        this.ws.sendMsg(parameter, null, this.automatic);
      } else if (this.activeIndex == "custom") {
        //定制模式下的显示（布局、间隔秒数、轮巡列表）
        this.showIndex = true;
      }
    },
  },
  props: {
    //轮巡弹框的值（home页面传过来的）
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      log: "getLog",
    }),
  },
  watch: {
    deep: true,
    show() {
      this.dialogTableVisible = this.show; //轮巡弹框的值（home页面传过来的
      let id = this.join.meeting.roomId;
      this.roomId = id;
      if (this.show == true) {
        this.patrolId(this.activeIndex); //获取轮巡模式的值并改变
        this.$Throw
          .patrol({}, id) //获取轮巡配置参数
          .then((res) => {
            // console.log(res);
            if (res.data.data == null) {
              this.value3 = false; //关闭轮巡
              if (this.value3 == true) {
                this.whetherIndex = true; //轮巡模式是否显示
              } else {
                this.whetherIndex = false;
                this.signInId = "";
              }
            } else if (res.data.code == 0) {
              this.id = res.data.data.id;
              this.signInId = res.data.data.pollPeerId;
              this.activeIndex = res.data.data.mode;
              if (this.activeIndex == "custom") {
                this.showIndex = true;
                this.pollingNum = res.data.data.intervals;
                this.imageId = res.data.data.layout;
                this.itemLength = res.data.data.itemList.length;
                this.itemList = res.data.data.itemList;
                this.layout(this.imageId);
              } else if (this.activeIndex == "default") {
                this.showIndex = false;
              }
            }
          })
          .catch(() => {});
      }
    },
  },
};
</script>
<style lang="less">
.round {
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // left: 0;
  // top: 0;

  .el-dialog {
    width: 1354px;
    height: 891px;
    position: absolute;
    top: 345px;
    left: 283px;
    margin-top: -245.5px !important;
    border-radius: 40px !important;

    .el-dialog__body {
      padding: 0px;
    }
    .el-dialog__header {
      padding: 0px;
      .el-dialog__headerbtn {
        font-size: 37px;
        color: #2b2e3c;
        //  .el-dialog__close .el-icon .el-icon-close{
        //    color: #2B2E3C;
        //  }
      }
    }
  }
  .confirm {
    width: 154px;
    height: 63px;
    background: #2d97e1;
    border-radius: 4px;
    margin-top: 20px;
    float: right;
    margin-right: 40px;
    .que {
      width: 50px;
      height: 25px;
      margin: 0 auto;
      font-size: 26px;
      margin-top: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 5px;
    }
  }
}

// .message-layout {
//   width: 350px;
//   font-size: 26px;
// }
//提示的样式
.el-message {
  width: 500px;
  // background: red;
  // border: 1px solid red;
}
.el-message__content {
  font-size: 26px;
}
.el-message__icon {
  font-size: 26px;
}
.round-patrol {
  width: 100%;
  display: inline-flex;
  border-radius: 40px;
  .round-left {
    width: 23%;
    height: 891.1px;
    border-radius: 40px 40px 0px 40px;
    background-color: #2b2e3c;
    .left-top {
      width: 100%;
      height: 70px;
      background: #383c4d;
      display: flex;
      border-radius: 40px 0px 0px 0px;
      justify-content: space-between;
      span {
        display: inline-block;
        font-size: 26px;
        color: white;
        margin-top: 19px;
        margin-left: 32px;
      }
      .el-icon-arrow-right {
        color: #2d97e1;
        margin-top: 25px;
        margin-right: 30px;
        font-size: 26px;
      }
    }
    .left-top:hover {
      cursor: pointer;
    }
  }
  .round-right {
    width: 77%;
    background: white;
    border-radius: 40px;

    .right-pattern {
      font-size: 26px;
      margin-top: 20px;
      margin-left: 38px;
      color: black;
    }
    .list {
      color: black;
      span {
        margin-left: 25px;
        font-size: 26px;
      }
      .people {
        display: inline-flex;
        margin-right: 55px;
        font-size: 26px;
        .square {
          margin-right: 10px;
        }
        .el-icon-arrow-right {
          font-size: 30px;
          color: rgb(208, 207, 207);
        }
      }
    }
    .list:hover {
      cursor: pointer;
    }
    .interval {
      .flot-flex {
        display: inline-flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
        }
        .addition {
          margin-right: 55px;
        }
        .second {
          width: 85px;
          height: 43px;
          background: rgba(0, 0, 0, 0);
          border: 1px solid #e3e3e3;
          border-radius: 5px;
          font-size: 26px;
          line-height: 43px;
          color: black;
          padding-right: 12px;
          margin-right: 15px;
        }
      }
      span {
        margin-left: 25px;
        font-size: 26px;
        color: black;
      }
    }
    .layout {
      span {
        margin-left: 25px;
        font-size: 26px;
        color: black;
      }
      img {
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }
      .right-right {
        display: inline-flex;
        .empty {
          width: 40px;
          height: 30px;
          // background: red;
        }
        .floatImg {
          display: inline-flex;
        }
      }
    }
    .pattern {
      margin-top: 20px;
      img {
        width: 30px;
        height: 30px;
        margin-right: 55px;
      }
      .automatic {
        width: 95.7%;
        height: 65px;
        border-left: 1px solid rgb(230, 228, 228);
        border-top: 1px solid rgb(230, 228, 228);
        border-radius: 7px 0px 0px 0px;
        // border-bottom: 1px solid rgb(230, 228, 228);
        margin-left: 38px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;

        .span1 {
          margin-left: 25px;
          font-size: 26px;
          color: black;
        }
        .span2 {
          margin-left: 10px;
          font-size: 24px;
        }
      }
    }
    .right-top {
      width: 100%;
      height: 88px;
      border-bottom: 1px solid rgb(230, 228, 228);
      span {
        display: inline-block;
        margin-top: 40px;
        margin-left: 38px;
        font-size: 26px;
        color: black;
      }
    }
    .right-enId {
      width: 95.7%;
      height: 65px;
      border-bottom: 1px solid rgb(230, 228, 228);
      border-left: 1px solid rgb(230, 228, 228);
      border-top: 1px solid rgb(230, 228, 228);
      border-radius: 7px 0px 0px 7px;
      margin-left: 38px;
      margin-top: 20px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
    }
    .right-Id {
      color: black;
      .id {
        margin-left: 25px;
        font-size: 26px;
      }
      .id-content {
        font-size: 26px;
        margin-right: 55px;
      }
    }
    .right-enable {
      width: 95.7%;
      height: 65px;
      border-bottom: 1px solid rgb(230, 228, 228);
      border-left: 1px solid rgb(230, 228, 228);
      border-top: 1px solid rgb(230, 228, 228);
      border-radius: 7px 0px 0px 7px;
      margin-left: 38px;
      margin-top: 38px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-left: 25px;
        font-size: 26px;
        color: black;
      }
      .el-switch {
        margin-right: 55px;
      }
    }
  }
}
</style>