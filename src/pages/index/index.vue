<template>
  <div>
    <navigation-bar background="#F4F5F9">
      <!-- <div slot="left">
        <img src="/static/images/new/back.png" alt="">
      </div>
      <div slot="center">    </div> -->
      <div slot="left">
        <div class="navigation-left-back"  @click="gotoBackImage">回看</div>
      </div>
      <div slot="center"> 
        <img class="navigation-center-image" src="/static/images/greet/lvy_title.png" alt="">
      </div>
    </navigation-bar>
    
      <scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
            
          <div class="index-center"  v-if="status===0">
          <!-- <div class="index-center" :style="{marginTop:systemHeight+'px'}"> -->
              <swiper :images="images" />

              <!-- 个人资料 -->
              <personal></personal>

              <describe title="自我介绍" content="....eedddcontentcontent自我介绍自我介绍自我介绍content"></describe>
              <describe title="个人爱好" content="....eedddcontentcontent自我介绍自我介绍自我介绍content"></describe>
              <describe title="内心独白" content="....eedddcontentcontent自我介绍自我介绍自我介绍content"></describe>
              <describe title="自我介绍" content="....eedddcontentcontent自我介绍自我介绍自我介绍content"></describe>
              <describe title="微信号" content="1234566"></describe>

              <!-- <button ></button> -->
              <!--底部按钮-->
              <div class="button" :style="{bottom:'70px'}">
                  <div class="button-left" >
                      <img @click="clickButtonImage(1)" class="button-image" src="/static/images/greet/delete_icon.png" alt="">
                  </div>
                  <div class="button-right" >
                      <img @click="clickButtonImage(2)"  class="button-image" src="/static/images/greet/like_icon.png" alt="">
                  </div>
              </div>
          
          </div>

           <!-- 倒计时 -->
          <div class="index-timer" v-else>
            <countDownTimer :downTimerArray="downTimerArray"></countDownTimer>
          </div>

      </scroll-view>

    <!-- <bottomNavBar></bottomNavBar> -->

    <div class="dialog-wrap-guide" v-if="isReadDialog===1">
      <div class="dialog-wrap-guide-sex">
        <img  class="dialog-wrap-guide-image" v-if="lookAroundSex===2" src="/static/images/popup/newbie_1_m.png" alt="" @click="knowSex">
        <img  class="dialog-wrap-guide-image" v-if="lookAroundSex===1" src="/static/images/popup/newbie_1_f.png" alt=""  @click="knowSex">
        <img class="dialog-wrap-guide-like"  v-if="lookAroundSex===3" src="/static/images/popup/newbie_2.png" alt=""  @click="knowSex">
        <img class="dialog-wrap-guide-nolike" v-if="lookAroundSex===4" src="/static/images/popup/newbie_3.png" alt=""  @click="knowSex">
        <img class="dialog-wrap-guide-image" v-if="lookAroundSex===5" src="/static/images/popup/popup_3.png" alt=""  @click="knowSex">
      </div>
    </div>

    <auth v-if="isAuth===1" @SignInTemporarily="SignInTemporarily"></auth>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar.vue'
import swiper from "@/components/swiper";
// import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import personal from "./child/personal"   //个人信息
import describe from "./child/describe"   //简介
// import button from "./child/button";      //喜欢 不喜欢 按钮
import countDownTimer from "./child/countDownTimer"

import auth from "@/pages/auth"   //授权登录


