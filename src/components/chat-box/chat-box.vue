<template>
    <div>
        <div>
            <!-- <button bind:longpress="_long$click$voice$btn" catch:touchmove="_send$voice$move$event"
            catch:touchend="_send$voice$move$end$event" id="send$voice$btn" hover-class="btn-voice-press">{{voiceObj.startStatus?'松开 结束':'按住 说话'}}
            </button>
            <view wx:if="{{voiceObj.showCancelSendVoicePart}}"
                style="width: {{voiceObj.voicePartWidth}}px;height: {{voiceObj.voicePartWidth}}px;display: flex;position: fixed;left: {{voiceObj.voicePartPositionToLeft}}px;bottom: {{voiceObj.voicePartPositionToBottom}}px;justify-content:center;align-items: center;border-radius: 20rpx;">
                <view style="background-color:black;opacity:{{voiceObj.status==='timeDown'?0.6:0}};width: 100%;height: 100%;border-radius: 20rpx;position: absolute"/>
                <image src="./../../image/chat/voice/{{voiceObj.status==='start'?(voiceObj.moveToCancel?'recall':'speak'):'attention'}}.png" style="width: 100%;height: 100%;border-radius: 20rpx" wx:if="{{voiceObj.status!=='timeDown'}}"/>
                <text style="margin-bottom:30rpx;font-size: 150rpx;text-align: center;color: white;position: relative" wx:if="{{voiceObj.status==='timeDown'}}">{{voiceObj.timeDownNum}}</text>
                <view class="voice-record-git-status-style" wx:if="{{!voiceObj.moveToCancel&&voiceObj.status!=='short'}}">
                    <image src="data:image/gif;base64,R0lGODlhOgAKAKIFAERERIWFhWVlZdbW1qampv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAAFACwAAAAAOgAKAAADazi6XEUwSheqvU7ozR34YMiMgyOdBHWtGed6YUw2Dxqpq9W6GxyDs4XJBsHlAjuewPcDBBVDojGX5DF/z1JNWjjqCspeoQl8Rm1TFji8HJOd5i2660Wuw1dZnFike6svbmRZZyhpGHdKeSEJACH5BAUUAAUALAAAAAA6AAoAAANrCLpcNTBKR6q9LujNnfhgyIyAI50Dda0Z53phTDYPGqmr1bobHIOzhckGweUIO17A9xMEFUOiMZfkMX/PUk1aOOoKyl6hCXxGbVMWOLwck53mLbrrRa7DV1mcWKR7qy9uZFlnKGkYd0p5IQkAIfkEBRQABQAsAAAAADoACgAAA2soulwFMEo3qr2O6M1d+GDIjIIjnQB1rRnnemFMNg8aqavVuhscg7OFyQbB5QY7HsH3CwQVQ6Ixl+Qxf89STVo46grKXqEJfEZtUxY4vByTneYtuutFrsNXWZxYpHurL25kWWcoaRh3SnkhCQAh+QQFFAAFACwAAAAAOgAKAAADaxi6XCUwSgeqvW7ozR35YMiMgSOdAnWtGed6YUw2Dxqpq9W6GxyDs4XJBsHlADvewPcjBBVDojGX5DF/z1JNWjjqCspeoQl8Rm1TFji8HJOd5i2660Wuw1dZnFike6svbmRZZyhpGHdKeSEJACH5BAUUAAUALAAAAAA6AAoAAANrSLpcFTBKJ6q9DujN3fhgyIyEI50Bda0Z53phTDYPGqmr1bobHIOzhckGweUEOx7A9xsEFUOiMZfkMX/PUk1aOOoKyl6hCXxGbVMWOLwck53mLbrrRa7DV1mcWKR7qy9uZFlnKGkYd0p5IQkAOw==" class="voice-record-git-size-style"/>
                </view>
                <text class="voice-status-style" style="background-color: {{voiceObj.moveToCancel?'#ab1900':'transparent'}};">{{voiceObj.status==='start'||voiceObj.status==='timeDown'?(voiceObj.moveToCancel?'松开手指，取消发送':'手指上滑，取消发送'):(voiceObj.status==='short'?'说话时间太短':'说话时间超时')}}</text>
            </view> -->
        </div>
        <div>
            <!-- <view  class="extra-super" >

                <view wx:for="{{chat$input$extra$arr}}" wx:key="{{index}}" class="flex-column" style="width: 25%" bindtap="_chatInput$extra$item$click$event" data-index="{{index}}">
                    <image class="extra-image-size" src="./../../image/chat/extra/{{item.picName}}.png" />
                    <text class="extra-text-size">{{item.description}}</text>
                </view>
            </view> -->
        </div>
        <div>

            <!-- <view class="input-flex-column" catchtap="">
                <view class="input-text-voice-super">
                    <image src="../../image/chat/voice/{{inputStatus==='voice'?'keyboard':'voice'}}.png"
                        class="extra-btn-style" bindtap="_change$input$way$event"/>
                    <block wx:if="{{inputStatus==='voice'}}">
                        <template is="voice" data="{{voiceObj:voiceObj}}"/>
                    </block>
                    <input wx:elif="{{inputStatus==='text'}}"
                        class="chat-input-style" style="margin-left:{{showVoicePart?0:16}}rpx;"
                        maxlength="500" confirm-type="send" value="{{textMessage}}" bindconfirm="_chatInput$send$text$message" bindfocus="_chatInput$bind$focus$event" bindblur="_chatInput$bind$blur$event" bindinput="_chatInput$getValue$event"/>
                    <view hover-class="press-style-opacity">
                        <view wx:if="{{inputType==='text'}}" class="chat-input-send-button-style" catchtap="_chatInput$send$text$message02">发送</view>
                        <image wx:else class="extra-btn-style"
                            src="../../image/chat/extra.png" catchtap="_chatInput$extra$click$event" />
                    </view>


                </view>
                <block wx:if="{{extraObj.chatInputShowExtra}}">
                    <view class="list-divide-line" />
                    <template is="chat-extra-function-part"
                            data="{{chat$input$extra$arr:extraObj.chatInputExtraArr}}" />
                </block>
            </view> -->

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
            value: []
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
            voiceObj: {moveToCancel: false},
            extraObj: {
                chatInputShowExtra: false,
                chatInputExtraArr: []
            },
            inputStatus: 'text',
            inputValueEventTemp: ''
  
        }
    },
    computed: {
        
    },
    onLoad(option) {
    },
    mounted () {
      
    },
    observers: {
        'extraArray'(value) {
            this.setData({
                'extraObj.chatInputExtraArr': value || []
            })
        },
        'startTimeDown'(startTimeDown) {
            const data = this.data;
            data._startTimeDown = startTimeDown && startTimeDown < data.maxVoiceTime && startTimeDown > 0 ? startTimeDown : START_TIME_DOWN;
        }
    },
    methods: {
        getRecordStatus() {
            return {...status};
        },
        closeExtraView() {
            this.setData({
                'extraObj.chatInputShowExtra': false
            });
        },
        _chatInput$extra$click$event() {
            const isShow = !this.data.extraObj.chatInputShowExtra;
            this.setData({
                'extraObj.chatInputShowExtra': isShow
            }, () => {
                this.triggerEvent(EVENT.EXTRA_CLICK, {isShow}, {});
            });
        },
        _change$input$way$event() {
            this.setData({
                'inputStatus': this.data.inputStatus === 'text' ? 'voice' : 'text',
                'extraObj.chatInputShowExtra': false
            });
        },
        _triggerVoiceRecordEvent({status, dataset}) {
            this.triggerEvent(EVENT.VOICE_RECORD, {recordStatus: status, ...dataset}, {});
        },
        _long$click$voice$btn(e) {
            if ('send$voice$btn' === e.currentTarget.id) {//长按时需要打开录音功能，开始录音
                this._checkRecordAuth(() => {
                    const {maxVoiceTime, singleVoiceTimeCount} = this.data;
                    this.setData({//调出取消弹窗
                        'voiceObj.showCancelSendVoicePart': true,
                        'voiceObj.timeDownNum': maxVoiceTime - singleVoiceTimeCount,
                        'voiceObj.status': 'start',
                        'voiceObj.startStatus': 1,
                        'voiceObj.moveToCancel': false
                    }, () => {
                        this._triggerVoiceRecordEvent({status: status.START});
                    });
                    this.recorderManager.start({duration: 60000, format: this.data.format});
                }, (res) => {
                    //录音失败
                    console.error('录音拒绝授权');
                    clearInterval(timer);
                    this._endRecord();
                    this.setData({
                        'voiceObj.status': 'end',
                        'voiceObj.showCancelSendVoicePart': false
                    });
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
                                            this.setData({
                                                'extraObj.chatInputShowExtra': false
                                            });
                                        }
                                    }
                                });
                            } else {
                                this.setData({
                                    'inputStatus': 'text',
                                    'extraObj.chatInputShowExtra': false
                                });
                            }
                        }
                    });
                });
            }
        },
        _dealVoiceLongClickEventWithHighVersion() {
            this.recorderManager.onStart(() => {
                this.data.singleVoiceTimeCount = 0;
                const {_startTimeDown, maxVoiceTime} = this.data;
                //设置定时器计时60秒
                this.data.timer = setInterval(() => {
                    const voiceTimeCount = ++this.data.singleVoiceTimeCount;
                    if (voiceTimeCount >= _startTimeDown && voiceTimeCount < maxVoiceTime) {
                        this.setData({
                            'voiceObj.timeDownNum': maxVoiceTime - voiceTimeCount,
                            'voiceObj.status': 'timeDown'
                        })
                    } else if (voiceTimeCount >= maxVoiceTime) {
                        this.setData({
                            'voiceObj.status': 'timeout'
                        });
                        this._delayDismissCancelView();
                        clearInterval(this.data.timer);
                        this._endRecord();
                    }
                }, 1000);
            })
        },
        _send$voice$move$event(e) {
            if ('send$voice$btn' === e.currentTarget.id) {
                const {windowHeight, voiceObj, tabBarHeight, cancelLineYPosition} = this.data,
                    y = windowHeight + tabBarHeight - e.touches[0].clientY;
                if (y > cancelLineYPosition) {
                    if (!voiceObj.moveToCancel) {
                        this.setData({
                            'voiceObj.moveToCancel': true
                        });
                    }
                } else {
                    if (voiceObj.moveToCancel) {//如果移出了该区域
                        this.setData({
                            'voiceObj.moveToCancel': false
                        })
                    }
                }

            }
        },
        _send$voice$move$end$event(e) {
            if ('send$voice$btn' === e.currentTarget.id) {
                const {singleVoiceTimeCount, minVoiceTime, timer} = this.data;
                if (singleVoiceTimeCount < minVoiceTime) {//语音时间太短
                    this.setData({
                        'voiceObj.status': 'short'
                    });
                    this._delayDismissCancelView();
                } else {//语音时间正常
                    this.setData({
                        'voiceObj.showCancelSendVoicePart': false,
                        'voiceObj.status': 'end'
                    });
                }
                clearInterval(timer);
                this._endRecord();
            }
        },
        _initVoiceData() {
            const {windowWidth, windowHeight} = this.data, width = windowWidth / 2.6;
            this.setData({
                'inputStatus': 'text',
                'windowHeight': windowHeight,
                'windowWidth': windowWidth,
                'voiceObj.status': 'end',
                'voiceObj.startStatus': 0,
                'voiceObj.voicePartWidth': width,
                'voiceObj.moveToCancel': false,
                'voiceObj.voicePartPositionToBottom': (windowHeight - width / 2.4) / 2,
                'voiceObj.voicePartPositionToLeft': (windowWidth - width) / 2
            });
        },
        _delayDismissCancelView() {
            setTimeout(() => {
                if (this.data.voiceObj.status !== 'start') {
                    this.setData({
                        'voiceObj.showCancelSendVoicePart': false,
                        'voiceObj.status': 'end'
                    });
                }
            }, 1000);
        },

        _endRecord() {
            this.setData({
                'voiceObj.startStatus': 0
            }, () => {
                this.recorderManager.stop();
            });
        },
        _chatInput$bind$focus$event() {
            this.setData({
                'inputType': 'text'
            })
        },
        _chatInput$send$text$message(e) {
            this.setData({
                textMessage: ''
            }, () => {
                this.triggerEvent(EVENT.SEND_MESSAGE, {value: e.detail.value});
                this.data.inputValueEventTemp = '';
            });
        },
        _chatInput$bind$blur$event() {
            setTimeout(() => {
                let obj = {};
                if (!this.data.inputValueEventTemp) {
                    this.data.inputValueEventTemp = '';
                    obj['inputType'] = 'none';
                }
                obj['extraObj.chatInputShowExtra'] = false;
                this.setData(obj);
            });
        },
        _chatInput$send$text$message02() {
            this.setData({
                textMessage: '',
                'inputType': 'none'
            }, () => {
                if (!!this.data.inputValueEventTemp) {
                    this.triggerEvent(EVENT.SEND_MESSAGE, {value: this.data.inputValueEventTemp});
                    this.data.inputValueEventTemp = '';
                }
            });
        },
        _chatInput$getValue$event(e) {
            const {detail: {value: textMessage}} = e;
            this.data.inputValueEventTemp = textMessage;
            this.setData({
                textMessage
            })
        },
        _chatInput$extra$item$click$event(e) {
            const {currentTarget: {dataset}} = e;
            this.triggerEvent(EVENT.EXTRA_ITEM_CLICK, {...dataset}, {});
        },

        _setVoiceListener() {
            this.recorderManager.onStop((res) => {
                console.log(res, this.data.voiceObj.status);
                if (this.data.voiceObj.status === 'short') {//录音时间太短或者移动到了取消录音区域， 则取消录音
                    this._triggerVoiceRecordEvent({status: status.SHORT});
                    return;
                } else if (this.data.voiceObj.moveToCancel) {
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
    lifetimes: {
        created() {
            this.recorderManager = wx.getRecorderManager();
            const {windowHeight, windowWidth} = wx.getSystemInfoSync();
            if (!windowHeight || !windowWidth) {
                console.error('没有获取到手机的屏幕尺寸：windowWidth', windowWidth, 'windowHeight', windowHeight);
                return;
            }
            this.data.windowHeight = windowHeight;
            this.data.windowWidth = windowWidth;
            this.data.cancelLineYPosition = windowHeight * 0.12;
            this._dealVoiceLongClickEventWithHighVersion();
            this._setVoiceListener();
        },
        attached() {
            this._initVoiceData();
        },
        detached() {
            clearInterval(this.data.timer);
        }
    }
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
    width:100%;
    display: flex;
    flex-direction:column;
    position: fixed;
    left: 0;
    bottom: 0;
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