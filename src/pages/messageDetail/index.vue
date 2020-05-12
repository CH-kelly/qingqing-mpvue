<template>
  <div>
    <navigation-bar shadow="true">
      <div slot="center">李益</div>
    </navigation-bar>
    <scroll-view
      scroll-y
      enable-back-to-top
      :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}"
    >
      <div class="index-center" :style="{height:contentHeight+'px'}">
        <div class="center-date">
          <div class="center-date-day">05/12 15:56</div>
        </div>
        <div class="center-chat">
          <div class="chat-left">
            <img class="chat-left-icon" src="/static/images/lvy_icon.png" alt />
            <div class="chat-right-content">青青校园上线啦~</div>
          </div>
          <div class="chat-left chat-right" >
            <img class="chat-left-icon chat-right-icon" src="/static/images/lvy_icon.png" alt />
            <div class="chat-right-content">嗯嗯~</div>
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
      contentHeight: 0,
      chat: [
        {
          avatar: "/static/images/lvy_icon.png",
          content: "青青校园上线啦~",
          type: 1
        },
        {
          avatar: "/static/images/lvy_icon.png",
          content: "嗯嗯~",
          type: 2
        }
      ]
    };
  },

  components: {
    navigationBar
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');
    console.log("systemHeight", store.state.systemHeight);
    this.systemHeight = store.state.systemHeight;
    this.contentHeight = store.state.contentHeight;
  },
  methods: {}
};
</script>

<style scoped>
.navigation-left {
  text-align: center;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);

  /* padding-left: 26rpx;   */
}
.left-img {
  width: 32rpx;
  height: 32rpx;
}
.navigation-center-image {
  width: 45%;
  height: 50%;
}

.index-center {
  padding: 30rpx;
  background: #f6f6f6;
  overflow: hidden;
}

/* 时间日期 */
.center-date {
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-date-day {
  width: 170rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  background: rgba(0, 0, 0, 1);
  opacity: 0.2;
  border-radius: 18rpx;

  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

/* 聊天内容样式 */
.chat-left{
    display: flex;
    align-items: center;
    margin-top: 36rpx;
    /* background: orange; */
}

.chat-left-icon {
  width: 75rpx;
  height: 75rpx;
  margin-right: 8rpx;
}
.chat-right{
    flex-direction: row-reverse;
    /* justify-content:flex-end */
}
.chat-right-icon{

  margin-left: 8rpx;
  margin-right: 0;
}
.chat-right-content {
    padding: 20rpx 30rpx;
    background: #ffffff;
    border-radius: 20rpx;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}



/* 聊天发送 */
.contnent-comment-message {
  width: 100%;
  height: 87rpx;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  border-top: 1px solid #f2f2f2;
}
.comment-message {
  width: 76%;
}

.send-comment-message {
  width: 20%;
  /* width: 137rpx; */
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  background: rgba(89, 94, 109, 1);
  border-radius: 33rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.weui-input {
  padding-left: 36rpx;
}

.placeholder-class {
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(187, 187, 187, 1);
}
.send-comment-message {
  width: 20%;
  /* width: 137rpx; */
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  background: rgba(89, 94, 109, 1);
  border-radius: 33rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
