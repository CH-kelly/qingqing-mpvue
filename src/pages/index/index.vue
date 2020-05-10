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
            
          <div class="index-center"  v-show="status===1">
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
          <div class="index-timer" v-show="status===0">
            <countDownTimer :downTimerArray="downTimerArray"></countDownTimer>
          </div>

      </scroll-view>

    <bottomNavBar></bottomNavBar>
   
  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar.vue'
import swiper from "@/components/swiper";
import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import personal from "./child/personal"   //个人信息
import describe from "./child/describe"   //简介
// import button from "./child/button";      //喜欢 不喜欢 按钮
import countDownTimer from "./child/countDownTimer"

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
      contentHeight:0,
      status:0,
      downTimerArray:{like:2,timer:10170}
    }
  },

  components: {
    navigationBar,swiper,personal,describe,bottomNavBar,countDownTimer
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    clickLove(){
      console.log('clickLove',k);
      
    },
    gotoBackImage(){
      //pages/lookBack/main
      wx.navigateTo({
        url:"/pages/lookBack/main"
      })

    },
    clickButtonImage(key){
      this.status=0;
      console.log(this.status)
    }
  },

  created () {
    // let app = getApp()
  }
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
    background: orange;
    margin-right: 30rpx;
}
.button-right{
    background: skyblue;
}


.button-image{
    width: 160rpx;
    height: 160rpx;
}
</style>
