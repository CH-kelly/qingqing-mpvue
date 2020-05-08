<template>
  <div>
    <navigation-bar  >
      <div slot="left">
        动态
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">
          <loveTrends :head="head"></loveTrends>
          <loveTrendsLists :dynamicList="dynamicList"></loveTrendsLists>
    </div>
 </scroll-view>

    <release></release>

<!-- 底部按钮 -->
    <bottomNavBar></bottomNavBar>


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import loveTrends from "./child/loveTrends";  //动态头部
import loveTrendsLists from "./child/loveTrendsLists";  //动态列表
import release from "./child/send"; //发布按钮
export default {
  data () {
    return {

      systemHeight:0,
      contentHeight:0,
      head:{
        nickname:'晓欣',avatar:'/static/images/demo_2@2x.png',number:2
      },
      dynamicList:[
        {
          nickname:'晓欣',
          avatar:'/static/images/demo_2@2x.png',
          create:"2020.4.28 17:54",
          content:'有养金毛犬是为了看家的吗？',
          image:[
            "/static/images/demo_4@2x.png",
            "/static/images/demo_4@2x.png",
            "/static/images/demo_4@2x.png",
          ]
        },{
          nickname:'晓欣',
          avatar:'/static/images/demo_2@2x.png',
          create:"2020.4.28 17:54",
          content:'有养金毛犬是为了看家的吗？',
          image:[
            "/static/images/demo_4@2x.png",
            "/static/images/demo_4@2x.png",
            "/static/images/demo_4@2x.png",
          ]
        }
      ]
    }
  },

  components: {
    navigationBar,bottomNavBar,loveTrends,loveTrendsLists,release
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
  /* margin: 20rpx 20rpx 40rpx 20rpx; */
  
  background:rgba(242,242,242,1);
  /* background:skyblue; */
  overflow: hidden;

}


</style>
