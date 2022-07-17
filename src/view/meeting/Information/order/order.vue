<template>
  <div class="xiangqing1">
    <div class="setting2"></div>
    <div class="center1">
      <div class="one">
        <span>预约会议</span>
        <img src="../../image/cha.png" alt="" class="cha" @click="cha()" />
      </div>
      <div class="two">
        <span class="s1">会议主题</span>

        <input
          type="text"
          class="s2"
          placeholder="请输入会议主题"
          v-model="theme"
        />
      </div>
      <div class="three">
        <ul>
          <li>
            <span>开始日期</span>
            <div class="block">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                v-model="riqi1"
                size="small"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </li>
          <li>
            <span>结束日期</span>
            <div class="block">
              <el-date-picker
                v-model="riqi2"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </li>
          <!-- :disabledDate="" -->
          <li>
            <span>开始时间</span>
            <div class="block">
              <el-time-picker
                v-model="time"
                :picker-options="{}"
                placeholder="任意时间点"
              >
              </el-time-picker>
            </div>
          </li>
          <li>
            <span>会议加密</span>
            <div class="switch">
              <el-switch
                v-model="encrypt"
                active-color="#2D97E1"
                inactive-color="#ccc"
                :width="60"
                @change="change()"
              >
              </el-switch>
            </div>
          </li>
          <li>
            <span>会议密码</span>

            <el-input
              placeholder="请输入密码"
              v-model="password"
              show-password
              class="s2"
              :disabled="jin"
            ></el-input>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <el-button type="primary" @click="affirm">选择参会方</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      log: JSON.parse(sessionStorage.getItem("log")),
      theme: "", //主题
      riqi1: "", //开始如期
      riqi2: "", //结束日期
      time: new Date(), //时间
      encrypt: false, //是否加密
      password: "", //密码

      jin: "", //密码框的禁止点击
      pickerOptions: {
        //禁用当前日期之前的日期
        disabledDate(time) {
          //Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
    };
  },

  methods: {
    //----------禁用当前时间之前的按钮-------------

    //----------点击叉号去关闭页面-------------
    change() {
      if (this.encrypt) {
        this.jin = false;
      } else {
        this.jin = "";
      }
    },

    affirm() {
      if (this.theme == "") {
        this.open_4("请输入会议主题。");
      } else {
        if (this.riqi1 == "") {
          this.open_4("请选择开始日期。");
        } else {
          if (this.riqi2 == "") {
            this.open_4("请选择结束日期。");
          } else {
            if (this.encrypt == true) {
              if (this.password == "") {
                this.open_4("请输入密码.");
              } else {
                this.chuan();
              }
            } else {
              this.chuan();
            }
          }
        }
      }
    },

    chuan() {
      this.cha();
      this.$parent.show2_s(true);
      //-------关于时间----------
      let datashi = new Date(this.time);
      let s = datashi.getHours();
      s = s < 10 ? "0" + s : s;
      let f = datashi.getMinutes();
      f = f < 10 ? "0" + f : f;
      let o = datashi.getSeconds();
      o = o < 10 ? "0" + o : o;
      let timeshi = s + ":" + f + ":" + o;
      let parameter = {
        cipher: this.password, //密码
        isCipher: this.encrypt, //是否加密
        roomType: "appointment", //会议类型：即时会议immediate，预约会议appointment
        roomMode: "manage", //会议模式：主持模式manage, 自由模式，free
        mediaType: "video", //会议媒体类型：视频会议video，音频会议audio
        title: this.theme, //主题
        // durationHours: 5,//持续时长
        beginTime: this.riqi1 + " " + timeshi, //开始时间
        endTime: this.riqi2 + " 23:59:59", //结束时间
        // inviteUsers: ["10000032", "10000032"],//预约里邀请的人员信息
      };
      this.$store.dispatch("set_parameters", parameter);
    },
    cha() {
      this.$parent.show1_s(false);
    },

    open_4(e) {
      this.$message.error(e);
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.setting2 {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.72;
  position: absolute;
  left: 0;
  top: 0;
}
.center1 {
  width: 1205px;
  height: 850px;
  background: #ffffff;
  box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -432.5px;
  margin-left: -602.5px;
  z-index: 20;
  .one {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    span {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
    }
    .cha {
      width: 28px;
      height: 28px;
      position: absolute;
      right: 32px;
      top: 34px;
    }
  }
  .two {
    width: 1121px;
    height: 83px;
    background: #ffffff;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 42px;
    margin-top: 37px;
    .s1 {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 33px;
    }
    .s2 {
      width: 264px;
      height: 40px;
      border: none;
      outline: none;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;

      // margin-right: 33px;
    }
  }
  .three {
    width: 1121px;
    height: 416px;
    background: #ffffff;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    margin-left: 42px;
    margin-top: 20px;
    ul {
      li {
        width: 100%;
        height: 84px;
        border-bottom: solid 1px #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span:first-child {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 33px;
        }
        span:last-child {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-right: 45px;
        }
        /deep/.switch {
          margin-right: 130px;
        }
        /deep/.block {
          // width: 300px;
          // height: 50px;
          margin-right: 45px;
        }
        .el-time-picker {
          margin-right: 45px;
        }
        .s2 {
          width: 221px;
          height: 40px;
          border: none;
          outline: none;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          margin-right: 43px;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 188px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      width: 439px;
      height: 83px;
      background: #2d96e0;
      border-radius: 41px;
      border: none;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>