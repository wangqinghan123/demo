<template>
  <div class="list-pro">
    <el-dialog :visible.sync="dialogTableVisibles" @close="onClo()" top="97px">
      <div class="tour-list">
        <div class="left">
          <div class="speaker">
            <span>未发言人员({{ statement.length }})</span>
          </div>
          <div class="testing" @click="companyIdd(name)">
            <span class="company">{{ name.name }}</span>
          </div>
          <div class="tree-personnel">
            <el-tree
              :data="name.subNode"
              show-checkbox
              node-key="id"
              :props="defaultProps"
              :check-strictly="true"
              ref="tree"
              @node-click="handleNodeClick"
              @check-change="changehu"
            >
            </el-tree>
          </div>
        </div>
        <div class="content">
          <div>
            <ul>
              <!-- <li
                v-show="branchList != ''"
                style="overflow-y: scroll; overflow-x: hidden; height: 130px 600px"
              >
                <div
                  class="li2"
                  v-for="(item, index) in branchList"
                  :key="index"
                >
                  <img
                    class="img1"
                    src="../assets/personnel-icon/图层 694.png"
                  /><span>{{ item.name }}</span
                  ><img
                    class="img3"
                    src="../assets/personnel-icon/对钩-粗 拷贝.png"
                  />
                  <img class="img2" src="../assets/personnel-icon/错误.png" />
                </div>
              </li> -->
              <li v-show="userContList != ''" class="none">
                <div class="wula">
                  <div
                    v-for="(item, index) in userContList"
                    :key="index"
                    :class="[item.corlorIndex == false ? 'li3' : 'li1']"
                  >
                    <img
                      class="img1"
                      src="../assets/personnel-icon/people.png"
                    />
                    <span class="name8"
                      >{{ item.name }}({{ item.peerId | msgFormat }})</span
                    >
                    <div>
                      <img
                        v-if="item.checked == false"
                        class="img2"
                        src="../assets/personnel-icon/cha.png"
                        @click="fork(item.peerId)"
                      />
                      <img
                        v-else
                        class="img2"
                        src="../assets/personnel-icon/dui.png"
                        @click="onclick(item.peerId)"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div>
            <span class="patrol-list">轮巡列表</span>
          </div>
          <div class="input-button">
            <el-input
              @keyup.native.delete="result"
              v-model="input"
              placeholder="请输入视讯号"
            ></el-input>
            <el-button @click="search" type="primary">搜索</el-button>
          </div>
          <div class="search-list">
            <ul>
              <li
                class="list-personnel"
                v-for="(item, index) in statement"
                :key="index"
              >
                <img
                  class="img1"
                  src="../assets/personnel-icon/people.png"
                /><span class="name7"
                  >{{ item.name }}({{ item.peerId | msgFormat }})</span
                ><img
                  @click="forkList(item.peerId)"
                  class="img2"
                  src="../assets/personnel-icon/cha.png"
                />
              </li>
            </ul>
          </div>
          <div>
            <el-button class="confirm" @click="confirmClick" type="primary">
              <div class="que">确认</div></el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
