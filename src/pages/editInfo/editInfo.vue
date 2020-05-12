<template>
  <div>
    <navigation-bar  shadow="true">
      <div slot="center">
        {{userInfo.nickname}}
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
      <completion ></completion>
      <!-- 提示 -->
      <div class="center-explain">
          <img class="center-explain-img" src="/static/images/new/anquan.png" alt="">
          <div class="center-explain-text">为保证个人信息100%真实，个人信息需如实填写，方能注册，请严格遵守相关法律法规</div>
      </div>

        <!-- 上传照片 -->
        <uploadImage></uploadImage>

        <!-- 三重认证 -->
        <tripleCertification :userInfo="userInfo"></tripleCertification>
        
        <!-- 基本资料 -->
        <basicInfo  :headInfo="userInfo"></basicInfo>

        <!-- 自我介绍 -->
        <describe title="自我介绍" :content="userInfo.about_me"></describe>
        <describe title="个人爱好" :content="userInfo.hobbies"></describe>
        <describe title="内心独白" :content="userInfo.emotional_view"></describe>
        <describe title="微信号" :content="userInfo.wxid"></describe>
        





    </div>
 </scroll-view>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import store from '@/store'

import completion from "./child/completion"                     //说明
import uploadImage from "./child/uploadImage"                   //上传背景图片
import tripleCertification from "./child/tripleCertification"   //三重认证
import describe from "./child/describe"                         //简介
import basicInfo from "./child/basicInfo"                       //基本资料


export default {
  data () {
    return {
      systemHeight:0,
      contentHeight:0,
      secondPageHeight:0,
      userInfo:{
          isProve:1,isEducation:1,education:'电子科技大学',education1:'本科',education2:'全日制',
          company:'成都科技有限公司',occupation:'设计师',age:20,height:166,constellation:'水瓶座',
          city:'四川',area:'成都',income:'20-30W',nickName:'小星'
      },
      introduceOneself:"自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍",
      hobby:"个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好个人爱好",
      innerMonologue:"内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白内心独白",
      weix:"134445321415",
      token:null,
    }
  },

  components: {
    navigationBar,completion,uploadImage,tripleCertification,describe,basicInfo
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     
     this.systemHeight = store.state.systemHeight;
     let height = store.state.secondPageHeight;
     this.contentHeight = height;
     
  },
  onShow() {
  
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_user_info(token);

  },
  methods: {
    get_user_info(token){
      let that = this;
      that.postRequest('home/user/get_user_info',{token}).then(res=>{  
          if(res.code===0){
              that.userInfo = res.data;
          }
        },err=>{
          console.log(err);
          
        })
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
  background: #F2F6F9;
overflow: hidden;
padding-bottom: 40rpx;
}

/* 安全 */
.center-explain{
    margin: 20rpx;
    background:rgba(255,255,255,1);
    border-radius:20rpx;
    padding: 20rpx;
    display: flex;
    align-items: center;
}
.center-explain-img{
    width: 46rpx;
    height: 36rpx;
    vertical-align: middle;
    margin-right: 20rpx;
}
.center-explain-text{
    
    font-size:24rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:38rpx;
}
</style>
