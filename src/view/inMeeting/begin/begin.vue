<template>
  <div class="begin">
    <div class="background"></div>
    <div class="centent">
      <p><img src="../image/begin.png" alt="" /><span>不是主持人</span></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.begin {
  width: 288px;
  height: 75px;
  position: relative;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -144px;
  margin-top: -37.5px;
  z-index: 10;
  .background {
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.55;
    border-radius: 20px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .centent {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 34px;
        margin-right: 5px;
      }
      span {
        width: 167px;
        margin-left: 5px;

        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}
</style>