<template>
    <div>
        <div>

            <view class="input-flex-column" :style="{'bottom':inputBottom+'px'}" >
                <view class="input-text-voice-super">
                    <image 
                        :src="inputStatus==='voice'?'/static/image/chat/voice/keyboard.png':'/static/image/chat/voice/voice.png'"
                        class="extra-btn-style" @click="_change$input$way$event"/>
                    <block v-if="inputStatus==='voice'">
                           <button @longpress="_long$click$voice$btn" @touchmove="_send$voice$move$event"
                                    @touchend="_send$voice$move$end$event" data-id="send$voice$btn" hover-class="btn-voice-press">{{voiceObj.startStatus?'松开 结束':'按住 说话'}}
                            </button>
                            <view v-if="voiceObj.showCancelSendVoicePart"
                                style="display: flex;position: fixed;justify-content:center;align-items: center;border-radius: 20rpx;"
                                :style="{'width':voiceObj.voicePartWidth+'px','height':voiceObj.voicePartWidth+'px','left':voiceObj.voicePartPositionToLeft+'px','bottom':voiceObj.voicePartPositionToBottom+'px'}"
                                >
                                <view 
                                :style="{'opacity':voiceObj.status==='timeDown'?0.6:0}"
                                style="background-color:black;width: 100%;height: 100%;border-radius: 20rpx;position: absolute;"/>
                                <image 
                                :src="voiceObj.status==='start'?(voiceObj.moveToCancel?'/static/image/chat/voice/recall.png':'/static/image/chat/voice/speak.png'):'/static/image/chat/voice/attention.png'"
                                style="width: 100%;height: 100%;border-radius: 20rpx" v-if="voiceObj.status!=='timeDown'"/>
                                <text style="margin-bottom:30rpx;font-size: 150rpx;text-align: center;color: white;position: relative" v-if="voiceObj.status==='timeDown'">{{voiceObj.timeDownNum}}</text>
                                <view class="voice-record-git-status-style" v-if="!voiceObj.moveToCancel&&voiceObj.status!=='short'">
                                    <image src="data:image/gif;base64,R0lGODlhOgAKAKIFAERERIWFhWVlZdbW1qampv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAAFACwAAAAAOgAKAAADazi6XEUwSheqvU7ozR34YMiMgyOdBHWtGed6YUw2Dxqpq9W6GxyDs4XJBsHlAjuewPcDBBVDojGX5DF/z1JNWjjqCspeoQl8Rm1TFji8HJOd5i2660Wuw1dZnFike6svbmRZZyhpGHdKeSEJACH5BAUUAAUALAAAAAA6AAoAAANrCLpcNTBKR6q9LujNnfhgyIyAI50Dda0Z53phTDYPGqmr1bobHIOzhckGweUIO17A9xMEFUOiMZfkMX/PUk1aOOoKyl6hCXxGbVMWOLwck53mLbrrRa7DV1mcWKR7qy9uZFlnKGkYd0p5IQkAIfkEBRQABQAsAAAAADoACgAAA2soulwFMEo3qr2O6M1d+GDIjIIjnQB1rRnnemFMNg8aqavVuhscg7OFyQbB5QY7HsH3CwQVQ6Ixl+Qxf89STVo46grKXqEJfEZtUxY4vByTneYtuutFrsNXWZxYpHurL25kWWcoaRh3SnkhCQAh+QQFFAAFACwAAAAAOgAKAAADaxi6XCUwSgeqvW7ozR35YMiMgSOdAnWtGed6YUw2Dxqpq9W6GxyDs4XJBsHlADvewPcjBBVDojGX5DF/z1JNWjjqCspeoQl8Rm1TFji8HJOd5i2660Wuw1dZnFike6svbmRZZyhpGHdKeSEJACH5BAUUAAUALAAAAAA6AAoAAANrSLpcFTBKJ6q9DujN3fhgyIyEI50Bda0Z53phTDYPGqmr1bobHIOzhckGweUEOx7A9xsEFUOiMZfkMX/PUk1aOOoKyl6hCXxGbVMWOLwck53mLbrrRa7DV1mcWKR7qy9uZFlnKGkYd0p5IQkAOw==" class="voice-record-git-size-style"/>
                                </view>
                                <text class="voice-status-style" :style="{'background-color':(voiceObj.moveToCancel?'#ab1900':'transparent')}">{{voiceObj.status==='start'||voiceObj.status==='timeDown'?(voiceObj.moveToCancel?'松开手指，取消发送':'手指上滑，取消发送'):(voiceObj.status==='short'?'说话时间太短':'说话时间超时')}}</text>
                            </view>
                    </block>
                    
                    <input 
                    id="input"
                    :adjustPosition="false"
                    v-if="inputStatus==='text'"
                        class="chat-input-style" :style="{'margin-left':showVoicePart?0:16+'rpx'}"
                        maxlength="500" confirm-type="send" :value="textMessage" @confirm="_chatInput$send$text$message" @focus="_chatInput$bind$focus$event" @blur="_chatInput$bind$blur$event" @input="_chatInput$getValue$event"/>
                    <view hover-class="press-style-opacity">
                        <div v-if="inputType=='text'" class="chat-input-send-button-style" @click="_chatInput$send$text$message02">发送</div>
                        <image v-else  class="extra-btn-style"   src="/static/image/chat/extra.png" @click="_chatInput$extra$click$event" />
                    </view>


                </view>
                <block v-if="extraObj.chatInputShowExtra">
                    <view class="list-divide-line" />
                        <view  class="extra-super" >
                            <view v-for="(item,index) in chatInputExtraArr" :key="index" class="flex-column" style="width: 25%" @click="_chatInput$extra$item$click$event" :data-index="index">
                                <image class="extra-image-size" 
                                :src="'/static/image/chat/extra/'+item.picName+'.png'" />
                                <text class="extra-text-size">{{item.description}}</text>
                            </view>
                        </view>
                </block>
            </view>

        </div>


    </div>
