<template>
  <div>
    <navigation-bar>
      <div slot="left">
        设置
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center" :style="{height:contentHeight+'px'}">
      
      <SettingHead :headInfo="headInfo"></SettingHead>
      
      <!-- vip会员中心 -->
      <div class="member-center">
          <img class="member-center-vip" src="/static/images/new/vip.png" alt="">
          <span class="vip-line">|</span>
          <div class="member-center-title">
            <div class="member-center-title1">会员中心</div>
            <div class="member-center-title2">享受四大权益</div>
          </div>
          <div class="open-now" @click="openNowVip">
            立即开通
          </div>
      </div>
      <!-- 菜单 -->
      <div class="menu-lists">
          <div class="menu-lists-item" @click="search()">
            <img class="item-icon" src="/static/images/new/search.png" alt="">
            <div class="item-title">搜索设置</div>
            <img class="item-back" src="/static/images/new/back.png" alt="">
          </div>
          <div class="menu-lists-item">
            <img  class="item-icon" src="/static/images/new/member.png" alt="">
            <div class="item-title">推荐给好友</div>
            <div>
              <span>免费领会员</span>
            </div>
            <img class="item-back" src="/static/images/new/back.png" alt="">
          </div>
          <div class="menu-lists-item">
            <img  class="item-icon" src="/static/images/new/service.png" alt="">
            <div class="item-title">联系客服</div>
            <img class="item-back" src="/static/images/new/back.png" alt="">
          </div>
      </div>


    
    </div>
 </scroll-view>

    <bottomNavBar></bottomNavBar>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'


import SettingHead from "./child/head"

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
      headInfo:{
        nickname:'晓欣',avatar:'/static/images/demo_2@2x.png',number:2
      },
      systemHeight:0,
      contentHeight:0
    }
  },

  components: {
    navigationBar,bottomNavBar,SettingHead
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    openNowVip(){
      // 立即开通VIP按钮
      wx.navigateTo({
        url:'/pages/member/main'
      })
    },
    search(){
      // 搜索设置按钮
      wx.navigateTo({
        url:'/pages/search/main'
      })
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
  background: #F2F6F9;
  /* background:skyblue; */
  overflow: hidden;

}

/* 会员中心 */
.member-center{
  background:rgba(0,0,0,1);
  border-radius:20rpx;
  display: flex;
  align-items: center;
  height: 120rpx;

  position: relative;
  margin-bottom: 20rpx;

}
.member-center-vip{
  width: 72rpx;
  height: 32rpx;
  margin-left: 44rpx;
  vertical-align: middle;
  
}
.open-now{ 
  background:linear-gradient(90deg,rgba(253,233,180,1),rgba(254,225,169,1));
  border-radius:27px;
  font-size:26rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,1);
  width:157rpx;
  height:56rpx;
  line-height: 56rpx;
  text-align: center;

  position: absolute;
  right: 20rpx;



}
.member-center-title1{
  
  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.member-center-title2{
  
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.vip-line{
  color: #FEE1A9;
  margin-left: 20rpx;
  margin-right: 20rpx;
}













/* 菜单 */
.menu-lists{
  background: #ffffff;
  border-radius: 20rpx;
}
.menu-lists-item{
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1px solid #F6F6F6;
  position: relative;
}
.item-icon{
  width: 32rpx;
  height: 32rpx;
  vertical-align: middle;
}
.item-title{
  
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(17,17,17,1);

  margin-left: 20rpx;


}

.item-back{
  width: 16rpx;
  height: 20rpx;
  transform: rotate(180deg);
  position: absolute;
  right: 20rpx;
}

/* 箭头 */
/* .arrow{
  width: 10rpx;
  height: 10rpx;
  border-top: 1px solid rgba(102,102,102,1);
  border-right: 1px solid rgba(102,102,102,1);
  transform: rotate(45deg);
} */
</style>
