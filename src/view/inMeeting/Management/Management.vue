<template>
  <div class="base">
    <div class="nav">
      <button :class="nav.all ? 'activate' : 'demise'" @click="all_click">
        全部参会方
      </button>

      <button
        :class="nav.make ? 'activate' : 'demise'"
        @click="make_click"
        v-if="getIsEmcee"
      >
        发言
      </button>
      <span class="flength" v-if="getIsEmcee">{{ get_make }}</span>
      <button
        :class="nav.raise ? 'activate' : 'demise'"
        @click="raise_click"
        v-if="getIsEmcee"
      >
        举手
      </button>
      <span class="jlength" v-if="getIsEmcee">{{ get_hands }}</span>
      <img src="../image/cha.png" alt="" class="cha" @click="cha" />
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //关于切换检测头部导航class名字是否添加的变量
      nav: {
        all: true,
        make: false,
        raise: false,
      },
    };
  },
  mounted() {
    this.$router.push("/home/all");
  },
  methods: {
    //导航的上的三个事件

    all_click() {
      this.nav = {
        all: true,
      };
      this.$router.push("/home/all");
    },

    make_click() {
      this.nav = {
        make: true,
      };
      this.$router.push("/home/make");
    },
    raise_click() {
      this.nav = {
        raise: true,
      };
      this.$router.push("/home/raise");
    },

    //调用父节点方法（控制点击管理参会放出现的大弹窗）
    cha() {
      this.$parent.manage1(false);
    },
  },
  computed: {
    ...mapGetters(["get_make", "get_hands", "getIsEmcee"]),
  },
};
</script>

<style lang="less" scoped>
.base {
  width: 1276px;
  height: 793px;
  background: #ffffff;
  box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.64);
  border-radius: 24px;
  position: absolute;
  left: 372px;
  top: 146px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  .nav {
    width: 100%;
    height: 103px;
    border-radius: 20px 20px 0 0;
    background: url("./image/navbackground.png") no-repeat;
    background-size: 100%;
    position: relative;
    button {
      width: 256px;
      height: 59px;
      border: none;
      border-radius: 10px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-left: 26px;
      margin-top: 24px;
    }
    .activate {
      background: #2d97e1;
    }
    .demise {
      background: rgba(0, 0, 0, 0.25);
    }
    .cha {
      width: 18px;
      height: 18px;
      margin-left: 380px;
      position: absolute;
      right: 34px;
      top: 27px;
    }

    .flength {
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      position: absolute;
      left: 500px;
      top: 40px;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
    .jlength {
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      position: absolute;
      left: 780px;
      top: 40px;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .content {
    width: 100%;
    height: 690px;
    border-radius: 0px 0px 20px 20px;
  }
}
</style>