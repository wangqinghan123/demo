<template>
  <div class="particulars">
    <div class="content">
      <div class="top">
        <span>{{ title }}的预约会议</span>
        <img src="../image/cha.png" alt="图片加载失败" @click="tui" />
      </div>
      <div class="bottom">
        <p class="bottom-top">
          <span class="sp1">会议主题</span><span class="sp2">{{ theme }}</span>
        </p>
        <ul class="bottom-bottom">
          <li>
            <span class="span1">开始日期</span
            ><span class="span2">{{ beginDate }}</span>
          </li>
          <li>
            <span class="span1">结束日期</span
            ><span class="span2">{{ endDate }}</span>
          </li>
          <li>
            <span class="span1">开始时间</span
            ><span class="span2">{{ time }}</span>
          </li>
          <li>
            <span class="span1">会议加密</span
            ><el-switch
              v-model="isEncrypt"
              active-color="#13ce66"
              inactive-color="#ff4949"
              class="sw"
              disabled
            >
            </el-switch>
          </li>
          <li>
            <span class="span1">会议密码</span>

            <div class="one" v-if="pass">
              <input
                type="password"
                value="123456789"
                disabled="disabled"
                class="inp"
              />

              <div class="right-is">
                <img src="../image/bi.png" alt="" class="im" />
                <span class="xiu" @click="alter">修改</span>
              </div>
            </div>

            <div class="two" v-else>
              <el-input
                placeholder="请输入密码"
                v-model="password"
                show-password
                class="inp"
              ></el-input>
              <div class="right-is">
                <img src="../image/bi.png" alt="" class="im" />
                <span class="xiu" @click="affirm">确认</span>
              </div>

              <!-- //-- -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      theme: "主题",
      beginDate: "2021/12/3",
      endDate: "2021/12/4",
      time: "19:20:08",
      isEncrypt: true,
      password: "",

      pass: true, //点击修改去切换不同的input
    };
  },
  props: ["mett"],

  mounted() {
    //后端返回设备信息;
    console.log("////////+******************");

    this.title = this.mett.manager;
    this.theme = this.mett.title;
    this.beginDate = this.mett.beginTime.substr(0, 10);
    this.endDate = this.mett.endTime.substr(0, 10);
    this.time = this.mett.beginTime.substr(10);
    this.isEncrypt = this.mett.isCipher;
  },
  methods: {
    //------------------
    alter() {
      //切换到编辑密码
      this.pass = false;
    },
    affirm() {
      //编辑密码后，确认修改
      let parameters = {
        ciphoer: this.password,
        isCipher: true,
      };
      this.$Throw.changePass(parameters, this.mett.roomId).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.open2();
          this.pass = true;
        }
      });
    },
    tui() {
      this.$parent.show3_s(false);
    },
    open2() {
      this.$message({
        message: "修改成功。",
        type: "success",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.particulars {
  width: 100%;
  height: 100%;
  background: rgba(00, 00, 00, 0.75);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 1205px;
    height: 715px;
    background: #ffffff;
    box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    .top {
      width: 100%;
      height: 99px;
      border-bottom: solid 1px #e3e3e3;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
      }
      img {
        position: absolute;
        right: 32px;
        top: center;
      }
    }
    .bottom {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      //   background: red;
      .bottom-top {
        width: 1121px;
        height: 83px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 37px;
        .sp1 {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 33px;
        }
        .sp2 {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          margin-right: 33px;
        }
      }
      .bottom-bottom {
        width: 1121px;
        height: 416px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        margin-top: 20px;
        li {
          width: 100%;
          height: 83px;
          border-bottom: solid 1px #e3e3e3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .span1 {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-left: 33px;
          }
          .span2 {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            margin-right: 33px;
          }
          .sw {
            margin-right: 43px;
            /deep/.el-switch__core {
              width: 60px !important;
            }
          }

          .one {
            width: 260px;
            height: 30px;

            display: flex;
            align-items: center;
            justify-content: space-between;
            // background: red;
            .inp {
              width: 80px;
              height: 30px;
              background: #ffffff;
              outline: none;
              border: none;
              margin-right: 20px;
              font-size: 18px;
              color: #333333;
              text-indent: 2em;
            }
            .right-is {
              width: 80px;
              //   background: blue;
              display: flex;
              align-items: center;
              margin-right: 33px;
              .im {
                width: 22px;
                // height: 22px;
              }
              .xiu {
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #2d97e1;
                margin-left: 6px;
              }
              .xiu:hover {
                cursor: pointer;
              }
            }
          }
          .two {
            width: 300px;
            height: 30px;

            display: flex;
            align-items: center;
            justify-content: space-between;
            .inp {
              width: 160px;
            }
            .right-is {
              width: 80px;

              display: flex;
              align-items: center;
              margin-right: 33px;
              .im {
                width: 22px;
                // height: 22px;
              }
              .xiu {
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #2d97e1;
                margin-left: 6px;
                line-height: 129px;
              }
              .xiu:hover {
                cursor: pointer;
              }
            }
          }
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>