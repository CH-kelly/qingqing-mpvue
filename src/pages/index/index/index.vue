<template>
  <div>
    <navigation-bar background="#F4F5F9">
      <!-- <div slot="left">
        <img src="/static/images/new/back.png" alt="">
      </div>
      <div slot="center">    </div>-->
      <div slot="left">
        <div class="navigation-left-back" @click="gotoBackImage">回看</div>
      </div>
      <div slot="center">
        <img class="navigation-center-image" src="/static/images/greet/lvy_title.png" alt />
      </div>
    </navigation-bar>

    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center" v-if="status===0">
        <!-- <div class="index-center" :style="{marginTop:systemHeight+'px'}"> -->
        <swiper :images="images" />

        <!-- 个人资料 -->
        <personal :currentUser="currentUser"></personal>

        <describe title="自我介绍" :content="currentUser.about_me"></describe>
        <describe title="个人爱好" :content="currentUser.hobbies"></describe>
        <describe title="内心独白" :content="currentUser.emotional_view"></describe>
        <describe title="微信号" :content="currentUser.wxid"></describe>

        <!-- <button ></button> -->
        <!--底部按钮-->
        <div class="button" :style="{bottom:'10px'}">
          <div class="button-left">
            <img
              @click="clickButtonImage(1)"
              class="button-image"
              src="/static/images/greet/delete_icon.png"
              alt
            />
          </div>
          <div class="button-center" @click="superLike">
            <!-- <img @click="clickButtonImage(3)" class="button-image" src="/static/images/greet/delete_icon.png" alt=""> -->

            <img class="super-like-image" src="/static/images/new/heart3.png" alt />
            <div class="super-like-title">超级喜欢</div>
          </div>
          <div class="button-right">
            <img
              @click="clickButtonImage(2)"
              class="button-image"
              src="/static/images/greet/like_icon.png"
              alt
            />
          </div>
        </div>
      </div>

      <!-- 倒计时 -->
      <div class="index-timer" v-else>
        <countDownTimer :downTimerArray="downTimerArray" @clearTimer="clearTimer"></countDownTimer>
      </div>
    </scroll-view>

    <!-- <bottomNavBar></bottomNavBar> -->

    <div class="dialog-wrap-guide" v-if="isReadDialog===1">
      <div class="dialog-wrap-guide-sex">
        <img
          class="dialog-wrap-guide-image"
          v-if="lookAroundSex===2"
          src="/static/images/popup/newbie_1_m.png"
          alt
          @click="knowSex"
        />
        <img
          class="dialog-wrap-guide-image"
          v-if="lookAroundSex===1"
          src="/static/images/popup/newbie_1_f.png"
          alt
          @click="knowSex"
        />
        <img
          class="dialog-wrap-guide-like"
          v-if="lookAroundSex===3"
          src="/static/images/popup/old_1.png"
          alt
          @click="knowSex"
        />
        <img
          class="dialog-wrap-guide-nolike"
          v-if="lookAroundSex===4"
          src="/static/images/popup/old_2.png"
          alt
          @click="knowSex"
        />
        <img
          class="dialog-wrap-guide-image"
          v-if="lookAroundSex===5"
          src="/static/images/popup/popup_3.png"
          alt
          @click="knowSex"
        />
      </div>
    </div>

    <!-- 登录授权 -->
    <auth v-if="isAuth===1" @SignInTemporarily="SignInTemporarily"></auth>

    <!-- 超级喜欢 -->
    <superLike v-if="isSuperLike===1" @close="closeSuperLike"  :currentUser="currentUser" :super_like_num="super_like_num" ></superLike>


  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar.vue";
import swiper from "@/components/swiper";
import superLike from "@/components/superLike";

// import bottomNavBar from "@/components/bottomNavBar"
import store from "@/store";

import personal from "./child/personal"; //个人信息
import describe from "./child/describe"; //简介
// import button from "./child/button";      //喜欢 不喜欢 按钮
import countDownTimer from "./child/countDownTimer";

