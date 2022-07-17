<template>
  <div>
    <el-dialog
      top="97px"
      :close-on-click-modal="model"
      :visible.sync="dialogTableVisiblee"
      @close="setClosee"
    >
      <div class="set-div">
        <div class="set-left">
          <ul>
            <li
              v-for="(item, index) in leftMenu"
              :key="index"
              :class="{ li1: item.id == num }"
              @click="tab(item.id)"
            >
              <span>{{ item.name }}</span>
              <img :class="{ img1: item.id == num }" :src="item.image" />
            </li>
          </ul>
        </div>
        <div class="set-right">
          <div v-show="num == 0">
            <div class="equally">
              <span>切换音视频</span>
            </div>
            <p class="camera">摄像头</p>
            <div class="camera-model">
              <div v-for="(a, b) in list" :key="b" class="select">
                <span>{{ a.name }}</span>
                <img
                  v-for="(c, d) in image"
                  :key="d"
                  @click="patrolId(a.name)"
                  :src="activeIndex == a.name ? c.select : c.selectGrey"
                  alt=""
                />
              </div>
            </div>
            <p class="camera1">麦克风</p>
            <div class="camera-model1">
              <div v-for="(a, b) in microphoneList" :key="b" class="select">
                <span>{{ a.name }}</span>
                <img
                  v-for="(c, d) in image"
                  :key="d"
                  @click="microphoneId(a.name)"
                  :src="microphoneIndex == a.name ? c.select : c.selectGrey"
                  alt=""
                />
              </div>
            </div>
            <p class="camera1">扬声器</p>
            <div class="camera-model1">
              <div v-for="(a, b) in speakerList" :key="b" class="select">
                <span>{{ a.name }}</span>
                <img
                  v-for="(c, d) in image"
                  :key="d"
                  @click="speakerId(a.name)"
                  :src="speakerIndex == a.name ? c.select : c.selectGrey"
                  alt=""
                />
              </div>
            </div>
            <!-- <div>
              <el-button class="confirm" @click="fontText" type="primary"
                >确认</el-button
              >
            </div> -->
          </div>
          <div v-show="num == 1">
            <div
              class="loading-time"
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <div class="equally">
                <span>会议管理</span>
              </div>
              <p class="camera">会议模式</p>
              <div class="camera-model">
                <div v-for="(a, b) in patternList" :key="b" class="select">
                  <span>{{ a.name }}</span>
                  <img
                    v-for="(c, d) in image"
                    :key="d"
                    @click="patternId(a)"
                    :src="patternIndex == a.id ? c.select : c.selectGrey"
                    alt=""
                  />
                </div>
              </div>
              <p class="camera1">会议加锁</p>
              <div class="camera-model2">
                <div class="select">
                  <span>会议加锁</span>
                  <el-switch
                    class="el-switch"
                    @change="lockChange"
                    v-model="value3"
                  >
                  </el-switch>
                </div>
              </div>
              <p class="camera1">会议加密</p>
              <div class="camera-model3">
                <div class="select">
                  <span>会议加密</span>
                  <el-switch
                    class="el-switch"
                    @change="encryptionChange"
                    v-model="encryptionValue"
                  >
                  </el-switch>
                </div>
                <div class="select">
                  <span>会议密码</span>

                  <div class="numberPass">
                    <el-input
                      :disabled="passwordIndex"
                      show-password
                      @blur="tests"
                      v-model="passwordInput"
                      maxlength="10"
                      placeholder="会议密码是10位数字"
                      class="numberPass_inp"
                    ></el-input>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div v-show="num == 2">
            <div class="equally">
              <span>画面布局设置</span>
            </div>
            <div class="frame-div">
              <div
                v-for="(item, index) in frameImg"
                :key="index"
                @click="frameId(item)"
                :class="[
                  frame.frameModel == item.model && frame.frameType == item.id
                    ? 'frame1'
                    : 'frame',
                ]"
              >
                <img
                  v-show="
                    item.model == frame.frameModel && item.id == frame.frameType
                  "
                  class="img1"
                  src="../assets/roundPatrol/select.png"
                />
                <img :src="item.img" />
                <p>{{ item.name }}</p>
              </div>
            </div>
            <div>
              <el-button class="confirm" @click="determine" type="primary"
                >确认</el-button
              >
            </div>
          </div>
          <div v-show="num == 3">
            <div class="equally">
              <span>共享设置</span>
            </div>
            <div class="camera-model2">
              <div class="select">
                <span>数据共享</span>
                <el-switch
                  class="el-switch"
                  @change="dataShare"
                  v-model="shareValue"
                  :disabled="dataShare_wang"
                >
                </el-switch>
              </div>
            </div>
          </div>
          <div v-show="num == 4">
            <div class="equally">
              <span>字幕设置</span>
            </div>
            <div>
              <div class="camera-model2">
                <div class="select">
                  <span>启用字幕</span>
                  <el-switch
                    class="el-switch"
                    @change="enableSubtitles"
                    v-model="subtitlesValue"
                  >
                  </el-switch>
                </div>
              </div>
              <div v-show="subtitleShow">
                <div class="banner-data">
                  <div class="banner-text">
                    <p class="camera">字幕内容</p>
                    <div class="textarea">
                      <textarea
                        style="
                          border: 0;
                          border-radius: 5px;
                          background-color: #f5f5f5;
                          width: 100%;
                          height: 100%;
                          padding: 25px 0px 0px 28px;
                          resize: none;
                          font-size: 22px;
                        "
                        placeholder="请输入字幕内容"
                        v-model="textarea"
                      >
                      </textarea>
                    </div>
                    <p class="camera2">字幕样式</p>
                    <div class="title-styles">
                      <div class="typeface">
                        <span class="size-name">推荐方案</span>
                        <div class="typeface-progra">
                          <div
                            v-for="(item, index) in programmeImg"
                            :key="index"
                            @click="recommend(item)"
                            :class="[
                              fontColorIndex == item.fontColor &&
                              bgFontColorIndex == item.bgColor
                                ? 'programme'
                                : 'programme1',
                            ]"
                          >
                            <img :src="item.img" />
                          </div>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">字体大小</span>
                        <div class="typeface-size">
                          <div
                            class="siza"
                            v-for="(item, index) in typefaceList"
                            :key="index"
                          >
                            <img
                              v-for="(a, b) in image"
                              :key="b"
                              :src="
                                typefaceIndex === item.id
                                  ? a.select
                                  : a.selectGrey
                              "
                              @click="typefaceId(item.id)"
                            />
                            <span>{{ item.name }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">字体颜色</span>
                        <div class="typeface-sizeColour">
                          <div
                            class="bannerColor1"
                            :style="{
                              'background-color': fontColorIndex,
                            }"
                          ></div>
                          <div class="el">
                            <img
                              :class="{
                                arrowTransform: colourValue,
                                arrowTransformReturn: !colourValue,
                              }"
                              src="../assets/roundPatrol/lower.png"
                              alt=""
                              @click="topColor"
                            />
                            <el-popover
                              popper-class="popover"
                              v-model="popover2"
                              placement="bottom"
                              width="200"
                              trigger="click"
                            >
                              <div
                                v-for="(item, index) in color"
                                :key="index"
                                :style="{
                                  width: '50px',
                                  height: '40px',
                                  background: item.bgColor,
                                  'margin-left': '10px',
                                }"
                                @click="fontColor(item.bgColor)"
                              ></div>
                            </el-popover>
                          </div>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">对齐方式</span>
                        <div class="typeface-size1">
                          <div
                            class="size"
                            v-for="(item, index) in alignmentList"
                            :key="index"
                          >
                            <img
                              v-for="(a, b) in image"
                              :key="b"
                              :src="
                                alignmentIndex === item.id
                                  ? a.select
                                  : a.selectGrey
                              "
                              @click="alignmentId(item.id)"
                            />
                            <span>{{ item.name }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">字幕速度</span>
                        <div class="typeface-size12">
                          <div
                            class="size"
                            v-for="(item, index) in speedList"
                            :key="index"
                          >
                            <img
                              v-for="(a, b) in image"
                              :key="b"
                              :src="
                                speedIndex === item.id ? a.select : a.selectGrey
                              "
                              @click="speedId(item.id)"
                            />
                            <span>{{ item.name }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">背景颜色</span>
                        <div class="typeface-sizeColour">
                          <div
                            class="bannerColor1"
                            :style="{
                              'background-color': bgFontColorIndex,
                            }"
                          ></div>
                          <div class="el">
                            <img
                              :class="{
                                arrowTransform: colourValue3,
                                arrowTransformReturn: !colourValue3,
                              }"
                              src="../assets/roundPatrol/lower.png"
                              alt=""
                              @click="bgtopColor"
                            />
                            <el-popover
                              popper-class="popover"
                              v-model="popover4"
                              placement="bottom"
                              width="200"
                              trigger="click"
                            >
                              <div
                                v-for="(item, index) in color"
                                :key="index"
                                :style="{
                                  width: '50px',
                                  height: '40px',
                                  background: item.bgColor,
                                  'margin-left': '10px',
                                }"
                                @click="bgFontColor(item.bgColor)"
                              ></div>
                            </el-popover>
                          </div>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">显示高度</span>
                        <div class="typeface-size">
                          <el-slider
                            class="el-sliderr"
                            @change="sliderValue(textShowHeight)"
                            v-model="textShowHeight"
                            :step="10"
                            :max="50"
                          ></el-slider>
                          <span>{{ textShowHeight }}%</span>
                        </div>
                      </div>
                      <div class="typeface">
                        <span class="size-name">背景透明度</span>
                        <div class="typeface-size">
                          <el-slider
                            class="el-sliderr"
                            @change="pellucidity(textTextBgAlpha)"
                            v-model="textTextBgAlpha"
                            :step="10"
                          ></el-slider>
                          <span>{{ textTextBgAlpha }}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <el-button
                        class="confirm"
                        @click="determineCamera"
                        type="primary"
                        >确认</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="num == 5">
            <div class="equally">
              <span>会议横幅设置</span>
            </div>
            <div class="camera-model2">
              <div class="select">
                <span>启用横幅</span>
                <el-switch
                  class="el-switch"
                  :width="40"
                  @change="bannerShare"
                  v-model="bannerValue"
                >
                </el-switch>
              </div>
            </div>
            <div v-show="bannerShow">
              <div class="banner-data">
                <div class="banner-text">
                  <p class="camera">横幅内容</p>
                  <div class="textarea">
                    <textarea
                      style="
                        border: 0;
                        border-radius: 5px;
                        background-color: #f5f5f5;
                        width: 100%;
                        height: 100%;
                        padding: 25px 0px 0px 28px;
                        resize: none;
                        font-size: 22px;
                      "
                      placeholder="请输入字幕内容"
                      v-model="bannerTextarea"
                    >
                    </textarea>
                  </div>
                  <p class="camera2">横幅样式</p>
                  <div class="title-styles">
                    <div class="typeface">
                      <span class="size-name">推荐方案</span>
                      <div class="typeface-progra">
                        <div
                          v-for="(item, index) in programmeImg"
                          :key="index"
                          @click="brannerRecommend(item)"
                          :class="[
                            bannerColorIndex == item.fontColor &&
                            bannerBagCoIndex == item.bgColor
                              ? 'programme'
                              : 'programme1',
                          ]"
                        >
                          <img :src="item.img" />
                        </div>
                      </div>
                    </div>
                    <div class="typeface">
                      <span class="size-name">字体大小</span>
                      <div class="typeface-size">
                        <div
                          class="siza"
                          v-for="(item, index) in typefaceList"
                          :key="index"
                        >
                          <img
                            v-for="(a, b) in image"
                            :key="b"
                            :src="
                              bannerTypefaceIndex === item.id
                                ? a.select
                                : a.selectGrey
                            "
                            @click="bannerTypefaceId(item.id)"
                          />
                          <span>{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="typeface">
                      <span class="size-name">字体颜色</span>
                      <div class="typeface-sizeColour">
                        <div
                          class="bannerColor1"
                          :style="{
                            'background-color': bannerColorIndex,
                          }"
                        ></div>
                        <div class="el">
                          <img
                            :class="{
                              arrowTransform: colourValue1,
                              arrowTransformReturn: !colourValue1,
                            }"
                            src="../assets/roundPatrol/lower.png"
                            alt=""
                            @click="bannerFontColor"
                          />
                          <el-popover
                            popper-class="popover"
                            v-model="popover3"
                            placement="bottom"
                            width="200"
                            trigger="click"
                          >
                            <div
                              v-for="(item, index) in color"
                              :key="index"
                              :style="{
                                width: '50px',
                                height: '40px',
                                background: item.bgColor,
                                'margin-left': '10px',
                              }"
                              @click="fontColor1(item.bgColor)"
                            ></div>
                          </el-popover>
                        </div>
                      </div>
                    </div>
                    <div class="typeface">
                      <span class="size-name">对齐方式</span>
                      <div class="typeface-size1">
                        <div
                          class="size"
                          v-for="(item, index) in alignmentList"
                          :key="index"
                        >
                          <img
                            v-for="(a, b) in image"
                            :key="b"
                            :src="
                              bannerMentIndex === item.id
                                ? a.select
                                : a.selectGrey
                            "
                            @click="bannerMentId(item.id)"
                          />
                          <span>{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="typeface">
                <span class="size-name">字幕速度</span>
                <div class="typeface-size12">
                  <div
                    class="size"
                    v-for="(item, index) in speedList"
                    :key="index"
                  >
                    <img
                      v-for="(a, b) in image"
                      :key="b"
                      :src="
                        banerSpeedIndex === item.id ? a.select : a.selectGrey
                      "
                      @click="bannerSpeedId(item.id)"
                    />
                    <span>{{ item.name }}</span>
                  </div>
                </div>
              </div> -->
                    <div class="typeface">
                      <span class="size-name">背景颜色</span>
                      <div class="typeface-sizeColour">
                        <div
                          class="bannerColor1"
                          :style="{
                            'background-color': bannerBagCoIndex,
                          }"
                        ></div>
                        <div class="el">
                          <img
                            :class="{
                              arrowTransform: colourValue2,
                              arrowTransformReturn: !colourValue2,
                            }"
                            src="../assets/roundPatrol/lower.png"
                            alt=""
                            @click="bannerBagColor"
                          />
                          <el-popover
                            popper-class="popover"
                            v-model="popoverBag"
                            placement="bottom"
                            width="200"
                            trigger="click"
                          >
                            <div
                              v-for="(item, index) in color"
                              :key="index"
                              :style="{
                                width: '50px',
                                height: '40px',
                                background: item.bgColor,
                                'margin-left': '10px',
                              }"
                              @click="bagColor(item.bgColor)"
                            ></div>
                          </el-popover>
                        </div>
                      </div>
                    </div>
                    <div class="typeface">
                      <span class="size-name">背景透明度</span>
                      <div class="typeface-size">
                        <el-slider
                          class="el-sliderr"
                          @change="bannerPellucidity(bannerTextBgAlpha)"
                          v-model="bannerTextBgAlpha"
                          :step="10"
                        ></el-slider>
                        <span>{{ bannerTextBgAlpha }}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <el-button
                      class="confirm"
                      @click="determineBanner"
                      type="primary"
                      >确认</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="num == 6">
            <div class="equally">
              <span>会议信息</span>
            </div>
            <div class="content-black">
              <div class="fault">
                <span>会议主题</span>
                <div class="right-fault">{{ getRomInfo.theme }}</div>
              </div>
              <div class="fault">
                <span>会议号</span>
                <div class="right-num">{{ getRomInfo.roomId }}</div>
              </div>
              <div class="fault">
                <span>创建者ID</span>
                <div class="right-id">
                  {{ getRomInfo.creatorId | msgFormat }}
                </div>
              </div>
              <div class="fault">
                <span>用户名称</span>
                <div class="right-name">{{ getRomInfo.userName }}</div>
              </div>
              <div class="fault">
                <span>接入服务</span>
                <div class="right-service">{{ getRomInfo.services }}</div>
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
      //会议信息的数据
      getRomInfo: {
        theme: "",
        roomId: "",
        creatorId: "",
        userName: "",
        services: "",
      },
      subtitleShow: false, //如果没有启用字幕就不能配置参数
      bannerShow: false, //如果没有启用横幅就不能配置参数
      loading2: false, //加载效果的初始值
      passwordIndex: true, //会议加密（是否禁用el-input）
      dialogTableVisiblee: this.setUpIndex, //设置弹框是否弹出
      model: false, //是否可以通过点击 modal 关闭 轮巡弹框
      num: 1, //设置弹框弹出展示切换音视频的初始值
      roomId: "", //房间号
      fontColorIndex: "#FFFFFF", //字幕字体颜色初始值
      bannerColorIndex: "#FFFFFF", //横幅字体颜色初始值
      bgFontColorIndex: "#000000", //字幕背景颜色初始值
      bannerBagCoIndex: "#000000", //横幅背景颜色初始值
      colourValue: false, //字幕字体颜色点击小箭头来改变他的样式
      colourValue3: false, //字幕背景颜色点击小箭头来改变他的样式
      popover2: false, //字幕字体颜色
      popover4: false, //字幕背景颜色
      colourValue1: false, //横幅字体颜色点击小箭头来改变他的样式
      colourValue2: false, //横幅背景颜色点击小箭头来改变他的样式
      popover3: false, //字体颜色选项的弹框
      popoverBag: false, //背景颜色选项的弹框
      textarea: "", //字幕内容
      bannerTextarea: "", //横幅内容
      bannerContent: {}, //横幅配置的样式、内容
      value3: false, //会议加锁
      loackIndex: "", //加锁
      shareValue: false, //数据共享
      subtitlesValue: false, //启用字幕
      bannerValue: false, //启用横幅
      activeIndex: "", //摄像头
      microphoneIndex: "", //麦克风
      speakerIndex: "", //扬声器
      patternIndex: "", //会议模式
      encryptionValue: false, //会议加密
      frameIndex: 0, //会议画面布局，
      typefaceIndex: "小", //字体大小
      alignmentIndex: "居中", //对齐方式
      bannerMentIndex: "居中", //横幅的对齐方式
      bannerTypefaceIndex: "小", //横幅的字体大小
      speedIndex: "低速", //字幕速度
      banerSpeedIndex: "低速", //横幅字幕速度
      bannerTextBgAlpha: 0, //横幅背景透明度
      textShowHeight: 0, //显示高度
      textTextBgAlpha: 0, //背景透明度
      passwordInput: "", //会议密码
      // passwordValue: true, //会议加密
      //------是否禁用数据共享---------
      dataShare_wang: false,
      number: "100",
      frame: {
        //画面布局的信息
        frameModel: "",
        frameType: "",
      },
      typefaceList: [
        //字体大小
        {
          id: "小",
          name: "小",
        },
        {
          id: "中",
          name: "中",
        },
        {
          id: "大",
          name: "大",
        },
      ],
      alignmentList: [
        //对齐方式
        {
          id: "居左",
          name: "居左",
        },
        {
          id: "居中",
          name: "居中",
        },
        {
          id: "居右",
          name: "居右",
        },
      ],
      speedList: [
        //字幕速度
        {
          id: "低速",
          name: "低速",
        },
        {
          id: "中速",
          name: "中速",
        },
        {
          id: "高速",
          name: "高速",
        },
      ],
      color: [
        //背景颜色
        {
          bgColor: "#FFFF00",
        },
        {
          bgColor: "#FF8C00",
        },
        {
          bgColor: "#FF0000",
        },
        {
          bgColor: "#00FF00",
        },
        {
          bgColor: "#0000FF",
        },
        {
          bgColor: "#FF00FF",
        },
        {
          bgColor: "#FFFFFF",
        },
        {
          bgColor: "#808080",
        },
        {
          bgColor: "#000000",
        },
      ],
      list: [], //摄像头基本信息
      microphoneList: [], //麦克风基本信息
      speakerList: [], //扬声器基本信息
      patternList: [
        //会议模式基本信息
        {
          name: "自由模式",
          id: "1",
          model: "0",
        },
        {
          name: "主持模式",
          id: "0",
          model: "1",
        },
      ],
      programmeImg: [
        //推荐方案的基本信息
        {
          img: require("../assets/programme/black-grey.png"),
          id: 1,
          fontSize: "中",
          fontColor: "#ffffff",
          alignment: "居中",
          bgColor: "#000000",
          bgOption: 50,
        },
        {
          img: require("../assets/programme/blue-or.png"),
          id: 2,
          fontSize: "中",
          fontColor: "#ebb81d",
          alignment: "居中",
          bgColor: "#2739a5",
          bgOption: 20,
        },
        {
          img: require("../assets/programme/grey-blue.png"),
          id: 3,
          fontSize: "中",
          fontColor: "#ffffff",
          alignment: "居中",
          bgColor: "#212194",
          bgOption: 20,
        },
        {
          img: require("../assets/programme/red-grey.png"),
          id: 4,
          fontSize: "中",
          fontColor: "#ff0000",
          alignment: "居中",
          bgColor: "#ffffff",
          bgOption: 0,
        },
        {
          img: require("../assets/programme/or-red.png"),
          id: 5,
          fontSize: "中",
          fontColor: "#fff000",
          alignment: "居中",
          bgColor: "#ff0000",
          bgOption: 0,
        },
      ],
      image: [
        //选中状态
        {
          selectGrey: require("../assets/roundPatrol/selectGrey.png"),
          select: require("../assets/roundPatrol/select.png"),
        },
      ],
      frameImg: [
        //画面布局的基本信息
        {
          img: require("../assets/frame-icon/one.png"),
          id: "1",
          name: "自动",
          model: "1",
        },
        {
          img: require("../assets/frame-icon/one.png"),
          id: "1",
          name: "全屏",
          model: "2",
        },
        {
          img: require("../assets/frame-icon/two.png"),
          id: "2",
          name: "等屏",
          model: "1",
        },
        // {
        //   img: require("../assets/frame-icon/three.png"),
        //   id: "3",
        //   name: "3分屏",
        //   model: "1",
        // },
        {
          img: require("../assets/frame-icon/four1.png"),
          id: "4",
          name: "4分屏",
          model: "1",
        },
        // {
        //   img: require("../assets/frame-icon/four.png"),
        //   id: "4",
        //   name: "4分屏",
        //   model: "2",
        // },
        // {
        //   img: require("../assets/frame-icon/five1.png"),
        //   id: "5",
        //   name: "5分屏",
        //   model: "1",
        // },
        {
          img: require("../assets/frame-icon/five.png"),
          id: "5",
          name: "5分屏",
          model: "2",
        },
        {
          img: require("../assets/frame-icon/six.png"),
          id: "6",
          name: "6分屏",
          model: "1",
        },
        // {
        //   img: require("../assets/frame-icon/seven.png"),
        //   id: "7",
        //   name: "7分屏",
        //   model: "1",
        // },
      ],
      leftMenu: [
        //设置的left导航
        // {
        //   id: "0",
        //   name: "切换音视频",
        //   image: require("../assets/personnel-icon/right.png"),
        // },
        {
          id: "1",
          name: "会议管理",
          image: require("../assets/personnel-icon/right.png"),
        },
        {
          id: "2",
          name: "画面布局设置",
          image: require("../assets/personnel-icon/right.png"),
        },
        {
          id: "3",
          name: "共享设置",
          image: require("../assets/personnel-icon/right.png"),
        },
        // {
        //   id: "4",
        //   name: "字幕设置",
        //   image: require("../assets/personnel-icon/right.png"),
        // },
        // {
        //   id: "5",
        //   name: "会议横幅设置",
        //   image: require("../assets/personnel-icon/right.png"),
        // },
        {
          id: "6",
          name: "会议信息",
          image: require("../assets/personnel-icon/right.png"),
        },
      ],
    };
  },
  mounted() {
    this.data;
  },
  methods: {
    //字幕字体颜色
    topColor() {
      this.colourValue = !this.colourValue;
      this.popover2 = !this.popover2;
    },
    //字幕背景颜色
    bgtopColor() {
      this.colourValue3 = !this.colourValue3;
      this.popover4 = !this.popover4;
    },
    //横幅字体颜色
    bannerFontColor() {
      this.colourValue1 = !this.colourValue1;
      this.popover3 = !this.popover3;
    },
    //横幅背景颜色
    bannerBagColor() {
      this.colourValue2 = !this.colourValue2;
      this.popoverBag = !this.popoverBag;
    },
    subtitleResults(data) {
      // console.log(data);
      if (data.result == 0) {
      } else {
        this.$message({
          message: "字幕设置失败，请重试！",
          type: "warning",
        });
      }
    },
    bannerResults(data) {
      // console.log(data);
      if (data.result == 0) {
      } else {
        this.$message({
          message: "横幅设置失败, 请重试！",
          type: "warning",
        });
      }
    },
    //字幕设置指令
    subtitleData() {
      let parament = {
        cmdCode: "setting",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
        option: "subtitle",
        setting: {
          content: this.textarea, //字幕内容
          isSubtitle: true,
          switch: this.subtitlesValue, //是否启用字幕
          textAlignment: this.alignmentIndex, //对齐方式
          textColor: this.fontColorIndex, //字体颜色
          textRollingSpeed: this.speedIndex, //字幕速度
          textBg: this.bgFontColorIndex, //字幕背景
          textShowHeight: this.textShowHeight, //字幕高度
          textSize: this.typefaceIndex, //字幕大小
          textTextBgAlpha: this.textTextBgAlpha, //背景透明度
        },
      };
      this.ws.sendMsg(parament, null, this.subtitleResults);
    },
    data() {
      let data = {
        code: 0,
        data: {
          companyId: "COM202108201723370000001",
          id: "NOD202108201723370000001",
          name: "蒸涪企业",
          userCount: 0,
          subNodeCount: 1,
          rootId: "NOD202108201723370000001",
          parentId: "none",
          subNode: [
            {
              companyId: "COM202108201723370000001",
              id: "NOD202108271106180000001",
              name: "北京办",
              userCount: 0,
              subNodeCount: 2,
              rootId: "NOD202108201723370000001",
              parentId: "NOD202108201723370000001",
              subNode: [
                {
                  companyId: "COM202108201723370000001",
                  id: "NOD202108271107390000001",
                  name: "创新中心",
                  userCount: 3,
                  subNodeCount: 0,
                  rootId: "NOD202108201723370000001",
                  parentId: "NOD202108271106180000001",
                  subNode: null,
                },
                {
                  companyId: "COM202108201723370000001",
                  id: "NOD202108271107520000001",
                  name: "支撑中心",
                  userCount: 7,
                  subNodeCount: 0,
                  rootId: "NOD202108201723370000001",
                  parentId: "NOD202108271106180000001",
                  subNode: null,
                },
              ],
            },
          ],
        },
        message: "操作成功",
      };
      const List = [];
      for (let i in data) {
        if (data[i]) {
          List.push({ id: data[i].id, name: data[i].name });
        }
        if (data[i].subNode) {
          this.data(data[i].subNode);
        }
      }
      return List;
    },
    //字体颜色
    fontColor(color) {
      // console.log(color);
      if (color) {
        this.fontColorIndex = color;
        if (this.fontColorIndex) {
          this.popover2 = false;
          this.colourValue = false;
        }
      }
    },
    //字幕背景颜色
    bgFontColor(color) {
      // console.log(color);
      if (color) {
        this.bgFontColorIndex = color;
        if (this.bgFontColorIndex) {
          this.colourValue3 = false;
          this.popover4 = false;
        }
      }
    },
    //横幅字体颜色
    fontColor1(color) {
      // console.log(color);
      if (color) {
        this.bannerColorIndex = color;
      }
    },
    //横幅背景颜色的选择
    bagColor(color) {
      if (color) {
        this.bannerBagCoIndex = color;
        // if (this.bannerBagCoIndex) {
        //   this.popoverBag = false;
        //   this.colourValue2 = false;
        //   let bannerParamt = {
        //     cmdCode: "setting",
        //     peerId: sessionStorage.getItem("peerId"),
        //     binderId: sessionStorage.getItem("binderId"),
        //     option: "subtitle",
        //     setting: {
        //       content: this.bannerTextarea,
        //       isSubtitle: false,
        //       switch: this.bannerValue,
        //       textAlignment: this.bannerMentIndex,
        //       textBg: this.bannerBagCoIndex,
        //       textColor: this.bannerColorIndex,
        //       textRollingSpeed: "低速",
        //       textShowHeight: 0,
        //       textSize: this.bannerTypefaceIndex,
        //       textTextBgAlpha: this.bannerTextBgAlpha,
        //     },
        //   };
        //   this.ws.sendMsg(bannerParamt, null, this.bannerResults);
        // }
      }
    },
    setUpCallback(data) {
      if (data.result == 0) {
        this.patternIndex = data.meeting.roomMode;

        this.loackIndex = data.meeting.lock;
        this.roomId = data.meeting.roomId;
        this.getRomInfo = {
          theme: data.meeting.title,
          roomId: data.meeting.roomId,
          creatorId: data.meeting.managerId,
          userName: data.meeting.currentBindDeviceName,
          services: data.meeting.signalAdd,
        };
        let dataShareStatus;
        data.meeting.paticipators.forEach((item, index) => {
          if (item.peerId == data.meeting.managerId) {
            dataShareStatus = item.dataShareStatus;
          }
        });
        if (dataShareStatus == 2) {
          this.shareValue = false;
        } else {
          this.shareValue = true;
        }
        if (this.loackIndex == 1) {
          this.value3 = true;
        } else {
          this.value3 = false;
        }
      }
    },
    //设置-切换音视频-设置默认指令返回的结果
    setCallback(data) {
      console.log(data);
    },
    //更改画面布局指令返回的结果
    frameData(data) {
      // console.log(data);
      if (data.result === 0) {
        this.ws.addEvent("getSpeakerPanel", null, this.notification); //会议布局的通知
      }
    },
    //会议加锁指令返回的结果
    LockeMode(data) {
      // console.log(data);
    },
    dataSharing(data) {
      // console.log(data);
      if (data.result == 0) {
      } else {
        this.$message({
          message: data.errorMsg,
          type: "warning",
        });
      }
    },
    layoutIndex(data) {
      // console.log(data);
      if (data.result == 0) {
        this.frame.frameModel = data.layout.layoutMode;
        this.frame.frameType = data.layout.layoutType;
      }
    },
    encryptionData(data) {
      // console.log(data);
      // if (data.result == 0) {
      this.loading2 = true;
      setTimeout(() => {
        if (data.result == 0) {
          this.loading2 = false;
        }
      }, 1000);
      // }
    },
    //会议加密
    passwordData(res) {
      // console.log(res);
      if (res.result == 0) {
        this.ws.addEvent("setRoomPassword", null, this.encryptionData); //会议加密的通知
      }
    },
    //切换音视频的信息
    switchVideo(newResult) {
      console.log(newResult);
      if (newResult.result == 0) {
        this.list = newResult.camDevices.cams;
        this.speakerList = newResult.speakerDevices.speakers;
        this.microphoneList = newResult.micDevices.mics;
        // console.log(this.microphoneList);
        // console.log(this.speakerList);
        this.activeIndex = newResult.camDevices.camDefault;
        this.microphoneIndex = newResult.micDevices.micDefault;
        this.speakerIndex = newResult.speakerDevices.speakerDefault;
      }
    },
    //等待更改画面布局的通知
    notification(e) {
      // console.log(e);
      if (e.result == 0) {
      } else {
        this.$message({
          message: "画面布局配置失败！",
          type: "warning",
        });
      }
    },
    //关闭设置弹框
    setClosee() {
      // console.log("0.0");
      this.$emit("update:setUpIndex", false);
    },
    deviceData() {
      let parment = {
        cmdCode: "getDeviceInfo", //获取切换音视频的信息指令
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
      };
      this.ws.sendMsg(parment, null, this.switchVideo);
    },
    tab(index) {
      let _this = this;
      _this.num = index;
      // console.log(_this.num)
      // console.log(index);
      if (index == 0) {
        //切换音视频
        _this.deviceData();
      } else if (index == 2) {
        //画面布局
        let parment = {
          cmdCode: "getSpeakerPanel", //获取会议布局的指令
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
        };
        this.ws.sendMsg(parment, null, this.layoutIndex);
      } else if (index == 5) {
        //横幅设置
        this.$Throw.bannerData2({}, this.roomId).then((res) => {
          // console.log(res);
          if (res.data.code == 0) {
            if (res.data.data.switch == false) {
              this.bannerShow = false;
            } else {
              this.bannerShow = true;
            }
            this.bannerTextarea = res.data.data.content;
            this.bannerValue = res.data.data.switch;
            this.bannerMentIndex = res.data.data.textAlignment;
            this.bannerBagCoIndex = res.data.data.textBg;
            this.bannerColorIndex = res.data.data.textColor;
            this.bannerTypefaceIndex = res.data.data.textSize;
            this.bannerTextBgAlpha = res.data.data.textTextBgAlpha;
          }
        });
      } else if (index == 4) {
        //字幕设置
        this.$Throw.subtitleData2({}, this.roomId).then((res) => {
          // console.log(res);
          if (res.data.code == 0) {
            if (res.data.data.switch == false) {
              this.subtitleShow = false;
            } else {
              this.subtitleShow = true;
            }
            this.textarea = res.data.data.content; //字幕内容
            this.subtitlesValue = res.data.data.switch; //是否启用字幕
            this.alignmentIndex = res.data.data.textAlignment; //对齐方式
            this.fontColorIndex = res.data.data.textColor; //字体颜色
            this.speedIndex = res.data.data.textRollingSpeed; //字幕速度
            this.bgFontColorIndex = res.data.data.textBg; //字幕背景
            this.textShowHeight = res.data.data.textShowHeight; //字幕高度
            this.typefaceIndex = res.data.data.textSize; //字幕大小
            this.textTextBgAlpha = res.data.data.textTextBgAlpha; //背景透明度
          }
        });
      } else if (index == 6) {
        //会议信息
        this.conference();
      }
    },
    //摄像头
    patrolId(name) {
      this.activeIndex = name;
      if (this.activeIndex == name) {
        let parmeter = {
          cmdCode: "changeDefaultDevice", //设置-切换音视频-设置默认的结果
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          camName: this.activeIndex,
          micName: this.microphoneIndex,
          speakerName: this.speakerIndex,
        };
        this.ws.sendMsg(parmeter, null, this.setCallback);
      }
    },
    //扬声器
    speakerId(name) {
      this.speakerIndex = name;
      if (this.speakerIndex == name) {
        let parmeter = {
          cmdCode: "changeDefaultDevice", //设置-切换音视频-设置默认的结果
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          camName: this.activeIndex,
          micName: this.microphoneIndex,
          speakerName: this.speakerIndex,
        };
        this.ws.sendMsg(parmeter, null, this.setCallback);
      }
    },
    //麦克风
    microphoneId(name) {
      console.log(name);
      this.microphoneIndex = name;
      if (this.microphoneIndex == name) {
        let parmeter = {
          cmdCode: "changeDefaultDevice", //设置-切换音视频-设置默认的结果
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          camName: this.activeIndex,
          micName: this.microphoneIndex,
          speakerName: this.speakerIndex,
        };
        this.ws.sendMsg(parmeter, null, this.setCallback);
      }
    },
    setJoinData(data) {
      // 获取会议信息返回的结果
      this.$store.dispatch("set_roomMode", data.meeting.roomMode); //把信息压到vuex里
    },
    //会议模式
    patternId(a) {
      let _this = this;
      _this.patternIndex = a.id;
      let parmeter = {
        cmdCode: "changeMode", //更改会议模式指令
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
        roomMode: a.model,
      };
      _this.ws.sendMsg(parmeter, null, _this.conferenceMode);
    },
    conferenceMode(res) {
      //更改会议模式返回的结果
      if (res.result == 0) {
        let parmeter = {
          cmdCode: "getRoomInfo", //获取会议信息指令
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
        };
        this.ws.sendMsg(parmeter, null, this.setJoinData);
      }
    },
    //权限提醒
    authorityReminder() {
      this.$message({
        message: "你不是主持人，没有操作权限",
        type: "warning",
      });
    },
    //会议加锁
    lockChange(value) {
      if (value == true) {
        this.loackIndex = 0;
        let parment = {
          cmdCode: "lockRoom", //会议加锁指令
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          lockState: this.loackIndex,
        };
        this.ws.sendMsg(parment, null, this.LockeMode);
        // console.log(this.loackIndex);
      } else {
        this.loackIndex = 1;
        //关闭会议加锁
        let parment = {
          cmdCode: "lockRoom",
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          lockState: this.loackIndex,
        };
        this.ws.sendMsg(parment, null, this.LockeMode);
        // console.log(this.loackIndex);
      }
    },
    //是否开启会议加密
    encryptionChange(value) {
      // console.log(value);
      this.encryptionValue = value;

      if (value == false) {
        this.passwordIndex = true;
      } else {
        this.passwordIndex = false;
      }
      if (value == false) {
        this.passwordInput = "";
        let paraments = {
          cmdCode: "setRoomPassword", //会议加密指令
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          isCipher: this.encryptionValue,
          cipher: this.passwordInput,
        };
        this.ws.sendMsg(paraments, null, this.passwordData);
      }
    },
    //会议密码光标离开事件
    tests() {
      if (this.passwordInput != "") {
        // var res = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)$/;
        var res = /^[A-Za-z0-9_-]+$/; //密码校验的正则
        if (this.passwordInput.length !== 10) {
          alert("密码是10位");
        } else if (res.test(this.passwordInput)) {
          let paraments = {
            cmdCode: "setRoomPassword", //会议加密指令
            peerId: sessionStorage.getItem("peerId"),
            binderId: sessionStorage.getItem("binderId"),
            isCipher: this.encryptionValue,
            cipher: this.passwordInput,
          };
          this.ws.sendMsg(paraments, null, this.passwordData);
        } else {
          alert("密码格式不对");
        }
      }
    },
    //画面布局
    frameId(data) {
      this.frame.frameModel = data.model;
      this.frame.frameType = data.id;
    },
    //画面布局的确认按钮
    determine() {
      let picture = {
        cmdCode: "changeLayout", //更改画面布局
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
        layout: {
          layoutMode: this.frame.frameModel, //布局的类型
          layoutType: this.frame.frameType, //需要更改几方布局
        },
      };
      this.ws.sendMsg(picture, null, this.frameData);
    },
    //是否开启数据共享
    dataShare(value) {
      // console.log(value);
      this.shareValue = value;
      if (this.shareValue == true) {
        let parament = {
          cmdCode: "dataShare", //开启数据共享的指令
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          operateType: "1", //1为开启数据共享
        };
        this.ws.sendMsg(parament, null, this.dataSharing);
      } else if (this.shareValue == false) {
        let parament = {
          cmdCode: "dataShare",
          peerId: sessionStorage.getItem("peerId"),
          binderId: sessionStorage.getItem("binderId"),
          operateType: "2", //2位关闭数据共享
        };
        this.ws.sendMsg(parament, null, this.dataSharing);
      }
    },
    //横幅设置的指令
    bannerData() {
      let bannerParamt = {
        cmdCode: "setting",
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
        option: "subtitle",
        setting: {
          content: this.bannerTextarea,
          isSubtitle: false,
          switch: this.bannerValue,
          textAlignment: this.bannerMentIndex,
          textBg: this.bannerBagCoIndex,
          textColor: this.bannerColorIndex,
          textRollingSpeed: "低速",
          textShowHeight: 0,
          textSize: this.bannerTypefaceIndex,
          textTextBgAlpha: this.bannerTextBgAlpha,
        },
      };
      this.ws.sendMsg(bannerParamt, null, this.bannerResults);
    },
    //启用横幅
    bannerShare(value) {
      // console.log(value);
      this.bannerValue = value;
      if (value == false) {
        this.bannerTextarea = "";
        this.bannerShow = false;
        this.bannerData();
      } else {
        this.bannerShow = true;
      }
    },
    //推荐方案
    brannerRecommend(re) {
      this.bannerTypefaceIndex = re.fontSize;
      this.bannerColorIndex = re.fontColor;
      this.bannerMentIndex = re.alignment;
      this.bannerBagCoIndex = re.bgColor;
      this.bannerTextBgAlpha = re.bgOption;
    },
    //横幅对齐方式
    bannerMentId(id) {
      if (id != "") {
        this.bannerMentIndex = id;
      }
    },
    //横幅字体大小
    bannerTypefaceId(id) {
      if (id != "") {
        this.bannerTypefaceIndex = id;
      }
    },
    //启用字幕
    enableSubtitles(value) {
      this.subtitlesValue = value;
      if (value == false) {
        this.textarea = "";
        this.subtitleShow = false;
        this.subtitleData();
      } else {
        this.subtitleShow = true;
      }
    },
    //字幕内容
    //字幕推荐方案
    recommend(re) {
      // console.log(re);
      this.alignmentIndex = re.alignment;
      this.typefaceIndex = re.fontSize;
      this.fontColorIndex = re.fontColor;
      this.textTextBgAlpha = re.bgOption;
      this.bgFontColorIndex = re.bgColor;
    },
    //字体大小
    typefaceId(id) {
      // console.log(id);
      this.typefaceIndex = id;
    },
    //对齐方式
    alignmentId(id) {
      this.alignmentIndex = id;
    },
    //字幕速度
    speedId(id) {
      this.speedIndex = id;
    },
    //横幅字幕速度
    // bannerSpeedId(id) {
    //   this.banerSpeedIndex = id;
    //   if (id != "") {
    //     let bannerParamt = {
    //       cmdCode: "setting",
    //       peerId: sessionStorage.getItem("peerId"),
    //       binderId: sessionStorage.getItem("binderId"),
    //       option: "subtitle",
    //       setting: {
    //         content: this.bannerTextarea,
    //         isSubtitle: false,
    //         switch: this.bannerValue,
    //         textAlignment: this.bannerMentIndex,
    //         textBg: this.bannerBagCoIndex,
    //         textColor: this.bannerColorIndex,
    //         textRollingSpeed: this.banerSpeedIndex,
    //         textSize: this.bannerTypefaceIndex,
    //         textShowHeight: 0,
    //         textTextBgAlpha: this.bannerTextBgAlpha,
    //       },
    //     };
    //     this.ws.sendMsg(bannerParamt, null, this.bannerResults);
    //   }
    // },
    //横幅背景透明度
    bannerPellucidity(value) {
      if (value != "") {
        this.bannerTextBgAlpha = value;
      }
    },
    //横幅确认按钮
    determineBanner() {
      this.bannerData();
    },
    // 字幕背景透明度
    pellucidity(value) {
      this.textTextBgAlpha = value;
    },
    //字幕确认按钮
    determineCamera() {
      this.subtitleData();
    },
    //字幕字体高度
    sliderValue(value) {
      this.textShowHeight = value;
    },
    conference() {
      let parameter = {
        cmdCode: "getRoomInfo", //会议信息
        peerId: sessionStorage.getItem("peerId"),
        binderId: sessionStorage.getItem("binderId"),
      };
      this.ws.sendMsg(parameter, null, this.setUpCallback);
    },
  },
  props: {
    //设置弹框
    setUpIndex: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
      log: "getLog",
      isEmcee: "getIsEmcee",
      ziji: "getZiji",
    }),
  },
  watch: {
    ziji: {
      deep: true,
      handler: function (newV, oldV) {
        if (newV.speakStatus == 1) {
          this.dataShare_wang = false;
        } else {
          this.dataShare_wang = true;
        }
      },
      immediate: true,
    },
    setUpIndex() {
      console.log(this.setUpIndex)
      let _this = this;
      _this.dialogTableVisiblee = _this.setUpIndex;
      if (_this.setUpIndex == true) {
        if (_this.isEmcee == true) {
          //判断是否是主持人
          _this.num = "1";
          if (_this.num == 0) {
            _this.deviceData();
          }
          _this.leftMenu = [
            // {
            //   id: "0",
            //   name: "切换音视频",
            //   image: require("../assets/personnel-icon/right.png"),
            // },
            {
              id: "1",
              name: "会议管理",
              image: require("../assets/personnel-icon/right.png"),
            },
            {
              id: "2",
              name: "画面布局设置",
              image: require("../assets/personnel-icon/right.png"),
            },
            {
              id: "3",
              name: "共享设置",
              image: require("../assets/personnel-icon/right.png"),
            },
            // {
            //   id: "4",
            //   name: "字幕设置",
            //   image: require("../assets/personnel-icon/right.png"),
            // },
            // {
            //   id: "5",
            //   name: "会议横幅设置",
            //   image: require("../assets/personnel-icon/right.png"),
            // },
            {
              id: "6",
              name: "会议信息",
              image: require("../assets/personnel-icon/right.png"),
            },
          ];
          _this.conference();
        } else {
          this.num = "2";
          this.leftMenu = [
            {
              id: "2",
              name: "画面布局设置",
              image: require("../assets/personnel-icon/right.png"),
            },
          ];
          let parment = {
            cmdCode: "getSpeakerPanel", //获取画面布局信息
            peerId: sessionStorage.getItem("peerId"),
            binderId: sessionStorage.getItem("binderId"),
          };
          this.ws.sendMsg(parment, null, this.layoutIndex);
        }
      }
    },
    // passwordInput: function () {
    //   var _this = this;
    //   var sum = 10;
    //   _this.$refs.count.setAttribute("maxlength", sum);
    //   _this.number = sum - _this.$refs.count.value.length;
    // },
  },
};
</script>
<style lang="less">
.el-dialog {
  width: 1354px;
  height: 891px;
  position: absolute;
  top: 345px;
  left: 283px;
  margin-top: -245.5px !important;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 31px 48px 6px rgba(0, 0, 0, 0.64);
  .el-dialog__body {
    padding: 0px;
    .el-switch.el-switch .el-switch__core,
    .el-switch .el-switch__label {
      width: 85px !important;
      height: 41px;
      border-radius: 20px;
    }
    .el-switch__core:after {
      position: absolute;
      top: -6.5px;
      width: 47px;
      height: 47px;
      margin-left: -5px;
      background: #f8f8f8;
      border: 1px solid #e7e7e7;
    }
    .el-switch.is-checked .el-switch__core::after {
      margin-left: -45px;
    }
  }
  .el-dialog__header {
    padding: 0px;
    .el-dialog__headerbtn {
      font-size: 37px;
      color: #2b2e3c;
      //  .el-dialog__close .el-icon .el-icon-close{
      //    color: #2B2E3C;
      //  }
    }
  }

  // .el-icon-close:before {
  //   display: block;
  // }

  .set-div {
    width: 100%;
    height: 100%;
    display: inline-flex;
    border-radius: 40px;
    .set-left {
      width: 317px;
      height: 891px;
      background: #2b2e3c;
      border-radius: 20px 0px 0px 20px;
      ul {
        width: 100%;
        height: 100%;
        border-radius: 20px 0px 0px 20px;
        // background: blue;
        li {
          width: 100%;
          height: 78px;
          border-radius: 20px 0px 0px 0px;
          // background: red;
          border-bottom: 1px solid rgba(194, 194, 194, 0.19);
          display: inline-flex;
          // align-items: center;
          justify-content: space-between;
          span {
            display: inline-block;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 5px;
            margin-top: 36px;
            margin-left: 38px;
          }
          img {
            width: 11px;
            height: 22px;
            margin-top: 26.5px;
            margin-right: 43px;
            display: none;
          }
          .img1 {
            width: 11px;
            height: 22px;
            margin-top: 26.5px;
            margin-right: 43px;
            display: block;
          }
        }
        .li1 {
          width: 100%;
          height: 78px;
          border-radius: 0px;
          background: #383c4d;
          display: inline-flex;
        }
      }
    }
    .set-right {
      width: 1037px;
      height: 891px;
      border-radius: 0px 20px 20px 0px;
      .loading-time {
        width: 1037px;
        height: 891px;
      }
      .equally {
        width: 100%;
        height: 95px;
        border-bottom: 1px solid #eaeaea;
        span {
          display: inline-block;
          height: 26px;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-top: 40px;
          margin-left: 40px;
        }
      }
      .content-black {
        width: 941px;
        height: 353px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        margin: 25px 0px 0px 40px;
        .fault {
          width: 100%;
          height: 70px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e3e3e3;
          span {
            margin-left: 40px;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          .right-fault {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #878787;
            margin-right: 40px;
          }
          .right-num {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #878787;
            margin-right: 40px;
          }
          .right-name {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #878787;
            margin-right: 42px;
          }
          .right-id {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #878787;
            margin-right: 40px;
          }
          .right-service {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #878787;
            margin-right: 40px;
          }
        }
      }
      .frame-div {
        width: 100%;
        display: inline-flex;
        flex-wrap: wrap;
        .frame {
          width: 212px;
          height: 111px;
          margin-top: 63px;
          margin-left: 30px;
          position: relative;
          img {
            width: 212px;
            height: 111px;
          }
          .img1 {
            width: 32px;
            height: 32px;
            position: absolute;
            bottom: 10px;
          }
          p {
            display: inline-block;
            font-size: 26px;
            margin-top: 10px;
            margin-left: 80px;
          }
        }
        .frame:hover {
          cursor: pointer;
        }
        .frame1 {
          width: 212px;
          height: 111px;
          margin-top: 63px;
          margin-left: 30px;
          border: 1px dashed #2d97e1;
          position: relative;
          img {
            width: 212px;
            height: 111px;
          }
          .img1 {
            width: 32px;
            height: 32px;
            position: absolute;
            bottom: 10px;
            right: 20px;
          }
          p {
            display: inline-block;
            font-size: 26px;
            margin-top: 10px;
            margin-left: 80px;
          }
        }
      }
      .camera {
        font-size: 26px;
        margin-top: 23px;
        margin-left: 55px;
      }
      .camera2 {
        font-size: 26px;
        margin-top: 59px;
        margin-left: 55px;
      }
      .camera1 {
        font-size: 26px;
        margin-top: 16px;
        margin-left: 55px;
      }
      .textarea {
        width: 900px;
        height: 110px;
        margin-left: 53px;
        margin-top: 15px;
      }
      .confirm {
        width: 100px;
        height: 50px;
        font-size: 26px;
        margin-top: 30px;
        float: right;
        margin-right: 48px;
      }
      .title-styles {
        // width: 90%;
        // height: 25rem;
        width: 933px;
        // height: 401px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 6px;
        margin-left: 53px;
        margin-top: 3.1px;
        .typeface {
          width: 100%;
          height: 75px;
          font-size: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e3e3e3;
          .size-name {
            margin-left: 40px;
          }
          .typeface-size {
            width: 250px;
            height: 100%;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 40px;
            .el-sliderr {
              width: 10rem;
            }
            .siza {
              width: 68px;
              height: 100%;
              display: inline-flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 32px;
                height: 32px;
              }
            }
          }
          .typeface-progra {
            width: 300px;
            height: 100%;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 40px;
            img {
              margin-top: 7px;
              width: 38px;
              width: 38px;
            }
            img:hover {
              cursor: pointer;
            }
            .programme {
              width: 52px;
              height: 52px;
              background: rgba(255, 240, 0, 0);
              border: 1px solid #2d97e1;
              text-align: center;
            }
            .programme1 {
              width: 52px;
              height: 52px;
              background: rgba(255, 240, 0, 0);
              text-align: center;
            }
          }
          .typeface-sizeColour {
            width: 150px;
            height: 100%;
            // border: 1px solid grey;
            margin-right: 40px;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            .bannerColor1 {
              width: 88px;
              height: 36px;
              border: 1px solid #c7c7c7;
              border-radius: 5px;
              margin-left: 20px;
            }
            img {
              width: 18px;
              height: 10px;
              margin-left: 12px;
            }
            img:hover {
              cursor: pointer;
            }
            .arrowTransform {
              transition: 0.2s;
              transform-origin: center;
              transform: rotateZ(180deg);
            }
            .arrowTransformReturn {
              transition: 0.2s;
              transform-origin: center;
              transform: rotateZ(0deg);
            }
            .el {
              position: relative;
              .popover {
                position: absolute;
                top: 45px;
                right: 0px;
                height: 200px;
                background: rgb(221, 220, 220);
                display: inline-flex;
                justify-content: space-around;
                flex-wrap: wrap;
                div:hover {
                  cursor: pointer;
                }
              }
            }
          }
          .typeface-size1 {
            width: 300px;
            height: 100%;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 40px;
            .size {
              width: 88px;
              height: 100%;
              display: inline-flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 32px;
                height: 32px;
              }
            }
          }
          .typeface-size12 {
            width: 300px;
            height: 100%;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 40px;
            .size {
              width: 88px;
              height: 100%;
              display: inline-flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 32px;
                height: 32px;
              }
            }
          }
        }
      }
      .camera-model {
        width: 940px;
        height: 163px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        margin-left: 48px;
        margin-top: 15px;
        .select {
          width: 100%;
          height: 81px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e3e3e3;
          span {
            display: inline-block;
            font-size: 26px;
            margin-left: 23px;
          }
          img {
            width: 32px;
            height: 32px;
            margin-right: 23px;
          }
        }
      }
      .camera-model1 {
        width: 940px;
        height: 163px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        margin-left: 48px;
        margin-top: 16px;
        .select {
          width: 100%;
          height: 81px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e3e3e3;
          span {
            display: inline-block;
            font-size: 26px;
            margin-left: 23px;
          }
          img {
            width: 32px;
            height: 32px;
            margin-right: 23px;
          }
        }
      }
      .camera-model2 {
        width: 940px;
        // height: 163px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        margin-left: 48px;
        margin-top: 16px;
        .select {
          width: 100%;
          height: 81px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e3e3e3;
          span {
            display: inline-block;
            font-size: 26px;
            margin-left: 23px;
          }
          .el-switch {
            margin-right: 23px;
          }

          // .el-switch.el-switch .el-switch__core,
          // .el-switch .el-switch__label {
          //   width: 81px !important;
          //   height: 40px;
          //   border-radius: 20px;
          // }
          // .el-switch__core:after {
          //   position: absolute;
          //   top: -6.5px;
          //   width: 52px;
          //   height: 52px;
          //   background: #bdbdbd;
          // }
          // .el-switch.is-checked .el-switch__core::after {
          //   margin-left: -51px;
          // }
        }
      }
      .banner-data {
        width: 100%;
        height: 670px;
        // .banner-text::-webkit-scrollbar {
        //   width: 0 !important;
        // }
        .banner-text {
          width: 100%;
          height: 655px;
          overflow: auto;
        }
      }
      .camera-model3 {
        width: 940px;
        // height: 163px;
        background: #ffffff;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        margin-left: 48px;
        margin-top: 16px;
        .select {
          width: 100%;
          height: 81px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e3e3e3;
          span {
            display: inline-block;
            font-size: 26px;
            margin-left: 23px;
          }
          .numberPass {
            width: 200px;
            height: 40px;
            margin-right: 20px;
            .numberPass_inp {
              font-size: 16px;
            }
          }
          .el-switch {
            margin-right: 23px;
          }
        }
      }
    }
  }
}
</style>