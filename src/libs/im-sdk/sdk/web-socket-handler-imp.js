
import store from '@/store/index'


import IIMHandler from "../interface/i-im-handler";
import AppIMDelegate from "../../../delegate/app-im-delegate";
let option_data
let interval

let superContent = '';
export default class WebSocketHandlerImp extends IIMHandler {
    constructor() {
        super();
        this._onSocketOpen();
        this._onSocketMessage();
        this._onSocketError();
        this._onSocketClose();
    }

    /**
     * 创建WebSocket连接
     * 如：this.imWebSocket = new IMWebSocket();
     *    this.imWebSocket.createSocket({url: 'ws://10.4.97.87:8001'});
     * 如果你使用本地服务器来测试，那么这里的url需要用ws，而不是wss，因为用wss无法成功连接到本地服务器
     * @param options 建立连接时需要的配置信息，这里是传入的url，即你的服务端地址，端口号不是必需的。
     */
    createConnection({options,data}) {
        console.log(data)
        this.option_data = {
            url: options.url,
            header: {
                'content-type': 'application/json',
                'user-info':JSON.stringify(data)
            },
            method: 'GET',
            
        };
        !this._isLogin && wx.connectSocket(this.option_data);
    }

    _sendMsgImp({content, success, fail}) {
        wx.sendSocketMessage({
            data: JSON.stringify(content), success: () => {
                success && success({content});
            },
            fail: (res) => {
                fail && fail(res);
            }
        });
    }


    /**
     * 关闭webSocket
     */
    closeConnection() {
        wx.closeSocket();
    }

    _onSocketError(cb) {
        wx.onSocketError((res) => {
            this._isLogin = false;
            console.log('WebSocket连接打开失败，请检查！', res);
            
        })
    }

    _onSocketClose(cb) {
        wx.onSocketClose((res) => {
            this._isLogin = false;
            console.log('WebSocket 已关闭！', res)
            // wx.showLoading({
            //   title: '正在努力连接中',
            // })
            this.interval = setInterval(this.relink(),1000)
        });
    }

    relink(){
        wx.connectSocket(this.option_data)
    }

    _onSocketOpen() {
       
        wx.onSocketOpen((res) => {
            console.log('WebSocket连接已打开！');
            
            // wx.hideLoading()
            clearInterval(this.interval)
            this._get_info();
            
        });
    }
    // 获取用户信息
    _get_info(){

        let userInfo = wx.getStorageSync('userInfo') || store.state.userInfo ;
        let user = {};
        if(userInfo){
            user = JSON.parse(userInfo);
            
            let login_data = {
                type:'getinfo',
                userinfo:{
                    openid:user.openid || '',
                    username:user.nickName || '' ,
                    key:'project-6bbf9ac94a7e4595' ,
                    headimg:user.avatarUrl || '' ,
                }
            };
            console.log('login_data---');
            
            console.log(login_data)
            
            wx.sendSocketMessage({
                data:JSON.stringify(login_data)
            });
            
            this._add_friends();
        }
    }
    // 添加好友
    _add_friends(friend = '',openid="",content){
        console.log('friend-----    ',friend,openid,content);
        
        if(friend != '' && openid != ''){
            // 添加好友
            let login_data1 = {
                type:'add_friends',
                project_key:'project-6bbf9ac94a7e4595' ,
                userid:openid, //自己的openID
                friend:friend //好友的openid
            };
            superContent = content;
            wx.sendSocketMessage({
                data:JSON.stringify(login_data1)
            });
        }
       
    }

    /**
     * webSocket是在这里接收消息的
     * 在socket连接成功时，服务器会主动给客户端推送一条消息类型为login的信息，携带了用户的基本信息，如id，头像和昵称。
     * 在login信息接收前发送的所有消息，都会被推到msgQueue队列中，在登录成功后会自动重新发送。
     * 这里我进行了事件的分发，接收到非login类型的消息，会回调监听函数。
     * @private
     */
    _onSocketMessage() {
        wx.onSocketMessage((res) => {
            let msg = JSON.parse(res.data);
            console.log(msg,'reback');
            if ('login' === msg.type) {
                this._isLogin = true;
                getApp().globalData.userInfo = msg.userInfo;
                getApp().globalData.friendsId = msg.friendsId;
                
                if (this._msgQueue.length) {
                    let temp;
                    while (this._isLogin && !!(temp = this._msgQueue.shift())) {
                        this._sendMsgImp({
                            content: {...temp.content, userId: msg.userInfo.userId},
                            success: temp.resolve,
                            fail: temp.reject
                        });
                    }
                }
            }  else {

                if('add_friends' == msg.type){
                    let friendId = msg.userInfo.friendId
                    console.log('getApp()    ',friendId,getApp().globalData.userInfo.userId,superContent)
                    wx.sendSocketMessage({
                        data:JSON.stringify({
                            content: superContent,
                            conversationId: 0,
                            friendId: friendId,
                            type: "text",
                            userId: getApp().globalData.userInfo.userId,
                        })
                    });
    
                }else{

                    this._receiveListener && this._receiveListener(msg);
                }

            }
            
        })
    }

}
