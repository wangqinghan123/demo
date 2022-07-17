import Vue from "vue";
import VueRouter from "vue-router";

//登录页
import login from "../view/login/login";

//绑定后的第一个布局
import overall from "../view/meeting/overall";

import list from "../view/meeting/Information/Information"; //第一个布局里的会议列表
import profile from "../view/meeting/profile/profile"; //第一个布局里的头像资料
import set from "../view/meeting/set/set"; //第一个布局里的设置
import address from "../view/meeting/address/address"; //第一个布局里的通讯录
import edition from "../view/meeting/edition/edition"; //第一个布局里的版本信息
//以下是set里的两个组件（模块）
import pattern from "../view/meeting/set/pattern/pattern";
import cloud from "../view/meeting/set/cloud/cloud";

import overuse from "../view/inMeeting/guodu/guodu.vue"; //跳转过度的组件
//开会主页面
import home from "../view/inMeeting/home";

import all from "../view/inMeeting/Management/all/all";

import make from "../view/inMeeting/Management/make/make";

import raise from "../view/inMeeting/Management/raise/raise";
//
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  { path: "/overuse", name: "overuse", component: overuse },
  {
    path: "/overall",
    name: "overall",
    component: overall,
    children: [
      {
        path: "one",
        name: "one",
        component: list,
      },
      {
        path: "profile",
        name: "profile",
        component: profile,
      },
      {
        path: "set",
        name: "set",
        component: set,
        children: [
          {
            path: "pattern",
            name: "pattern",
            component: pattern,
          },
          {
            path: "cloud",
            name: "cloud",
            component: cloud,
          },
        ],
      },
      {
        path: "address",
        name: "address",
        component: address,
      },
      {
        path: "edition",
        name: "edition",
        component: edition,
      },
    ],
  },

  {
    path: "/home",
    name: "home",
    component: home,
    children: [
      {
        path: "all",
        name: "all",
        component: all,
      },
      {
        path: "make",
        name: "make",
        component: make,
      },
      {
        path: "raise",
        name: "raise",
        component: raise,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem("token");
  if (to.path == "/login" || to.path == "/") {
    next();
  } else {
    if (token) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
