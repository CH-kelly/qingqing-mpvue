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


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
// import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import heartItem from "./child/heartItem"

export default {
  data () {
    return {

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
      ]
    }
  },

  components: {
    navigationBar,
    // bottomNavBar,
    heartItem
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
