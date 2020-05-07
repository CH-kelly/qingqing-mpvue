<template>
  <div>
    <navigation-bar >
      <div slot="left">
        中意人
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
            内容
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
