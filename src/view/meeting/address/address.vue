<template>
  <div>
    <div class="top">
      <div class="t1"><span>通讯录</span></div>
      <div class="t2">
        <!-- <span><img src="../image/qunliao.png" alt="" />群聊</span> -->

        <!-- 通讯录的召开，是点击选择指定的人群，去邀请并且召开 -->
        <span @click="convoke()" class="t3">
          <img src="../image/zhaokai.png" alt="" class="img" />
          <span class="text">召开</span>
        </span>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <!-- <div class="sou">
          <input
            type="text"
            v-model="input"
            :placeholder="placeholder_seek"
            class="inp"
            @focus="get_id()"
            @blur="lose_id()"
          />
          <img src="../image/sousuo.png" alt="" />
        </div> -->
        <div class="dan">
          <p>{{ name1 }}</p>
        </div>
        <div class="lie">
          <!-- 个人通讯录 -->
          <el-tree
            :data="data_address"
            @node-click="handleNodeClick_address"
            :props="{ label: 'name', children: 'subNode' }"
          ></el-tree>
          <!-- 组织建构 -->
          <el-tree
            :data="data"
            @node-click="handleNodeClick"
            :props="{ label: 'name', children: 'subNode' }"
          ></el-tree>
          <!-- 群组 -->
          <el-tree
            :data="data_group"
            @node-click="handleNodeClick_group"
            :props="{ label: 'name', children: 'subNode' }"
          ></el-tree>
        </div>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item, index) in Render" :key="index">
            <span class="r0" @click="is(item)" v-show="isb">
              <img :src="[item.show_T ? rimg2 : rimg1]" alt="" />
            </span>
            <span><img src="../image/yonghu.png" alt="" class="r1" /></span>

            <span class="r2">{{ item.name }}</span>
            <span class="r3">{{ item.peerId | msgFormat }}</span>
            <div class="r4">
              <span class="r41" @click="show_div(item)"
                ><img src="../image/sheng.png" alt="" />
              </span>

              <ul
                class="r42"
                v-show="item.show_J"
                @mouseleave="c(item)"
                @mouseover="r()"
              >
                <li @click="add_to(item)">
                  <span>添加到通讯录</span>
                </li>
              </ul>
              <ul
                class="r43"
                v-show="item.show_G"
                @mouseleave="c(item)"
                @mouseover="r()"
              >
                <li @click="delete_to(item)">
                  <span>从通讯录删除</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="fixed" v-show="isb">
        <div class="bei"></div>
        <div class="content">
          <ul class="one">
            <li v-for="(val, index) in crosswise" :key="index">
              <span class="sp1">{{ val.name }}</span
              ><span class="sp2"
                ><img src="../image/xincha.png" alt="" @click="delete_cha(val)"
              /></span>
            </li>
          </ul>
          <div class="two">
            <el-button class="sp" @click="affirm()">确认</el-button>
          </div>
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
      log: JSON.parse(sessionStorage.getItem("log")),
      input: "",
      placeholder_seek: "搜索",
      data: [], //组织架构
      data_address: [{ name: "个人通讯录", subNode: [] }], //个人通讯录
      data_group: [], //群组
      name1: "", //左侧头部渲染用
      Render: "", //右侧二级展示渲染用

      rimg1: require("../image/weixuan.png"),
      rimg2: require("../image/yixuan.png"),

      isb: false, //控制是否显示（√）

      Facility: "", //设备信息

      crosswise: [], //下方渲染

      //----------

      found: "", //创建会议成功回来的信息

      //-----------关于三秒后点击出来的删除或者添加的弹框的消失--------------
      Timeout1: false,
      Timeout2: false,
    };
  },
  mounted() {
    //请求组织架构
    this.$Throw.login().then((mark) => {
      //请求当前的自己的唯一标识符
      if (mark.data.code == 0) {
        const Id = mark.data.data.company.nodeId; //唯一标识符
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
            }
          }
        });
      }
    });

    //请求个人讯录的数据
    this.$Throw
      .getAddress({
        pageSize: 99999,
        pageNum: 1,
        token: this.log.token,
      })
      .then((res) => {
        if (res.data.code == 0) {
          this.data_address[0].subNode = res.data.data.list;
        } else {
          console.log(res.data.code, "请求个人通讯录的code");
        }
      });

    this.$Throw.getGroupList().then((re) => {
      //请求群组的组织架构

      if (re.data.code == 0) {
        this.data_group = re.data.data;
      } else {
        console.log(re.data.code, "请求群组的code码");
      }
    });
  },
  methods: {
    get_id() {
      //获取焦点
      this.placeholder_seek = "";
    },
    lose_id() {
      //失去焦点
      this.placeholder_seek = "搜索";
    },

    delete_cha(val) {
      //点击下方叉号
      this.crosswise = this.crosswise.filter((res) => {
        return res.peerId != val.peerId;
      });
      this.Render.forEach((res) => {
        if (res.peerId == val.peerId) {
          res.show_T = false;
        }
      });
    },

    handleNodeClick(data) {
      //请求组织架构下的人源信息
      this.$Throw.contact({}, data.id).then((res) => {
        let people = res.data.data.filter((res) => {
          return res.peerId != null;
        });
        this.Render = people;
        this.Render.forEach((res) => {
          this.$set(res, "show_D", false);
          this.$set(res, "show_T", false);
          this.$set(res, "show_J", false);
        });
      });
    },
    handleNodeClick_address(val) {
      if (val.subNode) {
        this.Render = [...new Set(val.subNode)]; //再去显示点击当前节点的子级
        val.subNode.forEach((res) => {
          this.$set(res, "show_D", false);
          this.$set(res, "show_T", false);
          this.$set(res, "show_G", false);
        });
      }
    },

    //群聊的点击事件

    handleNodeClick_group(e) {
      // console.log(e.id);
      this.$Throw.GroupStaff(e.id).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.Render = res.data.data;
        } else {
          console.log(res.data.code, res.data.message);
        }
      });
    },

    //点击召开的事件
    convoke() {
      if (this.isb == true) {
        this.isb = false;
        this.crosswise = [];
      } else {
        this.isb = true;
      }
    },
    is(item) {
      this.Render.forEach((res) => {
        if (res.peerId == item.peerId) {
          if (res.show_T) {
            res.show_T = false;
            this.crosswise = this.crosswise.filter((res) => {
              return res.peerId != item.peerId;
            });
          } else {
            res.show_T = true;
            this.crosswise.push(item);
            this.crosswise = [...new Set(this.crosswise)]; //再去显示点击当前节点的子级
          }
        }
      });
    },

    //*************关于邀请------------ */
    affirm() {
      let p = {
        roomType: "immediate",
        mediaType: "video",
        roomMode: "manage",
        title: this.Facility.hosttype + "的会议",
      };

      this.$Throw.found(p).then((res) => {
        if (res.data.code == 0) {
          this.found = res;
          let parameter = {
            cmdCode: "joinRoom",
            peerId: this.log.peerId,
            binderId: this.log.binderId,
            roomId: this.found.data.data.roomId,
          };
          console.log(parameter);
          this.ws.sendMsg(parameter, null, this.join_S);
        }
      });
    },

    join_S(e) {
      if (e.result == 0) {
        this.$store.dispatch("set_join", e); //得到最新的结果
        this.$router.push("/home");
        //创建会议！得到所有人的peerID,点击确认，然后发送邀请的指令！(通讯录)
        let arr101 = [];
        this.crosswise.forEach((res) => {
          arr101.push(res.peerId * 1);
        });
        let parameter_yao = {
          peerId: this.log.peerId,
          cmdCode: "ctrlInvite",
          destPeerIds: arr101,
          binderId: this.log.binderId,
          roomId: this.found.data.data.roomId,
        };
        this.ws.sendMsg(parameter_yao, null, this.Invitation_res);
      }
    },

    Invitation_res(e) {
      console.log(e);
    },
    //************************************** */
    show_div(item) {
      if (item.show_J != undefined) {
        if (item.show_J == false) {
          item.show_J = true;
          this.Timeout1 = setTimeout((res) => {
            item.show_J = false;
          }, 3000);
        } else {
          item.show_J = false;
        }
      } else {
        if (item.show_G != undefined) {
          if (item.show_G == false) {
            item.show_G = true;
            this.Timeout2 = setTimeout((res) => {
              item.show_G = false;
            }, 3000);
          } else {
            item.show_G = false;
          }
        }
      }
    },
    c(item) {
      if (item.show_J == true) {
        item.show_J = false;
      } else {
        item.show_G = false;
      }
    },
    r() {
      if (this.Timeout1 != false) {
        clearTimeout(this.Timeout1);
      } else {
        if (this.Timeout2 != false) {
          clearTimeout(this.Timeout2);
        }
      }
    },
    add_to(item) {
      let parameter = [item.peerId];
      this.$Throw.addAddress(parameter).then((res) => {
        if (res.data.code == 0) {
          this.open_tcg();
          this.$Throw
            .getAddress({
              pageSize: 99999,
              pageNum: 1,
              token: this.log.token,
            })
            .then((res) => {
              res.data.data.list.forEach((res1) => {
                this.$set(res1, "show_D", false);
                this.$set(res1, "show_T", false);
                this.$set(res1, "show_G", false);
              });
              this.data_address[0].subNode = res.data.data.list;
            }); //添加完成后再请求个人讯录的数据
        }
      });
    },
    delete_to(item) {
      let parameter = [item.peerId];
      this.$Throw.deleteAddress({ data: parameter }).then((res) => {
        if (res.data.code == 0) {
          this.open_scg();
          this.$Throw
            .getAddress({
              pageSize: 99999,
              pageNum: 1,
              token: this.log.token,
            })
            .then((res) => {
              res.data.data.list.forEach((res1) => {
                this.$set(res1, "show_D", false);
                this.$set(res1, "show_T", false);
                this.$set(res1, "show_G", false);
              });
              this.Render = this.data_address[0].subNode = res.data.data.list;
            }); //删除完成后再请求个人讯录的数据
        }
      });
    },
    open_scg() {
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },
    open_tcg() {
      this.$message({
        message: "添加成功",
        type: "success",
        // center: true,
      });
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
        this.Facility = newV;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 110px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .t1 {
    span {
      width: 87px;
      height: 28px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
      margin-left: 60px;
    }
  }
  .t2 {
    width: 260px;
    margin-right: 45px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
    }
  }
  .t3 {
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      width: 36px;
      height: 29px;
    }
    .text {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
    }
  }
}
.bottom {
  width: 100%;
  height: 900px;
  margin-top: 30px;
  display: flex;
  .left {
    width: 376px;
    height: 900px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 17px;
    border-radius: 5px;
    .sou {
      position: relative;
      .inp {
        width: 326px;
        height: 50px;
        background: rgba(2, 179, 252, 0);
        border: 1px solid #c4c4c4;
        border-radius: 25px;
        outline: none;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        text-indent: 2em;
        margin-top: 15px;
      }
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 30px;
        right: 30px;
      }
    }
    .dan {
      width: 100%;
      height: 60px;
      z-index: 10;
      display: flex;
      align-items: center;
      border: solid 1px #e3e3e3;
      border-left: none;
      border-right: none;
      border-top: none;
      p {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        margin-left: 28px;
      }
    }
    .lie {
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
          background: url(../image/xiala.png);
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
  .right {
    width: 1292px;
    height: 900px;
    margin-left: 23px;
    background: #fff;
    border-radius: 5px;
    ul {
      width: 100%;
      height: 740px;
      overflow: auto;
      li {
        width: 100%;
        height: 90px;
        border-bottom: solid 1px #e3e3e3;
        display: flex;
        align-items: center;
        .r0 {
          width: 35px;

          margin-left: 20px;
          img {
            width: 34px;
          }
        }
        .r1 {
          width: 42px;
          margin-left: 28px;
        }
        .r2 {
          width: 300px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 20px;
        }
        .r3 {
          width: 200px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 236px;
        }
        .r4 {
          width: 80px;

          // background: blue;

          margin-left: 284px;
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          .r41 {
            width: 30px;
          }
          .r42 {
            width: 140px;
            height: 50px;

            border-radius: 15px;
            position: absolute;
            top: 30px;
            display: flex;
            align-items: center;
            // flex-direction: column;
            justify-content: center;
            color: #fff;
            background: rgba(00, 00, 00, 0.75);
            li {
              width: 100%;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;

              font-family: PingFang SC;
              font-weight: 400;
              border: none;
            }
          }
          .r43 {
            width: 140px;
            height: 50px;

            border-radius: 15px;
            position: absolute;
            top: 30px;
            display: flex;
            align-items: center;
            // flex-direction: column;
            justify-content: center;
            color: #fff;
            background: rgba(00, 00, 00, 0.75);
            li {
              width: 100%;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;

              font-family: PingFang SC;
              font-weight: 400;
              border: none;
            }
          }
        }
      }
    }
  }
  .fixed {
    width: 100%;
    height: 158px;
    position: absolute;
    left: 0;
    bottom: 0;

    .bei {
      width: 100%;
      height: 100%;
      background: #1b2023;
      opacity: 0.92;
      position: absolute;
    }
    .content {
      width: 100%;
      height: 100%;
      position: absolute;

      display: flex;
      align-items: center;
      .one {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        overflow: auto;
        z-index: 10;
        .o1 {
          width: 100%;
          height: 100%;
          background: red;
        }
        /deep/ .el-carousel__item h3 {
          background: red;
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 150px;
          margin: 0;
        }

        /deep/.el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
          background: red;
        }

        /deep/ .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
          background: red;
        }

        li {
          width: 233px;
          height: 59px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid #ffffff;
          border-radius: 29px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-shrink: 0;
          margin-left: 18px;
          overflow: hidden;

          .sp1 {
            width: 100px;
            height: 20px;
            color: #fff;
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .sp2 {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            font-size: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .two {
        width: 20%;
        height: 100%;
        // background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        .sp {
          width: 341px;
          height: 74px;
          background: #2d97e1;
          border-radius: 5px;
          font-size: 30px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>