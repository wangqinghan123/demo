<template>
  <div class="tihuan">
    <div class="bei101"></div>
    <div class="ask">
      <div class="left">
        <div class="left_top">
          <input
            type="text"
            v-model="input1"
            class="inp"
            :placeholder="hint1"
            @focus="get_id(1)"
            @blur="lose_id(1)"
            @keyup.enter="enter()"
          />

          <img
            src="../../Information/image/input1_sou.png"
            alt=""
            class="sou"
            @click="enter()"
          />
        </div>
        <div class="left_center">
          <p>{{ firmName }}</p>
        </div>
        <div class="left_bottom">
          <el-tree
            :data="data_address"
            @node-click="handleNodeClick"
            :props="{ label: 'name', children: 'subNode' }"
          ></el-tree>

          <el-tree
            :data="data_firm"
            @node-click="handleNodeClick_firm"
            :props="{ label: 'name', children: 'subNode' }"
          ></el-tree>
        </div>
      </div>
      <div class="center">
        <!-- <div class="center_top">
        <p>全选</p>
        <img src="../image/weixuan.png" alt="" />
      </div> -->
        <ul>
          <li v-for="(value, index) in center_list" :key="index">
            <div class="zuo">
              <img
                src="../../Information/image/jiagou.png"
                alt=""
                v-if="value.type == 'node'"
                class="im"
              />
              <img
                src="../../Information/image/yh（tu）.png"
                v-else
                alt=""
                class="im"
              />
              <span class="zi">{{ value.name }}</span>
            </div>

            <img
              src="../../Information/image/yixuan.png"
              alt=""
              class="img"
              v-if="value.show_xuan"
              @click="show(value)"
            />
            <img
              src="../../Information/image/weixuan.png"
              alt=""
              class="img"
              v-else
              @click="show(value)"
            />
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="right-top">
          <p class="sp">
            已勾选了<span>{{ right_list.length }}</span
            >个联系人
          </p>
          <img
            @click="askClose"
            src="../../Information/image/cha.png"
            alt=""
            class="cha"
          />
        </div>
        <div class="right-search">
          <input
            type="text"
            v-model="input2"
            class="inp"
            :placeholder="hint2"
            @focus="get_id(2)"
            @blur="lose_id(2)"
            maxlength="10"
          />
          <button class="btn" @click="add()">添加</button>
          <div class="tan" v-show="visible">
            <h1>添加失败，请检查会议号是否正确！</h1>
            <div class="triangle"></div>
          </div>
        </div>
        <ul>
          <li v-for="(value, index) in right_list" :key="index">
            <span class="span">{{ value.name }}</span>
            <img
              src="../../Information/image/cuo.png"
              alt=""
              class="cuo"
              @click="cuo(value)"
            />
          </li>
        </ul>
        <div class="confirm111">
          <button class="b" @click="askClose">取消</button>
          <button class="c" @click="Invitation">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      check: false, //短信通知的是否勾选
      log: JSON.parse(sessionStorage.getItem("log")),
      hint1: "输入搜索信息", //模糊提示
      hint2: "请输入视讯号添加",
      firmName: "中国银行", //企业名字;

      input1: null, //input的值
      input2: null,
      data_firm: [], //组织架构
      data_address: [{ name: "个人通讯录", subNode: [] }], //个人通讯录
      center_list: "", //center循环的数据
      right_list: [], //right渲染列表

      visible: false, //弹框
    };
  },
  mounted() {
    this.$Throw.organList({}, this.log.companyId).then((res) => {
      if (res.status == 200) {
        this.data_firm.push(res.data.data);
        this.firmName = res.data.data.name;
      }
    }); //请求部门架构

    this.$Throw
      .getAddress({
        pageSize: 99999,
        pageNum: 1,
        token: this.log.token,
      })
      .then((res) => {
        this.data_address[0].subNode = res.data.data.list;
      }); //请求个人讯录的数据
  },
  methods: {
    //----------预约的指令---------------
    Invitation() {
      let arr_yao = [];
      let can = this.parameter;
      this.right_list.forEach((res) => {
        arr_yao.push(res.peerId.toString());
      });
      can.inviteUsers = arr_yao;
      //预约里邀请的人员信息

      this.$Throw.found(can).then((res) => {
        if (res.data.code == 0) {
          this.askClose();
          this.$store.dispatch("set_sign", "0"); //改变状态去刷新列表；
        }
        // let parameter = {
        //   cmdCode: "joinRoom",
        //   peerId: this.log.peerId,
        //   binderId: this.log.binderId,
        //   roomId: res.data.data.roomId,
        // };
        // this.ws.sendMsg(parameter, null, this.join_S);
      });
    },

    Invitation_res(e) {
      console.log(e);
    },

    //-------------------------------

    //左侧搜索框的事件
    che() {
      console.log(this.check);
    },
    enter() {
      //搜索框事件
      let parent = {
        pageSize: 9999,
        pageNum: 1,
        realName: this.input1,
      };

      this.$Throw.invite_input(parent, this.log.companyId).then((res) => {
        if (res.data.code == 0) {
          this.center_list = res.data.data.list;
          this.center_list.forEach((res) => {
            this.$set(res, "show_xuan", false);
          });
        }
      });
    },
    askClose() {
      this.$parent.show2_s(false);
    },
    //焦点事件
    lose_id(e) {
      if (e == 1) {
        this.hint1 = "输入搜索信息";
      } else {
        this.hint2 = "请输入视讯号添加";
      }
    },
    get_id(e) {
      if (e == 1) {
        this.hint1 = "";
      } else {
        this.hint2 = "";
      }
    },
    //-----------------
    handleNodeClick(val) {
      if (val.subNode != undefined) {
        this.center_list = val.subNode;
        this.center_list.forEach((res) => {
          this.$set(res, "show_xuan", false);
        });
      }
    },
    handleNodeClick_firm(data) {
      //请求组织架构下的部门与人员

      this.$Throw.contact({}, data.id).then((res) => {
        this.center_list = res.data.data;
        this.center_list.forEach((res) => {
          this.$set(res, "show_xuan", false);
        });
      });
    },
    show(e) {
      if (e.type == "node") {
        if (e.show_xuan) {
          e.show_xuan = false;

          this.$Throw.department({}, e.id).then((res) => {
            if (res.data.code == 0) {
              let data = res.data.data;
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < this.right_list.length; j++) {
                  if (data[i].id == this.right_list[j].id) {
                    this.right_list.splice(j, 1);
                  }
                }
              }
            } else {
              console.log("res的code值不是0，是：", res.data.code);
            }
          });
        } else {
          e.show_xuan = true;

          this.$Throw.department({}, e.id).then((res) => {
            if (res.data.code == 0) {
              this.right_list.push(...res.data.data);
            } else {
              console.log("res的code值不是0，是：", res.data.code);
            }
          });
        }
      } else {
        if (e.show_xuan) {
          e.show_xuan = false;
          this.right_list = this.right_list.filter((res) => {
            return res.id != e.id;
          });
        } else {
          e.show_xuan = true;
          this.right_list.push(e);
        }
      }
    },
    cuo(e) {
      e.show_xuan = false;
      this.right_list = this.right_list.filter((res) => {
        return res.peerId != e.peerId;
      });
    },
    add() {
      let parent = [this.input2];
      this.$Throw.invite_input2(parent).then((res) => {
        if (res.data.code != 0) {
          this.visible = true;
          setTimeout(() => {
            this.visible = false;
          }, 3000);
        } else {
          this.right_list.push(...res.data.data);
          this.input2 = "";
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      // join: "getJoin",
      // ziji: "getZiji",
      // roomMode: "get_roomMode",
      // Current: "get_Current",
      parameter: "get_parameters",
    }),
  },
};
</script>
<style lang="less" scoped>
.bei101 {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.72;
  position: absolute;
  left: 0;
  top: 0;
}
.ask {
  width: 1276px;
  height: 793px;
  background: #ffffff;
  box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.64);
  border-radius: 20px;
  position: absolute;
  left: 372px;
  top: 146px;
  z-index: 50;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -638px;
  margin-top: -396.5px;

  .left {
    width: 377px;
    height: 100%;
    border-right: solid 1px #e3e3e3;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .left_top {
      width: 100%;
      height: 86px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .inp {
        width: 326px;
        height: 50px;
        background: rgba(2, 179, 252, 0);
        border: 1px solid #c4c4c4;
        border-radius: 25px;
        outline: none;
        text-indent: 2em;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .sou {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 50px;
        top: 26px;
      }
    }
    .left_center {
      width: 100%;
      height: 60px;
      border: solid 1px #e3e3e3;
      border-left: none;
      border-right: none;
      display: flex;
      align-items: center;

      p {
        width: 161px;
        height: 23px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 18px;
        margin-left: 28px;
      }
    }
    .left_bottom {
      width: 90%;
      height: 756px;
      margin-top: 20px;
      display: auto;

      /deep/ .el-tree-node__content {
        height: 50px;
      }
      .el-tree {
        /deep/.el-icon-caret-right {
          width: 12px;
          height: 11px;
          background: url(../../Information/image/xiala.png);
          background-size: 24px;
          margin-right: 10px;
        }
        /deep/.el-tree-node__expand-icon.expanded {
          transform: rotate(180deg);
        }
        /deep/.el-icon-caret-right:before {
          display: none;
        }
        /deep/.el-tree-node__label {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
        }
      }
    }
  }
  .center {
    width: 435px;
    height: 100%;

    border-right: solid 1px #e3e3e3;
    .center_top {
      width: 100%;
      height: 74px;
      // border-bottom: solid 1px #e3e3e3;
      display: flex;
      align-items: center;
      justify-content: right;
      p {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        margin-right: 10px;
      }
      img {
        width: 32px;
        margin-right: 24px;
      }
    }
    ul::-webkit-scrollbar {
      width: 0 !important;
    }
    ul {
      width: 100%;
      height: 713px;
      overflow: auto;
      margin-top: 30px;

      li {
        width: 98%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .zuo {
          display: flex;
          align-items: center;
          .im {
            width: 32px;
            margin-left: 20px;
          }
          .zi {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            margin-left: 20px;
          }
        }

        .img {
          width: 32px;
          height: 32px;
          margin-right: 15px;
        }
      }
    }
  }
  .right {
    width: 462px;
    height: 100%;

    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

    .right-top {
      width: 100%;

      display: flex;
      align-items: center;
      margin-top: 20px;

      .sp {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        margin-left: 38px;
        span {
          color: blue;
          margin-left: 5px;
          margin-right: 5px;
        }
      }
      .cha {
        width: 28px;

        margin-left: 160px;
      }
    }
    .right-search {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      .inp {
        width: 295px;
        height: 50px;
        background: rgba(2, 179, 252, 0);
        border: 1px solid #c4c4c4;
        border-radius: 25px;
        margin-left: 33px;
        outline: none;
        margin-top: 23px;
        text-indent: 2em;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .btn {
        width: 94px;
        height: 39px;
        background: #2d97e1;
        border-radius: 5px;
        border: none;
        margin-left: 15px;
        margin-top: 23px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        padding: auto;
      }
      .tan {
        width: 200px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -35px;
        top: 140px;
        background: #555555;
        border-radius: 5px;
        color: #ffffff;
        font-family: PingFang SC;
        font-weight: 400;

        h1 {
          width: 80%;
          font-size: 16px;
          line-height: 28px;
        }
        .triangle {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #555555;
          position: absolute;
          left: center;
          top: -10px;
        }
      }
    }
    ul::-webkit-scrollbar {
      width: 0 !important;
    }
    ul {
      width: 100%;
      height: 542px;

      margin-top: 30px;
      overflow: auto;

      li {
        width: 100%;
        height: 70px;
        // border-top: solid 1px #c4c4c4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .span {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          margin-left: 43px;
        }
        .cuo {
          width: 32px;
          margin-right: 36px;
        }
      }
    }
    .confirm111 {
      width: 100%;
      height: 100px;

      display: flex;
      align-items: center;
      .a {
        width: 120px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-left: 42px;
        display: flex;
        align-items: center;
        span {
          margin-left: 12px;
        }
      }
      .b {
        width: 74px;
        height: 39px;
        background: #dddddd;
        border-radius: 5px;
        border: none;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        margin-left: 270px;
      }
      .c {
        width: 94px;
        height: 39px;
        background: #2d97e1;
        border-radius: 5px;
        border: none;

        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-left: 18px;
      }
    }
  }
}
</style>