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
        中意人
      </div>
      <div slot="center"> 
        <img class="navigation-center-image" src="/static/images/greet/lvy_title.png" alt="">
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">

      <chat-list messageLists="messageLists"></chat-list>

    </div>
 </scroll-view>

    <bottomNavBar></bottomNavBar>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import swiper from "@/components/swiper";
import bottomNavBar from "@/components/bottomNavBar"
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
                avatar:"/static/image/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/image/lvy_icon.png",
            }
        ],
    }
  },

  components: {
    navigationBar,bottomNavBar,chatList
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
.navigation-center-image{
  width: 45%;
  height: 50%;
}


.index-center{
  padding: 0 20rpx 40rpx 20rpx;
  background: #ffffff;
  /* background:skyblue; */
  overflow: hidden;

}


</style>
