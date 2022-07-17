const API = {
  //方法
  Method: {
    Get: "get",
    Post: "post",
    Put: "put",
    Del: "delete",
  },
  //请求地址
  Path: {
    //请求会议列表
    // query: "/rtc-meeting/meeting/invited",
    //获取会议列表
    list: "/rtc-meeting/meeting/list",
    // 企业组织架构
    companyList: "/rtc-backstage/company/{id}/organizations",
    //获取轮巡配置
    patrolList: "/rtc-meeting/polling_config/",
    // 创建轮巡
    patrolId: "/rtc-meeting/polling_config/peer",
    //配置轮巡的参数
    partrolTo: "/rtc-meeting/polling_config/save",
    //根据peerid查询该设备或用户信息（轮巡列表再用）
    polling: "/rtc-backstage/contact/list/peerIds",
    //关闭轮巡
    close: "/rtc-meeting/polling_config/",
    //查询部门的成员
    userDe: "/rtc-backstage/contact/node/{id}/user/list",
    //查询部门和人员信息
    contact: "/rtc-backstage/contact/node/{id}/subs",
    //创建会议
    found: "/rtc-meeting/meeting",
    //获取通讯
    getAddress: "/rtc-backstage/contact/person/list",
    //添加到通讯录
    addAddress: "/rtc-backstage/contact/person",
    //从通讯录删除
    deleteAddress: "/rtc-backstage/contact/person",
    //查询会议是否存在
    inquire: "/rtc-meeting/meeting/:roomId",
    //刷新token
    refresh: "/token/refresh",
    //邀请页面的左侧input 名称去人员
    invite_input: "/rtc-backstage/contact/company/{id}/user/list",
    //根据peerId批量查询联系人信息接口（邀请里的右上角）
    input_2: "/rtc-backstage/contact/list/peerIds",

    //获取横幅
    bannerData: "rtc-meeting/meeting/{roomId}/title",
    //获取字幕
    subtitleData: "rtc-meeting/meeting/{roomId}/subtitle",
    //通过勾选部门，获取部门下的所有人
    department: "/rtc-backstage/contact/node/{id}/user/all",

    //会议列表点击详情 去修改密码
    changePass: "/rtc-meeting/meeting/:roomId/cipher/reset",

    //查询登录信息
    login: "/rtc-backstage/device/info",

    //获取群组列表
    getGroupList: "/rtc-backstage/team/list",
    //点击获取群组内人员
    GroupStaff: "/rtc-backstage/team/{id}/users",
    //获取当前设备的name完成链条
    gainName: "/rtc-backstage/company/{id}/organ",
  },
};
export default API;
