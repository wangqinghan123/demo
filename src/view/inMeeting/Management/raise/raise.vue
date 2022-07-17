<template>
  <div class="box">
    <div class="top">
      <span class="s1">举手</span>
      <!-- <p class="s2">当前位置：<span class="s21">五华区/大关街道</span></p> -->
      <!-- <button class="s3">一键邀请</button> -->
      <button class="s4" v-if="isEmcee">全体禁麦</button>
      <button class="s5" v-if="isEmcee">全体静音</button>
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
          <li v-for="(val, index) of JU" :key="index">
            <div class="li_1">
              <span class="li_11">{{ val.userName }}</span>
              <span class="li_12">申请发言</span>
            </div>
            <button class="li_2" @click="yes(val)">同意举手</button>
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
      Staging: "", //点击的同意人信息，回调使用
      JU: [], //举手渲染列表
      Arra1: [], //接受扁平方法处理后的数据
      yes_F: true,
      search: null,
      data: [],
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
    yes(e) {
      if (this.yes_F) {
        this.yes_F = false;
        setTimeout((res) => {
          this.yes_F = true;
        }, 2000);
        this.Staging = e;

        //发送请求获取是否开启数据共享
        let parameter = {
          cmdCode: "getRoomInfo", //会议信息
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
        };
        this.ws.sendMsg(parameter, null, this.getRoomInfo_back);
      }
    },

    getRoomInfo_back(e) {
      e.meeting.paticipators.forEach((res) => {
        if (res.peerId == this.ziji.peerId) {
          console.log(res.dataShareStatus);
          if (res.dataShareStatus == 2) {
            //没有开启数据共享
            // console.log("没有开启数据共享");
            if (this.make < 6) {
              let parameter = {
                cmdCode: "acceptHandsUp",
                peerId: this.log.peerId,
                binderId: this.log.binderId,
                destPeerId: this.Staging.peerId,
                operateType: 1,
              };
              this.ws.sendMsg(parameter, null, this.agree_s);
            } else {
              this.$parent.$parent.tihuan(true);
              sessionStorage.setItem(
                "substitution",
                JSON.stringify(this.Staging)
              );
            }
          } else {
            //开启数据功共享
            // console.log("开启数据共享");
            if (this.make < 5) {
              let parameter = {
                cmdCode: "acceptHandsUp",
                peerId: this.log.peerId,
                binderId: this.log.binderId,
                destPeerId: this.Staging.peerId,
                operateType: 1,
              };
              this.ws.sendMsg(parameter, null, this.agree_s);
            } else {
              this.$parent.$parent.tihuan(true);
              sessionStorage.setItem(
                "substitution",
                JSON.stringify(this.Staging)
              );
            }
          }
        }
      });

      //
      //没有开启数据共享
    },

    agree_s(e) {
      if (e.result == 0) {
        this.$store.dispatch("set_consent", this.Staging); //压入同意的人
      }
    },

    vague() {
      let actions7 = /^[0-9]*$/;

      let actions8 = actions7.test(this.search);

      let source = JSON.parse(sessionStorage.getItem("arr2"));
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

      this.JU = arr;
    },
  },

  computed: {
    ...mapGetters({
      join: "getJoin",
      ju_ren: "get_ju_ren",
      make: "get_make", //发言_length
      ziji: "getZiji",
      isEmcee: "getIsEmcee", //是否是主持人
    }),
  },
  watch: {
    ju_ren: {
      deep: true,
      handler: function (newV, oldV) {
        let hash = [];
        this.JU = newV.reduce((pre, next) => {
          hash[next.peerId] ? "" : (hash[next.peerId] = true && pre.push(next));
          return pre;
        }, []);
        sessionStorage.setItem("arr2", JSON.stringify(this.JU));
      },
      immediate: true,
    },
    //每次有人发言都去过滤，然后去看此人有没有在举手列表；有的话删除掉；
    "join.meeting.paticipators": {
      deep: true,
      handler: function (newV, oldV) {
        let array = newV.filter((res) => {
          return res.speakStatus == 1;
        });
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < this.JU.length; j++) {
            if (array[i].peerId == this.JU[j].peerId) {
              this.JU.splice(j, 1);
              this.$store.dispatch("set_hands", this.JU.length);
              this.$store.dispatch("set_ju_ren", this.JU); //过滤后，直接赋值给vuex
            }
          }
        }
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
        overflow: auto;
        margin-top: 60px;
        li {
          width: 91%;
          height: 110px;

          display: flex;
          align-items: center;
          margin-left: 4.5%;
          border-bottom: solid 1px #d8d8d8;
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
              font-size: 22px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #2d97e1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-left: 18px;
            }
          }
          .li_2 {
            width: 100px;
            height: 40px;
            border: 1px solid #2d97e1;
            border-radius: 3px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #2d97e1;
            margin-left: 327px;
          }
        }
      }
    }
  }
}
</style>