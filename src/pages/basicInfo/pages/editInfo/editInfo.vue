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
        <uploadImage :images="images" @uploadImageModel="uploadImageModel"></uploadImage>

        <!-- 三重认证 -->
        <tripleCertification :userInfo="userInfo" :certInfo="certInfo"></tripleCertification>
        
        <!-- 基本资料 -->
        <basicInfo  :headInfo="userInfo"></basicInfo>

        <!-- 自我介绍 -->
        <describe title="自我介绍" :content="userInfo.about_me" :type="1"></describe>
        <describe title="个人爱好" :content="userInfo.hobbies" :type="2"></describe>
        <describe title="内心独白" :content="userInfo.emotional_view" :type="3"></describe>
        <describe title="微信号" :content="userInfo.wxid" :type="4"></describe>
        
      
        <div class="model" v-show="isShowModel==1">
          <div class="model-content">
            <div class="top">
                <div class="top-title">
                    <div class="title">上传形象照</div>
                    <div class="desc">请勿上传以下几类照片</div>
                </div>
                <img @click="close" class="delete" src="/static/images/new/delete2.png" alt="">
            </div>
            <div class="image">  
              <img src="/static/images/new/11.png" alt="">
              <img src="/static/images/new/22.png" alt="">
              <img src="/static/images/new/33.png" alt="">
              <img src="/static/images/new/44.png" alt="">
              <img src="/static/images/new/55.png" alt="">
            </div>
            <div class="line"></div>
            <div class="photograph" @click="photograph1">拍照</div>
            <div class="photograph"  @click="photograph2">从手机相册中选择</div>
          </div>
      </div>

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
      userInfo:{},
      certInfo:{},
      images:[
        "/static/images/new/upload-background.png",
        "/static/images/new/upload-background.png",
        "/static/images/new/upload-background.png",
        "/static/images/new/upload-background.png",
        "/static/images/new/upload-background.png",
        "/static/images/new/upload-background.png",
      ],
      photos:[],    //后端返回的图片地址
      introduceOneself:"",
      hobby:"",
      innerMonologue:"",
      weix:"",
      token:null,
      isShowModel:0,   //显示图片模态框
      key:0,
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
  onLoad() {
  
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.get_user_info(token);
    this.get_cert_info(token);

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
    get_cert_info(token){
      let that = this;
      that.postRequest('home/user/get_cert_info',{token}).then(res=>{  
          if(res.code===0){
              that.certInfo = res.data;
          }
        },err=>{
          console.log(err);
          
        })
    },
    uploadImageModel(key){
      this.isShowModel = 1;
      console.log('uploadImageModel',key);
      this.key = key;
    },
    close(){
      this.isShowModel = 0;
    },
    
    photograph1(){    //拍照
      let that = this;
      let token = this.token;
        wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera'],
        success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            that.images[that.key] = tempFilePaths[0];
            that.isShowModel = 0;

            
            let data = {token,tempFilePaths:res.tempFilePaths};
            that.uploadPhoto(data).then(res=>{  
              let result = JSON.parse(res.data);
              console.log(res,result);
              if(result.code === 0){
                that.photos[that.key] = result.data.img;
                that.postRequest('home/user/update_user_info',{token,photos:JSON.stringify(that.photos)}).then(res=>{  
                },err=>{
                  console.log(err);
                  
                })
              }
            },err=>{
              console.log(err);
              
            })
            
            
          }
        })

      },
    photograph2(){       //手机相册拍照
      let that = this;
      let token = this.token;
      wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
            that.images[that.key] = tempFilePaths[0]; 
            that.isShowModel = 0;

            
            let data = {token,tempFilePaths:res.tempFilePaths};
            that.uploadPhoto(data).then(res=>{  
              let result = JSON.parse(res.data);
              console.log(res,result);
              if(result.code === 0){
                that.photos[that.key] = result.data.img;
                that.postRequest('home/user/update_user_info',{token,photos:JSON.stringify(that.photos)}).then(res=>{  
                },err=>{
                  console.log(err);
                  
                })
              }
            },err=>{
              console.log(err);
              
            })
            

          }
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



.model{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
}
.model-content{
    width:750rpx;
    /* height:499rpx; */
    background:rgba(255,255,255,1);
    border-radius:30rpx 30rpx 0rpx 0rpx;
    position: absolute;
    bottom: 0;
}
.top{
    padding: 30rpx 34rpx;
    display: flex;
    align-items: center;

}
.top-title{
    width: 98%;
}
.title{
    font-size:36rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:34rpx;
}
.desc{
    margin-top: 24rpx;
    font-size:26rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:34rpx;
}
.delete{
    width: 24rpx;
    height: 24rpx;
}
.image{
    padding: 30rpx 34rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

}

.image>image{
    width: 130rpx;
    height: 130rpx;
}
.line{
    height:15rpx;
    background:rgba(245,245,245,1);
}
.photograph{
    padding: 34rpx;
    text-align: center;
    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    /* line-height:34rpx; */
    border-bottom: 1px solid #EEEEEE;
}


</style>