</template>

<script>
const MIN_VOICE_TIME = 1, MAX_VOICE_TIME = 60, START_TIME_DOWN = 54, status = {
    START: 1,
    SUCCESS: 2,
    CANCEL: 3,
    SHORT: 4,
    FAIL: 5,
    UNAUTH: 6
}, EVENT = {
    EXTRA_CLICK: 'extraClickEvent',
    EXTRA_ITEM_CLICK: 'extraItemClickEvent',
    VOICE_RECORD: 'voiceRecordEvent',
    SEND_MESSAGE: 'sendMessageEvent'
};
export default {
    props: {
        minVoiceTime: {
            type: Number,
            value: MIN_VOICE_TIME
        },
        maxVoiceTime: {
            type: Number,
            value: MAX_VOICE_TIME
        },
        startTimeDown: {
            type: Number,
            value: START_TIME_DOWN,
        },
        tabBarHeight: {
            type: Number,
            value: 0
        },
        format: {
            type: String,
            value: 'mp3'
        },
        extraArray: {
            type: Array,
            value: [{
                picName: 'choose_picture',
                description: '照片'
            }, {
                picName: 'take_photos',
                description: '拍摄'
            }, {
                picName: 'close_chat',
                description: '自定义功能'
            }]
        }
    },
    /**
     * 组件的初始数据
     */
    data () {
      return {
            windowHeight: 0,
            windowWidth: 0,
            cancelLineYPosition: 0,
            _startTimeDown: START_TIME_DOWN,
            timer: -1,
            singleVoiceTimeCount: 0,
            textMessage: '',
            voiceObj: {
                moveToCancel: false,
                showCancelSendVoicePart:false,
                status:'end',
                startStatus:0,
                voicePartWidth:0,
                voicePartPositionToBottom:0,
                voicePartPositionToLeft:0,
            },
            extraObj: {
                chatInputShowExtra: false,
                chatInputExtraArr: []
            },
            chatInputExtraArr:[{
                    picName: 'choose_picture',
                    description: '照片'
                },
                //  {
                //     picName: 'take_photos',
                //     description: '拍摄'
                // }, {
                //     picName: 'close_chat',
                //     description: '自定义功能'
                // }
                ],
            inputStatus: 'text',
            inputValueEventTemp: '',
            inputType:'',
            recorderManager:'',

            inputBottom:0,
        }
    },
    computed: {
        
    },
    onLoad(option) {
    },
    mounted () {
        var that = this;
        wx.getSystemInfo({
            success (res) {
                let windowWidth = res.windowWidth;
                let windowHeight = res.windowHeight;
                const  width = windowWidth / 2.6;
                that.inputStatus = 'text';
                that.windowHeight = windowHeight;
                that.windowWidth = windowWidth;
                
                that.voiceObj['status'] = 'end';
                that.voiceObj['startStatus'] = 0;
                that.voiceObj['voicePartWidth'] = width;
                that.voiceObj['moveToCancel'] = false;
                that.voiceObj['voicePartPositionToBottom'] = (windowHeight - width / 2.4) / 2;
                that.voiceObj['voicePartPositionToLeft'] =  (windowWidth - width) / 2;
                console.log('this.voiceObj, ',that.voiceObj);
            }
        })
    },
    observers: {
        'extraArray'(value) {
            this.extraObj['chatInputExtraArr'] = value || []

        },
        'startTimeDown'(startTimeDown) {
            // const data = this.data;
            this._startTimeDown = startTimeDown && startTimeDown < data.maxVoiceTime && startTimeDown > 0 ? startTimeDown : START_TIME_DOWN;
        }
    },

    methods: {
        getRecordStatus() {
            return {...status};
        },
        closeExtraView() {
            this.extraObj['chatInputShowExtra'] = false
        },
        _chatInput$extra$click$event() {
            const isShow = !this.extraObj.chatInputShowExtra;
            this.extraObj['chatInputShowExtra'] = isShow;
            this.$emit(EVENT.EXTRA_CLICK, {isShow}, {});
            
            if(isShow == true){

                this.inputBottom = 100;
            }else{
                
                this.inputBottom = 0;
            }
            
            // this.setData({
            //     'extraObj.chatInputShowExtra': isShow
            // }, () => {
            //     this.triggerEvent(EVENT.EXTRA_CLICK, {isShow}, {});
            // });
        },
        _change$input$way$event() {
            this.inputStatus = this.inputStatus === 'text' ? 'voice' : 'text';
            this.extraObj['chatInputShowExtra'] = false

            this.inputBottom = 0;
            // this.setData({
            //     'inputStatus': this.data.inputStatus === 'text' ? 'voice' : 'text',
            //     'extraObj.chatInputShowExtra': false
            // });
        },
        _triggerVoiceRecordEvent({status, dataset}) {
            this.$emit(EVENT.VOICE_RECORD, {recordStatus: status, ...dataset}, {});
        },
        _long$click$voice$btn(e) {
            console.log(e);
            var that = this;
            if ('send$voice$btn' === e.currentTarget.dataset.id) {//长按时需要打开录音功能，开始录音
                that._checkRecordAuth(() => {
                    const maxVoiceTime = that.maxVoiceTime, singleVoiceTimeCount = that.singleVoiceTimeCount;
                    that.voiceObj['showCancelSendVoicePart'] = true;
                    that.voiceObj['timeDownNum'] = maxVoiceTime - singleVoiceTimeCount;
                    that.voiceObj['status'] = 'start';
                    that.voiceObj['startStatus'] = 1;
                    that.voiceObj['moveToCancel'] = false;
                    console.log(that.voiceObj['showCancelSendVoicePart']);
                    console.log(that.voiceObj);
                    console.log('-------this.voiceObj--------------');
                    
                    that.recorderManager.start({duration: 60000, format: this.format});

                            
                        // 松开手指发送录音文件
                        // console.log('松开手指发送录音文件')
                        // that._triggerVoiceRecordEvent({status: status.START})

                    // setTimeout(() => {
                    //     console.log('setTimeout',status.START);
                    //     that._triggerVoiceRecordEvent({status: status.START})
                    // }, 1000);
                    // this.setData({//调出取消弹窗
                    //     'voiceObj.showCancelSendVoicePart': true,
                    //     'voiceObj.timeDownNum': maxVoiceTime - singleVoiceTimeCount,
                    //     'voiceObj.status': 'start',
                    //     'voiceObj.startStatus': 1,
                    //     'voiceObj.moveToCancel': false
                    // }, () => {
                    //     this._triggerVoiceRecordEvent({status: status.START});
                    // });
                    
                }, (res) => {
                    //录音失败
                    console.error('录音拒绝授权');
                    clearInterval(timer);
                    this._endRecord();
                    this.voiceObj['status'] = 'end';
                    this.voiceObj['showCancelSendVoicePart'] = false;

                    // this.setData({
                    //     'voiceObj.status': 'end',
                    //     'voiceObj.showCancelSendVoicePart': false
                    // });
                    this._triggerVoiceRecordEvent({status: status.UNAUTH});

                    wx.showModal({
                        title: '您未授权语音功能',
                        content: '暂时不能使用语音',
                        confirmText: '去设置',
                        success: res => {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: res => {
                                        if (res.authSetting['scope.record']) {
                                            this.extraObj['chatInputShowExtra'] = false
                                            // this.setData({
                                            //     'extraObj.chatInputShowExtra': false
                                            // });
                                        }
                                    }
                                });
                            } else {
                                this.inputStatus = 'text';
                                this.extraObj['chatInputShowExtra'] = false
                                // this.setData({
                                //     'inputStatus': 'text',
                                //     'extraObj.chatInputShowExtra': false
                                // });
                            }
                        }
                    });
                });
            }
        },
        _dealVoiceLongClickEventWithHighVersion() {
            this.recorderManager.onStart(() => {
                this.singleVoiceTimeCount = 0;
                const {_startTimeDown, maxVoiceTime} = this;
                //设置定时器计时60秒
                this.timer = setInterval(() => {
                    const voiceTimeCount = ++this.singleVoiceTimeCount;
                    if (voiceTimeCount >= _startTimeDown && voiceTimeCount < maxVoiceTime) {
                        this.voiceObj['timeDownNum'] = maxVoiceTime - voiceTimeCount;
                        this.voiceObj['status'] = 'timeDown';

                        // this.setData({
                        //     'voiceObj.timeDownNum': maxVoiceTime - voiceTimeCount,
                        //     'voiceObj.status': 'timeDown'
                        // })
                    } else if (voiceTimeCount >= maxVoiceTime) {
                        this.voiceObj['status'] = 'timeout'
                        // this.setData({
                        //     'voiceObj.status': 'timeout'
                        // });
                        this._delayDismissCancelView();
                        clearInterval(this.timer);
                        this._endRecord();
                    }
                }, 1000);
            })
        },
        _send$voice$move$event(e) {
            console.log('touchmove',);
            // e.currentTarget.dataset.id
            if ('send$voice$btn' === e.currentTarget.dataset.id) {
                const windowHeight = this.windowHeight, voiceObj = this.voiceObj, tabBarHeight = this.tabBarHeight, cancelLineYPosition = this.cancelLineYPosition,
                    y = windowHeight + tabBarHeight - e.touches[0].clientY;
                if (y > cancelLineYPosition) {
                    if (!voiceObj.moveToCancel) {
                        this.voiceObj['moveToCancel'] = true;
                        // this.setData({
                        //     'voiceObj.moveToCancel': true
                        // });
                    }
                } else {
                    if (voiceObj.moveToCancel) {//如果移出了该区域
                        this.voiceObj['moveToCancel'] = false
                        // this.setData({
                        //     'voiceObj.moveToCancel': false
                        // })
                    }
                }

            }
        },
        _send$voice$move$end$event(e) {
            console.log('touchend',e);
            if ('send$voice$btn' === e.currentTarget.dataset.id) {
                const singleVoiceTimeCount = this.singleVoiceTimeCount, minVoiceTime=this.minVoiceTime, timer=this.timer;
                if (singleVoiceTimeCount < minVoiceTime) {//语音时间太短
                    this.voiceObj['status'] = 'short';
                
                    // this.setData({
                    //     'voiceObj.status': 'short'
                    // });
                    this._delayDismissCancelView();
                } else {//语音时间正常
                    this.voiceObj['showCancelSendVoicePart'] = false;
                    this.voiceObj['status'] = 'end';
                    
                    console.log('松开手指发送录音文件')
                    this._triggerVoiceRecordEvent({status: status.START})

                    // this.setData({
                    //     'voiceObj.showCancelSendVoicePart': false,
                    //     'voiceObj.status': 'end'
                    // });
                }
                clearInterval(timer);
                this._endRecord();
            }
        },
        _initVoiceData() {
            // const {windowWidth, windowHeight} = this, width = windowWidth / 2.6;
            // this.setData({
            //     'inputStatus': 'text',
            //     'windowHeight': windowHeight,
            //     'windowWidth': windowWidth,
            //     'voiceObj.status': 'end',
            //     'voiceObj.startStatus': 0,
            //     'voiceObj.voicePartWidth': width,
            //     'voiceObj.moveToCancel': false,
            //     'voiceObj.voicePartPositionToBottom': (windowHeight - width / 2.4) / 2,
            //     'voiceObj.voicePartPositionToLeft': (windowWidth - width) / 2
            // });
        },
        _delayDismissCancelView() {
            setTimeout(() => {
                if (this.voiceObj.status !== 'start') {
                    this.voiceObj['showCancelSendVoicePart'] = false;
                    this.voiceObj['status'] = "end"
                    // this.setData({
                    //     'voiceObj.showCancelSendVoicePart': false,
                    //     'voiceObj.status': 'end'
                    // });
                }
            }, 1000);
        },

        _endRecord() {
            this.voiceObj['startStatus'] = 0;
            this.recorderManager.stop();

            // this.setData({
            //     'voiceObj.startStatus': 0
            // }, () => {
            //     this.recorderManager.stop();
            // });
        },
        _chatInput$bind$focus$event(e) {
            console.log("键盘聚焦")
            this.inputType = 'text'
            console.log(this.inputType);
            console.log(e);
            if(e.mp.detail.height == 0){
                return//在开发者工具上便于调试，不会造成input框上推
            }
            if (e.mp.detail.height) {
                this.inputBottom = e.mp.detail.height
            }
        },
        _chatInput$send$text$message(e) {
            this.textMessage = '';
            this.$emit(EVENT.SEND_MESSAGE, {value: e.mp.detail.value});
            this.inputValueEventTemp = '';
            // this.setData({
            //     textMessage: ''
            // }, () => {
            //     this.triggerEvent(EVENT.SEND_MESSAGE, {value: e.detail.value});
            //     this.data.inputValueEventTemp = '';
            // });
        },
        _chatInput$bind$blur$event() {
            console.log('失去焦点')
            if (!this.inputValueEventTemp) {
                this.inputValueEventTemp = '';
                // obj['inputType'] = 'none';
                this.inputType = 'none'
            }
            console.log(this.inputType);
            // obj['extraObj.chatInputShowExtra'] = false;
            this.extraObj['chatInputShowExtra'] = false;


            this.inputTop = 82;
            this.scrollHeight = 81;
            this.inputBottom = 0
            // this.toView =  "view" + String(this.array.length-1)

        },
        _chatInput$send$text$message02() {
            this.textMessage = '';
            this.inputType = 'none'
            if (!!this.inputValueEventTemp) {
                console.log('发送消息-----    ',this.inputValueEventTemp);
                this.$emit(EVENT.SEND_MESSAGE, {value: this.inputValueEventTemp});
                this.inputValueEventTemp = '';
            }
            // this.setData({
            //     textMessage: '',
            //     'inputType': 'none'
            // }, () => {
            //     if (!!this.data.inputValueEventTemp) {
            //         this.triggerEvent(EVENT.SEND_MESSAGE, {value: this.data.inputValueEventTemp});
            //         this.data.inputValueEventTemp = '';
            //     }
            // });
        },
        _chatInput$getValue$event(e) {
            console.log('input 输入')
            const {detail: {value: textMessage}} = e.mp;
            this.inputValueEventTemp = textMessage;
            this.textMessage = textMessage
            // this.setData({
            //     textMessage
            // })
        },
        _chatInput$extra$item$click$event(e) {
            const {currentTarget: {dataset}} = e.mp;
            this.$emit(EVENT.EXTRA_ITEM_CLICK, {...dataset}, {});
        },

        _setVoiceListener() {
            this.recorderManager.onStop((res) => {
                console.log(res, this.voiceObj.status);
                if (this.voiceObj.status === 'short') {//录音时间太短或者移动到了取消录音区域， 则取消录音
                    this._triggerVoiceRecordEvent({status: status.SHORT});
                    return;
                } else if (this.voiceObj.moveToCancel) {
                    this._triggerVoiceRecordEvent({status: status.CANCEL});
                    return;
                }
                console.log('录音成功');
                this._triggerVoiceRecordEvent({status: status.SUCCESS, dataset: res});
            });
            this.recorderManager.onError((res) => {
                this._triggerVoiceRecordEvent({status: status.FAIL, dataset: res});
            });
        },

        _checkRecordAuth(cbOk, cbError) {
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.record']) {
                        wx.authorize({
                            scope: 'scope.record',
                            success: (res) => {
                                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                                console.log('同意', res);
                            }, fail: res => {
                                console.log('拒绝', res);
                                cbError && cbError();
                            }
                        })
                    } else {
                        cbOk && cbOk();
                    }
                }
            })
        }
    },
    created() {
        this.recorderManager = wx.getRecorderManager();
        const {windowHeight, windowWidth} = wx.getSystemInfoSync();
        if (!windowHeight || !windowWidth) {
            console.error('没有获取到手机的屏幕尺寸：windowWidth', windowWidth, 'windowHeight', windowHeight);
            return;
        }
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.cancelLineYPosition = windowHeight * 0.12;
        this._dealVoiceLongClickEventWithHighVersion();
        this._setVoiceListener();
    },
    attached() {
        this._initVoiceData();
    },
    detached() {
        clearInterval(this.timer);
    }
    // lifetimes: {
       
    // }
  }
