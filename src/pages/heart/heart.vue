<template>
  <div>
    <navigation-bar  shadow="true">
      <div slot="left">
        中意人
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
          <heart-item :heartList="heartList"></heart-item>
    </div>
 </scroll-view>

    <!-- <bottomNavBar></bottomNavBar> -->
    
    <!-- 登录授权 -->
    <auth v-if="isAuth===1" @SignInTemporarily="SignInTemporarily"></auth>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
// import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import heartItem from "./child/heartItem"

import auth from "@/pages/auth"; //授权登录
export default {
  data () {
    return {

      isAuth: 0,
      systemHeight:0,
      contentHeight:0,
      heartList:[
        {
          avatar:'/static/images/demo_2@2x.png',
          nickname:'李毅',
          education:'电子科技大学'
        },
        {
          avatar:'/static/images/demo_3@2x.png',
          nickname:'李毅',
          education:'电子科技大学'
        },
        {
          avatar:'/static/images/demo_5@2x.png',
          nickname:'李毅',
          education:'电子科技大学'
        }
      ],
      token:'',
    }
  },
  onLoad(option){
    
    // let token = store.state.token || wx.getStorageSync('token');
    // this.token = token;
    // this.my_like_list(token);
  },
  onShow(){

    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.my_like_list(token);
  },
  components: {
    navigationBar,
    // bottomNavBar,
    heartItem,
    auth,
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    my_like_list(token){
      let that = this;
      that.postRequest('home/like/my_like_list',{token}).then(res=>{  
          console.log(res,res.code==0,token);
          if(res.code==0){
              that.heartList = res.data;
              that.isAuth = 0;
          }else{
            wx.showToast({
              "title":res.message,
              'icon':'loading'
            });
            that.isAuth = 1;
          }
        },err=>{
          
          console.log(err);
          
        })
    },
    SignInTemporarily() { //
      this.isAuth = 0;

        let token = store.state.token || wx.getStorageSync('token');
        this.token = token;
        this.my_like_list(token);
    },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function () {
      wx.showLoading({
        title: '加载中',
      })
      let page = 0;
      let that = this;
      setTimeout(function () {
        that.my_like_list();
        wx.stopPullDownRefresh()
      }, 2000)
    },
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
  margin: 20rpx 20rpx 40rpx 20rpx;
  
  background: #ffffff;
  /* background:skyblue; */
  overflow: hidden;

}


</style>
