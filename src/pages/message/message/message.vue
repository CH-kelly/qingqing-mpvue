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
        <div class="navigation-left">
          <img class="left-img" src="/static/images/new/delete.png" alt="">
          <div>删除</div>
        </div>
      </div>
      <div slot="center"> 
        <img class="navigation-center-image" src="/static/images/greet/lvy_title.png" alt="">
      </div>
    </navigation-bar>
<scroll-view scroll-y enable-back-to-top :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      
    <div class="index-center">

      <chat-list :messageLists="conversations"></chat-list>

    </div>
 </scroll-view>

    <!-- <bottomNavBar></bottomNavBar> -->


  </div>

</template>

<script>
import navigationBar from '@/components/navbar/navbar'
import swiper from "@/components/swiper";
// import bottomNavBar from "@/components/bottomNavBar"
import store from '@/store'

import chatList from "./child/chatList"

// import App from "../../../App.vue";

// import AppIMDelegate from "../../../delegate/app-im-delegate";

export default {
  data () {
    return {

      systemHeight:0,
      contentHeight:0,
      messageLists:
      [
            {
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            },{
                nickname:'小星',
                content:'青青校园上线啦',
                avatar:"/static/images/lvy_icon.png",
                timer:'下午3:50'
            }
      ],
      
      conversations: [],
      // appIMDelegate:'',
    }
  },

  components: {
    navigationBar,
    // bottomNavBar,
    chatList
  },
  mounted(option){
    //  this.systemHeight = wx.getStorageSync('systemHeight');
     console.log('systemHeight',store.state.systemHeight);
     this.systemHeight = store.state.systemHeight;
      this.contentHeight = store.state.contentHeight;



      // 连接文本
     
  },

  methods: {
    getConversationsItem(item) {
    
      let {latestMsg, ...msg} = item;
      console.log(item,latestMsg,msg);
      return Object.assign(msg, JSON.parse(latestMsg));
    }

  },
  created () {
    console.log('created')
    let app = getApp()
    console.log(app);
  },
  onShow() {
      var that = this;
      this.appIMDelegate.getIMHandlerDelegate().setOnReceiveMessageListener({
          listener: (msg) => {
              console.log('会话列表', msg);
              msg.type === 'get-conversations' && (that.conversations = msg.conversations.map(item => that.getConversationsItem(item)))
          }
      });
      try {
          this.appIMDelegate.getIMHandlerDelegate().sendMsg({
              content: {
                  type: 'get-conversations',
                  userId: getApp().globalData.userInfo.userId
              }
          });
          console.log('获取会话列表消息发送成功');
      } catch (e) {
          console.log('获取会话列表失败', e);
      }


  },

}
</script>

<style scoped>

.navigation-left-back{
  

}
.navigation-left{
  text-align: center;
  font-size: 20rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  
  /* padding-left: 26rpx;   */

}
.left-img{
  width: 32rpx;
  height: 32rpx;

}
.navigation-center-image{
  width: 45%;
  height: 50%;
}


.index-center{
  padding-bottom:40rpx;
  background: #ffffff;
  /* background:skyblue; */
  overflow: hidden;

}


</style>
