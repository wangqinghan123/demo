import { request } from "./core";
import API from "./config";
const Throw = {
  //登录
  login(params) {
    return request(API.Method.Post, API.Path.LOGIN, params);
  },
  //请求会议列表
  query(params) {
    return request(API.Method.Get, API.Path.list, params);
  },

  //企业组织架构
  organList(params, id) {
    var ORGANID = API.Path.companyList.replace(/{id}/, id);

    return request(API.Method.Get, ORGANID, params);
  },
  //获取轮巡配置
  patrol(params, id) {
    return request(API.Method.Get, API.Path.patrolList + id, params);
  },
  //创建轮巡
  patrolId(params, id) {
    return request(API.Method.Post, API.Path.patrolId + id, params);
  },
  //配置轮巡参数
  partrolTo(params) {
    return request(API.Method.Put, API.Path.partrolTo, params);
  },
  //根据peerid查询该设备或用户信息（轮巡列表再用）
  pollingg(params) {
    return request(API.Method.Post, API.Path.polling, params);
  },
  //关闭轮巡
  close(params, id) {
    return request(API.Method.Del, API.Path.close + id, params);
  },
  //查询部门的成员
  userDe(params, id) {
    var userId = API.Path.userDe.replace(/{id}/, id);

    return request(API.Method.Post, userId, params);
  },
  //查询部门子节点和通讯录
  contact(params, id) {
    var branchId = API.Path.contact.replace(/{id}/, id);
    return request(API.Method.Post, branchId, params);
  },
  //创建会议
  found(params) {
    return request(API.Method.Post, API.Path.found, params);
  },
  //获取个人通讯录
  getAddress(params) {
    return request(API.Method.Post, API.Path.getAddress, params);
  },
  //添加到通讯录
  addAddress(params) {
    return request(API.Method.Post, API.Path.addAddress, params);
  },
  //从通讯录删除
  deleteAddress(params) {
    return request(API.Method.Del, API.Path.deleteAddress, params);
  },
  //查询会议是否存在
  inquire(params, id) {
    var branchId = API.Path.inquire.replace(/:roomId/, id);
    return request(API.Method.Get, branchId, params);
  },
  //刷新token
  refresh(params) {
    return request(API.Method.Post, API.Path.refresh, params);
  },
  //通过名称 查询匹配的所有人员（邀请左上角）
  invite_input(params, id) {
    var branchId = API.Path.invite_input.replace(/{id}/, id);
    return request(API.Method.Post, branchId, params);
  },
  //通过id查询人员（邀请右上角）
  invite_input2(params) {
    return request(API.Method.Post, API.Path.input_2, params);
  },
  //获取横幅
  bannerData2(params, id) {
    var bannerData = API.Path.bannerData.replace(/{roomId}/, id);
    return request(API.Method.Get, bannerData, params);
  },
  //获取字幕
  subtitleData2(params, id) {
    var subtitleData = API.Path.subtitleData.replace(/{roomId}/, id);
    return request(API.Method.Get, subtitleData, params);
  },
  //通过勾选部门获取部门下的所有人；
  department(params, id) {
    var department = API.Path.department.replace(/{id}/, id);
    return request(API.Method.Get, department, params);
  },
  //会议列表点击详情 去修改密码
  changePass(params, id) {
    var newApi = API.Path.changePass.replace(/:roomId/, id);
    return request(API.Method.Post, newApi, params);
  },
  //请求自己的唯一信息*（登录信息里包含）
  login() {
    return request(API.Method.Get, API.Path.login);
  },
  //群组组织架构
  getGroupList() {
    return request(API.Method.Get, API.Path.getGroupList);
  },
  //群组内容
  GroupStaff(params) {
    var newApi = API.Path.GroupStaff.replace(/{id}/, params);
    return request(API.Method.Get, newApi);
  },
  //请求自己的上级的所有name（名字去重）
  gainName(params) {
    var newApi = API.Path.gainName.replace(/{id}/, params);
    return request(API.Method.Get, newApi);
  },
};
export default Throw;
