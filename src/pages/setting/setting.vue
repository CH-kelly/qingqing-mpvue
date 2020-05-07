<template>
  <div>
    <navigation-bar>

      <div slot="left">
        设置
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
   
    
    </div>
 </scroll-view>

    <bottomNavBar></bottomNavBar>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

export default {
  data () {
    return {
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
      systemHeight:0,
      contentHeight:0
    }
  },

  components: {
    navigationBar,bottomNavBar
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
  padding: 0 20rpx 40rpx 20rpx;
  background: #F4F5F9;
  /* background:skyblue; */
  overflow: hidden;

}


</style>
