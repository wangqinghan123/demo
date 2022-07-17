import $ from "jquery";
import { Message } from "element-ui";
import router from "./router/index";

let sum = 3; //clone  关闭触发被动重连
let num = 4; //心跳   收不到心跳触发定时器
let test2; //储存定时器的指针
let Time7 = 5000; //新版心跳时间赋值，用来做setTimeout递减的时间替换

var WBT = function(socketUrl) {
  /*
    websocket接口地址
    1、http请求还是https请求 前缀不一样
    2、ip地址host
    3、端口号
    */
  let HOST = "";
  let PORT = "";
  let protocol;
  if (_WebSocket.enableBaseUrl) {
    let reg = /https/;

    let arr = reg.exec(_WebSocket.BaseUrl);

    protocol = arr ? "wss://" : "ws://";
    HOST = _WebSocket.host;
    PORT = _WebSocket.port;
  } else {
    protocol = window.location.protocol == "http:" ? "ws://" : "wss://";
    HOST = window.location.hostname;
    PORT = window.location.port;
  }

  const path = "/websocketserver";

  //接口地址url
  this.url = (socketUrl || protocol + HOST + ":" + PORT) + path;
  //socket对象
  this.socket;
  //心跳状态  为false时不能执行操作 等待重连
  this.isHeartflag = false;
  //重连状态  避免不间断的重连操作
  this.isReconnect = false;

  //作为get获取数据的回调对象存储
  this.messageList = {};

  this.hint = () => {
    return num + "," + Time7;
  };

  this.setIntervalEstablish = () => {
    test2 = setInterval(() => {
      if (window.location.hash != "#/login") {
        if (num > 0) {
          num--;
        } else {
          router.replace({ path: "/login" });
          clearInterval(test2);
        }
      }
    }, Time7);
  };
  //自定义Ws连接函数：服务器连接成功
  this.onopen = (e) => {
    console.log("连接成功");
    this.isHeartflag = true;
  };
  //自定义Ws消息接收函数：服务器向前端推送消息时触发
  this.onmessage = (e) => {
    console.log(e);
    //旧版
    // * \d{10} --> peerId
    // * \d --> 设备所处位置/业务：0=无，1=中控状态，2=会中状态
    // * \d --> 设备是否受控：0=否，1=是
    //1000000005,2,1'
    const data = e.data.split(",");
    if (data.length == 3) {
      //旧版心跳
      const regex = /\d{10},\d/;
      if (regex.test(e.data)) {
        num = 4;

        if (data[1] == "0") {
          router.replace({ path: "/login" });
          clearInterval(test2);
        } else if (data[1] == "1" && window.location.hash == "#/home") {
          router.replace({ path: "/overall/one" });
        }
        if (data[2] == "1") {
          // * HB_PREFIX : 固定前缀
          // * \d{10} --> peerId
          const peerId = "HB:REPLY:" + data[0];

          this.socket.send(peerId);
        }
        return;
      }
    } else {
      //新版心跳
      // 心跳逻辑 v2.1
      // 设备心跳格式：{peerId},{status},{isBound},{meetingId},{intervals}
      // peerId : 视讯号/参会者ID
      // status : 设备状态，0=会外未受控，1=会外受控，2=会中受控
      // isBound : 是否与中控页面绑定，0=否，1=是
      // meetingId : 设备所在会议的会议号，0=不在会
      // intervals : 心跳间隔时间，非0正整数，单位秒，由设备决定
      // 额外要求：设备连接会控服务时请求头需带上intervals；中控页面绑定设备成功，设备返回的cmdCode为bind的响应信息中需包含intervals，且需与心跳中的intervals一致，*支持心跳间隔变更
      // 中控页面心跳格式：{peerId},{intervals}
      // peerId : 视讯号/参会者ID
      // intervals : 心跳间隔时间，非0正整数，单位秒，回传
      // 额外要求：中控页面的心跳间隔需以绑定设备成功之后返回的cmdCode为bind的响应信息中的intervals为准，如intervals有变更，则页面的心跳间隔也需要同步更新
      // 说明：会控服务保底心跳超时时间为4倍心跳间隔时间
      //1000000005,2,1,10000239,10'

      const regex = /\d{10},\d/;
      if (regex.test(e.data)) {
        Time7 = data[4] * 1; //时间赋值
        num = 4;
        if (data[1] == "0") {
          router.replace({ path: "/login" });
        } else if (data[1] == "1" && window.location.hash == "#/home") {
          router.replace({ path: "/overall/one" });
        }
        if (data[2] == "1") {
          // * HB_PREFIX : 固定前缀
          // * \d{10} --> peerId
          const peerId = "HB:REPLY:" + data[0] + "," + data[4];
          this.socket.send(peerId);
        }
        return;
      }
    }

    //处理各种推送消息
    const message = JSON.parse(e.data);
    // console.log(message);
    if (message) {
      if (message.code < 0) {
        //后边返回的提示信息
        Message({
          message: message.message,
          type: "warning",
        });
      }
      let eventName = message.cmdCode;
      if (eventName === "unbind") {
        clearInterval(test2);
      }
      let eventType = message.type;
      const fullName = eventName + "." + eventType;
      if (eventName in this.messageList) {
        //执行回调

        this.messageList[eventName](message);
      } else {
        if (fullName in this.messageList) {
          this.messageList[fullName](message);
        }
        if (eventType === "res") {
          delete this.messageList[eventName];
        }
      }
    }
  };

  //自定义Ws异常事件：Ws报错后触发
  this.onerror = (e) => {
    this.isHeartflag = false;
    this.reConnect();
    console.log("ws error-", e);
  };
  //自定义Ws关闭事件：Ws连接关闭后触发
  this.onclose = (e) => {
    clearInterval(test2);
    num = 4;
    sum = 3;
    console.log("ws close");
    const peerId = window.sessionStorage.getItem("peerId");
    const binderId = window.sessionStorage.getItem("binderId");

    if (peerId && binderId) {
      if (sum < 3) {
        setTimeout(() => {
          this.initWs("?" + $.param({ peerId, binderId }));
          sum--;
        }, 5000);
      }
      if (sum == 0) {
        alert("无网络，重连失败");
        router.replace({ path: "/login" });
      }
    }
  };
  // //初始化websocket连接
  //     this.initWs()
};