export default {
  data () {
    return {
      images: [
        {
          url:
            "https://img-oss.yunshanmeicai.com/goods/default/31d8dfa4-0d7b-4694-80f9-41b07c9d0a3a.png"
        },
        {
          url:
            "https://img-oss.yunshanmeicai.com/goods/default/e83c8f0f-4acc-4729-bcbb-294f2b314977.jpg"
        }
      ],
      systemHeight:0,
      isReadDialog:0,
      contentHeight:0,
      lookAroundSex:0,
      lookAround:0,
      status:0,
      downTimerArray:{like:2,timer:10170},
      userInfo:null,
      isAuth:0,
    }
  },
  // created(){
  //    let userInfo = wx.getStorageSync('userInfo') || null
  //     console.log("created",userInfo);
  //     if(userInfo===null){
  //       //pages/guide/main
  //       wx.showLoading({
  //           title: '请稍等111...',
  //           icon: 'success',
  //           duration: 1000
  //       })
  //       wx.reLaunch({
  //         url: "/pages/guide/main"
  //       });
  //     }
    
  // },
  onLoad(options) {
    
    console.log('userInfo2',this.userInfo);

    let that = this;
    wx.getStorage({
      key: 'lookAround',
      success (res) {
        that.lookAround = res.data
      }
    })
    wx.getStorage({
      key: 'isReadDialog',
      success (res) {
        that.isReadDialog = res.data
      }
    })
    wx.getStorage({
      key: 'lookAroundSex',
      success (res) {
        that.lookAroundSex = res.data
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        console.log('userInfo1',res.data);
        that.userInfo = JSON.parse(res.data);
      }
    })
  },
  components: {
    navigationBar,swiper,personal,describe,
    // bottomNavBar,
    countDownTimer,auth
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
  },
  methods: {
    SignInTemporarily(){
      this.isAuth = 0;
    },
    clickLove(){
      console.log('clickLove',k);
      
    },
    gotoBackImage(){
      //pages/lookBack/main
      
        if(this.userInfo){
          wx.navigateTo({
            url:"/pages/lookBack/main"
          })
        }else{
          // 登录
          this.isAuth = 1;
        }
      
    },
    clickButtonImage(key){
      // 点击喜欢或不喜欢按钮
      console.log("clickButtonImage",this.userInfo);
      console.log(!this.userInfo);
      
      if(this.userInfo){
          this.status=1;
      }else{
        // 登录
        this.isAuth = 1;
      }
      
    },
    knowSex(){
      //1男  2女
      if(this.lookAroundSex == 1){
          this.lookAroundSex = this.lookAroundSex +2;
      }else{
         this.lookAroundSex = this.lookAroundSex +1;
      }
     
      
      if(this.lookAroundSex > 5){
        this.isReadDialog = 2;
        wx.setStorageSync('isReadDialog', 2); //是否已阅读引导页面
      }
    }
  },
}
</script>

<style scoped>
.navigation-left-back{
  width:90rpx;
  height:44rpx;
  line-height: 44rpx;
  text-align: center;
  background:rgba(255,255,255,1);
  border-radius:22rpx;
  color: #333333;
  font-size: 26rpx;
  font-weight:normal;

  overflow: hidden;

}
.navigation-center-image{
  width: 45%;
  height: 50%;
}


.index-center{
  padding: 0 20rpx 40rpx 20rpx;
  background: #F4F5F9;
  /* background:skyblue; */
  overflow: hidden;

}

.index-timer{
  height: 100%;
  background: #F4F5F9;
  padding: 20rpx 40rpx ;
}




/* 按钮样式 */
.button{
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 1;
    display: flex;
    justify-content: center;
}
.button-left{
    /* width: 30%; */
    /* background: orange; */
    margin-right: 30rpx;
}
.button-right{
    /* background: skyblue; */
}


.button-image{
    width: 160rpx;
    height: 160rpx;
}





/* 引导页面的样式 */
.dialog-wrap-guide{
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, .9);
}
.dialog-wrap-guide-sex{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dialog-wrap-guide-image{

  width: 560rpx;
  height: 760rpx;
}
.dialog-wrap-guide-like{
  width: 500rpx;
  height: 560rpx;

  position: absolute;
  bottom: 125rpx;
  right: 0;

}
.dialog-wrap-guide-nolike{
  width: 500rpx;
  height: 560rpx;

  position: absolute;
  bottom: 125rpx;
  left: 83rpx;
}








</style>
