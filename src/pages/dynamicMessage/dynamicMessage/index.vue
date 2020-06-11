<template>
  <div>
    <navigation-bar  shadow="true">
      <div slot="center">
        动态消息
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
        <div class="index-center-dynamic-lists">
            <div class="dynamic-item" v-for="(item,i) in dynamicList" :key="i">
                
                <div class="dynamic-item-one">
                    <img class="head-avatar" :src="item.avatar_url" alt="">
                </div>
                <div class="dynamic-item-content">
                    <div class="dynamic-item-top">{{item.nickname}}</div>
                    <div class="dynamic-item-center" v-if="item.type==1">
                        <img class="dynamic-icon" src="/static/images/new/heart2.png" alt="">
                        <div class="center-heart">赞了你</div>
                    </div>
                    <div class="dynamic-item-center" v-if="item.type==2">
                        <img  class="dynamic-icon" src="/static/images/new/comment.png" alt="">
                        <div class="center-heart">{{item.content}}</div>
                    </div>
                    <div class="dynamic-item-timer">{{item.add_time}}</div>
                </div>
                <div class="dynamic-item-bottom">
                    <img class="head-image"  :src="item.photos" alt="">
                </div>
            </div>
        </div>

    </div>
 </scroll-view>



  
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
      dynamicList:[],
      token:'',
    }
  },
 onShow() {
    let token = store.state.token || wx.getStorageSync('token');
    this.token = token;
    this.news_feed(token);

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
    news_feed(token){
      let that = this;
      that.postRequest('home/moment/news_feed',{token}).then(res=>{  
          if(res.code===0){
            that.dynamicList = res.data.list;
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
  margin: 20rpx 20rpx 40rpx 20rpx;
  
  /* background:rgba(242,242,242,1); */
  /* background:skyblue; */
  overflow: hidden;

}
.head-avatar{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    display: block;
    margin-right: 40rpx;
}




.dynamic-item{
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid #EEEEEE;
    padding-bottom: 20rpx;

}
.dynamic-item-one{
    width: 20%;
}
.dynamic-item-content{
    width: 60%;
}
.dynamic-item-bottom{
    width: 20%;
}
.dynamic-item-top{
    
font-size:32rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(111,121,181,1);
}
.dynamic-item-center{
    
    display: flex;
    align-items: center;
}
.dynamic-icon{
    width: 28rpx;
    height: 24rpx;
    margin-right: 10rpx;
}
.head-image{
    width:100rpx;
height:100rpx;
border-radius: 10rpx;
}
.center-heart{
    
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);

}
.dynamic-item-timer{
    
font-size:20rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
}

</style>
