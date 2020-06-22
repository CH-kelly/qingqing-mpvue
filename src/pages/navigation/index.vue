<template>
  <div>
    <navigation-bar background="#F4F5F9">
      <div slot="left"></div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
 
    <div class="index-center" >
        <swiper :images="banner"></swiper>
        <div class="index-top">
          <img src="/static/images/title.png" alt="">
          <div class="index-title index-service">用心服务</div>
        </div>

          <div class="index-title title1">专业的知识讲解</div>
          <div class="index-content">2002年底，华为又取得了3797公里的超长距离国家光传输干线的订单。到2003年，华为在独联体国家的销售额超过3亿美元，位居独联体市场国际大型设备供应商的前列。</div>

        <div class="index-title title1">专业的知识讲解</div>
        <div class="index-content">2002年底，华为又取得了3797公里的超长距离国家光传输干线的订单。到2003年，华为在独联体国家的销售额超过3亿美元，位居独联体市场国际大型设备供应商的前列。</div>

        <div class="index-title title1">专业的知识讲解</div>
        <div class="index-content">2002年底，华为又取得了3797公里的超长距离国家光传输干线的订单。到2003年，华为在独联体国家的销售额超过3亿美元，位居独联体市场国际大型设备供应商的前列。</div>

    </div>

 </scroll-view>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import swiper from "@/components/swiper"
import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      showModel: 0,
      code:"",
      isReadDialog: 0,
      banner:[
        "https://qqxy.shengbokj.com/uploads/a.jpg",
        "https://qqxy.shengbokj.com/uploads/b.jpg",
        "https://qqxy.shengbokj.com/uploads/c.jpg",
      ],
    };
  },

  components: {
    navigationBar,swiper
  },
  onLoad(options) {
    console.log('onLoad options',options)
    let banner = options.banner || ''
    if(banner){
        this.banner = JSON.parse(banner);
    }
  },
  onShow(options){
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
    
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
  background: rgba(41, 85, 158, 1);
  overflow: hidden;
  padding: 30rpx;
}

.index-top{
  margin: 80rpx 0 20rpx 0;
  /* width: 100vh; */
  height: 100rpx;
  position: relative;
}
.index-top>image{
  width: 420rpx;
  height: 100%;
}
.index-service{
  position: absolute;
  top: 27%;
  padding-left: 50rpx;
}




.index-title{
  font-size:32rpx;
  font-family:PingFang SC;
  font-weight:bold;
  color: #ffffff;
}
.index-content{
  font-size:24rpx;
  font-family:PingFang SC;
  color: #ffffff;
  line-height: 40rpx;
}
.title1{
  padding: 20rpx 0 ;
}


</style>
