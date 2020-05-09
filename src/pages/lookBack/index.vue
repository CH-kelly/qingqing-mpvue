<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">回看</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center">
        
        <div class="index-center-title">
          <div class="top-left">
            <div class="top-rounded"></div>
            <div class="top-title">昨天</div>
          </div>
          <div class="top-right">
            <span class="top-right-title">推荐 5</span>
            <span class="top-right-title top-right-line">|</span>
            <span class="top-right-title">喜欢 3</span>
            <span class="top-right-title top-right-line">|</span>
            <span class="top-right-title">无感 2</span>
          </div>
        </div>

        <div class="index-center-content">
          <heart-item :heartList="heartList"></heart-item>
        </div>

      </div>
    </scroll-view>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

import heartItem from "./child/heartItem";
export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      secondPageHeight: 0,
      heartList: [
        {
          avatar: "/static/images/demo_2@2x.png",
          nickname: "李毅",
          like:0,
          education: "电子科技大学"
        },
        {
          avatar: "/static/images/demo_3@2x.png",
          nickname: "李毅",
          like:1,
          education: "电子科技大学"
        },
        {
          avatar: "/static/images/demo_5@2x.png",
          nickname: "李毅",
          like:0,
          education: "电子科技大学"
        }
      ]
    };
  },

  components: {
    navigationBar,
    heartItem
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
  },
  methods: {},

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
  padding: 30rpx;
  background: #ffffff;
  overflow: hidden;
  padding-bottom: 40rpx;
}

.index-center-title {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}
.top-rounded {
  width: 10rpx;
  height: 30rpx;
  background: rgba(130, 222, 199, 1);
  border-radius: 5px;
  margin-right: 20rpx;
}
.top-title {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 38rpx;
}

.top-right-title {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.index-center-title{

}
.top-left{
  width: 60%;
  display: flex;
  align-items: center;
}
.top-right{
  
  display: flex;
  align-items: center;
}
.top-right-line{
  margin: 0 10rpx;
}








</style>
