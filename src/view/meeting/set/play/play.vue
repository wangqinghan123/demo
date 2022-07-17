<template>
  <div class="play">
    <div class="content">
      <p class="cha"><img src="../../image/cha.png" alt="" @click="tui" /></p>

      <div class="my-video">
        <video-player
          class="goods-video"
          :playsinline="true"
          ref="videoPlayer"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @ready="playerReadied"
          @statechanged="playerStateChanged($event)"
        >
          ></video-player
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playerOptions: {
        poster: "https://www.hualigs.cn/image/61aed1d51553f.jpg", //视频封面图
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        // autoplay: true,
        // muted: true,
        sources: [
          {
            type: "video/mp4", //视频格式
            src: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4", //视频地址
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    tui() {
      this.$parent.play_s(false);
    },
    //------------------------
    onPlayerPlay(player) {
      console.log("1");
      //播放
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("2");
      //暂停
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log("3");
      //结束
      console.log("player ended!", player);
    },
    onPlayerLoadeddata(player) {
      console.log("4");
      //数据加载
      console.log("player Loadeddata!", player);
    },
    onPlayerWaiting(player) {
      console.log("5");
      //等待
      console.log("player Waiting!", player);
    },
    onPlayerPlaying(player) {
      //比赛
      console.log("6");
      console.log("player Playing!", player);
    },
    onPlayerTimeupdate(player) {
      console.log("7");
      //当前时间
      console.log("player Timeupdate!", player.currentTime());
    },
    onPlayerCanplay(player) {
      //是否播放
      console.log("8");
      console.log("player Canplay!", player);
    },
    onPlayerCanplaythrough(player) {
      //能够从头到尾播放
      console.log("15");
      console.log("player Canplaythrough!", player);
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      //当前更新状态
      console.log("10");
      // console.log("player current update state", playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      //示例玩家1准备好了
      console.log("11");
      // console.log("example player 1 readied", player);
      // player.currentTime(10);
      // //玩家已经准备好了
      // console.log("example 01: the player is readied", player);
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
};
</script>

<style lang="less" scoped>
.play {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(00, 00, 00, 0.75);
  overflow: hidden;

  .content {
    width: 1300px;
    height: 800px;
    background: #ffffff;
    border-radius: 20px;
    border: solid 1px #ccc;

    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    overflow: hidden;

    .cha {
      width: 100%;
      height: 30px;

      display: flex;
      justify-content: right;
      align-items: center;
      margin-right: 40px;
      margin-top: 40px;

      img {
        margin-right: 40px;
      }
    }
  }
  .my-video {
    width: 1217px;
    height: 629px;

    display: flex;
    justify-content: center;
    align-items: center;
    .goods-video {
      width: 90%;
      height: 80%;

      /deep/ .video-js {
        width: 100%;
        height: 100%;
      }

      /deep/.vjs-control-bar {
        bottom: 20px;
      }

      /deep/.vjs-big-play-button {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        line-height: 40px;

        .vjs-icon-placeholder {
          &:before {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            height: auto;
          }
        }
      }

      /deep/ .vjs-control-bar {
        // opacity: 1 !important;
        .vjs-play-control,
        .vjs-fullscreen-control {
          .vjs-icon-placeholder {
            &:before {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: auto;
              height: auto;
              font-size: 25px;
            }
          }
        }

        .vjs-volume-panel,
        .vjs-picture-in-picture-control {
          display: none;
        }
      }
    }
  }
}
</style>