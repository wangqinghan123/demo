<template>
  <div class="edition">
    <img :src="Render" alt="" class="one" />
    <span class="two">{{ number }}</span>
    <p class="three">
      {{
        text
      }}中控平台是面向企业移动办公推出的一款视频会议应用，遵循“功能极致、操作极简"的产品设计理念，为用户提供召开、加入等极简的会议服务体验。
    </p>
    <el-button type="danger" round class="btn1" @click="network"
      >网络监测</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: "V1.1.0",
      text: null,
      //-------
      Render: null,
      img1: require("../image/banben.png"),
      img2: require("../image/banben2.png"),
    };
  },
  mounted() {
    switch (_WebSocket.edition) {
      case 1:
        this.text = "先锋视讯云";
        this.Render = this.img1;
        break;
      case 2:
        this.text = "视讯云";
        this.Render = this.img2;
        break;
      case 3:
        this.text = "微盛网";
        this.Render = this.img2;
        break;
    }
  },
  methods: {
    network() {
      let num = this.$store.state.masking1;
      this.$store.dispatch("set_masking1", ++num);
    },
  },
};
</script>
<style lang="less" scoped>
.edition {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .one {
    width: 165px;
    height: 165px;
    margin-top: 336px;
  }
  .two {
    height: 27px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #555555;
    margin-top: 28px;
  }
  .three {
    width: 765px;
    height: 59px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #555555;
    line-height: 36px;
    text-align: center;
    margin-top: 56px;
  }
  .btn1 {
    width: 439px;
    height: 83px;
    margin-top: 109px;
    border-radius: 40px;
    font-size: 22px;
  }
  .op {
    width: 200px;
    height: 50px;
    background: red;
    z-index: 1000;
  }
}
</style>