import {getIMHandlerFactory} from "../libs/im-sdk/im-factory";


import store from '@/store/index'

export default class AppIMDelegate {
    constructor() {
        // this._app = app;
    }

    onLaunch() {
        console.log('link')
        this.iIMHandler = getIMHandlerFactory;
    }

    relink() {
        console.log('link2')
        this.iIMHandler = getIMHandlerFactory;
    }

    onShow() {
      
        let userInfo =  wx.getStorageSync('userInfo') || store.state.userInfo ;
        let user = {},data={};
        if(userInfo){
            user = JSON.parse(userInfo);
            data = {
                openid:user.openid || '' ,
                username:user.nickName || '' ,
                headimg:user.avatarUrl || '' ,
                key:'project-6bbf9ac94a7e4595' ,
            }
            this.iIMHandler.createConnection({options: {url: 'wss://fangcanxcx.shengbokj.com:9509'},data:data});
        }
        
    }

    onHide() {

    }

    getIMHandlerDelegate() {
        return this.iIMHandler;
    }
}
