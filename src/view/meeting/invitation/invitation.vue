<template>
  <div class="invitation">
    <div class="in_top">
      <p>邀请入会提醒</p>
    </div>
    <div class="in_center">
      <p>{{ this.meeting.name }}邀请你入会</p>
    </div>
    <div class="in_bottom">
      <button class="btn1" @click="cancel">取消进入</button>
      <button class="btn2" @click="promptly">立即进入</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "王清函",
    };
  },
  props: ["meeting"], //总的接受父组件传过来的值，包括immediately：方法；meeting：收到被邀请的整个会议信息对象；
  methods: {
    promptly() {
      this.$emit("immediately", this.meeting.roomId);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="less" scoped>
.invitation {
  width: 620px;
  height: 330px;
  background: #fff;
  overflow: hidden;

  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -310px;
  margin-top: -165px;
  z-index: 100;
  border-radius: 5px;
  border: solid 2px #aa99ce;
  display: flex;
  flex-direction: column;
  .in_top {
    width: 100%;
    height: 50px;
    border-bottom: solid 2px #ebebeb;
    display: flex;
    align-items: center;
    p {
      width: 100%;
      font-size: 18px;
      font-weight: bolder;
      margin-left: 40px;
      color: #8c8c8c;
    }
  }
  .in_center {
    width: 100%;
    height: 216px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 23px;
      font-weight: bolder;
      color: #8c8c8c;
    }
  }
  .in_bottom {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -1px 5px #888888;
    .btn1 {
      width: 140px;
      height: 40px;
      border: none;
      background: #8c8c8c;
      font-size: 14px;
      font-weight: bolder;
      color: #fff;
      margin-right: 20px;
      border-radius: 5px;
    }

    .btn2 {
      width: 140px;
      height: 40px;
      border: none;
      background: #169bd5;
      font-size: 14px;
      font-weight: bolder;
      color: #fff;
      margin-left: 20px;
      border-radius: 5px;
    }
  }
}
</style>