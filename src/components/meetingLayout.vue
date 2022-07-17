<template>
  <div id="layout">
    <el-dialog top="146px" :visible.sync="visible" @close="diaClose">
      <div class="user">
        <div>
          <div v-show="viewFrom.type == 1 && viewFrom.model == 1" class="one">
            <div class="one-people" v-if="data != ''">
              <img
                class="img"
                src="../assets/switchView-icon/用户-实色.png"
                alt=""
              />
              <span>{{ data[0].userName }}</span>
            </div>
          </div>
          <!-- 二个 -->
          <div v-show="viewFrom.type == 2 && viewFrom.model == 1" class="two">
            <div
              class="two-div"
              v-for="(item, index) in data"
              :key="index"
              @dblclick="switchList(item)"
            >
              <div class="two-people" v-if="data != ''">
                <img
                  class="img"
                  src="../assets/switchView-icon/用户-实色.png"
                  alt=""
                />
                <p>{{ item.userName }}</p>
              </div>
            </div>
          </div>

          <div v-show="viewFrom.type == 4 && viewFrom.model == 1" class="four">
            <div
              v-for="item in data"
              :key="item.peerId"
              class="four-div"
              @dblclick="switchList(item)"
            >
              <div class="four-people" v-if="data != ''">
                <img
                  class="img"
                  src="../assets/switchView-icon/用户-实色.png"
                  alt=""
                />
                <p>{{ item.userName }}</p>
              </div>
            </div>
          </div>

          <div v-show="viewFrom.type == 5 && viewFrom.model == 2" class="five">
            <div class="left">
              <div v-if="data != ''" @dblclick="switchList(data[0])">
                <img
                  class="img"
                  src="../assets/switchView-icon/用户-实色.png"
                  alt=""
                />
                <p>{{ data[0].userName }}</p>
              </div>
            </div>
            <div class="right">
              <div
                class="right-people"
                v-for="(item, index) in data4"
                :key="index"
                @dblclick="switchList(item)"
              >
                <div v-if="data4 != ''">
                  <img
                    class="img"
                    src="../assets/switchView-icon/用户-实色.png"
                    alt=""
                  />
                  <p>{{ item.userName }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 六个 -->
          <div v-show="viewFrom.type == 6 && viewFrom.model == 1" class="six">
            <div class="six-left">
              <div
                v-if="data != ''"
                class="left-top"
                @dblclick="switchList(data[0])"
              >
                <div>
                  <img
                    class="img"
                    src="../assets/switchView-icon/用户-实色.png"
                    alt=""
                  />
                  <p>{{ data[0].userName }}</p>
                </div>
              </div>
              <div class="left-bottom">
                <div
                  class="left-people"
                  v-for="(item, index) in data6"
                  :key="index"
                  @dblclick="switchList(item)"
                >
                  <div v-if="data6 != ''">
                    <img
                      class="img"
                      src="../assets/switchView-icon/用户-实色.png"
                      alt=""
                    />
                    <p>{{ item.userName }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="six-right">
              <div
                class="right-people"
                v-for="(item, index) in data62"
                :key="index"
                @dblclick="switchList(item)"
              >
                <div v-if="data62 != ''">
                  <img
                    class="img"
                    src="../assets/switchView-icon/用户-实色.png"
                    alt=""
                  />
                  <p>{{ item.userName }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 七个 -->
          <div v-show="viewFrom.type == 7 && viewFrom.model == 1" class="seven">
            <div class="top">
              <div v-if="data != ''" @dblclick="switchList(data[0])">
                <img
                  class="img"
                  src="../assets/switchView-icon/用户-实色.png"
                  alt=""
                />
                <p>{{ data[0].userName }}</p>
              </div>
            </div>
            <div class="seven-bottom">
              <div
                class="seven-people"
                v-for="(item, index) in data4"
                :key="index"
                @dblclick="switchList(item)"
              >
                <div v-if="data4 != ''">
                  <img
                    class="img"
                    src="../assets/switchView-icon/用户-实色.png"
                    alt=""
                  />
                  <p>{{ item.userName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: this.dialogShow, //是否弹出切换视图的值
      data: [],
      viewFrom: {
        type: null,
        model: null,
      },

      dblclick7: null,

      //防抖

      shake: true,
    };
  },

  methods: {
    //关闭切换视图的弹框
    diaClose() {
      this.$emit("update:dialogShow", false);
    },
    //更改会议的布局的主视图指定返回的结果

    //双击某一个参会者(发言)改变到布局主视图
    switchList(item) {
      if (this.shake) {
        this.dblclick7 = item;

        let parameter = {
          cmdCode: "changeMainView", //更改会议的布局的主视图指定
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          layout: {
            fullScreenViewId: item.id,
            layoutMode: this.viewFrom.model,
            layoutType: this.viewFrom.type,
            views: this.data,
          },
        };
        this.ws.sendMsg(parameter, null, this.pictureLayout);
        this.shake = false;
      }
      setTimeout(() => {
        this.shake = true;
      }, 8000);
    },

    pictureLayout(newResult) {
      if (newResult.result == 0) {
        let element7;
        let index7;
        this.data.forEach((element, index) => {
          if (element.peerId == this.dblclick7.peerId) {
            element7 = element;
            index7 = index;
          }
        });

        let newArr = JSON.parse(JSON.stringify(this.data));

        // //删除头部
        let tou = newArr.shift();

        newArr.unshift(element7);

        newArr.splice(index7, 1, tou);

        this.data = newArr;

        this.shake = true;
      }
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      log: "getLog",
    }),
    //主视图比较大剩余的参会者（发言）列表（三方、四方、五方、七方）
    data4: function () {
      return this.data.slice(1, this.data.length);
    },
    //十方布局主视图比较大的剩余参会者(发言)列表（bottom下）

    data10: function () {
      return this.data.slice(1, 5);
    },
    //六方布局主视图比较大的剩余参会者(发言)列表（bottom下）
    data6: function () {
      return this.data.slice(1, 3);
    },
    //六方布局主视图比较大的剩余参会者(发言)列表（right）
    data62: function () {
      return this.data.slice(3, this.data.length);
    },
    //十方布局主视图比较大的剩余参会者(发言)列表（right）
    dataHide: function () {
      return this.data.slice(5, this.data.length);
    },
    //五方布局（品字形）两方数据
    data5: function () {
      return this.data.slice(0, 2);
    },
    //五方布局（品字形）（bottom下）数据
    dataMany: function () {
      return this.data.slice(2, this.data.length);
    },
  },
  watch: {
    dialogShow() {
      //切换视图的弹框
      this.visible = this.dialogShow;
    },
    layoutMessage: {
      deep: true,
      handler: function (newV, oldV) {
        // console.log(newV, "0.0.0.00..");
        this.data = newV.views;
        this.viewFrom.type = newV.layoutType;
        this.viewFrom.model = newV.layoutMode;
      },
    },
  },
  props: {
    //切换视图的弹框
    dialogShow: {
      type: Boolean,
      default: false,
    },
    layoutMessage: {
      type: Object,
      default: { err: "接受传值失败" },
    },
  },
};
</script>
<style lang="less">
#layout {
  .el-dialog {
    width: 1205px;
    position: absolute;
    top: 345px;
    left: 357.5px;
    margin-top: -205px !important;
    border-radius: 20px;
    height: 795px;
    .el-dialog__body {
      padding: 0px;
    }
    .el-dialog__header {
      padding: 0px;
      .el-dialog__headerbtn {
        font-size: 37px;
        color: #2b2e3c;
      }
    }
    .user {
      .two {
        // width: 100%;
        // height: 100%;

        width: 1205px;
        height: 795px;
        display: inline-flex;
        .two-div {
          // width: 49.8%;
          width: 602px;
          height: 793px;
          display: inline-flex;
          justify-content: center;
          border: 1px solid rgb(221, 221, 221);
          .two-people {
            width: 163px;
            height: 151px;
            text-align: center;
            //   background: blue;
            margin-top: 300px;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
      }
      .three {
        width: 100%;
        height: 100%;
        .top {
          width: 100%;
          height: 396px;
          border-bottom: 1px solid rgb(221, 221, 221);
          overflow: hidden;
          text-align: center;
          .div {
            width: 163px;
            height: 151px;
            text-align: center;
            margin: 120px auto;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .two1 {
          width: 100%;
          height: 396px;
          display: inline-flex;
          justify-content: space-between;
          // border: 1px solid rgb(221, 221, 221);
          .three-people {
            width: 50%;
            height: 100%;
            border: 1px solid rgb(221, 221, 221);
            text-align: center;
            .div {
              width: 163px;
              height: 151px;
              text-align: center;
              margin: 120px auto;

              .img {
                width: 110px;
                height: 110px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .four-two {
        width: 100%;
        height: 100%;
        .top-two {
          width: 100%;
          height: 520px;
          border-bottom: 1px solid rgb(221, 221, 221);
          overflow: hidden;
          .four-div {
            width: 163px;
            height: 151px;
            text-align: center;
            margin: 200px auto;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .bottom {
          width: 100%;
          height: 273px;
          display: inline-flex;
          .bottom-people {
            width: 33%;
            height: 100%;
            border: 1px solid rgb(221, 221, 221);
            div {
              width: 163px;
              height: 151px;
              text-align: center;
              margin: 60px auto;
              .img {
                width: 110px;
                height: 110px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .seven {
        // width: 100%;
        // height: 100%;
        width: 1205px;
        height: 795px;
        .top {
          width: 1205px;
          height: 550px;
          border-bottom: 1px solid rgb(221, 221, 221);
          overflow: hidden;
          div {
            width: 163px;
            height: 151px;
            text-align: center;
            margin: 200px auto;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .seven-bottom {
          width: 1205px;
          height: 243px;
          display: inline-flex;
          overflow-y: hidden;
          overflow-x: auto;

          .seven-people {
            // width: 16.5%;
            width: 198px;
            height: 243px;
            border: 1px solid rgb(221, 221, 221);
            text-align: center;
            flex-shrink: 0;
            div {
              width: 133px;
              height: 121px;
              text-align: center;
              margin: 50px auto;
              .img {
                width: 100px;
                height: 100px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .six {
        // width: 100%;
        width: 1205px;
        height: 795px;
        display: inline-flex;
        .six-left {
          // width: 66.5%;
          width: 801px;
          // height: 100%;
          height: 795px;
          border-right: 1px solid rgb(221, 221, 221);
          // background: black;
          .left-top {
            // width: 100%;
            width: 801px;
            // height: 66.5%;
            height: 528px;
            border-bottom: 1px solid rgb(221, 221, 221);
            overflow: hidden;
            div {
              width: 113px;
              height: 101px;
              text-align: center;
              margin: 220px auto;
              .img {
                width: 80px;
                height: 80px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
          .left-bottom {
            // width: 100%;
            width: 801px;
            // height: 33.5%;
            height: 266px;
            display: inline-flex;
            .left-people {
              width: 400px;
              height: 266px;
              border-right: 1px solid rgb(221, 221, 221);
              div {
                width: 113px;
                height: 101px;
                text-align: center;
                margin: 70px auto;
                .img {
                  width: 80px;
                  height: 80px;
                }
                p {
                  margin-top: 10px;
                  font-size: 19px;
                }
              }
            }
          }
        }
        .six-right {
          // width: 33.5%;
          width: 403px;
          // height: 100%;
          height: 795px;
          overflow-y: auto;
          overflow-x: hidden;
          .right-people {
            // width: 100%;
            width: 403px;
            // height: 33.2%;
            height: 263px;
            // background: red;
            border-bottom: 1px solid rgb(221, 221, 221);
            overflow: hidden;
            div {
              width: 113px;
              height: 101px;
              text-align: center;
              margin: 70px auto;
              .img {
                width: 80px;
                height: 80px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .ten {
        width: 100%;
        height: 795px;
        display: inline-flex;
        .ten-left {
          width: 80%;
          height: 100%;
          border-right: 1px solid rgb(221, 221, 221);
          // background: black;
          .left-top {
            width: 100%;
            height: 80%;
            border-bottom: 1px solid rgb(221, 221, 221);
            overflow: hidden;
            div {
              width: 113px;
              height: 101px;
              text-align: center;
              margin: 250px auto;
              .img {
                width: 80px;
                height: 80px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
          .left-bottom {
            width: 100%;
            height: 20%;
            display: inline-flex;
            .left-people {
              width: 25%;
              height: 100%;
              border-right: 1px solid rgb(221, 221, 221);
              div {
                width: 113px;
                height: 101px;
                text-align: center;
                margin: 20px auto;
                .img {
                  width: 80px;
                  height: 80px;
                }
                p {
                  margin-top: 10px;
                  font-size: 19px;
                }
              }
            }
          }
        }
        .ten-right {
          width: 20%;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          .right-people {
            width: 100%;
            height: 19.88%;
            // background: red;
            border-bottom: 1px solid rgb(221, 221, 221);
            overflow: hidden;
            div {
              width: 113px;
              height: 101px;
              text-align: center;
              margin: 20px auto;
              .img {
                width: 80px;
                height: 80px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .five-two {
        width: 100%;
        height: 100%;
        .top-two {
          width: 100%;
          height: 520px;
          // border-bottom: 1px solid rgb(221, 221, 221);
          display: inline-flex;
          overflow: hidden;
          .five-people {
            width: 50%;
            height: 100%;
            border: 1px solid rgb(221, 221, 221);
          }
          .five-div {
            width: 163px;
            height: 151px;
            text-align: center;
            margin: 200px auto;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .bottom {
          width: 100%;
          height: 273px;
          display: inline-flex;
          .bottom-people {
            width: 33.3%;
            height: 100%;
            border: 1px solid rgb(221, 221, 221);
            div {
              width: 163px;
              height: 151px;
              text-align: center;
              margin: 60px auto;
              .img {
                width: 110px;
                height: 110px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .five {
        // width: 100%;
        width: 1205px;
        height: 795px;
        display: inline-flex;
        .left {
          // width: 68%;
          // height: 100%;
          width: 819px;
          height: 795px;
          border-right: 1px solid rgb(221, 221, 221);
          div {
            width: 163px;
            height: 151px;
            text-align: center;
            margin: 320px auto;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .right {
          // width: 32%;
          // height: 100%;
          width: 385px;
          height: 795px;
          .right-people {
            // width: 100%;
            width: 385px;
            height: 198px;
            border-bottom: 1px solid rgb(221, 221, 221);
            overflow: hidden;
            div {
              width: 163px;
              height: 151px;
              text-align: center;
              margin: 30px auto;
              .img {
                width: 110px;
                height: 110px;
              }
              p {
                margin-top: 10px;
                font-size: 19px;
              }
            }
          }
        }
      }
      .nine {
        width: 100%;
        height: 100%;
        display: inline-flex;
        flex-wrap: wrap;
        .nine-div {
          width: 33.15%;
          height: 263px;
          display: inline-flex;
          justify-content: center;
          border: 1px solid rgb(221, 221, 221);
          .nine-people {
            width: 163px;
            height: 151px;
            text-align: center;
            //   background: blue;
            margin-top: 56px;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .nine-div:hover {
          cursor: pointer;
          background: rgb(216, 216, 216);
        }
      }
      .four {
        // width: 100%;
        // height: 100%;
        width: 1205px;
        height: 795px;
        display: inline-flex;
        // background: red;
        flex-wrap: wrap;
        .four-div {
          width: 601px;
          height: 395px;
          display: inline-flex;
          justify-content: center;
          // border: 1px solid rgb(221, 221, 221);
          .four-people {
            width: 163px;
            height: 151px;
            text-align: center;
            //   background: blue;
            margin-top: 115px;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 5px;
              font-size: 19px;
            }
          }
        }
        .four-div:hover {
          cursor: pointer;
          background: rgb(216, 216, 216);
        }
      }
      .sixteen {
        width: 100%;
        height: 100%;
        display: inline-flex;
        flex-wrap: wrap;
        .greaterThan {
          width: 24.83%;
          height: 196.7px;
          display: inline-flex;
          justify-content: center;
          border: 1px solid rgb(221, 221, 221);
          .greaterThan-people {
            width: 163px;
            height: 151px;
            text-align: center;
            //   background: blue;
            margin-top: 30px;
            .img {
              width: 110px;
              height: 110px;
            }
            p {
              margin-top: 5px;
              font-size: 19px;
            }
          }
        }
        .greaterThan:hover {
          cursor: pointer;
          background: rgb(216, 216, 216);
        }
      }
      .peripheral {
        width: 100%;
        height: 100%;
        display: inline-flex;
        flex-wrap: wrap;
        .multiple {
          width: 25%;
          height: 265px;
          display: inline-flex;
          justify-content: center;
          //   align-items: center;
          .multiple-people {
            width: 163px;
            height: 165px;
            text-align: center;
            margin-top: 40px;
            .img {
              width: 160px;
              height: 160px;
            }
            span {
              display: inline-block;
              margin-top: 10px;
              font-size: 19px;
            }
          }
        }
        .multiple:hover {
          cursor: pointer;
          background: rgb(216, 216, 216);
        }
      }
      .one {
        // width: 100%;
        width: 1205px;
        height: 793px;
        border-radius: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        .one-people {
          width: 163px;
          height: 200px;
          text-align: center;
          .img {
            width: 162px;
            height: 162px;
          }
          span {
            display: inline-block;
            margin-top: 10px;
            font-size: 20px;
          }
        }
      }
      .one:hover {
        cursor: pointer;
      }
    }
  }
}
</style>