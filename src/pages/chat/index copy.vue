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
          <div class="center-date-day">{{time}}</div>
        </div>
        
        <div v-for ="(item, index) in chatItems" :key="index">{{item}}
          {{item}}
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
        

        </div>

         
        <!-- <div class="contnent-comment-message">
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

      </div> -->
      </div>
    </scroll-view>

     <chat-input
          ref="chatInput"
                  id="chatInput"
                  :min-voice-time="1"
                  :max-voice-time="60"
                  :start-time-down="54"
                  :tabBarHeight="0"
                  :format="mp3"
                  :extra-array="extraArr"
                  @extraClickEvent="onExtraClickEvent"
                  @extraItemClickEvent="onExtraItemClickEvent"
                  @voiceRecordEvent="onVoiceRecordEvent"
                  @sendMessageEvent="onSendMessageEvent"></chat-input>
  </div>

</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";
// import chatInput from "@/components/chat-input/chat-input";
import chatInput from "@/components/chat-box/chat-box";



import IMOperator from "./im-operator";
import UI from "./ui";
import MsgManager from "./msg-manager";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,

      textMessage: '',
      chatItems: [],
      latestPlayVoicePath: '',
      chatStatue: 'open',
      extraArr: [{
          picName: 'choose_picture',
          description: '照片'
      }, {
          picName: 'take_photos',
          description: '拍摄'
      }, {
          picName: 'close_chat',
          description: '自定义功能'
      }],
    };
  },
  mounted(option){
     this.systemHeight = store.state.systemHeight;
     this.contentHeight = store.state.contentHeight;
     
  },
  components: {
    navigationBar,
    chatInput,

  },
  minixs: [IMOperator,UI,MsgManager], // todo.vue 中声明minix 进行混合
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.friend);
        const friend = JSON.parse(options.friend);
        friend.friendHeadUrl=unescape(friend.friendHeadUrl)

        this.pageHeight = wx.getSystemInfoSync().windowHeight,
       
        wx.setNavigationBarTitle({
            title: friend.friendName || ''
        });
        // console.log('------------------------------');
        // console.log(this.appIMDelegate.getIMHandlerDelegate());
        this.imOperator = new IMOperator(this, friend);
        this.UI = new UI(this);
        this.msgManager = new MsgManager(this);

        this.imOperator.onSimulateReceiveMsg((msg) => {
            this.msgManager.showMsg({msg})
        });
        this.UI.updateChatStatus('正在聊天中...');
    },
    onReady() {
        // this.chatInput = this.selectComponent('#chatInput');
        // this.chatInput = this.selectComponent('#chatInput');
        this.chatInput = this.$refs.chatInput
    },
 
    onUnload() {
        this.msgManager.stopAllVoice();
    },
    methods:{
       onSendMessageEvent(e) {
        let content = e.detail.value;
        this.msgManager.sendMsg({type: IMOperator.TextType, content});
        wx.sendSocketMessage({
            data:JSON.stringify({type:'add_friends',userid:'123123',friend:'123122',project_key:'project-6bbf9ac94a7e4595'})
          })
        },
    
        onVoiceRecordEvent(e) {
          const {detail: {recordStatus, duration, tempFilePath, fileSize,}} = e;
          if (recordStatus === 2) {
              this.msgManager.sendMsg({
                  type: IMOperator.VoiceType,
                  content: tempFilePath,
                  duration: Math.floor(duration / 1000)
              });
          }
          this.msgManager.stopAllVoice();
        },
        /**
         * 点击extra中的item时触发
         * @param e
         */
        onExtraItemClickEvent(e) {
            console.warn(e);
            let chooseIndex = parseInt(e.detail.index);
            if (chooseIndex === 2) {
                this.myFun();
                return;
            }
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'],
                sourceType: chooseIndex === 0 ? ['album'] : ['camera'],
                success: (res) => {
                    this.msgManager.sendMsg({type: IMOperator.ImageType, content: res.tempFilePaths[0]})
                }
            });
        },

    /**
     * 点击extra按钮时触发
     * @param e
     */
    onExtraClickEvent(e) {
        console.log(e);
    },
    //模拟上传文件，注意这里的cbOk回调函数传入的参数应该是上传文件成功时返回的文件url，这里因为模拟，我直接用的savedFilePath
    simulateUploadFile({savedFilePath, duration, itemIndex}) {
      return new Promise((resolve, reject) => {
          wx.uploadFile({
              url: 'http://imsocket.wpjxkj.com/uploadImg', //仅为示例，非真实的接口地址
              filePath: savedFilePath,
              name: 'file',
              formData: {
                'user': 'test'
              },
              success (res){
                const data = JSON.parse(res.data)
                if(data.code==0){
                  let urlFromServerWhenUploadSuccess = 'http://imsocket.wpjxkj.com/'+data.data;
                  console.log(urlFromServerWhenUploadSuccess)
                  resolve({url: urlFromServerWhenUploadSuccess});
              }else{

              }
            }
          });
      })
    },
    /**
     * 自定义事件
     */
    myFun() {
      wx.showModal({
          title: '小贴士',
          content: '演示更新会话状态',
          confirmText: '确认',
          showCancel: true,
          success: (res) => {
              if (res.confirm) {
                  this.msgManager.sendMsg({type: IMOperator.CustomType})
              }
          }
      })
    },

    resetInputStatus() {
        this.chatInput.closeExtraView();
    },
    sendMsg({content, itemIndex}) {
        try {
            const {msg} = this.imOperator.onSimulateSendMsg({content})
            this.UI.updateViewWhenSendSuccess(msg, itemIndex);
            return {msg};
        } catch (e) {
            console.error(e);
            this.UI.updateViewWhenSendFailed(itemIndex);
        }
    },
    /**
     * 重发消息
     * @param e
     */
    resendMsgEvent(e) {
        const itemIndex = parseInt(e.currentTarget.dataset.resendIndex);
        const item = this.data.chatItems[itemIndex];
        this.UI.updateDataWhenStartSending(item, false, false);
        this.msgManager.resend({...item, itemIndex});
    },
  }
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

  background:linear-gradient(0deg,rgba(219,128,100,1),rgba(253,59,109,1));
box-shadow:0px 6px 18px 0px rgba(0, 0, 0, 0.15);

  border-radius: 33rpx;

  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
