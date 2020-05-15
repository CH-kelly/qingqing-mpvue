<template>
  <div>
    <navigation-bar shadow="true">
      <!-- <div slot="left"> -->
        <!-- <div class="navigation-left-back">
          <img src="/static/images/new/delete.png" alt="">
          <div>删除</div>
        </div> -->
        <!-- 123
      </div> -->
      <div slot="left">
        <div class="navigation-left">
          <img class="left-img" src="/static/images/new/delete.png" alt="">
          <div>删除</div>
        </div>
      </div>
      <div slot="center"> 
        <img class="navigation-center-image" src="/static/images/greet/lvy_title.png" alt="">
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">

      <chat-list :messageLists="messageLists"></chat-list>

    </div>
 </scroll-view>

    <!-- <bottomNavBar></bottomNavBar> -->


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import swiper from "@/components/swiper";
// import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import chatList from "./child/chatList"

export default {
  data () {
    return {

      systemHeight:0,
      contentHeight:0,
      messageLists:[
            {
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            }
        ],
    }
  },

  components: {
    navigationBar,
    // bottomNavBar,
    chatList
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;
     
  },
  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>

.navigation-left-back{
  

}
.navigation-left{
  text-align: center;
  font-size: 20rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  
  /* padding-left: 26rpx;   */

}
.left-img{
  width: 32rpx;
  height: 32rpx;

}
.navigation-center-image{
  width: 45%;
  height: 50%;
}


.index-center{
  padding-bottom:40rpx;
  background: #ffffff;
  /* background:skyblue; */
  overflow: hidden;

}


</style>
