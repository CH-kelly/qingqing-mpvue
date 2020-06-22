<template>
  <div>
    <navigation-bar background="#F4F5F9">
      <div slot="left"></div>
    </navigation-bar>

    <div class="index-center" :style="{marginTop:systemHeight+'px',height:contentHeight+'px'}">
      <img class="index-center-logo" src="/static/images/new/logo.png" alt />

      <div class="index-center-button">
        <div class="index-center-origin" style="background: #1be9c9;"></div>
        <div class="index-center-title">真实交友</div>
        <div class="index-center-desc">拒绝酒托、微商等各类骗子，打造100%真实的单身交友平台</div>
      </div>

      <div class="index-center-button">
        <div class="index-center-origin" style="background: #ff4ca0;"></div>
        <div class="index-center-title">严格审核</div>
        <div class="index-center-desc">每个人都要经过严格的资料审核和实名+学历双重认证才能交友</div>
      </div>

      <div class="index-center-button">
        <div class="index-center-origin" style="background: #6d48e5;"></div>
        <div class="index-center-title">隐私保护</div>
        <div class="index-center-desc">100%隐私安全，青藤之恋不会泄露你的任何隐私信息</div>
      </div>

      <div class="index-center-bottom">
        <div class="index-center-bottom-wx">
          <div class="bottom-wx-log" @click="wxLogin">
            <span class="bottom-wx">微信登录</span>
            <span class="bottom-wx-secert">私密</span>
          </div>
        </div>
        <div class="bottom-tourist" @click="lookAround">随便看看</div>
        <div class="bottom-agreement">
          登录即同意青藤之恋
          <span class="bottom-agreement-protocol" @click="goUserAgreement">《用户协议》</span>与
          <span class="bottom-agreement-protocol" @click="goPrivacyPolicy">《隐私政策》</span>
        </div>
      </div>
    </div>

    <div v-if="showModel===1" class="reminder">
      <div class="reminder-model">
        <div class="reminder-title">温馨提示</div>
        <div class="reminder-content">
          <div>亲，感谢您信任并使用青藤之恋！我们依据最新的法律法规、监管政策要求及业务实际情况更新了青藤之恋</div>
        </div>
        
        <div class="reminder-button">
          <div class="reminder-button-left" @click="disagree">不同意</div>
          <div >
              <button class="reminder-button-left" style="background: rgba(27,233,201,1);border: none;" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" >同意</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from "@/components/navbar/navbar";
import store from "@/store";