import auth from "@/pages/auth"; //授权登录


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
      userInfo: null,
      isAuth: 0,
      isSuperLike:0,
      isLogin:store.state.isLogin,
      token:null,
      super_like_num:0,
    };
  },
  onLoad(options) {
    
    let that = this;
    wx.getStorage({
      key: "lookAround",
      success(res) {
        that.lookAround = res.data;
      }
    });
    wx.getStorage({
      key: "isReadDialog",
      success(res) {
        that.isReadDialog = res.data;
      }
    });
    wx.getStorage({
      key: "lookAroundSex",
      success(res) {
        that.lookAroundSex = res.data;
      }
    });
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.userInfo = JSON.parse(res.data);
      }
    });
  },
  components: {
    navigationBar,
    swiper,
    personal,
    describe,
    // bottomNavBar,
    countDownTimer,
    auth,
    superLike,
  },
  onShow(){
    this.getrecommend_list();
    
      let token = store.state.token || wx.getStorageSync('token');
      if(token){
        this.get_user_info(token);
      }
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {
    superLike(){
       // 点击超级喜欢
      this.isLogin = store.state.isLogin;
      this.token = wx.getStorageSync('token');
      this.userInfo = store.state.userInfo;
      var that = this;
      console.log('superLike')
      if (this.token !='' && this.userInfo !='') {
          
          this.isSuperLike = 1;
          
      } else {
        // 登录
        this.isAuth = 1;
      }
    },
    closeSuperLike(){
      this.isSuperLike = 0;
    },
    SignInTemporarily() { //
      this.isAuth = 0;
      this.getrecommend_list();
      let token =  wx.getStorageSync('token') || store.state.token ;
      if(token){
        this.get_user_info(token);
      }
    },
    clickLove() {
      console.log("clickLove", k);
    },
    clearTimer(){
      this.status = 0;
      this.getrecommend_list();

    },
    getrecommend_list(){  //获取首页推荐
        let that = this;
        let token = store.state.token || wx.getStorageSync('token');
        let url = '';
        if(token){
          url = "home/recommend/get_recommend_list";
        }else{
          
          url = "home/recommend/get_anonymous_recommend_list";
        }
        
        that.postRequest(url,{token}).then(res=>{
                
            if(res.code===0){
                // if(res.data.total_rec_num>0){
                var userList = res.data.user_list;
                console.log(userList);
                if(userList.length !== 0){
                  that.user_list = userList;
                  that.currentUser = userList[0];
                  that.images = that.currentUser.photos;
                  that.status = 0;

                }else{

                   that.downTimerArray={
                      like: res.data.is_like_num, timer: res.data.count_down
                  }

                  that.status = 1;
                  
                }
                console.log(that.status,"   that.status-------")
            }
        },err=>{
          
          console.log(err);
          
        })
    },
    get_user_info(token){
      let that = this;
        
      that.postRequest('home/user/get_user_info',{token}).then(res=>{  
          if(res.code===0){
              that.userInfo = res.data;
              that.super_like_num = res.data.super_like_num;
          }
        },err=>{
          console.log(err);
          
        })
    },
    gotoBackImage() {
      //pages/lookBack/main
      this.isLogin = store.state.isLogin;
      let token = store.state.token || wx.getStorageSync('token');

      this.get_user_info(token);

      if (this.userInfo || this.isLogin===1 || token) { //已登录
        //登录成功后需要时vip才可以查看回看
        if(this.userInfo.is_vip === 1){

          wx.navigateTo({
            url: "/pages/index/pages/lookBack/main"
          });

        }else{
          wx.showToast({
            title: '您还不是VIP，不能查看回放',
            icon: 'loading',
            duration: 2000
          })
        }

        
      } else {
        // 登录
        this.isAuth = 1;
      }
    },
    clickButtonImage(key) {
      // 点击喜欢或不喜欢按钮   1不喜欢   2喜欢
      this.isLogin = store.state.isLogin;
      this.token = wx.getStorageSync('token');
      this.userInfo = this.userInfo || store.state.userInfo ;
      var that = this;
      console.log('clickButtonImage  ',key);
      
      if (this.userInfo || this.isLogin===1 || this.token!==null) {
          // 已登录
          let url = '';
          
          var data = {token:that.token,target_uid:that.currentUser.uid};
          if(key===1){
            url ="home/recommend/skip_recommend_user";
          }else{
            data.type=1;
            url ="home/like/add_like";
          }

          if(that.token){
            that.postRequest(url,data).then(res=>{
                if(res.code ===0){ 
                    let result = res.data;
                    console.log(result,that.userInfo.openid);
                    if(result && result.openid){
                        console.log("相互喜欢，可以开始聊天");
                        // 如果相互喜欢，那么可以添加好友
                        let openid = that.userInfo.openid;
                        let friend =  result.openid || 123123; 
                        let content = "相互喜欢，可以开始聊天"
                        // 发送添加好友
                        that.appIMDelegate.getIMHandlerDelegate()._add_friends(friend,openid,content);
                    }


                    that.getrecommend_list();   
                }
            }).catch(res=>{
              wx.showToast(res)
            })
          }else{
            // 登录
            this.isAuth = 1;

          }
          
      } else {
        // 登录
        this.isAuth = 1;
      }
    },
    knowSex() {
      //1男  2女
      if (this.lookAroundSex == 1) {
        this.lookAroundSex = this.lookAroundSex + 2;
      } else {
        this.lookAroundSex = this.lookAroundSex + 1;
      }

      if (this.lookAroundSex > 5) {
        this.isReadDialog = 2;
        wx.setStorageSync("isReadDialog", 2); //是否已阅读引导页面
      }
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
