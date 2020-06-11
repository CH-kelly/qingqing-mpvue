<template>
  <div>

    <navigation-bar shadow="true">
      <div slot="center">
        <div style="justify-content: flex-start;padding-left: 36rpx;">
          {{friend.friendName}}
        </div>
      </div>
    </navigation-bar>

    <scroll-view
        class="scroll-view"
            :style="{height:contentHeight+'px',marginTop:systemHeight+'px'}"
            scroll-y="true"
            :scroll-top="scrollTopVal"
            @click="resetInputStatus">
        <block v-for="(item,index) in chatItems" :key="index">
          <view style="width: 100%;display: flex;flex-direction: column;align-items: center">
              <block v-if="item.type!=='custom'">
                 
                  <text v-if="item.showTime" class="chat-list-time-style">{{item.time}}</text>

                  <view style="width: 100%;display: flex;margin-top: 20rpx;" 
                        :style="{'flex-direction':item.isMy?'row-reverse':'row','margin-bottom':index===chatItems.length-1?150:20 + 'rpx'}">
                    <image style="width: 70rpx;height: 70rpx;border-radius: 50%;margin-left: 15rpx;margin-right: 15rpx;"  :src="item.headUrl"/>
                    <image v-if="item.type==='text'||item.type==='voice'" class="chat-list-arrow-style" 
                     :src="item.isMy?'./../../image/chat/popu_blue.png':'./../../image/chat/popu_white.png'"/>

                    <block v-if="item.type==='text'">
                        <view v-if="item.type==='text'" :class="item.isMy?'isMyWordStyle':'isOtherWordStyle'"
                              style="border-radius: 10rpx;padding: 20rpx;font-size: 30rpx;max-width: 60%;"
                              @click="chatTextItemClickEvent"
                              :data-index="index">{{item.content}}</view>
                    </block>

                    <block v-if="item.type==='image'">
                        <image v-if="item.type==='image'" class="chat-list-pic-style" :src="item.content"
                              mode="aspectFill" @click="imageClickEvent" :data-url="item.content"/>
                    </block>

                    <block v-if="item.type==='voice'">
                        <view style="border-radius: 10rpx;padding: 20rpx;font-size: 30rpx;max-width: 60%;display: flex"  :style="{'width':(item.voiceDuration-1)*0.6+10+'%','justify-content':item.isMy?'flex-end':'flex-start'}"
                              :class="item.isMy?'isMyWordStyle':'isOtherWordStyle'"
                              @click="chatVoiceItemClickEvent"
                              :data-voice-path="item.content"
                              :data-voice-duration="item.voiceDuration"
                              :data-is-my="item.isMy"
                              :data-index="index">
                            <image v-if="item.isMy" class="voice-play-size"
                                  :src="isPlaying?'data:image/gif;base64,R0lGODlhFgAgAIABAHenywAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVCODkzNTZBQTQxMTExRTdBMUU5RjQwNDFCQUNCRDgwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVCODkzNTZCQTQxMTExRTdBMUU5RjQwNDFCQUNCRDgwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUI4OTM1NjhBNDExMTFFN0ExRTlGNDA0MUJBQ0JEODAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUI4OTM1NjlBNDExMTFFN0ExRTlGNDA0MUJBQ0JEODAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFIQABACwAAAAAFgAgAAACJYyPqcvtD6OctNqLs94IAOx9VuhRZDidZUpW6Chy8kzX9o3nUgEAIfkEBSEAAQAsCAAGAAYAFAAAAhaMARaI18tckrTCeVW0O+vnXVjHjEkBACH5BAklAAEALAAAAAAOACAAAAI1jA+nC73c0kNxmihttQHz7nCeGJLZNGqleqKr2z6b+YEx9OK3MrN16vsAYb8ebHcxynKySQEAIfkEBR4AAQAsAAAAABYAIAAAAhmMj6nL7Q+jnLTai7PevPsPhuJIluaJpkEBACH5BAUhAAEALAgABgAGABQAAAIWjAEWiNfLXJK0wnlVtDvr511Yx4xJAQAh+QQFJQABACwAAAAACAAgAAACKIwPh5DLyp6JbUp7Q4TbKZ1RXIV9nTeaGUiypJjGTnti9ArP491qQQEAOw==':'./../../image/chat/voice/voice_mine.png'" />
                            <image  v-if="!item.isMy" class="voice-play-size"
                                  :src="item.isPlaying ?'data:image/gif;base64,R0lGODlhFgAgAIABAJmZmQAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGRjUyRUJDQTQwNjExRTdCOENGRjgwODNFQUZERjc2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGRjUyRUJEQTQwNjExRTdCOENGRjgwODNFQUZERjc2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkZGNTJFQkFBNDA2MTFFN0I4Q0ZGODA4M0VBRkRGNzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkZGNTJFQkJBNDA2MTFFN0I4Q0ZGODA4M0VBRkRGNzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFIQABACwAAAAAFgAgAAACJYyPqcvtD6OctNqLs54A3O5RYCeOpGSe6PiplbvF8kzX9o3nQQEAIfkEBSEAAQAsCAAGAAYAFAAAAhcMEHmXxrpahEg+V7HNU9P9hUs1jVZTAAAh+QQJIQABACwIAAAADgAgAAACN4wfgHvgvNyDRipaJc4X251MnraRY0d9pZiykNmir8vAsxzZOY3o+8prBDm43jA0VMWKQmaPUQAAIfkEBSEAAQAsAAAAABYAIAAAAhmMj6nL7Q+jnLTai7PevPsPhuJIluaJpkEBACH5BAUhAAEALAgABgAGABQAAAIXDBB5l8a6WoRIPlexzVPT/YVLNY1WUwAAIfkEBSEAAQAsDgAAAAgAIAAAAigMggmbuKxeM7LVCPF8x2b3UeEFdppnltv4cWhKii86n6XpYnBoTEEBADs=':'./../../image/chat/voice/voice_other.png'" />
                        </view>
                        <view class="voice-duration-style">{{item.voiceDuration}}"</view>
                    </block>

                    <block v-if="item.isMy">
                         <view class="sendStatusStyle" v-if="item.sendStatus!=='success'">
                            <block v-if="item.sendStatus==='sending'">
                                <image class="chat-loading-common" src="data:image/gif;base64,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"/>
                            </block>
                            <block v-if="item.sendStatus==='failed'">
                                <image src="./../../image/chat/send_fail.png" class="chat-loading-common" @click="resendMsgEvent" :data-resend-index="index" />
                            </block>
                        </view>
                    </block>

                  </view>


              </block>
              <block v-else>
                  <text class="chat-list-time-style">{{item.content}}</text>
              </block>
          </view>
        </block>

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
      friend:{},
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

        this.friend = friend;

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
.scroll-view{
width:100%;
display:flex;
flex-direction:column;
margin-top:54rpx;
}

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