function getConcat(arr1, arr2) {
  return [...arr1, ...arr2].sort((a, b) => {
    return a.peerId - b.peerId;
  });
}
export default {
  data() {
    return {
      dialogTableVisibles: this.roundshow, //是否弹出轮巡列表的弹出框
      input: "", //right搜索视讯号
      name: {},
      userList: this.username, //home页面传过来的会议信息参会者列表的数据
      checkedId: "", //点击部门的id
      statement1: [], //点击搜索原来的数据备份一下
      defaultKeys: [], //点击选中的部门，部门下面的设备以及用户
      meetingList: [], //筛选出来是未发言设备或者用户
      noStatement: [], //根据peerid查询该设备或用户信息（轮巡列表再用）
      statement: [], //已选择轮巡列表
      copylist: [], //备份轮巡列表(叉号)
      subNodeList: [], //当下部门的设备或者用户
      userContList: [], //筛选出来的设备或者用户
      // data: [
      //   {
      //     label: "个人通讯录",
      //     children: [
      //       {
      //         label: "支撑中心",
      //         children: [
      //           {
      //             label: "研发部",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     label: "一级 2",
      //     children: [
      //       {
      //         label: "二级 2-1",
      //         children: [
      //           {
      //             label: "三级 2-1-1",
      //           },
      //         ],
      //       },
      //       {
      //         label: "二级 2-2",
      //         children: [
      //           {
      //             label: "三级 2-2-1",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     label: "一级 3",
      //     children: [
      //       {
      //         label: "二级 3-1",
      //         children: [
      //           {
      //             label: "三级 3-1-1",
      //           },
      //         ],
      //       },
      //       {
      //         label: "二级 3-2",
      //         children: [
      //           {
      //             label: "三级 3-2-1",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      defaultProps: {
        children: "subNode",
        label: "name",
      },
      companyList: [], //这个不知道随便玩玩
    };
  },
  mounted() {
    let log = JSON.parse(sessionStorage.getItem("log"));
    let id = log.companyId;
    this.$Throw.organList({}, id).then((res) => {
      //进来的时候展示某企业下的组织架构
      if (res.data.code == 0) {
        this.name = res.data.data;

        this.companyList = res.data.data.subNode;
      }
    });
  },
  computed: {
    ...mapGetters({
      join: "getJoin",
    }),
  },
  methods: {
    //right搜索
    search() {
      if (!this.input) {
        return this.statement;
      }
      this.copylist = this.statement;

      var res = [];
      this.statement1 = this.statement;
      let text = this.input;
      let reg = new RegExp(text);
      res = this.statement.filter((item) => reg.test(item.peerId)); //筛选
      this.statement = res;
    },
    //重置
    result() {
      if (this.input == "") {
        this.statement = this.statement1;
      }
    },
    //点击对钩做的操作
    onclick(peerId) {
      this.userContList.map((item, index) => {
        if (item.peerId == peerId) {
          this.$set(item, "checked", false);
          this.statement.splice(0, 0, item);
        }
      });
    },
    //点击叉叉做的操作
    fork(peerId) {
      let that = this;

      that.userContList.map((item, index) => {
        that.statement.map((a, b) => {
          if (item.peerId == a.peerId && a.peerId == peerId) {
            that.$set(item, "checked", true);
            that.statement.splice(b, 1);
          }
        });
      });
    },
    // 点击轮巡列表的叉叉操作
    forkList(peerId) {
      let list = [];
      if (this.copylist == "") {
        this.statement.forEach((item, index) => {
          if (item.peerId == peerId) {
            this.statement.splice(index, 1);
          }
          // this.changeOrgChecked(peerId);
          this.userContList.forEach((acc, hu) => {
            if (acc.peerId == peerId) {
              this.$set(acc, "checked", true);
            }
          });
        });
      } else {
        this.statement.forEach((item, index) => {
          this.copylist.forEach((res, index) => {
            if (res.peerId == peerId && res.peerId == item.peerId) {
            } else {
              list.push(res);
            }
          });
          this.statement = list;
          this.input = "";

          // this.changeOrgChecked(peerId);
          this.userContList.forEach((acc, hu) => {
            if (acc.peerId == peerId) {
              this.$set(acc, "checked", true);
              // if(acc.checked=std){
              //   return all
              // }
              // this.defaultKeys.forEach((a, b) => {
              //   console.log(item);
              //   this.defaultKeys.splice(b, 1);
              //   // this.$nextTick(() => {
              //   this.$refs.tree.setCheckedKeys(this.defaultKeys, false);
              //   // });
              // });
            }
          });
        });
      }
    },
    //就是组织架构 勾选状态回显的问题（没解决）
    changeOrgChecked(peerId) {
      //         this.setIndeterminate(false)
      if (!this.defaultKeys[0] || !this.userContList[0]) {
        return;
      }
      let all = false;
      let std = this.userContList[0].checked;
      this.defaultKeys.forEach((org) => {
        if (org === this.userContList[0].nodeId) {
          this.userContList.forEach((item) => {
            if (item.peerId === peerId) {
              this.$set(item, "checked", !item.checked);
            }
            if (std !== item.checked) {
              all = true;
              return;
            }
          });
        }
      });

      if (all) {
        this.setIndeterminate(true);
      } else {
        this.setIndeterminate(false);
        this.$refs.tree.setCheckedKeys(this.defaultKeys, !std);
      }
    },
    // 同样这个是半选的状态
    setIndeterminate(flag) {
      this.defaultKeys.forEach((item) => {
        var node = this.$refs.tree.getNode(item);
        node.indeterminate = flag;
      });
    },
    //选中当前部门的操作
    changehu(data, checked, node) {
      let list = [];
      list.splice(0, 0, data.id);
      this.defaultKeys = [...new Set(list)];
      if (checked == true) {
        this.$Throw.contact({}, data.id).then((res) => {
          let user = [];
          let userLis = [];
          user = res.data.data;
          user.map((item, index) => {
            if (item.type != "node") {
              userLis.push(item);
            }
          });
          if (userLis) {
            this.userContList = [...userLis];
            this.userContList.map((a, b) => {
              this.$set(a, "checked", false);
              this.statement.splice(0, 0, a);
            });
          }
        });
      } else {
        this.$Throw.contact({}, data.id).then((res) => {
          let user = [];
          let userLis = [];
          user = res.data.data;
          user.map((item) => {
            if (item.type != "node") {
              userLis.push(item);
            }
          });
          if (userLis) {
            this.userContList = [...userLis];
            this.userContList.forEach((a, b) => {
              this.statement.forEach((re, index) => {
                if (a.peerId == re.peerId) {
                  this.$set(a, "checked", true);
                  this.statement.splice(index, 1);
                  this.defaultKeys.splice(index, 1);
                }
              });
            });
          }
        });
      }
    },
    //点击部门的操作两次比较（进会和当前部门的设备或者用户进行比较）
    handleNodeClick(data) {
      this.checkedId = data.id;
      this.$Throw.contact({}, data.id).then((res) => {
        this.subNodeList = res.data.data;
        let userNot = [];
        this.subNodeList.map((a) => {
          if (a.type != "node") {
            userNot.push(a);
          }
        });
        if (this.statement == "") {
          this.userList.forEach((item, index) => {
            userNot.forEach((a, b) => {
              if (item.peerId == a.peerId) {
                this.$set(a, "corlorIndex", false);
                userNot.unshift(a);
              }
            });
          });
          // let userNot1 = [...new Set(userNot)];
          let userNot1 = Array.from(new Set(userNot));
          // console.log(userNot1);
          this.userContList = userNot1;
          // console.log(this.userContList);
        } else {
          // console.log(this.userList);
          this.userList.forEach((item, index) => {
            userNot.forEach((a, b) => {
              if (item.peerId == a.peerId) {
                this.$set(a, "corlorIndex", false);
                userNot.unshift(a);
              }
            });
          });
          let userNot1 = [...new Set(userNot)];
          let unequal = userNot1.filter((item) => {
            if (!this.statement.some((ele) => ele.peerId === item.peerId)) {
              this.$set(item, "checked", true);
              return item;
            }
          });

          let equal = userNot1.filter((item) => {
            if (this.statement.some((ele) => ele.peerId === item.peerId)) {
              this.$set(item, "checked", false);
              return item;
            }
          });

          let merge = [...equal, ...unequal];

          this.userContList = [...new Set(merge)];
          // console.log(this.userContList);
        }
      });
    },
    //点击部门进行的三次比较（未发言的和已配置的轮巡列表和部门下的设备或者用户）
    // handleNodeClick(data) {
    //   this.checkedId = data.id;

    //   this.$Throw.contact({}, data.id).then((res) => {

    //     this.subNodeList = res.data.data;
    //     let userNot = [];
    //     this.subNodeList.map((a) => {
    //       if (a.type != "node") {
    //         userNot.push(a);
    //       }

    //       if (this.noStatement == "") {
    //         let hulist = [];
    //         userNot.forEach((item) => {

    //           this.meetingList.forEach((a) => {
    //             if (item.peerId == a.peerId) {
    //               hulist.push(item);
    //             }
    //           });
    //         });

    //         this.userContList = [...new Set(hulist)];

    //       } else {
    //         let hulists = [];
    //         userNot.forEach((item) => {

    //           this.meetingList.forEach((a) => {
    //             if (item.peerId == a.peerId) {
    //               hulists.push(item);
    //             }
    //           });
    //         });
    //         // console.log(hulists);
    //         let unequal = hulists.filter((item) => {
    //           if (!this.noStatement.some((ele) => ele.peerId === item.peerId)) {
    //             this.$set(item, "checked", true);
    //             return item;
    //           }
    //         });
    //         // console.log(unequal);
    //         let equal = hulists.filter((item) => {
    //           if (this.noStatement.some((ele) => ele.peerId === item.peerId)) {
    //             this.$set(item, "checked", false);
    //             return item;
    //           }
    //         });
    //         let merge = getConcat(equal, unequal);
    //         // console.log(merge)
    //         this.userContList = [...new Set(merge)];
    //         console.log(this.userContList);
    //         // console.log("3次比较过后的" + this.userContList);
    //       }
    //     });
    //   });
    // },
    //点击企业名
    companyIdd(name) {
      this.handleNodeClick(name);
    },
    //关闭轮巡列表的弹框
    onClo() {
      // let itemList = [];
      // this.statement.map((item, index) => {
      //   if (item.peerId) {
      //     itemList.push(item.peerId);
      //   }
      // });
      // this.bus.$emit("itemList", itemList);
      this.$emit("close");
      this.userContList = [];
    },
    //点击确认
    confirmClick() {
      let itemList = [];
      this.statement.map((item, index) => {
        if (item.peerId) {
          itemList.push(item.peerId);
        }
      });
      this.bus.$emit("itemList", itemList);
      this.$emit("close");
      this.userContList = [];
    },
  },
  props: {
    roundshow: {
      type: Boolean,
      default: false,
    },
    username: {
      type: Array,
      default: false,
    },
  },
  watch: {
    roundshow() {
      this.dialogTableVisibles = this.roundshow;
      if (this.roundshow == true) {
        let id = this.join.meeting.roomId;

        //获取
        this.$Throw
          .patrol({}, id)
          .then((res) => {
            if (res.data.code == 0) {
              let list = res.data.data.itemList;
              //获取轮询配置的设备或人id

              if (list == "") {
              } else {
                //根据peerid查询该设备或用户信息（轮巡列表再用）
                this.$Throw.pollingg(list).then((res) => {
                  this.noStatement = res.data.data;

                  this.noStatement.forEach((item, index) => {
                    this.$set(item, "checked", false);

                    return item;
                  });

                  this.statement = this.noStatement;
                });
              }
            }
          })
          .catch(() => {});
      }
    },
    username() {
      this.userList = this.username;
      //轮巡页面传过来的会议信息的参会者
      let meeting = [];
      this.userList.forEach((item) => {
        if (item.speakStatus == "2") {
          //(2未发言 1发言)
          // this.statement.push(item);
          meeting.push(item);
        }
      });
      this.meetingList = [...new Set(meeting)];
    },
  },
};
</script>

