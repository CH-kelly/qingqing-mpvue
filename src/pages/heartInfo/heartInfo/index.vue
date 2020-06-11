<template>
  <div>
    <navigation-bar background="#F4F5F9">
      <div slot="center">
        <img class="navigation-center-image" src="/static/images/greet/lvy_title.png" alt />
      </div>
    </navigation-bar>

    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px'}"
    >
      <div class="index-center" v-if="status===0">
        <!-- <div class="index-center" :style="{marginTop:systemHeight+'px'}"> -->
        <swiper :images="images" />

        <!-- 个人资料 -->
        <personal :currentUser="userInfo"></personal>

        <describe title="自我介绍" :content="userInfo.about_me"></describe>
        <describe title="个人爱好" :content="userInfo.hobbies"></describe>
        <describe title="内心独白" :content="userInfo.emotional_view"></describe>
        <describe title="微信号" :content="userInfo.wxid"></describe>

      </div>

    </scroll-view>

  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar.vue";
import swiper from "@/components/swiper";

// import bottomNavBar from "@/components/bottomNavBar"
import store from "@/store";

import personal from "@/pages/index/index/child/personal"; //个人信息
import describe from "@/pages/index/index/child/describe"; //简介

export default {
  data() {
    return {
      images:[],
      user_list:[],
      currentUser:{},
      currentIndex:0,
      systemHeight: 0,
      isReadDialog: 0,
      contentHeight: 0,
      lookAroundSex: 0,
      lookAround: 0,
      status: 0,
      downTimerArray: { like: 2, timer: 10170 },
      userInfo:{},
      isAuth: 0,
      isSuperLike:0,
      isLogin:store.state.isLogin,
      token:null,
      target_uid:0,
    };
  },
  onLoad(options) {
    
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.target_uid = options.target_uid || 0
    this.get_user_info();
  },
  components: {
    navigationBar,
    swiper,
    personal,
    describe,
  },
  onShow(){
    this.get_user_info();
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {
    get_user_info(){
      let that = this;
      let target_uid = this.target_uid;
      let token = this.token;
      that.postRequest('home/user/get_user_info',{token,target_uid}).then(res=>{  
          if(res.code===0){
            that.userInfo = res.data;
            that.images=res.data.photos
          }
          console.log(that.userInfo.about_me);
        },err=>{
          console.log(err);
          
        })
    }
  }
};
</script>

<style scoped>
.navigation-left-back {
  width: 90rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 22rpx;
  color: #333333;
  font-size: 26rpx;
  font-weight: normal;

  overflow: hidden;
}
.navigation-center-image {
  width: 45%;
  height: 50%;
}

.index-center {
  padding: 0 20rpx 40rpx 20rpx;
  background: #f4f5f9;
  /* background:skyblue; */
  overflow: hidden;
}

.index-timer {
  height: 100%;
  background: #f4f5f9;
  padding: 20rpx 40rpx;
}

/* 按钮样式 */
.button {
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-left {
  /* width: 30%; */
  /* background: orange; */
  margin-right: 30rpx;
}
.button-right {
  /* background: skyblue; */
}
.button-center {
  width: 290rpx;
  height: 108rpx;
  background: linear-gradient(
    -40deg,
    rgba(219, 128, 100, 1),
    rgba(253, 59, 109, 1)
  );
  border-radius: 53rpx;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30rpx;
}
.super-like-image {
  width: 70rpx;
  height: 50rpx;
  vertical-align: middle;
}
.super-like-title {
  font-size: 34rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 38rpx;
}

.button-image {
  width: 140rpx;
  height: 140rpx;
}

/* 引导页面的样式 */
.dialog-wrap-guide {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.9);
}
.dialog-wrap-guide-sex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dialog-wrap-guide-image {
  width: 560rpx;
  height: 760rpx;
}
.dialog-wrap-guide-like {
  width: 500rpx;
  height: 560rpx;

  position: absolute;
  bottom: 125rpx;
  right: 0;
}
.dialog-wrap-guide-nolike {
  width: 500rpx;
  height: 560rpx;

  position: absolute;
  bottom: 125rpx;
  left: 83rpx;
}
</style>
