// 引入等比适配插件
const px2rem = require("postcss-px2rem");
module.exports = {
  publicPath: "./",
  lintOnSave: false,
  outputDir: "meeting_ctrl",
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        view: "@/views",
        network: "@/network",
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            // 基准大小 baseSize，需要和rem.js中相同
            remUnit: 16,
          }),
        ],
      },
    },
  },
};