<style lang="less">
.list-pro {
  // width: 100%;
  // height: 100%;
  // background: red;
  // position: absolute;
  // left: 0;
  // top: 0;

  // position: relative;
  // .el-dialog__wrapper {
  //   position: fixed;
  //   top: -122.5%;
  // }
  .el-dialog {
    // width: 1321px;
    // height: 750px;
    width: 1354px;
    height: 891px;
    position: absolute;
    top: 345px;
    left: 283px;
    margin-top: -245.5px !important;
    .el-dialog__body {
      padding: 0px;
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
  }
}
.tour-list {
  width: 100%;
  height: 890px;
  // background: red;
  border-radius: 20px;
  display: inline-flex;
  .left {
    width: 30%;
    height: 100%;
    border-right: 1px solid #e3e3e3;
    .testing {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e3e3e3;
    }
    .testing:hover {
      cursor: pointer;
    }
    .company {
      display: inline-block;
      width: 331px;
      height: 23px;
      font-size: 24px;
      font-weight: 400;
      color: #555555;
      line-height: 18px;
      margin-left: 25px;
      // background: red;
    }
    .speaker {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #e3e3e3;
      span {
        display: inline-block;
        width: 200px;
        height: 27px;
        font-size: 25px;
        font-weight: 500;
        color: #333333;
        margin-left: 25px;
        margin-top: 20px;
      }
    }
    .tree-personnel {
      margin-left: 25px;
      .el-tree-node__content {
        height: 50px;
        .el-tree-node__label {
          font-size: 24px;
          color: #555555;
        }
        .tour-list
          .left
          .tree-personnel
          .el-tree
          .el-tree-node__expand-icon.is-leaf::before {
          background: white;
        }
        .el-checkbox__inner {
          position: relative;
          top: 2.5px;
          width: 22px;
          height: 22px;
        }
        .el-checkbox__inner::after {
          width: 5px;
          height: 14px;
          position: absolute;
          left: 7px;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
          width: 25px;
          position: absolute;
          top: 9px;
          left: -2.1px;
        }
      }
      .el-tree-node:focus > .el-tree-node__content {
        background-color: #e6eef5 !important;
        color: #fff !important;
      }
      .el-tree .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      //有子节点 且未展开
      .el-tree .el-icon-caret-right:before {
        background: url("../assets/personnel-icon/shangla.png") no-repeat 0 3px;
        content: "";
        display: block;
        width: 25px;
        height: 28px;
        font-size: 16px;
        // margin-top: 2px;
        background-size: 25px;
      }

      //有子节点 且已展开
      .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
        background: url("../assets/personnel-icon/xiala.png") no-repeat 0 3px;
        content: "";
        display: block;
        // margin-top: 2px;
        width: 25px;
        height: 28px;
        font-size: 16px;
        background-size: 25px;
      }

      //没有子节点
      .el-tree .el-tree-node__expand-icon.is-leaf::before {
        // background: #fff;
        background: url("../assets/personnel-icon/shangla.png") no-repeat 0 3px;
        content: "";
        display: block;
        // margin-top: 2px;
        width: 25px;
        height: 28px;
        font-size: 16px;
        background-size: 25px;
      }
    }
  }
  .content {
    width: 34%;
    height: 100%;
    border-right: 1px solid #e3e3e3;
    ul {
      .none {
        width: 100%;
        height: 100%;
        .wula::-webkit-scrollbar {
          width: 0 !important;
        }
        .wula {
          width: 100%;
          height: 850px;
          overflow: auto;
          .li1 {
            width: 100%;
            height: 70px;
            // border-bottom: 1px solid grey;
            display: inline-flex;
            // .right {
            //   width: 100px;
            //   // background:black ;
            //   display: inline-flex;
            // }
            .img1 {
              width: 21px;
              height: 24px;
              margin-top: 40px;
              margin-left: 25px;
            }
            .img2 {
              width: 32px;
              height: 32px;
              background: rgba(242, 65, 65, 0);
              border-radius: 50%;
              margin-top: 35px;
              margin-left: 35px;
            }
            .name8 {
              display: inline-block;
              font-size: 22px;
              width: 290px;
              height: 23px;
              font-weight: 400;
              color: #555555;

              margin-left: 15px;
              margin-top: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .li3 {
            width: 100%;
            height: 70px;
            display: inline-flex;
            .img1 {
              width: 21px;
              height: 24px;
              margin-top: 40px;
              margin-left: 25px;
            }
            .img2 {
              width: 32px;
              height: 32px;
              background: rgba(242, 65, 65, 0);
              border-radius: 50%;
              margin-top: 35px;
              margin-left: 35px;
            }
            .name8 {
              display: inline-block;
              font-size: 22px;
              width: 290px;
              height: 28px;
              font-weight: 400;
              color: #f24141;

              margin-left: 15px;
              margin-top: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

      .li2 {
        width: 100%;
        height: 70px;
        // border-bottom: 1px solid grey;
        display: inline-flex;
        .img1 {
          width: 21px;
          height: 24px;
          margin-top: 40px;
          margin-left: 25px;
        }
        .img2 {
          width: 32px;
          height: 32px;
          background: rgba(242, 65, 65, 0);
          border-radius: 50%;
          margin-top: 33px;
          margin-left: 25px;
        }
        .img3 {
          width: 32px;
          height: 32px;
          background: rgba(242, 65, 65, 0);
          border-radius: 50%;
          margin-top: 33px;
          margin-left: 8px;
        }
        span {
          display: inline-block;
          font-size: 22px;
          width: 220px;
          height: 23px;
          font-weight: 400;
          color: #555555;
          line-height: 18px;
          margin-left: 15px;
          margin-top: 43px;
        }
      }
    }
  }
  .right {
    width: 36%;
    height: 100%;
    .patrol-list {
      display: inline-block;
      margin-top: 25px;
      font-size: 24px;
      color: black;
      margin-left: 38px;
    }
    .search-list {
      width: 100%;
      height: 670px;
      // background: red;
      ul::-webkit-scrollbar {
        width: 0 !important;
      }
      ul {
        width: 100%;
        height: 670px;
        overflow: auto;
        .list-personnel {
          width: 100%;
          height: 70px;
          // border-bottom: 1px solid grey;
          display: inline-flex;
          .img1 {
            width: 21px;
            height: 24px;
            margin-top: 40px;
            margin-left: 38px;
          }
          .img2 {
            width: 32px;
            height: 32px;
            background: rgba(242, 65, 65, 0);
            border-radius: 50%;
            margin-top: 35px;
            margin-left: 45px;
          }
          .name7 {
            display: inline-block;
            font-size: 22px;
            width: 290px;
            height: 28px;
            font-weight: 400;
            color: #555555;
            margin-left: 15px;
            margin-top: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .input-button {
      width: 100%;
      display: inline-flex;
      margin-top: 28px;
      .el-input__inner {
        width: 260px;
        height: 50px;
        background: rgba(2, 179, 252, 0);
        border: 1px solid #c4c4c4;
        border-radius: 25px;
        font-size: 17px;
        margin-left: 33px;
      }
      .el-button {
        width: 110px;
        height: 39px;
        background: #2d97e1;
        border-radius: 5px;
        margin-right: 35px;
        margin-top: 5px;
        font-size: 16px;
      }
    }
    // .confirm {
    //   width: 100px;
    //   height: 50px;
    //   font-size: 26px;
    //   margin-top: 10px;
    //   float: right;
    //   margin-right: 30px;
    // }
    .confirm {
      width: 154px;
      height: 63px;
      background: #2d97e1;
      border-radius: 4px;
      margin-top: 20px;
      float: right;
      margin-right: 40px;
      .que {
        width: 50px;
        height: 25px;
        margin: 0 auto;
        font-size: 26px;
        margin-top: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 5px;
      }
    }
  }
}
</style>