/* 模板的样式 */
.chat-page-status-style{
    width: 100%;
    height: 54rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    color: white;
    position: fixed;
    top:0;
    left:0;
    z-index: 20;
}
.sendStatusStyle{
    height:100%;
    display: flex;
    align-self: center;
}
.chat-list-time-style {
    margin-top: 30rpx;
    background-color: #cccccc;
    color: white;
    padding: 8rpx 10rpx 6rpx 10rpx;
    border-radius: 6rpx;
    width: auto;
    font-size: 22rpx;
    line-height: 22rpx;
    text-align: center;
}
.voice-play-size{
    width:22rpx;
    height:32rpx;
}
.isMyWordStyle {
    background-color: #8fcbf7;
    color: #213d52;
    margin-right: -1rpx;
    margin-left: 14rpx;
    word-wrap: break-word;
}

.isOtherWordStyle {
    background-color: white;
    color: #333333;
    margin-right: 14rpx;
    margin-left: -1rpx;
    word-wrap: break-word;
}

.chat-list-pic-style {
    border-radius: 10rpx;
    margin-left: 5rpx;
    width: 150rpx;
    height: 280rpx;
}

.voice-duration-style {
    color: #666666;
    font-size: 26rpx;
    align-self: center;
    margin-top: 3rpx;
    margin-left: 5rpx;
}

.chat-list-arrow-style {
    width: 11rpx;
    height: 20rpx;
    margin-top: 25rpx
}


</style>
