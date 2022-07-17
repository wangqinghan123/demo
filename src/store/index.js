import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetingTime: null, //转授主持人||被人转授为主持人

    launch: 1, //关于启动检测心跳的标志

    Refresh: null, //关于login页面的刷新

    join: "", //加入信息
    roomMode: "", //会议模式
    gather: "", //个人通讯录里邀请指令里的选择的所有的id集合

    ziji: "", //过滤出来的自己的数据
    seek: "", //本地搜索筛选出来的数据
    isEmcee: null, //是否是主持人

    ju_ren: [], //申请举手人信息

    make: 0, //当前发言的length

    hands: 0, //当前举手的length

    Current: [], //当前发言人（与length分开）

    strike: "", //刷新的旧token

    flag: true, //转手主持后，依然得到通知，以此区分。

    consent: "", //举手列表点击同意，获取此人的信息

    finishMeeting: false, //主持人解散会议的标志

    automatic: true, //整体设备信息

    isauto: "", //整体信息里掏出来的一个属性，用来计算是否打开自应答

    parameters: "", //点击预选后，选择完日期后去选择人员信息，要带过去的数据；

    sign: "", //预约成功后，给个标志，去刷新列表；

    masking1: 1, //检测网络，开启蒙版
  },
  mutations: {
    set_meetingTime(state, value) {
      state.meetingTime = value;
    },

    set_launch(state, value) {
      state.launch = value;
    },
    set_Refresh(state, value) {
      state.Refresh = value;
    },

    set_masking1(state, value) {
      state.masking1 = value;
    },
    set_isauto(state, value) {
      state.isauto = value;
    },
    set_sign(state, value) {
      state.sign = value;
    },

    set_parameters(state, value) {
      state.parameters = value;
    },

    set_automatic(state, value) {
      state.automatic = value;
    },

    set_consent(state, value) {
      state.consent = value;
    },

    set_finishMeeting(state, value) {
      state.finishMeeting = value;
    },
    set_flag(state, value) {
      state.flag = value;
    },

    set_join(state, value) {
      state.join = value;
    },
    set_roomMode(state, value) {
      state.roomMode = value;
    },
    set_gather(state, value) {
      state.gather = value;
    },
    set_ziji(state, value) {
      state.ziji = value;
    },
    set_seek(state, value) {
      state.seek = value;
    },
    set_isEmcee(state, value) {
      state.isEmcee = value;
    },
    set_ju_ren(state, value) {
      state.ju_ren = value;
    },

    set_make(state, value) {
      state.make = value;
    },
    set_hands(state, value) {
      state.hands = value;
    },

    set_Current(state, value) {
      state.Current = value;
    },

    ste_strike(state, value) {
      state.strike = value;
    },
  },
  actions: {
    set_meetingTime({ commit }, value) {
      commit("set_meetingTime", value);
    },
    set_launch({ commit }, value) {
      commit("set_launch", value);
    },
    set_Refresh({ commit }, value) {
      commit("set_Refresh", value);
    },

    set_masking1({ commit }, value) {
      commit("set_masking1", value);
    },
    set_isauto({ commit }, value) {
      commit("set_isauto", value);
    },

    set_sign({ commit }, value) {
      commit("set_sign", value);
    },

    set_parameters({ commit }, value) {
      commit("set_parameters", value);
    },

    set_automatic({ commit }, value) {
      commit("set_automatic", value);
    },

    set_consent({ commit }, value) {
      commit("set_consent", value);
    },

    set_finishMeeting({ commit }, value) {
      commit("set_finishMeeting", value);
    },

    set_flag({ commit }, value) {
      commit("set_flag", value);
    },

    set_join({ commit }, value) {
      commit("set_join", value);
    },
    set_roomMode({ commit }, value) {
      commit("set_roomMode", value);
    },

    set_gather({ commit }, value) {
      commit("set_gather", value);
    },
    set_ziji({ commit }, value) {
      commit("set_ziji", value);
    },
    set_seek({ commit }, value) {
      commit("set_seek", value);
    },

    set_isEmcee({ commit }, value) {
      commit("set_isEmcee", value);
    },
    set_ju_ren({ commit }, value) {
      commit("set_ju_ren", value);
    },

    set_make({ commit }, value) {
      commit("set_make", value);
    },
    set_hands({ commit }, value) {
      commit("set_hands", value);
    },
    set_Current({ commit }, value) {
      commit("set_Current", value);
    },
    ste_strike({ commit }, value) {
      commit("ste_strike", value);
    },
  },
  getters: {
    get_meetingTime(state) {
      //转授主持人||被人转授为主持人
      return state.meetingTime;
    },
    get_layout(state) {
      //关于启动检测心跳的标志
      return state.layout;
    },
    get_launch(state) {
      //关于启动检测心跳的标志
      return state.launch;
    },

    get_Refresh(state) {
      //关于login页面刷新的标志
      return state.Refresh;
    },
    get_masking1(state) {
      //点击预选后，选择完日期后去选择人员信息，要带过去的数据；
      return state.masking1;
    },

    get_isauto(state) {
      return state.isauto;
    },

    get_sign(state) {
      //点击预选后，选择完日期后去选择人员信息，要带过去的数据；
      return state.sign;
    },
    get_parameters(state) {
      //点击预选后，选择完日期后去选择人员信息，要带过去的数据；
      return state.parameters;
    },

    get_automatic(state) {
      //每次修改会外设置里的自动应答，都会更新的数据；
      return state.automatic;
    },

    get_consent(state) {
      return state.consent; //举手列表点击同意，获取此人的信息
    },
    get_finishMeeting(state) {
      return state.finishMeeting;
    },
    get_flag(state) {
      return state.flag; //转手主持后，依然得到通知，以此区分。
    },
    getJoin(state) {
      return state.join; //加入
    },

    get_roomMode(state) {
      return state.roomMode; //会议模式
    },
    set_gather(state) {
      return state.gather; //个人通讯录里邀请指令里的选择的所有的id集合
    },
    getZiji(state) {
      return state.ziji; //筛选的个人状态
    },
    getSeek(state) {
      return state.seek; //本地搜索出来的结果
    },

    getIsEmcee(state) {
      return state.isEmcee; //主持人
    },
    get_ju_ren(state) {
      return state.ju_ren; //算出来的举手人信息
    },

    get_make(state) {
      return state.make; //发言人length
    },

    get_hands(state) {
      return state.hands; //举手人length
    },

    get_Current(state) {
      return state.Current; //当前发言人（与length分开）
    },

    get_strike(state) {
      return state.strike; //刷新的旧token
    },
  },
});