export default {
  data() {
    return {
      systemHeight: 0,
      contentHeight: 0,
      showModel: 0,
      code:"",
      isReadDialog: 0,

      banner:[],
      isssetOn:0, 
    };
  },

  components: {
    navigationBar
  },
  onLoad(options) {
    console.log('onLoad options',options)
    // 记录邀请码
    try {
      wx.setStorageSync('inviter', options.inviter);
      store.commit('setInviter', options.inviter)

    } catch (e) {}



    let that = this;
    //判断用户是否第一次访问引导页
    wx.getStorage({
      key: "isReadDialog",
      success(res) {
        that.isReadDialog = res.data;
      }
    });

  },
  onShow(options){
    this.get_isssetOn();
  },
  mounted(option) {
    //  this.systemHeight = wx.getStorageSync('systemHeight');

    this.systemHeight = store.state.systemHeight;
    let height = store.state.secondPageHeight;
    this.contentHeight = height;
    console.log("showModel", this.showModel);
  },
  methods: {
    get_isssetOn(){
      let that = this;
      that.postRequest('/home/login/isssetOn').then(res=>{  
          if(res.code===0){
            that.isssetOn = (res.data.content == 1) ? 1 : 0;
            that.banner = res.data.urls
          }
        },err=>{
          console.log(err);
          
        })
    },
    goUserAgreement() {
      wx.navigateTo({
        url: "/pages/agreement/main?agreement=1"
      });

    },
    goPrivacyPolicy() {
      wx.navigateTo({
        url: "/pages/agreement/main?agreement=2"
      });
    },
    lookAround() {
      //随便看看 如果已经选择过随便看看并且指导页面已完成就不用进随便看看了
      console.log("随便看看");
      
      //判断用户是否第一次访问引导页  2已阅读引导页   1表示要去选择性别
      if (this.isReadDialog == 2 && this.isssetOn == 0) {
        wx.switchTab({
          url: "/pages/index/index/main"
        });
      } else if(this.isssetOn == 1){
            let banner = '';
            if(this.banner){
              banner = JSON.stringify(this.banner);
            }
            //选择性别
            wx.navigateTo({
              url: "/pages/navigation/main?banner="+banner
            });
      } else {

        //选择性别
        wx.navigateTo({
          url: "/pages/index/pages/personalData/main?lookAround=1"
        });
      }
    },
    wxLogin() {
      // 微信登录 温馨提示
      this.showModel = 1;
      console.log("微信登录");
      let that = this;
      wx.login({
          success (res) {
            if (res.code) {
              console.log(res.code);
              that.code = res.code;
            }
          }
      })
    },
    disagree() {
      console.log("不同意");
      // 不同意
      this.showModel = 0;
    },
    bindGetUserInfo(e) {
         // console.log('回调事件后触发')
        const self = this;
        if(this.code === ''){
          console.log('这是code是空',code)
        }
        if (e.mp.detail.userInfo){
            let code = self.code;  
            let inviter = store.state.inviter || wx.getStorageSync('inviter');
            let { encryptedData,userInfo,iv } = e.mp.detail;

            console.log('inviter------',inviter);
            self.postRequest('home/user/login',{ encryptedData,iv,code,inviter}).then(res=>{
                wx.showToast({
                  title: res.message,
                  icon: 'success',
                  duration: 2000
                })
              if(res.code ===0){   
                let openid = res.data.openID;             
                self.showModel = 0;
                
                store.state.is_new_user = res.data.is_new_user
                store.state.token = res.data.token
                
                userInfo.openid = openid;
                
                wx.setStorageSync('userInfo', JSON.stringify(userInfo)); //保存用户信息
                wx.setStorageSync('token', res.data.token); //保存用户登录的token信息

                store.commit('setisLogin',1)
                store.commit('setUserInfo',userInfo)

                console.log('----------------',self.appIMDelegate)
                console.log();
                self.appIMDelegate.onLaunch();
                self.appIMDelegate.onShow();


                if (self.isReadDialog == 2 && self.isssetOn == 0) {
                    console.log('setTimeout isReadDialog ---',self.isReadDialog);
                    wx.switchTab({
                      url: "/pages/index/index/main"
                    });
                } else if(self.isssetOn == 1){
                    let banner = '';
                    if(self.banner){
                      banner = JSON.stringify(self.banner);
                    }
                    //选择性别
                    wx.navigateTo({
                      url: "/pages/navigation/main?banner="+banner
                    });
              } else {
                  //选择性别
                  wx.navigateTo({
                    url: "/pages/index/pages/personalData/main"
                  });
                }
              
              }
            }).catch(res=>{
              wx.showToast(res)
            })
        } else {
            //用户按了拒绝按钮
            console.log('用户按了拒绝按钮');
        }
    },
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
  background: #f4f5f9;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
}
.index-center-logo {
  padding: 98rpx 0;
  width: 516rpx;
  height: 108rpx;
}
.index-center-button {
  display: flex;
  align-items: center;
  width: 640rpx;
  height: 140rpx;
  background-color: #fff;
  box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
  border-radius: 12rpx;
  border: 2rpx solid #efefef;

  margin: 0 auto;
  margin-bottom: 16rpx;
}
.index-center-origin {
  margin-left: 32rpx;
  margin-right: 20rpx;

  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
}
.index-center-title {
  margin-right: 34rpx;

  font-size: 32rpx;
  font-weight: 800;
  font-family: PingFang SC;
}
.index-center-desc {
  font-size: 22rpx;

  width: 336rpx;
  min-height: 68rpx;
  line-height: 34rpx;
}

.index-center-bottom {
  width: 100%;
  position: fixed;
  bottom: 60rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.index-center-bottom-wx {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-wx-log {
  width: 560rpx;
  height: 100rpx;
  border-radius: 56rpx;
  color: #29363b;
  background: #1be9c9;

  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-wx {
  font-size: 32rpx;
  font-weight: 800;
  font-family: PingFang SC;
}
.bottom-wx-secert {
  width: 68rpx;

  height: 28rpx;
  line-height: 28rpx;
  background: #29363b;
  border-radius: 14rpx;
  color: #1be9c9;
  font-weight: bold;
  margin-left: 12rpx;
  text-align: center;
  font-size: 20rpx;
}
.bottom-tourist {
  margin-top: 30rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFang SC;
}
.bottom-agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40rpx;
  color: #999;
  text-align: center;
  font-size: 22rpx;
  font-family: PingFang SC;
}

.bottom-agreement-protocol {
  margin: 0 8rpx;
  color: #1be9c9;
}

/* 温馨提示 */
.reminder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reminder-model {
  border-radius: 10rpx;
  background: #fff;
}
.reminder-title {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  font-size: 32rpx;
  font-family: PingFang SC;
}
.reminder-content {
  width: 568rpx;
  margin: 40rpx;
  margin-bottom: 96rpx;
  line-height: 50rpx;
}
.reminder-button {
  margin-bottom: 32rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.reminder-button-left {
  width: 260rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-radius: 45rpx;
  border: 2rpx solid rgba(238, 238, 238, 1);
  
  padding: 0;
}
</style>
