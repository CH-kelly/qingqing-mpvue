<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">
        会员中心
      </div>
    </navigation-bar>
     
    <div class="index-center" :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">

        <div class="index-center-background">
            <img class="index-center-image" src="/static/images/new/background.png" alt="">
            <div class="index-center-content">
                <div class="center-title">兑换码</div>
                <div class="content-input">
                    <input class="center-content-input" type="text" 
                    @input="convertMenber"
                    placeholder="请输入兑换码"  
                    placeholder-style='color:rgba(170,170,170,1);font-size:26rpx'>
                </div>
                <div class="content-input">
                    <div class="center-button" @click="gotoExchange">立即兑换</div>
                </div>
            </div>
        </div>
      
    </div>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import store from '@/store'


export default {
  data () {
    return {
      systemHeight:0,
      contentHeight:0,
      convert_menber:'',
    }
  },

  components: {
    navigationBar
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
    convertMenber(e){
      this.convert_menber = e.mp.detail.value;
    },
    gotoExchange(){ //立即兑换
      var that = this;
      if(!that.convert_menber){
          wx.showToast({title:"请输入兑换码",icon:'none'})
      };
      
      let token = wx.getStorageSync('token') || '';
      if(!token){
          wx.showToast({title:"请登录",icon:'none'})
      };
      let convert_menber = that.convert_menber;
        that.postRequest('home/user/convert_menber',{token,convert_menber}).then(res=>{
            console.log(res);
          if(res.code===0){   //
            wx.showToast({title:"兑换成功",icon:'none'})
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 3000);
          }else{
            wx.showToast({title:res.message,icon:'none'})
          }
      },err=>{
      console.log(err);
      
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
  padding: 30rpx;
  background: #ffffff;
  overflow: hidden;

}
.index-center-background{
    width: 100%;
    height: 343rpx;
    position: relative;
}
.index-center-image{
    width: 100%;
    height: 343rpx;
    vertical-align: middle;
}
.index-center-content{
    padding: 34rpx 0;
    width: 100%;
    height: 343rpx;
    position: absolute;
    top: 0;
}
.content-input{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
}
.center-content-input{
    width: 70%;
    height: 80rpx;
    border-radius:40rpx;
    background: #ffffff;
    padding-left: 40rpx;color:#333;font-size:30rpx
}
.center-title{
    text-align: center;
    font-size:40rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
}

.center-button{
    width: 70%;
    height:80rpx;
    text-align: center;
    line-height: 80rpx;
    background:linear-gradient(0deg,rgba(242,204,146,1),rgba(229,178,101,1));
    box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);
    border-radius:40px;

    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);

    margin-top: 10rpx;

}

</style>
