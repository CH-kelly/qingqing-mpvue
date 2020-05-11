<template>
  <div>
    <navigation-bar>
      <div slot="center">详情</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        <swiper :images="images" />

        <div class="center-content">
          <div style="padding:30rpx">
            <div class="center-content-top">
            <img class="contnent-top-avatar" src="/static/images/demo_2@2x.png" alt />
            <div class="center-content-title1">
              <div class="center-content-title">晓欣</div>
              <div class="center-content-date">2020.4.28 17:54</div>
            </div>
          </div>
          <div class="content">有养金毛犬是为了看家的吗？</div>
          <div class="comment-q">
            <div class="comment-q-left">
              <div class="comment-like">
                <img class="dynamic-icon" src="/static/images/new/no-like1.png" alt />
                <div class="center-heart">1</div>
              </div>
              <div class="comment-like">
                <img class="dynamic-icon" src="/static/images/new/no-like2.png" alt />
                <div class="center-heart">1</div>
              </div>
            </div>
            <div class="comment-q-right" @click="report">
              <img class="dynamic-icon-report" src="/static/images/new/no-like3.png" alt />
            </div>
          </div>
          </div>
          <div class="content-comment">
            <div class="contnent-comment-q">
              <img class="contnent-comment-q-avatar" src="/static/images/lvy_icon.png" alt />
              <div class="center-comment-title">
                <div class="center-content-title">晓欣</div>
                <div class="center-comment-content">我家金毛就是看家的~</div>
              </div>
              <div class="comment-right">14分钟前</div>
            </div>
          </div>
        </div>
        <div class="contnent-comment-message">
          <div class="comment-message">
            <input
              class="weui-input"
              auto-focus
              placeholder="走心评论，说点好听的~"
              placeholder-class="placeholder-class"
            />
          </div>
          <div class="send-comment-message">发送</div>
        </div>
      </div>
    </scroll-view>


    <report v-if="isReport===1" @cancel="cancelReport"></report>

  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import swiper from "@/components/swiper";
import report from "@/components/report";


import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
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
      isReport:0,
    };
  },

  components: {
    navigationBar,
    swiper,
    report
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {
    report(){
      // 举报
      console.log('report举报');
      this.isReport = 1;
    },
    cancelReport(){
      this.isReport = 0;
    }
  },

  created() {
    // let app = getApp()
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
  /* margin: 20rpx 20rpx 40rpx 20rpx; */
  overflow: hidden;
}

.comment-q {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
}
.comment-q-left {
  width: 90%;
  display: flex;
  align-items: center;
}
.contnent-comment-q{
  
  padding: 30rpx;
  display: flex;
  align-items: center;
  
  background: #F6F6F6;
}
.contnent-comment-q-avatar{
  width:82rpx;
height:82rpx;
border-radius: 50%;
margin-right: 10rpx;
}
.comment-like {
  width: 87rpx;
  height: 43rpx;
  border: 1rpx solid rgba(212, 212, 212, 1);
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}
.dynamic-icon {
  width: 28rpx;
  height: 23rpx;
  margin-right: 8rpx;
}
.dynamic-icon-report {
  width: 38rpx;
  height: 8rpx;
}
.center-heart {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.center-comment-content{
  
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
}
.comment-right{
  
font-size:22rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
}




.placeholder-class {
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.contnent-comment-message {
  width: 100%;
  height: 87rpx;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  border-top: 1px solid #f2f2f2;


}
.comment-message{
  width: 80%;
}

.send-comment-message {
  width: 20%;
  /* width: 137rpx; */
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  background: rgba(89, 94, 109, 1);
  border-radius: 33rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.weui-input{
  padding-left: 36rpx;
}

.center-content-top{
  
  display: flex;
  align-items: center;

}
.contnent-top-avatar{
  width:90rpx;
height:90rpx;
border-radius: 50%;
margin-right: 20rpx;
}
.center-content-title{
  
font-size:30rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(111,121,181,1);
}
.center-content-date{
  
font-size:22rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(102,102,102,1);
}
.content{
  
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
line-height:56rpx;
}

.center-comment-title{
  width: 70%;
}









</style>
