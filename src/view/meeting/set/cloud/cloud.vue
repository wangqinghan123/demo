<template>
  <div class="yun">
    <ul>
      <li>
        <img src="../../image/bofang.png" alt="" />
        <span class="s1">{{ number }}</span>
        <span class="s2">{{ beginTime }}</span>
        <span class="s3">{{ finishTime }}</span>
        <span class="s4" @click="play_s()">播放</span>
        <span class="s5" @click="download">下载</span>
      </li>
    </ul>
    <play v-show="play_show" />
  </div>
</template>
<script>
import play from "../play/play.vue";
export default {
  data() {
    return {
      number: "20090459",
      beginTime: "2021-07-21 19:02",
      finishTime: "2021-07-21 20:02",
      //-------------------
      play_show: false,
    };
  },
  methods: {
    play_s(value) {
      if (this.play_show) {
        this.play_show = value;
      } else {
        //播放
        this.play_show = true;
      }
    },
    //--------------
    download() {
      //下载
    },
  },
  mounted() {
    console.log("bofang");
  },
  components: { play },
};
</script>
<style lang="less" scoped>
.yun {
  width: 100%;
  height: 100%;
  ul {
    overflow: auto;
    width: 100%;
    height: 780px;
    overflow-x: hidden;
    li {
      width: 100%;
      height: 98px;
      display: flex;
      align-items: center;
      border: solid 1px #e3e3e3;
      img {
        width: 42px;
        height: 42px;
        margin-left: 70px;
      }
      .s1 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        margin-left: 25px;
      }
      .s2 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        margin-left: 152px;
      }
      .s3 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        margin-left: 134px;
      }
      .s4 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2d97e1;
        margin-left: 508px;
      }
      .s5 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2d97e1;
        margin-left: 40px;
      }
    }
  }
}
</style>