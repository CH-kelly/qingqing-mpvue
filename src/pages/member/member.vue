<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">
        会员中心
      </div>
    </navigation-bar>
     
    <div class="index-center" :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
      <MemberHead :headInfo="headInfo"></MemberHead>


      <div class="member-center">
          <div class="member-center-top"> 
            <img class="top-image-left" src="/static/images/new/member-center.png" alt="">
            <span class="member-center-advantage">会员优势</span>
            <img class="top-image-right" src="/static/images/new/member-center.png" alt="">
          </div>
          <div class="member-center-middle">
              <div class="middle-left">
                <img class="middle-left-image" src="/static/images/new/rectangle.png" alt="">
                <div class="middle-left-title">会员特权</div>
              </div>
              <div class="middle-center">
                会员用户
              </div>
              <div class="middle-right">
                普通用户
              </div>
          </div>
          <div class="member-center-menu-lists">
            <div class="member-center-menu">
              <div class="menu-item" style="margin-bottom: 32rpx;">
                  <div class="menu-item-recommend">
                    <img  class="menu-item-icon" src="/static/images/new/recommend.png" alt="">
                    推荐用户
                  </div>
                  <div class="menu-item-center">每日10位</div>
                  <div class="menu-item-right">每日5位</div>
              </div>
              <div class="menu-item">
                  <div class="menu-item-recommend">
                     <img  class="menu-item-icon" src="/static/images/new/return.png" alt="">
                    访客查看
                  </div>
                  <div class="menu-item-center">回看全部访客</div>
                  <div class="menu-item-right">不支持</div>
              </div>
            </div>
            <div class="member-center-menu">
              <div class="menu-item" style="margin-bottom: 32rpx;">
                  <div class="menu-item-recommend">
                    <img  class="menu-item-icon" src="/static/images/new/like.png" alt="">
                    超级喜欢
                  </div>
                  <div class="menu-item-center">超级喜欢</div>
                  <div class="menu-item-right">需单独购买</div>
              </div>
              <div class="menu-item">
                  <div class="menu-item-recommend">
                    <img  class="menu-item-icon" src="/static/images/new/medal.png" alt="">
                    会员身份标志
                  </div>
                  <div class="menu-item-center">支持</div>
                  <div class="menu-item-right">不支持</div>
              </div>
            </div>
          </div>
      </div>

      <div class="member-button"> 
          <div class="button-exchange-member" @click="exchange()">
            兑换会员
          </div>
          <div class="button-renewal-member" @click="openVipMember()">
            续费会员
          </div>
      </div>

      
    </div>

    <div class="buy-member-vip" v-show="isShowBuyMemberVip">
      <buyMemberVip @close="closeBuyMemberVip"></buyMemberVip>
    </div>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import store from '@/store'

import MemberHead from "./child/head"
import buyMemberVip from "./child/buyMemberVip"
export default {
  data () {
    return {
      
      headInfo:{
        nickname:'晓欣',avatar:'/static/images/demo_2@2x.png',isVip:"您还不是会员"
      },
      systemHeight:0,
      contentHeight:0,
      isShowBuyMemberVip:false
    }
  },

  components: {
    navigationBar,
    MemberHead,
    buyMemberVip
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    exchange(){ 
      //兑换码
      wx.navigateTo({url:'/pages/exchange/main'})
    },
    openVipMember(){
      // 续费会员
      this.isShowBuyMemberVip = true;
    },
    closeBuyMemberVip(){
      console.log('closeBuyMemberVip');
      
      this.isShowBuyMemberVip = false;
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
  /* padding: 0 20rpx 40rpx 20rpx; */
  background: #ffffff;
  /* background:skyblue; */
  overflow: hidden;

}


.member-center{
  margin-top: 24rpx;
}
.member-center-top{
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-image-left{
  width: 24rpx;
  height: 27rpx;
  vertical-align: middle;
}
.top-image-right{
  width: 24rpx;
  height: 27rpx;
  vertical-align: middle;
  transform: rotate(180deg);
}
.member-center-advantage{
  
  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(0,0,0,1);
  margin: 0 20rpx;
}
.member-center-middle{
  margin-top: 36rpx;
  display: flex;
  align-items: center;
}
.middle-left{
  width: 30%;
  height: 62rpx;
  font-size:28rpx;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
  position: relative;
}
.middle-left-image{
  width: 100%;
  height: 62rpx;
}
.middle-left-title{
  position: absolute;
  text-align: center;
  line-height: 62rpx;
  padding: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}



.middle-center{
  width: 40%;
  text-align: center;
  font-size:28rpx;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(239,186,106,1);
}
.middle-right{
  width: 30%;
  text-align: center;
  font-size:28rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
}

.member-center-menu-lists{
  padding: 30rpx;
}

.member-center-menu{
  background:rgba(246,246,246,1);
  border-radius:16px;
  padding: 36rpx 20rpx;
  margin-bottom: 30rpx;
}
.menu-item{
  display: flex;
  align-items: center;
}
.menu-item-icon{
  width: 34rpx;
  height: 34rpx;
  vertical-align: middle;
  margin-right: 10rpx;
}
.menu-item-recommend{
  width: 30%;
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,1);

  display: flex;
  align-items: center;


}
.menu-item-center{
  
  width: 40%;
  text-align: center;
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(239,186,106,1);
}
.menu-item-right{
  
  width: 30%;
  text-align: center;
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
  position: relative;
  left: 30rpx;

}








/* 会员兑换 */
.member-button{
  width: 100%;
  position: fixed;
  bottom: 52rpx;

  display: flex;
  justify-content: center;
}
.button-exchange-member{
  
  width: 40%;
  height:80rpx;
  text-align: center;
  line-height: 80rpx;
  border:2rpx solid rgba(242,204,146,1);
  background: #ffffff;
  border-radius:40rpx;
  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(239,186,106,1);
  margin-right: 42rpx;
}

.button-renewal-member{
  width: 40%;
  height:80rpx;
  text-align: center;
  line-height: 80rpx;
  background:linear-gradient(0deg,rgba(242,204,146,1),rgba(229,178,101,1));
  box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);
  border-radius:40rpx;

  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
}


/* 显示购买会员 */
.buy-member-vip{
  width: 100vw;
  height: 100vh;

  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
    /* transform: translate(50%,-50%); */
  z-index: 99999;
}
</style>
