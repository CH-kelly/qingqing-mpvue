<template>
  <div class="news_center">
    <div v-for="(item,index) in messageLists" :key="index" @click="toChat(index)">
      <div class="news_lists">
        <div class="news_msg_left">
          <img :src="item.friendHeadUrl" class="news_avatar" alt />
        </div>
        <div class="news_msg_content">
          <div class="msg_personnel">
            <div class="nickname">{{item.friendName}}</div>
            <div class="msg_content"  v-if="item.type==='text'">{{item.content}}</div>
            <div class="msg_content"  v-if="item.type==='image'">[图片]</div>
            <div class="msg_content"  v-if="item.type==='voice'">[语音]</div>
          </div>
          <div class="msg_send_time">{{item.timeStr}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messageLists: { type: Array, default: [] }
  },
  methods: {
    // gotoDetail() {
    //   //"pages/messageDetail/main",
    //   wx.navigateTo({
    //     url: "/pages/message/pages/messageDetail/main"
    //   });
    // },
    toChat(e) {
      console.log(e);
        // let item = e.currentTarget.dataset.item;
        let item = this.messageLists[e]
        delete item.latestMsg;
        delete item.unread;
        delete item.content;
        item.friendHeadUrl=escape(item.friendHeadUrl)
        console.log(item.friendHeadUrl,JSON.stringify(item))
        wx.navigateTo({
            url: `/pages/chat/main?friend=${JSON.stringify(item)}`
        });
    },
  }
};
</script>

<style scoped>
.news_center {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.news_lists {
  height: 140rpx;
  display: flex;
  align-items: center;

  font-size: 22rpx;
  color: #999999;
}
.news_msg_left {
  width: 15%;
  padding-left: 32rpx;
}
.news_avatar {
  width: 90rpx;
  height: 90rpx;
}
.news_msg_content {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;

  padding-right: 32rpx;
}
.msg_personnel {
  width: 80%;
}
.msg_personnel .nickname {
  font-size: 32rpx;
  color: #101010;
  font-weight: bold;
  padding-bottom: 5px;
}
</style>