//初始化websocket连接
WBT.prototype.initWs = function(query) {
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  if (!window.WebSocket) {
    // 检测浏览器支持
    console.error("错误: 浏览器不支持websocket");
    return;
  }
  var that = this;

  this.socket = new WebSocket(this.url + query); // 创建连接并注册响应函数
  this.socket.onopen = function(e) {
    that.onopen(e);
  };
  this.socket.onmessage = function(e) {
    that.onmessage(e);
  };
  this.socket.onclose = function(e) {
    that.onclose(e);
  };
  this.socket.onerror = function(e) {
    that.onerror(e);
  };
  return this;
};

WBT.prototype.close = function() {
  if (this.socket) {
    return this.socket.close();
  }
};

WBT.prototype.reConnect = function() {
  if (this.isReconnect) return;
  this.isReconnect = true;
  //设置延迟避免请求过多
  setTimeout(function() {
    this.initWs();
    this.isReconnect = false;
  }, 2000);
};

let defaultParam = {
  action: "loginReq",
  tsxId: "1",
  params: {},
};
WBT.prototype.login = function(params) {
  //ws还没建立连接（发生错误）
  if (!this.isHeartflag) {
    console.log("连接中……");
    return;
  }
  let loginParam = defaultParam;
  loginParam.params = params;
  //组装json数据
  this.socket.send(JSON.stringify(loginParam));
};

//发送消息后回调
WBT.prototype.sendMsg = function(obj, eventType, callback) {
  console.log("发送消息--->", obj);
  let eventName = obj.cmdCode;
  //存储事件
  if (callback) {
    this.addEvent(eventName, eventType, callback);
  }
  this.socket.send(JSON.stringify(obj));
};

WBT.prototype.sendMsgThen = function(obj, eventType, callback) {
  let eventName = obj.cmdCode;
  //存储事件
  if (callback) {
    this.addEvent(eventName, eventType, callback);
  }
  this.socket.send(JSON.stringify(obj));
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 3000);
  });
};

//增加或删除事件方法
WBT.prototype.addEvent = function(eventName, eventType, fn) {
  if (eventType) {
    eventName += "." + eventType;
  }
  this.messageList[eventName] = fn;
};
WBT.prototype.addResEvent = function(eventName, fn) {
  this.addEvent(eventName, "res", fn);
};
WBT.prototype.addNotifyEvent = function(eventName, fn) {
  this.addEvent(eventName, "notify", fn);
};
WBT.prototype.delEvent = function(eventName) {
  delete this.messageList[eventName];
};

const ws = new WBT();

export default ws;
