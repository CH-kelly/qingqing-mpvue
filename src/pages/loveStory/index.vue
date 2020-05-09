<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">发布</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        
        <!-- 恋爱故事列表 -->
          <loveTrendsLists :dynamicList="dynamicList"></loveTrendsLists>

      </div>

    </scroll-view>
    
    <release :type="2"></release>
    
    </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";


import loveTrendsLists from "@/pages/dynamic/child/loveTrendsLists";  //动态列表
import release from "@/pages/dynamic/child/send"; //发布按钮

// import loveTrendsLists from "./child/loveTrendsLists";  //动态列表
// import release from "./child/send"; //发布按钮
export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      secondPageHeight: 0,
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
    };
  },

  components: {
    navigationBar,loveTrendsLists,release
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {
    
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
  background: #ffffff;
  overflow: hidden;
  /* padding: 34rpx 30rpx; */
}


</style>
