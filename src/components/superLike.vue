<template>
  <div class="super-like">
    <div class="super-center">
      <div class="top">
        <div class="top-title">超级喜欢</div>
        <div class="top-close" style="" @click="close">X</div>
      </div>
      <img class="top-avatar" src="/static/images/greet/lvy_title.png" alt />
      <div class="super-flex">
            <div class="top-desc">通知对方已喜欢，并在首页置顶配对提高5倍！</div>
      </div>
      <div class="super-flex">
            <div class="to-whom super-flex">
                想对
                <span class="to-whom-name">{{currentUser.nickname}}</span>说
            </div>
      </div>
      <div class="super-flex">
        <div class="to-textarea">
            <textarea
            @blur="bindTextAreaBlur"
            class="index-center-textarea"
            placeholder="用一句话打动她吧~"
            placeholder-class="placeholder-class"
            maxlength=30
            cursor=10
            @input="textareaInput"
            />
            <div class="to-textarea-desc">{{num}}/30</div>
        </div>
      </div>
      <div class="super-flex">
        <div class="to-button" v-if="super_like_num<0" @click="gotoBuy">购买超级喜欢</div>
        <div class="to-button" v-if="super_like_num>0" @click="sendMsgToSuperLike">发送消息</div>
      </div>
      <div class="to-button-desc">你还剩余{{super_like_num}}个超级喜欢</div>
    </div>
  </div>
</template>
<script>

import store from '@/store'

export default {
  props:{
    super_like_num:{type:Number,default:0},
    currentUser:{type:Object,default:{}}
  },
  data() {
    return {
      num:0,
      content:'',
    };
  },
  methods: {
      close(){
          this.$emit('close');
      },
      gotoBuy(){
        wx.navigateTo({
          url: 'pages/setting/pages/member/main',
        })
      },
      //发送消息并添加好友
      sendMsgToSuperLike(){
        
        let that = this;
        let userInfo =  wx.getStorageSync('userInfo') || store.state.userInfo;
        let token = wx.getStorageSync('token') || store.state.token ;
        if(userInfo && token){
            let user = JSON.parse(userInfo);
            let openid = user.openid;
            let friend =  that.currentUser.openid || 123123; 
            // let friend =  123123; 
            let target_uid =  that.currentUser.uid; 
            let content = that.content;
            if(!content){
              wx.showToast({
                  title: '内容不能为空',
                  icon: 'none',
                  duration: 2000
                })
                return 
            }

          that.postRequest("/home/like/dec_super_like_num",{token,target_uid:target_uid}).then(res=>{
                  
              if(res.code===0){
                  // 发送添加好友
                  that.appIMDelegate.getIMHandlerDelegate()._add_friends(friend,openid,content);
                  wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(() => {
                      that.$emit('close');
                  }, 2000);
              }
          },err=>{
            
            console.log(err);
            
          })

        }
      },
      textareaInput(e){
        this.content = e.mp.detail.value;
        this.num = this.num+1;
      }
  }
};
</script>

<style scoped>
.super-like {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;
}

.super-center {
    padding: 34rpx;
  width: 628rpx;
  height: 817rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 20rpx;
  text-align: center;
}
.top{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.top-close{
    color:#666666;
    position: absolute;
    right:0;
}
.top-avatar {
    margin-top: 28rpx;
  width: 134rpx;
  height: 134rpx;
  background: rgba(248, 107, 62, 1);
  border: 2rpx solid rgba(233, 47, 95, 1);
  border-radius: 50%;
}
.top-desc {
    margin-top: 20rpx;
  width: 334rpx;
  height: 61rpx;
  text-align: center;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  line-height: 38rpx;
}

.top-title {
  height: 34rpx;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.to-whom {
  margin-top: 48rpx;
  height: 31rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}
.to-whom-name {
  color: #ef1616;
  margin-left: 10rpx;
  margin-right: 10rpx;
}

.to-textarea {
    margin-top: 20rpx;
  width: 560rpx;
  height: 209rpx;
  background: rgba(239, 239, 239, 1);
  border-radius: 20rpx;
  position: relative;
}

.index-center-textarea {
  padding: 20rpx;
  width: 100%;
  height: 200rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333;
  text-align: left;
}

.placeholder-class {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 38rpx;
}

.to-button {
    margin-top: 34rpx;
  width: 558rpx;
  height: 80rpx;
  
background:linear-gradient(180deg,rgba(219,128,100,1),rgba(253,59,109,1));

  border-radius: 40rpx;

  text-align: center;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 80rpx;
}
.to-textarea-desc{
  position: absolute;
  right: 10rpx;
bottom: 10rpx;




font-size:20rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:38rpx;
}
.to-button-desc {
    margin-top: 20rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}




.super-flex{
    display: flex;
    align-items: center;
    justify-content: center;
}











</style>