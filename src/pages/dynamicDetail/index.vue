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
          <div class="center-content-top">
            <img class="contnent-top-avatar" src="/static/images/lvy_icon.png" alt />
            <div class="center-content-title">
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
            <div class="comment-q-right">
              <img class="dynamic-icon-report" src="/static/images/new/no-like3.png" alt />
            </div>
          </div>
          <div class="content-comment">
            <div class="contnent-comment-q">
              <img class="contnent-comment-q-avatar" src="/static/images/lvy_icon.png" alt />
              <div class="center-comment-title">
                <div class="center-comment-title">晓欣</div>
                <div class="center-comment-date">我家金毛就是看家的~</div>
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
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import swiper from "@/components/swiper";
import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0
    };
  },

  components: {
    navigationBar,
    swiper
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
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
  margin: 20rpx 20rpx 40rpx 20rpx;
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





.placeholder-class {
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}

.contnent-comment-message {
  width: 750rpx;
  height: 87rpx;
  background: rgba(255, 255, 255, 1);
}

.send-comment-message {
  width: 137rpx;
  height: 65rpx;
  background: rgba(89, 94, 109, 1);
  border-radius: 33rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
