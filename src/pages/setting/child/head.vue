<template>
  <div class="love-trends-head" v-if="isAuth==0">
    <div class="head-left">
      <img class="head-avatar" :src="headInfo.avatarUrl" alt />
    </div>
    <div class="head-center">
      <div class="head-nickname">{{headInfo.nickName}}</div>
      <div class="head-desc">
        <img class="head-right-icon" src="/static/images/new/authentication.png" alt />
        <span class="head-right-authentication">已认证</span>
      </div>
    </div>
    <div class="head-right">
      <div class="head-right-button" @click="editInfo">
        <span class="head-right-title">查看/编辑资料</span>
        <!-- <span>></span> -->
        <img class="item-back" src="/static/images/new/back.png" alt />
      </div>
    </div>
  </div>
  <div class="love-trends-head" v-else>
    <div class="head-left-button">
      <button
        class="reminder-button-left"
        open-type="getUserInfo"
        @getuserinfo="bindGetUserInfo"
        style="background: rgba(27,233,201,1);border: none;"
      >
        <img class="login-icon" src="/static/images/mine/wechat.png" alt />
        <span class="head-bold">微信登录/注册</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headInfo: { type: Object }
  },
  data() {
    return {
        isAuth: 1,
    };
  },
  onLoad() {

    let that = this;
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.isAuth = 0;
      }
    });
        
  },

  methods: {
    editInfo() {
      wx.navigateTo({
        url: "/pages/editInfo/main"
      });
    },
    bindGetUserInfo(e) {
        // console.log('回调事件后触发')
        const self = this;
        if (e.mp.detail.userInfo){
            console.log('用户按了允许授权按钮')
            let { encryptedData,userInfo,iv } = e.mp.detail;
            
            wx.setStorageSync('userInfo', JSON.stringify(userInfo)); //保存用户信息
            this.headInfo = userInfo;
            this.isAuth = 0;
            console.log("setting head userInfo",this.headInfo);
            //userInfo
            // self.$http.post(api,{
            //     // 这里的code就是通过wx.login()获取的
            //     code:self.code,
            //     encryptedData,
            //     iv,
            // }).then(res => {
            //     console.log(`后台交互拿回数据:`,res);
            //     // 获取到后台重写的session数据，可以通过vuex做本地保存
            // }).catch(err => {
            //     console.log(`api请求出错:`,err);
            // })  
        } else {
            //用户按了拒绝按钮
            console.log('用户按了拒绝按钮');
        }
    },
  }
};
</script>
<style scoped>
.love-trends-head {
  width: 100%;
  height: 170rpx;
  /* background:rgba(107,194,213,1); */

  display: flex;
  align-items: center;
}
.head-left {
  width: 20%;
  /* background: orange; */
}
.head-center {
  width: 50%;
  /* background: skyblue; */
}
.head-right {
  width: 30%;
  /* background: orange; */
}
.head-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: block;
}
.head-center {
  font-size: 34rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.head-desc {
  margin-top: 6rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  position: relative;
}

.head-right-button {
  display: flex;
  height: 51rpx;
  justify-content: center;
  align-items: center;
  position: relative;
}
.head-right-icon {
  width: 50rpx;
  height: 50rpx;
  display: block;
  position: relative;
  top: 8rpx;
  left: -4px;
}
.head-right-authentication {
  position: relative;
  left: -4px;
}
.head-right-title {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.item-back {
  width: 16rpx;
  height: 20rpx;
  transform: rotate(180deg);
  position: absolute;
  right: 0;
}


/* 登录注册按钮 */

.reminder-button {
  margin-bottom: 32rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.reminder-button-left {
  width: 360rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-radius: 45rpx;
  border: 2rpx solid rgba(238, 238, 238, 1);

    display: flex;
    justify-content: center;
    align-items: center;


}
.login-icon {
  width: 60rpx;
  height: 50rpx;
  margin-right: 20rpx;
}

.head-bold {
  font-weight: bold;
  color: #000;
  font-size: 30rpx;
  font-family: PingFang SC;
}
</style>