</script>

<style scoped>
input{
    padding-top: 10rpx;
    padding-bottom:10rpx;
    width: 100%;
}

.extra-btn-style{
    width: 50rpx;
    height: 50rpx;
    padding:25rpx 15rpx;
    display: flex;
    flex-shrink:0;
}
.input-text-voice-super{
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 100%;
    align-items: center;
    height:100rpx;
}
.input-flex-column{
    box-sizing: border-box;
    height: 50px;
    width:100%;
    display: flex;
    flex-direction:column;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #f2f2f2;
}

.list-divide-line {
    width: 100%;
    height: 1rpx;
    background-color: #dddddd;
}

.chat-input-style{
    border-radius:10rpx;
    border:1rpx solid gainsboro;
    margin-top:14rpx;
    margin-bottom: 13rpx;
    padding:10rpx;
    min-height: 51rpx;
    background-color: #EFEFEF;
}

.chat-input-send-button-style{
    width: 100rpx;
    padding: 15rpx 0;
    font-size: 30rpx;
    text-align: center;
    margin: 0 10rpx;
    border-radius: 10rpx;
    background-color: mediumseagreen;
    color: white;
}


/* extra.wxss */
.press-style{
    background-color: rgba(0,0,0,0.1);
}

.press-style-opacity{
    opacity: 0.5;
}

.extra-super{
    display: flex;
    padding-top: 25rpx;
    padding-bottom: 25rpx;
    height: 234rpx;
    width: 100%;
    background-color: white
}
.extra-image-size{
    width: 114rpx;
    height: 114rpx
}
.extra-text-size{
    color: #666666;
    font-size: 24rpx;
    margin-top: 10rpx
}

.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex-row{
    display: flex;
}
/* extra.wxss end */

/* voice.wxss */

.btn-voice-press {
    background-color: gainsboro;
}

button{
    font-size: 32rpx;
    width:100%;
    line-height: 74rpx;
    margin-top: 15rpx;
    margin-bottom: 15rpx;
}
.voice-status-style{
    position: absolute;
    left: 0;
    bottom: 22rpx;
    width: 80%;
    text-align: center;
    font-size: 24rpx;
    color: white;
    padding-top: 5rpx;
    padding-bottom: 5rpx;
    margin-left: 10%;
    border-radius: 10rpx;
}

.voice-record-git-status-style{
    position: absolute;
    left: 0;
    bottom: 75rpx;
    width: 100%;
    display: flex;
    justify-content: center;
}

.voice-record-git-size-style{
    width: 58rpx;
    height: 10rpx;
}
/* voice.wxss end*/

</style>